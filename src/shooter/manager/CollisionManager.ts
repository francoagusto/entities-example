import { Rectangle } from 'pixi.js';
import { Dictionary } from 'typescript-collections';
import { CollisionBehaviour } from './../behaviour/CollisionBehaviour';
import { DefaultComponentManager, IComponent } from 'ts-entities';
import { IUpdatable } from './../../updater/IUpdatable';
/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * This file is part of ts-entities-example
 *
 * Copyright (C) 2015 Franco Barletta
 *
 * ts-entities-example is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * ts-entities-example is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; If not, see <http://www.gnu.org/licenses/>.
 */

export class CollisionManager extends DefaultComponentManager<IComponent> implements IUpdatable {

	private collidersByType: Dictionary<string, Array<CollisionBehaviour>>;
	private collisionables: Array<CollisionBehaviour>;

	constructor() {
		super();
		this.collidersByType = new Dictionary<string, Array<CollisionBehaviour>>();
		this.collisionables = new Array<CollisionBehaviour>();
	}

	registerComponent(component: IComponent): void {
		super.registerComponent(component);

		var collider: CollisionBehaviour = <CollisionBehaviour>component;

		//Add from types map			
		var type: string = collider.getCollisionType();
		var colliders: Array<CollisionBehaviour>;

		if (!this.collidersByType.containsKey(type) || this.collidersByType.getValue(type) == null) {
			colliders = new Array<CollisionBehaviour>();
			this.collidersByType.setValue(type, colliders);
		} else {
			colliders = this.collidersByType.getValue(type);
		}
		colliders.push(collider);


		//Add from collisionables list
		if (collider.hasColliderTypes()) {
			this.collisionables.push(collider);
		}
	}

	unregisterComponent(component: IComponent): void {
		var collider: CollisionBehaviour = <CollisionBehaviour>component;
		var colliders: Array<CollisionBehaviour>;
		var type: string = collider.getCollisionType();

		//Remove from types map
		if (this.collidersByType.containsKey(type)) {
			colliders = this.collidersByType.getValue(type);
			colliders.splice(colliders.indexOf(collider), 1);

			if (colliders.length == 0) {
				this.collidersByType.remove(type);
			}
		}

		//Remove from collisionables list
		if (collider.hasColliderTypes()) {
			this.collisionables.splice(this.collisionables.indexOf(collider), 1);
		}

		super.unregisterComponent(component);
	}

	//call on update
	update(): void {
		var i: number = this.collisionables.length - 1;
		var colliderA: CollisionBehaviour;
		var colliderTypes: Array<string>;

		while (i >= 0) {
			colliderA = this.collisionables[i];

			colliderTypes = colliderA.getColliderTypes();
			if (colliderTypes != null) {
				for (var type of colliderTypes) {
					var colliders: Array<CollisionBehaviour> = this.collidersByType.getValue(type);
					if (colliders != null) {
						for (var colliderB of colliders) {

							// check
							if (this.intersectsRectangle(colliderA.getBounds(), colliderB.getBounds())) {
								colliderA.collide();
								colliderB.collide();
							}
						}
					}
				}
			}
			i--;
		}
	}

	private intersectsRectangle(a: Rectangle, b: Rectangle): boolean {
		//B is above A
		return !(b.height + b.y < a.y ||
			//B is below A
			b.y > a.y + a.height ||
			//B is left of A
			b.width + b.x < a.x ||
			//B is right of A
			b.x > a.x + a.width);
	}
}
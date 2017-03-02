import { CollisionBehaviour } from './../behaviour/CollisionBehaviour';
import { DefaultProjectileBehaviour } from './../behaviour/weapon/DefaultProjectileBehaviour';
import { TickBehaviour } from './../behaviour/TickBehaviour';
import { ShapeView } from './../behaviour/view/ShapeView';
import { PositionBehaviour } from './../behaviour/PositionBehaviour';
import { Dictionary } from 'typescript-collections';
import { IEntity, ComponentRegister, Entity } from 'ts-entities';
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
export class BulletsBuilder {

	static SIMPLE_BULLET: string = "SIMPLE_BULLET";

	private bulletBuilderByType: Dictionary<string, (x: number, y: number, angle: number) => IEntity>;

	private static instance: BulletsBuilder;
	private componentRegister: ComponentRegister;

	static getInstance(): BulletsBuilder {
		if (BulletsBuilder.instance == null) {
			BulletsBuilder.instance = new BulletsBuilder();
		}
		return BulletsBuilder.instance;
	}

	constructor() {
		this.bulletBuilderByType = new Dictionary<string, (x: number, y: number, angle: number) => IEntity>();
		this.bulletBuilderByType.setValue(BulletsBuilder.SIMPLE_BULLET, this.simpleBullet.bind(this));
	}

	setComponentRegister(componentRegister: ComponentRegister): void {
		this.componentRegister = componentRegister;
	}

	createBullet(type: string, x: number, y: number, angle: number): IEntity {
		return this.bulletBuilderByType.getValue(type)(x, y, angle);
	}

	private simpleBullet(x: number, y: number, angle: number): IEntity {
		var bullet: Entity = new Entity(this.componentRegister);

		bullet.addComponent(new PositionBehaviour(x, y, angle, true));
		bullet.addComponent(new ShapeView(ShapeView.CIRCLE, 5));
		bullet.addComponent(new TickBehaviour());
		bullet.addComponent(new DefaultProjectileBehaviour(10));
		bullet.addComponent(new CollisionBehaviour(CollisionBehaviour.BULLET, null, Entity.destroyCallback));

		return bullet;
	}
}
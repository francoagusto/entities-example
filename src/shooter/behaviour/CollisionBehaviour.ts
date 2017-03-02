import { PositionBehaviour } from './PositionBehaviour';
import { DefaultView } from './view/DefaultView';
import * as entity from 'ts-entities';
import { DisplayObject, Rectangle, Container } from 'pixi.js';

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


export class CollisionBehaviour extends entity.AbstractComponent {
	static TYPE: string = "COLLISION_BEHAVIOUR";

	static HERO: string = "HERO";
	static ENEMY: string = "ENEMY";
	static BULLET: string = "BULLET";


	private collideCallback: string;
	private collisionType: string;
	private collideTypes: Array<string>;


	private display: DisplayObject;

	constructor(collisionType: string, collideTypes: Array<string> = null, collideCallback: string = null) {
		super();
		this.collisionType = collisionType;
		this.collideTypes = collideTypes;
		this.collideCallback = collideCallback;
	}

	setup(): void {
		this.display = this.owner.getRegistredReference<Container>(DefaultView.DISPLAY_REFRENCE);

	}

	getDependencies(): Array<string> {
		return [PositionBehaviour.TYPE, DefaultView.TYPE];
	}

	getType(): string {
		return CollisionBehaviour.TYPE;
	}

	getCollisionType(): string {
		return this.collisionType;
	}

	getColliderTypes(): Array<string> {
		return this.collideTypes;
	}

	getBounds(): Rectangle {
		return this.display.getBounds();
	}

	hasColliderTypes(): boolean {
		return this.collideTypes != null && this.collideTypes.length > 0;
	}

	collide(): void {
		this.owner.callCallback(this.collideCallback);
	}
}
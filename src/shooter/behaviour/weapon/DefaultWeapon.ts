import { Point } from 'pixi.js';
import { PositionBehaviour } from './../PositionBehaviour';
import { BulletsBuilder } from './../../builder/BulletsBuilder';
import { IEntity, AbstractComponent } from 'ts-entities';

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


export class DefaultWeapon extends AbstractComponent {
	static TYPE: string = "WEAPON";
	static FIRE_CALLBACK: string = "fire";
	private bulletType: string;
	//in Milliseconds
	private minShootnumbererval: number;

	private bulletsBuilder: BulletsBuilder;
	private lastShoot: number = 0;

	constructor(bulletType: string = "SIMPLE_BULLET", minShootnumbererval: number = 50) {
		super();

		this.bulletType = bulletType;
		this.minShootnumbererval = minShootnumbererval;

		this.bulletsBuilder = BulletsBuilder.getInstance();
	}

	setup(): void {
		this.owner.registerCallback(DefaultWeapon.FIRE_CALLBACK, this.fire, this);
	}

	getType(): string {
		return DefaultWeapon.TYPE;
	}

	fire(): void {
		var currentTime: number = Date.now();

		if ((currentTime - this.lastShoot) > this.minShootnumbererval) {
			var angle: number = this.owner.callCallback(PositionBehaviour.GET_ANGLE_CALLBACK);
			var position: Point = this.owner.callCallback(PositionBehaviour.GET_POSITION_CALLBACK);

			var bullet: IEntity = this.bulletsBuilder.createBullet(this.bulletType, Math.floor(position.x), Math.floor(position.y), angle);

			this.lastShoot = currentTime;
		}
	}

}
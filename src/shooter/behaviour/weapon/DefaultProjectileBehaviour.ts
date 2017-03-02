import { PositionBehaviour } from './../PositionBehaviour';
import { TickBehaviour } from './../TickBehaviour';
import { Signal } from 'signals';
import * as entity from 'ts-entities';
import { Point } from 'pixi.js';

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

export class DefaultProjectileBehaviour extends entity.AbstractComponent {
	static TYPE: string = "PROJECTILE_BEHAVIOUR";

	private velocity: number;

	private dx: number;
	private dy: number;

	private positionTo: Point = new Point();


	constructor(velocity: number) {
		super();
		this.velocity = velocity;
	}

	getDependencies(): Array<string> {
		return [PositionBehaviour.TYPE, TickBehaviour.TYPE];
	}

	getType(): string {
		return DefaultProjectileBehaviour.TYPE;
	}

	setup(): void {
		var onTick: Signal = this.owner.getRegistredReference<Signal>(TickBehaviour.TICK_SIGNAL_REFERENCE);
		onTick.add(this.handleUpdate, this);

		var angle: number = this.owner.callCallback(PositionBehaviour.GET_ANGLE_CALLBACK);
		angle = angle * (Math.PI / 180);
		this.dx = Math.cos(angle) * this.velocity;
		this.dy = Math.sin(angle) * this.velocity;
	}

	private handleUpdate(): void {
		var point: Point = this.owner.callCallback(PositionBehaviour.GET_POSITION_CALLBACK);
		this.positionTo.x = point.x + this.dx;
		this.positionTo.y = point.y + this.dy;
		this.owner.callCallback(PositionBehaviour.SET_POSITION_CALLBACK, this.positionTo);
	}

	destroy(): void {
		super.destroy();
	}
}
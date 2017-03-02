import { TickBehaviour } from './TickBehaviour';
import { PositionBehaviour } from './PositionBehaviour';
import { Signal } from 'signals';
import {Point} from 'pixi.js';
import {IEntity, AbstractComponent} from 'ts-entities';

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


export class FollowEntityBehaviour extends AbstractComponent {

	static TYPE: string = "IA";
	static SET_ENTITY_TO_FOLLOW_CALLBACK: string = "entityToFollow";

	private velocity: number;

	private entityToFollow: IEntity;

	private dx: number;
	private dy: number;
	private positionTo:Point = new Point;


	constructor(velocity: number = 3) {
		super();
		this.velocity = velocity;
	}

	  getDependencies(): Array<string> {
		return [PositionBehaviour.TYPE, TickBehaviour.TYPE];
	}

	  getType(): string {
		return FollowEntityBehaviour.TYPE;
	}

	  setup(): void {
		this.owner.registerCallback(FollowEntityBehaviour.SET_ENTITY_TO_FOLLOW_CALLBACK,  this.setEntityToFollow, this);

		var onTick: Signal = this.owner.getRegistredReference<Signal>(TickBehaviour.TICK_SIGNAL_REFERENCE);
		onTick.add(this.handleUpdate, this);
	}

	private setEntityToFollow(value: IEntity): void {
		this.entityToFollow = value;
	}

	private handleOnEntityDestroyed(): void {
		this.entityToFollow = null;
	}

	private handleUpdate(): void {
		if (this.entityToFollow == null || this.entityToFollow.isDestroyed()) return;
		var followPos: Point = this.entityToFollow.callCallback(PositionBehaviour.GET_POSITION_CALLBACK);
		var ownerPos: Point = this.owner.callCallback(PositionBehaviour.GET_POSITION_CALLBACK);

		var angle: number = (Math.atan2(ownerPos.y - followPos.y, ownerPos.x - followPos.x) * (180 / Math.PI) - 180) * (Math.PI / 180);

		this.dx = Math.cos(angle) * this.velocity;
		this.dy = Math.sin(angle) * this.velocity;

		this.positionTo.x = ownerPos.x + this.dx;
		this.positionTo.y = ownerPos.y + this.dy;
		this.owner.callCallback(PositionBehaviour.SET_POSITION_CALLBACK, this.positionTo);
	}
}
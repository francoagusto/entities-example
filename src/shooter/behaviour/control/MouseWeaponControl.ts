import { IStageMouse } from './../../../render/IStageMouse';
import { Signal } from 'signals';
import { TickBehaviour } from './../TickBehaviour';
import { Point, DisplayObject, Container } from 'pixi.js';
import { DefaultWeapon } from './../weapon/DefaultWeapon';
import { PositionBehaviour } from './../PositionBehaviour';
import { DefaultView } from './../view/DefaultView';
import * as entity from 'ts-entities';
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


export class MouseWeaponControl extends entity.AbstractComponent {




	static TYPE: string = "MOUSE_CONTROL";
	private static MOUSE_MOVE: string = "mousemove";
	private static MOUSE_DOWN: string = "mousedown";
	private static MOUSE_UP: string = "mouseup";
	private static MOUSE_UP_OUTSIDE: string = "mouseupoutside";

	private stage: Container;
	private heroPosition: Point;
	private tickSignal: Signal;

	constructor(private mouseStage:IStageMouse) {
		super();
	}

	getDependencies(): Array<string> {
		return [DefaultView.TYPE, PositionBehaviour.TYPE, DefaultWeapon.TYPE];
	}

	getType(): string {
		return MouseWeaponControl.TYPE;
	}

	setup(): void {
		var display: Container = this.owner.getRegistredReference<Container>(DefaultView.DISPLAY_REFRENCE);
		this.stage = display.parent;
		this.stage.interactive = true;

		this.stage.on(MouseWeaponControl.MOUSE_MOVE, this.handleMouseMove, this);
		this.stage.on(MouseWeaponControl.MOUSE_DOWN, this.handleMouseDown, this);
		this.stage.on(MouseWeaponControl.MOUSE_UP, this.handleMouseUp, this);
		this.stage.on(MouseWeaponControl.MOUSE_UP_OUTSIDE, this.handleMouseUp, this);

		this.heroPosition = this.owner.callCallback(PositionBehaviour.GET_POSITION_CALLBACK);
		var onPositionChanged: Signal = this.owner.getRegistredReference<Signal>(PositionBehaviour.ON_POSITION_CHANGED_PROPERTY);
		onPositionChanged.add(this.updateAngle, this);

		this.tickSignal = this.owner.getRegistredReference<Signal>(TickBehaviour.TICK_SIGNAL_REFERENCE);
	}

	private handleMouseDown(event: Event): void {
		this.tickSignal.add(this.tryFire, this);
	}

	private handleMouseUp(event: Event): void {
		this.tickSignal.remove(this.tryFire, this);
	}

	private tryFire(): void {
		this.updateAngle();
		this.owner.callCallback(DefaultWeapon.FIRE_CALLBACK);
	}

	private handleMouseMove(event: MouseEvent): void {
		this.updateAngle();
	}

	private updateAngle(value: number = 0): void {
		var mousePoint:Point = new Point(this.mouseStage.mousePosition.x, this.mouseStage.mousePosition.y);
		var dx: number = (this.heroPosition.x - mousePoint.x);
		var dy: number = (this.heroPosition.y - mousePoint.y);
		var angle: number = Math.atan2(dy, dx) * (180 / Math.PI) - 180;

		this.owner.callCallback(PositionBehaviour.SET_ANGLE_CALLBACK, angle);
	}

	destroy(): void {
		this.stage.off(MouseWeaponControl.MOUSE_MOVE, this.handleMouseMove, this);
		this.stage.off(MouseWeaponControl.MOUSE_DOWN, this.handleMouseDown, this);
		this.stage.off(MouseWeaponControl.MOUSE_UP, this.handleMouseUp, this);
		this.stage.off(MouseWeaponControl.MOUSE_UP_OUTSIDE, this.handleMouseUp, this);
		this.stage = null;
		super.destroy();
	}
}
import { Signal } from 'signals';
import { TickBehaviour } from './../TickBehaviour';
import { PositionBehaviour } from './../PositionBehaviour';
import { DefaultView } from './../view/DefaultView';
import { Dictionary } from 'typescript-collections';
import * as entity from 'ts-entities';
import { Point, DisplayObject } from 'pixi.js';

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


export class KeyMoveControl extends entity.AbstractComponent {
	static TYPE: string = "KEYBOARD_CONTROL";

	private static KEY_DOWN_EVENT: string = "keydown";
	private static KEY_UP_EVENT: string = "keyup";


	private velocity: number;

	private dx: number;
	private dy: number;

	private positionTo: Point;

	private keyUp: number = 87;
	private keyDown: number = 83;
	private keyLeft: number = 65;
	private keyRight: number = 68;

	private keyMap: Dictionary<number, boolean>;

	private onKeyDownHandler: () => any;
	private onKeyUpHandler: () => any;

	constructor(velocity: number = 4) {
		super();

		this.velocity = velocity;
		this.positionTo = new Point();

		this.keyMap = new Dictionary<number, boolean>();
		this.keyMap.setValue(this.keyUp, false);
		this.keyMap.setValue(this.keyDown, false);
		this.keyMap.setValue(this.keyLeft, false);
		this.keyMap.setValue(this.keyRight, false);
	}

	getDependencies(): Array<string> {
		return [DefaultView.TYPE, PositionBehaviour.TYPE, TickBehaviour.TYPE];
	}

	setup(): void {
		var display: DisplayObject = this.owner.getRegistredReference<DisplayObject>(DefaultView.DISPLAY_REFRENCE);

		//initialize variables
		this.dx = 0;
		this.dy = 0;

		//Add event listeners


		this.onKeyDownHandler = this.onKeyDown.bind(this);
		this.onKeyUpHandler = this.onKeyUp.bind(this);
		document.addEventListener(KeyMoveControl.KEY_DOWN_EVENT, this.onKeyDownHandler);
		document.addEventListener(KeyMoveControl.KEY_UP_EVENT, this.onKeyUpHandler);
		//document.addEventListener(Event.DEACTIVATE, handleDeactivate);

		var onTick: Signal = this.owner.getRegistredReference<Signal>(TickBehaviour.TICK_SIGNAL_REFERENCE);
		onTick.add(this.handleTick, this);
	}

	getType(): string {
		return KeyMoveControl.TYPE;
	}

	private handleDeactivate(event: Event): void {
		for (var key of this.keyMap.keys()) {
			this.keyMap.setValue(key, false);
		}
		this.updateDelta();
	}

	private onKeyDown(event: KeyboardEvent): void {
		if (this.keyMap.containsKey(event.keyCode)) {
			this.keyMap.setValue(event.keyCode, true);
		}
		this.updateDelta();
	}

	private onKeyUp(event: KeyboardEvent): void {
		if (this.keyMap.containsKey(event.keyCode)) {
			this.keyMap.setValue(event.keyCode, false);
		}
		this.updateDelta();
	}

	private updateDelta(): void {
		this.dx = this.dy = 0;
		if (this.keyMap.getValue(this.keyUp)) {
			this.dy = -this.velocity;
		}
		if (this.keyMap.getValue(this.keyDown)) {
			this.dy = this.velocity;
		}
		if (this.keyMap.getValue(this.keyLeft)) {
			this.dx = -this.velocity;
		}
		if (this.keyMap.getValue(this.keyRight)) {
			this.dx = this.velocity;
		}
	}

	private handleTick(): void {
		if (this.dx != 0 || this.dy != 0) {
			var point: Point = this.owner.callCallback(PositionBehaviour.GET_POSITION_CALLBACK);
			this.positionTo.x = point.x + this.dx;
			this.positionTo.y = point.y + this.dy;
			this.owner.callCallback(PositionBehaviour.SET_POSITION_CALLBACK, this.positionTo);
		}
	}

	destroy(): void {
		document.removeEventListener(KeyMoveControl.KEY_DOWN_EVENT, this.onKeyDownHandler);
		document.removeEventListener(KeyMoveControl.KEY_UP_EVENT, this.onKeyUpHandler);

		super.destroy();
	}
}
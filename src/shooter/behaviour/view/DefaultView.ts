import { PositionBehaviour } from './../PositionBehaviour';
import { Signal } from 'signals';
import { Container, Sprite, Point, DisplayObject } from 'pixi.js';
import { Entity, AbstractComponent } from 'ts-entities';

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
 * Lesser General License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; If not, see <http://www.gnu.org/licenses/>.
 */

export class DefaultView extends AbstractComponent {
	static TYPE: string = "VIEW";
	static DISPLAY_REFRENCE: string = "displayReference";

	private display: Container = new Container();

	constructor() {
		super();
	}

	setup(): void {
		this.owner.registerReference(DefaultView.DISPLAY_REFRENCE, this.display);

		var onPositionChanged: Signal = this.owner.getRegistredReference<Signal>(PositionBehaviour.ON_POSITION_CHANGED_PROPERTY);
		var onAngleChanged: Signal = this.owner.getRegistredReference<Signal>(PositionBehaviour.ON_ANGLE_CHANGED_PROPERTY);

		onAngleChanged.add(this.handleAngleChanged, this);
		onPositionChanged.add(this.handlePositionChanged, this);

		//initialize View
		var point: Point = this.owner.callCallback(PositionBehaviour.GET_POSITION_CALLBACK);
		this.handlePositionChanged(point);

		var angle: number = this.owner.callCallback(PositionBehaviour.GET_ANGLE_CALLBACK);
		this.handleAngleChanged(angle);
	}

	private handleAngleChanged(angle: number): void {
		//apply angle changed, offset for set shape to forward
		this.display.rotation = (angle + 90) * Math.PI / 180;
	}

	private handlePositionChanged(position: Point): void {
		//apply new position
		this.display.x = position.x;
		this.display.y = position.y;
	}

	getDependencies(): Array<string> {
		return [PositionBehaviour.TYPE];
	}

	getType(): string {
		return DefaultView.TYPE;
	}

	getDisplay(): Container {
		return this.display;
	}

	destroy(): void {
		super.destroy();
		this.display = null;
	}


}
import { ShapeView } from './ShapeView';
import { Graphics } from 'pixi.js';
import { Dictionary } from "typescript-collections";

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


export class QuickDrawStrategy {
	private drawMap: Dictionary<string, (Graphics, number) => void>;
	private static instance: QuickDrawStrategy;

	constructor() {
		this.drawMap = new Dictionary<string, (Graphics, number) => void>();
		this.drawMap.setValue(ShapeView.SQUARE, this.drawRectangle.bind(this));
		this.drawMap.setValue(ShapeView.TRIANGLE, this.drawTriangle.bind(this));
		this.drawMap.setValue(ShapeView.CIRCLE, this.drawCircle.bind(this));
	}

	static getInstance(): QuickDrawStrategy {
		if (this.instance == null) {
			this.instance = new QuickDrawStrategy();
		}
		return this.instance;
	}

	quickDraw(type: string, graphic: Graphics, size: number = 30, borderColor: number = 0x000000, fillColor: number = 0xFFFFFF): void {
		graphic.lineStyle(1, borderColor);
		graphic.beginFill(fillColor);

		var draw: (Graphics, number) => void = this.drawMap.getValue(type);
		draw(graphic, size);
		graphic.endFill();
	}

	private drawRectangle(graphic: Graphics, size: number): void {
		graphic.drawRect(- size / 2, - size / 2, size, size);
	}

	private drawTriangle(graphic: Graphics, size: number): void {
		graphic.moveTo(-size / 2, size / 4);
		graphic.lineTo(size / 2, size / 4);
		graphic.lineTo(0, -size / 2);
		graphic.lineTo(-size / 2, size / 4);
	}

	private drawCircle(graphic: Graphics, size: number): void {
		graphic.drawCircle(0, 0, size / 2);
	}
}
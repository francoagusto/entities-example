import { DefaultView } from './DefaultView';
import { Graphics, Container } from 'pixi.js';
import { QuickDrawStrategy } from './QuickDrawStrategy';

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

export class ShapeView extends DefaultView {

	static SQUARE: string = "square";
	static CIRCLE: string = "circle";
	static TRIANGLE: string = "triangle";

	private drawStrategy: QuickDrawStrategy = QuickDrawStrategy.getInstance();


	constructor(type: string = "square", size: number = 30, borderColor: number = 0x000000, fillColor: number = 0xFFFFFF) {
		super();

		var graphics: Graphics = new Graphics();
		graphics.clear();

		var container: Container = this.getDisplay();
		container.addChild(graphics);
		this.drawStrategy.quickDraw(type, graphics, size, borderColor, fillColor);

		graphics.endFill();
	}
}

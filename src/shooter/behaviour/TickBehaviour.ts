import { Signal } from "signals";
import * as entity from "ts-entities";
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

export class TickBehaviour extends entity.AbstractComponent {

	static TYPE: string = "TICK_BEHAVIOUR";
	static TICK_SIGNAL_REFERENCE: string = "onTick";

	private onTick: Signal;

	constructor() {
		super();
		this.onTick = new Signal();
	}

	setup(): void {
		this.owner.registerReference<Signal>(TickBehaviour.TICK_SIGNAL_REFERENCE, this.onTick);
	}


	getType(): string {
		return TickBehaviour.TYPE;
	}

	tick(): void {
		this.onTick.dispatch();
	}

	destroy(): void {
		if (this.onTick != null) this.onTick.removeAll();
		this.onTick = null;
		super.destroy();
	}
}
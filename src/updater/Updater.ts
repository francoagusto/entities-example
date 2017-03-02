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

import { IUpdatable } from './IUpdatable';


export class Updater {

	private updatables: Array<IUpdatable>;

	constructor(private onUpdate: Signal) {
		this.updatables = new Array<IUpdatable>();
	}

	start(): void {
		this.onUpdate.add(this.hanldeEnterFrame, this);
	}

	stop(): void {
		this.onUpdate.remove(this.hanldeEnterFrame, this);
	}

	registerUpdatable(updatable: IUpdatable): void {
		this.updatables.push(updatable);
	}

	unregisterUpdatable(updatable: IUpdatable): void {
		this.updatables.splice(this.updatables.indexOf(updatable), 1);
	}

	private hanldeEnterFrame(): void {
		for (var updateable of this.updatables) {
			updateable.update();
		}
	}
}
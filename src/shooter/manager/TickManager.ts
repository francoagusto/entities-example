import { TickBehaviour } from './../behaviour/TickBehaviour';
import { IUpdatable } from './../../updater/IUpdatable';
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

export class TickManager extends entity.DefaultComponentManager<TickBehaviour> implements IUpdatable
{
	
	constructor()
	{
		super();
	}
	
	 update():void
	{
		for(var component of this.components){
			
			var tickComponent:TickBehaviour = component;
			tickComponent.tick();
		}
	}
}
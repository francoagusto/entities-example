import { FollowEntityBehaviour } from './../behaviour/FollowEntityBehaviour';
import { CharacterBuilder } from './../builder/CharacterBuilder';
import { GameModel } from './../model/GameModel';
import { IEntity } from 'ts-entities';
import { IUpdatable } from './../../updater/IUpdatable';

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

export class EnemySpawner implements IUpdatable {

	private types: Array<any> = [CharacterBuilder.ENEMY_A];

	private hero: IEntity;

	private lastSpawnTime: number;
	private timenumbererval: number;

	private gameModel: GameModel = GameModel.getInstance();

	constructor(timenumbererval: number, currentHero: IEntity) {
		this.timenumbererval = timenumbererval;
		this.lastSpawnTime = 0;
		this.hero = currentHero;
	}

	update(): void {
		
		var currentTime: number = Date.now();
		if ((currentTime - this.lastSpawnTime) > this.timenumbererval) {
			this.spawnEnemy();
			this.lastSpawnTime = currentTime;
		}
	}

	private spawnEnemy(): void {
		//get random type
		var type: string = this.types[Math.floor(this.types.length * Math.random())];

		var randomInX: boolean = this.boolRandom();

		var xPos: number = Math.floor(randomInX ? (Math.random() * this.gameModel.stageWidth) : (this.boolRandom() ? 0 : this.gameModel.stageWidth));
		var yPos: number = Math.floor(!randomInX ? (Math.random() * this.gameModel.stageHeight) : (this.boolRandom() ? 0 : this.gameModel.stageHeight));

		//build enemies
		var enemy: IEntity = CharacterBuilder.getInstance().createCharacter(type, xPos, yPos);
		enemy.callCallback(FollowEntityBehaviour.SET_ENTITY_TO_FOLLOW_CALLBACK, this.hero);
	}


	private boolRandom(): boolean {
		return Math.random() > .5;
	}
}
import { IMouseInteraction } from './../render/IMouseInteraction';
import { Signal } from 'signals';
import { CollisionBehaviour } from './behaviour/CollisionBehaviour';
import { CollisionManager } from './manager/CollisionManager';
import { BulletsBuilder } from './builder/BulletsBuilder';
import { CharacterBuilder } from './builder/CharacterBuilder';
import { EnemySpawner } from './spawn/EnemySpawner';
import { TickBehaviour } from './behaviour/TickBehaviour';
import { TickManager } from './manager/TickManager';
import { DefaultView } from './behaviour/view/DefaultView';
import { ViewManager } from './manager/ViewManager';
import { GameModel } from './model/GameModel';
import { Updater } from './../updater/Updater';
import { Container } from 'pixi.js';
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

export class Game {

	private updater: Updater;
	private gameModel: GameModel = GameModel.getInstance();

	constructor(private stage: Container, private width: number, private height: number, private tickSignal: Signal, private stageMouseInteraction: IMouseInteraction) {
		this.stage = stage || new Container();
		this.gameModel.stageWidth = this.width;
		this.gameModel.stageHeight = this.height;

		this.setupManagers();
		this.buildEntities();
	}


	private setupManagers(): void {
		var componentRegister: entity.ComponentRegister = new entity.ComponentRegister();

		//setup Managers
		var viewManager: ViewManager = new ViewManager();

		this.updater = new Updater(this.tickSignal);
		this.stage.addChild(viewManager.getDisplay());

		componentRegister.registerComponentManager(DefaultView.TYPE, viewManager);

		var tickManager: TickManager = new TickManager();
		this.updater.registerUpdatable(tickManager);
		componentRegister.registerComponentManager(TickBehaviour.TYPE, tickManager);

		var collisionManager: CollisionManager = new CollisionManager();
		componentRegister.registerComponentManager(CollisionBehaviour.TYPE, collisionManager);
		this.updater.registerUpdatable(collisionManager);

		//set componentRegister
		BulletsBuilder.getInstance().setComponentRegister(componentRegister);
		CharacterBuilder.getInstance().setComponentRegister(componentRegister);

		this.updater.start();
	}

	private buildEntities(): void {
		//Build player
		var entityBuilder: CharacterBuilder = CharacterBuilder.getInstance();
		entityBuilder.mouseStage = this.stageMouseInteraction;

		var hero: entity.IEntity = entityBuilder.createCharacter(CharacterBuilder.HERO, Math.floor(this.gameModel.stageWidth / 2), Math.floor(this.gameModel.stageHeight / 2));
		var enemySpawner: EnemySpawner = new EnemySpawner(20000, hero);
		this.updater.registerUpdatable(enemySpawner);
	}
}
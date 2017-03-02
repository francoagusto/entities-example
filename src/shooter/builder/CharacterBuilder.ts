import { IStageMouse } from './../../render/IStageMouse';
import { FollowEntityBehaviour } from './../behaviour/FollowEntityBehaviour';
import { MouseWeaponControl } from './../behaviour/control/MouseWeaponControl';
import { BulletsBuilder } from './BulletsBuilder';
import { CollisionBehaviour } from './../behaviour/CollisionBehaviour';
import { DefaultWeapon } from './../behaviour/weapon/DefaultWeapon';
import { KeyMoveControl } from './../behaviour/control/KeyMoveControl';
import { ShapeView } from './../behaviour/view/ShapeView';
import { PositionBehaviour } from './../behaviour/PositionBehaviour';
import { TickBehaviour } from './../behaviour/TickBehaviour';
import { ComponentRegister } from "ts-entities";
import { Dictionary } from "typescript-collections";
import { IEntity, Entity } from "ts-entities";

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

export class CharacterBuilder {
	private static instance: CharacterBuilder;
	mouseStage: IStageMouse;

	static getInstance(): CharacterBuilder {
		if (this.instance == null) {
			this.instance = new CharacterBuilder();
		}
		return this.instance;
	}

	static HERO: string = "HERO";
	static ENEMY_A: string = "ENEMY_A";

	private characterMapBuilder: Dictionary<string, (a: number, b: number) => IEntity>;

	private componentRegister: ComponentRegister;


	constructor() {
		this.characterMapBuilder = new Dictionary<string, (a: number, b: number) => IEntity>();

		this.characterMapBuilder.setValue(CharacterBuilder.HERO, this.buildDefaultHero.bind(this));
		this.characterMapBuilder.setValue(CharacterBuilder.ENEMY_A, this.buildDefaultEnemy.bind(this));
	}

	setComponentRegister(componentRegister: ComponentRegister): void {
		this.componentRegister = componentRegister;
	}

	createCharacter(type: string, x: number, y: number): IEntity {
		return this.characterMapBuilder.getValue(type)(x, y);
	}

	buildDefaultHero(x: number = 0, y: number = 0): IEntity {
		var hero: Entity = new Entity(this.componentRegister);

		//Add Components
		hero.addComponent(new PositionBehaviour(x, y));
		hero.addComponent(new ShapeView(ShapeView.TRIANGLE));
		hero.addComponent(new TickBehaviour());
		hero.addComponent(new KeyMoveControl());
		//Here I added Weapon the hero
		hero.addComponent(new DefaultWeapon(BulletsBuilder.SIMPLE_BULLET, 100));
		hero.addComponent(new MouseWeaponControl(this.mouseStage));
		hero.addComponent(new CollisionBehaviour(CollisionBehaviour.HERO, [CollisionBehaviour.ENEMY], Entity.destroyCallback));

		return hero;
	}

	buildDefaultEnemy(x: number = 0, y: number = 0): IEntity {
		var enemy: Entity = new Entity(this.componentRegister);

		//Add Components
		enemy.addComponent(new PositionBehaviour(x, y));
		enemy.addComponent(new ShapeView(ShapeView.SQUARE));
		enemy.addComponent(new TickBehaviour());
		//Cuerrent IA
		enemy.addComponent(new FollowEntityBehaviour(2));
		enemy.addComponent(new CollisionBehaviour(CollisionBehaviour.ENEMY, [CollisionBehaviour.BULLET], Entity.destroyCallback));

		return enemy;
	}
}
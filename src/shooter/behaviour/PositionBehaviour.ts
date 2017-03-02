import { Signal } from 'signals';
import { GameModel } from './../model/GameModel';
import { Entity, AbstractComponent } from 'ts-entities';
import { Point } from 'pixi.js';


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


export class PositionBehaviour extends AbstractComponent {
    static TYPE: string = "POSITION_CAPABILITY";

    static SET_POSITION_CALLBACK: string = "setPositionCallback";
    static GET_POSITION_CALLBACK: string = "getPositionCallback";

    static SET_ANGLE_CALLBACK: string = "setAngleCallback";
    static GET_ANGLE_CALLBACK: string = "getAngleCallback";
    
    static ON_POSITION_CHANGED_PROPERTY: string = "onPositionChanged";
    static ON_ANGLE_CHANGED_PROPERTY: string = "onAngleChanged";


    private destroyOutOfStage: boolean;

    private position: Point;
    private angle: number;

    private onPositionChanged: Signal;
    private onAngleChanged: Signal;

    private gameModel: GameModel = GameModel.getInstance();

    constructor(x: number = 0, y: number = 0, angle: number = 0, destroyOutOfStage: boolean = false) {
        super();
        this.position = new Point(x, y);
        this.angle = angle;

        this.onPositionChanged = new Signal();
        this.onAngleChanged = new Signal();
        this.destroyOutOfStage = destroyOutOfStage;

    }

    private getPosition(): Point {
        return this.position;
    }

    private setPosition(position: any): void {
        if (this.destroyOutOfStage && this.isOutOfStage(position)) {
            this.owner.callCallback(Entity.destroyCallback);

        } else {
            this.position.x = Math.max(0, Math.min(position.x, this.gameModel.stageWidth));
            this.position.y = Math.max(0, Math.min(position.y, this.gameModel.stageHeight));
            this.onPositionChanged.dispatch(this.position);
        }
    }

    private isOutOfStage(position: any): boolean {
        return (position.x < 0 || position.y < 0 || position.x > this.gameModel.stageWidth || position.y > this.gameModel.stageHeight);
    }

    private getAngle(): number {
        return this.angle;
    }

    private setAngle(value: number): void {
        this.angle = value;
        this.onAngleChanged.dispatch(this.angle);
    }


    /* INTERFACE com.fbarletta.entity.IComponent */

    getType(): string {
        return PositionBehaviour.TYPE;
    }

    setup(): void {
        this.owner.registerCallback(PositionBehaviour.SET_POSITION_CALLBACK, this.setPosition, this);
        this.owner.registerCallback(PositionBehaviour.GET_POSITION_CALLBACK, this.getPosition, this);
        this.owner.registerCallback(PositionBehaviour.SET_ANGLE_CALLBACK, this.setAngle, this);
        this.owner.registerCallback(PositionBehaviour.GET_ANGLE_CALLBACK, this.getAngle, this);
        this.owner.registerReference<Signal>(PositionBehaviour.ON_POSITION_CHANGED_PROPERTY, this.onPositionChanged);
        this.owner.registerReference<Signal>(PositionBehaviour.ON_ANGLE_CHANGED_PROPERTY, this.onAngleChanged);
    }


    destroy(): void {
        super.destroy();
    }

}
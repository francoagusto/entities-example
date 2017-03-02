import { Signal } from 'signals';
import { DefaultView } from './../behaviour/view/DefaultView';
import { Container, autoDetectRenderer, WebGLRenderer, CanvasRenderer  } from 'pixi.js';
import {DefaultComponentManager} from 'ts-entities';

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

export class ViewManager extends DefaultComponentManager<DefaultView> {

    private renderer: WebGLRenderer | CanvasRenderer;
    private animateHandler: () => void;
    private display:Container = new Container();


    constructor() {
        super();
    }


    registerComponent(view: DefaultView): void {
        super.registerComponent(view);
        this.display.addChild(view.getDisplay());
    }

    unregisterComponent(view: DefaultView): void {
        this.display.removeChild(view.getDisplay());
        super.unregisterComponent(view);
    }

    getDisplay(): Container {
        return this.display;
    }
}
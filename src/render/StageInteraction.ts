import { Signal } from 'signals';
import { Container, Point, WebGLRenderer, CanvasRenderer } from 'pixi.js';
import { IMouseInteraction } from './IMouseInteraction';

export class StageInteraction implements IMouseInteraction {

    private static CLICK_EVENT: string = "click";
    private static MOUSE_MOVE: string = "mousemove";
    private static MOUSE_DOWN: string = "mousedown";
    private static MOUSE_UP: string = "mouseup";
    private static MOUSE_UP_OUTSIDE: string = "mouseupoutside";

    onClick: Signal = new Signal();
    onMouseMove: Signal = new Signal();
    onMouseDown: Signal = new Signal();
    onMouseUp: Signal = new Signal();
    onMouseUpOutside: Signal = new Signal();

    constructor(private stage: Container, private renderer: WebGLRenderer | CanvasRenderer) {
        this.stage.interactive = true;
        this.stage.on(StageInteraction.CLICK_EVENT, this.onClick.dispatch, this.onClick);
        this.stage.on(StageInteraction.MOUSE_MOVE, this.onMouseMove.dispatch, this.onMouseMove);
        this.stage.on(StageInteraction.MOUSE_DOWN, this.onMouseDown.dispatch, this.onMouseDown);
        this.stage.on(StageInteraction.MOUSE_UP, this.onMouseUp.dispatch, this.onMouseUp);
        this.stage.on(StageInteraction.MOUSE_UP_OUTSIDE, this.onMouseUpOutside.dispatch, this.onMouseUpOutside);
    }

    get mousePosition(): Point {
        return (<any>this.renderer).plugins.interaction.mouse.global;
    }

    destroy(): void {
        this.stage.off(StageInteraction.CLICK_EVENT, this.onClick.dispatch, this.onClick);
        this.stage.off(StageInteraction.MOUSE_MOVE, this.onMouseMove.dispatch, this.onMouseMove);
        this.stage.off(StageInteraction.MOUSE_DOWN, this.onMouseDown.dispatch, this.onMouseDown);
        this.stage.off(StageInteraction.MOUSE_UP, this.onMouseUp.dispatch, this.onMouseUp);
        this.stage.off(StageInteraction.MOUSE_UP_OUTSIDE, this.onMouseUpOutside.dispatch, this.onMouseUpOutside);
        
        this.onMouseMove = null;
        this.onMouseDown = null;
        this.onMouseUp = null;
        this.onMouseUpOutside = null;
        this.onClick = null;
        
        this.stage = null;
        
        this.renderer = null;
    }
}
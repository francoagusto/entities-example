import { Signal } from 'signals';
import { Point } from 'pixi.js';
export interface IMouseInteraction {
    mousePosition: Point;
    onClick: Signal;
    onMouseMove: Signal;
    onMouseDown: Signal;
    onMouseUp: Signal;
    onMouseUpOutside: Signal;
}
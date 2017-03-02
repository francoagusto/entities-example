import { IStageMouse } from './IStageMouse';
import { Signal } from 'signals';
import { autoDetectRenderer, Container, WebGLRenderer, CanvasRenderer, Point } from 'pixi.js';

export class Application implements IStageMouse {

    private renderer: WebGLRenderer | CanvasRenderer;
    stage: Container = new Container();
    onUpdate: Signal = new Signal();

    private animateHandler: () => void;

    constructor(public width: number, public height: number) {
        this.renderer = autoDetectRenderer(width, height, { backgroundColor: 0x1099bb });
        document.body.appendChild(this.renderer.view);
        this.animateHandler = this.animate.bind(this);
        this.animateHandler.call(this);

    }


    get mousePosition():Point {
        return (<any>this.renderer).plugins.interaction.mouse.global;
    }

    private animate(): void {
        requestAnimationFrame(this.animateHandler);
        // render the container
        this.renderer.render(this.stage);
        this.onUpdate.dispatch();
    }
}
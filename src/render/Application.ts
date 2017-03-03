import { IMouseInteraction } from './IMouseInteraction';
import { StageInteraction } from './StageInteraction';
import { Signal } from 'signals';
import { autoDetectRenderer, Container, WebGLRenderer, CanvasRenderer, Point } from 'pixi.js';

export class Application {

    private renderer: WebGLRenderer | CanvasRenderer;
    

    stage: Container = new Container();
    onUpdate: Signal = new Signal();
    stageIteraction:IMouseInteraction;

    

    private animateHandler: () => void;

    constructor(public width: number, public height: number) {
        this.renderer = autoDetectRenderer(width, height, { backgroundColor: 0x1099bb });
        document.body.appendChild(this.renderer.view);
        this.animateHandler = this.animate.bind(this);
        this.animateHandler.call(this);

        this.stageIteraction = new StageInteraction(this.stage, this.renderer);
    }

    private animate(): void {
        requestAnimationFrame(this.animateHandler);
        // render the container
        this.renderer.render(this.stage);
        this.onUpdate.dispatch();
    }
}
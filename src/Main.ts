import { Application } from './render/Application';
import { Game } from './shooter/Game';
import { Container, Text, Rectangle, autoDetectRenderer } from "pixi.js";

class Main extends Container {

	private introText: Text;
	private stage: Container;
	private app: Application;

	constructor() {
		super();
		console.log("Main");
		//create Render
		this.app = new Application(800, 600);
		//this.init();
		this.startGame();
	}


	private init(): void {
	
		this.introText = new Text();
		this.introText.text = "Click to start\nGame controls:WASD, mouse move and left click";

		var textBounds: Rectangle = this.introText.getBounds();
		this.introText.anchor.y = this.introText.anchor.x = 0.5;
		this.introText.x = 800 / 2;
		this.introText.y = 600 / 2;

		this.showIntro();
	}

	private showIntro(): void {
		this.addChild(this.introText);
	}

	private startGame(): void {
		this.removeChild(this.introText);
		var game: Game = new Game(this.app.stage, this.app.width, this.app.height, this.app.onUpdate, this.app);
	}

}
new Main();
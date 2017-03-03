import { Application } from './render/Application';
import { Game } from './shooter/Game';
import { Container, Text, Rectangle, autoDetectRenderer, Graphics } from "pixi.js";

class Main {

	private introText: Text;
	private app: Application;

	constructor() {
		console.log("Main");
		//create Render
		this.app = new Application(800, 600);
		this.init();

	}


	private init(): void {

		//interactive zone
		var stageHitArea: Graphics = new Graphics();
		stageHitArea.beginFill(0xFFFFFF, 0);
		stageHitArea.drawRect(0, 0, this.app.width, this.app.height);
		stageHitArea.interactive = true;
		this.app.stage.addChild(stageHitArea);
		
		//add intro text
		this.introText = new Text("Game controls:\n\tW, A, S and D,\n\tmouse move and left click\n\ntscClick to start",
			{
				font: "20",
				fill: 0xFFFFFF,
				align: "center"
			});

		this.introText.anchor.y = this.introText.anchor.x = 0.5;
		this.introText.x = this.app.width * 0.5;
		this.introText.y = this.app.height * 0.5;

		this.showIntro();
	}

	private showIntro(): void {
		this.app.stage.addChild(this.introText);
		this.app.stageIteraction.onClick.addOnce(this.startGame, this);
	}

	private startGame(): void {
		this.app.stage.removeChild(this.introText);
		var game: Game = new Game(this.app.stage, this.app.width, this.app.height, this.app.onUpdate, this.app.stageIteraction);
	}

}
new Main();
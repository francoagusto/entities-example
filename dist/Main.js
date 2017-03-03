define(["require", "exports", "./render/Application", "./shooter/Game", "pixi.js"], function (require, exports, Application_1, Game_1, pixi_js_1) {
    "use strict";
    var Main = (function () {
        function Main() {
            console.log("Main");
            this.app = new Application_1.Application(800, 600);
            this.init();
        }
        Main.prototype.init = function () {
            var stageHitArea = new pixi_js_1.Graphics();
            stageHitArea.beginFill(0xFFFFFF, 0);
            stageHitArea.drawRect(0, 0, this.app.width, this.app.height);
            stageHitArea.interactive = true;
            this.app.stage.addChild(stageHitArea);
            this.introText = new pixi_js_1.Text("Game controls:\n\tW, A, S and D,\n\tmouse move and left click\n\ntscClick to start", {
                font: "20",
                fill: 0xFFFFFF,
                align: "center"
            });
            this.introText.anchor.y = this.introText.anchor.x = 0.5;
            this.introText.x = this.app.width * 0.5;
            this.introText.y = this.app.height * 0.5;
            this.showIntro();
        };
        Main.prototype.showIntro = function () {
            this.app.stage.addChild(this.introText);
            this.app.stageIteraction.onClick.addOnce(this.startGame, this);
        };
        Main.prototype.startGame = function () {
            this.app.stage.removeChild(this.introText);
            var game = new Game_1.Game(this.app.stage, this.app.width, this.app.height, this.app.onUpdate, this.app.stageIteraction);
        };
        return Main;
    }());
    new Main();
});
//# sourceMappingURL=Main.js.map
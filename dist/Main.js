var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./render/Application", "./shooter/Game", "pixi.js"], function (require, exports, Application_1, Game_1, pixi_js_1) {
    "use strict";
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this) || this;
            console.log("Main");
            _this.app = new Application_1.Application(800, 600);
            _this.startGame();
            return _this;
        }
        Main.prototype.init = function () {
            this.introText = new pixi_js_1.Text();
            this.introText.text = "Click to start\nGame controls:WASD, mouse move and left click";
            var textBounds = this.introText.getBounds();
            this.introText.anchor.y = this.introText.anchor.x = 0.5;
            this.introText.x = 800 / 2;
            this.introText.y = 600 / 2;
            this.showIntro();
        };
        Main.prototype.showIntro = function () {
            this.addChild(this.introText);
        };
        Main.prototype.startGame = function () {
            this.removeChild(this.introText);
            var game = new Game_1.Game(this.app.stage, this.app.width, this.app.height, this.app.onUpdate, this.app);
        };
        return Main;
    }(pixi_js_1.Container));
    new Main();
});
//# sourceMappingURL=Main.js.map
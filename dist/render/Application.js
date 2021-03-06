define(["require", "exports", "./StageInteraction", "signals", "pixi.js"], function (require, exports, StageInteraction_1, signals_1, pixi_js_1) {
    "use strict";
    var Application = (function () {
        function Application(width, height) {
            this.width = width;
            this.height = height;
            this.stage = new pixi_js_1.Container();
            this.onUpdate = new signals_1.Signal();
            this.renderer = pixi_js_1.autoDetectRenderer(width, height, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            this.animateHandler = this.animate.bind(this);
            this.animateHandler.call(this);
            this.stageIteraction = new StageInteraction_1.StageInteraction(this.stage, this.renderer);
        }
        Application.prototype.animate = function () {
            requestAnimationFrame(this.animateHandler);
            this.renderer.render(this.stage);
            this.onUpdate.dispatch();
        };
        return Application;
    }());
    exports.Application = Application;
});
//# sourceMappingURL=Application.js.map
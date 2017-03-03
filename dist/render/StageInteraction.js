define(["require", "exports", "signals"], function (require, exports, signals_1) {
    "use strict";
    var StageInteraction = (function () {
        function StageInteraction(stage, renderer) {
            this.stage = stage;
            this.renderer = renderer;
            this.onClick = new signals_1.Signal();
            this.onMouseMove = new signals_1.Signal();
            this.onMouseDown = new signals_1.Signal();
            this.onMouseUp = new signals_1.Signal();
            this.onMouseUpOutside = new signals_1.Signal();
            this.stage.interactive = true;
            this.stage.on(StageInteraction.CLICK_EVENT, this.onClick.dispatch, this.onClick);
            this.stage.on(StageInteraction.MOUSE_MOVE, this.onMouseMove.dispatch, this.onMouseMove);
            this.stage.on(StageInteraction.MOUSE_DOWN, this.onMouseDown.dispatch, this.onMouseDown);
            this.stage.on(StageInteraction.MOUSE_UP, this.onMouseUp.dispatch, this.onMouseUp);
            this.stage.on(StageInteraction.MOUSE_UP_OUTSIDE, this.onMouseUpOutside.dispatch, this.onMouseUpOutside);
        }
        Object.defineProperty(StageInteraction.prototype, "mousePosition", {
            get: function () {
                return this.renderer.plugins.interaction.mouse.global;
            },
            enumerable: true,
            configurable: true
        });
        StageInteraction.prototype.destroy = function () {
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
        };
        return StageInteraction;
    }());
    exports.StageInteraction = StageInteraction;
    StageInteraction.CLICK_EVENT = "click";
    StageInteraction.MOUSE_MOVE = "mousemove";
    StageInteraction.MOUSE_DOWN = "mousedown";
    StageInteraction.MOUSE_UP = "mouseup";
    StageInteraction.MOUSE_UP_OUTSIDE = "mouseupoutside";
});
//# sourceMappingURL=StageInteraction.js.map
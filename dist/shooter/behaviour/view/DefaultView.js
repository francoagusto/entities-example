var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../PositionBehaviour", "pixi.js", "ts-entities"], function (require, exports, PositionBehaviour_1, pixi_js_1, ts_entities_1) {
    "use strict";
    var DefaultView = (function (_super) {
        __extends(DefaultView, _super);
        function DefaultView() {
            var _this = _super.call(this) || this;
            _this.display = new pixi_js_1.Container();
            return _this;
        }
        DefaultView.prototype.setup = function () {
            this.owner.registerReference(DefaultView.DISPLAY_REFRENCE, this.display);
            var onPositionChanged = this.owner.getRegistredReference(PositionBehaviour_1.PositionBehaviour.ON_POSITION_CHANGED_PROPERTY);
            var onAngleChanged = this.owner.getRegistredReference(PositionBehaviour_1.PositionBehaviour.ON_ANGLE_CHANGED_PROPERTY);
            onAngleChanged.add(this.handleAngleChanged, this);
            onPositionChanged.add(this.handlePositionChanged, this);
            var point = this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.GET_POSITION_CALLBACK);
            this.handlePositionChanged(point);
            var angle = this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.GET_ANGLE_CALLBACK);
            this.handleAngleChanged(angle);
        };
        DefaultView.prototype.handleAngleChanged = function (angle) {
            this.display.rotation = (angle + 90) * Math.PI / 180;
        };
        DefaultView.prototype.handlePositionChanged = function (position) {
            this.display.x = position.x;
            this.display.y = position.y;
        };
        DefaultView.prototype.getDependencies = function () {
            return [PositionBehaviour_1.PositionBehaviour.TYPE];
        };
        DefaultView.prototype.getType = function () {
            return DefaultView.TYPE;
        };
        DefaultView.prototype.getDisplay = function () {
            return this.display;
        };
        DefaultView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.display = null;
        };
        return DefaultView;
    }(ts_entities_1.AbstractComponent));
    exports.DefaultView = DefaultView;
    DefaultView.TYPE = "VIEW";
    DefaultView.DISPLAY_REFRENCE = "displayReference";
});
//# sourceMappingURL=DefaultView.js.map
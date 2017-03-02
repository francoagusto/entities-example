var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "signals", "./../model/GameModel", "ts-entities", "pixi.js"], function (require, exports, signals_1, GameModel_1, ts_entities_1, pixi_js_1) {
    "use strict";
    var PositionBehaviour = (function (_super) {
        __extends(PositionBehaviour, _super);
        function PositionBehaviour(x, y, angle, destroyOutOfStage) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (angle === void 0) { angle = 0; }
            if (destroyOutOfStage === void 0) { destroyOutOfStage = false; }
            var _this = _super.call(this) || this;
            _this.gameModel = GameModel_1.GameModel.getInstance();
            _this.position = new pixi_js_1.Point(x, y);
            _this.angle = angle;
            _this.onPositionChanged = new signals_1.Signal();
            _this.onAngleChanged = new signals_1.Signal();
            _this.destroyOutOfStage = destroyOutOfStage;
            return _this;
        }
        PositionBehaviour.prototype.getPosition = function () {
            return this.position;
        };
        PositionBehaviour.prototype.setPosition = function (position) {
            if (this.destroyOutOfStage && this.isOutOfStage(position)) {
                this.owner.callCallback(ts_entities_1.Entity.destroyCallback);
            }
            else {
                this.position.x = Math.max(0, Math.min(position.x, this.gameModel.stageWidth));
                this.position.y = Math.max(0, Math.min(position.y, this.gameModel.stageHeight));
                this.onPositionChanged.dispatch(this.position);
            }
        };
        PositionBehaviour.prototype.isOutOfStage = function (position) {
            return (position.x < 0 || position.y < 0 || position.x > this.gameModel.stageWidth || position.y > this.gameModel.stageHeight);
        };
        PositionBehaviour.prototype.getAngle = function () {
            return this.angle;
        };
        PositionBehaviour.prototype.setAngle = function (value) {
            this.angle = value;
            this.onAngleChanged.dispatch(this.angle);
        };
        PositionBehaviour.prototype.getType = function () {
            return PositionBehaviour.TYPE;
        };
        PositionBehaviour.prototype.setup = function () {
            this.owner.registerCallback(PositionBehaviour.SET_POSITION_CALLBACK, this.setPosition, this);
            this.owner.registerCallback(PositionBehaviour.GET_POSITION_CALLBACK, this.getPosition, this);
            this.owner.registerCallback(PositionBehaviour.SET_ANGLE_CALLBACK, this.setAngle, this);
            this.owner.registerCallback(PositionBehaviour.GET_ANGLE_CALLBACK, this.getAngle, this);
            this.owner.registerReference(PositionBehaviour.ON_POSITION_CHANGED_PROPERTY, this.onPositionChanged);
            this.owner.registerReference(PositionBehaviour.ON_ANGLE_CHANGED_PROPERTY, this.onAngleChanged);
        };
        PositionBehaviour.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return PositionBehaviour;
    }(ts_entities_1.AbstractComponent));
    exports.PositionBehaviour = PositionBehaviour;
    PositionBehaviour.TYPE = "POSITION_CAPABILITY";
    PositionBehaviour.SET_POSITION_CALLBACK = "setPositionCallback";
    PositionBehaviour.GET_POSITION_CALLBACK = "getPositionCallback";
    PositionBehaviour.SET_ANGLE_CALLBACK = "setAngleCallback";
    PositionBehaviour.GET_ANGLE_CALLBACK = "getAngleCallback";
    PositionBehaviour.ON_POSITION_CHANGED_PROPERTY = "onPositionChanged";
    PositionBehaviour.ON_ANGLE_CHANGED_PROPERTY = "onAngleChanged";
});
//# sourceMappingURL=PositionBehaviour.js.map
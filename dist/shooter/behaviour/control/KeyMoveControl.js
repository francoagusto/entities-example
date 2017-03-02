var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../TickBehaviour", "./../PositionBehaviour", "./../view/DefaultView", "typescript-collections", "ts-entities", "pixi.js"], function (require, exports, TickBehaviour_1, PositionBehaviour_1, DefaultView_1, typescript_collections_1, entity, pixi_js_1) {
    "use strict";
    var KeyMoveControl = (function (_super) {
        __extends(KeyMoveControl, _super);
        function KeyMoveControl(velocity) {
            if (velocity === void 0) { velocity = 4; }
            var _this = _super.call(this) || this;
            _this.keyUp = 87;
            _this.keyDown = 83;
            _this.keyLeft = 65;
            _this.keyRight = 68;
            _this.velocity = velocity;
            _this.positionTo = new pixi_js_1.Point();
            _this.keyMap = new typescript_collections_1.Dictionary();
            _this.keyMap.setValue(_this.keyUp, false);
            _this.keyMap.setValue(_this.keyDown, false);
            _this.keyMap.setValue(_this.keyLeft, false);
            _this.keyMap.setValue(_this.keyRight, false);
            return _this;
        }
        KeyMoveControl.prototype.getDependencies = function () {
            return [DefaultView_1.DefaultView.TYPE, PositionBehaviour_1.PositionBehaviour.TYPE, TickBehaviour_1.TickBehaviour.TYPE];
        };
        KeyMoveControl.prototype.setup = function () {
            var display = this.owner.getRegistredReference(DefaultView_1.DefaultView.DISPLAY_REFRENCE);
            this.dx = 0;
            this.dy = 0;
            this.onKeyDownHandler = this.onKeyDown.bind(this);
            this.onKeyUpHandler = this.onKeyUp.bind(this);
            document.addEventListener(KeyMoveControl.KEY_DOWN_EVENT, this.onKeyDownHandler);
            document.addEventListener(KeyMoveControl.KEY_UP_EVENT, this.onKeyUpHandler);
            var onTick = this.owner.getRegistredReference(TickBehaviour_1.TickBehaviour.TICK_SIGNAL_REFERENCE);
            onTick.add(this.handleTick, this);
        };
        KeyMoveControl.prototype.getType = function () {
            return KeyMoveControl.TYPE;
        };
        KeyMoveControl.prototype.handleDeactivate = function (event) {
            for (var _i = 0, _a = this.keyMap.keys(); _i < _a.length; _i++) {
                var key = _a[_i];
                this.keyMap.setValue(key, false);
            }
            this.updateDelta();
        };
        KeyMoveControl.prototype.onKeyDown = function (event) {
            if (this.keyMap.containsKey(event.keyCode)) {
                this.keyMap.setValue(event.keyCode, true);
            }
            this.updateDelta();
        };
        KeyMoveControl.prototype.onKeyUp = function (event) {
            if (this.keyMap.containsKey(event.keyCode)) {
                this.keyMap.setValue(event.keyCode, false);
            }
            this.updateDelta();
        };
        KeyMoveControl.prototype.updateDelta = function () {
            this.dx = this.dy = 0;
            if (this.keyMap.getValue(this.keyUp)) {
                this.dy = -this.velocity;
            }
            if (this.keyMap.getValue(this.keyDown)) {
                this.dy = this.velocity;
            }
            if (this.keyMap.getValue(this.keyLeft)) {
                this.dx = -this.velocity;
            }
            if (this.keyMap.getValue(this.keyRight)) {
                this.dx = this.velocity;
            }
        };
        KeyMoveControl.prototype.handleTick = function () {
            if (this.dx != 0 || this.dy != 0) {
                var point = this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.GET_POSITION_CALLBACK);
                this.positionTo.x = point.x + this.dx;
                this.positionTo.y = point.y + this.dy;
                this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.SET_POSITION_CALLBACK, this.positionTo);
            }
        };
        KeyMoveControl.prototype.destroy = function () {
            document.removeEventListener(KeyMoveControl.KEY_DOWN_EVENT, this.onKeyDownHandler);
            document.removeEventListener(KeyMoveControl.KEY_UP_EVENT, this.onKeyUpHandler);
            _super.prototype.destroy.call(this);
        };
        return KeyMoveControl;
    }(entity.AbstractComponent));
    exports.KeyMoveControl = KeyMoveControl;
    KeyMoveControl.TYPE = "KEYBOARD_CONTROL";
    KeyMoveControl.KEY_DOWN_EVENT = "keydown";
    KeyMoveControl.KEY_UP_EVENT = "keyup";
});
//# sourceMappingURL=KeyMoveControl.js.map
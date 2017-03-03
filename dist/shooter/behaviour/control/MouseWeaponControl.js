var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../TickBehaviour", "pixi.js", "./../weapon/DefaultWeapon", "./../PositionBehaviour", "./../view/DefaultView", "ts-entities"], function (require, exports, TickBehaviour_1, pixi_js_1, DefaultWeapon_1, PositionBehaviour_1, DefaultView_1, entity) {
    "use strict";
    var MouseWeaponControl = (function (_super) {
        __extends(MouseWeaponControl, _super);
        function MouseWeaponControl(stageInteraction) {
            var _this = _super.call(this) || this;
            _this.stageInteraction = stageInteraction;
            return _this;
        }
        MouseWeaponControl.prototype.getDependencies = function () {
            return [DefaultView_1.DefaultView.TYPE, PositionBehaviour_1.PositionBehaviour.TYPE, DefaultWeapon_1.DefaultWeapon.TYPE];
        };
        MouseWeaponControl.prototype.getType = function () {
            return MouseWeaponControl.TYPE;
        };
        MouseWeaponControl.prototype.setup = function () {
            var display = this.owner.getRegistredReference(DefaultView_1.DefaultView.DISPLAY_REFRENCE);
            this.stage = display.parent;
            this.stage.interactive = true;
            this.stageInteraction.onMouseMove.add(this.handleMouseMove, this);
            this.stageInteraction.onMouseDown.add(this.handleMouseDown, this);
            this.stageInteraction.onMouseUp.add(this.handleMouseUp, this);
            this.stageInteraction.onMouseUpOutside.add(this.handleMouseUp, this);
            this.heroPosition = this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.GET_POSITION_CALLBACK);
            var onPositionChanged = this.owner.getRegistredReference(PositionBehaviour_1.PositionBehaviour.ON_POSITION_CHANGED_PROPERTY);
            onPositionChanged.add(this.updateAngle, this);
            this.tickSignal = this.owner.getRegistredReference(TickBehaviour_1.TickBehaviour.TICK_SIGNAL_REFERENCE);
        };
        MouseWeaponControl.prototype.handleMouseDown = function (event) {
            this.tickSignal.add(this.tryFire, this);
        };
        MouseWeaponControl.prototype.handleMouseUp = function (event) {
            this.tickSignal.remove(this.tryFire, this);
        };
        MouseWeaponControl.prototype.tryFire = function () {
            this.updateAngle();
            this.owner.callCallback(DefaultWeapon_1.DefaultWeapon.FIRE_CALLBACK);
        };
        MouseWeaponControl.prototype.handleMouseMove = function (event) {
            this.updateAngle();
        };
        MouseWeaponControl.prototype.updateAngle = function (value) {
            if (value === void 0) { value = 0; }
            var mousePoint = new pixi_js_1.Point(this.stageInteraction.mousePosition.x, this.stageInteraction.mousePosition.y);
            var dx = (this.heroPosition.x - mousePoint.x);
            var dy = (this.heroPosition.y - mousePoint.y);
            var angle = Math.atan2(dy, dx) * (180 / Math.PI) - 180;
            this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.SET_ANGLE_CALLBACK, angle);
        };
        MouseWeaponControl.prototype.destroy = function () {
            this.stageInteraction.onMouseMove.remove(this.handleMouseMove, this);
            this.stageInteraction.onMouseDown.remove(this.handleMouseDown, this);
            this.stageInteraction.onMouseUp.remove(this.handleMouseUp, this);
            this.stageInteraction.onMouseUpOutside.remove(this.handleMouseUp, this);
            this.stage = null;
            _super.prototype.destroy.call(this);
        };
        return MouseWeaponControl;
    }(entity.AbstractComponent));
    exports.MouseWeaponControl = MouseWeaponControl;
    MouseWeaponControl.TYPE = "MOUSE_CONTROL";
});
//# sourceMappingURL=MouseWeaponControl.js.map
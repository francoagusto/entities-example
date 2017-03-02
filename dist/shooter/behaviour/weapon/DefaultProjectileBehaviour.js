var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../PositionBehaviour", "./../TickBehaviour", "ts-entities", "pixi.js"], function (require, exports, PositionBehaviour_1, TickBehaviour_1, entity, pixi_js_1) {
    "use strict";
    var DefaultProjectileBehaviour = (function (_super) {
        __extends(DefaultProjectileBehaviour, _super);
        function DefaultProjectileBehaviour(velocity) {
            var _this = _super.call(this) || this;
            _this.positionTo = new pixi_js_1.Point();
            _this.velocity = velocity;
            return _this;
        }
        DefaultProjectileBehaviour.prototype.getDependencies = function () {
            return [PositionBehaviour_1.PositionBehaviour.TYPE, TickBehaviour_1.TickBehaviour.TYPE];
        };
        DefaultProjectileBehaviour.prototype.getType = function () {
            return DefaultProjectileBehaviour.TYPE;
        };
        DefaultProjectileBehaviour.prototype.setup = function () {
            var onTick = this.owner.getRegistredReference(TickBehaviour_1.TickBehaviour.TICK_SIGNAL_REFERENCE);
            onTick.add(this.handleUpdate, this);
            var angle = this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.GET_ANGLE_CALLBACK);
            angle = angle * (Math.PI / 180);
            this.dx = Math.cos(angle) * this.velocity;
            this.dy = Math.sin(angle) * this.velocity;
        };
        DefaultProjectileBehaviour.prototype.handleUpdate = function () {
            var point = this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.GET_POSITION_CALLBACK);
            this.positionTo.x = point.x + this.dx;
            this.positionTo.y = point.y + this.dy;
            this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.SET_POSITION_CALLBACK, this.positionTo);
        };
        DefaultProjectileBehaviour.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return DefaultProjectileBehaviour;
    }(entity.AbstractComponent));
    exports.DefaultProjectileBehaviour = DefaultProjectileBehaviour;
    DefaultProjectileBehaviour.TYPE = "PROJECTILE_BEHAVIOUR";
});
//# sourceMappingURL=DefaultProjectileBehaviour.js.map
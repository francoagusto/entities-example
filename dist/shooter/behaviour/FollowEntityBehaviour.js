var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./TickBehaviour", "./PositionBehaviour", "pixi.js", "ts-entities"], function (require, exports, TickBehaviour_1, PositionBehaviour_1, pixi_js_1, ts_entities_1) {
    "use strict";
    var FollowEntityBehaviour = (function (_super) {
        __extends(FollowEntityBehaviour, _super);
        function FollowEntityBehaviour(velocity) {
            if (velocity === void 0) { velocity = 3; }
            var _this = _super.call(this) || this;
            _this.positionTo = new pixi_js_1.Point;
            _this.velocity = velocity;
            return _this;
        }
        FollowEntityBehaviour.prototype.getDependencies = function () {
            return [PositionBehaviour_1.PositionBehaviour.TYPE, TickBehaviour_1.TickBehaviour.TYPE];
        };
        FollowEntityBehaviour.prototype.getType = function () {
            return FollowEntityBehaviour.TYPE;
        };
        FollowEntityBehaviour.prototype.setup = function () {
            this.owner.registerCallback(FollowEntityBehaviour.SET_ENTITY_TO_FOLLOW_CALLBACK, this.setEntityToFollow, this);
            var onTick = this.owner.getRegistredReference(TickBehaviour_1.TickBehaviour.TICK_SIGNAL_REFERENCE);
            onTick.add(this.handleUpdate, this);
        };
        FollowEntityBehaviour.prototype.setEntityToFollow = function (value) {
            this.entityToFollow = value;
        };
        FollowEntityBehaviour.prototype.handleOnEntityDestroyed = function () {
            this.entityToFollow = null;
        };
        FollowEntityBehaviour.prototype.handleUpdate = function () {
            if (this.entityToFollow == null || this.entityToFollow.isDestroyed())
                return;
            var followPos = this.entityToFollow.callCallback(PositionBehaviour_1.PositionBehaviour.GET_POSITION_CALLBACK);
            var ownerPos = this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.GET_POSITION_CALLBACK);
            var angle = (Math.atan2(ownerPos.y - followPos.y, ownerPos.x - followPos.x) * (180 / Math.PI) - 180) * (Math.PI / 180);
            this.dx = Math.cos(angle) * this.velocity;
            this.dy = Math.sin(angle) * this.velocity;
            this.positionTo.x = ownerPos.x + this.dx;
            this.positionTo.y = ownerPos.y + this.dy;
            this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.SET_POSITION_CALLBACK, this.positionTo);
        };
        return FollowEntityBehaviour;
    }(ts_entities_1.AbstractComponent));
    exports.FollowEntityBehaviour = FollowEntityBehaviour;
    FollowEntityBehaviour.TYPE = "IA";
    FollowEntityBehaviour.SET_ENTITY_TO_FOLLOW_CALLBACK = "entityToFollow";
});
//# sourceMappingURL=FollowEntityBehaviour.js.map
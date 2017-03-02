var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./PositionBehaviour", "./view/DefaultView", "ts-entities"], function (require, exports, PositionBehaviour_1, DefaultView_1, entity) {
    "use strict";
    var CollisionBehaviour = (function (_super) {
        __extends(CollisionBehaviour, _super);
        function CollisionBehaviour(collisionType, collideTypes, collideCallback) {
            if (collideTypes === void 0) { collideTypes = null; }
            if (collideCallback === void 0) { collideCallback = null; }
            var _this = _super.call(this) || this;
            _this.collisionType = collisionType;
            _this.collideTypes = collideTypes;
            _this.collideCallback = collideCallback;
            return _this;
        }
        CollisionBehaviour.prototype.setup = function () {
            this.display = this.owner.getRegistredReference(DefaultView_1.DefaultView.DISPLAY_REFRENCE);
        };
        CollisionBehaviour.prototype.getDependencies = function () {
            return [PositionBehaviour_1.PositionBehaviour.TYPE, DefaultView_1.DefaultView.TYPE];
        };
        CollisionBehaviour.prototype.getType = function () {
            return CollisionBehaviour.TYPE;
        };
        CollisionBehaviour.prototype.getCollisionType = function () {
            return this.collisionType;
        };
        CollisionBehaviour.prototype.getColliderTypes = function () {
            return this.collideTypes;
        };
        CollisionBehaviour.prototype.getBounds = function () {
            return this.display.getBounds();
        };
        CollisionBehaviour.prototype.hasColliderTypes = function () {
            return this.collideTypes != null && this.collideTypes.length > 0;
        };
        CollisionBehaviour.prototype.collide = function () {
            this.owner.callCallback(this.collideCallback);
        };
        return CollisionBehaviour;
    }(entity.AbstractComponent));
    exports.CollisionBehaviour = CollisionBehaviour;
    CollisionBehaviour.TYPE = "COLLISION_BEHAVIOUR";
    CollisionBehaviour.HERO = "HERO";
    CollisionBehaviour.ENEMY = "ENEMY";
    CollisionBehaviour.BULLET = "BULLET";
});
//# sourceMappingURL=CollisionBehaviour.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../PositionBehaviour", "./../../builder/BulletsBuilder", "ts-entities"], function (require, exports, PositionBehaviour_1, BulletsBuilder_1, ts_entities_1) {
    "use strict";
    var DefaultWeapon = (function (_super) {
        __extends(DefaultWeapon, _super);
        function DefaultWeapon(bulletType, minShootnumbererval) {
            if (bulletType === void 0) { bulletType = "SIMPLE_BULLET"; }
            if (minShootnumbererval === void 0) { minShootnumbererval = 50; }
            var _this = _super.call(this) || this;
            _this.lastShoot = 0;
            _this.bulletType = bulletType;
            _this.minShootnumbererval = minShootnumbererval;
            _this.bulletsBuilder = BulletsBuilder_1.BulletsBuilder.getInstance();
            return _this;
        }
        DefaultWeapon.prototype.setup = function () {
            this.owner.registerCallback(DefaultWeapon.FIRE_CALLBACK, this.fire, this);
        };
        DefaultWeapon.prototype.getType = function () {
            return DefaultWeapon.TYPE;
        };
        DefaultWeapon.prototype.fire = function () {
            var currentTime = Date.now();
            if ((currentTime - this.lastShoot) > this.minShootnumbererval) {
                var angle = this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.GET_ANGLE_CALLBACK);
                var position = this.owner.callCallback(PositionBehaviour_1.PositionBehaviour.GET_POSITION_CALLBACK);
                var bullet = this.bulletsBuilder.createBullet(this.bulletType, Math.floor(position.x), Math.floor(position.y), angle);
                this.lastShoot = currentTime;
            }
        };
        return DefaultWeapon;
    }(ts_entities_1.AbstractComponent));
    exports.DefaultWeapon = DefaultWeapon;
    DefaultWeapon.TYPE = "WEAPON";
    DefaultWeapon.FIRE_CALLBACK = "fire";
});
//# sourceMappingURL=DefaultWeapon.js.map
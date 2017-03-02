define(["require", "exports", "./../behaviour/CollisionBehaviour", "./../behaviour/weapon/DefaultProjectileBehaviour", "./../behaviour/TickBehaviour", "./../behaviour/view/ShapeView", "./../behaviour/PositionBehaviour", "typescript-collections", "ts-entities"], function (require, exports, CollisionBehaviour_1, DefaultProjectileBehaviour_1, TickBehaviour_1, ShapeView_1, PositionBehaviour_1, typescript_collections_1, ts_entities_1) {
    "use strict";
    var BulletsBuilder = (function () {
        function BulletsBuilder() {
            this.bulletBuilderByType = new typescript_collections_1.Dictionary();
            this.bulletBuilderByType.setValue(BulletsBuilder.SIMPLE_BULLET, this.simpleBullet.bind(this));
        }
        BulletsBuilder.getInstance = function () {
            if (BulletsBuilder.instance == null) {
                BulletsBuilder.instance = new BulletsBuilder();
            }
            return BulletsBuilder.instance;
        };
        BulletsBuilder.prototype.setComponentRegister = function (componentRegister) {
            this.componentRegister = componentRegister;
        };
        BulletsBuilder.prototype.createBullet = function (type, x, y, angle) {
            return this.bulletBuilderByType.getValue(type)(x, y, angle);
        };
        BulletsBuilder.prototype.simpleBullet = function (x, y, angle) {
            var bullet = new ts_entities_1.Entity(this.componentRegister);
            bullet.addComponent(new PositionBehaviour_1.PositionBehaviour(x, y, angle, true));
            bullet.addComponent(new ShapeView_1.ShapeView(ShapeView_1.ShapeView.CIRCLE, 5));
            bullet.addComponent(new TickBehaviour_1.TickBehaviour());
            bullet.addComponent(new DefaultProjectileBehaviour_1.DefaultProjectileBehaviour(10));
            bullet.addComponent(new CollisionBehaviour_1.CollisionBehaviour(CollisionBehaviour_1.CollisionBehaviour.BULLET, null, ts_entities_1.Entity.destroyCallback));
            return bullet;
        };
        return BulletsBuilder;
    }());
    exports.BulletsBuilder = BulletsBuilder;
    BulletsBuilder.SIMPLE_BULLET = "SIMPLE_BULLET";
});
//# sourceMappingURL=BulletsBuilder.js.map
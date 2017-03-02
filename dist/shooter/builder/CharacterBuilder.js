define(["require", "exports", "./../behaviour/FollowEntityBehaviour", "./../behaviour/control/MouseWeaponControl", "./BulletsBuilder", "./../behaviour/CollisionBehaviour", "./../behaviour/weapon/DefaultWeapon", "./../behaviour/control/KeyMoveControl", "./../behaviour/view/ShapeView", "./../behaviour/PositionBehaviour", "./../behaviour/TickBehaviour", "typescript-collections", "ts-entities"], function (require, exports, FollowEntityBehaviour_1, MouseWeaponControl_1, BulletsBuilder_1, CollisionBehaviour_1, DefaultWeapon_1, KeyMoveControl_1, ShapeView_1, PositionBehaviour_1, TickBehaviour_1, typescript_collections_1, ts_entities_1) {
    "use strict";
    var CharacterBuilder = (function () {
        function CharacterBuilder() {
            this.characterMapBuilder = new typescript_collections_1.Dictionary();
            this.characterMapBuilder.setValue(CharacterBuilder.HERO, this.buildDefaultHero.bind(this));
            this.characterMapBuilder.setValue(CharacterBuilder.ENEMY_A, this.buildDefaultEnemy.bind(this));
        }
        CharacterBuilder.getInstance = function () {
            if (this.instance == null) {
                this.instance = new CharacterBuilder();
            }
            return this.instance;
        };
        CharacterBuilder.prototype.setComponentRegister = function (componentRegister) {
            this.componentRegister = componentRegister;
        };
        CharacterBuilder.prototype.createCharacter = function (type, x, y) {
            return this.characterMapBuilder.getValue(type)(x, y);
        };
        CharacterBuilder.prototype.buildDefaultHero = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var hero = new ts_entities_1.Entity(this.componentRegister);
            hero.addComponent(new PositionBehaviour_1.PositionBehaviour(x, y));
            hero.addComponent(new ShapeView_1.ShapeView(ShapeView_1.ShapeView.TRIANGLE));
            hero.addComponent(new TickBehaviour_1.TickBehaviour());
            hero.addComponent(new KeyMoveControl_1.KeyMoveControl());
            hero.addComponent(new DefaultWeapon_1.DefaultWeapon(BulletsBuilder_1.BulletsBuilder.SIMPLE_BULLET, 100));
            hero.addComponent(new MouseWeaponControl_1.MouseWeaponControl(this.mouseStage));
            hero.addComponent(new CollisionBehaviour_1.CollisionBehaviour(CollisionBehaviour_1.CollisionBehaviour.HERO, [CollisionBehaviour_1.CollisionBehaviour.ENEMY], ts_entities_1.Entity.destroyCallback));
            return hero;
        };
        CharacterBuilder.prototype.buildDefaultEnemy = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var enemy = new ts_entities_1.Entity(this.componentRegister);
            enemy.addComponent(new PositionBehaviour_1.PositionBehaviour(x, y));
            enemy.addComponent(new ShapeView_1.ShapeView(ShapeView_1.ShapeView.SQUARE));
            enemy.addComponent(new TickBehaviour_1.TickBehaviour());
            enemy.addComponent(new FollowEntityBehaviour_1.FollowEntityBehaviour(2));
            enemy.addComponent(new CollisionBehaviour_1.CollisionBehaviour(CollisionBehaviour_1.CollisionBehaviour.ENEMY, [CollisionBehaviour_1.CollisionBehaviour.BULLET], ts_entities_1.Entity.destroyCallback));
            return enemy;
        };
        return CharacterBuilder;
    }());
    exports.CharacterBuilder = CharacterBuilder;
    CharacterBuilder.HERO = "HERO";
    CharacterBuilder.ENEMY_A = "ENEMY_A";
});
//# sourceMappingURL=CharacterBuilder.js.map
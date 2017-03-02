define(["require", "exports", "./behaviour/CollisionBehaviour", "./manager/CollisionManager", "./builder/BulletsBuilder", "./builder/CharacterBuilder", "./spawn/EnemySpawner", "./behaviour/TickBehaviour", "./manager/TickManager", "./behaviour/view/DefaultView", "./manager/ViewManager", "./model/GameModel", "./../updater/Updater", "pixi.js", "ts-entities"], function (require, exports, CollisionBehaviour_1, CollisionManager_1, BulletsBuilder_1, CharacterBuilder_1, EnemySpawner_1, TickBehaviour_1, TickManager_1, DefaultView_1, ViewManager_1, GameModel_1, Updater_1, pixi_js_1, entity) {
    "use strict";
    var Game = (function () {
        function Game(stage, width, height, tickSignal, mouseStage) {
            this.stage = stage;
            this.width = width;
            this.height = height;
            this.tickSignal = tickSignal;
            this.mouseStage = mouseStage;
            this.gameModel = GameModel_1.GameModel.getInstance();
            this.stage = stage || new pixi_js_1.Container();
            this.gameModel.stageWidth = this.width;
            this.gameModel.stageHeight = this.height;
            this.setupManagers();
            this.buildEntities();
        }
        Game.prototype.setupManagers = function () {
            var componentRegister = new entity.ComponentRegister();
            var viewManager = new ViewManager_1.ViewManager();
            this.updater = new Updater_1.Updater(this.tickSignal);
            this.stage.addChild(viewManager.getDisplay());
            componentRegister.registerComponentManager(DefaultView_1.DefaultView.TYPE, viewManager);
            var tickManager = new TickManager_1.TickManager();
            this.updater.registerUpdatable(tickManager);
            componentRegister.registerComponentManager(TickBehaviour_1.TickBehaviour.TYPE, tickManager);
            var collisionManager = new CollisionManager_1.CollisionManager();
            componentRegister.registerComponentManager(CollisionBehaviour_1.CollisionBehaviour.TYPE, collisionManager);
            this.updater.registerUpdatable(collisionManager);
            BulletsBuilder_1.BulletsBuilder.getInstance().setComponentRegister(componentRegister);
            CharacterBuilder_1.CharacterBuilder.getInstance().setComponentRegister(componentRegister);
            this.updater.start();
        };
        Game.prototype.buildEntities = function () {
            var entityBuilder = CharacterBuilder_1.CharacterBuilder.getInstance();
            entityBuilder.mouseStage = this.mouseStage;
            var hero = entityBuilder.createCharacter(CharacterBuilder_1.CharacterBuilder.HERO, Math.floor(this.gameModel.stageWidth / 2), Math.floor(this.gameModel.stageHeight / 2));
            var enemySpawner = new EnemySpawner_1.EnemySpawner(20000, hero);
            this.updater.registerUpdatable(enemySpawner);
        };
        return Game;
    }());
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map
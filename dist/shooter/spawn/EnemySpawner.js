define(["require", "exports", "./../behaviour/FollowEntityBehaviour", "./../builder/CharacterBuilder", "./../model/GameModel"], function (require, exports, FollowEntityBehaviour_1, CharacterBuilder_1, GameModel_1) {
    "use strict";
    var EnemySpawner = (function () {
        function EnemySpawner(timenumbererval, currentHero) {
            this.types = [CharacterBuilder_1.CharacterBuilder.ENEMY_A];
            this.gameModel = GameModel_1.GameModel.getInstance();
            this.timenumbererval = timenumbererval;
            this.lastSpawnTime = 0;
            this.hero = currentHero;
        }
        EnemySpawner.prototype.update = function () {
            var currentTime = Date.now();
            if ((currentTime - this.lastSpawnTime) > this.timenumbererval) {
                this.spawnEnemy();
                this.lastSpawnTime = currentTime;
            }
        };
        EnemySpawner.prototype.spawnEnemy = function () {
            var type = this.types[Math.floor(this.types.length * Math.random())];
            var randomInX = this.boolRandom();
            var xPos = Math.floor(randomInX ? (Math.random() * this.gameModel.stageWidth) : (this.boolRandom() ? 0 : this.gameModel.stageWidth));
            var yPos = Math.floor(!randomInX ? (Math.random() * this.gameModel.stageHeight) : (this.boolRandom() ? 0 : this.gameModel.stageHeight));
            var enemy = CharacterBuilder_1.CharacterBuilder.getInstance().createCharacter(type, xPos, yPos);
            enemy.callCallback(FollowEntityBehaviour_1.FollowEntityBehaviour.SET_ENTITY_TO_FOLLOW_CALLBACK, this.hero);
        };
        EnemySpawner.prototype.boolRandom = function () {
            return Math.random() > .5;
        };
        return EnemySpawner;
    }());
    exports.EnemySpawner = EnemySpawner;
});
//# sourceMappingURL=EnemySpawner.js.map
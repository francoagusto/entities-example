define(["require", "exports"], function (require, exports) {
    "use strict";
    var GameModel = (function () {
        function GameModel() {
        }
        GameModel.getInstance = function () {
            if (GameModel.instance == null) {
                GameModel.instance = new GameModel();
            }
            return GameModel.instance;
        };
        return GameModel;
    }());
    exports.GameModel = GameModel;
});
//# sourceMappingURL=GameModel.js.map
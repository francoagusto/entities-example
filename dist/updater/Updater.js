define(["require", "exports"], function (require, exports) {
    "use strict";
    var Updater = (function () {
        function Updater(onUpdate) {
            this.onUpdate = onUpdate;
            this.updatables = new Array();
        }
        Updater.prototype.start = function () {
            this.onUpdate.add(this.hanldeEnterFrame, this);
        };
        Updater.prototype.stop = function () {
            this.onUpdate.remove(this.hanldeEnterFrame, this);
        };
        Updater.prototype.registerUpdatable = function (updatable) {
            this.updatables.push(updatable);
        };
        Updater.prototype.unregisterUpdatable = function (updatable) {
            this.updatables.splice(this.updatables.indexOf(updatable), 1);
        };
        Updater.prototype.hanldeEnterFrame = function () {
            for (var _i = 0, _a = this.updatables; _i < _a.length; _i++) {
                var updateable = _a[_i];
                updateable.update();
            }
        };
        return Updater;
    }());
    exports.Updater = Updater;
});
//# sourceMappingURL=Updater.js.map
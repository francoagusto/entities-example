var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "ts-entities"], function (require, exports, entity) {
    "use strict";
    var TickManager = (function (_super) {
        __extends(TickManager, _super);
        function TickManager() {
            return _super.call(this) || this;
        }
        TickManager.prototype.update = function () {
            for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
                var component = _a[_i];
                var tickComponent = component;
                tickComponent.tick();
            }
        };
        return TickManager;
    }(entity.DefaultComponentManager));
    exports.TickManager = TickManager;
});
//# sourceMappingURL=TickManager.js.map
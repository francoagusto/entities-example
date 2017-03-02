var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "pixi.js", "ts-entities"], function (require, exports, pixi_js_1, ts_entities_1) {
    "use strict";
    var ViewManager = (function (_super) {
        __extends(ViewManager, _super);
        function ViewManager() {
            var _this = _super.call(this) || this;
            _this.display = new pixi_js_1.Container();
            return _this;
        }
        ViewManager.prototype.registerComponent = function (view) {
            _super.prototype.registerComponent.call(this, view);
            this.display.addChild(view.getDisplay());
        };
        ViewManager.prototype.unregisterComponent = function (view) {
            this.display.removeChild(view.getDisplay());
            _super.prototype.unregisterComponent.call(this, view);
        };
        ViewManager.prototype.getDisplay = function () {
            return this.display;
        };
        return ViewManager;
    }(ts_entities_1.DefaultComponentManager));
    exports.ViewManager = ViewManager;
});
//# sourceMappingURL=ViewManager.js.map
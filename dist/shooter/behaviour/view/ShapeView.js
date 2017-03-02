var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./DefaultView", "pixi.js", "./QuickDrawStrategy"], function (require, exports, DefaultView_1, pixi_js_1, QuickDrawStrategy_1) {
    "use strict";
    var ShapeView = (function (_super) {
        __extends(ShapeView, _super);
        function ShapeView(type, size, borderColor, fillColor) {
            if (type === void 0) { type = "square"; }
            if (size === void 0) { size = 30; }
            if (borderColor === void 0) { borderColor = 0x000000; }
            if (fillColor === void 0) { fillColor = 0xFFFFFF; }
            var _this = _super.call(this) || this;
            _this.drawStrategy = QuickDrawStrategy_1.QuickDrawStrategy.getInstance();
            var graphics = new pixi_js_1.Graphics();
            graphics.clear();
            var container = _this.getDisplay();
            container.addChild(graphics);
            _this.drawStrategy.quickDraw(type, graphics, size, borderColor, fillColor);
            graphics.endFill();
            return _this;
        }
        return ShapeView;
    }(DefaultView_1.DefaultView));
    exports.ShapeView = ShapeView;
    ShapeView.SQUARE = "square";
    ShapeView.CIRCLE = "circle";
    ShapeView.TRIANGLE = "triangle";
});
//# sourceMappingURL=ShapeView.js.map
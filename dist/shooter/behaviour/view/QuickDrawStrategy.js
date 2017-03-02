define(["require", "exports", "./ShapeView", "typescript-collections"], function (require, exports, ShapeView_1, typescript_collections_1) {
    "use strict";
    var QuickDrawStrategy = (function () {
        function QuickDrawStrategy() {
            this.drawMap = new typescript_collections_1.Dictionary();
            this.drawMap.setValue(ShapeView_1.ShapeView.SQUARE, this.drawRectangle.bind(this));
            this.drawMap.setValue(ShapeView_1.ShapeView.TRIANGLE, this.drawTriangle.bind(this));
            this.drawMap.setValue(ShapeView_1.ShapeView.CIRCLE, this.drawCircle.bind(this));
        }
        QuickDrawStrategy.getInstance = function () {
            if (this.instance == null) {
                this.instance = new QuickDrawStrategy();
            }
            return this.instance;
        };
        QuickDrawStrategy.prototype.quickDraw = function (type, graphic, size, borderColor, fillColor) {
            if (size === void 0) { size = 30; }
            if (borderColor === void 0) { borderColor = 0x000000; }
            if (fillColor === void 0) { fillColor = 0xFFFFFF; }
            graphic.lineStyle(1, borderColor);
            graphic.beginFill(fillColor);
            var draw = this.drawMap.getValue(type);
            draw(graphic, size);
            graphic.endFill();
        };
        QuickDrawStrategy.prototype.drawRectangle = function (graphic, size) {
            graphic.drawRect(-size / 2, -size / 2, size, size);
        };
        QuickDrawStrategy.prototype.drawTriangle = function (graphic, size) {
            graphic.moveTo(-size / 2, size / 4);
            graphic.lineTo(size / 2, size / 4);
            graphic.lineTo(0, -size / 2);
            graphic.lineTo(-size / 2, size / 4);
        };
        QuickDrawStrategy.prototype.drawCircle = function (graphic, size) {
            graphic.drawCircle(0, 0, size / 2);
        };
        return QuickDrawStrategy;
    }());
    exports.QuickDrawStrategy = QuickDrawStrategy;
});
//# sourceMappingURL=QuickDrawStrategy.js.map
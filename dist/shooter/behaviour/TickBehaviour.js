var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "signals", "ts-entities"], function (require, exports, signals_1, entity) {
    "use strict";
    var TickBehaviour = (function (_super) {
        __extends(TickBehaviour, _super);
        function TickBehaviour() {
            var _this = _super.call(this) || this;
            _this.onTick = new signals_1.Signal();
            return _this;
        }
        TickBehaviour.prototype.setup = function () {
            this.owner.registerReference(TickBehaviour.TICK_SIGNAL_REFERENCE, this.onTick);
        };
        TickBehaviour.prototype.getType = function () {
            return TickBehaviour.TYPE;
        };
        TickBehaviour.prototype.tick = function () {
            this.onTick.dispatch();
        };
        TickBehaviour.prototype.destroy = function () {
            if (this.onTick != null)
                this.onTick.removeAll();
            this.onTick = null;
            _super.prototype.destroy.call(this);
        };
        return TickBehaviour;
    }(entity.AbstractComponent));
    exports.TickBehaviour = TickBehaviour;
    TickBehaviour.TYPE = "TICK_BEHAVIOUR";
    TickBehaviour.TICK_SIGNAL_REFERENCE = "onTick";
});
//# sourceMappingURL=TickBehaviour.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "typescript-collections", "ts-entities"], function (require, exports, typescript_collections_1, ts_entities_1) {
    "use strict";
    var CollisionManager = (function (_super) {
        __extends(CollisionManager, _super);
        function CollisionManager() {
            var _this = _super.call(this) || this;
            _this.collidersByType = new typescript_collections_1.Dictionary();
            _this.collisionables = new Array();
            return _this;
        }
        CollisionManager.prototype.registerComponent = function (component) {
            _super.prototype.registerComponent.call(this, component);
            var collider = component;
            var type = collider.getCollisionType();
            var colliders;
            if (!this.collidersByType.containsKey(type) || this.collidersByType.getValue(type) == null) {
                colliders = new Array();
                this.collidersByType.setValue(type, colliders);
            }
            else {
                colliders = this.collidersByType.getValue(type);
            }
            colliders.push(collider);
            if (collider.hasColliderTypes()) {
                this.collisionables.push(collider);
            }
        };
        CollisionManager.prototype.unregisterComponent = function (component) {
            var collider = component;
            var colliders;
            var type = collider.getCollisionType();
            if (this.collidersByType.containsKey(type)) {
                colliders = this.collidersByType.getValue(type);
                colliders.splice(colliders.indexOf(collider), 1);
                if (colliders.length == 0) {
                    this.collidersByType.remove(type);
                }
            }
            if (collider.hasColliderTypes()) {
                this.collisionables.splice(this.collisionables.indexOf(collider), 1);
            }
            _super.prototype.unregisterComponent.call(this, component);
        };
        CollisionManager.prototype.update = function () {
            var i = this.collisionables.length - 1;
            var colliderA;
            var colliderTypes;
            while (i >= 0) {
                colliderA = this.collisionables[i];
                colliderTypes = colliderA.getColliderTypes();
                if (colliderTypes != null) {
                    for (var _i = 0, colliderTypes_1 = colliderTypes; _i < colliderTypes_1.length; _i++) {
                        var type = colliderTypes_1[_i];
                        var colliders = this.collidersByType.getValue(type);
                        if (colliders != null) {
                            for (var _a = 0, colliders_1 = colliders; _a < colliders_1.length; _a++) {
                                var colliderB = colliders_1[_a];
                                if (this.intersectsRectangle(colliderA.getBounds(), colliderB.getBounds())) {
                                    colliderA.collide();
                                    colliderB.collide();
                                }
                            }
                        }
                    }
                }
                i--;
            }
        };
        CollisionManager.prototype.intersectsRectangle = function (a, b) {
            return !(b.height + b.y < a.y ||
                b.y > a.y + a.height ||
                b.width + b.x < a.x ||
                b.x > a.x + a.width);
        };
        return CollisionManager;
    }(ts_entities_1.DefaultComponentManager));
    exports.CollisionManager = CollisionManager;
});
//# sourceMappingURL=CollisionManager.js.map
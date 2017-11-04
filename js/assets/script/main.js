window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LabelButton = /** @class */ (function (_super) {
    __extends(LabelButton, _super);
    function LabelButton(param) {
        var _this = _super.call(this, {
            scene: param.scene,
            width: param.width,
            height: param.image.height,
            backgroundImage: param.image,
            backgroundEffector: param.image && new g.NinePatchSurfaceEffector(param.scene.game),
            touchable: true
        }) || this;
        _this.onClick = new g.Trigger();
        var font = param.font ? param.font : new g.DynamicFont({
            game: param.scene.game,
            fontFamily: g.FontFamily.SansSerif,
            size: 15
        });
        _this.label = new g.Label({
            scene: param.scene,
            font: font,
            text: param.text,
            fontSize: param.fontSize ? param.fontSize : 18,
            textColor: "white",
        });
        _this.label.aligning(_this.width, g.TextAlign.Center);
        _this.label.invalidate();
        _this.append(_this.label);
        _this.pointUp.add(_this.onPointUp, _this);
        return _this;
    }
    LabelButton.prototype.destroy = function () {
        this.onClick.destroy();
        this.onClick = null;
        this.label = null;
        _super.prototype.destroy.call(this);
    };
    LabelButton.prototype.onPointUp = function (e) {
        this.onClick.fire();
    };
    return LabelButton;
}(g.Pane));
exports.LabelButton = LabelButton;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(2);
module.exports = function () {
    var scene = new g.Scene({ game: g.game });
    scene.loaded.add(function () {
        var pagination = new index_1.Pagination({
            scene: scene,
            x: 0,
            y: 0,
            width: 100,
            height: 200,
            limit: {
                vertical: 8,
                horizontal: 1
            },
            position: index_1.Position.Bottom,
            paddingRight: 10,
            first: true,
            last: true
        });
        scene.append(pagination);
        var colors = [
            "red",
            "green",
            "blue",
            "yellow",
            "black"
        ];
        for (var i = 0; i < 100; i++) {
            var rect = new g.FilledRect({
                scene: scene,
                cssColor: colors[g.game.random.get(0, 4)],
                width: 80,
                height: 10,
                x: 10,
                y: 10
            });
            pagination.content.append(rect);
        }
        var multiColumn = new index_1.Pagination({
            scene: scene,
            x: 100,
            y: 0,
            width: 150,
            height: 150,
            limit: {
                vertical: 5,
                horizontal: 5
            },
            position: index_1.Position.Bottom,
            paddingRight: 10
        });
        scene.append(multiColumn);
        for (var i = 0; i < 100; i++) {
            var rect = new g.FilledRect({
                scene: scene,
                cssColor: colors[g.game.random.get(0, 4)],
                width: 10,
                height: 10,
                x: 10,
                y: 10
            });
            multiColumn.content.append(rect);
        }
    });
    g.game.pushScene(scene);
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(0));
__export(__webpack_require__(3));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LabelButton_1 = __webpack_require__(0);
var createDefaultButtonImage_1 = __webpack_require__(4);
var Position;
(function (Position) {
    Position[Position["Top"] = 0] = "Top";
    Position[Position["Bottom"] = 1] = "Bottom";
})(Position = exports.Position || (exports.Position = {}));
var PaginationContent = /** @class */ (function (_super) {
    __extends(PaginationContent, _super);
    function PaginationContent(param) {
        var _this = _super.call(this, param) || this;
        _this._limit = param.limit;
        _this.offset = 0;
        _this._width = _this.width;
        _this.padding = param.padding;
        _this.lastOffset = 0;
        _this.touchable = true;
        return _this;
    }
    PaginationContent.prototype.append = function (e) {
        if (this.children) {
            var prev = this.children[this.children.length - 1];
            if (this.children.length % this.limit === 0) {
                e.x = prev.x + prev.width + this.padding + e.x;
            }
            else if (this.children.length % this._limit.horizontal === 0) {
                e.x = this.children[this.children.length - this._limit.horizontal].x;
                e.y = prev.y + prev.height + e.y;
            }
            else {
                e.x = prev.x + prev.width + this.padding + e.x;
                e.y = prev.y;
            }
        }
        _super.prototype.append.call(this, e);
        var l = Math.floor(this.children.length / this.limit);
        this.lastOffset = this.children.length % this.limit === 0 ? l - 1 : l;
    };
    PaginationContent.prototype.previous = function () {
        if (this.offset > 0) {
            this.move(this.offset - 1);
        }
    };
    PaginationContent.prototype.next = function () {
        if (this.offset < this.lastOffset) {
            this.move(this.offset + 1);
        }
    };
    PaginationContent.prototype.first = function () {
        if (this.offset > 0) {
            this.move(0);
        }
    };
    PaginationContent.prototype.last = function () {
        if (this.offset < this.lastOffset) {
            this.move(this.lastOffset);
        }
    };
    PaginationContent.prototype.move = function (target) {
        if (this.offset !== target && target >= 0 && target <= this.lastOffset) {
            var current = this.offset;
            this.x = this.x + this._width * (current - target);
            this.offset = target;
            this.modified();
        }
    };
    PaginationContent.prototype.modified = function (isBubbling) {
        this.resize();
        _super.prototype.modified.call(this, isBubbling);
    };
    Object.defineProperty(PaginationContent.prototype, "limit", {
        get: function () {
            return this._limit.vertical * this._limit.horizontal;
        },
        enumerable: true,
        configurable: true
    });
    PaginationContent.prototype.resize = function () {
        var last = this.children[this.children.length - 1];
        this.width = Math.max(this.width, last.x + last.width);
    };
    return PaginationContent;
}(g.E));
exports.PaginationContent = PaginationContent;
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination(param) {
        var _this = _super.call(this, param) || this;
        if (param.previous === undefined || param.next === undefined || param.first === true || param.last === true) {
            _this._image = createDefaultButtonImage_1.createDefaultButtonImage(param.scene.game, _this.width / 4, 24, "rgba(164, 164, 164, 0.7)");
            ;
        }
        var contentY;
        switch (param.position) {
            case Position.Top:
                contentY = param.previous ? param.previous.height : _this._image.height;
                break;
            default:
                contentY = 0;
                break;
        }
        _this._content = new PaginationContent({
            scene: param.scene,
            width: param.width,
            height: param.height,
            y: contentY,
            limit: param.limit,
            padding: param.paddingRight
        });
        _this.append(_this._content);
        _this.touchable = true;
        var buttonWidth = Math.round(param.width / 4);
        _this.previous = param.previous ? param.previous : new LabelButton_1.LabelButton({ scene: param.scene, width: buttonWidth, text: "<", image: _this._image });
        _this.previous.onClick.add(function () { return _this._content.previous(); }, _this);
        _this.previous.x = param.width / 4;
        var buttonY;
        switch (param.position) {
            case Position.Top:
                buttonY = 0;
                break;
            case Position.Bottom:
                buttonY = param.height - _this.previous.height;
                break;
        }
        _this.previous.y = buttonY;
        _this.append(_this.previous);
        _this.next = param.next ? param.next : new LabelButton_1.LabelButton({ scene: param.scene, width: buttonWidth, text: ">", image: _this._image });
        _this.next.onClick.add(function () { return _this._content.next(); }, _this);
        _this.next.x = param.width / 2;
        _this.next.y = buttonY;
        _this.append(_this.next);
        if (param.first) {
            _this.first = param.first === true ? new LabelButton_1.LabelButton({ scene: param.scene, width: buttonWidth, text: "|<", image: _this._image })
                : param.first;
            _this.first.onClick.add(function () { return _this._content.first(); }, _this);
            _this.first.x = 0;
            _this.first.y = buttonY;
            _this.append(_this.first);
        }
        if (param.last) {
            _this.last = param.last === true ? new LabelButton_1.LabelButton({ scene: param.scene, width: buttonWidth, text: ">|", image: _this._image })
                : param.last;
            _this.last.onClick.add(function () { return _this._content.last(); }, _this);
            _this.last.x = param.width / 4 * 3;
            _this.last.y = buttonY;
            _this.append(_this.last);
        }
        return _this;
    }
    Object.defineProperty(Pagination.prototype, "content", {
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    Pagination.prototype.moveOffset = function (target) {
        this._content.move(target);
    };
    Pagination.prototype.destroy = function () {
        this.previous = null; // destroy() called as destroying this.children.
        this.next = null; // ditto.
        this.first = null; // ditto.
        this.last = null; // ditto.
        this._content = null; // ditto.
        if (this._image) {
            this._image.destroy();
            this._image = null;
        }
        _super.prototype.destroy.call(this);
    };
    return Pagination;
}(g.Pane));
exports.Pagination = Pagination;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createDefaultButtonImage(game, width, height, color) {
    var w = Math.round(width);
    var h = Math.round(height);
    var s = game.resourceFactory.createSurface(w, h);
    var r = s.renderer();
    r.begin();
    r.fillRect(0, 0, w, h, color);
    r.end();
    return s;
}
exports.createDefaultButtonImage = createDefaultButtonImage;


/***/ })
/******/ ]);
})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}
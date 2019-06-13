"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
var PickerService = /** @class */ (function () {
    function PickerService() {
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.sameDateSelected = new core_1.EventEmitter();
    }
    return PickerService;
}());
exports.PickerService = PickerService;

import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var PickerService = /** @class */ (function () {
    function PickerService() {
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.sameDateSelected = new EventEmitter();
    }
    return PickerService;
}());
export { PickerService };

import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class PickerService {
    constructor() {
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.sameDateSelected = new EventEmitter();
    }
}

import { EventEmitter } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { DateInputComponent } from '../dateinput/dateinput.component';
import { TimeSelectorComponent } from '../timepicker/timeselector.component';
/**
 * @hidden
 */
export declare class PickerService {
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    sameDateSelected: EventEmitter<any>;
    calendar: CalendarComponent;
    input: DateInputComponent;
    timeSelector: TimeSelectorComponent;
}

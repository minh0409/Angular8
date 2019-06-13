import { ViewContainerRef } from '@angular/core';
/**
 * Used for configuring the popup settings.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 * <kendo-splitbutton [data]="listItems" [popupSettings]="{ animate: animate, popupClass: popupClass, appendTo: 'component' }">
 *    SplitButton
 * </kendo-splitbutton>
 * `
 * })
 * class AppComponent {
 *   public animate: boolean = false;
 *   public popupClass: string = 'customClass';
 *   public listItems: Array<any> = [{
 *      text: 'item1'
 *  }, {
 *      text: 'item2'
 *  }]
 * }
 * ```
 */
export interface PopupSettings {
    /**
     * Controls the popup animation. By default, the open and close animation are enabled.
     */
    animate: boolean;
    /**
     * Specifies a list of CSS classes used for styling the popup.
     */
    popupClass?: string;
    /**
     * Controls the popup container. By default, the popup will be appended to the root component.
     */
    appendTo?: 'root' | 'component' | ViewContainerRef;
    /**
     * Controls the alignment of the popup. By default, the popup is left aligned.
     */
    align?: 'left' | 'center' | 'right';
}

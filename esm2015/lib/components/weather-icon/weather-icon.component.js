/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
export class WeatherIconComponent {
}
WeatherIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'weather-icon',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [``],
                template: `
    <i *ngIf="iconClass" [class]="iconClass"></i>
    <img *ngIf="iconImageUrl && !iconClass" [src]="iconImageUrl">
  `
            },] },
];
/** @nocollapse */
WeatherIconComponent.propDecorators = {
    "iconClass": [{ type: Input },],
    "iconImageUrl": [{ type: Input },],
    "title": [{ type: Input },],
};
function WeatherIconComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherIconComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherIconComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherIconComponent.propDecorators;
    /** @type {?} */
    WeatherIconComponent.prototype.iconClass;
    /** @type {?} */
    WeatherIconComponent.prototype.iconImageUrl;
    /** @type {?} */
    WeatherIconComponent.prototype.title;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci1pY29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy93ZWF0aGVyLWljb24vd2VhdGhlci1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsS0FBSyxFQUdOLE1BQU0sZUFBZSxDQUFDO0FBV3ZCLE1BQU07OztZQVRMLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDWixRQUFRLEVBQUU7OztHQUdUO2FBQ0Y7Ozs7MEJBRUUsS0FBSzs2QkFDTCxLQUFLO3NCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItaWNvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtgYF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgKm5nSWY9XCJpY29uQ2xhc3NcIiBbY2xhc3NdPVwiaWNvbkNsYXNzXCI+PC9pPlxuICAgIDxpbWcgKm5nSWY9XCJpY29uSW1hZ2VVcmwgJiYgIWljb25DbGFzc1wiIFtzcmNdPVwiaWNvbkltYWdlVXJsXCI+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckljb25Db21wb25lbnQge1xuICBASW5wdXQoKSBpY29uQ2xhc3MhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGljb25JbWFnZVVybCE6IHN0cmluZztcbiAgQElucHV0KCkgdGl0bGUhOiBzdHJpbmc7XG59XG4iXX0=
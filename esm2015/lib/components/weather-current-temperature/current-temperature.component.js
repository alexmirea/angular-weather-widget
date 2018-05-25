/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class WeatherCurrentTempComponent {
    constructor() {
        this._deg = TemperatureScale.CELCIUS;
    }
    /**
     * @return {?}
     */
    get deg() {
        return this._deg;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set deg(value) {
        this._deg = value;
        switch (value) {
            case TemperatureScale.CELCIUS:
                this.unitSymbol = 'C';
                break;
            case TemperatureScale.FAHRENHEIT:
                this.unitSymbol = 'F';
                break;
            case TemperatureScale.KELVIN:
                this.unitSymbol = 'K';
                break;
            default:
                this.unitSymbol = 'C';
        }
    }
}
WeatherCurrentTempComponent.decorators = [
    { type: Component, args: [{
                selector: 'weather-current-temperature',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [
                    `
  :host {
    display: block;
    line-height: 1.1em;
  }
    .deg {
      letter-spacing: -0.13em;
      position: relative;
      left: -0.2em;
    }
  `
                ],
                template: `
      {{ temp?.toFixed() }} <span *ngIf="temp" class="deg">&deg; {{ unitSymbol }}</span>
  `
            },] },
];
/** @nocollapse */
WeatherCurrentTempComponent.propDecorators = {
    "temp": [{ type: Input },],
    "deg": [{ type: Input },],
};
function WeatherCurrentTempComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherCurrentTempComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherCurrentTempComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherCurrentTempComponent.propDecorators;
    /** @type {?} */
    WeatherCurrentTempComponent.prototype.unitSymbol;
    /** @type {?} */
    WeatherCurrentTempComponent.prototype.temp;
    /** @type {?} */
    WeatherCurrentTempComponent.prototype._deg;
}
/** @enum {string} */
const TemperatureScale = {
    CELCIUS: /** @type {?} */ ('celcius'),
    KELVIN: /** @type {?} */ ('kelvin'),
    FAHRENHEIT: /** @type {?} */ ('fahrenheit'),
};
export { TemperatureScale };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlL2N1cnJlbnQtdGVtcGVyYXR1cmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXNCMUUsTUFBTTs7b0JBd0I2QixnQkFBZ0IsQ0FBQyxPQUFPOzs7OztJQXJCekQsSUFBSSxHQUFHO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDbEI7Ozs7O1FBR0csR0FBRyxDQUFDLEtBQXVCO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLGdCQUFnQixDQUFDLE9BQU87Z0JBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO2dCQUN0QixLQUFLLENBQUM7WUFDUixLQUFLLGdCQUFnQixDQUFDLFVBQVU7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO2dCQUN0QixLQUFLLENBQUM7WUFDUixLQUFLLGdCQUFnQixDQUFDLE1BQU07Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO2dCQUN0QixLQUFLLENBQUM7WUFDUjtnQkFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztTQUN6Qjs7OztZQTFDSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRTtvQkFDTjs7Ozs7Ozs7OztHQVVEO2lCQUNBO2dCQUNELFFBQVEsRUFBRTs7R0FFVDthQUNGOzs7O3FCQUdFLEtBQUs7b0JBS0wsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQXFCUyxTQUFTOzhCQUNWLFFBQVE7a0NBQ0osWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBsaW5lLWhlaWdodDogMS4xZW07XG4gIH1cbiAgICAuZGVnIHtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtMC4xM2VtO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgbGVmdDogLTAuMmVtO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAge3sgdGVtcD8udG9GaXhlZCgpIH19IDxzcGFuICpuZ0lmPVwidGVtcFwiIGNsYXNzPVwiZGVnXCI+JmRlZzsge3sgdW5pdFN5bWJvbCB9fTwvc3Bhbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyQ3VycmVudFRlbXBDb21wb25lbnQge1xuICB1bml0U3ltYm9sITogc3RyaW5nO1xuICBASW5wdXQoKSB0ZW1wITogbnVtYmVyO1xuICBnZXQgZGVnKCk6IFRlbXBlcmF0dXJlU2NhbGUge1xuICAgIHJldHVybiB0aGlzLl9kZWc7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVnKHZhbHVlOiBUZW1wZXJhdHVyZVNjYWxlKSB7XG4gICAgdGhpcy5fZGVnID0gdmFsdWU7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLkNFTENJVVM6XG4gICAgICAgIHRoaXMudW5pdFN5bWJvbCA9ICdDJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuRkFIUkVOSEVJVDpcbiAgICAgICAgdGhpcy51bml0U3ltYm9sID0gJ0YnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5LRUxWSU46XG4gICAgICAgIHRoaXMudW5pdFN5bWJvbCA9ICdLJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnVuaXRTeW1ib2wgPSAnQyc7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2RlZzogVGVtcGVyYXR1cmVTY2FsZSA9IFRlbXBlcmF0dXJlU2NhbGUuQ0VMQ0lVUztcbn1cblxuZXhwb3J0IGVudW0gVGVtcGVyYXR1cmVTY2FsZSB7XG4gIENFTENJVVMgPSA8YW55PidjZWxjaXVzJyxcbiAgS0VMVklOID0gPGFueT4na2VsdmluJyxcbiAgRkFIUkVOSEVJVCA9IDxhbnk+J2ZhaHJlbmhlaXQnXG59XG4iXX0=
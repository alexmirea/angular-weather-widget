/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
var WeatherCurrentTempComponent = /** @class */ (function () {
    function WeatherCurrentTempComponent() {
        this._deg = TemperatureScale.CELCIUS;
    }
    Object.defineProperty(WeatherCurrentTempComponent.prototype, "deg", {
        get: /**
         * @return {?}
         */
        function () {
            return this._deg;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    WeatherCurrentTempComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-current-temperature',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n  :host {\n    display: block;\n    line-height: 1.1em;\n  }\n    .deg {\n      letter-spacing: -0.13em;\n      position: relative;\n      left: -0.2em;\n    }\n  "
                    ],
                    template: "\n      {{ temp?.toFixed() }} <span *ngIf=\"temp\" class=\"deg\">&deg; {{ unitSymbol }}</span>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherCurrentTempComponent.propDecorators = {
        "temp": [{ type: Input },],
        "deg": [{ type: Input },],
    };
    return WeatherCurrentTempComponent;
}());
export { WeatherCurrentTempComponent };
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
var TemperatureScale = {
    CELCIUS: /** @type {?} */ ('celcius'),
    KELVIN: /** @type {?} */ ('kelvin'),
    FAHRENHEIT: /** @type {?} */ ('fahrenheit'),
};
export { TemperatureScale };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlL2N1cnJlbnQtdGVtcGVyYXR1cmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O29CQThDdkMsZ0JBQWdCLENBQUMsT0FBTzs7SUFyQnpELHNCQUFJLDRDQUFHOzs7O1FBQVA7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNsQjs7Ozs7a0JBR08sS0FBdUI7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbEIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZCxLQUFLLGdCQUFnQixDQUFDLE9BQU87b0JBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO29CQUN0QixLQUFLLENBQUM7Z0JBQ1IsS0FBSyxnQkFBZ0IsQ0FBQyxVQUFVO29CQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztvQkFDdEIsS0FBSyxDQUFDO2dCQUNSLEtBQUssZ0JBQWdCLENBQUMsTUFBTTtvQkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7b0JBQ3RCLEtBQUssQ0FBQztnQkFDUjtvQkFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzthQUN6Qjs7OztPQWpCRjs7Z0JBekJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsTUFBTSxFQUFFO3dCQUNOLHVLQVVEO3FCQUNBO29CQUNELFFBQVEsRUFBRSxvR0FFVDtpQkFDRjs7Ozt5QkFHRSxLQUFLO3dCQUtMLEtBQUs7O3NDQTdCUjs7U0FzQmEsMkJBQTJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkE0QnZCLFNBQVM7OEJBQ1YsUUFBUTtrQ0FDSixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjFlbTtcbiAgfVxuICAgIC5kZWcge1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IC0wLjEzZW07XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBsZWZ0OiAtMC4yZW07XG4gICAgfVxuICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICB7eyB0ZW1wPy50b0ZpeGVkKCkgfX0gPHNwYW4gKm5nSWY9XCJ0ZW1wXCIgY2xhc3M9XCJkZWdcIj4mZGVnOyB7eyB1bml0U3ltYm9sIH19PC9zcGFuPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJDdXJyZW50VGVtcENvbXBvbmVudCB7XG4gIHVuaXRTeW1ib2whOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRlbXAhOiBudW1iZXI7XG4gIGdldCBkZWcoKTogVGVtcGVyYXR1cmVTY2FsZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBkZWcodmFsdWU6IFRlbXBlcmF0dXJlU2NhbGUpIHtcbiAgICB0aGlzLl9kZWcgPSB2YWx1ZTtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuQ0VMQ0lVUzpcbiAgICAgICAgdGhpcy51bml0U3ltYm9sID0gJ0MnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5GQUhSRU5IRUlUOlxuICAgICAgICB0aGlzLnVuaXRTeW1ib2wgPSAnRic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLktFTFZJTjpcbiAgICAgICAgdGhpcy51bml0U3ltYm9sID0gJ0snO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMudW5pdFN5bWJvbCA9ICdDJztcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfZGVnOiBUZW1wZXJhdHVyZVNjYWxlID0gVGVtcGVyYXR1cmVTY2FsZS5DRUxDSVVTO1xufVxuXG5leHBvcnQgZW51bSBUZW1wZXJhdHVyZVNjYWxlIHtcbiAgQ0VMQ0lVUyA9IDxhbnk+J2NlbGNpdXMnLFxuICBLRUxWSU4gPSA8YW55PidrZWx2aW4nLFxuICBGQUhSRU5IRUlUID0gPGFueT4nZmFocmVuaGVpdCdcbn1cbiJdfQ==
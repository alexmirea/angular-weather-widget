/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TemperatureScale } from '../weather-current-temperature/current-temperature.component';
var WeatherCurrentWindComponent = /** @class */ (function () {
    function WeatherCurrentWindComponent() {
    }
    Object.defineProperty(WeatherCurrentWindComponent.prototype, "scale", {
        get: /**
         * @return {?}
         */
        function () {
            return this._scale;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._scale = value;
            this.unit = this.mapScaleToText(this._scale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WeatherCurrentWindComponent.prototype, "deg", {
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
            if (!value) {
                return;
            }
            this._deg = value;
            this.windIcon = "wi wi-wind from-" + this._deg + "-deg";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} scale
     * @return {?}
     */
    WeatherCurrentWindComponent.prototype.mapScaleToText = /**
     * @param {?} scale
     * @return {?}
     */
    function (scale) {
        switch (scale) {
            case TemperatureScale.CELCIUS:
            case TemperatureScale.KELVIN:
                return 'm/s';
            case TemperatureScale.FAHRENHEIT:
                return 'mil/h';
            default:
                return '';
        }
    };
    WeatherCurrentWindComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-current-wind',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n    :host {\n      display: flex;\n      justify-content: space-around;\n      align-items: center;\n      font-size: 0.8em;\n      min-height: 1.3em;\n    }\n    i {\n      margin-left: 0.3em;\n      font-size: 1.6em;\n    }\n  "
                    ],
                    template: "\n    <span>Wind {{ speed }} {{ unit }}</span>\n   <i [class]=\"windIcon\"></i>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherCurrentWindComponent.propDecorators = {
        "scale": [{ type: Input },],
        "deg": [{ type: Input },],
        "speed": [{ type: Input },],
    };
    return WeatherCurrentWindComponent;
}());
export { WeatherCurrentWindComponent };
function WeatherCurrentWindComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherCurrentWindComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherCurrentWindComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherCurrentWindComponent.propDecorators;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype.unit;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype.windIcon;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype._deg;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype.speed;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype._scale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci1jdXJyZW50LXdpbmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC13aW5kL3dlYXRoZXItY3VycmVudC13aW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsS0FBSyxFQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhEQUE4RCxDQUFDOzs7O0lBNEI5RixzQkFBSSw4Q0FBSzs7OztRQUFUO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7Ozs7O2tCQUdTLEtBQUs7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O09BTDlDO0lBUUQsc0JBQUksNENBQUc7Ozs7UUFBUDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2xCOzs7OztrQkFHTyxLQUFhO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxNQUFNLENBQUM7YUFDUjtZQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcscUJBQW1CLElBQUksQ0FBQyxJQUFJLFNBQU0sQ0FBQzs7OztPQVJwRDs7Ozs7SUFjRCxvREFBYzs7OztJQUFkLFVBQWUsS0FBdUI7UUFDcEMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLEtBQUssZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1lBQzlCLEtBQUssZ0JBQWdCLENBQUMsTUFBTTtnQkFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNmLEtBQUssZ0JBQWdCLENBQUMsVUFBVTtnQkFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNqQjtnQkFDRSxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQ2I7S0FDRjs7Z0JBN0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsTUFBTSxFQUFFO3dCQUNOLHlPQVlEO3FCQUNBO29CQUNELFFBQVEsRUFBRSxxRkFHVDtpQkFDRjs7OzswQkFPRSxLQUFLO3dCQVVMLEtBQUs7MEJBU0wsS0FBSzs7c0NBMURSOztTQWlDYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUZW1wZXJhdHVyZVNjYWxlIH0gZnJvbSAnLi4vd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlL2N1cnJlbnQtdGVtcGVyYXR1cmUuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJTZXR0aW5ncyB9IGZyb20gJy4uLy4uL3dlYXRoZXIuaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItY3VycmVudC13aW5kJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICAgIG1pbi1oZWlnaHQ6IDEuM2VtO1xuICAgIH1cbiAgICBpIHtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwLjNlbTtcbiAgICAgIGZvbnQtc2l6ZTogMS42ZW07XG4gICAgfVxuICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4+V2luZCB7eyBzcGVlZCB9fSB7eyB1bml0IH19PC9zcGFuPlxuICAgPGkgW2NsYXNzXT1cIndpbmRJY29uXCI+PC9pPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJDdXJyZW50V2luZENvbXBvbmVudCB7XG4gIHVuaXQhOiBzdHJpbmc7XG4gIGdldCBzY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2NhbGUodmFsdWUpIHtcbiAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xuICAgIHRoaXMudW5pdCA9IHRoaXMubWFwU2NhbGVUb1RleHQodGhpcy5fc2NhbGUpO1xuICB9XG4gIHdpbmRJY29uITogc3RyaW5nO1xuICBnZXQgZGVnKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBkZWcodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGVnID0gdmFsdWU7XG4gICAgdGhpcy53aW5kSWNvbiA9IGB3aSB3aS13aW5kIGZyb20tJHt0aGlzLl9kZWd9LWRlZ2A7XG4gIH1cbiAgcHJpdmF0ZSBfZGVnITogbnVtYmVyO1xuICBASW5wdXQoKSBzcGVlZCE6IG51bWJlcjtcbiAgcHJpdmF0ZSBfc2NhbGUhOiBUZW1wZXJhdHVyZVNjYWxlO1xuXG4gIG1hcFNjYWxlVG9UZXh0KHNjYWxlOiBUZW1wZXJhdHVyZVNjYWxlKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHNjYWxlKSB7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuQ0VMQ0lVUzpcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5LRUxWSU46XG4gICAgICAgIHJldHVybiAnbS9zJztcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5GQUhSRU5IRUlUOlxuICAgICAgICByZXR1cm4gJ21pbC9oJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==
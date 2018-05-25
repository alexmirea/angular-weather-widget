/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ForecastMode, WeatherSettings } from '../../weather.interfaces';
var WeatherForecastComponent = /** @class */ (function () {
    function WeatherForecastComponent() {
        this.isGridForecast = true;
    }
    Object.defineProperty(WeatherForecastComponent.prototype, "mode", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            switch (value) {
                case ForecastMode.GRID:
                    this.isGridForecast = true;
                    break;
                case ForecastMode.DETAILED:
                    this.isGridForecast = false;
                    break;
                default:
                    this.isGridForecast = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WeatherForecastComponent.prototype, "forecast", {
        get: /**
         * @return {?}
         */
        function () {
            return this._forecast;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._forecast = value;
        },
        enumerable: true,
        configurable: true
    });
    WeatherForecastComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-forecast',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n             :host {\n               margin-top: 1em;\n               display: block;\n               width: 100%;\n               box-sizing: border-box;\n             }\n           "
                    ],
                    template: "\n    <weather-forecast-simple-grid\n      *ngIf=\"isGridForecast\"\n      [forecast]=\"forecast\"></weather-forecast-simple-grid>\n    <weather-forecast-detailed\n      *ngIf=\"!isGridForecast\"\n      [settings]=\"settings\"\n      [forecast]=\"forecast\"></weather-forecast-detailed>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherForecastComponent.propDecorators = {
        "mode": [{ type: Input },],
        "settings": [{ type: Input },],
        "forecast": [{ type: Input },],
    };
    return WeatherForecastComponent;
}());
export { WeatherForecastComponent };
function WeatherForecastComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherForecastComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherForecastComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherForecastComponent.propDecorators;
    /** @type {?} */
    WeatherForecastComponent.prototype.isGridForecast;
    /** @type {?} */
    WeatherForecastComponent.prototype.settings;
    /** @type {?} */
    WeatherForecastComponent.prototype._forecast;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci1mb3JlY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC93ZWF0aGVyLWZvcmVjYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OzhCQTJCdEQsSUFBSTs7MEJBRWpCLDBDQUFJOzs7OztrQkFBQyxLQUFtQjtZQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsTUFBTSxDQUFDO2FBQ1I7WUFDRCxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUssWUFBWSxDQUFDLElBQUk7b0JBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUMzQixLQUFLLENBQUM7Z0JBQ1IsS0FBSyxZQUFZLENBQUMsUUFBUTtvQkFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7b0JBQzVCLEtBQUssQ0FBQztnQkFDUjtvQkFDRSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQzthQUMvQjs7Ozs7MEJBSUMsOENBQVE7Ozs7UUFPWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7OztrQkFUWSxLQUFpQjtZQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsTUFBTSxDQUFDO2FBQ1I7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7Ozs7O2dCQS9DMUIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxNQUFNLEVBQUU7d0JBQ04sMkxBT1E7cUJBQ1Q7b0JBQ0QsUUFBUSxFQUFFLG9TQVFUO2lCQUNGOzs7O3lCQUdFLEtBQUs7NkJBZ0JMLEtBQUs7NkJBQ0wsS0FBSzs7bUNBL0NSOztTQTRCYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9yZWNhc3QgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JlY2FzdE1vZGUsIFdlYXRoZXJTZXR0aW5ncyB9IGZyb20gJy4uLy4uL3dlYXRoZXIuaW50ZXJmYWNlcyc7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgPSBSZWZsZWN0LnByZXZlbnRFeHRlbnNpb25zO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWZvcmVjYXN0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAxZW07XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8d2VhdGhlci1mb3JlY2FzdC1zaW1wbGUtZ3JpZFxuICAgICAgKm5nSWY9XCJpc0dyaWRGb3JlY2FzdFwiXG4gICAgICBbZm9yZWNhc3RdPVwiZm9yZWNhc3RcIj48L3dlYXRoZXItZm9yZWNhc3Qtc2ltcGxlLWdyaWQ+XG4gICAgPHdlYXRoZXItZm9yZWNhc3QtZGV0YWlsZWRcbiAgICAgICpuZ0lmPVwiIWlzR3JpZEZvcmVjYXN0XCJcbiAgICAgIFtzZXR0aW5nc109XCJzZXR0aW5nc1wiXG4gICAgICBbZm9yZWNhc3RdPVwiZm9yZWNhc3RcIj48L3dlYXRoZXItZm9yZWNhc3QtZGV0YWlsZWQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckZvcmVjYXN0Q29tcG9uZW50IHtcbiAgaXNHcmlkRm9yZWNhc3QgPSB0cnVlO1xuICBASW5wdXQoKVxuICBzZXQgbW9kZSh2YWx1ZTogRm9yZWNhc3RNb2RlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIEZvcmVjYXN0TW9kZS5HUklEOlxuICAgICAgICB0aGlzLmlzR3JpZEZvcmVjYXN0ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEZvcmVjYXN0TW9kZS5ERVRBSUxFRDpcbiAgICAgICAgdGhpcy5pc0dyaWRGb3JlY2FzdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuaXNHcmlkRm9yZWNhc3QgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgc2V0dGluZ3MhOiBXZWF0aGVyU2V0dGluZ3M7XG4gIEBJbnB1dCgpXG4gIHNldCBmb3JlY2FzdCh2YWx1ZTogRm9yZWNhc3RbXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZm9yZWNhc3QgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBmb3JlY2FzdCgpOiBGb3JlY2FzdFtdIHtcbiAgICByZXR1cm4gdGhpcy5fZm9yZWNhc3Q7XG4gIH1cbiAgcHJpdmF0ZSBfZm9yZWNhc3QhOiBGb3JlY2FzdFtdO1xufVxuIl19
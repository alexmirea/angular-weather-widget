/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherHelpersService } from '../../../services/weather-helpers.service';
import { WeatherSettings } from '../../../weather.interfaces';
var WeatherForecastDetailedComponent = /** @class */ (function () {
    function WeatherForecastDetailedComponent(weatherHelpers) {
        this.weatherHelpers = weatherHelpers;
        this.forecastPerDay = [];
    }
    Object.defineProperty(WeatherForecastDetailedComponent.prototype, "forecast", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._forecast = value;
            this.forecastPerDay = this.weatherHelpers.groupForecastsByDay(value);
        },
        enumerable: true,
        configurable: true
    });
    WeatherForecastDetailedComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-forecast-detailed',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""],
                    template: "\n    <ng-container *ngFor=\"let forecast of forecastPerDay\">\n      <weather-forecast-detail-day\n        [settings]=\"settings\"\n        [forecast]=\"forecast\"></weather-forecast-detail-day>\n    </ng-container>\n\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherForecastDetailedComponent.ctorParameters = function () { return [
        { type: WeatherHelpersService, },
    ]; };
    WeatherForecastDetailedComponent.propDecorators = {
        "forecast": [{ type: Input },],
        "settings": [{ type: Input },],
    };
    return WeatherForecastDetailedComponent;
}());
export { WeatherForecastDetailedComponent };
function WeatherForecastDetailedComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherForecastDetailedComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherForecastDetailedComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherForecastDetailedComponent.propDecorators;
    /** @type {?} */
    WeatherForecastDetailedComponent.prototype.settings;
    /** @type {?} */
    WeatherForecastDetailedComponent.prototype.forecastPerDay;
    /** @type {?} */
    WeatherForecastDetailedComponent.prototype._forecast;
    /** @type {?} */
    WeatherForecastDetailedComponent.prototype.weatherHelpers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZWNhc3QtZGV0YWlsZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3QtZGV0YWlsZWQvZm9yZWNhc3QtZGV0YWlsZWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBMkI1RCwwQ0FBb0IsY0FBcUM7UUFBckMsbUJBQWMsR0FBZCxjQUFjLENBQXVCOzhCQUZyQixFQUFFO0tBRXVCOzBCQVZ6RCxzREFBUTs7Ozs7a0JBQUMsS0FBaUI7WUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sQ0FBQzthQUNSO1lBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Z0JBcEJ4RSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixRQUFRLEVBQUUsZ09BT1Q7aUJBQ0Y7Ozs7Z0JBZlEscUJBQXFCOzs7NkJBaUIzQixLQUFLOzZCQVFMLEtBQUs7OzJDQTNCUjs7U0FrQmEsZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcmVjYXN0IH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlckhlbHBlcnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvd2VhdGhlci1oZWxwZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlclNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vd2VhdGhlci5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1mb3JlY2FzdC1kZXRhaWxlZCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtgYF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZm9yZWNhc3Qgb2YgZm9yZWNhc3RQZXJEYXlcIj5cbiAgICAgIDx3ZWF0aGVyLWZvcmVjYXN0LWRldGFpbC1kYXlcbiAgICAgICAgW3NldHRpbmdzXT1cInNldHRpbmdzXCJcbiAgICAgICAgW2ZvcmVjYXN0XT1cImZvcmVjYXN0XCI+PC93ZWF0aGVyLWZvcmVjYXN0LWRldGFpbC1kYXk+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyRm9yZWNhc3REZXRhaWxlZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHNldCBmb3JlY2FzdCh2YWx1ZTogRm9yZWNhc3RbXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZm9yZWNhc3QgPSB2YWx1ZTtcbiAgICB0aGlzLmZvcmVjYXN0UGVyRGF5ID0gdGhpcy53ZWF0aGVySGVscGVycy5ncm91cEZvcmVjYXN0c0J5RGF5KHZhbHVlKTtcbiAgfVxuICBASW5wdXQoKSBzZXR0aW5ncyE6IFdlYXRoZXJTZXR0aW5ncztcbiAgZm9yZWNhc3RQZXJEYXk6IEFycmF5PEZvcmVjYXN0W10+ID0gW107XG4gIHByaXZhdGUgX2ZvcmVjYXN0ITogRm9yZWNhc3RbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3ZWF0aGVySGVscGVyczogV2VhdGhlckhlbHBlcnNTZXJ2aWNlKSB7fVxufVxuIl19
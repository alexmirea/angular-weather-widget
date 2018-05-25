/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherHelpersService } from '../../../services/weather-helpers.service';
import { WeatherSettings } from '../../../weather.interfaces';
export class WeatherForecastDetailedComponent {
    /**
     * @param {?} weatherHelpers
     */
    constructor(weatherHelpers) {
        this.weatherHelpers = weatherHelpers;
        this.forecastPerDay = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set forecast(value) {
        if (!value) {
            return;
        }
        this._forecast = value;
        this.forecastPerDay = this.weatherHelpers.groupForecastsByDay(value);
    }
}
WeatherForecastDetailedComponent.decorators = [
    { type: Component, args: [{
                selector: 'weather-forecast-detailed',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [``],
                template: `
    <ng-container *ngFor="let forecast of forecastPerDay">
      <weather-forecast-detail-day
        [settings]="settings"
        [forecast]="forecast"></weather-forecast-detail-day>
    </ng-container>

  `
            },] },
];
/** @nocollapse */
WeatherForecastDetailedComponent.ctorParameters = () => [
    { type: WeatherHelpersService, },
];
WeatherForecastDetailedComponent.propDecorators = {
    "forecast": [{ type: Input },],
    "settings": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZWNhc3QtZGV0YWlsZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3QtZGV0YWlsZWQvZm9yZWNhc3QtZGV0YWlsZWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFlOUQsTUFBTTs7OztJQVlKLFlBQW9CLGNBQXFDO1FBQXJDLG1CQUFjLEdBQWQsY0FBYyxDQUF1Qjs4QkFGckIsRUFBRTtLQUV1Qjs7Ozs7UUFWekQsUUFBUSxDQUFDLEtBQWlCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQztTQUNSO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1lBcEJ4RSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDWixRQUFRLEVBQUU7Ozs7Ozs7R0FPVDthQUNGOzs7O1lBZlEscUJBQXFCOzs7eUJBaUIzQixLQUFLO3lCQVFMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9yZWNhc3QgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVySGVscGVyc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy93ZWF0aGVyLWhlbHBlcnMuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVyU2V0dGluZ3MgfSBmcm9tICcuLi8uLi8uLi93ZWF0aGVyLmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWZvcmVjYXN0LWRldGFpbGVkJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW2BgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmb3JlY2FzdCBvZiBmb3JlY2FzdFBlckRheVwiPlxuICAgICAgPHdlYXRoZXItZm9yZWNhc3QtZGV0YWlsLWRheVxuICAgICAgICBbc2V0dGluZ3NdPVwic2V0dGluZ3NcIlxuICAgICAgICBbZm9yZWNhc3RdPVwiZm9yZWNhc3RcIj48L3dlYXRoZXItZm9yZWNhc3QtZGV0YWlsLWRheT5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJGb3JlY2FzdERldGFpbGVkQ29tcG9uZW50IHtcbiAgQElucHV0KClcbiAgc2V0IGZvcmVjYXN0KHZhbHVlOiBGb3JlY2FzdFtdKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9mb3JlY2FzdCA9IHZhbHVlO1xuICAgIHRoaXMuZm9yZWNhc3RQZXJEYXkgPSB0aGlzLndlYXRoZXJIZWxwZXJzLmdyb3VwRm9yZWNhc3RzQnlEYXkodmFsdWUpO1xuICB9XG4gIEBJbnB1dCgpIHNldHRpbmdzITogV2VhdGhlclNldHRpbmdzO1xuICBmb3JlY2FzdFBlckRheTogQXJyYXk8Rm9yZWNhc3RbXT4gPSBbXTtcbiAgcHJpdmF0ZSBfZm9yZWNhc3QhOiBGb3JlY2FzdFtdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdlYXRoZXJIZWxwZXJzOiBXZWF0aGVySGVscGVyc1NlcnZpY2UpIHt9XG59XG4iXX0=
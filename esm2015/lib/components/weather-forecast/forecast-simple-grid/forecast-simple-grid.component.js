/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { WeatherHelpersService } from '../../../services/weather-helpers.service';
export class WeatherForecastSimpleGridComponent {
    /**
     * @param {?} weatherHelpers
     */
    constructor(weatherHelpers) {
        this.weatherHelpers = weatherHelpers;
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
        this.forecastPerDay = this.weatherHelpers.reduceToAveragePerDay(this._forecast);
    }
    /**
     * @return {?}
     */
    get forecast() {
        return this._forecast;
    }
}
WeatherForecastSimpleGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'weather-forecast-simple-grid',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [
                    `
           :host {
             display: flex;
             width: 100%;
             justify-content: space-between;
           }
           weather-forecast-grid-day {
             margin: 0 0.4em;
           }
           `
                ],
                template: `
    <ng-container *ngFor="let forecast of forecastPerDay">
      <weather-forecast-grid-day [forecast]="forecast"></weather-forecast-grid-day>
    </ng-container>
  `
            },] },
];
/** @nocollapse */
WeatherForecastSimpleGridComponent.ctorParameters = () => [
    { type: WeatherHelpersService, },
];
WeatherForecastSimpleGridComponent.propDecorators = {
    "forecast": [{ type: Input },],
};
function WeatherForecastSimpleGridComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherForecastSimpleGridComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherForecastSimpleGridComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherForecastSimpleGridComponent.propDecorators;
    /** @type {?} */
    WeatherForecastSimpleGridComponent.prototype.forecastPerDay;
    /** @type {?} */
    WeatherForecastSimpleGridComponent.prototype._forecast;
    /** @type {?} */
    WeatherForecastSimpleGridComponent.prototype.weatherHelpers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZWNhc3Qtc2ltcGxlLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3Qtc2ltcGxlLWdyaWQvZm9yZWNhc3Qtc2ltcGxlLWdyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixLQUFLLEVBR04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUF1QmxGLE1BQU07Ozs7SUFnQkosWUFBb0IsY0FBcUM7UUFBckMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO0tBQUk7Ozs7O1FBYnpELFFBQVEsQ0FBQyxLQUFpQjtRQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FDN0QsSUFBSSxDQUFDLFNBQVMsQ0FDZixDQUFDOzs7OztJQUVKLElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7WUFuQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxNQUFNLEVBQUU7b0JBQ047Ozs7Ozs7OztZQVNRO2lCQUNUO2dCQUNELFFBQVEsRUFBRTs7OztHQUlUO2FBQ0Y7Ozs7WUF0QlEscUJBQXFCOzs7eUJBeUIzQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9yZWNhc3QgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVySGVscGVyc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy93ZWF0aGVyLWhlbHBlcnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItZm9yZWNhc3Qtc2ltcGxlLWdyaWQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgd2VhdGhlci1mb3JlY2FzdC1ncmlkLWRheSB7XG4gICAgICAgICAgICAgbWFyZ2luOiAwIDAuNGVtO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmb3JlY2FzdCBvZiBmb3JlY2FzdFBlckRheVwiPlxuICAgICAgPHdlYXRoZXItZm9yZWNhc3QtZ3JpZC1kYXkgW2ZvcmVjYXN0XT1cImZvcmVjYXN0XCI+PC93ZWF0aGVyLWZvcmVjYXN0LWdyaWQtZGF5PlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJGb3JlY2FzdFNpbXBsZUdyaWRDb21wb25lbnQge1xuICBmb3JlY2FzdFBlckRheSE6IEZvcmVjYXN0W107XG4gIEBJbnB1dCgpXG4gIHNldCBmb3JlY2FzdCh2YWx1ZTogRm9yZWNhc3RbXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZm9yZWNhc3QgPSB2YWx1ZTtcbiAgICB0aGlzLmZvcmVjYXN0UGVyRGF5ID0gdGhpcy53ZWF0aGVySGVscGVycy5yZWR1Y2VUb0F2ZXJhZ2VQZXJEYXkoXG4gICAgICB0aGlzLl9mb3JlY2FzdFxuICAgICk7XG4gIH1cbiAgZ2V0IGZvcmVjYXN0KCk6IEZvcmVjYXN0W10ge1xuICAgIHJldHVybiB0aGlzLl9mb3JlY2FzdDtcbiAgfVxuICBwcml2YXRlIF9mb3JlY2FzdCE6IEZvcmVjYXN0W107XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2VhdGhlckhlbHBlcnM6IFdlYXRoZXJIZWxwZXJzU2VydmljZSkge31cbn1cbiJdfQ==
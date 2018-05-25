/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ForecastMode, WeatherSettings } from '../../weather.interfaces';
export class WeatherForecastComponent {
    constructor() {
        this.isGridForecast = true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mode(value) {
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
    }
    /**
     * @return {?}
     */
    get forecast() {
        return this._forecast;
    }
}
WeatherForecastComponent.decorators = [
    { type: Component, args: [{
                selector: 'weather-forecast',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [
                    `
             :host {
               margin-top: 1em;
               display: block;
               width: 100%;
               box-sizing: border-box;
             }
           `
                ],
                template: `
    <weather-forecast-simple-grid
      *ngIf="isGridForecast"
      [forecast]="forecast"></weather-forecast-simple-grid>
    <weather-forecast-detailed
      *ngIf="!isGridForecast"
      [settings]="settings"
      [forecast]="forecast"></weather-forecast-detailed>
  `
            },] },
];
/** @nocollapse */
WeatherForecastComponent.propDecorators = {
    "mode": [{ type: Input },],
    "settings": [{ type: Input },],
    "forecast": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci1mb3JlY2FzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC93ZWF0aGVyLWZvcmVjYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQTBCekUsTUFBTTs7OEJBQ2EsSUFBSTs7Ozs7O1FBRWpCLElBQUksQ0FBQyxLQUFtQjtRQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUM7U0FDUjtRQUNELE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLFlBQVksQ0FBQyxJQUFJO2dCQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDM0IsS0FBSyxDQUFDO1lBQ1IsS0FBSyxZQUFZLENBQUMsUUFBUTtnQkFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLEtBQUssQ0FBQztZQUNSO2dCQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQy9COzs7Ozs7UUFJQyxRQUFRLENBQUMsS0FBaUI7UUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDO1NBQ1I7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7Ozs7SUFHekIsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7OztZQXBERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRTtvQkFDTjs7Ozs7OztZQU9RO2lCQUNUO2dCQUNELFFBQVEsRUFBRTs7Ozs7Ozs7R0FRVDthQUNGOzs7O3FCQUdFLEtBQUs7eUJBZ0JMLEtBQUs7eUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JlY2FzdCB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcmVjYXN0TW9kZSwgV2VhdGhlclNldHRpbmdzIH0gZnJvbSAnLi4vLi4vd2VhdGhlci5pbnRlcmZhY2VzJztcbmltcG9ydCBwcmV2ZW50RXh0ZW5zaW9ucyA9IFJlZmxlY3QucHJldmVudEV4dGVuc2lvbnM7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItZm9yZWNhc3QnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDFlbTtcbiAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx3ZWF0aGVyLWZvcmVjYXN0LXNpbXBsZS1ncmlkXG4gICAgICAqbmdJZj1cImlzR3JpZEZvcmVjYXN0XCJcbiAgICAgIFtmb3JlY2FzdF09XCJmb3JlY2FzdFwiPjwvd2VhdGhlci1mb3JlY2FzdC1zaW1wbGUtZ3JpZD5cbiAgICA8d2VhdGhlci1mb3JlY2FzdC1kZXRhaWxlZFxuICAgICAgKm5nSWY9XCIhaXNHcmlkRm9yZWNhc3RcIlxuICAgICAgW3NldHRpbmdzXT1cInNldHRpbmdzXCJcbiAgICAgIFtmb3JlY2FzdF09XCJmb3JlY2FzdFwiPjwvd2VhdGhlci1mb3JlY2FzdC1kZXRhaWxlZD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyRm9yZWNhc3RDb21wb25lbnQge1xuICBpc0dyaWRGb3JlY2FzdCA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIHNldCBtb2RlKHZhbHVlOiBGb3JlY2FzdE1vZGUpIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgRm9yZWNhc3RNb2RlLkdSSUQ6XG4gICAgICAgIHRoaXMuaXNHcmlkRm9yZWNhc3QgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRm9yZWNhc3RNb2RlLkRFVEFJTEVEOlxuICAgICAgICB0aGlzLmlzR3JpZEZvcmVjYXN0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5pc0dyaWRGb3JlY2FzdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBzZXR0aW5ncyE6IFdlYXRoZXJTZXR0aW5ncztcbiAgQElucHV0KClcbiAgc2V0IGZvcmVjYXN0KHZhbHVlOiBGb3JlY2FzdFtdKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9mb3JlY2FzdCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGZvcmVjYXN0KCk6IEZvcmVjYXN0W10ge1xuICAgIHJldHVybiB0aGlzLl9mb3JlY2FzdDtcbiAgfVxuICBwcml2YXRlIF9mb3JlY2FzdCE6IEZvcmVjYXN0W107XG59XG4iXX0=
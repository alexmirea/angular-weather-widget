/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
export class WeatherForecastGridDayComponent {
}
WeatherForecastGridDayComponent.decorators = [
    { type: Component, args: [{
                selector: 'weather-forecast-grid-day',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [
                    `
   :host {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     font-size: 1.2em;
   }
   weather-icon {
     font-size: 1.4em;
   }
   .day {
     font-size: 0.8em
   }
 `
                ],
                template: `
      <weather-icon [iconClass]="forecast?.iconClass"></weather-icon>
      <weather-current-temperature [temp]="forecast?.temp"></weather-current-temperature>
      <div class="day">{{forecast?.data | date:'EEE' }}</div>
  `
            },] },
];
/** @nocollapse */
WeatherForecastGridDayComponent.propDecorators = {
    "forecast": [{ type: Input },],
};
function WeatherForecastGridDayComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherForecastGridDayComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherForecastGridDayComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherForecastGridDayComponent.propDecorators;
    /** @type {?} */
    WeatherForecastGridDayComponent.prototype.forecast;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci1mb3JlY2FzdC1ncmlkLWRheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC93ZWF0aGVyLWZvcmVjYXN0LWdyaWQtZGF5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUE2QjFFLE1BQU07OztZQTFCTCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRTtvQkFDTjs7Ozs7Ozs7Ozs7Ozs7RUFjRjtpQkFDQztnQkFDRCxRQUFRLEVBQUU7Ozs7R0FJVDthQUNGOzs7O3lCQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9yZWNhc3QgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItZm9yZWNhc3QtZ3JpZC1kYXknLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgOmhvc3Qge1xuICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgZm9udC1zaXplOiAxLjJlbTtcbiAgIH1cbiAgIHdlYXRoZXItaWNvbiB7XG4gICAgIGZvbnQtc2l6ZTogMS40ZW07XG4gICB9XG4gICAuZGF5IHtcbiAgICAgZm9udC1zaXplOiAwLjhlbVxuICAgfVxuIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDx3ZWF0aGVyLWljb24gW2ljb25DbGFzc109XCJmb3JlY2FzdD8uaWNvbkNsYXNzXCI+PC93ZWF0aGVyLWljb24+XG4gICAgICA8d2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlIFt0ZW1wXT1cImZvcmVjYXN0Py50ZW1wXCI+PC93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmU+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGF5XCI+e3tmb3JlY2FzdD8uZGF0YSB8IGRhdGU6J0VFRScgfX08L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyRm9yZWNhc3RHcmlkRGF5Q29tcG9uZW50IHtcbiAgQElucHV0KCkgZm9yZWNhc3QhOiBGb3JlY2FzdDtcbn1cbiJdfQ==
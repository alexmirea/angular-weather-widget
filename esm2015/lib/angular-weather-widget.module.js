/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { WeatherApiName, WeatherApiService } from './services/api/weather.api.service';
import { PoolingService } from './services/poling.service';
import { WeatherContainer } from './weather.container';
import { CommonModule } from '@angular/common';
import { WeatherIconComponent } from './components/weather-icon/weather-icon.component';
import { WeatherCurrentDescriptionComponent } from './components/weather-current-description/weather-current-description.component';
import { WeatherCurrentTempComponent } from './components/weather-current-temperature/current-temperature.component';
import { WeatherActionsComponent } from './components/weather-actions/actions.component';
import { WeatherLocationComponent } from './components/weather-location/weather-location.component';
import { WeatherCurrentWindComponent } from './components/weather-current-wind/weather-current-wind.component';
import { OpenWeatherMapApiService } from './services/api/open-weather-map/open-weather-map.api.service';
import { WeatherCurrentDetailsComponent } from './components/weather-current-details/weather-current-details.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { WeatherForecastSimpleGridComponent } from './components/weather-forecast/forecast-simple-grid/forecast-simple-grid.component';
import { WeatherForecastGridDayComponent } from './components/weather-forecast/forecast-simple-grid/weather-forecast-grid-day.component';
import { WeatherForecastDetailedComponent } from './components/weather-forecast/forecast-detailed/forecast-detailed.component';
import { WeatherForecastDetailDayComponent } from './components/weather-forecast/forecast-detailed/forecast-detailed-day.component';
import { ChartComponent } from './components/chart/chart.component';
import { WeatherForecastChartWideComponent } from './components/weather-forecast/forecast-simple-grid/forecast-chart-wide.component';
import { WeatherHelpersService } from './services/weather-helpers.service';
/**
 * @param {?} http
 * @param {?} pooling
 * @param {?} openWeather
 * @return {?}
 */
export function apiServiceFactory(http, pooling, openWeather) {
    switch (openWeather.name) {
        case WeatherApiName.OPEN_WEATHER_MAP:
            return new OpenWeatherMapApiService(http, pooling, openWeather);
        default:
            return new OpenWeatherMapApiService(http, pooling, openWeather);
    }
}
/**
 * @param {?} config
 * @return {?}
 */
export function forRoot(config) {
    return {
        ngModule: AngularWeatherWidgetModule,
        providers: [
            PoolingService,
            WeatherHelpersService,
            {
                provide: WeatherApiService,
                useFactory: apiServiceFactory,
                deps: [Http, PoolingService, 'WEATHER_CONFIG']
            },
            { provide: 'WEATHER_CONFIG', useValue: config }
        ]
    };
}
export class AngularWeatherWidgetModule {
    constructor() { }
}
AngularWeatherWidgetModule.forRoot = forRoot;
AngularWeatherWidgetModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, HttpModule],
                declarations: [
                    ChartComponent,
                    WeatherContainer,
                    WeatherCurrentTempComponent,
                    WeatherActionsComponent,
                    WeatherIconComponent,
                    WeatherCurrentDescriptionComponent,
                    WeatherLocationComponent,
                    WeatherCurrentWindComponent,
                    WeatherCurrentDetailsComponent,
                    WeatherForecastComponent,
                    WeatherForecastGridDayComponent,
                    WeatherForecastSimpleGridComponent,
                    WeatherForecastDetailedComponent,
                    WeatherForecastDetailDayComponent,
                    WeatherForecastChartWideComponent
                ],
                exports: [WeatherContainer]
            },] },
];
/** @nocollapse */
AngularWeatherWidgetModule.ctorParameters = () => [];
function AngularWeatherWidgetModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AngularWeatherWidgetModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AngularWeatherWidgetModule.ctorParameters;
    /** @type {?} */
    AngularWeatherWidgetModule.forRoot;
}
export { WeatherSettings, ForecastMode, WeatherLayout } from './weather.interfaces';
export { OPEN_WEATHER_MAP_RESPONSE_MOCK, OPEN_WEATHER_MAP_FORECAST, CURRENT_WATHER_MOCK, FORECAST_MOCK } from './mocks/open-weather-map.mock';
export { WeatherApiService, WeatherApiConfig, WeatherApiName } from './services/api/weather.api.service';
export { TemperatureScale } from './components/weather-current-temperature/current-temperature.component';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci13ZWF0aGVyLXdpZGdldC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL2FuZ3VsYXItd2VhdGhlci13aWRnZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBRUwsY0FBYyxFQUNkLGlCQUFpQixFQUNsQixNQUFNLG9DQUFvQyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sZ0ZBQWdGLENBQUM7QUFDcEksT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDckgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDcEcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDL0csT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDeEcsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDeEgsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFFcEcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDdkksT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sd0ZBQXdGLENBQUM7QUFDekksT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sNkVBQTZFLENBQUM7QUFDL0gsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0saUZBQWlGLENBQUM7QUFDcEksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGtGQUFrRixDQUFDO0FBQ3JJLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7O0FBRTNFLE1BQU0sNEJBQ0osSUFBVSxFQUNWLE9BQXVCLEVBQ3ZCLFdBQTZCO0lBRTdCLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEtBQUssY0FBYyxDQUFDLGdCQUFnQjtZQUNsQyxNQUFNLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xFO1lBQ0UsTUFBTSxDQUFDLElBQUksd0JBQXdCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUNuRTtDQUNGOzs7OztBQUVELE1BQU0sa0JBQWtCLE1BQXdCO0lBQzlDLE1BQU0sQ0FBQztRQUNMLFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsU0FBUyxFQUFFO1lBQ1QsY0FBYztZQUNkLHFCQUFxQjtZQUNyQjtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixVQUFVLEVBQUUsaUJBQWlCO2dCQUM3QixJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDO2FBQy9DO1lBQ0QsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtTQUNoRDtLQUNGLENBQUM7Q0FDSDtBQXVCRCxNQUFNO0lBQ0osaUJBQWdCOztxQ0FDQyxPQUFPOztZQXZCekIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7Z0JBQ25DLFlBQVksRUFBRTtvQkFDWixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsMkJBQTJCO29CQUMzQix1QkFBdUI7b0JBQ3ZCLG9CQUFvQjtvQkFDcEIsa0NBQWtDO29CQUNsQyx3QkFBd0I7b0JBQ3hCLDJCQUEyQjtvQkFDM0IsOEJBQThCO29CQUM5Qix3QkFBd0I7b0JBQ3hCLCtCQUErQjtvQkFDL0Isa0NBQWtDO29CQUNsQyxnQ0FBZ0M7b0JBQ2hDLGlDQUFpQztvQkFDakMsaUNBQWlDO2lCQUNsQztnQkFDRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUM1Qjs7Ozs7Ozs7Ozs7Ozs7O0FBS0QsNkRBQWMsc0JBQXNCLENBQUM7QUFDckMsOEdBQWMsK0JBQStCLENBQUM7QUFDOUMsb0VBQWMsb0NBQW9DLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0VBQXdFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHtcbiAgV2VhdGhlckFwaUNvbmZpZyxcbiAgV2VhdGhlckFwaU5hbWUsXG4gIFdlYXRoZXJBcGlTZXJ2aWNlXG59IGZyb20gJy4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9vbGluZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3BvbGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJDb250YWluZXIgfSBmcm9tICcuL3dlYXRoZXIuY29udGFpbmVyJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBXZWF0aGVySWNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWljb24vd2VhdGhlci1pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyQ3VycmVudERlc2NyaXB0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC1kZXNjcmlwdGlvbi93ZWF0aGVyLWN1cnJlbnQtZGVzY3JpcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJDdXJyZW50VGVtcENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUvY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1hY3Rpb25zL2FjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJMb2NhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWxvY2F0aW9uL3dlYXRoZXItbG9jYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJDdXJyZW50V2luZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtd2luZC93ZWF0aGVyLWN1cnJlbnQtd2luZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3BlbldlYXRoZXJNYXBBcGlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hcGkvb3Blbi13ZWF0aGVyLW1hcC9vcGVuLXdlYXRoZXItbWFwLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJDdXJyZW50RGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtZGV0YWlscy93ZWF0aGVyLWN1cnJlbnQtZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckZvcmVjYXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3Qvd2VhdGhlci1mb3JlY2FzdC5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3RTaW1wbGVHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3Qtc2ltcGxlLWdyaWQvZm9yZWNhc3Qtc2ltcGxlLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJGb3JlY2FzdEdyaWREYXlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC93ZWF0aGVyLWZvcmVjYXN0LWdyaWQtZGF5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3REZXRhaWxlZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LWRldGFpbGVkL2ZvcmVjYXN0LWRldGFpbGVkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3REZXRhaWxEYXlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1kZXRhaWxlZC9mb3JlY2FzdC1kZXRhaWxlZC1kYXkuY29tcG9uZW50JztcbmltcG9ydCB7IENoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NoYXJ0L2NoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3RDaGFydFdpZGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC9mb3JlY2FzdC1jaGFydC13aWRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVySGVscGVyc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3dlYXRoZXItaGVscGVycy5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFwaVNlcnZpY2VGYWN0b3J5KFxuICBodHRwOiBIdHRwLFxuICBwb29saW5nOiBQb29saW5nU2VydmljZSxcbiAgb3BlbldlYXRoZXI6IFdlYXRoZXJBcGlDb25maWdcbikge1xuICBzd2l0Y2ggKG9wZW5XZWF0aGVyLm5hbWUpIHtcbiAgICBjYXNlIFdlYXRoZXJBcGlOYW1lLk9QRU5fV0VBVEhFUl9NQVA6XG4gICAgICByZXR1cm4gbmV3IE9wZW5XZWF0aGVyTWFwQXBpU2VydmljZShodHRwLCBwb29saW5nLCBvcGVuV2VhdGhlcik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBuZXcgT3BlbldlYXRoZXJNYXBBcGlTZXJ2aWNlKGh0dHAsIHBvb2xpbmcsIG9wZW5XZWF0aGVyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yUm9vdChjb25maWc6IFdlYXRoZXJBcGlDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgcmV0dXJuIHtcbiAgICBuZ01vZHVsZTogQW5ndWxhcldlYXRoZXJXaWRnZXRNb2R1bGUsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICBQb29saW5nU2VydmljZSxcbiAgICAgIFdlYXRoZXJIZWxwZXJzU2VydmljZSxcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogV2VhdGhlckFwaVNlcnZpY2UsXG4gICAgICAgIHVzZUZhY3Rvcnk6IGFwaVNlcnZpY2VGYWN0b3J5LFxuICAgICAgICBkZXBzOiBbSHR0cCwgUG9vbGluZ1NlcnZpY2UsICdXRUFUSEVSX0NPTkZJRyddXG4gICAgICB9LFxuICAgICAgeyBwcm92aWRlOiAnV0VBVEhFUl9DT05GSUcnLCB1c2VWYWx1ZTogY29uZmlnIH1cbiAgICBdXG4gIH07XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDaGFydENvbXBvbmVudCxcbiAgICBXZWF0aGVyQ29udGFpbmVyLFxuICAgIFdlYXRoZXJDdXJyZW50VGVtcENvbXBvbmVudCxcbiAgICBXZWF0aGVyQWN0aW9uc0NvbXBvbmVudCxcbiAgICBXZWF0aGVySWNvbkNvbXBvbmVudCxcbiAgICBXZWF0aGVyQ3VycmVudERlc2NyaXB0aW9uQ29tcG9uZW50LFxuICAgIFdlYXRoZXJMb2NhdGlvbkNvbXBvbmVudCxcbiAgICBXZWF0aGVyQ3VycmVudFdpbmRDb21wb25lbnQsXG4gICAgV2VhdGhlckN1cnJlbnREZXRhaWxzQ29tcG9uZW50LFxuICAgIFdlYXRoZXJGb3JlY2FzdENvbXBvbmVudCxcbiAgICBXZWF0aGVyRm9yZWNhc3RHcmlkRGF5Q29tcG9uZW50LFxuICAgIFdlYXRoZXJGb3JlY2FzdFNpbXBsZUdyaWRDb21wb25lbnQsXG4gICAgV2VhdGhlckZvcmVjYXN0RGV0YWlsZWRDb21wb25lbnQsXG4gICAgV2VhdGhlckZvcmVjYXN0RGV0YWlsRGF5Q29tcG9uZW50LFxuICAgIFdlYXRoZXJGb3JlY2FzdENoYXJ0V2lkZUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbV2VhdGhlckNvbnRhaW5lcl1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcldlYXRoZXJXaWRnZXRNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIHN0YXRpYyBmb3JSb290ID0gZm9yUm9vdDtcbn1cbmV4cG9ydCAqIGZyb20gJy4vd2VhdGhlci5pbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9ja3Mvb3Blbi13ZWF0aGVyLW1hcC5tb2NrJztcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuZXhwb3J0IHsgVGVtcGVyYXR1cmVTY2FsZSB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUvY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQnO1xuIl19
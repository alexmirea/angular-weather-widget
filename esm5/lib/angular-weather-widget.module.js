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
var AngularWeatherWidgetModule = /** @class */ (function () {
    function AngularWeatherWidgetModule() {
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
    AngularWeatherWidgetModule.ctorParameters = function () { return []; };
    return AngularWeatherWidgetModule;
}());
export { AngularWeatherWidgetModule };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci13ZWF0aGVyLXdpZGdldC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL2FuZ3VsYXItd2VhdGhlci13aWRnZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBRUwsY0FBYyxFQUNkLGlCQUFpQixFQUNsQixNQUFNLG9DQUFvQyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sZ0ZBQWdGLENBQUM7QUFDcEksT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDckgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDcEcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDL0csT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDeEcsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDeEgsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFFcEcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDdkksT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sd0ZBQXdGLENBQUM7QUFDekksT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sNkVBQTZFLENBQUM7QUFDL0gsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0saUZBQWlGLENBQUM7QUFDcEksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGtGQUFrRixDQUFDO0FBQ3JJLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7O0FBRTNFLE1BQU0sNEJBQ0osSUFBVSxFQUNWLE9BQXVCLEVBQ3ZCLFdBQTZCO0lBRTdCLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEtBQUssY0FBYyxDQUFDLGdCQUFnQjtZQUNsQyxNQUFNLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xFO1lBQ0UsTUFBTSxDQUFDLElBQUksd0JBQXdCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUNuRTtDQUNGOzs7OztBQUVELE1BQU0sa0JBQWtCLE1BQXdCO0lBQzlDLE1BQU0sQ0FBQztRQUNMLFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsU0FBUyxFQUFFO1lBQ1QsY0FBYztZQUNkLHFCQUFxQjtZQUNyQjtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixVQUFVLEVBQUUsaUJBQWlCO2dCQUM3QixJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDO2FBQy9DO1lBQ0QsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtTQUNoRDtLQUNGLENBQUM7Q0FDSDs7SUF3QkM7S0FBZ0I7eUNBQ0MsT0FBTzs7Z0JBdkJ6QixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDbkMsWUFBWSxFQUFFO3dCQUNaLGNBQWM7d0JBQ2QsZ0JBQWdCO3dCQUNoQiwyQkFBMkI7d0JBQzNCLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3dCQUNwQixrQ0FBa0M7d0JBQ2xDLHdCQUF3Qjt3QkFDeEIsMkJBQTJCO3dCQUMzQiw4QkFBOEI7d0JBQzlCLHdCQUF3Qjt3QkFDeEIsK0JBQStCO3dCQUMvQixrQ0FBa0M7d0JBQ2xDLGdDQUFnQzt3QkFDaEMsaUNBQWlDO3dCQUNqQyxpQ0FBaUM7cUJBQ2xDO29CQUNELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUM1Qjs7OztxQ0E3RUQ7O1NBOEVhLDBCQUEwQjs7Ozs7Ozs7Ozs7O0FBSXZDLDZEQUFjLHNCQUFzQixDQUFDO0FBQ3JDLDhHQUFjLCtCQUErQixDQUFDO0FBQzlDLG9FQUFjLG9DQUFvQyxDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdFQUF3RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7XG4gIFdlYXRoZXJBcGlDb25maWcsXG4gIFdlYXRoZXJBcGlOYW1lLFxuICBXZWF0aGVyQXBpU2VydmljZVxufSBmcm9tICcuL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvb2xpbmdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2xpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVyQ29udGFpbmVyIH0gZnJvbSAnLi93ZWF0aGVyLmNvbnRhaW5lcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgV2VhdGhlckljb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1pY29uL3dlYXRoZXItaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckN1cnJlbnREZXNjcmlwdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtZGVzY3JpcHRpb24vd2VhdGhlci1jdXJyZW50LWRlc2NyaXB0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyQ3VycmVudFRlbXBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlL2N1cnJlbnQtdGVtcGVyYXR1cmUuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJBY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItYWN0aW9ucy9hY3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyTG9jYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1sb2NhdGlvbi93ZWF0aGVyLWxvY2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyQ3VycmVudFdpbmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LXdpbmQvd2VhdGhlci1jdXJyZW50LXdpbmQuY29tcG9uZW50JztcbmltcG9ydCB7IE9wZW5XZWF0aGVyTWFwQXBpU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXBpL29wZW4td2VhdGhlci1tYXAvb3Blbi13ZWF0aGVyLW1hcC5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVyQ3VycmVudERldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LWRldGFpbHMvd2VhdGhlci1jdXJyZW50LWRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJGb3JlY2FzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L3dlYXRoZXItZm9yZWNhc3QuY29tcG9uZW50JztcblxuaW1wb3J0IHsgV2VhdGhlckZvcmVjYXN0U2ltcGxlR3JpZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LXNpbXBsZS1ncmlkL2ZvcmVjYXN0LXNpbXBsZS1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3RHcmlkRGF5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3Qtc2ltcGxlLWdyaWQvd2VhdGhlci1mb3JlY2FzdC1ncmlkLWRheS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckZvcmVjYXN0RGV0YWlsZWRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1kZXRhaWxlZC9mb3JlY2FzdC1kZXRhaWxlZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckZvcmVjYXN0RGV0YWlsRGF5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3QtZGV0YWlsZWQvZm9yZWNhc3QtZGV0YWlsZWQtZGF5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGFydENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jaGFydC9jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckZvcmVjYXN0Q2hhcnRXaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3Qtc2ltcGxlLWdyaWQvZm9yZWNhc3QtY2hhcnQtd2lkZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckhlbHBlcnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy93ZWF0aGVyLWhlbHBlcnMuc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcGlTZXJ2aWNlRmFjdG9yeShcbiAgaHR0cDogSHR0cCxcbiAgcG9vbGluZzogUG9vbGluZ1NlcnZpY2UsXG4gIG9wZW5XZWF0aGVyOiBXZWF0aGVyQXBpQ29uZmlnXG4pIHtcbiAgc3dpdGNoIChvcGVuV2VhdGhlci5uYW1lKSB7XG4gICAgY2FzZSBXZWF0aGVyQXBpTmFtZS5PUEVOX1dFQVRIRVJfTUFQOlxuICAgICAgcmV0dXJuIG5ldyBPcGVuV2VhdGhlck1hcEFwaVNlcnZpY2UoaHR0cCwgcG9vbGluZywgb3BlbldlYXRoZXIpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbmV3IE9wZW5XZWF0aGVyTWFwQXBpU2VydmljZShodHRwLCBwb29saW5nLCBvcGVuV2VhdGhlcik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvclJvb3QoY29uZmlnOiBXZWF0aGVyQXBpQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gIHJldHVybiB7XG4gICAgbmdNb2R1bGU6IEFuZ3VsYXJXZWF0aGVyV2lkZ2V0TW9kdWxlLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgUG9vbGluZ1NlcnZpY2UsXG4gICAgICBXZWF0aGVySGVscGVyc1NlcnZpY2UsXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGU6IFdlYXRoZXJBcGlTZXJ2aWNlLFxuICAgICAgICB1c2VGYWN0b3J5OiBhcGlTZXJ2aWNlRmFjdG9yeSxcbiAgICAgICAgZGVwczogW0h0dHAsIFBvb2xpbmdTZXJ2aWNlLCAnV0VBVEhFUl9DT05GSUcnXVxuICAgICAgfSxcbiAgICAgIHsgcHJvdmlkZTogJ1dFQVRIRVJfQ09ORklHJywgdXNlVmFsdWU6IGNvbmZpZyB9XG4gICAgXVxuICB9O1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBIdHRwTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2hhcnRDb21wb25lbnQsXG4gICAgV2VhdGhlckNvbnRhaW5lcixcbiAgICBXZWF0aGVyQ3VycmVudFRlbXBDb21wb25lbnQsXG4gICAgV2VhdGhlckFjdGlvbnNDb21wb25lbnQsXG4gICAgV2VhdGhlckljb25Db21wb25lbnQsXG4gICAgV2VhdGhlckN1cnJlbnREZXNjcmlwdGlvbkNvbXBvbmVudCxcbiAgICBXZWF0aGVyTG9jYXRpb25Db21wb25lbnQsXG4gICAgV2VhdGhlckN1cnJlbnRXaW5kQ29tcG9uZW50LFxuICAgIFdlYXRoZXJDdXJyZW50RGV0YWlsc0NvbXBvbmVudCxcbiAgICBXZWF0aGVyRm9yZWNhc3RDb21wb25lbnQsXG4gICAgV2VhdGhlckZvcmVjYXN0R3JpZERheUNvbXBvbmVudCxcbiAgICBXZWF0aGVyRm9yZWNhc3RTaW1wbGVHcmlkQ29tcG9uZW50LFxuICAgIFdlYXRoZXJGb3JlY2FzdERldGFpbGVkQ29tcG9uZW50LFxuICAgIFdlYXRoZXJGb3JlY2FzdERldGFpbERheUNvbXBvbmVudCxcbiAgICBXZWF0aGVyRm9yZWNhc3RDaGFydFdpZGVDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1dlYXRoZXJDb250YWluZXJdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJXZWF0aGVyV2lkZ2V0TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBzdGF0aWMgZm9yUm9vdCA9IGZvclJvb3Q7XG59XG5leHBvcnQgKiBmcm9tICcuL3dlYXRoZXIuaW50ZXJmYWNlcyc7XG5leHBvcnQgKiBmcm9tICcuL21vY2tzL29wZW4td2VhdGhlci1tYXAubW9jayc7XG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmV4cG9ydCB7IFRlbXBlcmF0dXJlU2NhbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlL2N1cnJlbnQtdGVtcGVyYXR1cmUuY29tcG9uZW50JztcbiJdfQ==
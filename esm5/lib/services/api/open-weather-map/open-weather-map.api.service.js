/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TemperatureScale } from '../../../components/weather-current-temperature/current-temperature.component';
import { PoolingService } from '../../poling.service';
import { WeatherApiConfig, WeatherApiService } from '../weather.api.service';
import { iconCodes } from './open-weather-map-to-weather-icons';
var OpenWeatherMapApiService = /** @class */ (function (_super) {
    tslib_1.__extends(OpenWeatherMapApiService, _super);
    function OpenWeatherMapApiService(http, poolingService, apiConfig) {
        var _this = _super.call(this, http, poolingService, apiConfig) || this;
        _this.http = http;
        _this.poolingService = poolingService;
        _this.apiConfig = apiConfig;
        _this.iconCodes = iconCodes;
        return _this;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    OpenWeatherMapApiService.prototype.mapQueryParams = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var /** @type {?} */ mapped = {
            id: params.cityId,
            q: params.cityName,
            lat: params.latLng ? params.latLng.lat : undefined,
            lon: params.latLng ? params.latLng.lng : undefined,
            zip: params.zipCode,
            units: params.units ? this.mapUnits(params.units) : undefined,
            lang: params.lang
        };
        return mapped;
    };
    /**
     * @param {?} response
     * @return {?}
     */
    OpenWeatherMapApiService.prototype.mapCurrentWeatherResponse = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        if (!response) {
            return /** @type {?} */ ({});
        }
        var /** @type {?} */ weather = {
            temp: response.main.temp,
            pressure: response.main ? response.main.pressure : undefined,
            humidity: response.main ? response.main.humidity : undefined,
            minTemp: response.main && response.main.temp
                ? response.main.temp_min
                : undefined,
            maxTemp: response.main && response.main.temp
                ? response.main.temp_max
                : undefined,
            sunrise: response.sys ? response.sys.sunrise : undefined,
            sunset: response.sys ? response.sys.sunset : undefined,
            location: response.name,
            iconUrl: this.mapResponseToIconUrl(response),
            iconClass: this.mapResponseToIconClass(response),
            description: response.weather[0].description,
            wind: {
                deg: response.wind.deg,
                speed: response.wind.speed
            }
        };
        return weather;
    };
    /**
     * @param {?} response
     * @return {?}
     */
    OpenWeatherMapApiService.prototype.mapForecastResponse = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        if (!response) {
            return /** @type {?} */ ([]);
        }
        var /** @type {?} */ city = response.city;
        return response.list.map(function (el) {
            var /** @type {?} */ forecast = {
                temp: el.main.temp,
                pressure: el.main.pressure,
                humidity: el.main.humidity,
                minTemp: el.main.temp_min,
                maxTemp: el.main.temp_max,
                location: city.name,
                iconClass: _this.mapResponseToIconClass(el),
                description: el.weather[0].description,
                data: new Date(el.dt * 1000),
                wind: {
                    deg: el.wind.deg,
                    speed: el.wind.speed
                }
            };
            return forecast;
        });
    };
    /**
     * @param {?} response
     * @return {?}
     */
    OpenWeatherMapApiService.prototype.mapResponseToIconUrl = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        return "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    };
    /**
     * @param {?} response
     * @return {?}
     */
    OpenWeatherMapApiService.prototype.mapResponseToIconClass = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var /** @type {?} */ code = response.weather[0].id;
        var /** @type {?} */ prefix = 'wi wi-';
        var /** @type {?} */ icon = iconCodes[code].icon;
        // If we are not in the ranges mentioned above, add a day/night prefix.
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }
        icon = prefix + icon;
        return icon;
    };
    /**
     * @return {?}
     */
    OpenWeatherMapApiService.prototype.setTokenKey = /**
     * @return {?}
     */
    function () {
        return 'APPID';
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    OpenWeatherMapApiService.prototype.mapUnits = /**
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        switch (unit) {
            case TemperatureScale.CELCIUS:
                return 'metric';
            case TemperatureScale.FAHRENHEIT:
                return 'imperial';
            case TemperatureScale.KELVIN:
                return;
            default:
                return 'metric';
        }
    };
    OpenWeatherMapApiService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    OpenWeatherMapApiService.ctorParameters = function () { return [
        { type: Http, },
        { type: PoolingService, },
        { type: WeatherApiConfig, },
    ]; };
    return OpenWeatherMapApiService;
}(WeatherApiService));
export { OpenWeatherMapApiService };
function OpenWeatherMapApiService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    OpenWeatherMapApiService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    OpenWeatherMapApiService.ctorParameters;
    /** @type {?} */
    OpenWeatherMapApiService.prototype.iconCodes;
    /** @type {?} */
    OpenWeatherMapApiService.prototype.iconCodes$;
    /** @type {?} */
    OpenWeatherMapApiService.prototype.http;
    /** @type {?} */
    OpenWeatherMapApiService.prototype.poolingService;
    /** @type {?} */
    OpenWeatherMapApiService.prototype.apiConfig;
}
/**
 * @record
 */
export function OpenWeatherMapLocationRequest() { }
function OpenWeatherMapLocationRequest_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    OpenWeatherMapLocationRequest.prototype.id;
    /** @type {?|undefined} */
    OpenWeatherMapLocationRequest.prototype.q;
    /** @type {?|undefined} */
    OpenWeatherMapLocationRequest.prototype.lat;
    /** @type {?|undefined} */
    OpenWeatherMapLocationRequest.prototype.lon;
    /** @type {?|undefined} */
    OpenWeatherMapLocationRequest.prototype.zip;
    /** @type {?|undefined} */
    OpenWeatherMapLocationRequest.prototype.units;
    /** @type {?|undefined} */
    OpenWeatherMapLocationRequest.prototype.lang;
}
/**
 * @record
 */
export function OpenWeatherMapCurrentWeatherResponse() { }
function OpenWeatherMapCurrentWeatherResponse_tsickle_Closure_declarations() {
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.coord;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.weather;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.base;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.main;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.visibility;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.wind;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.clouds;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.dt;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.sys;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.id;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.name;
    /** @type {?} */
    OpenWeatherMapCurrentWeatherResponse.prototype.cod;
}
/**
 * @record
 */
export function OpenWeatherMapForecastResponse() { }
function OpenWeatherMapForecastResponse_tsickle_Closure_declarations() {
    /** @type {?} */
    OpenWeatherMapForecastResponse.prototype.city;
    /** @type {?} */
    OpenWeatherMapForecastResponse.prototype.message;
    /** @type {?} */
    OpenWeatherMapForecastResponse.prototype.cod;
    /** @type {?} */
    OpenWeatherMapForecastResponse.prototype.cnt;
    /** @type {?} */
    OpenWeatherMapForecastResponse.prototype.list;
}
/**
 * @record
 */
export function OpenWeatherMapForecastResponseElement() { }
function OpenWeatherMapForecastResponseElement_tsickle_Closure_declarations() {
    /** @type {?} */
    OpenWeatherMapForecastResponseElement.prototype.clouds;
    /** @type {?} */
    OpenWeatherMapForecastResponseElement.prototype.dt;
    /** @type {?} */
    OpenWeatherMapForecastResponseElement.prototype.dt_txt;
    /** @type {?} */
    OpenWeatherMapForecastResponseElement.prototype.main;
    /** @type {?} */
    OpenWeatherMapForecastResponseElement.prototype.sys;
    /** @type {?} */
    OpenWeatherMapForecastResponseElement.prototype.weather;
    /** @type {?} */
    OpenWeatherMapForecastResponseElement.prototype.wind;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi13ZWF0aGVyLW1hcC5hcGkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYXBpL29wZW4td2VhdGhlci1tYXAvb3Blbi13ZWF0aGVyLW1hcC5hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrRUFBK0UsQ0FBQztBQUNqSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUdMLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLHFDQUFxQyxDQUFDOztJQUloQyxvREFBaUI7SUFHN0Qsa0NBQ1ksSUFBVSxFQUNWLGNBQThCLEVBQ2pDO1FBSFQsWUFLRSxrQkFBTSxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxTQUV2QztRQU5XLFVBQUksR0FBSixJQUFJLENBQU07UUFDVixvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDakMsZUFBUyxHQUFULFNBQVM7UUFHaEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0tBQzVCOzs7OztJQUVTLGlEQUFjOzs7O0lBQXhCLFVBQ0UsTUFBMEI7UUFFMUIscUJBQU0sTUFBTSxHQUFrQztZQUM1QyxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDakIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ2xCLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMs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QUFJLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUNELElBQUksR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7OztJQUVTLDhDQUFXOzs7SUFBckI7UUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2hCOzs7OztJQUVPLDJDQUFROzs7O2NBQUMsSUFBc0I7UUFDckMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssZ0JBQWdCLENBQUMsT0FBTztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNsQixLQUFLLGdCQUFnQixDQUFDLFVBQVU7Z0JBQzlCLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEIsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUMxQixNQUFNLENBQUM7WUFDVDtnQkFDRSxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ25COzs7Z0JBM0hKLFVBQVU7Ozs7Z0JBYkYsSUFBSTtnQkFHSixjQUFjO2dCQUlyQixnQkFBZ0I7O21DQVJsQjtFQWU4QyxpQkFBaUI7U0FBbEQsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVGVtcGVyYXR1cmVTY2FsZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlL2N1cnJlbnQtdGVtcGVyYXR1cmUuY29tcG9uZW50JztcbmltcG9ydCB7IFBvb2xpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcG9saW5nLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ3VycmVudFdlYXRoZXIsXG4gIEZvcmVjYXN0LFxuICBXZWF0aGVyQXBpQ29uZmlnLFxuICBXZWF0aGVyQXBpU2VydmljZVxufSBmcm9tICcuLi93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IGljb25Db2RlcywgSWNvbkNvZGVUeXBlIH0gZnJvbSAnLi9vcGVuLXdlYXRoZXItbWFwLXRvLXdlYXRoZXItaWNvbnMnO1xuaW1wb3J0IHsgV2VhdGhlclF1ZXJ5UGFyYW1zIH0gZnJvbSAnLi4vLi4vLi4vd2VhdGhlci5pbnRlcmZhY2VzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9wZW5XZWF0aGVyTWFwQXBpU2VydmljZSBleHRlbmRzIFdlYXRoZXJBcGlTZXJ2aWNlIHtcbiAgaWNvbkNvZGVzOiBJY29uQ29kZVR5cGU7XG4gIGljb25Db2RlcyQhOiBPYnNlcnZhYmxlPGFueT47XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwLFxuICAgIHByb3RlY3RlZCBwb29saW5nU2VydmljZTogUG9vbGluZ1NlcnZpY2UsXG4gICAgcHVibGljIGFwaUNvbmZpZzogV2VhdGhlckFwaUNvbmZpZ1xuICApIHtcbiAgICBzdXBlcihodHRwLCBwb29saW5nU2VydmljZSwgYXBpQ29uZmlnKTtcbiAgICB0aGlzLmljb25Db2RlcyA9IGljb25Db2RlcztcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBRdWVyeVBhcmFtcyhcbiAgICBwYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtc1xuICApOiBPcGVuV2VhdGhlck1hcExvY2F0aW9uUmVxdWVzdCB7XG4gICAgY29uc3QgbWFwcGVkOiBPcGVuV2VhdGhlck1hcExvY2F0aW9uUmVxdWVzdCA9IHtcbiAgICAgIGlkOiBwYXJhbXMuY2l0eUlkLFxuICAgICAgcTogcGFyYW1zLmNpdHlOYW1lLFxuICAgICAgbGF0OiBwYXJhbXMubGF0TG5nID8gcGFyYW1zLmxhdExuZy5sYXQgOiB1bmRlZmluZWQsXG4gICAgICBsb246IHBhcmFtcy5sYXRMbmcgPyBwYXJhbXMubGF0TG5nLmxuZyA6IHVuZGVmaW5lZCxcbiAgICAgIHppcDogcGFyYW1zLnppcENvZGUsXG4gICAgICB1bml0czogcGFyYW1zLnVuaXRzID8gdGhpcy5tYXBVbml0cyhwYXJhbXMudW5pdHMpIDogdW5kZWZpbmVkLFxuICAgICAgbGFuZzogcGFyYW1zLmxhbmdcbiAgICB9O1xuICAgIHJldHVybiBtYXBwZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwQ3VycmVudFdlYXRoZXJSZXNwb25zZShcbiAgICByZXNwb25zZTogT3BlbldlYXRoZXJNYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlXG4gICk6IEN1cnJlbnRXZWF0aGVyIHtcbiAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gPEN1cnJlbnRXZWF0aGVyPnt9O1xuICAgIH1cbiAgICBjb25zdCB3ZWF0aGVyOiBDdXJyZW50V2VhdGhlciA9IHtcbiAgICAgIHRlbXA6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgIHByZXNzdXJlOiByZXNwb25zZS5tYWluID8gcmVzcG9uc2UubWFpbi5wcmVzc3VyZSA6IHVuZGVmaW5lZCxcbiAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5tYWluID8gcmVzcG9uc2UubWFpbi5odW1pZGl0eSA6IHVuZGVmaW5lZCxcbiAgICAgIG1pblRlbXA6XG4gICAgICAgIHJlc3BvbnNlLm1haW4gJiYgcmVzcG9uc2UubWFpbi50ZW1wXG4gICAgICAgICAgPyByZXNwb25zZS5tYWluLnRlbXBfbWluXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICBtYXhUZW1wOlxuICAgICAgICByZXNwb25zZS5tYWluICYmIHJlc3BvbnNlLm1haW4udGVtcFxuICAgICAgICAgID8gcmVzcG9uc2UubWFpbi50ZW1wX21heFxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgc3VucmlzZTogcmVzcG9uc2Uuc3lzID8gcmVzcG9uc2Uuc3lzLnN1bnJpc2UgOiB1bmRlZmluZWQsXG4gICAgICBzdW5zZXQ6IHJlc3BvbnNlLnN5cyA/IHJlc3BvbnNlLnN5cy5zdW5zZXQgOiB1bmRlZmluZWQsXG4gICAgICBsb2NhdGlvbjogcmVzcG9uc2UubmFtZSxcbiAgICAgIGljb25Vcmw6IHRoaXMubWFwUmVzcG9uc2VUb0ljb25VcmwocmVzcG9uc2UpLFxuICAgICAgaWNvbkNsYXNzOiB0aGlzLm1hcFJlc3BvbnNlVG9JY29uQ2xhc3MocmVzcG9uc2UpLFxuICAgICAgZGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICB3aW5kOiB7XG4gICAgICAgIGRlZzogcmVzcG9uc2Uud2luZC5kZWcsXG4gICAgICAgIHNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gd2VhdGhlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBGb3JlY2FzdFJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOiBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2VcbiAgKTogRm9yZWNhc3RbXSB7XG4gICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgcmV0dXJuIDxGb3JlY2FzdFtdPltdO1xuICAgIH1cbiAgICBjb25zdCBjaXR5ID0gcmVzcG9uc2UuY2l0eTtcbiAgICByZXR1cm4gcmVzcG9uc2UubGlzdC5tYXAoKGVsOiBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2VFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBmb3JlY2FzdDogRm9yZWNhc3QgPSB7XG4gICAgICAgIHRlbXA6IGVsLm1haW4udGVtcCxcbiAgICAgICAgcHJlc3N1cmU6IGVsLm1haW4ucHJlc3N1cmUsXG4gICAgICAgIGh1bWlkaXR5OiBlbC5tYWluLmh1bWlkaXR5LFxuICAgICAgICBtaW5UZW1wOiBlbC5tYWluLnRlbXBfbWluLFxuICAgICAgICBtYXhUZW1wOiBlbC5tYWluLnRlbXBfbWF4LFxuICAgICAgICBsb2NhdGlvbjogY2l0eS5uYW1lLFxuICAgICAgICBpY29uQ2xhc3M6IHRoaXMubWFwUmVzcG9uc2VUb0ljb25DbGFzcyhlbCksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBlbC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICBkYXRhOiBuZXcgRGF0ZShlbC5kdCAqIDEwMDApLFxuICAgICAgICB3aW5kOiB7XG4gICAgICAgICAgZGVnOiBlbC53aW5kLmRlZyxcbiAgICAgICAgICBzcGVlZDogZWwud2luZC5zcGVlZFxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGZvcmVjYXN0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcFJlc3BvbnNlVG9JY29uVXJsKFxuICAgIHJlc3BvbnNlOiBPcGVuV2VhdGhlck1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2VcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259LnBuZ2A7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwUmVzcG9uc2VUb0ljb25DbGFzcyhcbiAgICByZXNwb25zZTpcbiAgICAgIHwgT3BlbldlYXRoZXJNYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlXG4gICAgICB8IE9wZW5XZWF0aGVyTWFwRm9yZWNhc3RSZXNwb25zZUVsZW1lbnRcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb2RlID0gcmVzcG9uc2Uud2VhdGhlclswXS5pZDtcbiAgICBjb25zdCBwcmVmaXggPSAnd2kgd2ktJztcbiAgICBsZXQgaWNvbiA9IGljb25Db2Rlc1tjb2RlXS5pY29uO1xuICAgIC8vIElmIHdlIGFyZSBub3QgaW4gdGhlIHJhbmdlcyBtZW50aW9uZWQgYWJvdmUsIGFkZCBhIGRheS9uaWdodCBwcmVmaXguXG4gICAgaWYgKCEoY29kZSA+IDY5OSAmJiBjb2RlIDwgODAwKSAmJiAhKGNvZGUgPiA4OTkgJiYgY29kZSA8IDEwMDApKSB7XG4gICAgICBpY29uID0gJ2RheS0nICsgaWNvbjtcbiAgICB9XG4gICAgaWNvbiA9IHByZWZpeCArIGljb247XG4gICAgcmV0dXJuIGljb247XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0VG9rZW5LZXkoKSB7XG4gICAgcmV0dXJuICdBUFBJRCc7XG4gIH1cblxuICBwcml2YXRlIG1hcFVuaXRzKHVuaXQ6IFRlbXBlcmF0dXJlU2NhbGUpIHtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5DRUxDSVVTOlxuICAgICAgICByZXR1cm4gJ21ldHJpYyc7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuRkFIUkVOSEVJVDpcbiAgICAgICAgcmV0dXJuICdpbXBlcmlhbCc7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuS0VMVklOOlxuICAgICAgICByZXR1cm47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ21ldHJpYyc7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbldlYXRoZXJNYXBMb2NhdGlvblJlcXVlc3Qge1xuICBpZD86IGFueTtcbiAgcT86IGFueTtcbiAgbGF0PzogYW55O1xuICBsb24/OiBhbnk7XG4gIHppcD86IGFueTtcbiAgdW5pdHM/OiAnaW1wZXJpYWwnIHwgJ21ldHJpYyc7XG4gIGxhbmc/OiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbldlYXRoZXJNYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlIHtcbiAgY29vcmQ6IHsgbG9uOiBudW1iZXI7IGxhdDogbnVtYmVyIH07XG4gIHdlYXRoZXI6IFt7IGlkOiBudW1iZXI7IG1haW46IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZzsgaWNvbjogc3RyaW5nIH1dO1xuICBiYXNlOiBzdHJpbmc7XG4gIG1haW46IHtcbiAgICB0ZW1wOiBudW1iZXI7XG4gICAgcHJlc3N1cmU6IG51bWJlcjtcbiAgICBodW1pZGl0eTogbnVtYmVyO1xuICAgIHRlbXBfbWluOiBudW1iZXI7XG4gICAgdGVtcF9tYXg6IG51bWJlcjtcbiAgfTtcbiAgdmlzaWJpbGl0eTogbnVtYmVyO1xuICB3aW5kOiB7IHNwZWVkOiBudW1iZXI7IGRlZzogbnVtYmVyIH07XG4gIGNsb3VkczogeyBhbGw6IG51bWJlciB9O1xuICBkdDogbnVtYmVyO1xuICBzeXM6IHtcbiAgICB0eXBlOiBudW1iZXI7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBudW1iZXI7XG4gICAgY291bnRyeTogc3RyaW5nO1xuICAgIHN1bnJpc2U6IG51bWJlcjtcbiAgICBzdW5zZXQ6IG51bWJlcjtcbiAgfTtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBjb2Q6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2Uge1xuICBjaXR5OiB7XG4gICAgY29vcmQ6IHtcbiAgICAgIGxhdDogbnVtYmVyO1xuICAgICAgbG9uOiBudW1iZXI7XG4gICAgfTtcbiAgICBjb3VudHJ5OiBzdHJpbmc7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gIH07XG4gIG1lc3NhZ2U6IG51bWJlcjtcbiAgY29kOiBzdHJpbmc7XG4gIGNudDogbnVtYmVyO1xuICBsaXN0OiBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2VFbGVtZW50W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbldlYXRoZXJNYXBGb3JlY2FzdFJlc3BvbnNlRWxlbWVudCB7XG4gIGNsb3Vkczoge1xuICAgIGFsbDogbnVtYmVyO1xuICB9O1xuICBkdDogbnVtYmVyO1xuICBkdF90eHQ6IHN0cmluZztcbiAgbWFpbjoge1xuICAgIGdybmRfbGV2ZWw6IG51bWJlcjtcbiAgICB0ZW1wOiBudW1iZXI7XG4gICAgcHJlc3N1cmU6IG51bWJlcjtcbiAgICBodW1pZGl0eTogbnVtYmVyO1xuICAgIHRlbXBfbWluOiBudW1iZXI7XG4gICAgdGVtcF9tYXg6IG51bWJlcjtcbiAgICB0ZW1wX2tmOiBudW1iZXI7XG4gICAgc2VhX2xldmVsOiBudW1iZXI7XG4gIH07XG4gIHN5czoge1xuICAgIHBvZDogc3RyaW5nO1xuICB9O1xuICB3ZWF0aGVyOiBbeyBpZDogbnVtYmVyOyBtYWluOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IGljb246IHN0cmluZyB9XTtcbiAgd2luZDogeyBzcGVlZDogbnVtYmVyOyBkZWc6IG51bWJlciB9O1xufVxuIl19
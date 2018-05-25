/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TemperatureScale } from '../../../components/weather-current-temperature/current-temperature.component';
import { PoolingService } from '../../poling.service';
import { WeatherApiConfig, WeatherApiService } from '../weather.api.service';
import { iconCodes } from './open-weather-map-to-weather-icons';
export class OpenWeatherMapApiService extends WeatherApiService {
    /**
     * @param {?} http
     * @param {?} poolingService
     * @param {?} apiConfig
     */
    constructor(http, poolingService, apiConfig) {
        super(http, poolingService, apiConfig);
        this.http = http;
        this.poolingService = poolingService;
        this.apiConfig = apiConfig;
        this.iconCodes = iconCodes;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    mapQueryParams(params) {
        const /** @type {?} */ mapped = {
            id: params.cityId,
            q: params.cityName,
            lat: params.latLng ? params.latLng.lat : undefined,
            lon: params.latLng ? params.latLng.lng : undefined,
            zip: params.zipCode,
            units: params.units ? this.mapUnits(params.units) : undefined,
            lang: params.lang
        };
        return mapped;
    }
    /**
     * @param {?} response
     * @return {?}
     */
    mapCurrentWeatherResponse(response) {
        if (!response) {
            return /** @type {?} */ ({});
        }
        const /** @type {?} */ weather = {
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
    }
    /**
     * @param {?} response
     * @return {?}
     */
    mapForecastResponse(response) {
        if (!response) {
            return /** @type {?} */ ([]);
        }
        const /** @type {?} */ city = response.city;
        return response.list.map((el) => {
            const /** @type {?} */ forecast = {
                temp: el.main.temp,
                pressure: el.main.pressure,
                humidity: el.main.humidity,
                minTemp: el.main.temp_min,
                maxTemp: el.main.temp_max,
                location: city.name,
                iconClass: this.mapResponseToIconClass(el),
                description: el.weather[0].description,
                data: new Date(el.dt * 1000),
                wind: {
                    deg: el.wind.deg,
                    speed: el.wind.speed
                }
            };
            return forecast;
        });
    }
    /**
     * @param {?} response
     * @return {?}
     */
    mapResponseToIconUrl(response) {
        return `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
    }
    /**
     * @param {?} response
     * @return {?}
     */
    mapResponseToIconClass(response) {
        const /** @type {?} */ code = response.weather[0].id;
        const /** @type {?} */ prefix = 'wi wi-';
        let /** @type {?} */ icon = iconCodes[code].icon;
        // If we are not in the ranges mentioned above, add a day/night prefix.
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }
        icon = prefix + icon;
        return icon;
    }
    /**
     * @return {?}
     */
    setTokenKey() {
        return 'APPID';
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    mapUnits(unit) {
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
    }
}
OpenWeatherMapApiService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
OpenWeatherMapApiService.ctorParameters = () => [
    { type: Http, },
    { type: PoolingService, },
    { type: WeatherApiConfig, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi13ZWF0aGVyLW1hcC5hcGkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYXBpL29wZW4td2VhdGhlci1tYXAvb3Blbi13ZWF0aGVyLW1hcC5hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtFQUErRSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBR0wsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNsQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0scUNBQXFDLENBQUM7QUFJOUUsTUFBTSwrQkFBZ0MsU0FBUSxpQkFBaUI7Ozs7OztJQUc3RCxZQUNZLElBQVUsRUFDVixjQUE4QixFQUNqQztRQUVQLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBSjdCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDakMsY0FBUyxHQUFULFNBQVM7UUFHaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7S0FDNUI7Ozs7O0lBRVMsY0FBYyxDQUN0QixNQUEwQjtRQUUxQix1QkFBTSxNQUFNLEdBQWtDO1lBQzVDLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNqQixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDbEIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENB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QztTQUN0QjtRQUNELElBQUksR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7OztJQUVTLFdBQVc7UUFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNoQjs7Ozs7SUFFTyxRQUFRLENBQUMsSUFBc0I7UUFDckMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssZ0JBQWdCLENBQUMsT0FBTztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNsQixLQUFLLGdCQUFnQixDQUFDLFVBQVU7Z0JBQzlCLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEIsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUMxQixNQUFNLENBQUM7WUFDVDtnQkFDRSxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ25COzs7O1lBM0hKLFVBQVU7Ozs7WUFiRixJQUFJO1lBR0osY0FBYztZQUlyQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUZW1wZXJhdHVyZVNjYWxlIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUvY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9vbGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9wb2xpbmcuc2VydmljZSc7XG5pbXBvcnQge1xuICBDdXJyZW50V2VhdGhlcixcbiAgRm9yZWNhc3QsXG4gIFdlYXRoZXJBcGlDb25maWcsXG4gIFdlYXRoZXJBcGlTZXJ2aWNlXG59IGZyb20gJy4uL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgaWNvbkNvZGVzLCBJY29uQ29kZVR5cGUgfSBmcm9tICcuL29wZW4td2VhdGhlci1tYXAtdG8td2VhdGhlci1pY29ucyc7XG5pbXBvcnQgeyBXZWF0aGVyUXVlcnlQYXJhbXMgfSBmcm9tICcuLi8uLi8uLi93ZWF0aGVyLmludGVyZmFjZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3BlbldlYXRoZXJNYXBBcGlTZXJ2aWNlIGV4dGVuZHMgV2VhdGhlckFwaVNlcnZpY2Uge1xuICBpY29uQ29kZXM6IEljb25Db2RlVHlwZTtcbiAgaWNvbkNvZGVzJCE6IE9ic2VydmFibGU8YW55PjtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHAsXG4gICAgcHJvdGVjdGVkIHBvb2xpbmdTZXJ2aWNlOiBQb29saW5nU2VydmljZSxcbiAgICBwdWJsaWMgYXBpQ29uZmlnOiBXZWF0aGVyQXBpQ29uZmlnXG4gICkge1xuICAgIHN1cGVyKGh0dHAsIHBvb2xpbmdTZXJ2aWNlLCBhcGlDb25maWcpO1xuICAgIHRoaXMuaWNvbkNvZGVzID0gaWNvbkNvZGVzO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcFF1ZXJ5UGFyYW1zKFxuICAgIHBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zXG4gICk6IE9wZW5XZWF0aGVyTWFwTG9jYXRpb25SZXF1ZXN0IHtcbiAgICBjb25zdCBtYXBwZWQ6IE9wZW5XZWF0aGVyTWFwTG9jYXRpb25SZXF1ZXN0ID0ge1xuICAgICAgaWQ6IHBhcmFtcy5jaXR5SWQsXG4gICAgICBxOiBwYXJhbXMuY2l0eU5hbWUsXG4gICAgICBsYXQ6IHBhcmFtcy5sYXRMbmcgPyBwYXJhbXMubGF0TG5nLmxhdCA6IHVuZGVmaW5lZCxcbiAgICAgIGxvbjogcGFyYW1zLmxhdExuZyA/IHBhcmFtcy5sYXRMbmcubG5nIDogdW5kZWZpbmVkLFxuICAgICAgemlwOiBwYXJhbXMuemlwQ29kZSxcbiAgICAgIHVuaXRzOiBwYXJhbXMudW5pdHMgPyB0aGlzLm1hcFVuaXRzKHBhcmFtcy51bml0cykgOiB1bmRlZmluZWQsXG4gICAgICBsYW5nOiBwYXJhbXMubGFuZ1xuICAgIH07XG4gICAgcmV0dXJuIG1hcHBlZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOiBPcGVuV2VhdGhlck1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2VcbiAgKTogQ3VycmVudFdlYXRoZXIge1xuICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiA8Q3VycmVudFdlYXRoZXI+e307XG4gICAgfVxuICAgIGNvbnN0IHdlYXRoZXI6IEN1cnJlbnRXZWF0aGVyID0ge1xuICAgICAgdGVtcDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgcHJlc3N1cmU6IHJlc3BvbnNlLm1haW4gPyByZXNwb25zZS5tYWluLnByZXNzdXJlIDogdW5kZWZpbmVkLFxuICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLm1haW4gPyByZXNwb25zZS5tYWluLmh1bWlkaXR5IDogdW5kZWZpbmVkLFxuICAgICAgbWluVGVtcDpcbiAgICAgICAgcmVzcG9uc2UubWFpbiAmJiByZXNwb25zZS5tYWluLnRlbXBcbiAgICAgICAgICA/IHJlc3BvbnNlLm1haW4udGVtcF9taW5cbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIG1heFRlbXA6XG4gICAgICAgIHJlc3BvbnNlLm1haW4gJiYgcmVzcG9uc2UubWFpbi50ZW1wXG4gICAgICAgICAgPyByZXNwb25zZS5tYWluLnRlbXBfbWF4XG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICBzdW5yaXNlOiByZXNwb25zZS5zeXMgPyByZXNwb25zZS5zeXMuc3VucmlzZSA6IHVuZGVmaW5lZCxcbiAgICAgIHN1bnNldDogcmVzcG9uc2Uuc3lzID8gcmVzcG9uc2Uuc3lzLnN1bnNldCA6IHVuZGVmaW5lZCxcbiAgICAgIGxvY2F0aW9uOiByZXNwb25zZS5uYW1lLFxuICAgICAgaWNvblVybDogdGhpcy5tYXBSZXNwb25zZVRvSWNvblVybChyZXNwb25zZSksXG4gICAgICBpY29uQ2xhc3M6IHRoaXMubWFwUmVzcG9uc2VUb0ljb25DbGFzcyhyZXNwb25zZSksXG4gICAgICBkZXNjcmlwdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgIHdpbmQ6IHtcbiAgICAgICAgZGVnOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgc3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWRcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB3ZWF0aGVyO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcEZvcmVjYXN0UmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IE9wZW5XZWF0aGVyTWFwRm9yZWNhc3RSZXNwb25zZVxuICApOiBGb3JlY2FzdFtdIHtcbiAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gPEZvcmVjYXN0W10+W107XG4gICAgfVxuICAgIGNvbnN0IGNpdHkgPSByZXNwb25zZS5jaXR5O1xuICAgIHJldHVybiByZXNwb25zZS5saXN0Lm1hcCgoZWw6IE9wZW5XZWF0aGVyTWFwRm9yZWNhc3RSZXNwb25zZUVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IGZvcmVjYXN0OiBGb3JlY2FzdCA9IHtcbiAgICAgICAgdGVtcDogZWwubWFpbi50ZW1wLFxuICAgICAgICBwcmVzc3VyZTogZWwubWFpbi5wcmVzc3VyZSxcbiAgICAgICAgaHVtaWRpdHk6IGVsLm1haW4uaHVtaWRpdHksXG4gICAgICAgIG1pblRlbXA6IGVsLm1haW4udGVtcF9taW4sXG4gICAgICAgIG1heFRlbXA6IGVsLm1haW4udGVtcF9tYXgsXG4gICAgICAgIGxvY2F0aW9uOiBjaXR5Lm5hbWUsXG4gICAgICAgIGljb25DbGFzczogdGhpcy5tYXBSZXNwb25zZVRvSWNvbkNsYXNzKGVsKSxcbiAgICAgICAgZGVzY3JpcHRpb246IGVsLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgIGRhdGE6IG5ldyBEYXRlKGVsLmR0ICogMTAwMCksXG4gICAgICAgIHdpbmQ6IHtcbiAgICAgICAgICBkZWc6IGVsLndpbmQuZGVnLFxuICAgICAgICAgIHNwZWVkOiBlbC53aW5kLnNwZWVkXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gZm9yZWNhc3Q7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwUmVzcG9uc2VUb0ljb25VcmwoXG4gICAgcmVzcG9uc2U6IE9wZW5XZWF0aGVyTWFwQ3VycmVudFdlYXRoZXJSZXNwb25zZVxuICApOiBzdHJpbmcge1xuICAgIHJldHVybiBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn0ucG5nYDtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBSZXNwb25zZVRvSWNvbkNsYXNzKFxuICAgIHJlc3BvbnNlOlxuICAgICAgfCBPcGVuV2VhdGhlck1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2VcbiAgICAgIHwgT3BlbldlYXRoZXJNYXBGb3JlY2FzdFJlc3BvbnNlRWxlbWVudFxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvZGUgPSByZXNwb25zZS53ZWF0aGVyWzBdLmlkO1xuICAgIGNvbnN0IHByZWZpeCA9ICd3aSB3aS0nO1xuICAgIGxldCBpY29uID0gaWNvbkNvZGVzW2NvZGVdLmljb247XG4gICAgLy8gSWYgd2UgYXJlIG5vdCBpbiB0aGUgcmFuZ2VzIG1lbnRpb25lZCBhYm92ZSwgYWRkIGEgZGF5L25pZ2h0IHByZWZpeC5cbiAgICBpZiAoIShjb2RlID4gNjk5ICYmIGNvZGUgPCA4MDApICYmICEoY29kZSA+IDg5OSAmJiBjb2RlIDwgMTAwMCkpIHtcbiAgICAgIGljb24gPSAnZGF5LScgKyBpY29uO1xuICAgIH1cbiAgICBpY29uID0gcHJlZml4ICsgaWNvbjtcbiAgICByZXR1cm4gaWNvbjtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRUb2tlbktleSgpIHtcbiAgICByZXR1cm4gJ0FQUElEJztcbiAgfVxuXG4gIHByaXZhdGUgbWFwVW5pdHModW5pdDogVGVtcGVyYXR1cmVTY2FsZSkge1xuICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLkNFTENJVVM6XG4gICAgICAgIHJldHVybiAnbWV0cmljJztcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5GQUhSRU5IRUlUOlxuICAgICAgICByZXR1cm4gJ2ltcGVyaWFsJztcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5LRUxWSU46XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnbWV0cmljJztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuV2VhdGhlck1hcExvY2F0aW9uUmVxdWVzdCB7XG4gIGlkPzogYW55O1xuICBxPzogYW55O1xuICBsYXQ/OiBhbnk7XG4gIGxvbj86IGFueTtcbiAgemlwPzogYW55O1xuICB1bml0cz86ICdpbXBlcmlhbCcgfCAnbWV0cmljJztcbiAgbGFuZz86IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuV2VhdGhlck1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2Uge1xuICBjb29yZDogeyBsb246IG51bWJlcjsgbGF0OiBudW1iZXIgfTtcbiAgd2VhdGhlcjogW3sgaWQ6IG51bWJlcjsgbWFpbjogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nOyBpY29uOiBzdHJpbmcgfV07XG4gIGJhc2U6IHN0cmluZztcbiAgbWFpbjoge1xuICAgIHRlbXA6IG51bWJlcjtcbiAgICBwcmVzc3VyZTogbnVtYmVyO1xuICAgIGh1bWlkaXR5OiBudW1iZXI7XG4gICAgdGVtcF9taW46IG51bWJlcjtcbiAgICB0ZW1wX21heDogbnVtYmVyO1xuICB9O1xuICB2aXNpYmlsaXR5OiBudW1iZXI7XG4gIHdpbmQ6IHsgc3BlZWQ6IG51bWJlcjsgZGVnOiBudW1iZXIgfTtcbiAgY2xvdWRzOiB7IGFsbDogbnVtYmVyIH07XG4gIGR0OiBudW1iZXI7XG4gIHN5czoge1xuICAgIHR5cGU6IG51bWJlcjtcbiAgICBpZDogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IG51bWJlcjtcbiAgICBjb3VudHJ5OiBzdHJpbmc7XG4gICAgc3VucmlzZTogbnVtYmVyO1xuICAgIHN1bnNldDogbnVtYmVyO1xuICB9O1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvZDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5XZWF0aGVyTWFwRm9yZWNhc3RSZXNwb25zZSB7XG4gIGNpdHk6IHtcbiAgICBjb29yZDoge1xuICAgICAgbGF0OiBudW1iZXI7XG4gICAgICBsb246IG51bWJlcjtcbiAgICB9O1xuICAgIGNvdW50cnk6IHN0cmluZztcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgfTtcbiAgbWVzc2FnZTogbnVtYmVyO1xuICBjb2Q6IHN0cmluZztcbiAgY250OiBudW1iZXI7XG4gIGxpc3Q6IE9wZW5XZWF0aGVyTWFwRm9yZWNhc3RSZXNwb25zZUVsZW1lbnRbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2VFbGVtZW50IHtcbiAgY2xvdWRzOiB7XG4gICAgYWxsOiBudW1iZXI7XG4gIH07XG4gIGR0OiBudW1iZXI7XG4gIGR0X3R4dDogc3RyaW5nO1xuICBtYWluOiB7XG4gICAgZ3JuZF9sZXZlbDogbnVtYmVyO1xuICAgIHRlbXA6IG51bWJlcjtcbiAgICBwcmVzc3VyZTogbnVtYmVyO1xuICAgIGh1bWlkaXR5OiBudW1iZXI7XG4gICAgdGVtcF9taW46IG51bWJlcjtcbiAgICB0ZW1wX21heDogbnVtYmVyO1xuICAgIHRlbXBfa2Y6IG51bWJlcjtcbiAgICBzZWFfbGV2ZWw6IG51bWJlcjtcbiAgfTtcbiAgc3lzOiB7XG4gICAgcG9kOiBzdHJpbmc7XG4gIH07XG4gIHdlYXRoZXI6IFt7IGlkOiBudW1iZXI7IG1haW46IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZzsgaWNvbjogc3RyaW5nIH1dO1xuICB3aW5kOiB7IHNwZWVkOiBudW1iZXI7IGRlZzogbnVtYmVyIH07XG59XG4iXX0=
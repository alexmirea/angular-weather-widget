/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { PoolingService } from '../poling.service';
import { map, filter } from "rxjs/operators";
/**
 * @abstract
 */
export class WeatherApiService {
    /**
     * @param {?} http
     * @param {?} poolingService
     * @param {?} apiConfig
     */
    constructor(http, poolingService, apiConfig) {
        this.http = http;
        this.poolingService = poolingService;
        this.apiConfig = apiConfig;
        this.poollingInterval = 60000 * 60;
    }
    /**
     * @param {?} queryParams
     * @return {?}
     */
    currentWeather(queryParams) {
        return this.callApi(queryParams, '/weather').pipe(map(this.mapCurrentWeatherResponse.bind(this)));
    }
    /**
     * @param {?} queryParams
     * @return {?}
     */
    forecast(queryParams) {
        return this.callApi(queryParams, '/forecast').pipe(map(this.mapForecastResponse.bind(this)));
    }
    /**
     * @param {?} queryParams
     * @param {?} endpoint
     * @return {?}
     */
    callApi(queryParams, endpoint) {
        const /** @type {?} */ params = this.mapQueryParams(queryParams);
        const /** @type {?} */ requestOptions = this.getRequestOptions(params);
        const /** @type {?} */ apiCall = this.http
            .get(`${this.apiConfig.baseUrl}/${endpoint}`, requestOptions)
            .pipe(map(resp => resp.json()), filter(el => !!el));
        return this.wrapWithPoll(apiCall);
    }
    /**
     * @return {?}
     */
    setTokenKey() {
        // Implement it in child service
        return '';
    }
    /**
     * @param {?} params
     * @return {?}
     */
    mapQueryParams(params) {
        // Implement it in child service
        return;
    }
    /**
     * @param {?} response
     * @return {?}
     */
    mapCurrentWeatherResponse(response) {
        // Implement it in child service
        return /** @type {?} */ ({});
    }
    /**
     * @param {?} response
     * @return {?}
     */
    mapForecastResponse(response) {
        // Implement it in child service
        return /** @type {?} */ ([]);
    }
    /**
     * @param {?} response
     * @return {?}
     */
    mapResponseToIconUrl(response) {
        return '';
    }
    /**
     * @param {?} response
     * @return {?}
     */
    mapResponseToIconClass(response) {
        return '';
    }
    /**
     * @param {?} apiCall
     * @return {?}
     */
    wrapWithPoll(apiCall) {
        return this.poolingService.execute(() => apiCall, this.poollingInterval);
    }
    /**
     * @param {?} queryParams
     * @return {?}
     */
    getRequestOptions(queryParams) {
        return new RequestOptions({
            headers: new Headers(),
            params: this.getQueryParams(queryParams)
        });
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    getQueryParams(obj) {
        const /** @type {?} */ queryParams = new URLSearchParams();
        queryParams.set(this.setTokenKey(), this.apiConfig.key);
        for (const /** @type {?} */ key in obj) {
            if (obj.hasOwnProperty(key)) {
                queryParams.set(key.toString(), obj[key]);
            }
        }
        return queryParams;
    }
}
WeatherApiService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WeatherApiService.ctorParameters = () => [
    { type: Http, },
    { type: PoolingService, },
    { type: WeatherApiConfig, decorators: [{ type: Inject, args: ['WEATHER_CONFIG',] },] },
];
function WeatherApiService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherApiService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherApiService.ctorParameters;
    /** @type {?} */
    WeatherApiService.prototype.poollingInterval;
    /** @type {?} */
    WeatherApiService.prototype.http;
    /** @type {?} */
    WeatherApiService.prototype.poolingService;
    /** @type {?} */
    WeatherApiService.prototype.apiConfig;
}
/**
 * @record
 */
export function CurrentWeather() { }
function CurrentWeather_tsickle_Closure_declarations() {
    /** @type {?} */
    CurrentWeather.prototype.location;
    /** @type {?} */
    CurrentWeather.prototype.temp;
    /** @type {?|undefined} */
    CurrentWeather.prototype.pressure;
    /** @type {?|undefined} */
    CurrentWeather.prototype.humidity;
    /** @type {?|undefined} */
    CurrentWeather.prototype.minTemp;
    /** @type {?|undefined} */
    CurrentWeather.prototype.maxTemp;
    /** @type {?|undefined} */
    CurrentWeather.prototype.sunrise;
    /** @type {?|undefined} */
    CurrentWeather.prototype.sunset;
    /** @type {?|undefined} */
    CurrentWeather.prototype.iconClass;
    /** @type {?|undefined} */
    CurrentWeather.prototype.iconUrl;
    /** @type {?|undefined} */
    CurrentWeather.prototype.description;
    /** @type {?|undefined} */
    CurrentWeather.prototype.wind;
}
/**
 * @record
 */
export function Forecast() { }
function Forecast_tsickle_Closure_declarations() {
    /** @type {?} */
    Forecast.prototype.data;
}
export class WeatherApiConfig {
    constructor() {
        this.name = WeatherApiName.OPEN_WEATHER_MAP;
        this.key = 'provide secret key';
        this.baseUrl = 'http://api.openweathermap.org/data/2.5';
    }
}
function WeatherApiConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    WeatherApiConfig.prototype.name;
    /** @type {?} */
    WeatherApiConfig.prototype.key;
    /** @type {?} */
    WeatherApiConfig.prototype.baseUrl;
}
/** @enum {string} */
const WeatherApiName = {
    OPEN_WEATHER_MAP: /** @type {?} */ ('Open Weather Map'),
};
export { WeatherApiName };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5hcGkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHN0MsTUFBTTs7Ozs7O0lBRUosWUFDWSxJQUFVLEVBQ1YsY0FBOEIsRUFDUDtRQUZ2QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ1AsY0FBUyxHQUFULFNBQVM7Z0NBSnpCLEtBQUssR0FBRyxFQUFFO0tBS3pCOzs7OztJQUVKLGNBQWMsQ0FBQyxXQUErQjtRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbkQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDMUMsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsUUFBUSxDQUFDLFdBQStCO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNwRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNwQyxDQUFDLENBQUM7S0FDSjs7Ozs7O0lBRVMsT0FBTyxDQUNmLFdBQStCLEVBQy9CLFFBQWdCO1FBRWhCLHVCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELHVCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsdUJBQU0sT0FBTyxHQUFvQixJQUFJLENBQUMsSUFBSTthQUN2QyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxRQUFRLEVBQUUsRUFBRSxjQUFjLENBQUM7YUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUM1QixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuQzs7OztJQUVTLFdBQVc7O1FBRW5CLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDWDs7Ozs7SUFFUyxjQUFjLENBQUMsTUFBMEI7O1FBRWpELE1BQU0sQ0FBQztLQUNSOzs7OztJQUVTLHlCQUF5QixDQUFDLFFBQWE7O1FBRS9DLE1BQU0sbUJBQWlCLEVBQUUsRUFBQztLQUMzQjs7Ozs7SUFFUyxtQkFBbUIsQ0FBQyxRQUFhOztRQUV6QyxNQUFNLG1CQUFhLEVBQUUsRUFBQztLQUN2Qjs7Ozs7SUFFUyxvQkFBb0IsQ0FBQyxRQUFhO1FBQzFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDWDs7Ozs7SUFDUyxzQkFBc0IsQ0FBQyxRQUFhO1FBQzVDLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDWDs7Ozs7SUFFTyxZQUFZLENBQUMsT0FBd0I7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7Ozs7O0lBR25FLGlCQUFpQixDQUFDLFdBQW1CO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQztZQUN4QixPQUFPLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO1NBQ3pDLENBQUMsQ0FBQzs7Ozs7O0lBR0csY0FBYyxDQUFDLEdBQTJCO1FBQ2hELHVCQUFNLFdBQVcsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEQsR0FBRyxDQUFDLENBQUMsdUJBQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1NBQ0Y7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDOzs7O1lBaEZ0QixVQUFVOzs7O1lBTk8sSUFBSTtZQUViLGNBQWM7WUE4R1YsZ0JBQWdCLHVCQXBHeEIsTUFBTSxTQUFDLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0c1QixNQUFNOztvQkFDbUIsY0FBYyxDQUFDLGdCQUFnQjttQkFDaEQsb0JBQW9CO3VCQUNoQix3Q0FBd0M7O0NBQ25EOzs7Ozs7Ozs7Ozt3Q0FHeUIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXF1ZXN0T3B0aW9ucywgVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQb29saW5nU2VydmljZSB9IGZyb20gJy4uL3BvbGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJRdWVyeVBhcmFtcyB9IGZyb20gJy4uLy4uL3dlYXRoZXIuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2VhdGhlckFwaVNlcnZpY2Uge1xuICBwb29sbGluZ0ludGVydmFsID0gNjAwMDAgKiA2MDtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHAsXG4gICAgcHJvdGVjdGVkIHBvb2xpbmdTZXJ2aWNlOiBQb29saW5nU2VydmljZSxcbiAgICBASW5qZWN0KCdXRUFUSEVSX0NPTkZJRycpIHB1YmxpYyBhcGlDb25maWc6IFdlYXRoZXJBcGlDb25maWdcbiAgKSB7fVxuXG4gIGN1cnJlbnRXZWF0aGVyKHF1ZXJ5UGFyYW1zOiBXZWF0aGVyUXVlcnlQYXJhbXMpOiBPYnNlcnZhYmxlPEN1cnJlbnRXZWF0aGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbEFwaShxdWVyeVBhcmFtcywgJy93ZWF0aGVyJykucGlwZShtYXAoXG4gICAgICB0aGlzLm1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2UuYmluZCh0aGlzKVxuICAgICkpO1xuICB9XG5cbiAgZm9yZWNhc3QocXVlcnlQYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtcyk6IE9ic2VydmFibGU8Rm9yZWNhc3RbXT4ge1xuICAgIHJldHVybiB0aGlzLmNhbGxBcGkocXVlcnlQYXJhbXMsICcvZm9yZWNhc3QnKS5waXBlKG1hcChcbiAgICAgIHRoaXMubWFwRm9yZWNhc3RSZXNwb25zZS5iaW5kKHRoaXMpXG4gICAgKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FsbEFwaShcbiAgICBxdWVyeVBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zLFxuICAgIGVuZHBvaW50OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLm1hcFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHRoaXMuZ2V0UmVxdWVzdE9wdGlvbnMocGFyYW1zKTtcbiAgICBjb25zdCBhcGlDYWxsOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmh0dHBcbiAgICAgIC5nZXQoYCR7dGhpcy5hcGlDb25maWcuYmFzZVVybH0vJHtlbmRwb2ludH1gLCByZXF1ZXN0T3B0aW9ucylcbiAgICAgIC5waXBlKG1hcChyZXNwID0+IHJlc3AuanNvbigpKSxcbiAgICAgICAgZmlsdGVyKGVsID0+ICEhZWwpKVxuICAgIHJldHVybiB0aGlzLndyYXBXaXRoUG9sbChhcGlDYWxsKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRUb2tlbktleSgpOiBzdHJpbmcge1xuICAgIC8vIEltcGxlbWVudCBpdCBpbiBjaGlsZCBzZXJ2aWNlXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcFF1ZXJ5UGFyYW1zKHBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zKTogYW55IHtcbiAgICAvLyBJbXBsZW1lbnQgaXQgaW4gY2hpbGQgc2VydmljZVxuICAgIHJldHVybjtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlKHJlc3BvbnNlOiBhbnkpOiBDdXJyZW50V2VhdGhlciB7XG4gICAgLy8gSW1wbGVtZW50IGl0IGluIGNoaWxkIHNlcnZpY2VcbiAgICByZXR1cm4gPEN1cnJlbnRXZWF0aGVyPnt9O1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcEZvcmVjYXN0UmVzcG9uc2UocmVzcG9uc2U6IGFueSk6IEZvcmVjYXN0W10ge1xuICAgIC8vIEltcGxlbWVudCBpdCBpbiBjaGlsZCBzZXJ2aWNlXG4gICAgcmV0dXJuIDxGb3JlY2FzdFtdPltdO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcFJlc3BvbnNlVG9JY29uVXJsKHJlc3BvbnNlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBwcm90ZWN0ZWQgbWFwUmVzcG9uc2VUb0ljb25DbGFzcyhyZXNwb25zZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBwcml2YXRlIHdyYXBXaXRoUG9sbChhcGlDYWxsOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICByZXR1cm4gdGhpcy5wb29saW5nU2VydmljZS5leGVjdXRlKCgpID0+IGFwaUNhbGwsIHRoaXMucG9vbGxpbmdJbnRlcnZhbCk7XG4gIH1cblxuICBwcml2YXRlIGdldFJlcXVlc3RPcHRpb25zKHF1ZXJ5UGFyYW1zOiBPYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKCksXG4gICAgICBwYXJhbXM6IHRoaXMuZ2V0UXVlcnlQYXJhbXMocXVlcnlQYXJhbXMpXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFF1ZXJ5UGFyYW1zKG9iajogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IFVSTFNlYXJjaFBhcmFtcyB7XG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgcXVlcnlQYXJhbXMuc2V0KHRoaXMuc2V0VG9rZW5LZXkoKSwgdGhpcy5hcGlDb25maWcua2V5KTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBxdWVyeVBhcmFtcy5zZXQoa2V5LnRvU3RyaW5nKCksIG9ialtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5UGFyYW1zO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VycmVudFdlYXRoZXIge1xuICBsb2NhdGlvbjogc3RyaW5nO1xuICB0ZW1wOiBudW1iZXI7XG4gIHByZXNzdXJlPzogbnVtYmVyO1xuICBodW1pZGl0eT86IG51bWJlcjtcbiAgbWluVGVtcD86IG51bWJlcjtcbiAgbWF4VGVtcD86IG51bWJlcjtcbiAgc3VucmlzZT86IG51bWJlcjtcbiAgc3Vuc2V0PzogbnVtYmVyO1xuICBpY29uQ2xhc3M/OiBzdHJpbmc7XG4gIGljb25Vcmw/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICB3aW5kPzoge1xuICAgIGRlZzogbnVtYmVyO1xuICAgIHNwZWVkOiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9yZWNhc3QgZXh0ZW5kcyBDdXJyZW50V2VhdGhlciB7XG4gIGRhdGE6IERhdGU7XG59XG5cbmV4cG9ydCBjbGFzcyBXZWF0aGVyQXBpQ29uZmlnIHtcbiAgbmFtZTogV2VhdGhlckFwaU5hbWUgPSBXZWF0aGVyQXBpTmFtZS5PUEVOX1dFQVRIRVJfTUFQO1xuICBrZXkgPSAncHJvdmlkZSBzZWNyZXQga2V5JztcbiAgYmFzZVVybCA9ICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNSc7XG59XG5cbmV4cG9ydCBlbnVtIFdlYXRoZXJBcGlOYW1lIHtcbiAgT1BFTl9XRUFUSEVSX01BUCA9IDxhbnk+J09wZW4gV2VhdGhlciBNYXAnXG59XG4iXX0=
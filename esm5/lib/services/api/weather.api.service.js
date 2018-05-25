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
var WeatherApiService = /** @class */ (function () {
    function WeatherApiService(http, poolingService, apiConfig) {
        this.http = http;
        this.poolingService = poolingService;
        this.apiConfig = apiConfig;
        this.poollingInterval = 60000 * 60;
    }
    /**
     * @param {?} queryParams
     * @return {?}
     */
    WeatherApiService.prototype.currentWeather = /**
     * @param {?} queryParams
     * @return {?}
     */
    function (queryParams) {
        return this.callApi(queryParams, '/weather').pipe(map(this.mapCurrentWeatherResponse.bind(this)));
    };
    /**
     * @param {?} queryParams
     * @return {?}
     */
    WeatherApiService.prototype.forecast = /**
     * @param {?} queryParams
     * @return {?}
     */
    function (queryParams) {
        return this.callApi(queryParams, '/forecast').pipe(map(this.mapForecastResponse.bind(this)));
    };
    /**
     * @param {?} queryParams
     * @param {?} endpoint
     * @return {?}
     */
    WeatherApiService.prototype.callApi = /**
     * @param {?} queryParams
     * @param {?} endpoint
     * @return {?}
     */
    function (queryParams, endpoint) {
        var /** @type {?} */ params = this.mapQueryParams(queryParams);
        var /** @type {?} */ requestOptions = this.getRequestOptions(params);
        var /** @type {?} */ apiCall = this.http
            .get(this.apiConfig.baseUrl + "/" + endpoint, requestOptions)
            .pipe(map(function (resp) { return resp.json(); }), filter(function (el) { return !!el; }));
        return this.wrapWithPoll(apiCall);
    };
    /**
     * @return {?}
     */
    WeatherApiService.prototype.setTokenKey = /**
     * @return {?}
     */
    function () {
        // Implement it in child service
        return '';
    };
    /**
     * @param {?} params
     * @return {?}
     */
    WeatherApiService.prototype.mapQueryParams = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        // Implement it in child service
        return;
    };
    /**
     * @param {?} response
     * @return {?}
     */
    WeatherApiService.prototype.mapCurrentWeatherResponse = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        // Implement it in child service
        return /** @type {?} */ ({});
    };
    /**
     * @param {?} response
     * @return {?}
     */
    WeatherApiService.prototype.mapForecastResponse = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        // Implement it in child service
        return /** @type {?} */ ([]);
    };
    /**
     * @param {?} response
     * @return {?}
     */
    WeatherApiService.prototype.mapResponseToIconUrl = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        return '';
    };
    /**
     * @param {?} response
     * @return {?}
     */
    WeatherApiService.prototype.mapResponseToIconClass = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        return '';
    };
    /**
     * @param {?} apiCall
     * @return {?}
     */
    WeatherApiService.prototype.wrapWithPoll = /**
     * @param {?} apiCall
     * @return {?}
     */
    function (apiCall) {
        return this.poolingService.execute(function () { return apiCall; }, this.poollingInterval);
    };
    /**
     * @param {?} queryParams
     * @return {?}
     */
    WeatherApiService.prototype.getRequestOptions = /**
     * @param {?} queryParams
     * @return {?}
     */
    function (queryParams) {
        return new RequestOptions({
            headers: new Headers(),
            params: this.getQueryParams(queryParams)
        });
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    WeatherApiService.prototype.getQueryParams = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        var /** @type {?} */ queryParams = new URLSearchParams();
        queryParams.set(this.setTokenKey(), this.apiConfig.key);
        for (var /** @type {?} */ key in obj) {
            if (obj.hasOwnProperty(key)) {
                queryParams.set(key.toString(), obj[key]);
            }
        }
        return queryParams;
    };
    WeatherApiService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WeatherApiService.ctorParameters = function () { return [
        { type: Http, },
        { type: PoolingService, },
        { type: WeatherApiConfig, decorators: [{ type: Inject, args: ['WEATHER_CONFIG',] },] },
    ]; };
    return WeatherApiService;
}());
export { WeatherApiService };
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
var WeatherApiConfig = /** @class */ (function () {
    function WeatherApiConfig() {
        this.name = WeatherApiName.OPEN_WEATHER_MAP;
        this.key = 'provide secret key';
        this.baseUrl = 'http://api.openweathermap.org/data/2.5';
    }
    return WeatherApiConfig;
}());
export { WeatherApiConfig };
function WeatherApiConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    WeatherApiConfig.prototype.name;
    /** @type {?} */
    WeatherApiConfig.prototype.key;
    /** @type {?} */
    WeatherApiConfig.prototype.baseUrl;
}
/** @enum {string} */
var WeatherApiName = {
    OPEN_WEATHER_MAP: /** @type {?} */ ('Open Weather Map'),
};
export { WeatherApiName };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5hcGkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0lBSzNDLDJCQUNZLElBQVUsRUFDVixjQUE4QixFQUNQO1FBRnZCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDUCxjQUFTLEdBQVQsU0FBUztnQ0FKekIsS0FBSyxHQUFHLEVBQUU7S0FLekI7Ozs7O0lBRUosMENBQWM7Ozs7SUFBZCxVQUFlLFdBQStCO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNuRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUMxQyxDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxvQ0FBUTs7OztJQUFSLFVBQVMsV0FBK0I7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ3BELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BDLENBQUMsQ0FBQztLQUNKOzs7Ozs7SUFFUyxtQ0FBTzs7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O3dDQUd5QixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAsIFJlcXVlc3RPcHRpb25zLCBVUkxTZWFyY2hQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBvb2xpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vcG9saW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlclF1ZXJ5UGFyYW1zIH0gZnJvbSAnLi4vLi4vd2VhdGhlci5pbnRlcmZhY2VzJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXZWF0aGVyQXBpU2VydmljZSB7XG4gIHBvb2xsaW5nSW50ZXJ2YWwgPSA2MDAwMCAqIDYwO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cCxcbiAgICBwcm90ZWN0ZWQgcG9vbGluZ1NlcnZpY2U6IFBvb2xpbmdTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ1dFQVRIRVJfQ09ORklHJykgcHVibGljIGFwaUNvbmZpZzogV2VhdGhlckFwaUNvbmZpZ1xuICApIHt9XG5cbiAgY3VycmVudFdlYXRoZXIocXVlcnlQYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtcyk6IE9ic2VydmFibGU8Q3VycmVudFdlYXRoZXI+IHtcbiAgICByZXR1cm4gdGhpcy5jYWxsQXBpKHF1ZXJ5UGFyYW1zLCAnL3dlYXRoZXInKS5waXBlKG1hcChcbiAgICAgIHRoaXMubWFwQ3VycmVudFdlYXRoZXJSZXNwb25zZS5iaW5kKHRoaXMpXG4gICAgKSk7XG4gIH1cblxuICBmb3JlY2FzdChxdWVyeVBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zKTogT2JzZXJ2YWJsZTxGb3JlY2FzdFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbEFwaShxdWVyeVBhcmFtcywgJy9mb3JlY2FzdCcpLnBpcGUobWFwKFxuICAgICAgdGhpcy5tYXBGb3JlY2FzdFJlc3BvbnNlLmJpbmQodGhpcylcbiAgICApKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxsQXBpKFxuICAgIHF1ZXJ5UGFyYW1zOiBXZWF0aGVyUXVlcnlQYXJhbXMsXG4gICAgZW5kcG9pbnQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMubWFwUXVlcnlQYXJhbXMocXVlcnlQYXJhbXMpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gdGhpcy5nZXRSZXF1ZXN0T3B0aW9ucyhwYXJhbXMpO1xuICAgIGNvbnN0IGFwaUNhbGw6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuaHR0cFxuICAgICAgLmdldChgJHt0aGlzLmFwaUNvbmZpZy5iYXNlVXJsfS8ke2VuZHBvaW50fWAsIHJlcXVlc3RPcHRpb25zKVxuICAgICAgLnBpcGUobWFwKHJlc3AgPT4gcmVzcC5qc29uKCkpLFxuICAgICAgICBmaWx0ZXIoZWwgPT4gISFlbCkpXG4gICAgcmV0dXJuIHRoaXMud3JhcFdpdGhQb2xsKGFwaUNhbGwpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFRva2VuS2V5KCk6IHN0cmluZyB7XG4gICAgLy8gSW1wbGVtZW50IGl0IGluIGNoaWxkIHNlcnZpY2VcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwUXVlcnlQYXJhbXMocGFyYW1zOiBXZWF0aGVyUXVlcnlQYXJhbXMpOiBhbnkge1xuICAgIC8vIEltcGxlbWVudCBpdCBpbiBjaGlsZCBzZXJ2aWNlXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2UocmVzcG9uc2U6IGFueSk6IEN1cnJlbnRXZWF0aGVyIHtcbiAgICAvLyBJbXBsZW1lbnQgaXQgaW4gY2hpbGQgc2VydmljZVxuICAgIHJldHVybiA8Q3VycmVudFdlYXRoZXI+e307XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwRm9yZWNhc3RSZXNwb25zZShyZXNwb25zZTogYW55KTogRm9yZWNhc3RbXSB7XG4gICAgLy8gSW1wbGVtZW50IGl0IGluIGNoaWxkIHNlcnZpY2VcbiAgICByZXR1cm4gPEZvcmVjYXN0W10+W107XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwUmVzcG9uc2VUb0ljb25VcmwocmVzcG9uc2U6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHByb3RlY3RlZCBtYXBSZXNwb25zZVRvSWNvbkNsYXNzKHJlc3BvbnNlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHByaXZhdGUgd3JhcFdpdGhQb2xsKGFwaUNhbGw6IE9ic2VydmFibGU8YW55Pikge1xuICAgIHJldHVybiB0aGlzLnBvb2xpbmdTZXJ2aWNlLmV4ZWN1dGUoKCkgPT4gYXBpQ2FsbCwgdGhpcy5wb29sbGluZ0ludGVydmFsKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVxdWVzdE9wdGlvbnMocXVlcnlQYXJhbXM6IE9iamVjdCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdE9wdGlvbnMoe1xuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoKSxcbiAgICAgIHBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcylcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVlcnlQYXJhbXMob2JqOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBxdWVyeVBhcmFtcy5zZXQodGhpcy5zZXRUb2tlbktleSgpLCB0aGlzLmFwaUNvbmZpZy5rZXkpO1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLnNldChrZXkudG9TdHJpbmcoKSwgb2JqW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlcnlQYXJhbXM7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXJyZW50V2VhdGhlciB7XG4gIGxvY2F0aW9uOiBzdHJpbmc7XG4gIHRlbXA6IG51bWJlcjtcbiAgcHJlc3N1cmU/OiBudW1iZXI7XG4gIGh1bWlkaXR5PzogbnVtYmVyO1xuICBtaW5UZW1wPzogbnVtYmVyO1xuICBtYXhUZW1wPzogbnVtYmVyO1xuICBzdW5yaXNlPzogbnVtYmVyO1xuICBzdW5zZXQ/OiBudW1iZXI7XG4gIGljb25DbGFzcz86IHN0cmluZztcbiAgaWNvblVybD86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHdpbmQ/OiB7XG4gICAgZGVnOiBudW1iZXI7XG4gICAgc3BlZWQ6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JlY2FzdCBleHRlbmRzIEN1cnJlbnRXZWF0aGVyIHtcbiAgZGF0YTogRGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFdlYXRoZXJBcGlDb25maWcge1xuICBuYW1lOiBXZWF0aGVyQXBpTmFtZSA9IFdlYXRoZXJBcGlOYW1lLk9QRU5fV0VBVEhFUl9NQVA7XG4gIGtleSA9ICdwcm92aWRlIHNlY3JldCBrZXknO1xuICBiYXNlVXJsID0gJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41Jztcbn1cblxuZXhwb3J0IGVudW0gV2VhdGhlckFwaU5hbWUge1xuICBPUEVOX1dFQVRIRVJfTUFQID0gPGFueT4nT3BlbiBXZWF0aGVyIE1hcCdcbn1cbiJdfQ==
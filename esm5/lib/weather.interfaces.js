/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherSettings = /** @class */ (function () {
    function WeatherSettings() {
        this.location = { cityName: 'Szczecin' };
        this.scale = TemperatureScale.CELCIUS;
        this.backgroundColor = 'white';
        this.color = 'black';
        this.layout = WeatherLayout.NARROW;
    }
    return WeatherSettings;
}());
export { WeatherSettings };
function WeatherSettings_tsickle_Closure_declarations() {
    /** @type {?} */
    WeatherSettings.prototype.location;
    /** @type {?} */
    WeatherSettings.prototype.scale;
    /** @type {?} */
    WeatherSettings.prototype.backgroundColor;
    /** @type {?} */
    WeatherSettings.prototype.color;
    /** @type {?} */
    WeatherSettings.prototype.width;
    /** @type {?} */
    WeatherSettings.prototype.height;
    /** @type {?} */
    WeatherSettings.prototype.showWind;
    /** @type {?} */
    WeatherSettings.prototype.showDetails;
    /** @type {?} */
    WeatherSettings.prototype.showForecast;
    /** @type {?} */
    WeatherSettings.prototype.language;
    /** @type {?} */
    WeatherSettings.prototype.forecastMode;
    /** @type {?} */
    WeatherSettings.prototype.layout;
}
/** @enum {string} */
var ForecastMode = {
    GRID: /** @type {?} */ ('GRID'),
    DETAILED: /** @type {?} */ ('DETAILED'),
};
export { ForecastMode };
/** @enum {string} */
var TemperatureScale = {
    CELCIUS: /** @type {?} */ ('celcius'),
    KELVIN: /** @type {?} */ ('kelvin'),
    FAHRENHEIT: /** @type {?} */ ('fahrenheit'),
};
export { TemperatureScale };
/**
 * @record
 */
export function WeatherQueryParams() { }
function WeatherQueryParams_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    WeatherQueryParams.prototype.cityId;
    /** @type {?|undefined} */
    WeatherQueryParams.prototype.cityName;
    /** @type {?|undefined} */
    WeatherQueryParams.prototype.latLng;
    /** @type {?|undefined} */
    WeatherQueryParams.prototype.zipCode;
    /** @type {?|undefined} */
    WeatherQueryParams.prototype.units;
    /** @type {?|undefined} */
    WeatherQueryParams.prototype.lang;
}
/** @enum {string} */
var WeatherLayout = {
    WIDE: /** @type {?} */ ('wide'),
    NARROW: /** @type {?} */ ('narrow'),
};
export { WeatherLayout };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5pbnRlcmZhY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi93ZWF0aGVyLmludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUE7O3dCQUNpQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7cUJBQzdCLGdCQUFnQixDQUFDLE9BQU87K0JBQy9CLE9BQU87cUJBQ2pCLE9BQU87c0JBUVMsYUFBYSxDQUFDLE1BQU07OzBCQVovQztJQWFDLENBQUE7QUFiRCwyQkFhQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBR2EsTUFBTTtnQ0FDRixVQUFVOzs7OzsrQkFJWCxTQUFTOzhCQUNWLFFBQVE7a0NBQ0osWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBZ0JsQixNQUFNOzhCQUNKLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgV2VhdGhlclNldHRpbmdzIHtcbiAgbG9jYXRpb246IFdlYXRoZXJRdWVyeVBhcmFtcyA9IHsgY2l0eU5hbWU6ICdTemN6ZWNpbicgfTtcbiAgc2NhbGU6IFRlbXBlcmF0dXJlU2NhbGUgPSBUZW1wZXJhdHVyZVNjYWxlLkNFTENJVVM7XG4gIGJhY2tncm91bmRDb2xvcj8gPSAnd2hpdGUnO1xuICBjb2xvcj8gPSAnYmxhY2snO1xuICB3aWR0aD86IGFueTtcbiAgaGVpZ2h0PzogYW55O1xuICBzaG93V2luZD86IGJvb2xlYW47XG4gIHNob3dEZXRhaWxzPzogYm9vbGVhbjtcbiAgc2hvd0ZvcmVjYXN0PzogYm9vbGVhbjtcbiAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIGZvcmVjYXN0TW9kZT86IEZvcmVjYXN0TW9kZTtcbiAgbGF5b3V0PzogV2VhdGhlckxheW91dCA9IFdlYXRoZXJMYXlvdXQuTkFSUk9XO1xufVxuXG5leHBvcnQgZW51bSBGb3JlY2FzdE1vZGUge1xuICBHUklEID0gPGFueT4nR1JJRCcsXG4gIERFVEFJTEVEID0gPGFueT4nREVUQUlMRUQnXG59XG5cbmV4cG9ydCBlbnVtIFRlbXBlcmF0dXJlU2NhbGUge1xuICBDRUxDSVVTID0gPGFueT4nY2VsY2l1cycsXG4gIEtFTFZJTiA9IDxhbnk+J2tlbHZpbicsXG4gIEZBSFJFTkhFSVQgPSA8YW55PidmYWhyZW5oZWl0J1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdlYXRoZXJRdWVyeVBhcmFtcyB7XG4gIGNpdHlJZD86IG51bWJlcjtcbiAgY2l0eU5hbWU/OiBzdHJpbmc7XG4gIGxhdExuZz86IHtcbiAgICBsYXQ6IG51bWJlcjtcbiAgICBsbmc6IG51bWJlcjtcbiAgfTtcbiAgemlwQ29kZT86IHN0cmluZztcbiAgdW5pdHM/OiBUZW1wZXJhdHVyZVNjYWxlO1xuICBsYW5nPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBXZWF0aGVyTGF5b3V0IHtcbiAgV0lERSA9IDxhbnk+J3dpZGUnLFxuICBOQVJST1cgPSA8YW55PiduYXJyb3cnXG59XG4iXX0=
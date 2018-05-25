/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class WeatherSettings {
    constructor() {
        this.location = { cityName: 'Szczecin' };
        this.scale = TemperatureScale.CELCIUS;
        this.backgroundColor = 'white';
        this.color = 'black';
        this.layout = WeatherLayout.NARROW;
    }
}
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
const ForecastMode = {
    GRID: /** @type {?} */ ('GRID'),
    DETAILED: /** @type {?} */ ('DETAILED'),
};
export { ForecastMode };
/** @enum {string} */
const TemperatureScale = {
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
const WeatherLayout = {
    WIDE: /** @type {?} */ ('wide'),
    NARROW: /** @type {?} */ ('narrow'),
};
export { WeatherLayout };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5pbnRlcmZhY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi93ZWF0aGVyLmludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU07O3dCQUMyQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7cUJBQzdCLGdCQUFnQixDQUFDLE9BQU87K0JBQy9CLE9BQU87cUJBQ2pCLE9BQU87c0JBUVMsYUFBYSxDQUFDLE1BQU07O0NBQzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFHYSxNQUFNO2dDQUNGLFVBQVU7Ozs7OytCQUlYLFNBQVM7OEJBQ1YsUUFBUTtrQ0FDSixZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFnQmxCLE1BQU07OEJBQ0osUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBXZWF0aGVyU2V0dGluZ3Mge1xuICBsb2NhdGlvbjogV2VhdGhlclF1ZXJ5UGFyYW1zID0geyBjaXR5TmFtZTogJ1N6Y3plY2luJyB9O1xuICBzY2FsZTogVGVtcGVyYXR1cmVTY2FsZSA9IFRlbXBlcmF0dXJlU2NhbGUuQ0VMQ0lVUztcbiAgYmFja2dyb3VuZENvbG9yPyA9ICd3aGl0ZSc7XG4gIGNvbG9yPyA9ICdibGFjayc7XG4gIHdpZHRoPzogYW55O1xuICBoZWlnaHQ/OiBhbnk7XG4gIHNob3dXaW5kPzogYm9vbGVhbjtcbiAgc2hvd0RldGFpbHM/OiBib29sZWFuO1xuICBzaG93Rm9yZWNhc3Q/OiBib29sZWFuO1xuICBsYW5ndWFnZT86IHN0cmluZztcbiAgZm9yZWNhc3RNb2RlPzogRm9yZWNhc3RNb2RlO1xuICBsYXlvdXQ/OiBXZWF0aGVyTGF5b3V0ID0gV2VhdGhlckxheW91dC5OQVJST1c7XG59XG5cbmV4cG9ydCBlbnVtIEZvcmVjYXN0TW9kZSB7XG4gIEdSSUQgPSA8YW55PidHUklEJyxcbiAgREVUQUlMRUQgPSA8YW55PidERVRBSUxFRCdcbn1cblxuZXhwb3J0IGVudW0gVGVtcGVyYXR1cmVTY2FsZSB7XG4gIENFTENJVVMgPSA8YW55PidjZWxjaXVzJyxcbiAgS0VMVklOID0gPGFueT4na2VsdmluJyxcbiAgRkFIUkVOSEVJVCA9IDxhbnk+J2ZhaHJlbmhlaXQnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2VhdGhlclF1ZXJ5UGFyYW1zIHtcbiAgY2l0eUlkPzogbnVtYmVyO1xuICBjaXR5TmFtZT86IHN0cmluZztcbiAgbGF0TG5nPzoge1xuICAgIGxhdDogbnVtYmVyO1xuICAgIGxuZzogbnVtYmVyO1xuICB9O1xuICB6aXBDb2RlPzogc3RyaW5nO1xuICB1bml0cz86IFRlbXBlcmF0dXJlU2NhbGU7XG4gIGxhbmc/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFdlYXRoZXJMYXlvdXQge1xuICBXSURFID0gPGFueT4nd2lkZScsXG4gIE5BUlJPVyA9IDxhbnk+J25hcnJvdydcbn1cbiJdfQ==
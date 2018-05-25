import { Injectable, NgZone, Inject, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, Renderer2, EventEmitter, Output, NgModule } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { mergeMap, multicast, refCount, merge, map, filter } from 'rxjs/operators';
import { Headers, Http, RequestOptions, URLSearchParams, HttpModule } from '@angular/http';
import { __extends } from 'tslib';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PoolingService = /** @class */ (function () {
    function PoolingService(zone) {
        this.zone = zone;
    }
    // NOTE: Running the interval outside Angular ensures that e2e tests will not hang.
    /**
     * @template T
     * @param {?} operation
     * @param {?=} frequency
     * @return {?}
     */
    PoolingService.prototype.execute = /**
     * @template T
     * @param {?} operation
     * @param {?=} frequency
     * @return {?}
     */
    function (operation, frequency) {
        var _this = this;
        if (frequency === void 0) { frequency = 1000; }
        var /** @type {?} */ subject = new Subject();
        var /** @type {?} */ source = Observable.create(function (observer) {
            var /** @type {?} */ sub;
            _this.zone.runOutsideAngular(function () {
                var /** @type {?} */ zone = _this.zone;
                sub = interval(frequency)
                    .pipe(mergeMap(operation))
                    .subscribe({
                    next: /**
                     * @param {?} result
                     * @return {?}
                     */
                    function (result) {
                        zone.run(function () {
                            observer.next(result);
                        });
                    },
                    error: /**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) {
                        zone.run(function () {
                            observer.error(err);
                        });
                    }
                });
            });
            return function () {
                if (sub) {
                    sub.unsubscribe();
                }
            };
        });
        return source
            .pipe(multicast(subject), refCount(), merge(operation()));
    };
    PoolingService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PoolingService.ctorParameters = function () { return [
        { type: NgZone, },
    ]; };
    return PoolingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
var WeatherApiConfig = /** @class */ (function () {
    function WeatherApiConfig() {
        this.name = WeatherApiName.OPEN_WEATHER_MAP;
        this.key = 'provide secret key';
        this.baseUrl = 'http://api.openweathermap.org/data/2.5';
    }
    return WeatherApiConfig;
}());
/** @enum {string} */
var WeatherApiName = {
    OPEN_WEATHER_MAP: /** @type {?} */ ('Open Weather Map'),
};

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
/** @enum {string} */
var ForecastMode = {
    GRID: /** @type {?} */ ('GRID'),
    DETAILED: /** @type {?} */ ('DETAILED'),
};
/** @enum {string} */
var TemperatureScale = {
    CELCIUS: /** @type {?} */ ('celcius'),
    KELVIN: /** @type {?} */ ('kelvin'),
    FAHRENHEIT: /** @type {?} */ ('fahrenheit'),
};
/** @enum {string} */
var WeatherLayout = {
    WIDE: /** @type {?} */ ('wide'),
    NARROW: /** @type {?} */ ('narrow'),
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherContainer = /** @class */ (function () {
    function WeatherContainer(weatherApi, changeDetectorRef, renderer, element) {
        this.weatherApi = weatherApi;
        this.changeDetectorRef = changeDetectorRef;
        this.renderer = renderer;
        this.element = element;
        this.width = 'auto';
        this.height = 'auto';
        this.isWideLayout = false;
    }
    Object.defineProperty(WeatherContainer.prototype, "settings", {
        get: /**
         * @return {?}
         */
        function () {
            return this._settings;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._settings = value;
            this.background = this._settings.backgroundColor || 'white';
            this.color = this._settings.color || 'black';
            this.width = this._settings.width;
            this.height = this._settings.height;
            if (this.weatherApi.apiConfig.name && this.weatherApi.apiConfig.key) {
                this.getWeather();
            }
            if (this._settings.layout) {
                this.isWideLayout = this._settings.layout === WeatherLayout.WIDE;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WeatherContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscriptionCurrentWeather) {
            this.subscriptionCurrentWeather.unsubscribe();
        }
        if (this.subscriptionForecast) {
            this.subscriptionForecast.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    WeatherContainer.prototype.onMouseEnter = /**
     * @return {?}
     */
    function () {
        this.renderer.addClass(this.element.nativeElement, 'active');
        this.isMouseOn = true;
    };
    /**
     * @return {?}
     */
    WeatherContainer.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        this.renderer.removeClass(this.element.nativeElement, 'active');
        this.isMouseOn = false;
    };
    /**
     * @return {?}
     */
    WeatherContainer.prototype.getWeather = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.subscriptionCurrentWeather) {
            this.subscriptionCurrentWeather.unsubscribe();
        }
        if (this.subscriptionForecast) {
            this.subscriptionForecast.unsubscribe();
        }
        this.currentWeather$ = this.currentWeatherCall();
        this.forecast$ = this.forecastCall();
        this.subscriptionCurrentWeather = this.currentWeather$.subscribe(function (data) {
            _this.currentWeather = data;
            _this.changeDetectorRef.markForCheck();
        });
        this.subscriptionForecast = this.forecast$.subscribe(function (data) {
            _this.forecast = data;
            _this.changeDetectorRef.markForCheck();
        });
    };
    /**
     * @return {?}
     */
    WeatherContainer.prototype.currentWeatherCall = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ params = Object.assign({}, this.settings.location, { units: this.settings.scale }, { lang: this.settings.language });
        return this.weatherApi.currentWeather(params);
    };
    /**
     * @return {?}
     */
    WeatherContainer.prototype.forecastCall = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ params = Object.assign({}, this.settings.location, { units: this.settings.scale }, { lang: this.settings.language });
        return this.weatherApi.forecast(params);
    };
    WeatherContainer.decorators = [
        { type: Component, args: [{
                    selector: 'weather-widget',
                    changeDetection: ChangeDetectionStrategy.Default,
                    styles: [
                        "\n             :host {\n               display: flex;\n               position: relative;\n               padding: 1em;\n               box-sizing: border-box;\n             }\n             .info {\n               display: flex;\n               flex-direction: column;\n               align-items: center;\n               justify-content: center;\n               width: 100%;\n             }\n             .info.wide {\n               flex-direction: row;\n             }\n             .wide .current {\n               flex-grow: 0;\n             }\n             .wide .forecast {\n               flex-grow: 1;\n               overflow-y: auto;\n               height: 100%;\n             }\n             .current {\n               display: flex;\n               flex-direction: column;\n               align-items: center;\n               justify-content: center;\n               min-width: 140px;\n             }\n             .forecast {\n               min-width: 200px;\n               width: 100%;\n               overflow-y: auto;\n             }\n             .current, .forecast {\n               padding: 0.5em;\n             }\n             weather-actions {\n               display: block;\n               position: absolute;\n               top: 10px;\n               right: 10px;\n             }\n             weather-current-temperature.big {\n               font-size: 3em;\n             }\n             weather-icon.big {\n               font-size: 6em;\n               padding: 0.15em;\n             }\n             .empty {\n               flex-direction: row;\n             }\n             .empty i {\n               font-size: 3em;\n               margin-right: 0.3em;\n             }\n\n           "
                    ],
                    template: "\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css\">\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons-wind.min.css\">\n    <div *ngIf=\"currentWeather\" class=\"info\" [class.wide]=\"isWideLayout\">\n      <div class=\"current\">\n        <weather-icon\n          class=\"big\"\n          [iconImageUrl]=\"currentWeather?.iconUrl\"\n          [iconClass]=\"currentWeather?.iconClass\"></weather-icon>\n        <weather-current-description\n          [descripion]=\"currentWeather?.description\"></weather-current-description>\n        <weather-current-wind\n          *ngIf=\"settings.showWind\"\n          [scale]=\"settings.scale\"\n          [deg]=\"currentWeather?.wind.deg\"\n          [speed]=\"currentWeather?.wind.speed\"></weather-current-wind>\n        <weather-location [place]=\"currentWeather?.location\"></weather-location>\n        <weather-current-temperature\n          class=\"big\"\n          [temp]=\"currentWeather?.temp\"\n          [deg]=\"settings.scale\"></weather-current-temperature>\n        <weather-current-details\n          *ngIf=\"settings.showDetails\"\n          [maxTemp]=\"currentWeather?.maxTemp\"\n          [minTemp]=\"currentWeather?.minTemp\"\n          [pressure]=\"currentWeather?.pressure\"\n          [humidity]=\"currentWeather?.humidity\"></weather-current-details>\n      </div>\n      <div class=\"forecast\" *ngIf=\"settings.showForecast\">\n        <weather-forecast\n          [forecast]=\"forecast\"\n          [settings]=\"settings\"\n          [mode]=\"settings.forecastMode\"></weather-forecast>\n      </div>\n    </div>\n    <div *ngIf=\"!currentWeather\" class=\"info empty\">\n      <i class=\"wi wi-sunrise\"></i>\n      No weather data...\n    </div>\n    <weather-actions *ngIf=\"isMouseOn\" (update)=\"getWeather()\"></weather-actions>\n\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherContainer.ctorParameters = function () { return [
        { type: WeatherApiService, },
        { type: ChangeDetectorRef, },
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    WeatherContainer.propDecorators = {
        "background": [{ type: HostBinding, args: ['style.background',] },],
        "color": [{ type: HostBinding, args: ['style.color',] },],
        "width": [{ type: HostBinding, args: ['style.width',] },],
        "height": [{ type: HostBinding, args: ['style.height',] },],
        "forecast": [{ type: Input },],
        "currentWeather": [{ type: Input },],
        "settings": [{ type: Input },],
        "onMouseEnter": [{ type: HostListener, args: ['mouseenter',] },],
        "onMouseLeave": [{ type: HostListener, args: ['mouseleave',] },],
    };
    return WeatherContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherIconComponent = /** @class */ (function () {
    function WeatherIconComponent() {
    }
    WeatherIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-icon',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""],
                    template: "\n    <i *ngIf=\"iconClass\" [class]=\"iconClass\"></i>\n    <img *ngIf=\"iconImageUrl && !iconClass\" [src]=\"iconImageUrl\">\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherIconComponent.propDecorators = {
        "iconClass": [{ type: Input },],
        "iconImageUrl": [{ type: Input },],
        "title": [{ type: Input },],
    };
    return WeatherIconComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherCurrentDescriptionComponent = /** @class */ (function () {
    function WeatherCurrentDescriptionComponent() {
    }
    WeatherCurrentDescriptionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-current-description',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n           :host {\n             display: block;\n             text-align: center;\n           }\n           "
                    ],
                    template: "\n    {{ descripion | uppercase}}\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherCurrentDescriptionComponent.propDecorators = {
        "descripion": [{ type: Input },],
    };
    return WeatherCurrentDescriptionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherCurrentTempComponent = /** @class */ (function () {
    function WeatherCurrentTempComponent() {
        this._deg = TemperatureScale$1.CELCIUS;
    }
    Object.defineProperty(WeatherCurrentTempComponent.prototype, "deg", {
        get: /**
         * @return {?}
         */
        function () {
            return this._deg;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._deg = value;
            switch (value) {
                case TemperatureScale$1.CELCIUS:
                    this.unitSymbol = 'C';
                    break;
                case TemperatureScale$1.FAHRENHEIT:
                    this.unitSymbol = 'F';
                    break;
                case TemperatureScale$1.KELVIN:
                    this.unitSymbol = 'K';
                    break;
                default:
                    this.unitSymbol = 'C';
            }
        },
        enumerable: true,
        configurable: true
    });
    WeatherCurrentTempComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-current-temperature',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n  :host {\n    display: block;\n    line-height: 1.1em;\n  }\n    .deg {\n      letter-spacing: -0.13em;\n      position: relative;\n      left: -0.2em;\n    }\n  "
                    ],
                    template: "\n      {{ temp?.toFixed() }} <span *ngIf=\"temp\" class=\"deg\">&deg; {{ unitSymbol }}</span>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherCurrentTempComponent.propDecorators = {
        "temp": [{ type: Input },],
        "deg": [{ type: Input },],
    };
    return WeatherCurrentTempComponent;
}());
/** @enum {string} */
var TemperatureScale$1 = {
    CELCIUS: /** @type {?} */ ('celcius'),
    KELVIN: /** @type {?} */ ('kelvin'),
    FAHRENHEIT: /** @type {?} */ ('fahrenheit'),
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherActionsComponent = /** @class */ (function () {
    function WeatherActionsComponent() {
        this.update = new EventEmitter();
    }
    WeatherActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-actions',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n    button {\n      border: none;\n      background: transparent;\n      cursor: pointer;\n      font-size: 1.6em;\n      border-radius: 50%;\n      color: inherit;\n    }\n    button:hover {\n      background: rgba(0,0,0, 0.1);\n    }\n  "
                    ],
                    template: "\n    <button (click)=\"update.emit()\"><i class=\"wi wi-refresh\"></i></button>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherActionsComponent.propDecorators = {
        "update": [{ type: Output },],
    };
    return WeatherActionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherLocationComponent = /** @class */ (function () {
    function WeatherLocationComponent() {
    }
    WeatherLocationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-location',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n    :host {\n      margin-top: 1em;\n      font-size: 1em;\n    }\n  "
                    ],
                    template: "\n    {{ place }}\n\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherLocationComponent.propDecorators = {
        "place": [{ type: Input },],
    };
    return WeatherLocationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherCurrentWindComponent = /** @class */ (function () {
    function WeatherCurrentWindComponent() {
    }
    Object.defineProperty(WeatherCurrentWindComponent.prototype, "scale", {
        get: /**
         * @return {?}
         */
        function () {
            return this._scale;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._scale = value;
            this.unit = this.mapScaleToText(this._scale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WeatherCurrentWindComponent.prototype, "deg", {
        get: /**
         * @return {?}
         */
        function () {
            return this._deg;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._deg = value;
            this.windIcon = "wi wi-wind from-" + this._deg + "-deg";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} scale
     * @return {?}
     */
    WeatherCurrentWindComponent.prototype.mapScaleToText = /**
     * @param {?} scale
     * @return {?}
     */
    function (scale) {
        switch (scale) {
            case TemperatureScale$1.CELCIUS:
            case TemperatureScale$1.KELVIN:
                return 'm/s';
            case TemperatureScale$1.FAHRENHEIT:
                return 'mil/h';
            default:
                return '';
        }
    };
    WeatherCurrentWindComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-current-wind',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n    :host {\n      display: flex;\n      justify-content: space-around;\n      align-items: center;\n      font-size: 0.8em;\n      min-height: 1.3em;\n    }\n    i {\n      margin-left: 0.3em;\n      font-size: 1.6em;\n    }\n  "
                    ],
                    template: "\n    <span>Wind {{ speed }} {{ unit }}</span>\n   <i [class]=\"windIcon\"></i>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherCurrentWindComponent.propDecorators = {
        "scale": [{ type: Input },],
        "deg": [{ type: Input },],
        "speed": [{ type: Input },],
    };
    return WeatherCurrentWindComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ iconCodes = {
    '200': {
        label: 'thunderstorm with light rain',
        icon: 'storm-showers'
    },
    '201': {
        label: 'thunderstorm with rain',
        icon: 'storm-showers'
    },
    '202': {
        label: 'thunderstorm with heavy rain',
        icon: 'storm-showers'
    },
    '210': {
        label: 'light thunderstorm',
        icon: 'storm-showers'
    },
    '211': {
        label: 'thunderstorm',
        icon: 'thunderstorm'
    },
    '212': {
        label: 'heavy thunderstorm',
        icon: 'thunderstorm'
    },
    '221': {
        label: 'ragged thunderstorm',
        icon: 'thunderstorm'
    },
    '230': {
        label: 'thunderstorm with light drizzle',
        icon: 'storm-showers'
    },
    '231': {
        label: 'thunderstorm with drizzle',
        icon: 'storm-showers'
    },
    '232': {
        label: 'thunderstorm with heavy drizzle',
        icon: 'storm-showers'
    },
    '300': {
        label: 'light intensity drizzle',
        icon: 'sprinkle'
    },
    '301': {
        label: 'drizzle',
        icon: 'sprinkle'
    },
    '302': {
        label: 'heavy intensity drizzle',
        icon: 'sprinkle'
    },
    '310': {
        label: 'light intensity drizzle rain',
        icon: 'sprinkle'
    },
    '311': {
        label: 'drizzle rain',
        icon: 'sprinkle'
    },
    '312': {
        label: 'heavy intensity drizzle rain',
        icon: 'sprinkle'
    },
    '313': {
        label: 'shower rain and drizzle',
        icon: 'sprinkle'
    },
    '314': {
        label: 'heavy shower rain and drizzle',
        icon: 'sprinkle'
    },
    '321': {
        label: 'shower drizzle',
        icon: 'sprinkle'
    },
    '500': {
        label: 'light rain',
        icon: 'rain'
    },
    '501': {
        label: 'moderate rain',
        icon: 'rain'
    },
    '502': {
        label: 'heavy intensity rain',
        icon: 'rain'
    },
    '503': {
        label: 'very heavy rain',
        icon: 'rain'
    },
    '504': {
        label: 'extreme rain',
        icon: 'rain'
    },
    '511': {
        label: 'freezing rain',
        icon: 'rain-mix'
    },
    '520': {
        label: 'light intensity shower rain',
        icon: 'showers'
    },
    '521': {
        label: 'shower rain',
        icon: 'showers'
    },
    '522': {
        label: 'heavy intensity shower rain',
        icon: 'showers'
    },
    '531': {
        label: 'ragged shower rain',
        icon: 'showers'
    },
    '600': {
        label: 'light snow',
        icon: 'snow'
    },
    '601': {
        label: 'snow',
        icon: 'snow'
    },
    '602': {
        label: 'heavy snow',
        icon: 'snow'
    },
    '611': {
        label: 'sleet',
        icon: 'sleet'
    },
    '612': {
        label: 'shower sleet',
        icon: 'sleet'
    },
    '615': {
        label: 'light rain and snow',
        icon: 'rain-mix'
    },
    '616': {
        label: 'rain and snow',
        icon: 'rain-mix'
    },
    '620': {
        label: 'light shower snow',
        icon: 'rain-mix'
    },
    '621': {
        label: 'shower snow',
        icon: 'rain-mix'
    },
    '622': {
        label: 'heavy shower snow',
        icon: 'rain-mix'
    },
    '701': {
        label: 'mist',
        icon: 'sprinkle'
    },
    '711': {
        label: 'smoke',
        icon: 'smoke'
    },
    '721': {
        label: 'haze',
        icon: 'day-haze'
    },
    '731': {
        label: 'sand, dust whirls',
        icon: 'cloudy-gusts'
    },
    '741': {
        label: 'fog',
        icon: 'fog'
    },
    '751': {
        label: 'sand',
        icon: 'cloudy-gusts'
    },
    '761': {
        label: 'dust',
        icon: 'dust'
    },
    '762': {
        label: 'volcanic ash',
        icon: 'smog'
    },
    '771': {
        label: 'squalls',
        icon: 'day-windy'
    },
    '781': {
        label: 'tornado',
        icon: 'tornado'
    },
    '800': {
        label: 'clear sky',
        icon: 'sunny'
    },
    '801': {
        label: 'few clouds',
        icon: 'cloudy'
    },
    '802': {
        label: 'scattered clouds',
        icon: 'cloudy'
    },
    '803': {
        label: 'broken clouds',
        icon: 'cloudy'
    },
    '804': {
        label: 'overcast clouds',
        icon: 'cloudy'
    },
    '900': {
        label: 'tornado',
        icon: 'tornado'
    },
    '901': {
        label: 'tropical storm',
        icon: 'hurricane'
    },
    '902': {
        label: 'hurricane',
        icon: 'hurricane'
    },
    '903': {
        label: 'cold',
        icon: 'snowflake-cold'
    },
    '904': {
        label: 'hot',
        icon: 'hot'
    },
    '905': {
        label: 'windy',
        icon: 'windy'
    },
    '906': {
        label: 'hail',
        icon: 'hail'
    },
    '951': {
        label: 'calm',
        icon: 'sunny'
    },
    '952': {
        label: 'light breeze',
        icon: 'cloudy-gusts'
    },
    '953': {
        label: 'gentle breeze',
        icon: 'cloudy-gusts'
    },
    '954': {
        label: 'moderate breeze',
        icon: 'cloudy-gusts'
    },
    '955': {
        label: 'fresh breeze',
        icon: 'cloudy-gusts'
    },
    '956': {
        label: 'strong breeze',
        icon: 'cloudy-gusts'
    },
    '957': {
        label: 'high wind, near gale',
        icon: 'cloudy-gusts'
    },
    '958': {
        label: 'gale',
        icon: 'cloudy-gusts'
    },
    '959': {
        label: 'severe gale',
        icon: 'cloudy-gusts'
    },
    '960': {
        label: 'storm',
        icon: 'thunderstorm'
    },
    '961': {
        label: 'violent storm',
        icon: 'thunderstorm'
    },
    '962': {
        label: 'hurricane',
        icon: 'cloudy-gusts'
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var OpenWeatherMapApiService = /** @class */ (function (_super) {
    __extends(OpenWeatherMapApiService, _super);
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
            case TemperatureScale$1.CELCIUS:
                return 'metric';
            case TemperatureScale$1.FAHRENHEIT:
                return 'imperial';
            case TemperatureScale$1.KELVIN:
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherCurrentDetailsComponent = /** @class */ (function () {
    function WeatherCurrentDetailsComponent() {
    }
    WeatherCurrentDetailsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-current-details',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n    :host {\n      font-size: 0.8em;\n      text-align: center;\n      margin-top: 1em;\n    }\n    .row {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: center;\n      align-items: center;\n    }\n    .row span {\n      margin: 0 0.3em;\n    }\n    .wi {\n      margin-right: 0.3em;\n    }\n  "
                    ],
                    template: "\n    <div class=\"row\">\n      <i class=\"wi wi-thermometer\"></i>\n      <span>\n          <span>Min: {{minTemp}}&deg;</span>\n          <span>Max: {{maxTemp}}&deg;</span>\n      </span>\n\n    </div>\n    <div class=\"row\">\n      <span><i class=\"wi wi-barometer\"></i>Pressure: {{pressure}}</span>\n      <span><i class=\"wi wi-humidity\"></i>Humidity: {{humidity}}%</span>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherCurrentDetailsComponent.propDecorators = {
        "maxTemp": [{ type: Input },],
        "minTemp": [{ type: Input },],
        "pressure": [{ type: Input },],
        "humidity": [{ type: Input },],
    };
    return WeatherCurrentDetailsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherForecastComponent = /** @class */ (function () {
    function WeatherForecastComponent() {
        this.isGridForecast = true;
    }
    Object.defineProperty(WeatherForecastComponent.prototype, "mode", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WeatherForecastComponent.prototype, "forecast", {
        get: /**
         * @return {?}
         */
        function () {
            return this._forecast;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._forecast = value;
        },
        enumerable: true,
        configurable: true
    });
    WeatherForecastComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-forecast',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n             :host {\n               margin-top: 1em;\n               display: block;\n               width: 100%;\n               box-sizing: border-box;\n             }\n           "
                    ],
                    template: "\n    <weather-forecast-simple-grid\n      *ngIf=\"isGridForecast\"\n      [forecast]=\"forecast\"></weather-forecast-simple-grid>\n    <weather-forecast-detailed\n      *ngIf=\"!isGridForecast\"\n      [settings]=\"settings\"\n      [forecast]=\"forecast\"></weather-forecast-detailed>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherForecastComponent.propDecorators = {
        "mode": [{ type: Input },],
        "settings": [{ type: Input },],
        "forecast": [{ type: Input },],
    };
    return WeatherForecastComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherHelpersService = /** @class */ (function () {
    function WeatherHelpersService() {
    }
    /**
     * @param {?} list
     * @return {?}
     */
    WeatherHelpersService.prototype.groupForecastsByDay = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        var /** @type {?} */ map$$1 = {};
        var /** @type {?} */ result = [];
        list.forEach(function (el) {
            var /** @type {?} */ day = el.data.getUTCDate();
            if (!map$$1[day]) {
                map$$1[day] = [el];
            }
            else {
                map$$1[day].push(el);
            }
        });
        result = Object.keys(map$$1).map(function (key) { return map$$1[key]; });
        return result;
    };
    // Fixme: This function generates wrong icon for average day weather.
    // Weather icon is taken from first day measurement
    /**
     * @param {?} list
     * @return {?}
     */
    WeatherHelpersService.prototype.reduceToAveragePerDay = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        return list.reduce(function (prev, curr) {
            if (curr && !curr.data) {
                prev.push(curr);
                return prev;
            }
            var /** @type {?} */ lastElement = function () {
                return prev[prev.length - 1];
            };
            var /** @type {?} */ prevDay = lastElement()
                ? prev[prev.length - 1].data.getDay()
                : null;
            var /** @type {?} */ currDay = curr.data.getDay();
            if (currDay === prevDay) {
                var /** @type {?} */ result = lastElement();
                result.temp = (result.temp + curr.temp) / 2;
                if (result.wind && curr.wind) {
                    result.wind = {
                        speed: (result.wind.speed + curr.wind.speed) / 2,
                        deg: (result.wind.deg + curr.wind.deg) / 2
                    };
                }
                if (result.humidity && curr.humidity) {
                    result.humidity = (result.humidity + curr.humidity) / 2;
                }
                if (result.pressure && curr.pressure) {
                    result.pressure = (result.pressure + curr.pressure) / 2;
                }
                prev[prev.length - 1] = result;
                return prev;
            }
            else {
                prev.push(curr);
                return prev;
            }
        }, []);
    };
    /**
     * @param {?} forecast
     * @param {?=} borderColor
     * @return {?}
     */
    WeatherHelpersService.prototype.mapForecastToCharts = /**
     * @param {?} forecast
     * @param {?=} borderColor
     * @return {?}
     */
    function (forecast, borderColor) {
        if (borderColor === void 0) { borderColor = '#aaa'; }
        return forecast.reduce(function (prev, curr) {
            if (prev.labels) {
                prev.labels.push(curr.data.toISOString());
            }
            if (prev.datasets && prev.datasets[0] && prev.datasets[0].data) {
                var /** @type {?} */ data = /** @type {?} */ (prev.datasets[0].data);
                data.push(curr.temp);
            }
            return prev;
        }, /** @type {?} */ ({
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: ['rgba(0, 0, 0, 0.1)'],
                    borderColor: [borderColor],
                    borderWidth: 1
                }
            ]
        }));
    };
    /**
     * @param {?} hex
     * @param {?} opacity
     * @return {?}
     */
    WeatherHelpersService.prototype.hexToRgbA = /**
     * @param {?} hex
     * @param {?} opacity
     * @return {?}
     */
    function (hex, opacity) {
        var /** @type {?} */ c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + "," + opacity + ")";
        }
    };
    WeatherHelpersService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WeatherHelpersService.ctorParameters = function () { return []; };
    return WeatherHelpersService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherForecastSimpleGridComponent = /** @class */ (function () {
    function WeatherForecastSimpleGridComponent(weatherHelpers) {
        this.weatherHelpers = weatherHelpers;
    }
    Object.defineProperty(WeatherForecastSimpleGridComponent.prototype, "forecast", {
        get: /**
         * @return {?}
         */
        function () {
            return this._forecast;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._forecast = value;
            this.forecastPerDay = this.weatherHelpers.reduceToAveragePerDay(this._forecast);
        },
        enumerable: true,
        configurable: true
    });
    WeatherForecastSimpleGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-forecast-simple-grid',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n           :host {\n             display: flex;\n             width: 100%;\n             justify-content: space-between;\n           }\n           weather-forecast-grid-day {\n             margin: 0 0.4em;\n           }\n           "
                    ],
                    template: "\n    <ng-container *ngFor=\"let forecast of forecastPerDay\">\n      <weather-forecast-grid-day [forecast]=\"forecast\"></weather-forecast-grid-day>\n    </ng-container>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherForecastSimpleGridComponent.ctorParameters = function () { return [
        { type: WeatherHelpersService, },
    ]; };
    WeatherForecastSimpleGridComponent.propDecorators = {
        "forecast": [{ type: Input },],
    };
    return WeatherForecastSimpleGridComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherForecastGridDayComponent = /** @class */ (function () {
    function WeatherForecastGridDayComponent() {
    }
    WeatherForecastGridDayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-forecast-grid-day',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n   :host {\n     display: flex;\n     flex-direction: column;\n     justify-content: center;\n     align-items: center;\n     font-size: 1.2em;\n   }\n   weather-icon {\n     font-size: 1.4em;\n   }\n   .day {\n     font-size: 0.8em\n   }\n "
                    ],
                    template: "\n      <weather-icon [iconClass]=\"forecast?.iconClass\"></weather-icon>\n      <weather-current-temperature [temp]=\"forecast?.temp\"></weather-current-temperature>\n      <div class=\"day\">{{forecast?.data | date:'EEE' }}</div>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherForecastGridDayComponent.propDecorators = {
        "forecast": [{ type: Input },],
    };
    return WeatherForecastGridDayComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherForecastDetailedComponent = /** @class */ (function () {
    function WeatherForecastDetailedComponent(weatherHelpers) {
        this.weatherHelpers = weatherHelpers;
        this.forecastPerDay = [];
    }
    Object.defineProperty(WeatherForecastDetailedComponent.prototype, "forecast", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._forecast = value;
            this.forecastPerDay = this.weatherHelpers.groupForecastsByDay(value);
        },
        enumerable: true,
        configurable: true
    });
    WeatherForecastDetailedComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-forecast-detailed',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""],
                    template: "\n    <ng-container *ngFor=\"let forecast of forecastPerDay\">\n      <weather-forecast-detail-day\n        [settings]=\"settings\"\n        [forecast]=\"forecast\"></weather-forecast-detail-day>\n    </ng-container>\n\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherForecastDetailedComponent.ctorParameters = function () { return [
        { type: WeatherHelpersService, },
    ]; };
    WeatherForecastDetailedComponent.propDecorators = {
        "forecast": [{ type: Input },],
        "settings": [{ type: Input },],
    };
    return WeatherForecastDetailedComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherForecastDetailDayComponent = /** @class */ (function () {
    function WeatherForecastDetailDayComponent(weatherHelpers) {
        this.weatherHelpers = weatherHelpers;
    }
    Object.defineProperty(WeatherForecastDetailDayComponent.prototype, "forecast", {
        get: /**
         * @return {?}
         */
        function () {
            return this._forecast;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._forecast = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} change
     * @return {?}
     */
    WeatherForecastDetailDayComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (this.settings && change['forecast']) {
            this.updateChartOptions();
            this.chartData = this.weatherHelpers.mapForecastToCharts(this._forecast, this.settings.color);
        }
    };
    /**
     * @return {?}
     */
    WeatherForecastDetailDayComponent.prototype.updateChartOptions = /**
     * @return {?}
     */
    function () {
        this.chartOptions = {
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        time: {
                            unit: 'hour',
                            isoWeekday: true,
                            displayFormats: {
                                hour: 'hA'
                            },
                            tooltipFormat: 'LLL'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: true,
                            fontColor: this.settings && this.settings.color
                                ? this.weatherHelpers.hexToRgbA(this.settings.color, '0.8')
                                : 'white',
                            fontSize: 9,
                            maxTicksLimit: 3
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            fontColor: this.settings && this.settings.color
                                ? this.weatherHelpers.hexToRgbA(this.settings.color, '0.8')
                                : 'white',
                            fontSize: 9,
                            autoSkip: true,
                            labelOffset: 0,
                            mirror: false,
                            maxTicksLimit: 3,
                            callback: function (value, index, values) {
                                return value;
                            }
                        }
                    }
                ]
            },
            maintainAspectRatio: false,
            legend: {
                display: false,
                position: 'bottom'
            },
            title: {
                display: false
            }
        };
    };
    WeatherForecastDetailDayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-forecast-detail-day',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n             :host {\n               display: flex;\n               align-items: center;\n               padding: 0.1em 0;\n               font-size: 1em;\n               box-sizing: border-box;\n               justify-content: flex-start;\n               width: 100%;\n\n             }\n             :host > * {\n               padding: 0 0.4em;\n             }\n             .left {\n               flex-grow: 0;\n             }\n             weather-chart {\n               height: 80px;\n               width: 80%;\n               flex: 1 1;\n             }\n\n             weather-icon {\n               margin-top: 0.3em;\n               font-size: 1.4em;\n               display: block;\n             }\n           "
                    ],
                    template: "\n    <div class=\"left\">\n      {{forecast[0]?.data | date:'EEE' }}\n      <weather-icon [iconClass]=\"forecast[0]?.iconClass\"></weather-icon>\n    </div>\n    <weather-chart\n      [type]=\"'line'\"\n      [data]=\"chartData\"\n      [options]=\"chartOptions\"\n    ></weather-chart>\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherForecastDetailDayComponent.ctorParameters = function () { return [
        { type: WeatherHelpersService, },
    ]; };
    WeatherForecastDetailDayComponent.propDecorators = {
        "settings": [{ type: Input },],
        "forecast": [{ type: Input },],
    };
    return WeatherForecastDetailDayComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ChartComponent = /** @class */ (function () {
    function ChartComponent(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ChartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options.scales = {
            yAxes: [
                {
                    ticks: {
                        // Remove excess decimal places
                        callback: function (value, index, values) {
                            return Number(value.toFixed(0));
                        }
                    }
                }
            ]
        };
        this.chart = new Chart(this.elementRef.nativeElement.querySelector('canvas'), {
            type: this.type,
            data: this.data,
            options: this.options
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ChartComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (this.chart && changes['data']) {
            var /** @type {?} */ currentValue_1 = changes['data'].currentValue;
            ['datasets', 'labels', 'xLabels', 'yLabels'].forEach(function (property) {
                _this.chart.data[property] = currentValue_1[property];
            });
            this.chart.update();
        }
    };
    ChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-chart',
                    template: '<canvas></canvas>',
                    styles: [':host { display: block; }']
                },] },
    ];
    /** @nocollapse */
    ChartComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ChartComponent.propDecorators = {
        "type": [{ type: Input },],
        "data": [{ type: Input },],
        "options": [{ type: Input },],
    };
    return ChartComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WeatherForecastChartWideComponent = /** @class */ (function () {
    function WeatherForecastChartWideComponent(helpers) {
        this.helpers = helpers;
    }
    WeatherForecastChartWideComponent.decorators = [
        { type: Component, args: [{
                    selector: 'weather-forecast-chart-wide',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n           "
                    ],
                    template: "\n    <div>\n\n    </div>\n\n  "
                },] },
    ];
    /** @nocollapse */
    WeatherForecastChartWideComponent.ctorParameters = function () { return [
        { type: WeatherHelpersService, },
    ]; };
    WeatherForecastChartWideComponent.propDecorators = {
        "forecast": [{ type: Input },],
    };
    return WeatherForecastChartWideComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ OPEN_WEATHER_MAP_RESPONSE_MOCK = {
    coord: { lon: 14.62, lat: 53.43 },
    weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }
    ],
    base: 'stations',
    main: {
        temp: 285.15,
        pressure: 1021,
        humidity: 93,
        temp_min: 285.15,
        temp_max: 285.15
    },
    visibility: 10000,
    wind: { speed: 0.5, deg: 90 },
    clouds: { all: 75 },
    dt: 1500350400,
    sys: {
        type: 1,
        id: 5369,
        message: 0.0023,
        country: 'PL',
        sunrise: 1500346578,
        sunset: 1500405503
    },
    id: 7530840,
    name: 'Szczecin',
    cod: 200
};
//noinspection TsLint
var /** @type {?} */ OPEN_WEATHER_MAP_FORECAST = {
    cod: '200',
    message: 0.0077,
    cnt: 36,
    list: [
        {
            dt: 1500465600,
            main: {
                temp: 18.74,
                temp_min: 17.23,
                temp_max: 18.74,
                pressure: 962.13,
                sea_level: 1027.82,
                grnd_level: 962.13,
                humidity: 85,
                temp_kf: 1.51
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.88, deg: 85.0006 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-19 12:00:00'
        },
        {
            dt: 1500476400,
            main: {
                temp: 21.97,
                temp_min: 20.85,
                temp_max: 21.97,
                pressure: 963.3,
                sea_level: 1029.04,
                grnd_level: 963.3,
                humidity: 69,
                temp_kf: 1.13
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.16, deg: 98.5003 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-19 15:00:00'
        },
        {
            dt: 1500487200,
            main: {
                temp: 27.49,
                temp_min: 26.73,
                temp_max: 27.49,
                pressure: 963.7,
                sea_level: 1029.11,
                grnd_level: 963.7,
                humidity: 57,
                temp_kf: 0.75
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.22, deg: 189.001 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-19 18:00:00'
        },
        {
            dt: 1500498000,
            main: {
                temp: 29.69,
                temp_min: 29.32,
                temp_max: 29.69,
                pressure: 963.14,
                sea_level: 1028.12,
                grnd_level: 963.14,
                humidity: 50,
                temp_kf: 0.38
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.26, deg: 204.001 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-19 21:00:00'
        },
        {
            dt: 1500508800,
            main: {
                temp: 29.16,
                temp_min: 29.16,
                temp_max: 29.16,
                pressure: 961.5,
                sea_level: 1026.45,
                grnd_level: 961.5,
                humidity: 45,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.3, deg: 213.503 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-20 00:00:00'
        },
        {
            dt: 1500519600,
            main: {
                temp: 25.02,
                temp_min: 25.02,
                temp_max: 25.02,
                pressure: 961.7,
                sea_level: 1026.75,
                grnd_level: 961.7,
                humidity: 51,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.17, deg: 207.5 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-20 03:00:00'
        },
        {
            dt: 1500530400,
            main: {
                temp: 20.08,
                temp_min: 20.08,
                temp_max: 20.08,
                pressure: 962.59,
                sea_level: 1028.08,
                grnd_level: 962.59,
                humidity: 69,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.86, deg: 186.001 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-20 06:00:00'
        },
        {
            dt: 1500541200,
            main: {
                temp: 17.8,
                temp_min: 17.8,
                temp_max: 17.8,
                pressure: 962.15,
                sea_level: 1027.76,
                grnd_level: 962.15,
                humidity: 79,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.91, deg: 62.5009 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-20 09:00:00'
        },
        {
            dt: 1500552000,
            main: {
                temp: 16.61,
                temp_min: 16.61,
                temp_max: 16.61,
                pressure: 961.9,
                sea_level: 1027.61,
                grnd_level: 961.9,
                humidity: 83,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.86, deg: 70.5005 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-20 12:00:00'
        },
        {
            dt: 1500562800,
            main: {
                temp: 21.11,
                temp_min: 21.11,
                temp_max: 21.11,
                pressure: 962.59,
                sea_level: 1028.28,
                grnd_level: 962.59,
                humidity: 65,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.21, deg: 67.5016 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-20 15:00:00'
        },
        {
            dt: 1500573600,
            main: {
                temp: 27.31,
                temp_min: 27.31,
                temp_max: 27.31,
                pressure: 962.84,
                sea_level: 1028.05,
                grnd_level: 962.84,
                humidity: 53,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.26, deg: 196.502 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-20 18:00:00'
        },
        {
            dt: 1500584400,
            main: {
                temp: 29.52,
                temp_min: 29.52,
                temp_max: 29.52,
                pressure: 961.98,
                sea_level: 1026.92,
                grnd_level: 961.98,
                humidity: 46,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.21, deg: 196 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-20 21:00:00'
        },
        {
            dt: 1500595200,
            main: {
                temp: 29.36,
                temp_min: 29.36,
                temp_max: 29.36,
                pressure: 960.33,
                sea_level: 1025.13,
                grnd_level: 960.33,
                humidity: 40,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.23, deg: 209.502 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-21 00:00:00'
        },
        {
            dt: 1500606000,
            main: {
                temp: 24.96,
                temp_min: 24.96,
                temp_max: 24.96,
                pressure: 960.13,
                sea_level: 1025.13,
                grnd_level: 960.13,
                humidity: 45,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.96, deg: 206.007 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-21 03:00:00'
        },
        {
            dt: 1500616800,
            main: {
                temp: 18.99,
                temp_min: 18.99,
                temp_max: 18.99,
                pressure: 960.72,
                sea_level: 1026.15,
                grnd_level: 960.72,
                humidity: 72,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.71, deg: 313.501 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-21 06:00:00'
        },
        {
            dt: 1500627600,
            main: {
                temp: 16.77,
                temp_min: 16.77,
                temp_max: 16.77,
                pressure: 960.12,
                sea_level: 1025.65,
                grnd_level: 960.12,
                humidity: 78,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.72, deg: 47.003 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-21 09:00:00'
        },
        {
            dt: 1500638400,
            main: {
                temp: 15.55,
                temp_min: 15.55,
                temp_max: 15.55,
                pressure: 959.57,
                sea_level: 1025.09,
                grnd_level: 959.57,
                humidity: 78,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.72, deg: 48.0005 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-21 12:00:00'
        },
        {
            dt: 1500649200,
            main: {
                temp: 21.36,
                temp_min: 21.36,
                temp_max: 21.36,
                pressure: 960.35,
                sea_level: 1025.78,
                grnd_level: 960.35,
                humidity: 59,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.92, deg: 77.0024 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-21 15:00:00'
        },
        {
            dt: 1500660000,
            main: {
                temp: 28.25,
                temp_min: 28.25,
                temp_max: 28.25,
                pressure: 960.87,
                sea_level: 1025.84,
                grnd_level: 960.87,
                humidity: 45,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.26, deg: 205.002 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-21 18:00:00'
        },
        {
            dt: 1500670800,
            main: {
                temp: 31,
                temp_min: 31,
                temp_max: 31,
                pressure: 960.27,
                sea_level: 1024.9,
                grnd_level: 960.27,
                humidity: 39,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.31, deg: 215.502 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-21 21:00:00'
        },
        {
            dt: 1500681600,
            main: {
                temp: 30.82,
                temp_min: 30.82,
                temp_max: 30.82,
                pressure: 958.79,
                sea_level: 1023.28,
                grnd_level: 958.79,
                humidity: 38,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.31, deg: 222.002 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-22 00:00:00'
        },
        {
            dt: 1500692400,
            main: {
                temp: 26.31,
                temp_min: 26.31,
                temp_max: 26.31,
                pressure: 958.46,
                sea_level: 1023.22,
                grnd_level: 958.46,
                humidity: 44,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.11, deg: 213.5 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-22 03:00:00'
        },
        {
            dt: 1500703200,
            main: {
                temp: 20.62,
                temp_min: 20.62,
                temp_max: 20.62,
                pressure: 959.26,
                sea_level: 1024.33,
                grnd_level: 959.26,
                humidity: 62,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.71, deg: 158.503 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-22 06:00:00'
        },
        {
            dt: 1500714000,
            main: {
                temp: 18.73,
                temp_min: 18.73,
                temp_max: 18.73,
                pressure: 958.21,
                sea_level: 1023.48,
                grnd_level: 958.21,
                humidity: 70,
                temp_kf: 0
            },
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03n'
                }
            ],
            clouds: { all: 36 },
            wind: { speed: 0.91, deg: 76.0024 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-22 09:00:00'
        },
        {
            dt: 1500724800,
            main: {
                temp: 17.54,
                temp_min: 17.54,
                temp_max: 17.54,
                pressure: 957.63,
                sea_level: 1023.04,
                grnd_level: 957.63,
                humidity: 74,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.77, deg: 60.5006 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-22 12:00:00'
        },
        {
            dt: 1500735600,
            main: {
                temp: 22.07,
                temp_min: 22.07,
                temp_max: 22.07,
                pressure: 958.72,
                sea_level: 1023.95,
                grnd_level: 958.72,
                humidity: 57,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.21, deg: 113.001 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-22 15:00:00'
        },
        {
            dt: 1500746400,
            main: {
                temp: 27.94,
                temp_min: 27.94,
                temp_max: 27.94,
                pressure: 959.16,
                sea_level: 1024.03,
                grnd_level: 959.16,
                humidity: 49,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.21, deg: 199.508 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-22 18:00:00'
        },
        {
            dt: 1500757200,
            main: {
                temp: 30.91,
                temp_min: 30.91,
                temp_max: 30.91,
                pressure: 958.53,
                sea_level: 1023.05,
                grnd_level: 958.53,
                humidity: 43,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '02d' }
            ],
            clouds: { all: 8 },
            wind: { speed: 1.26, deg: 216.008 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-22 21:00:00'
        },
        {
            dt: 1500768000,
            main: {
                temp: 30.89,
                temp_min: 30.89,
                temp_max: 30.89,
                pressure: 957.26,
                sea_level: 1021.73,
                grnd_level: 957.26,
                humidity: 41,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.36, deg: 224.501 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-23 00:00:00'
        },
        {
            dt: 1500778800,
            main: {
                temp: 26.43,
                temp_min: 26.43,
                temp_max: 26.43,
                pressure: 957.08,
                sea_level: 1021.93,
                grnd_level: 957.08,
                humidity: 47,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.16, deg: 212.005 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-23 03:00:00'
        },
        {
            dt: 1500789600,
            main: {
                temp: 21.28,
                temp_min: 21.28,
                temp_max: 21.28,
                pressure: 958.35,
                sea_level: 1023.51,
                grnd_level: 958.35,
                humidity: 62,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.92, deg: 199.002 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-23 06:00:00'
        },
        {
            dt: 1500800400,
            main: {
                temp: 18.88,
                temp_min: 18.88,
                temp_max: 18.88,
                pressure: 957.79,
                sea_level: 1023.1,
                grnd_level: 957.79,
                humidity: 72,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.76, deg: 51.5034 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-23 09:00:00'
        },
        {
            dt: 1500811200,
            main: {
                temp: 17.61,
                temp_min: 17.61,
                temp_max: 17.61,
                pressure: 957.16,
                sea_level: 1022.57,
                grnd_level: 957.16,
                humidity: 77,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
            ],
            clouds: { all: 0 },
            wind: { speed: 0.72, deg: 73.5004 },
            sys: { pod: 'n' },
            dt_txt: '2017-07-23 12:00:00'
        },
        {
            dt: 1500822000,
            main: {
                temp: 21.5,
                temp_min: 21.5,
                temp_max: 21.5,
                pressure: 958.04,
                sea_level: 1023.4,
                grnd_level: 958.04,
                humidity: 62,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.16, deg: 91.5 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-23 15:00:00'
        },
        {
            dt: 1500832800,
            main: {
                temp: 27.96,
                temp_min: 27.96,
                temp_max: 27.96,
                pressure: 958.3,
                sea_level: 1023.22,
                grnd_level: 958.3,
                humidity: 51,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.22, deg: 206.005 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-23 18:00:00'
        },
        {
            dt: 1500843600,
            main: {
                temp: 30.68,
                temp_min: 30.68,
                temp_max: 30.68,
                pressure: 957.83,
                sea_level: 1022.41,
                grnd_level: 957.83,
                humidity: 46,
                temp_kf: 0
            },
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
            ],
            clouds: { all: 0 },
            wind: { speed: 1.2, deg: 215.004 },
            sys: { pod: 'd' },
            dt_txt: '2017-07-23 21:00:00'
        }
    ],
    city: {
        id: 5368361,
        name: 'Los Angeles',
        coord: { lat: 34.0522, lon: -118.2437 },
        country: 'US'
    }
};
var /** @type {?} */ CURRENT_WATHER_MOCK = {
    temp: 16,
    pressure: 1012,
    humidity: 93,
    minTemp: 16,
    maxTemp: 16,
    sunrise: 1500779092,
    sunset: 1500837045,
    location: 'Szczecin',
    iconUrl: 'http://openweathermap.org/img/w/01n.png',
    description: 'clear sky',
    iconClass: 'wi wi-day-sunny',
    wind: { deg: 240, speed: 2.1 }
};
var /** @type {?} */ FORECAST_MOCK = [
    {
        temp: 12.15,
        pressure: 1023.27,
        humidity: 98,
        minTemp: 12.15,
        maxTemp: 12.84,
        location: 'Szczecin',
        iconClass: 'wi wi-day-sunny',
        description: 'clear sky',
        data: new Date('2017-07-24T00:00:00.000Z'),
        wind: {
            deg: 230,
            speed: 1.31
        }
    },
    {
        temp: 12.12,
        pressure: 1022.4,
        humidity: 95,
        minTemp: 12.12,
        maxTemp: 12.57,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'scattered clouds',
        data: new Date('2017-07-24T03:00:00.000Z'),
        wind: {
            deg: 214.003,
            speed: 1.22
        }
    },
    {
        temp: 16.33,
        pressure: 1021.75,
        humidity: 100,
        minTemp: 16.33,
        maxTemp: 16.56,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-24T06:00:00.000Z'),
        wind: {
            deg: 208.502,
            speed: 1.88
        }
    },
    {
        temp: 17.83,
        pressure: 1021.07,
        humidity: 100,
        minTemp: 17.83,
        maxTemp: 17.83,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-24T09:00:00.000Z'),
        wind: {
            deg: 160.501,
            speed: 1.81
        }
    },
    {
        temp: 19.67,
        pressure: 1019.82,
        humidity: 94,
        minTemp: 19.67,
        maxTemp: 19.67,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-24T12:00:00.000Z'),
        wind: {
            deg: 46.0059,
            speed: 2.06
        }
    },
    {
        temp: 20.34,
        pressure: 1018.38,
        humidity: 83,
        minTemp: 20.34,
        maxTemp: 20.34,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'scattered clouds',
        data: new Date('2017-07-24T15:00:00.000Z'),
        wind: {
            deg: 58.0007,
            speed: 4.37
        }
    },
    {
        temp: 19.08,
        pressure: 1017.51,
        humidity: 79,
        minTemp: 19.08,
        maxTemp: 19.08,
        location: 'Szczecin',
        iconClass: 'wi wi-day-sunny',
        description: 'clear sky',
        data: new Date('2017-07-24T18:00:00.000Z'),
        wind: {
            deg: 53.5011,
            speed: 4.12
        }
    },
    {
        temp: 16.5,
        pressure: 1017.11,
        humidity: 90,
        minTemp: 16.5,
        maxTemp: 16.5,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'scattered clouds',
        data: new Date('2017-07-24T21:00:00.000Z'),
        wind: {
            deg: 61.0009,
            speed: 4.32
        }
    },
    {
        temp: 15.74,
        pressure: 1016.22,
        humidity: 93,
        minTemp: 15.74,
        maxTemp: 15.74,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'scattered clouds',
        data: new Date('2017-07-25T00:00:00.000Z'),
        wind: {
            deg: 61.0023,
            speed: 5.21
        }
    },
    {
        temp: 14.73,
        pressure: 1015.48,
        humidity: 91,
        minTemp: 14.73,
        maxTemp: 14.73,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'overcast clouds',
        data: new Date('2017-07-25T03:00:00.000Z'),
        wind: {
            deg: 55.5011,
            speed: 5.8
        }
    },
    {
        temp: 15.96,
        pressure: 1014.59,
        humidity: 91,
        minTemp: 15.96,
        maxTemp: 15.96,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'overcast clouds',
        data: new Date('2017-07-25T06:00:00.000Z'),
        wind: {
            deg: 50.0026,
            speed: 6.26
        }
    },
    {
        temp: 17.32,
        pressure: 1013.65,
        humidity: 88,
        minTemp: 17.32,
        maxTemp: 17.32,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-25T09:00:00.000Z'),
        wind: {
            deg: 38.0018,
            speed: 6.32
        }
    },
    {
        temp: 17.94,
        pressure: 1013.1,
        humidity: 89,
        minTemp: 17.94,
        maxTemp: 17.94,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-25T12:00:00.000Z'),
        wind: {
            deg: 34.0001,
            speed: 6.71
        }
    },
    {
        temp: 18.33,
        pressure: 1012.34,
        humidity: 88,
        minTemp: 18.33,
        maxTemp: 18.33,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-25T15:00:00.000Z'),
        wind: {
            deg: 22.5005,
            speed: 6.28
        }
    },
    {
        temp: 18.12,
        pressure: 1012.23,
        humidity: 94,
        minTemp: 18.12,
        maxTemp: 18.12,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-25T18:00:00.000Z'),
        wind: {
            deg: 35.5031,
            speed: 4.76
        }
    },
    {
        temp: 17.29,
        pressure: 1012.18,
        humidity: 97,
        minTemp: 17.29,
        maxTemp: 17.29,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-25T21:00:00.000Z'),
        wind: {
            deg: 19.0016,
            speed: 4.7
        }
    },
    {
        temp: 16.7,
        pressure: 1011.83,
        humidity: 99,
        minTemp: 16.7,
        maxTemp: 16.7,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'moderate rain',
        data: new Date('2017-07-26T00:00:00.000Z'),
        wind: {
            deg: 5.50293,
            speed: 4.91
        }
    },
    {
        temp: 16.91,
        pressure: 1010.72,
        humidity: 100,
        minTemp: 16.91,
        maxTemp: 16.91,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'heavy intensity rain',
        data: new Date('2017-07-26T03:00:00.000Z'),
        wind: {
            deg: 3.50137,
            speed: 5.71
        }
    },
    {
        temp: 17.51,
        pressure: 1010.52,
        humidity: 100,
        minTemp: 17.51,
        maxTemp: 17.51,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'moderate rain',
        data: new Date('2017-07-26T06:00:00.000Z'),
        wind: {
            deg: 10.0021,
            speed: 6.07
        }
    },
    {
        temp: 17.8,
        pressure: 1010.87,
        humidity: 99,
        minTemp: 17.8,
        maxTemp: 17.8,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'moderate rain',
        data: new Date('2017-07-26T09:00:00.000Z'),
        wind: {
            deg: 352.006,
            speed: 7.05
        }
    },
    {
        temp: 17.31,
        pressure: 1011.43,
        humidity: 100,
        minTemp: 17.31,
        maxTemp: 17.31,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'moderate rain',
        data: new Date('2017-07-26T12:00:00.000Z'),
        wind: {
            deg: 341,
            speed: 7.86
        }
    },
    {
        temp: 16.95,
        pressure: 1012.15,
        humidity: 100,
        minTemp: 16.95,
        maxTemp: 16.95,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'heavy intensity rain',
        data: new Date('2017-07-26T15:00:00.000Z'),
        wind: {
            deg: 341.003,
            speed: 9.36
        }
    },
    {
        temp: 16.5,
        pressure: 1013.07,
        humidity: 100,
        minTemp: 16.5,
        maxTemp: 16.5,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'moderate rain',
        data: new Date('2017-07-26T18:00:00.000Z'),
        wind: {
            deg: 335.503,
            speed: 9.02
        }
    },
    {
        temp: 16.52,
        pressure: 1014.24,
        humidity: 98,
        minTemp: 16.52,
        maxTemp: 16.52,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'moderate rain',
        data: new Date('2017-07-26T21:00:00.000Z'),
        wind: {
            deg: 332.504,
            speed: 8.36
        }
    },
    {
        temp: 16.52,
        pressure: 1014.91,
        humidity: 98,
        minTemp: 16.52,
        maxTemp: 16.52,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-27T00:00:00.000Z'),
        wind: {
            deg: 325.002,
            speed: 6.92
        }
    },
    {
        temp: 15.54,
        pressure: 1015.18,
        humidity: 99,
        minTemp: 15.54,
        maxTemp: 15.54,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-27T03:00:00.000Z'),
        wind: {
            deg: 317.5,
            speed: 6.03
        }
    },
    {
        temp: 16.84,
        pressure: 1015.29,
        humidity: 98,
        minTemp: 16.84,
        maxTemp: 16.84,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'few clouds',
        data: new Date('2017-07-27T06:00:00.000Z'),
        wind: {
            deg: 311.002,
            speed: 5.91
        }
    },
    {
        temp: 19.49,
        pressure: 1015.23,
        humidity: 94,
        minTemp: 19.49,
        maxTemp: 19.49,
        location: 'Szczecin',
        iconClass: 'wi wi-day-sunny',
        description: 'clear sky',
        data: new Date('2017-07-27T09:00:00.000Z'),
        wind: {
            deg: 310.503,
            speed: 5.12
        }
    },
    {
        temp: 21.25,
        pressure: 1014.83,
        humidity: 90,
        minTemp: 21.25,
        maxTemp: 21.25,
        location: 'Szczecin',
        iconClass: 'wi wi-day-sunny',
        description: 'clear sky',
        data: new Date('2017-07-27T12:00:00.000Z'),
        wind: {
            deg: 304.006,
            speed: 3.58
        }
    },
    {
        temp: 22.03,
        pressure: 1013.89,
        humidity: 87,
        minTemp: 22.03,
        maxTemp: 22.03,
        location: 'Szczecin',
        iconClass: 'wi wi-day-sunny',
        description: 'clear sky',
        data: new Date('2017-07-27T15:00:00.000Z'),
        wind: {
            deg: 274.002,
            speed: 2.07
        }
    },
    {
        temp: 19.4,
        pressure: 1013.74,
        humidity: 93,
        minTemp: 19.4,
        maxTemp: 19.4,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-27T18:00:00.000Z'),
        wind: {
            deg: 233.001,
            speed: 3.86
        }
    },
    {
        temp: 17.61,
        pressure: 1013.82,
        humidity: 99,
        minTemp: 17.61,
        maxTemp: 17.61,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'moderate rain',
        data: new Date('2017-07-27T21:00:00.000Z'),
        wind: {
            deg: 245.501,
            speed: 3.66
        }
    },
    {
        temp: 17.58,
        pressure: 1013.61,
        humidity: 98,
        minTemp: 17.58,
        maxTemp: 17.58,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-28T00:00:00.000Z'),
        wind: {
            deg: 231,
            speed: 4.22
        }
    },
    {
        temp: 17.19,
        pressure: 1014.37,
        humidity: 100,
        minTemp: 17.19,
        maxTemp: 17.19,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-28T03:00:00.000Z'),
        wind: {
            deg: 276.006,
            speed: 5.52
        }
    },
    {
        temp: 16.33,
        pressure: 1016.09,
        humidity: 98,
        minTemp: 16.33,
        maxTemp: 16.33,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-28T06:00:00.000Z'),
        wind: {
            deg: 282.012,
            speed: 6.01
        }
    },
    {
        temp: 17.39,
        pressure: 1018.28,
        humidity: 94,
        minTemp: 17.39,
        maxTemp: 17.39,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-28T09:00:00.000Z'),
        wind: {
            deg: 287.5,
            speed: 6.52
        }
    },
    {
        temp: 18.63,
        pressure: 1020.1,
        humidity: 90,
        minTemp: 18.63,
        maxTemp: 18.63,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'few clouds',
        data: new Date('2017-07-28T12:00:00.000Z'),
        wind: {
            deg: 284.5,
            speed: 6.81
        }
    },
    {
        temp: 18.69,
        pressure: 1021.67,
        humidity: 84,
        minTemp: 18.69,
        maxTemp: 18.69,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'scattered clouds',
        data: new Date('2017-07-28T15:00:00.000Z'),
        wind: {
            deg: 289,
            speed: 6.52
        }
    },
    {
        temp: 17.28,
        pressure: 1023.22,
        humidity: 85,
        minTemp: 17.28,
        maxTemp: 17.28,
        location: 'Szczecin',
        iconClass: 'wi wi-day-rain',
        description: 'light rain',
        data: new Date('2017-07-28T18:00:00.000Z'),
        wind: {
            deg: 281.501,
            speed: 4.91
        }
    },
    {
        temp: 15.42,
        pressure: 1024.63,
        humidity: 86,
        minTemp: 15.42,
        maxTemp: 15.42,
        location: 'Szczecin',
        iconClass: 'wi wi-day-cloudy',
        description: 'few clouds',
        data: new Date('2017-07-28T21:00:00.000Z'),
        wind: {
            deg: 277.502,
            speed: 4.46
        }
    }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} pooling
 * @param {?} openWeather
 * @return {?}
 */
function apiServiceFactory(http, pooling, openWeather) {
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
function forRoot(config) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { apiServiceFactory, forRoot, AngularWeatherWidgetModule, TemperatureScale$1 as TemperatureScale, WeatherSettings, ForecastMode, WeatherLayout, OPEN_WEATHER_MAP_RESPONSE_MOCK, OPEN_WEATHER_MAP_FORECAST, CURRENT_WATHER_MOCK, FORECAST_MOCK, WeatherApiService, WeatherApiConfig, WeatherApiName, ChartComponent as ɵb, WeatherActionsComponent as ɵe, WeatherCurrentDescriptionComponent as ɵg, WeatherCurrentDetailsComponent as ɵj, WeatherCurrentTempComponent as ɵa, WeatherCurrentWindComponent as ɵi, WeatherForecastDetailDayComponent as ɵp, WeatherForecastDetailedComponent as ɵo, WeatherForecastChartWideComponent as ɵq, WeatherForecastSimpleGridComponent as ɵm, WeatherForecastGridDayComponent as ɵl, WeatherForecastComponent as ɵk, WeatherIconComponent as ɵf, WeatherLocationComponent as ɵh, PoolingService as ɵd, WeatherHelpersService as ɵn, WeatherContainer as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci13ZWF0aGVyLXdpZGdldC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvc2VydmljZXMvcG9saW5nLnNlcnZpY2UudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi93ZWF0aGVyLmludGVyZmFjZXMudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL3dlYXRoZXIuY29udGFpbmVyLnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9jb21wb25lbnRzL3dlYXRoZXItaWNvbi93ZWF0aGVyLWljb24uY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC1kZXNjcmlwdGlvbi93ZWF0aGVyLWN1cnJlbnQtZGVzY3JpcHRpb24uY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZS9jdXJyZW50LXRlbXBlcmF0dXJlLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvY29tcG9uZW50cy93ZWF0aGVyLWFjdGlvbnMvYWN0aW9ucy5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvd2VhdGhlci1sb2NhdGlvbi93ZWF0aGVyLWxvY2F0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtd2luZC93ZWF0aGVyLWN1cnJlbnQtd2luZC5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL3NlcnZpY2VzL2FwaS9vcGVuLXdlYXRoZXItbWFwL29wZW4td2VhdGhlci1tYXAtdG8td2VhdGhlci1pY29ucy50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvc2VydmljZXMvYXBpL29wZW4td2VhdGhlci1tYXAvb3Blbi13ZWF0aGVyLW1hcC5hcGkuc2VydmljZS50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtZGV0YWlscy93ZWF0aGVyLWN1cnJlbnQtZGV0YWlscy5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC93ZWF0aGVyLWZvcmVjYXN0LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvc2VydmljZXMvd2VhdGhlci1oZWxwZXJzLnNlcnZpY2UudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC93ZWF0aGVyLWZvcmVjYXN0LWdyaWQtZGF5LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LWRldGFpbGVkL2ZvcmVjYXN0LWRldGFpbGVkLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LWRldGFpbGVkL2ZvcmVjYXN0LWRldGFpbGVkLWRheS5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvY2hhcnQvY2hhcnQuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3Qtc2ltcGxlLWdyaWQvZm9yZWNhc3QtY2hhcnQtd2lkZS5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL21vY2tzL29wZW4td2VhdGhlci1tYXAubW9jay50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvYW5ndWxhci13ZWF0aGVyLXdpZGdldC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgbXVsdGljYXN0LCByZWZDb3VudCwgbWVyZ2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvb2xpbmdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgLy8gTk9URTogUnVubmluZyB0aGUgaW50ZXJ2YWwgb3V0c2lkZSBBbmd1bGFyIGVuc3VyZXMgdGhhdCBlMmUgdGVzdHMgd2lsbCBub3QgaGFuZy5cbiAgZXhlY3V0ZTxUPihcbiAgICBvcGVyYXRpb246ICgpID0+IE9ic2VydmFibGU8VD4sXG4gICAgZnJlcXVlbmN5OiBudW1iZXIgPSAxMDAwXG4gICk6IE9ic2VydmFibGU8VD4ge1xuICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgIGNvbnN0IHNvdXJjZSA9IE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcbiAgICAgIGxldCBzdWI6IFN1YnNjcmlwdGlvbjtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHpvbmUgPSB0aGlzLnpvbmU7XG4gICAgICAgIHN1YiA9IGludGVydmFsKGZyZXF1ZW5jeSlcbiAgICAgICAgICAucGlwZShtZXJnZU1hcChvcGVyYXRpb24pKVxuICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgIHpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoc3ViKSB7XG4gICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc291cmNlXG4gICAgICAucGlwZShtdWx0aWNhc3Qoc3ViamVjdCksIHJlZkNvdW50KCksIG1lcmdlKG9wZXJhdGlvbigpKSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXF1ZXN0T3B0aW9ucywgVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQb29saW5nU2VydmljZSB9IGZyb20gJy4uL3BvbGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJRdWVyeVBhcmFtcyB9IGZyb20gJy4uLy4uL3dlYXRoZXIuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2VhdGhlckFwaVNlcnZpY2Uge1xuICBwb29sbGluZ0ludGVydmFsID0gNjAwMDAgKiA2MDtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHAsXG4gICAgcHJvdGVjdGVkIHBvb2xpbmdTZXJ2aWNlOiBQb29saW5nU2VydmljZSxcbiAgICBASW5qZWN0KCdXRUFUSEVSX0NPTkZJRycpIHB1YmxpYyBhcGlDb25maWc6IFdlYXRoZXJBcGlDb25maWdcbiAgKSB7fVxuXG4gIGN1cnJlbnRXZWF0aGVyKHF1ZXJ5UGFyYW1zOiBXZWF0aGVyUXVlcnlQYXJhbXMpOiBPYnNlcnZhYmxlPEN1cnJlbnRXZWF0aGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbEFwaShxdWVyeVBhcmFtcywgJy93ZWF0aGVyJykucGlwZShtYXAoXG4gICAgICB0aGlzLm1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2UuYmluZCh0aGlzKVxuICAgICkpO1xuICB9XG5cbiAgZm9yZWNhc3QocXVlcnlQYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtcyk6IE9ic2VydmFibGU8Rm9yZWNhc3RbXT4ge1xuICAgIHJldHVybiB0aGlzLmNhbGxBcGkocXVlcnlQYXJhbXMsICcvZm9yZWNhc3QnKS5waXBlKG1hcChcbiAgICAgIHRoaXMubWFwRm9yZWNhc3RSZXNwb25zZS5iaW5kKHRoaXMpXG4gICAgKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FsbEFwaShcbiAgICBxdWVyeVBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zLFxuICAgIGVuZHBvaW50OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLm1hcFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHRoaXMuZ2V0UmVxdWVzdE9wdGlvbnMocGFyYW1zKTtcbiAgICBjb25zdCBhcGlDYWxsOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmh0dHBcbiAgICAgIC5nZXQoYCR7dGhpcy5hcGlDb25maWcuYmFzZVVybH0vJHtlbmRwb2ludH1gLCByZXF1ZXN0T3B0aW9ucylcbiAgICAgIC5waXBlKG1hcChyZXNwID0+IHJlc3AuanNvbigpKSxcbiAgICAgICAgZmlsdGVyKGVsID0+ICEhZWwpKVxuICAgIHJldHVybiB0aGlzLndyYXBXaXRoUG9sbChhcGlDYWxsKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRUb2tlbktleSgpOiBzdHJpbmcge1xuICAgIC8vIEltcGxlbWVudCBpdCBpbiBjaGlsZCBzZXJ2aWNlXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcFF1ZXJ5UGFyYW1zKHBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zKTogYW55IHtcbiAgICAvLyBJbXBsZW1lbnQgaXQgaW4gY2hpbGQgc2VydmljZVxuICAgIHJldHVybjtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlKHJlc3BvbnNlOiBhbnkpOiBDdXJyZW50V2VhdGhlciB7XG4gICAgLy8gSW1wbGVtZW50IGl0IGluIGNoaWxkIHNlcnZpY2VcbiAgICByZXR1cm4gPEN1cnJlbnRXZWF0aGVyPnt9O1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcEZvcmVjYXN0UmVzcG9uc2UocmVzcG9uc2U6IGFueSk6IEZvcmVjYXN0W10ge1xuICAgIC8vIEltcGxlbWVudCBpdCBpbiBjaGlsZCBzZXJ2aWNlXG4gICAgcmV0dXJuIDxGb3JlY2FzdFtdPltdO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcFJlc3BvbnNlVG9JY29uVXJsKHJlc3BvbnNlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBwcm90ZWN0ZWQgbWFwUmVzcG9uc2VUb0ljb25DbGFzcyhyZXNwb25zZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBwcml2YXRlIHdyYXBXaXRoUG9sbChhcGlDYWxsOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICByZXR1cm4gdGhpcy5wb29saW5nU2VydmljZS5leGVjdXRlKCgpID0+IGFwaUNhbGwsIHRoaXMucG9vbGxpbmdJbnRlcnZhbCk7XG4gIH1cblxuICBwcml2YXRlIGdldFJlcXVlc3RPcHRpb25zKHF1ZXJ5UGFyYW1zOiBPYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKCksXG4gICAgICBwYXJhbXM6IHRoaXMuZ2V0UXVlcnlQYXJhbXMocXVlcnlQYXJhbXMpXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFF1ZXJ5UGFyYW1zKG9iajogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IFVSTFNlYXJjaFBhcmFtcyB7XG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgcXVlcnlQYXJhbXMuc2V0KHRoaXMuc2V0VG9rZW5LZXkoKSwgdGhpcy5hcGlDb25maWcua2V5KTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBxdWVyeVBhcmFtcy5zZXQoa2V5LnRvU3RyaW5nKCksIG9ialtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5UGFyYW1zO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VycmVudFdlYXRoZXIge1xuICBsb2NhdGlvbjogc3RyaW5nO1xuICB0ZW1wOiBudW1iZXI7XG4gIHByZXNzdXJlPzogbnVtYmVyO1xuICBodW1pZGl0eT86IG51bWJlcjtcbiAgbWluVGVtcD86IG51bWJlcjtcbiAgbWF4VGVtcD86IG51bWJlcjtcbiAgc3VucmlzZT86IG51bWJlcjtcbiAgc3Vuc2V0PzogbnVtYmVyO1xuICBpY29uQ2xhc3M/OiBzdHJpbmc7XG4gIGljb25Vcmw/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICB3aW5kPzoge1xuICAgIGRlZzogbnVtYmVyO1xuICAgIHNwZWVkOiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9yZWNhc3QgZXh0ZW5kcyBDdXJyZW50V2VhdGhlciB7XG4gIGRhdGE6IERhdGU7XG59XG5cbmV4cG9ydCBjbGFzcyBXZWF0aGVyQXBpQ29uZmlnIHtcbiAgbmFtZTogV2VhdGhlckFwaU5hbWUgPSBXZWF0aGVyQXBpTmFtZS5PUEVOX1dFQVRIRVJfTUFQO1xuICBrZXkgPSAncHJvdmlkZSBzZWNyZXQga2V5JztcbiAgYmFzZVVybCA9ICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNSc7XG59XG5cbmV4cG9ydCBlbnVtIFdlYXRoZXJBcGlOYW1lIHtcbiAgT1BFTl9XRUFUSEVSX01BUCA9IDxhbnk+J09wZW4gV2VhdGhlciBNYXAnXG59XG4iLCJleHBvcnQgY2xhc3MgV2VhdGhlclNldHRpbmdzIHtcbiAgbG9jYXRpb246IFdlYXRoZXJRdWVyeVBhcmFtcyA9IHsgY2l0eU5hbWU6ICdTemN6ZWNpbicgfTtcbiAgc2NhbGU6IFRlbXBlcmF0dXJlU2NhbGUgPSBUZW1wZXJhdHVyZVNjYWxlLkNFTENJVVM7XG4gIGJhY2tncm91bmRDb2xvcj8gPSAnd2hpdGUnO1xuICBjb2xvcj8gPSAnYmxhY2snO1xuICB3aWR0aD86IGFueTtcbiAgaGVpZ2h0PzogYW55O1xuICBzaG93V2luZD86IGJvb2xlYW47XG4gIHNob3dEZXRhaWxzPzogYm9vbGVhbjtcbiAgc2hvd0ZvcmVjYXN0PzogYm9vbGVhbjtcbiAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIGZvcmVjYXN0TW9kZT86IEZvcmVjYXN0TW9kZTtcbiAgbGF5b3V0PzogV2VhdGhlckxheW91dCA9IFdlYXRoZXJMYXlvdXQuTkFSUk9XO1xufVxuXG5leHBvcnQgZW51bSBGb3JlY2FzdE1vZGUge1xuICBHUklEID0gPGFueT4nR1JJRCcsXG4gIERFVEFJTEVEID0gPGFueT4nREVUQUlMRUQnXG59XG5cbmV4cG9ydCBlbnVtIFRlbXBlcmF0dXJlU2NhbGUge1xuICBDRUxDSVVTID0gPGFueT4nY2VsY2l1cycsXG4gIEtFTFZJTiA9IDxhbnk+J2tlbHZpbicsXG4gIEZBSFJFTkhFSVQgPSA8YW55PidmYWhyZW5oZWl0J1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdlYXRoZXJRdWVyeVBhcmFtcyB7XG4gIGNpdHlJZD86IG51bWJlcjtcbiAgY2l0eU5hbWU/OiBzdHJpbmc7XG4gIGxhdExuZz86IHtcbiAgICBsYXQ6IG51bWJlcjtcbiAgICBsbmc6IG51bWJlcjtcbiAgfTtcbiAgemlwQ29kZT86IHN0cmluZztcbiAgdW5pdHM/OiBUZW1wZXJhdHVyZVNjYWxlO1xuICBsYW5nPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBXZWF0aGVyTGF5b3V0IHtcbiAgV0lERSA9IDxhbnk+J3dpZGUnLFxuICBOQVJST1cgPSA8YW55PiduYXJyb3cnXG59XG4iLCJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBDdXJyZW50V2VhdGhlcixcbiAgRm9yZWNhc3QsXG4gIFdlYXRoZXJBcGlTZXJ2aWNlXG59IGZyb20gJy4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgV2VhdGhlckxheW91dCxcbiAgV2VhdGhlclF1ZXJ5UGFyYW1zLFxuICBXZWF0aGVyU2V0dGluZ3Ncbn0gZnJvbSAnLi93ZWF0aGVyLmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLXdpZGdldCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICAgICBwYWRkaW5nOiAxZW07XG4gICAgICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAuaW5mbyB7XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAuaW5mby53aWRlIHtcbiAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC53aWRlIC5jdXJyZW50IHtcbiAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLndpZGUgLmZvcmVjYXN0IHtcbiAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5jdXJyZW50IHtcbiAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgICAgbWluLXdpZHRoOiAxNDBweDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmZvcmVjYXN0IHtcbiAgICAgICAgICAgICAgIG1pbi13aWR0aDogMjAwcHg7XG4gICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5jdXJyZW50LCAuZm9yZWNhc3Qge1xuICAgICAgICAgICAgICAgcGFkZGluZzogMC41ZW07XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIHdlYXRoZXItYWN0aW9ucyB7XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgIHRvcDogMTBweDtcbiAgICAgICAgICAgICAgIHJpZ2h0OiAxMHB4O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB3ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUuYmlnIHtcbiAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogM2VtO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB3ZWF0aGVyLWljb24uYmlnIHtcbiAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogNmVtO1xuICAgICAgICAgICAgICAgcGFkZGluZzogMC4xNWVtO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAuZW1wdHkge1xuICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmVtcHR5IGkge1xuICAgICAgICAgICAgICAgZm9udC1zaXplOiAzZW07XG4gICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDAuM2VtO1xuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy93ZWF0aGVyLWljb25zLzIuMC4xMC9jc3Mvd2VhdGhlci1pY29ucy5taW4uY3NzXCI+XG4gICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy93ZWF0aGVyLWljb25zLzIuMC4xMC9jc3Mvd2VhdGhlci1pY29ucy13aW5kLm1pbi5jc3NcIj5cbiAgICA8ZGl2ICpuZ0lmPVwiY3VycmVudFdlYXRoZXJcIiBjbGFzcz1cImluZm9cIiBbY2xhc3Mud2lkZV09XCJpc1dpZGVMYXlvdXRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjdXJyZW50XCI+XG4gICAgICAgIDx3ZWF0aGVyLWljb25cbiAgICAgICAgICBjbGFzcz1cImJpZ1wiXG4gICAgICAgICAgW2ljb25JbWFnZVVybF09XCJjdXJyZW50V2VhdGhlcj8uaWNvblVybFwiXG4gICAgICAgICAgW2ljb25DbGFzc109XCJjdXJyZW50V2VhdGhlcj8uaWNvbkNsYXNzXCI+PC93ZWF0aGVyLWljb24+XG4gICAgICAgIDx3ZWF0aGVyLWN1cnJlbnQtZGVzY3JpcHRpb25cbiAgICAgICAgICBbZGVzY3JpcGlvbl09XCJjdXJyZW50V2VhdGhlcj8uZGVzY3JpcHRpb25cIj48L3dlYXRoZXItY3VycmVudC1kZXNjcmlwdGlvbj5cbiAgICAgICAgPHdlYXRoZXItY3VycmVudC13aW5kXG4gICAgICAgICAgKm5nSWY9XCJzZXR0aW5ncy5zaG93V2luZFwiXG4gICAgICAgICAgW3NjYWxlXT1cInNldHRpbmdzLnNjYWxlXCJcbiAgICAgICAgICBbZGVnXT1cImN1cnJlbnRXZWF0aGVyPy53aW5kLmRlZ1wiXG4gICAgICAgICAgW3NwZWVkXT1cImN1cnJlbnRXZWF0aGVyPy53aW5kLnNwZWVkXCI+PC93ZWF0aGVyLWN1cnJlbnQtd2luZD5cbiAgICAgICAgPHdlYXRoZXItbG9jYXRpb24gW3BsYWNlXT1cImN1cnJlbnRXZWF0aGVyPy5sb2NhdGlvblwiPjwvd2VhdGhlci1sb2NhdGlvbj5cbiAgICAgICAgPHdlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZVxuICAgICAgICAgIGNsYXNzPVwiYmlnXCJcbiAgICAgICAgICBbdGVtcF09XCJjdXJyZW50V2VhdGhlcj8udGVtcFwiXG4gICAgICAgICAgW2RlZ109XCJzZXR0aW5ncy5zY2FsZVwiPjwvd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlPlxuICAgICAgICA8d2VhdGhlci1jdXJyZW50LWRldGFpbHNcbiAgICAgICAgICAqbmdJZj1cInNldHRpbmdzLnNob3dEZXRhaWxzXCJcbiAgICAgICAgICBbbWF4VGVtcF09XCJjdXJyZW50V2VhdGhlcj8ubWF4VGVtcFwiXG4gICAgICAgICAgW21pblRlbXBdPVwiY3VycmVudFdlYXRoZXI/Lm1pblRlbXBcIlxuICAgICAgICAgIFtwcmVzc3VyZV09XCJjdXJyZW50V2VhdGhlcj8ucHJlc3N1cmVcIlxuICAgICAgICAgIFtodW1pZGl0eV09XCJjdXJyZW50V2VhdGhlcj8uaHVtaWRpdHlcIj48L3dlYXRoZXItY3VycmVudC1kZXRhaWxzPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9yZWNhc3RcIiAqbmdJZj1cInNldHRpbmdzLnNob3dGb3JlY2FzdFwiPlxuICAgICAgICA8d2VhdGhlci1mb3JlY2FzdFxuICAgICAgICAgIFtmb3JlY2FzdF09XCJmb3JlY2FzdFwiXG4gICAgICAgICAgW3NldHRpbmdzXT1cInNldHRpbmdzXCJcbiAgICAgICAgICBbbW9kZV09XCJzZXR0aW5ncy5mb3JlY2FzdE1vZGVcIj48L3dlYXRoZXItZm9yZWNhc3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwiIWN1cnJlbnRXZWF0aGVyXCIgY2xhc3M9XCJpbmZvIGVtcHR5XCI+XG4gICAgICA8aSBjbGFzcz1cIndpIHdpLXN1bnJpc2VcIj48L2k+XG4gICAgICBObyB3ZWF0aGVyIGRhdGEuLi5cbiAgICA8L2Rpdj5cbiAgICA8d2VhdGhlci1hY3Rpb25zICpuZ0lmPVwiaXNNb3VzZU9uXCIgKHVwZGF0ZSk9XCJnZXRXZWF0aGVyKClcIj48L3dlYXRoZXItYWN0aW9ucz5cblxuICBgXG59KSAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIFdlYXRoZXJDb250YWluZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmJhY2tncm91bmQnKSBiYWNrZ3JvdW5kITogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmNvbG9yJykgY29sb3IhOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSB3aWR0aCA9ICdhdXRvJztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBoZWlnaHQgPSAnYXV0byc7XG5cbiAgQElucHV0KCkgZm9yZWNhc3QhOiBGb3JlY2FzdFtdIHwgbnVsbDtcbiAgQElucHV0KCkgY3VycmVudFdlYXRoZXIhOiBDdXJyZW50V2VhdGhlciB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIHNldCBzZXR0aW5ncyh2YWx1ZTogV2VhdGhlclNldHRpbmdzKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXR0aW5ncyA9IHZhbHVlO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuX3NldHRpbmdzLmJhY2tncm91bmRDb2xvciB8fCAnd2hpdGUnO1xuICAgIHRoaXMuY29sb3IgPSB0aGlzLl9zZXR0aW5ncy5jb2xvciB8fCAnYmxhY2snO1xuICAgIHRoaXMud2lkdGggPSB0aGlzLl9zZXR0aW5ncy53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NldHRpbmdzLmhlaWdodDtcbiAgICBpZiAodGhpcy53ZWF0aGVyQXBpLmFwaUNvbmZpZy5uYW1lICYmIHRoaXMud2VhdGhlckFwaS5hcGlDb25maWcua2V5KSB7XG4gICAgICB0aGlzLmdldFdlYXRoZXIoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLmxheW91dCkge1xuICAgICAgdGhpcy5pc1dpZGVMYXlvdXQgPSB0aGlzLl9zZXR0aW5ncy5sYXlvdXQgPT09IFdlYXRoZXJMYXlvdXQuV0lERTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2V0dGluZ3MoKTogV2VhdGhlclNldHRpbmdzIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3M7XG4gIH1cblxuICBpc1dpZGVMYXlvdXQgPSBmYWxzZTtcbiAgc3Vic2NyaXB0aW9uQ3VycmVudFdlYXRoZXIhOiBTdWJzY3JpcHRpb247XG4gIHN1YnNjcmlwdGlvbkZvcmVjYXN0ITogU3Vic2NyaXB0aW9uO1xuICBjdXJyZW50V2VhdGhlciQhOiBPYnNlcnZhYmxlPEN1cnJlbnRXZWF0aGVyPjtcbiAgZm9yZWNhc3QkITogT2JzZXJ2YWJsZTxGb3JlY2FzdFtdPjtcbiAgaXNNb3VzZU9uITogYm9vbGVhbjtcblxuICBwcml2YXRlIF9zZXR0aW5ncyE6IFdlYXRoZXJTZXR0aW5ncztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHdlYXRoZXJBcGk6IFdlYXRoZXJBcGlTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbkN1cnJlbnRXZWF0aGVyKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbkN1cnJlbnRXZWF0aGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbkZvcmVjYXN0KSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbkZvcmVjYXN0LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIHB1YmxpYyBvbk1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgIHRoaXMuaXNNb3VzZU9uID0gdHJ1ZTtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgcHVibGljIG9uTW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgdGhpcy5pc01vdXNlT24gPSBmYWxzZTtcbiAgfVxuXG4gIGdldFdlYXRoZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uQ3VycmVudFdlYXRoZXIpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uQ3VycmVudFdlYXRoZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uRm9yZWNhc3QpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uRm9yZWNhc3QudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50V2VhdGhlciQgPSB0aGlzLmN1cnJlbnRXZWF0aGVyQ2FsbCgpO1xuICAgIHRoaXMuZm9yZWNhc3QkID0gdGhpcy5mb3JlY2FzdENhbGwoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbkN1cnJlbnRXZWF0aGVyID0gdGhpcy5jdXJyZW50V2VhdGhlciQuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50V2VhdGhlciA9IGRhdGE7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uRm9yZWNhc3QgPSB0aGlzLmZvcmVjYXN0JC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLmZvcmVjYXN0ID0gZGF0YTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBjdXJyZW50V2VhdGhlckNhbGwoKTogT2JzZXJ2YWJsZTxDdXJyZW50V2VhdGhlcj4ge1xuICAgIGNvbnN0IHBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgdGhpcy5zZXR0aW5ncy5sb2NhdGlvbixcbiAgICAgIHsgdW5pdHM6IHRoaXMuc2V0dGluZ3Muc2NhbGUgfSxcbiAgICAgIHsgbGFuZzogdGhpcy5zZXR0aW5ncy5sYW5ndWFnZSB9XG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy53ZWF0aGVyQXBpLmN1cnJlbnRXZWF0aGVyKHBhcmFtcyk7XG4gIH1cblxuICBmb3JlY2FzdENhbGwoKTogT2JzZXJ2YWJsZTxGb3JlY2FzdFtdPiB7XG4gICAgY29uc3QgcGFyYW1zOiBXZWF0aGVyUXVlcnlQYXJhbXMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICB0aGlzLnNldHRpbmdzLmxvY2F0aW9uLFxuICAgICAgeyB1bml0czogdGhpcy5zZXR0aW5ncy5zY2FsZSB9LFxuICAgICAgeyBsYW5nOiB0aGlzLnNldHRpbmdzLmxhbmd1YWdlIH1cbiAgICApO1xuICAgIHJldHVybiB0aGlzLndlYXRoZXJBcGkuZm9yZWNhc3QocGFyYW1zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWljb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbYGBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpICpuZ0lmPVwiaWNvbkNsYXNzXCIgW2NsYXNzXT1cImljb25DbGFzc1wiPjwvaT5cbiAgICA8aW1nICpuZ0lmPVwiaWNvbkltYWdlVXJsICYmICFpY29uQ2xhc3NcIiBbc3JjXT1cImljb25JbWFnZVVybFwiPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJJY29uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWNvbkNsYXNzITogc3RyaW5nO1xuICBASW5wdXQoKSBpY29uSW1hZ2VVcmwhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpdGxlITogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWN1cnJlbnQtZGVzY3JpcHRpb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICB7eyBkZXNjcmlwaW9uIHwgdXBwZXJjYXNlfX1cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyQ3VycmVudERlc2NyaXB0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZGVzY3JpcGlvbiE6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBsaW5lLWhlaWdodDogMS4xZW07XG4gIH1cbiAgICAuZGVnIHtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtMC4xM2VtO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgbGVmdDogLTAuMmVtO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAge3sgdGVtcD8udG9GaXhlZCgpIH19IDxzcGFuICpuZ0lmPVwidGVtcFwiIGNsYXNzPVwiZGVnXCI+JmRlZzsge3sgdW5pdFN5bWJvbCB9fTwvc3Bhbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyQ3VycmVudFRlbXBDb21wb25lbnQge1xuICB1bml0U3ltYm9sITogc3RyaW5nO1xuICBASW5wdXQoKSB0ZW1wITogbnVtYmVyO1xuICBnZXQgZGVnKCk6IFRlbXBlcmF0dXJlU2NhbGUge1xuICAgIHJldHVybiB0aGlzLl9kZWc7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVnKHZhbHVlOiBUZW1wZXJhdHVyZVNjYWxlKSB7XG4gICAgdGhpcy5fZGVnID0gdmFsdWU7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLkNFTENJVVM6XG4gICAgICAgIHRoaXMudW5pdFN5bWJvbCA9ICdDJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuRkFIUkVOSEVJVDpcbiAgICAgICAgdGhpcy51bml0U3ltYm9sID0gJ0YnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5LRUxWSU46XG4gICAgICAgIHRoaXMudW5pdFN5bWJvbCA9ICdLJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnVuaXRTeW1ib2wgPSAnQyc7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2RlZzogVGVtcGVyYXR1cmVTY2FsZSA9IFRlbXBlcmF0dXJlU2NhbGUuQ0VMQ0lVUztcbn1cblxuZXhwb3J0IGVudW0gVGVtcGVyYXR1cmVTY2FsZSB7XG4gIENFTENJVVMgPSA8YW55PidjZWxjaXVzJyxcbiAgS0VMVklOID0gPGFueT4na2VsdmluJyxcbiAgRkFIUkVOSEVJVCA9IDxhbnk+J2ZhaHJlbmhlaXQnXG59XG4iLCJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1hY3Rpb25zJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICBidXR0b24ge1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmb250LXNpemU6IDEuNmVtO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgfVxuICAgIGJ1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLCAwLjEpO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b24gKGNsaWNrKT1cInVwZGF0ZS5lbWl0KClcIj48aSBjbGFzcz1cIndpIHdpLXJlZnJlc2hcIj48L2k+PC9idXR0b24+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckFjdGlvbnNDb21wb25lbnQge1xuICBAT3V0cHV0KCkgdXBkYXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1sb2NhdGlvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgOmhvc3Qge1xuICAgICAgbWFyZ2luLXRvcDogMWVtO1xuICAgICAgZm9udC1zaXplOiAxZW07XG4gICAgfVxuICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAge3sgcGxhY2UgfX1cblxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJMb2NhdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHBsYWNlITogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGVtcGVyYXR1cmVTY2FsZSB9IGZyb20gJy4uL3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZS9jdXJyZW50LXRlbXBlcmF0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyU2V0dGluZ3MgfSBmcm9tICcuLi8uLi93ZWF0aGVyLmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWN1cnJlbnQtd2luZCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgICBtaW4taGVpZ2h0OiAxLjNlbTtcbiAgICB9XG4gICAgaSB7XG4gICAgICBtYXJnaW4tbGVmdDogMC4zZW07XG4gICAgICBmb250LXNpemU6IDEuNmVtO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuPldpbmQge3sgc3BlZWQgfX0ge3sgdW5pdCB9fTwvc3Bhbj5cbiAgIDxpIFtjbGFzc109XCJ3aW5kSWNvblwiPjwvaT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyQ3VycmVudFdpbmRDb21wb25lbnQge1xuICB1bml0ITogc3RyaW5nO1xuICBnZXQgc2NhbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHNjYWxlKHZhbHVlKSB7XG4gICAgdGhpcy5fc2NhbGUgPSB2YWx1ZTtcbiAgICB0aGlzLnVuaXQgPSB0aGlzLm1hcFNjYWxlVG9UZXh0KHRoaXMuX3NjYWxlKTtcbiAgfVxuICB3aW5kSWNvbiE6IHN0cmluZztcbiAgZ2V0IGRlZygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWc7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVnKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RlZyA9IHZhbHVlO1xuICAgIHRoaXMud2luZEljb24gPSBgd2kgd2ktd2luZCBmcm9tLSR7dGhpcy5fZGVnfS1kZWdgO1xuICB9XG4gIHByaXZhdGUgX2RlZyE6IG51bWJlcjtcbiAgQElucHV0KCkgc3BlZWQhOiBudW1iZXI7XG4gIHByaXZhdGUgX3NjYWxlITogVGVtcGVyYXR1cmVTY2FsZTtcblxuICBtYXBTY2FsZVRvVGV4dChzY2FsZTogVGVtcGVyYXR1cmVTY2FsZSk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChzY2FsZSkge1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLkNFTENJVVM6XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuS0VMVklOOlxuICAgICAgICByZXR1cm4gJ20vcyc7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuRkFIUkVOSEVJVDpcbiAgICAgICAgcmV0dXJuICdtaWwvaCc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIEljb25Db2RlVHlwZSB7XG4gIFtrZXk6IHN0cmluZ106IHsgbGFiZWw6IHN0cmluZzsgaWNvbjogc3RyaW5nIH07XG59XG5cbmV4cG9ydCBjb25zdCBpY29uQ29kZXM6IEljb25Db2RlVHlwZSA9IHtcbiAgJzIwMCc6IHtcbiAgICBsYWJlbDogJ3RodW5kZXJzdG9ybSB3aXRoIGxpZ2h0IHJhaW4nLFxuICAgIGljb246ICdzdG9ybS1zaG93ZXJzJ1xuICB9LFxuXG4gICcyMDEnOiB7XG4gICAgbGFiZWw6ICd0aHVuZGVyc3Rvcm0gd2l0aCByYWluJyxcbiAgICBpY29uOiAnc3Rvcm0tc2hvd2VycydcbiAgfSxcblxuICAnMjAyJzoge1xuICAgIGxhYmVsOiAndGh1bmRlcnN0b3JtIHdpdGggaGVhdnkgcmFpbicsXG4gICAgaWNvbjogJ3N0b3JtLXNob3dlcnMnXG4gIH0sXG5cbiAgJzIxMCc6IHtcbiAgICBsYWJlbDogJ2xpZ2h0IHRodW5kZXJzdG9ybScsXG4gICAgaWNvbjogJ3N0b3JtLXNob3dlcnMnXG4gIH0sXG5cbiAgJzIxMSc6IHtcbiAgICBsYWJlbDogJ3RodW5kZXJzdG9ybScsXG4gICAgaWNvbjogJ3RodW5kZXJzdG9ybSdcbiAgfSxcblxuICAnMjEyJzoge1xuICAgIGxhYmVsOiAnaGVhdnkgdGh1bmRlcnN0b3JtJyxcbiAgICBpY29uOiAndGh1bmRlcnN0b3JtJ1xuICB9LFxuXG4gICcyMjEnOiB7XG4gICAgbGFiZWw6ICdyYWdnZWQgdGh1bmRlcnN0b3JtJyxcbiAgICBpY29uOiAndGh1bmRlcnN0b3JtJ1xuICB9LFxuXG4gICcyMzAnOiB7XG4gICAgbGFiZWw6ICd0aHVuZGVyc3Rvcm0gd2l0aCBsaWdodCBkcml6emxlJyxcbiAgICBpY29uOiAnc3Rvcm0tc2hvd2VycydcbiAgfSxcblxuICAnMjMxJzoge1xuICAgIGxhYmVsOiAndGh1bmRlcnN0b3JtIHdpdGggZHJpenpsZScsXG4gICAgaWNvbjogJ3N0b3JtLXNob3dlcnMnXG4gIH0sXG5cbiAgJzIzMic6IHtcbiAgICBsYWJlbDogJ3RodW5kZXJzdG9ybSB3aXRoIGhlYXZ5IGRyaXp6bGUnLFxuICAgIGljb246ICdzdG9ybS1zaG93ZXJzJ1xuICB9LFxuXG4gICczMDAnOiB7XG4gICAgbGFiZWw6ICdsaWdodCBpbnRlbnNpdHkgZHJpenpsZScsXG4gICAgaWNvbjogJ3Nwcmlua2xlJ1xuICB9LFxuXG4gICczMDEnOiB7XG4gICAgbGFiZWw6ICdkcml6emxlJyxcbiAgICBpY29uOiAnc3ByaW5rbGUnXG4gIH0sXG5cbiAgJzMwMic6IHtcbiAgICBsYWJlbDogJ2hlYXZ5IGludGVuc2l0eSBkcml6emxlJyxcbiAgICBpY29uOiAnc3ByaW5rbGUnXG4gIH0sXG5cbiAgJzMxMCc6IHtcbiAgICBsYWJlbDogJ2xpZ2h0IGludGVuc2l0eSBkcml6emxlIHJhaW4nLFxuICAgIGljb246ICdzcHJpbmtsZSdcbiAgfSxcblxuICAnMzExJzoge1xuICAgIGxhYmVsOiAnZHJpenpsZSByYWluJyxcbiAgICBpY29uOiAnc3ByaW5rbGUnXG4gIH0sXG5cbiAgJzMxMic6IHtcbiAgICBsYWJlbDogJ2hlYXZ5IGludGVuc2l0eSBkcml6emxlIHJhaW4nLFxuICAgIGljb246ICdzcHJpbmtsZSdcbiAgfSxcblxuICAnMzEzJzoge1xuICAgIGxhYmVsOiAnc2hvd2VyIHJhaW4gYW5kIGRyaXp6bGUnLFxuICAgIGljb246ICdzcHJpbmtsZSdcbiAgfSxcblxuICAnMzE0Jzoge1xuICAgIGxhYmVsOiAnaGVhdnkgc2hvd2VyIHJhaW4gYW5kIGRyaXp6bGUnLFxuICAgIGljb246ICdzcHJpbmtsZSdcbiAgfSxcblxuICAnMzIxJzoge1xuICAgIGxhYmVsOiAnc2hvd2VyIGRyaXp6bGUnLFxuICAgIGljb246ICdzcHJpbmtsZSdcbiAgfSxcblxuICAnNTAwJzoge1xuICAgIGxhYmVsOiAnbGlnaHQgcmFpbicsXG4gICAgaWNvbjogJ3JhaW4nXG4gIH0sXG5cbiAgJzUwMSc6IHtcbiAgICBsYWJlbDogJ21vZGVyYXRlIHJhaW4nLFxuICAgIGljb246ICdyYWluJ1xuICB9LFxuXG4gICc1MDInOiB7XG4gICAgbGFiZWw6ICdoZWF2eSBpbnRlbnNpdHkgcmFpbicsXG4gICAgaWNvbjogJ3JhaW4nXG4gIH0sXG5cbiAgJzUwMyc6IHtcbiAgICBsYWJlbDogJ3ZlcnkgaGVhdnkgcmFpbicsXG4gICAgaWNvbjogJ3JhaW4nXG4gIH0sXG5cbiAgJzUwNCc6IHtcbiAgICBsYWJlbDogJ2V4dHJlbWUgcmFpbicsXG4gICAgaWNvbjogJ3JhaW4nXG4gIH0sXG5cbiAgJzUxMSc6IHtcbiAgICBsYWJlbDogJ2ZyZWV6aW5nIHJhaW4nLFxuICAgIGljb246ICdyYWluLW1peCdcbiAgfSxcblxuICAnNTIwJzoge1xuICAgIGxhYmVsOiAnbGlnaHQgaW50ZW5zaXR5IHNob3dlciByYWluJyxcbiAgICBpY29uOiAnc2hvd2VycydcbiAgfSxcblxuICAnNTIxJzoge1xuICAgIGxhYmVsOiAnc2hvd2VyIHJhaW4nLFxuICAgIGljb246ICdzaG93ZXJzJ1xuICB9LFxuXG4gICc1MjInOiB7XG4gICAgbGFiZWw6ICdoZWF2eSBpbnRlbnNpdHkgc2hvd2VyIHJhaW4nLFxuICAgIGljb246ICdzaG93ZXJzJ1xuICB9LFxuXG4gICc1MzEnOiB7XG4gICAgbGFiZWw6ICdyYWdnZWQgc2hvd2VyIHJhaW4nLFxuICAgIGljb246ICdzaG93ZXJzJ1xuICB9LFxuXG4gICc2MDAnOiB7XG4gICAgbGFiZWw6ICdsaWdodCBzbm93JyxcbiAgICBpY29uOiAnc25vdydcbiAgfSxcblxuICAnNjAxJzoge1xuICAgIGxhYmVsOiAnc25vdycsXG4gICAgaWNvbjogJ3Nub3cnXG4gIH0sXG5cbiAgJzYwMic6IHtcbiAgICBsYWJlbDogJ2hlYXZ5IHNub3cnLFxuICAgIGljb246ICdzbm93J1xuICB9LFxuXG4gICc2MTEnOiB7XG4gICAgbGFiZWw6ICdzbGVldCcsXG4gICAgaWNvbjogJ3NsZWV0J1xuICB9LFxuXG4gICc2MTInOiB7XG4gICAgbGFiZWw6ICdzaG93ZXIgc2xlZXQnLFxuICAgIGljb246ICdzbGVldCdcbiAgfSxcblxuICAnNjE1Jzoge1xuICAgIGxhYmVsOiAnbGlnaHQgcmFpbiBhbmQgc25vdycsXG4gICAgaWNvbjogJ3JhaW4tbWl4J1xuICB9LFxuXG4gICc2MTYnOiB7XG4gICAgbGFiZWw6ICdyYWluIGFuZCBzbm93JyxcbiAgICBpY29uOiAncmFpbi1taXgnXG4gIH0sXG5cbiAgJzYyMCc6IHtcbiAgICBsYWJlbDogJ2xpZ2h0IHNob3dlciBzbm93JyxcbiAgICBpY29uOiAncmFpbi1taXgnXG4gIH0sXG5cbiAgJzYyMSc6IHtcbiAgICBsYWJlbDogJ3Nob3dlciBzbm93JyxcbiAgICBpY29uOiAncmFpbi1taXgnXG4gIH0sXG5cbiAgJzYyMic6IHtcbiAgICBsYWJlbDogJ2hlYXZ5IHNob3dlciBzbm93JyxcbiAgICBpY29uOiAncmFpbi1taXgnXG4gIH0sXG5cbiAgJzcwMSc6IHtcbiAgICBsYWJlbDogJ21pc3QnLFxuICAgIGljb246ICdzcHJpbmtsZSdcbiAgfSxcblxuICAnNzExJzoge1xuICAgIGxhYmVsOiAnc21va2UnLFxuICAgIGljb246ICdzbW9rZSdcbiAgfSxcblxuICAnNzIxJzoge1xuICAgIGxhYmVsOiAnaGF6ZScsXG4gICAgaWNvbjogJ2RheS1oYXplJ1xuICB9LFxuXG4gICc3MzEnOiB7XG4gICAgbGFiZWw6ICdzYW5kLCBkdXN0IHdoaXJscycsXG4gICAgaWNvbjogJ2Nsb3VkeS1ndXN0cydcbiAgfSxcblxuICAnNzQxJzoge1xuICAgIGxhYmVsOiAnZm9nJyxcbiAgICBpY29uOiAnZm9nJ1xuICB9LFxuXG4gICc3NTEnOiB7XG4gICAgbGFiZWw6ICdzYW5kJyxcbiAgICBpY29uOiAnY2xvdWR5LWd1c3RzJ1xuICB9LFxuXG4gICc3NjEnOiB7XG4gICAgbGFiZWw6ICdkdXN0JyxcbiAgICBpY29uOiAnZHVzdCdcbiAgfSxcblxuICAnNzYyJzoge1xuICAgIGxhYmVsOiAndm9sY2FuaWMgYXNoJyxcbiAgICBpY29uOiAnc21vZydcbiAgfSxcblxuICAnNzcxJzoge1xuICAgIGxhYmVsOiAnc3F1YWxscycsXG4gICAgaWNvbjogJ2RheS13aW5keSdcbiAgfSxcblxuICAnNzgxJzoge1xuICAgIGxhYmVsOiAndG9ybmFkbycsXG4gICAgaWNvbjogJ3Rvcm5hZG8nXG4gIH0sXG5cbiAgJzgwMCc6IHtcbiAgICBsYWJlbDogJ2NsZWFyIHNreScsXG4gICAgaWNvbjogJ3N1bm55J1xuICB9LFxuXG4gICc4MDEnOiB7XG4gICAgbGFiZWw6ICdmZXcgY2xvdWRzJyxcbiAgICBpY29uOiAnY2xvdWR5J1xuICB9LFxuXG4gICc4MDInOiB7XG4gICAgbGFiZWw6ICdzY2F0dGVyZWQgY2xvdWRzJyxcbiAgICBpY29uOiAnY2xvdWR5J1xuICB9LFxuXG4gICc4MDMnOiB7XG4gICAgbGFiZWw6ICdicm9rZW4gY2xvdWRzJyxcbiAgICBpY29uOiAnY2xvdWR5J1xuICB9LFxuXG4gICc4MDQnOiB7XG4gICAgbGFiZWw6ICdvdmVyY2FzdCBjbG91ZHMnLFxuICAgIGljb246ICdjbG91ZHknXG4gIH0sXG5cbiAgJzkwMCc6IHtcbiAgICBsYWJlbDogJ3Rvcm5hZG8nLFxuICAgIGljb246ICd0b3JuYWRvJ1xuICB9LFxuXG4gICc5MDEnOiB7XG4gICAgbGFiZWw6ICd0cm9waWNhbCBzdG9ybScsXG4gICAgaWNvbjogJ2h1cnJpY2FuZSdcbiAgfSxcblxuICAnOTAyJzoge1xuICAgIGxhYmVsOiAnaHVycmljYW5lJyxcbiAgICBpY29uOiAnaHVycmljYW5lJ1xuICB9LFxuXG4gICc5MDMnOiB7XG4gICAgbGFiZWw6ICdjb2xkJyxcbiAgICBpY29uOiAnc25vd2ZsYWtlLWNvbGQnXG4gIH0sXG5cbiAgJzkwNCc6IHtcbiAgICBsYWJlbDogJ2hvdCcsXG4gICAgaWNvbjogJ2hvdCdcbiAgfSxcblxuICAnOTA1Jzoge1xuICAgIGxhYmVsOiAnd2luZHknLFxuICAgIGljb246ICd3aW5keSdcbiAgfSxcblxuICAnOTA2Jzoge1xuICAgIGxhYmVsOiAnaGFpbCcsXG4gICAgaWNvbjogJ2hhaWwnXG4gIH0sXG5cbiAgJzk1MSc6IHtcbiAgICBsYWJlbDogJ2NhbG0nLFxuICAgIGljb246ICdzdW5ueSdcbiAgfSxcblxuICAnOTUyJzoge1xuICAgIGxhYmVsOiAnbGlnaHQgYnJlZXplJyxcbiAgICBpY29uOiAnY2xvdWR5LWd1c3RzJ1xuICB9LFxuXG4gICc5NTMnOiB7XG4gICAgbGFiZWw6ICdnZW50bGUgYnJlZXplJyxcbiAgICBpY29uOiAnY2xvdWR5LWd1c3RzJ1xuICB9LFxuXG4gICc5NTQnOiB7XG4gICAgbGFiZWw6ICdtb2RlcmF0ZSBicmVlemUnLFxuICAgIGljb246ICdjbG91ZHktZ3VzdHMnXG4gIH0sXG5cbiAgJzk1NSc6IHtcbiAgICBsYWJlbDogJ2ZyZXNoIGJyZWV6ZScsXG4gICAgaWNvbjogJ2Nsb3VkeS1ndXN0cydcbiAgfSxcblxuICAnOTU2Jzoge1xuICAgIGxhYmVsOiAnc3Ryb25nIGJyZWV6ZScsXG4gICAgaWNvbjogJ2Nsb3VkeS1ndXN0cydcbiAgfSxcblxuICAnOTU3Jzoge1xuICAgIGxhYmVsOiAnaGlnaCB3aW5kLCBuZWFyIGdhbGUnLFxuICAgIGljb246ICdjbG91ZHktZ3VzdHMnXG4gIH0sXG5cbiAgJzk1OCc6IHtcbiAgICBsYWJlbDogJ2dhbGUnLFxuICAgIGljb246ICdjbG91ZHktZ3VzdHMnXG4gIH0sXG5cbiAgJzk1OSc6IHtcbiAgICBsYWJlbDogJ3NldmVyZSBnYWxlJyxcbiAgICBpY29uOiAnY2xvdWR5LWd1c3RzJ1xuICB9LFxuXG4gICc5NjAnOiB7XG4gICAgbGFiZWw6ICdzdG9ybScsXG4gICAgaWNvbjogJ3RodW5kZXJzdG9ybSdcbiAgfSxcblxuICAnOTYxJzoge1xuICAgIGxhYmVsOiAndmlvbGVudCBzdG9ybScsXG4gICAgaWNvbjogJ3RodW5kZXJzdG9ybSdcbiAgfSxcblxuICAnOTYyJzoge1xuICAgIGxhYmVsOiAnaHVycmljYW5lJyxcbiAgICBpY29uOiAnY2xvdWR5LWd1c3RzJ1xuICB9XG59O1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVGVtcGVyYXR1cmVTY2FsZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlL2N1cnJlbnQtdGVtcGVyYXR1cmUuY29tcG9uZW50JztcbmltcG9ydCB7IFBvb2xpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcG9saW5nLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ3VycmVudFdlYXRoZXIsXG4gIEZvcmVjYXN0LFxuICBXZWF0aGVyQXBpQ29uZmlnLFxuICBXZWF0aGVyQXBpU2VydmljZVxufSBmcm9tICcuLi93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IGljb25Db2RlcywgSWNvbkNvZGVUeXBlIH0gZnJvbSAnLi9vcGVuLXdlYXRoZXItbWFwLXRvLXdlYXRoZXItaWNvbnMnO1xuaW1wb3J0IHsgV2VhdGhlclF1ZXJ5UGFyYW1zIH0gZnJvbSAnLi4vLi4vLi4vd2VhdGhlci5pbnRlcmZhY2VzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9wZW5XZWF0aGVyTWFwQXBpU2VydmljZSBleHRlbmRzIFdlYXRoZXJBcGlTZXJ2aWNlIHtcbiAgaWNvbkNvZGVzOiBJY29uQ29kZVR5cGU7XG4gIGljb25Db2RlcyQhOiBPYnNlcnZhYmxlPGFueT47XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwLFxuICAgIHByb3RlY3RlZCBwb29saW5nU2VydmljZTogUG9vbGluZ1NlcnZpY2UsXG4gICAgcHVibGljIGFwaUNvbmZpZzogV2VhdGhlckFwaUNvbmZpZ1xuICApIHtcbiAgICBzdXBlcihodHRwLCBwb29saW5nU2VydmljZSwgYXBpQ29uZmlnKTtcbiAgICB0aGlzLmljb25Db2RlcyA9IGljb25Db2RlcztcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBRdWVyeVBhcmFtcyhcbiAgICBwYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtc1xuICApOiBPcGVuV2VhdGhlck1hcExvY2F0aW9uUmVxdWVzdCB7XG4gICAgY29uc3QgbWFwcGVkOiBPcGVuV2VhdGhlck1hcExvY2F0aW9uUmVxdWVzdCA9IHtcbiAgICAgIGlkOiBwYXJhbXMuY2l0eUlkLFxuICAgICAgcTogcGFyYW1zLmNpdHlOYW1lLFxuICAgICAgbGF0OiBwYXJhbXMubGF0TG5nID8gcGFyYW1zLmxhdExuZy5sYXQgOiB1bmRlZmluZWQsXG4gICAgICBsb246IHBhcmFtcy5sYXRMbmcgPyBwYXJhbXMubGF0TG5nLmxuZyA6IHVuZGVmaW5lZCxcbiAgICAgIHppcDogcGFyYW1zLnppcENvZGUsXG4gICAgICB1bml0czogcGFyYW1zLnVuaXRzID8gdGhpcy5tYXBVbml0cyhwYXJhbXMudW5pdHMpIDogdW5kZWZpbmVkLFxuICAgICAgbGFuZzogcGFyYW1zLmxhbmdcbiAgICB9O1xuICAgIHJldHVybiBtYXBwZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwQ3VycmVudFdlYXRoZXJSZXNwb25zZShcbiAgICByZXNwb25zZTogT3BlbldlYXRoZXJNYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlXG4gICk6IEN1cnJlbnRXZWF0aGVyIHtcbiAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gPEN1cnJlbnRXZWF0aGVyPnt9O1xuICAgIH1cbiAgICBjb25zdCB3ZWF0aGVyOiBDdXJyZW50V2VhdGhlciA9IHtcbiAgICAgIHRlbXA6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgIHByZXNzdXJlOiByZXNwb25zZS5tYWluID8gcmVzcG9uc2UubWFpbi5wcmVzc3VyZSA6IHVuZGVmaW5lZCxcbiAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5tYWluID8gcmVzcG9uc2UubWFpbi5odW1pZGl0eSA6IHVuZGVmaW5lZCxcbiAgICAgIG1pblRlbXA6XG4gICAgICAgIHJlc3BvbnNlLm1haW4gJiYgcmVzcG9uc2UubWFpbi50ZW1wXG4gICAgICAgICAgPyByZXNwb25zZS5tYWluLnRlbXBfbWluXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICBtYXhUZW1wOlxuICAgICAgICByZXNwb25zZS5tYWluICYmIHJlc3BvbnNlLm1haW4udGVtcFxuICAgICAgICAgID8gcmVzcG9uc2UubWFpbi50ZW1wX21heFxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgc3VucmlzZTogcmVzcG9uc2Uuc3lzID8gcmVzcG9uc2Uuc3lzLnN1bnJpc2UgOiB1bmRlZmluZWQsXG4gICAgICBzdW5zZXQ6IHJlc3BvbnNlLnN5cyA/IHJlc3BvbnNlLnN5cy5zdW5zZXQgOiB1bmRlZmluZWQsXG4gICAgICBsb2NhdGlvbjogcmVzcG9uc2UubmFtZSxcbiAgICAgIGljb25Vcmw6IHRoaXMubWFwUmVzcG9uc2VUb0ljb25VcmwocmVzcG9uc2UpLFxuICAgICAgaWNvbkNsYXNzOiB0aGlzLm1hcFJlc3BvbnNlVG9JY29uQ2xhc3MocmVzcG9uc2UpLFxuICAgICAgZGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICB3aW5kOiB7XG4gICAgICAgIGRlZzogcmVzcG9uc2Uud2luZC5kZWcsXG4gICAgICAgIHNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gd2VhdGhlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBGb3JlY2FzdFJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOiBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2VcbiAgKTogRm9yZWNhc3RbXSB7XG4gICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgcmV0dXJuIDxGb3JlY2FzdFtdPltdO1xuICAgIH1cbiAgICBjb25zdCBjaXR5ID0gcmVzcG9uc2UuY2l0eTtcbiAgICByZXR1cm4gcmVzcG9uc2UubGlzdC5tYXAoKGVsOiBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2VFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBmb3JlY2FzdDogRm9yZWNhc3QgPSB7XG4gICAgICAgIHRlbXA6IGVsLm1haW4udGVtcCxcbiAgICAgICAgcHJlc3N1cmU6IGVsLm1haW4ucHJlc3N1cmUsXG4gICAgICAgIGh1bWlkaXR5OiBlbC5tYWluLmh1bWlkaXR5LFxuICAgICAgICBtaW5UZW1wOiBlbC5tYWluLnRlbXBfbWluLFxuICAgICAgICBtYXhUZW1wOiBlbC5tYWluLnRlbXBfbWF4LFxuICAgICAgICBsb2NhdGlvbjogY2l0eS5uYW1lLFxuICAgICAgICBpY29uQ2xhc3M6IHRoaXMubWFwUmVzcG9uc2VUb0ljb25DbGFzcyhlbCksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBlbC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICBkYXRhOiBuZXcgRGF0ZShlbC5kdCAqIDEwMDApLFxuICAgICAgICB3aW5kOiB7XG4gICAgICAgICAgZGVnOiBlbC53aW5kLmRlZyxcbiAgICAgICAgICBzcGVlZDogZWwud2luZC5zcGVlZFxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGZvcmVjYXN0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcFJlc3BvbnNlVG9JY29uVXJsKFxuICAgIHJlc3BvbnNlOiBPcGVuV2VhdGhlck1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2VcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259LnBuZ2A7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwUmVzcG9uc2VUb0ljb25DbGFzcyhcbiAgICByZXNwb25zZTpcbiAgICAgIHwgT3BlbldlYXRoZXJNYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlXG4gICAgICB8IE9wZW5XZWF0aGVyTWFwRm9yZWNhc3RSZXNwb25zZUVsZW1lbnRcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb2RlID0gcmVzcG9uc2Uud2VhdGhlclswXS5pZDtcbiAgICBjb25zdCBwcmVmaXggPSAnd2kgd2ktJztcbiAgICBsZXQgaWNvbiA9IGljb25Db2Rlc1tjb2RlXS5pY29uO1xuICAgIC8vIElmIHdlIGFyZSBub3QgaW4gdGhlIHJhbmdlcyBtZW50aW9uZWQgYWJvdmUsIGFkZCBhIGRheS9uaWdodCBwcmVmaXguXG4gICAgaWYgKCEoY29kZSA+IDY5OSAmJiBjb2RlIDwgODAwKSAmJiAhKGNvZGUgPiA4OTkgJiYgY29kZSA8IDEwMDApKSB7XG4gICAgICBpY29uID0gJ2RheS0nICsgaWNvbjtcbiAgICB9XG4gICAgaWNvbiA9IHByZWZpeCArIGljb247XG4gICAgcmV0dXJuIGljb247XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0VG9rZW5LZXkoKSB7XG4gICAgcmV0dXJuICdBUFBJRCc7XG4gIH1cblxuICBwcml2YXRlIG1hcFVuaXRzKHVuaXQ6IFRlbXBlcmF0dXJlU2NhbGUpIHtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5DRUxDSVVTOlxuICAgICAgICByZXR1cm4gJ21ldHJpYyc7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuRkFIUkVOSEVJVDpcbiAgICAgICAgcmV0dXJuICdpbXBlcmlhbCc7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuS0VMVklOOlxuICAgICAgICByZXR1cm47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ21ldHJpYyc7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbldlYXRoZXJNYXBMb2NhdGlvblJlcXVlc3Qge1xuICBpZD86IGFueTtcbiAgcT86IGFueTtcbiAgbGF0PzogYW55O1xuICBsb24/OiBhbnk7XG4gIHppcD86IGFueTtcbiAgdW5pdHM/OiAnaW1wZXJpYWwnIHwgJ21ldHJpYyc7XG4gIGxhbmc/OiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbldlYXRoZXJNYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlIHtcbiAgY29vcmQ6IHsgbG9uOiBudW1iZXI7IGxhdDogbnVtYmVyIH07XG4gIHdlYXRoZXI6IFt7IGlkOiBudW1iZXI7IG1haW46IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZzsgaWNvbjogc3RyaW5nIH1dO1xuICBiYXNlOiBzdHJpbmc7XG4gIG1haW46IHtcbiAgICB0ZW1wOiBudW1iZXI7XG4gICAgcHJlc3N1cmU6IG51bWJlcjtcbiAgICBodW1pZGl0eTogbnVtYmVyO1xuICAgIHRlbXBfbWluOiBudW1iZXI7XG4gICAgdGVtcF9tYXg6IG51bWJlcjtcbiAgfTtcbiAgdmlzaWJpbGl0eTogbnVtYmVyO1xuICB3aW5kOiB7IHNwZWVkOiBudW1iZXI7IGRlZzogbnVtYmVyIH07XG4gIGNsb3VkczogeyBhbGw6IG51bWJlciB9O1xuICBkdDogbnVtYmVyO1xuICBzeXM6IHtcbiAgICB0eXBlOiBudW1iZXI7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBudW1iZXI7XG4gICAgY291bnRyeTogc3RyaW5nO1xuICAgIHN1bnJpc2U6IG51bWJlcjtcbiAgICBzdW5zZXQ6IG51bWJlcjtcbiAgfTtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBjb2Q6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2Uge1xuICBjaXR5OiB7XG4gICAgY29vcmQ6IHtcbiAgICAgIGxhdDogbnVtYmVyO1xuICAgICAgbG9uOiBudW1iZXI7XG4gICAgfTtcbiAgICBjb3VudHJ5OiBzdHJpbmc7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gIH07XG4gIG1lc3NhZ2U6IG51bWJlcjtcbiAgY29kOiBzdHJpbmc7XG4gIGNudDogbnVtYmVyO1xuICBsaXN0OiBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2VFbGVtZW50W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbldlYXRoZXJNYXBGb3JlY2FzdFJlc3BvbnNlRWxlbWVudCB7XG4gIGNsb3Vkczoge1xuICAgIGFsbDogbnVtYmVyO1xuICB9O1xuICBkdDogbnVtYmVyO1xuICBkdF90eHQ6IHN0cmluZztcbiAgbWFpbjoge1xuICAgIGdybmRfbGV2ZWw6IG51bWJlcjtcbiAgICB0ZW1wOiBudW1iZXI7XG4gICAgcHJlc3N1cmU6IG51bWJlcjtcbiAgICBodW1pZGl0eTogbnVtYmVyO1xuICAgIHRlbXBfbWluOiBudW1iZXI7XG4gICAgdGVtcF9tYXg6IG51bWJlcjtcbiAgICB0ZW1wX2tmOiBudW1iZXI7XG4gICAgc2VhX2xldmVsOiBudW1iZXI7XG4gIH07XG4gIHN5czoge1xuICAgIHBvZDogc3RyaW5nO1xuICB9O1xuICB3ZWF0aGVyOiBbeyBpZDogbnVtYmVyOyBtYWluOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IGljb246IHN0cmluZyB9XTtcbiAgd2luZDogeyBzcGVlZDogbnVtYmVyOyBkZWc6IG51bWJlciB9O1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1jdXJyZW50LWRldGFpbHMnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBtYXJnaW4tdG9wOiAxZW07XG4gICAgfVxuICAgIC5yb3cge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgLnJvdyBzcGFuIHtcbiAgICAgIG1hcmdpbjogMCAwLjNlbTtcbiAgICB9XG4gICAgLndpIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMC4zZW07XG4gICAgfVxuICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGkgY2xhc3M9XCJ3aSB3aS10aGVybW9tZXRlclwiPjwvaT5cbiAgICAgIDxzcGFuPlxuICAgICAgICAgIDxzcGFuPk1pbjoge3ttaW5UZW1wfX0mZGVnOzwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj5NYXg6IHt7bWF4VGVtcH19JmRlZzs8L3NwYW4+XG4gICAgICA8L3NwYW4+XG5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8c3Bhbj48aSBjbGFzcz1cIndpIHdpLWJhcm9tZXRlclwiPjwvaT5QcmVzc3VyZToge3twcmVzc3VyZX19PC9zcGFuPlxuICAgICAgPHNwYW4+PGkgY2xhc3M9XCJ3aSB3aS1odW1pZGl0eVwiPjwvaT5IdW1pZGl0eToge3todW1pZGl0eX19JTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyQ3VycmVudERldGFpbHNDb21wb25lbnQge1xuICBASW5wdXQoKSBtYXhUZW1wITogbnVtYmVyO1xuICBASW5wdXQoKSBtaW5UZW1wITogbnVtYmVyO1xuICBASW5wdXQoKSBwcmVzc3VyZSE6IG51bWJlcjtcbiAgQElucHV0KCkgaHVtaWRpdHkhOiBudW1iZXI7XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9yZWNhc3QgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JlY2FzdE1vZGUsIFdlYXRoZXJTZXR0aW5ncyB9IGZyb20gJy4uLy4uL3dlYXRoZXIuaW50ZXJmYWNlcyc7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgPSBSZWZsZWN0LnByZXZlbnRFeHRlbnNpb25zO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWZvcmVjYXN0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAxZW07XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8d2VhdGhlci1mb3JlY2FzdC1zaW1wbGUtZ3JpZFxuICAgICAgKm5nSWY9XCJpc0dyaWRGb3JlY2FzdFwiXG4gICAgICBbZm9yZWNhc3RdPVwiZm9yZWNhc3RcIj48L3dlYXRoZXItZm9yZWNhc3Qtc2ltcGxlLWdyaWQ+XG4gICAgPHdlYXRoZXItZm9yZWNhc3QtZGV0YWlsZWRcbiAgICAgICpuZ0lmPVwiIWlzR3JpZEZvcmVjYXN0XCJcbiAgICAgIFtzZXR0aW5nc109XCJzZXR0aW5nc1wiXG4gICAgICBbZm9yZWNhc3RdPVwiZm9yZWNhc3RcIj48L3dlYXRoZXItZm9yZWNhc3QtZGV0YWlsZWQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckZvcmVjYXN0Q29tcG9uZW50IHtcbiAgaXNHcmlkRm9yZWNhc3QgPSB0cnVlO1xuICBASW5wdXQoKVxuICBzZXQgbW9kZSh2YWx1ZTogRm9yZWNhc3RNb2RlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIEZvcmVjYXN0TW9kZS5HUklEOlxuICAgICAgICB0aGlzLmlzR3JpZEZvcmVjYXN0ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEZvcmVjYXN0TW9kZS5ERVRBSUxFRDpcbiAgICAgICAgdGhpcy5pc0dyaWRGb3JlY2FzdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuaXNHcmlkRm9yZWNhc3QgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgc2V0dGluZ3MhOiBXZWF0aGVyU2V0dGluZ3M7XG4gIEBJbnB1dCgpXG4gIHNldCBmb3JlY2FzdCh2YWx1ZTogRm9yZWNhc3RbXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZm9yZWNhc3QgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBmb3JlY2FzdCgpOiBGb3JlY2FzdFtdIHtcbiAgICByZXR1cm4gdGhpcy5fZm9yZWNhc3Q7XG4gIH1cbiAgcHJpdmF0ZSBfZm9yZWNhc3QhOiBGb3JlY2FzdFtdO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9yZWNhc3QgfSBmcm9tICcuL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENoYXJ0RGF0YSB9IGZyb20gJ2NoYXJ0LmpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJIZWxwZXJzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBncm91cEZvcmVjYXN0c0J5RGF5KGxpc3Q6IEZvcmVjYXN0W10pOiBBcnJheTxGb3JlY2FzdFtdPiB7XG4gICAgY29uc3QgbWFwOiB7IFtrZXk6IHN0cmluZ106IEZvcmVjYXN0W10gfSA9IHt9O1xuICAgIGxldCByZXN1bHQ6IEFycmF5PEZvcmVjYXN0W10+ID0gW107XG4gICAgbGlzdC5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGNvbnN0IGRheSA9IGVsLmRhdGEuZ2V0VVRDRGF0ZSgpO1xuICAgICAgaWYgKCFtYXBbZGF5XSkge1xuICAgICAgICBtYXBbZGF5XSA9IFtlbF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXBbZGF5XS5wdXNoKGVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXN1bHQgPSBPYmplY3Qua2V5cyhtYXApLm1hcChrZXkgPT4gbWFwW2tleV0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBGaXhtZTogVGhpcyBmdW5jdGlvbiBnZW5lcmF0ZXMgd3JvbmcgaWNvbiBmb3IgYXZlcmFnZSBkYXkgd2VhdGhlci5cbiAgLy8gV2VhdGhlciBpY29uIGlzIHRha2VuIGZyb20gZmlyc3QgZGF5IG1lYXN1cmVtZW50XG4gIHJlZHVjZVRvQXZlcmFnZVBlckRheShsaXN0OiBGb3JlY2FzdFtdKSB7XG4gICAgcmV0dXJuIGxpc3QucmVkdWNlKChwcmV2OiBGb3JlY2FzdFtdLCBjdXJyKSA9PiB7XG4gICAgICBpZiAoY3VyciAmJiAhY3Vyci5kYXRhKSB7XG4gICAgICAgIHByZXYucHVzaChjdXJyKTtcbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICB9XG4gICAgICBjb25zdCBsYXN0RWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJldltwcmV2Lmxlbmd0aCAtIDFdO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHByZXZEYXkgPSBsYXN0RWxlbWVudCgpXG4gICAgICAgID8gcHJldltwcmV2Lmxlbmd0aCAtIDFdLmRhdGEuZ2V0RGF5KClcbiAgICAgICAgOiBudWxsO1xuICAgICAgY29uc3QgY3VyckRheSA9IGN1cnIuZGF0YS5nZXREYXkoKTtcbiAgICAgIGlmIChjdXJyRGF5ID09PSBwcmV2RGF5KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogRm9yZWNhc3QgPSBsYXN0RWxlbWVudCgpO1xuICAgICAgICByZXN1bHQudGVtcCA9IChyZXN1bHQudGVtcCArIGN1cnIudGVtcCkgLyAyO1xuICAgICAgICBpZiAocmVzdWx0LndpbmQgJiYgY3Vyci53aW5kKSB7XG4gICAgICAgICAgcmVzdWx0LndpbmQgPSB7XG4gICAgICAgICAgICBzcGVlZDogKHJlc3VsdC53aW5kLnNwZWVkICsgY3Vyci53aW5kLnNwZWVkKSAvIDIsXG4gICAgICAgICAgICBkZWc6IChyZXN1bHQud2luZC5kZWcgKyBjdXJyLndpbmQuZGVnKSAvIDJcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5odW1pZGl0eSAmJiBjdXJyLmh1bWlkaXR5KSB7XG4gICAgICAgICAgcmVzdWx0Lmh1bWlkaXR5ID0gKHJlc3VsdC5odW1pZGl0eSArIGN1cnIuaHVtaWRpdHkpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0LnByZXNzdXJlICYmIGN1cnIucHJlc3N1cmUpIHtcbiAgICAgICAgICByZXN1bHQucHJlc3N1cmUgPSAocmVzdWx0LnByZXNzdXJlICsgY3Vyci5wcmVzc3VyZSkgLyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldltwcmV2Lmxlbmd0aCAtIDFdID0gcmVzdWx0O1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByZXYucHVzaChjdXJyKTtcbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICB9XG4gICAgfSwgW10pO1xuICB9XG5cbiAgbWFwRm9yZWNhc3RUb0NoYXJ0cyhmb3JlY2FzdDogRm9yZWNhc3RbXSwgYm9yZGVyQ29sb3IgPSAnI2FhYScpOiBDaGFydERhdGEge1xuICAgIHJldHVybiBmb3JlY2FzdC5yZWR1Y2UoXG4gICAgICAocHJldjogQ2hhcnREYXRhLCBjdXJyOiBGb3JlY2FzdCkgPT4ge1xuICAgICAgICBpZiAocHJldi5sYWJlbHMpIHtcbiAgICAgICAgICBwcmV2LmxhYmVscy5wdXNoKGN1cnIuZGF0YS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldi5kYXRhc2V0cyAmJiBwcmV2LmRhdGFzZXRzWzBdICYmIHByZXYuZGF0YXNldHNbMF0uZGF0YSkge1xuICAgICAgICAgIGNvbnN0IGRhdGE6IG51bWJlcltdID0gPG51bWJlcltdPnByZXYuZGF0YXNldHNbMF0uZGF0YTtcbiAgICAgICAgICBkYXRhLnB1c2goY3Vyci50ZW1wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfSxcbiAgICAgIDxDaGFydERhdGE+e1xuICAgICAgICBsYWJlbHM6IFtdLFxuICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBbJ3JnYmEoMCwgMCwgMCwgMC4xKSddLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFtib3JkZXJDb2xvcl0sXG4gICAgICAgICAgICBib3JkZXJXaWR0aDogMVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBoZXhUb1JnYkEoaGV4OiBzdHJpbmcsIG9wYWNpdHk6IHN0cmluZykge1xuICAgIGxldCBjOiBhbnk7XG4gICAgaWYgKC9eIyhbQS1GYS1mMC05XXszfSl7MSwyfSQvLnRlc3QoaGV4KSkge1xuICAgICAgYyA9IGhleC5zdWJzdHJpbmcoMSkuc3BsaXQoJycpO1xuICAgICAgaWYgKGMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGMgPSBbY1swXSwgY1swXSwgY1sxXSwgY1sxXSwgY1syXSwgY1syXV07XG4gICAgICB9XG4gICAgICBjID0gJzB4JyArIGMuam9pbignJyk7XG4gICAgICByZXR1cm4gYHJnYmEoJHtbKGMgPj4gMTYpICYgMjU1LCAoYyA+PiA4KSAmIDI1NSwgYyAmIDI1NV0uam9pbihcbiAgICAgICAgJywnXG4gICAgICApfSwke29wYWNpdHl9KWA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JlY2FzdCB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJIZWxwZXJzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3dlYXRoZXItaGVscGVycy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1mb3JlY2FzdC1zaW1wbGUtZ3JpZCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgfVxuICAgICAgICAgICB3ZWF0aGVyLWZvcmVjYXN0LWdyaWQtZGF5IHtcbiAgICAgICAgICAgICBtYXJnaW46IDAgMC40ZW07XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZvcmVjYXN0IG9mIGZvcmVjYXN0UGVyRGF5XCI+XG4gICAgICA8d2VhdGhlci1mb3JlY2FzdC1ncmlkLWRheSBbZm9yZWNhc3RdPVwiZm9yZWNhc3RcIj48L3dlYXRoZXItZm9yZWNhc3QtZ3JpZC1kYXk+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckZvcmVjYXN0U2ltcGxlR3JpZENvbXBvbmVudCB7XG4gIGZvcmVjYXN0UGVyRGF5ITogRm9yZWNhc3RbXTtcbiAgQElucHV0KClcbiAgc2V0IGZvcmVjYXN0KHZhbHVlOiBGb3JlY2FzdFtdKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9mb3JlY2FzdCA9IHZhbHVlO1xuICAgIHRoaXMuZm9yZWNhc3RQZXJEYXkgPSB0aGlzLndlYXRoZXJIZWxwZXJzLnJlZHVjZVRvQXZlcmFnZVBlckRheShcbiAgICAgIHRoaXMuX2ZvcmVjYXN0XG4gICAgKTtcbiAgfVxuICBnZXQgZm9yZWNhc3QoKTogRm9yZWNhc3RbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcmVjYXN0O1xuICB9XG4gIHByaXZhdGUgX2ZvcmVjYXN0ITogRm9yZWNhc3RbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3ZWF0aGVySGVscGVyczogV2VhdGhlckhlbHBlcnNTZXJ2aWNlKSB7fVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcmVjYXN0IH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWZvcmVjYXN0LWdyaWQtZGF5JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgIDpob3N0IHtcbiAgICAgZGlzcGxheTogZmxleDtcbiAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgIGZvbnQtc2l6ZTogMS4yZW07XG4gICB9XG4gICB3ZWF0aGVyLWljb24ge1xuICAgICBmb250LXNpemU6IDEuNGVtO1xuICAgfVxuICAgLmRheSB7XG4gICAgIGZvbnQtc2l6ZTogMC44ZW1cbiAgIH1cbiBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8d2VhdGhlci1pY29uIFtpY29uQ2xhc3NdPVwiZm9yZWNhc3Q/Lmljb25DbGFzc1wiPjwvd2VhdGhlci1pY29uPlxuICAgICAgPHdlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZSBbdGVtcF09XCJmb3JlY2FzdD8udGVtcFwiPjwvd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlPlxuICAgICAgPGRpdiBjbGFzcz1cImRheVwiPnt7Zm9yZWNhc3Q/LmRhdGEgfCBkYXRlOidFRUUnIH19PC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckZvcmVjYXN0R3JpZERheUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGZvcmVjYXN0ITogRm9yZWNhc3Q7XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9yZWNhc3QgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVySGVscGVyc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy93ZWF0aGVyLWhlbHBlcnMuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVyU2V0dGluZ3MgfSBmcm9tICcuLi8uLi8uLi93ZWF0aGVyLmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWZvcmVjYXN0LWRldGFpbGVkJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW2BgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmb3JlY2FzdCBvZiBmb3JlY2FzdFBlckRheVwiPlxuICAgICAgPHdlYXRoZXItZm9yZWNhc3QtZGV0YWlsLWRheVxuICAgICAgICBbc2V0dGluZ3NdPVwic2V0dGluZ3NcIlxuICAgICAgICBbZm9yZWNhc3RdPVwiZm9yZWNhc3RcIj48L3dlYXRoZXItZm9yZWNhc3QtZGV0YWlsLWRheT5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJGb3JlY2FzdERldGFpbGVkQ29tcG9uZW50IHtcbiAgQElucHV0KClcbiAgc2V0IGZvcmVjYXN0KHZhbHVlOiBGb3JlY2FzdFtdKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9mb3JlY2FzdCA9IHZhbHVlO1xuICAgIHRoaXMuZm9yZWNhc3RQZXJEYXkgPSB0aGlzLndlYXRoZXJIZWxwZXJzLmdyb3VwRm9yZWNhc3RzQnlEYXkodmFsdWUpO1xuICB9XG4gIEBJbnB1dCgpIHNldHRpbmdzITogV2VhdGhlclNldHRpbmdzO1xuICBmb3JlY2FzdFBlckRheTogQXJyYXk8Rm9yZWNhc3RbXT4gPSBbXTtcbiAgcHJpdmF0ZSBfZm9yZWNhc3QhOiBGb3JlY2FzdFtdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdlYXRoZXJIZWxwZXJzOiBXZWF0aGVySGVscGVyc1NlcnZpY2UpIHt9XG59XG4iLCJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnREYXRhLCBDaGFydE9wdGlvbnMgfSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQgeyBGb3JlY2FzdCB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJIZWxwZXJzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3dlYXRoZXItaGVscGVycy5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJTZXR0aW5ncyB9IGZyb20gJy4uLy4uLy4uL3dlYXRoZXIuaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItZm9yZWNhc3QtZGV0YWlsLWRheScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICBwYWRkaW5nOiAwLjFlbSAwO1xuICAgICAgICAgICAgICAgZm9udC1zaXplOiAxZW07XG4gICAgICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgOmhvc3QgPiAqIHtcbiAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgMC40ZW07XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5sZWZ0IHtcbiAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgd2VhdGhlci1jaGFydCB7XG4gICAgICAgICAgICAgICBoZWlnaHQ6IDgwcHg7XG4gICAgICAgICAgICAgICB3aWR0aDogODAlO1xuICAgICAgICAgICAgICAgZmxleDogMSAxO1xuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHdlYXRoZXItaWNvbiB7XG4gICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAwLjNlbTtcbiAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMS40ZW07XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibGVmdFwiPlxuICAgICAge3tmb3JlY2FzdFswXT8uZGF0YSB8IGRhdGU6J0VFRScgfX1cbiAgICAgIDx3ZWF0aGVyLWljb24gW2ljb25DbGFzc109XCJmb3JlY2FzdFswXT8uaWNvbkNsYXNzXCI+PC93ZWF0aGVyLWljb24+XG4gICAgPC9kaXY+XG4gICAgPHdlYXRoZXItY2hhcnRcbiAgICAgIFt0eXBlXT1cIidsaW5lJ1wiXG4gICAgICBbZGF0YV09XCJjaGFydERhdGFcIlxuICAgICAgW29wdGlvbnNdPVwiY2hhcnRPcHRpb25zXCJcbiAgICA+PC93ZWF0aGVyLWNoYXJ0PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJGb3JlY2FzdERldGFpbERheUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIGNoYXJ0RGF0YSE6IENoYXJ0RGF0YTtcbiAgY2hhcnRPcHRpb25zITogQ2hhcnRPcHRpb25zO1xuICBASW5wdXQoKSBzZXR0aW5ncyE6IFdlYXRoZXJTZXR0aW5ncztcblxuICBASW5wdXQoKVxuICBzZXQgZm9yZWNhc3QodmFsdWU6IEZvcmVjYXN0W10pIHtcbiAgICB0aGlzLl9mb3JlY2FzdCA9IHZhbHVlO1xuICB9XG4gIGdldCBmb3JlY2FzdCgpOiBGb3JlY2FzdFtdIHtcbiAgICByZXR1cm4gdGhpcy5fZm9yZWNhc3Q7XG4gIH1cbiAgcHJpdmF0ZSBfZm9yZWNhc3QhOiBGb3JlY2FzdFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2VhdGhlckhlbHBlcnM6IFdlYXRoZXJIZWxwZXJzU2VydmljZSkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncyAmJiBjaGFuZ2VbJ2ZvcmVjYXN0J10pIHtcbiAgICAgIHRoaXMudXBkYXRlQ2hhcnRPcHRpb25zKCk7XG4gICAgICB0aGlzLmNoYXJ0RGF0YSA9IHRoaXMud2VhdGhlckhlbHBlcnMubWFwRm9yZWNhc3RUb0NoYXJ0cyhcbiAgICAgICAgdGhpcy5fZm9yZWNhc3QsXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY29sb3JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDaGFydE9wdGlvbnMoKSB7XG4gICAgdGhpcy5jaGFydE9wdGlvbnMgPSB7XG4gICAgICBzY2FsZXM6IHtcbiAgICAgICAgeEF4ZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAndGltZScsXG4gICAgICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgICAgIHVuaXQ6ICdob3VyJyxcbiAgICAgICAgICAgICAgaXNvV2Vla2RheTogdHJ1ZSxcbiAgICAgICAgICAgICAgZGlzcGxheUZvcm1hdHM6IHtcbiAgICAgICAgICAgICAgICBob3VyOiAnaEEnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRvb2x0aXBGb3JtYXQ6ICdMTEwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3JpZExpbmVzOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgZm9udENvbG9yOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgJiYgdGhpcy5zZXR0aW5ncy5jb2xvclxuICAgICAgICAgICAgICAgICAgPyB0aGlzLndlYXRoZXJIZWxwZXJzLmhleFRvUmdiQSh0aGlzLnNldHRpbmdzLmNvbG9yLCAnMC44JylcbiAgICAgICAgICAgICAgICAgIDogJ3doaXRlJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIG1heFRpY2tzTGltaXQ6IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHlBeGVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3JpZExpbmVzOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgZm9udENvbG9yOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgJiYgdGhpcy5zZXR0aW5ncy5jb2xvclxuICAgICAgICAgICAgICAgICAgPyB0aGlzLndlYXRoZXJIZWxwZXJzLmhleFRvUmdiQSh0aGlzLnNldHRpbmdzLmNvbG9yLCAnMC44JylcbiAgICAgICAgICAgICAgICAgIDogJ3doaXRlJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIGF1dG9Ta2lwOiB0cnVlLFxuICAgICAgICAgICAgICBsYWJlbE9mZnNldDogMCxcbiAgICAgICAgICAgICAgbWlycm9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWF4VGlja3NMaW1pdDogMyxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICBsZWdlbmQ6IHtcbiAgICAgICAgZGlzcGxheTogZmFsc2UsXG4gICAgICAgIHBvc2l0aW9uOiAnYm90dG9tJ1xuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIGRpc3BsYXk6IGZhbHNlXG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydE9wdGlvbnMsIENoYXJ0RGF0YSwgQ2hhcnQgfSBmcm9tICdjaGFydC5qcyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWNoYXJ0JyxcbiAgdGVtcGxhdGU6ICc8Y2FudmFzPjwvY2FudmFzPicsXG4gIHN0eWxlczogWyc6aG9zdCB7IGRpc3BsYXk6IGJsb2NrOyB9J11cbn0pXG5leHBvcnQgY2xhc3MgQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGNoYXJ0OiBhbnk7XG5cbiAgQElucHV0KCkgdHlwZSE6IHN0cmluZztcbiAgQElucHV0KCkgZGF0YSE6IENoYXJ0RGF0YTtcbiAgQElucHV0KCkgb3B0aW9ucyE6IENoYXJ0T3B0aW9ucztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zLnNjYWxlcyA9IHtcbiAgICAgIHlBeGVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGV4Y2VzcyBkZWNpbWFsIHBsYWNlc1xuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUudG9GaXhlZCgwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgICB0aGlzLmNoYXJ0ID0gbmV3IENoYXJ0KFxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyksXG4gICAgICB7XG4gICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLmNoYXJ0ICYmIGNoYW5nZXNbJ2RhdGEnXSkge1xuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1snZGF0YSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIFsnZGF0YXNldHMnLCAnbGFiZWxzJywgJ3hMYWJlbHMnLCAneUxhYmVscyddLmZvckVhY2gocHJvcGVydHkgPT4ge1xuICAgICAgICB0aGlzLmNoYXJ0LmRhdGFbcHJvcGVydHldID0gY3VycmVudFZhbHVlW3Byb3BlcnR5XTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jaGFydC51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcmVjYXN0IH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlckhlbHBlcnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvd2VhdGhlci1oZWxwZXJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWZvcmVjYXN0LWNoYXJ0LXdpZGUnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICAgICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cblxuICAgIDwvZGl2PlxuXG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckZvcmVjYXN0Q2hhcnRXaWRlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZm9yZWNhc3QhOiBGb3JlY2FzdFtdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhlbHBlcnM6IFdlYXRoZXJIZWxwZXJzU2VydmljZSkge31cbn1cbiIsImltcG9ydCB7XG4gIE9wZW5XZWF0aGVyTWFwQ3VycmVudFdlYXRoZXJSZXNwb25zZSxcbiAgT3BlbldlYXRoZXJNYXBGb3JlY2FzdFJlc3BvbnNlXG59IGZyb20gJy4uL3NlcnZpY2VzL2FwaS9vcGVuLXdlYXRoZXItbWFwL29wZW4td2VhdGhlci1tYXAuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudFdlYXRoZXIsIEZvcmVjYXN0IH0gZnJvbSAnLi4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgT1BFTl9XRUFUSEVSX01BUF9SRVNQT05TRV9NT0NLOiBPcGVuV2VhdGhlck1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2UgPSB7XG4gIGNvb3JkOiB7IGxvbjogMTQuNjIsIGxhdDogNTMuNDMgfSxcbiAgd2VhdGhlcjogW1xuICAgIHsgaWQ6IDgwMywgbWFpbjogJ0Nsb3VkcycsIGRlc2NyaXB0aW9uOiAnYnJva2VuIGNsb3VkcycsIGljb246ICcwNGQnIH1cbiAgXSxcbiAgYmFzZTogJ3N0YXRpb25zJyxcbiAgbWFpbjoge1xuICAgIHRlbXA6IDI4NS4xNSxcbiAgICBwcmVzc3VyZTogMTAyMSxcbiAgICBodW1pZGl0eTogOTMsXG4gICAgdGVtcF9taW46IDI4NS4xNSxcbiAgICB0ZW1wX21heDogMjg1LjE1XG4gIH0sXG4gIHZpc2liaWxpdHk6IDEwMDAwLFxuICB3aW5kOiB7IHNwZWVkOiAwLjUsIGRlZzogOTAgfSxcbiAgY2xvdWRzOiB7IGFsbDogNzUgfSxcbiAgZHQ6IDE1MDAzNTA0MDAsXG4gIHN5czoge1xuICAgIHR5cGU6IDEsXG4gICAgaWQ6IDUzNjksXG4gICAgbWVzc2FnZTogMC4wMDIzLFxuICAgIGNvdW50cnk6ICdQTCcsXG4gICAgc3VucmlzZTogMTUwMDM0NjU3OCxcbiAgICBzdW5zZXQ6IDE1MDA0MDU1MDNcbiAgfSxcbiAgaWQ6IDc1MzA4NDAsXG4gIG5hbWU6ICdTemN6ZWNpbicsXG4gIGNvZDogMjAwXG59O1xuXG4vL25vaW5zcGVjdGlvbiBUc0xpbnRcbmV4cG9ydCBjb25zdCBPUEVOX1dFQVRIRVJfTUFQX0ZPUkVDQVNUOiBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2UgPSB7XG4gIGNvZDogJzIwMCcsXG4gIG1lc3NhZ2U6IDAuMDA3NyxcbiAgY250OiAzNixcbiAgbGlzdDogW1xuICAgIHtcbiAgICAgIGR0OiAxNTAwNDY1NjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAxOC43NCxcbiAgICAgICAgdGVtcF9taW46IDE3LjIzLFxuICAgICAgICB0ZW1wX21heDogMTguNzQsXG4gICAgICAgIHByZXNzdXJlOiA5NjIuMTMsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyNy44MixcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYyLjEzLFxuICAgICAgICBodW1pZGl0eTogODUsXG4gICAgICAgIHRlbXBfa2Y6IDEuNTFcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMC44OCwgZGVnOiA4NS4wMDA2IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMTkgMTI6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDQ3NjQwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjEuOTcsXG4gICAgICAgIHRlbXBfbWluOiAyMC44NSxcbiAgICAgICAgdGVtcF9tYXg6IDIxLjk3LFxuICAgICAgICBwcmVzc3VyZTogOTYzLjMsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyOS4wNCxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYzLjMsXG4gICAgICAgIGh1bWlkaXR5OiA2OSxcbiAgICAgICAgdGVtcF9rZjogMS4xM1xuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMWQnIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjE2LCBkZWc6IDk4LjUwMDMgfSxcbiAgICAgIHN5czogeyBwb2Q6ICdkJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0xOSAxNTowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNDg3MjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyNy40OSxcbiAgICAgICAgdGVtcF9taW46IDI2LjczLFxuICAgICAgICB0ZW1wX21heDogMjcuNDksXG4gICAgICAgIHByZXNzdXJlOiA5NjMuNyxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI5LjExLFxuICAgICAgICBncm5kX2xldmVsOiA5NjMuNyxcbiAgICAgICAgaHVtaWRpdHk6IDU3LFxuICAgICAgICB0ZW1wX2tmOiAwLjc1XG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxZCcgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMjIsIGRlZzogMTg5LjAwMSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ2QnIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTE5IDE4OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA0OTgwMDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDI5LjY5LFxuICAgICAgICB0ZW1wX21pbjogMjkuMzIsXG4gICAgICAgIHRlbXBfbWF4OiAyOS42OSxcbiAgICAgICAgcHJlc3N1cmU6IDk2My4xNCxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI4LjEyLFxuICAgICAgICBncm5kX2xldmVsOiA5NjMuMTQsXG4gICAgICAgIGh1bWlkaXR5OiA1MCxcbiAgICAgICAgdGVtcF9rZjogMC4zOFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMWQnIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjI2LCBkZWc6IDIwNC4wMDEgfSxcbiAgICAgIHN5czogeyBwb2Q6ICdkJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0xOSAyMTowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNTA4ODAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyOS4xNixcbiAgICAgICAgdGVtcF9taW46IDI5LjE2LFxuICAgICAgICB0ZW1wX21heDogMjkuMTYsXG4gICAgICAgIHByZXNzdXJlOiA5NjEuNSxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI2LjQ1LFxuICAgICAgICBncm5kX2xldmVsOiA5NjEuNSxcbiAgICAgICAgaHVtaWRpdHk6IDQ1LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMywgZGVnOiAyMTMuNTAzIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjAgMDA6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDUxOTYwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjUuMDIsXG4gICAgICAgIHRlbXBfbWluOiAyNS4wMixcbiAgICAgICAgdGVtcF9tYXg6IDI1LjAyLFxuICAgICAgICBwcmVzc3VyZTogOTYxLjcsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyNi43NSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYxLjcsXG4gICAgICAgIGh1bWlkaXR5OiA1MSxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjE3LCBkZWc6IDIwNy41IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjAgMDM6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDUzMDQwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjAuMDgsXG4gICAgICAgIHRlbXBfbWluOiAyMC4wOCxcbiAgICAgICAgdGVtcF9tYXg6IDIwLjA4LFxuICAgICAgICBwcmVzc3VyZTogOTYyLjU5LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjguMDgsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2Mi41OSxcbiAgICAgICAgaHVtaWRpdHk6IDY5LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDAuODYsIGRlZzogMTg2LjAwMSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIwIDA2OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA1NDEyMDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDE3LjgsXG4gICAgICAgIHRlbXBfbWluOiAxNy44LFxuICAgICAgICB0ZW1wX21heDogMTcuOCxcbiAgICAgICAgcHJlc3N1cmU6IDk2Mi4xNSxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI3Ljc2LFxuICAgICAgICBncm5kX2xldmVsOiA5NjIuMTUsXG4gICAgICAgIGh1bWlkaXR5OiA3OSxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjkxLCBkZWc6IDYyLjUwMDkgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMCAwOTowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNTUyMDAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAxNi42MSxcbiAgICAgICAgdGVtcF9taW46IDE2LjYxLFxuICAgICAgICB0ZW1wX21heDogMTYuNjEsXG4gICAgICAgIHByZXNzdXJlOiA5NjEuOSxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI3LjYxLFxuICAgICAgICBncm5kX2xldmVsOiA5NjEuOSxcbiAgICAgICAgaHVtaWRpdHk6IDgzLFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDAuODYsIGRlZzogNzAuNTAwNSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIwIDEyOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA1NjI4MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDIxLjExLFxuICAgICAgICB0ZW1wX21pbjogMjEuMTEsXG4gICAgICAgIHRlbXBfbWF4OiAyMS4xMSxcbiAgICAgICAgcHJlc3N1cmU6IDk2Mi41OSxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI4LjI4LFxuICAgICAgICBncm5kX2xldmVsOiA5NjIuNTksXG4gICAgICAgIGh1bWlkaXR5OiA2NSxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMWQnIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjIxLCBkZWc6IDY3LjUwMTYgfSxcbiAgICAgIHN5czogeyBwb2Q6ICdkJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMCAxNTowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNTczNjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyNy4zMSxcbiAgICAgICAgdGVtcF9taW46IDI3LjMxLFxuICAgICAgICB0ZW1wX21heDogMjcuMzEsXG4gICAgICAgIHByZXNzdXJlOiA5NjIuODQsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyOC4wNSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYyLjg0LFxuICAgICAgICBodW1pZGl0eTogNTMsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4yNiwgZGVnOiAxOTYuNTAyIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjAgMTg6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDU4NDQwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjkuNTIsXG4gICAgICAgIHRlbXBfbWluOiAyOS41MixcbiAgICAgICAgdGVtcF9tYXg6IDI5LjUyLFxuICAgICAgICBwcmVzc3VyZTogOTYxLjk4LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjYuOTIsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2MS45OCxcbiAgICAgICAgaHVtaWRpdHk6IDQ2LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxZCcgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMjEsIGRlZzogMTk2IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjAgMjE6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDU5NTIwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjkuMzYsXG4gICAgICAgIHRlbXBfbWluOiAyOS4zNixcbiAgICAgICAgdGVtcF9tYXg6IDI5LjM2LFxuICAgICAgICBwcmVzc3VyZTogOTYwLjMzLFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjUuMTMsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2MC4zMyxcbiAgICAgICAgaHVtaWRpdHk6IDQwLFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMjMsIGRlZzogMjA5LjUwMiB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIxIDAwOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA2MDYwMDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDI0Ljk2LFxuICAgICAgICB0ZW1wX21pbjogMjQuOTYsXG4gICAgICAgIHRlbXBfbWF4OiAyNC45NixcbiAgICAgICAgcHJlc3N1cmU6IDk2MC4xMyxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI1LjEzLFxuICAgICAgICBncm5kX2xldmVsOiA5NjAuMTMsXG4gICAgICAgIGh1bWlkaXR5OiA0NSxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjk2LCBkZWc6IDIwNi4wMDcgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMSAwMzowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNjE2ODAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAxOC45OSxcbiAgICAgICAgdGVtcF9taW46IDE4Ljk5LFxuICAgICAgICB0ZW1wX21heDogMTguOTksXG4gICAgICAgIHByZXNzdXJlOiA5NjAuNzIsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyNi4xNSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYwLjcyLFxuICAgICAgICBodW1pZGl0eTogNzIsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMC43MSwgZGVnOiAzMTMuNTAxIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjEgMDY6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDYyNzYwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMTYuNzcsXG4gICAgICAgIHRlbXBfbWluOiAxNi43NyxcbiAgICAgICAgdGVtcF9tYXg6IDE2Ljc3LFxuICAgICAgICBwcmVzc3VyZTogOTYwLjEyLFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjUuNjUsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2MC4xMixcbiAgICAgICAgaHVtaWRpdHk6IDc4LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDAuNzIsIGRlZzogNDcuMDAzIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjEgMDk6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDYzODQwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMTUuNTUsXG4gICAgICAgIHRlbXBfbWluOiAxNS41NSxcbiAgICAgICAgdGVtcF9tYXg6IDE1LjU1LFxuICAgICAgICBwcmVzc3VyZTogOTU5LjU3LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjUuMDksXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1OS41NyxcbiAgICAgICAgaHVtaWRpdHk6IDc4LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDAuNzIsIGRlZzogNDguMDAwNSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIxIDEyOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA2NDkyMDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDIxLjM2LFxuICAgICAgICB0ZW1wX21pbjogMjEuMzYsXG4gICAgICAgIHRlbXBfbWF4OiAyMS4zNixcbiAgICAgICAgcHJlc3N1cmU6IDk2MC4zNSxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI1Ljc4LFxuICAgICAgICBncm5kX2xldmVsOiA5NjAuMzUsXG4gICAgICAgIGh1bWlkaXR5OiA1OSxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMWQnIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjkyLCBkZWc6IDc3LjAwMjQgfSxcbiAgICAgIHN5czogeyBwb2Q6ICdkJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMSAxNTowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNjYwMDAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyOC4yNSxcbiAgICAgICAgdGVtcF9taW46IDI4LjI1LFxuICAgICAgICB0ZW1wX21heDogMjguMjUsXG4gICAgICAgIHByZXNzdXJlOiA5NjAuODcsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyNS44NCxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYwLjg3LFxuICAgICAgICBodW1pZGl0eTogNDUsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4yNiwgZGVnOiAyMDUuMDAyIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjEgMTg6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDY3MDgwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMzEsXG4gICAgICAgIHRlbXBfbWluOiAzMSxcbiAgICAgICAgdGVtcF9tYXg6IDMxLFxuICAgICAgICBwcmVzc3VyZTogOTYwLjI3LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjQuOSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYwLjI3LFxuICAgICAgICBodW1pZGl0eTogMzksXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4zMSwgZGVnOiAyMTUuNTAyIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjEgMjE6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDY4MTYwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMzAuODIsXG4gICAgICAgIHRlbXBfbWluOiAzMC44MixcbiAgICAgICAgdGVtcF9tYXg6IDMwLjgyLFxuICAgICAgICBwcmVzc3VyZTogOTU4Ljc5LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjMuMjgsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1OC43OSxcbiAgICAgICAgaHVtaWRpdHk6IDM4LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMzEsIGRlZzogMjIyLjAwMiB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIyIDAwOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA2OTI0MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDI2LjMxLFxuICAgICAgICB0ZW1wX21pbjogMjYuMzEsXG4gICAgICAgIHRlbXBfbWF4OiAyNi4zMSxcbiAgICAgICAgcHJlc3N1cmU6IDk1OC40NixcbiAgICAgICAgc2VhX2xldmVsOiAxMDIzLjIyLFxuICAgICAgICBncm5kX2xldmVsOiA5NTguNDYsXG4gICAgICAgIGh1bWlkaXR5OiA0NCxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjExLCBkZWc6IDIxMy41IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjIgMDM6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDcwMzIwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjAuNjIsXG4gICAgICAgIHRlbXBfbWluOiAyMC42MixcbiAgICAgICAgdGVtcF9tYXg6IDIwLjYyLFxuICAgICAgICBwcmVzc3VyZTogOTU5LjI2LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjQuMzMsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1OS4yNixcbiAgICAgICAgaHVtaWRpdHk6IDYyLFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDAuNzEsIGRlZzogMTU4LjUwMyB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIyIDA2OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA3MTQwMDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDE4LjczLFxuICAgICAgICB0ZW1wX21pbjogMTguNzMsXG4gICAgICAgIHRlbXBfbWF4OiAxOC43MyxcbiAgICAgICAgcHJlc3N1cmU6IDk1OC4yMSxcbiAgICAgICAgc2VhX2xldmVsOiAxMDIzLjQ4LFxuICAgICAgICBncm5kX2xldmVsOiA5NTguMjEsXG4gICAgICAgIGh1bWlkaXR5OiA3MCxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiA4MDIsXG4gICAgICAgICAgbWFpbjogJ0Nsb3VkcycsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdzY2F0dGVyZWQgY2xvdWRzJyxcbiAgICAgICAgICBpY29uOiAnMDNuJ1xuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMzYgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDAuOTEsIGRlZzogNzYuMDAyNCB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIyIDA5OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA3MjQ4MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDE3LjU0LFxuICAgICAgICB0ZW1wX21pbjogMTcuNTQsXG4gICAgICAgIHRlbXBfbWF4OiAxNy41NCxcbiAgICAgICAgcHJlc3N1cmU6IDk1Ny42MyxcbiAgICAgICAgc2VhX2xldmVsOiAxMDIzLjA0LFxuICAgICAgICBncm5kX2xldmVsOiA5NTcuNjMsXG4gICAgICAgIGh1bWlkaXR5OiA3NCxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjc3LCBkZWc6IDYwLjUwMDYgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMiAxMjowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNzM1NjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyMi4wNyxcbiAgICAgICAgdGVtcF9taW46IDIyLjA3LFxuICAgICAgICB0ZW1wX21heDogMjIuMDcsXG4gICAgICAgIHByZXNzdXJlOiA5NTguNzIsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMy45NSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU4LjcyLFxuICAgICAgICBodW1pZGl0eTogNTcsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4yMSwgZGVnOiAxMTMuMDAxIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjIgMTU6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDc0NjQwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjcuOTQsXG4gICAgICAgIHRlbXBfbWluOiAyNy45NCxcbiAgICAgICAgdGVtcF9tYXg6IDI3Ljk0LFxuICAgICAgICBwcmVzc3VyZTogOTU5LjE2LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjQuMDMsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1OS4xNixcbiAgICAgICAgaHVtaWRpdHk6IDQ5LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxZCcgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMjEsIGRlZzogMTk5LjUwOCB9LFxuICAgICAgc3lzOiB7IHBvZDogJ2QnIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIyIDE4OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA3NTcyMDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDMwLjkxLFxuICAgICAgICB0ZW1wX21pbjogMzAuOTEsXG4gICAgICAgIHRlbXBfbWF4OiAzMC45MSxcbiAgICAgICAgcHJlc3N1cmU6IDk1OC41MyxcbiAgICAgICAgc2VhX2xldmVsOiAxMDIzLjA1LFxuICAgICAgICBncm5kX2xldmVsOiA5NTguNTMsXG4gICAgICAgIGh1bWlkaXR5OiA0MyxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMmQnIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiA4IH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjI2LCBkZWc6IDIxNi4wMDggfSxcbiAgICAgIHN5czogeyBwb2Q6ICdkJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMiAyMTowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNzY4MDAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAzMC44OSxcbiAgICAgICAgdGVtcF9taW46IDMwLjg5LFxuICAgICAgICB0ZW1wX21heDogMzAuODksXG4gICAgICAgIHByZXNzdXJlOiA5NTcuMjYsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMS43MyxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU3LjI2LFxuICAgICAgICBodW1pZGl0eTogNDEsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4zNiwgZGVnOiAyMjQuNTAxIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjMgMDA6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDc3ODgwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjYuNDMsXG4gICAgICAgIHRlbXBfbWluOiAyNi40MyxcbiAgICAgICAgdGVtcF9tYXg6IDI2LjQzLFxuICAgICAgICBwcmVzc3VyZTogOTU3LjA4LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjEuOTMsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1Ny4wOCxcbiAgICAgICAgaHVtaWRpdHk6IDQ3LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMTYsIGRlZzogMjEyLjAwNSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIzIDAzOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA3ODk2MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDIxLjI4LFxuICAgICAgICB0ZW1wX21pbjogMjEuMjgsXG4gICAgICAgIHRlbXBfbWF4OiAyMS4yOCxcbiAgICAgICAgcHJlc3N1cmU6IDk1OC4zNSxcbiAgICAgICAgc2VhX2xldmVsOiAxMDIzLjUxLFxuICAgICAgICBncm5kX2xldmVsOiA5NTguMzUsXG4gICAgICAgIGh1bWlkaXR5OiA2MixcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjkyLCBkZWc6IDE5OS4wMDIgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMyAwNjowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwODAwNDAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAxOC44OCxcbiAgICAgICAgdGVtcF9taW46IDE4Ljg4LFxuICAgICAgICB0ZW1wX21heDogMTguODgsXG4gICAgICAgIHByZXNzdXJlOiA5NTcuNzksXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMy4xLFxuICAgICAgICBncm5kX2xldmVsOiA5NTcuNzksXG4gICAgICAgIGh1bWlkaXR5OiA3MixcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjc2LCBkZWc6IDUxLjUwMzQgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMyAwOTowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwODExMjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAxNy42MSxcbiAgICAgICAgdGVtcF9taW46IDE3LjYxLFxuICAgICAgICB0ZW1wX21heDogMTcuNjEsXG4gICAgICAgIHByZXNzdXJlOiA5NTcuMTYsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMi41NyxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU3LjE2LFxuICAgICAgICBodW1pZGl0eTogNzcsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMC43MiwgZGVnOiA3My41MDA0IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjMgMTI6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDgyMjAwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjEuNSxcbiAgICAgICAgdGVtcF9taW46IDIxLjUsXG4gICAgICAgIHRlbXBfbWF4OiAyMS41LFxuICAgICAgICBwcmVzc3VyZTogOTU4LjA0LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjMuNCxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU4LjA0LFxuICAgICAgICBodW1pZGl0eTogNjIsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4xNiwgZGVnOiA5MS41IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjMgMTU6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDgzMjgwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjcuOTYsXG4gICAgICAgIHRlbXBfbWluOiAyNy45NixcbiAgICAgICAgdGVtcF9tYXg6IDI3Ljk2LFxuICAgICAgICBwcmVzc3VyZTogOTU4LjMsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMy4yMixcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU4LjMsXG4gICAgICAgIGh1bWlkaXR5OiA1MSxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMWQnIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjIyLCBkZWc6IDIwNi4wMDUgfSxcbiAgICAgIHN5czogeyBwb2Q6ICdkJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMyAxODowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwODQzNjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAzMC42OCxcbiAgICAgICAgdGVtcF9taW46IDMwLjY4LFxuICAgICAgICB0ZW1wX21heDogMzAuNjgsXG4gICAgICAgIHByZXNzdXJlOiA5NTcuODMsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMi40MSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU3LjgzLFxuICAgICAgICBodW1pZGl0eTogNDYsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4yLCBkZWc6IDIxNS4wMDQgfSxcbiAgICAgIHN5czogeyBwb2Q6ICdkJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMyAyMTowMDowMCdcbiAgICB9XG4gIF0sXG4gIGNpdHk6IHtcbiAgICBpZDogNTM2ODM2MSxcbiAgICBuYW1lOiAnTG9zIEFuZ2VsZXMnLFxuICAgIGNvb3JkOiB7IGxhdDogMzQuMDUyMiwgbG9uOiAtMTE4LjI0MzcgfSxcbiAgICBjb3VudHJ5OiAnVVMnXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBDVVJSRU5UX1dBVEhFUl9NT0NLOiBDdXJyZW50V2VhdGhlciA9IHtcbiAgdGVtcDogMTYsXG4gIHByZXNzdXJlOiAxMDEyLFxuICBodW1pZGl0eTogOTMsXG4gIG1pblRlbXA6IDE2LFxuICBtYXhUZW1wOiAxNixcbiAgc3VucmlzZTogMTUwMDc3OTA5MixcbiAgc3Vuc2V0OiAxNTAwODM3MDQ1LFxuICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgaWNvblVybDogJ2h0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvMDFuLnBuZycsXG4gIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JyxcbiAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXN1bm55JyxcbiAgd2luZDogeyBkZWc6IDI0MCwgc3BlZWQ6IDIuMSB9XG59O1xuZXhwb3J0IGNvbnN0IEZPUkVDQVNUX01PQ0s6IEZvcmVjYXN0W10gPSBbXG4gIHtcbiAgICB0ZW1wOiAxMi4xNSxcbiAgICBwcmVzc3VyZTogMTAyMy4yNyxcbiAgICBodW1pZGl0eTogOTgsXG4gICAgbWluVGVtcDogMTIuMTUsXG4gICAgbWF4VGVtcDogMTIuODQsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXN1bm55JyxcbiAgICBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjRUMDA6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMjMwLFxuICAgICAgc3BlZWQ6IDEuMzFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxMi4xMixcbiAgICBwcmVzc3VyZTogMTAyMi40LFxuICAgIGh1bWlkaXR5OiA5NSxcbiAgICBtaW5UZW1wOiAxMi4xMixcbiAgICBtYXhUZW1wOiAxMi41NyxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktY2xvdWR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ3NjYXR0ZXJlZCBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI0VDAzOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDIxNC4wMDMsXG4gICAgICBzcGVlZDogMS4yMlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE2LjMzLFxuICAgIHByZXNzdXJlOiAxMDIxLjc1LFxuICAgIGh1bWlkaXR5OiAxMDAsXG4gICAgbWluVGVtcDogMTYuMzMsXG4gICAgbWF4VGVtcDogMTYuNTYsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjRUMDY6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMjA4LjUwMixcbiAgICAgIHNwZWVkOiAxLjg4XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTcuODMsXG4gICAgcHJlc3N1cmU6IDEwMjEuMDcsXG4gICAgaHVtaWRpdHk6IDEwMCxcbiAgICBtaW5UZW1wOiAxNy44MyxcbiAgICBtYXhUZW1wOiAxNy44MyxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNFQwOTowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAxNjAuNTAxLFxuICAgICAgc3BlZWQ6IDEuODFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxOS42NyxcbiAgICBwcmVzc3VyZTogMTAxOS44MixcbiAgICBodW1pZGl0eTogOTQsXG4gICAgbWluVGVtcDogMTkuNjcsXG4gICAgbWF4VGVtcDogMTkuNjcsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjRUMTI6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogNDYuMDA1OSxcbiAgICAgIHNwZWVkOiAyLjA2XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMjAuMzQsXG4gICAgcHJlc3N1cmU6IDEwMTguMzgsXG4gICAgaHVtaWRpdHk6IDgzLFxuICAgIG1pblRlbXA6IDIwLjM0LFxuICAgIG1heFRlbXA6IDIwLjM0LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1jbG91ZHknLFxuICAgIGRlc2NyaXB0aW9uOiAnc2NhdHRlcmVkIGNsb3VkcycsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjRUMTU6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogNTguMDAwNyxcbiAgICAgIHNwZWVkOiA0LjM3XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTkuMDgsXG4gICAgcHJlc3N1cmU6IDEwMTcuNTEsXG4gICAgaHVtaWRpdHk6IDc5LFxuICAgIG1pblRlbXA6IDE5LjA4LFxuICAgIG1heFRlbXA6IDE5LjA4LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1zdW5ueScsXG4gICAgZGVzY3JpcHRpb246ICdjbGVhciBza3knLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI0VDE4OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDUzLjUwMTEsXG4gICAgICBzcGVlZDogNC4xMlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE2LjUsXG4gICAgcHJlc3N1cmU6IDEwMTcuMTEsXG4gICAgaHVtaWRpdHk6IDkwLFxuICAgIG1pblRlbXA6IDE2LjUsXG4gICAgbWF4VGVtcDogMTYuNSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktY2xvdWR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ3NjYXR0ZXJlZCBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI0VDIxOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDYxLjAwMDksXG4gICAgICBzcGVlZDogNC4zMlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE1Ljc0LFxuICAgIHByZXNzdXJlOiAxMDE2LjIyLFxuICAgIGh1bWlkaXR5OiA5MyxcbiAgICBtaW5UZW1wOiAxNS43NCxcbiAgICBtYXhUZW1wOiAxNS43NCxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktY2xvdWR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ3NjYXR0ZXJlZCBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI1VDAwOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDYxLjAwMjMsXG4gICAgICBzcGVlZDogNS4yMVxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE0LjczLFxuICAgIHByZXNzdXJlOiAxMDE1LjQ4LFxuICAgIGh1bWlkaXR5OiA5MSxcbiAgICBtaW5UZW1wOiAxNC43MyxcbiAgICBtYXhUZW1wOiAxNC43MyxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktY2xvdWR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ292ZXJjYXN0IGNsb3VkcycsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjVUMDM6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogNTUuNTAxMSxcbiAgICAgIHNwZWVkOiA1LjhcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNS45NixcbiAgICBwcmVzc3VyZTogMTAxNC41OSxcbiAgICBodW1pZGl0eTogOTEsXG4gICAgbWluVGVtcDogMTUuOTYsXG4gICAgbWF4VGVtcDogMTUuOTYsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LWNsb3VkeScsXG4gICAgZGVzY3JpcHRpb246ICdvdmVyY2FzdCBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI1VDA2OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDUwLjAwMjYsXG4gICAgICBzcGVlZDogNi4yNlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE3LjMyLFxuICAgIHByZXNzdXJlOiAxMDEzLjY1LFxuICAgIGh1bWlkaXR5OiA4OCxcbiAgICBtaW5UZW1wOiAxNy4zMixcbiAgICBtYXhUZW1wOiAxNy4zMixcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNVQwOTowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzOC4wMDE4LFxuICAgICAgc3BlZWQ6IDYuMzJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy45NCxcbiAgICBwcmVzc3VyZTogMTAxMy4xLFxuICAgIGh1bWlkaXR5OiA4OSxcbiAgICBtaW5UZW1wOiAxNy45NCxcbiAgICBtYXhUZW1wOiAxNy45NCxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNVQxMjowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzNC4wMDAxLFxuICAgICAgc3BlZWQ6IDYuNzFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxOC4zMyxcbiAgICBwcmVzc3VyZTogMTAxMi4zNCxcbiAgICBodW1pZGl0eTogODgsXG4gICAgbWluVGVtcDogMTguMzMsXG4gICAgbWF4VGVtcDogMTguMzMsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjVUMTU6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMjIuNTAwNSxcbiAgICAgIHNwZWVkOiA2LjI4XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTguMTIsXG4gICAgcHJlc3N1cmU6IDEwMTIuMjMsXG4gICAgaHVtaWRpdHk6IDk0LFxuICAgIG1pblRlbXA6IDE4LjEyLFxuICAgIG1heFRlbXA6IDE4LjEyLFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI1VDE4OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDM1LjUwMzEsXG4gICAgICBzcGVlZDogNC43NlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE3LjI5LFxuICAgIHByZXNzdXJlOiAxMDEyLjE4LFxuICAgIGh1bWlkaXR5OiA5NyxcbiAgICBtaW5UZW1wOiAxNy4yOSxcbiAgICBtYXhUZW1wOiAxNy4yOSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNVQyMTowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAxOS4wMDE2LFxuICAgICAgc3BlZWQ6IDQuN1xuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE2LjcsXG4gICAgcHJlc3N1cmU6IDEwMTEuODMsXG4gICAgaHVtaWRpdHk6IDk5LFxuICAgIG1pblRlbXA6IDE2LjcsXG4gICAgbWF4VGVtcDogMTYuNyxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdtb2RlcmF0ZSByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNlQwMDowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiA1LjUwMjkzLFxuICAgICAgc3BlZWQ6IDQuOTFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNi45MSxcbiAgICBwcmVzc3VyZTogMTAxMC43MixcbiAgICBodW1pZGl0eTogMTAwLFxuICAgIG1pblRlbXA6IDE2LjkxLFxuICAgIG1heFRlbXA6IDE2LjkxLFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2hlYXZ5IGludGVuc2l0eSByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNlQwMzowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzLjUwMTM3LFxuICAgICAgc3BlZWQ6IDUuNzFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy41MSxcbiAgICBwcmVzc3VyZTogMTAxMC41MixcbiAgICBodW1pZGl0eTogMTAwLFxuICAgIG1pblRlbXA6IDE3LjUxLFxuICAgIG1heFRlbXA6IDE3LjUxLFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ21vZGVyYXRlIHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI2VDA2OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDEwLjAwMjEsXG4gICAgICBzcGVlZDogNi4wN1xuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE3LjgsXG4gICAgcHJlc3N1cmU6IDEwMTAuODcsXG4gICAgaHVtaWRpdHk6IDk5LFxuICAgIG1pblRlbXA6IDE3LjgsXG4gICAgbWF4VGVtcDogMTcuOCxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdtb2RlcmF0ZSByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNlQwOTowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzNTIuMDA2LFxuICAgICAgc3BlZWQ6IDcuMDVcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy4zMSxcbiAgICBwcmVzc3VyZTogMTAxMS40MyxcbiAgICBodW1pZGl0eTogMTAwLFxuICAgIG1pblRlbXA6IDE3LjMxLFxuICAgIG1heFRlbXA6IDE3LjMxLFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ21vZGVyYXRlIHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI2VDEyOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDM0MSxcbiAgICAgIHNwZWVkOiA3Ljg2XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTYuOTUsXG4gICAgcHJlc3N1cmU6IDEwMTIuMTUsXG4gICAgaHVtaWRpdHk6IDEwMCxcbiAgICBtaW5UZW1wOiAxNi45NSxcbiAgICBtYXhUZW1wOiAxNi45NSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdoZWF2eSBpbnRlbnNpdHkgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjZUMTU6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMzQxLjAwMyxcbiAgICAgIHNwZWVkOiA5LjM2XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTYuNSxcbiAgICBwcmVzc3VyZTogMTAxMy4wNyxcbiAgICBodW1pZGl0eTogMTAwLFxuICAgIG1pblRlbXA6IDE2LjUsXG4gICAgbWF4VGVtcDogMTYuNSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdtb2RlcmF0ZSByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNlQxODowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzMzUuNTAzLFxuICAgICAgc3BlZWQ6IDkuMDJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNi41MixcbiAgICBwcmVzc3VyZTogMTAxNC4yNCxcbiAgICBodW1pZGl0eTogOTgsXG4gICAgbWluVGVtcDogMTYuNTIsXG4gICAgbWF4VGVtcDogMTYuNTIsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbW9kZXJhdGUgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjZUMjE6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMzMyLjUwNCxcbiAgICAgIHNwZWVkOiA4LjM2XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTYuNTIsXG4gICAgcHJlc3N1cmU6IDEwMTQuOTEsXG4gICAgaHVtaWRpdHk6IDk4LFxuICAgIG1pblRlbXA6IDE2LjUyLFxuICAgIG1heFRlbXA6IDE2LjUyLFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI3VDAwOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDMyNS4wMDIsXG4gICAgICBzcGVlZDogNi45MlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE1LjU0LFxuICAgIHByZXNzdXJlOiAxMDE1LjE4LFxuICAgIGh1bWlkaXR5OiA5OSxcbiAgICBtaW5UZW1wOiAxNS41NCxcbiAgICBtYXhUZW1wOiAxNS41NCxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yN1QwMzowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzMTcuNSxcbiAgICAgIHNwZWVkOiA2LjAzXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTYuODQsXG4gICAgcHJlc3N1cmU6IDEwMTUuMjksXG4gICAgaHVtaWRpdHk6IDk4LFxuICAgIG1pblRlbXA6IDE2Ljg0LFxuICAgIG1heFRlbXA6IDE2Ljg0LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1jbG91ZHknLFxuICAgIGRlc2NyaXB0aW9uOiAnZmV3IGNsb3VkcycsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjdUMDY6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMzExLjAwMixcbiAgICAgIHNwZWVkOiA1LjkxXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTkuNDksXG4gICAgcHJlc3N1cmU6IDEwMTUuMjMsXG4gICAgaHVtaWRpdHk6IDk0LFxuICAgIG1pblRlbXA6IDE5LjQ5LFxuICAgIG1heFRlbXA6IDE5LjQ5LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1zdW5ueScsXG4gICAgZGVzY3JpcHRpb246ICdjbGVhciBza3knLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI3VDA5OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDMxMC41MDMsXG4gICAgICBzcGVlZDogNS4xMlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDIxLjI1LFxuICAgIHByZXNzdXJlOiAxMDE0LjgzLFxuICAgIGh1bWlkaXR5OiA5MCxcbiAgICBtaW5UZW1wOiAyMS4yNSxcbiAgICBtYXhUZW1wOiAyMS4yNSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktc3VubnknLFxuICAgIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yN1QxMjowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzMDQuMDA2LFxuICAgICAgc3BlZWQ6IDMuNThcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAyMi4wMyxcbiAgICBwcmVzc3VyZTogMTAxMy44OSxcbiAgICBodW1pZGl0eTogODcsXG4gICAgbWluVGVtcDogMjIuMDMsXG4gICAgbWF4VGVtcDogMjIuMDMsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXN1bm55JyxcbiAgICBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjdUMTU6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMjc0LjAwMixcbiAgICAgIHNwZWVkOiAyLjA3XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTkuNCxcbiAgICBwcmVzc3VyZTogMTAxMy43NCxcbiAgICBodW1pZGl0eTogOTMsXG4gICAgbWluVGVtcDogMTkuNCxcbiAgICBtYXhUZW1wOiAxOS40LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI3VDE4OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDIzMy4wMDEsXG4gICAgICBzcGVlZDogMy44NlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE3LjYxLFxuICAgIHByZXNzdXJlOiAxMDEzLjgyLFxuICAgIGh1bWlkaXR5OiA5OSxcbiAgICBtaW5UZW1wOiAxNy42MSxcbiAgICBtYXhUZW1wOiAxNy42MSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdtb2RlcmF0ZSByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yN1QyMTowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAyNDUuNTAxLFxuICAgICAgc3BlZWQ6IDMuNjZcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy41OCxcbiAgICBwcmVzc3VyZTogMTAxMy42MSxcbiAgICBodW1pZGl0eTogOTgsXG4gICAgbWluVGVtcDogMTcuNTgsXG4gICAgbWF4VGVtcDogMTcuNTgsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjhUMDA6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMjMxLFxuICAgICAgc3BlZWQ6IDQuMjJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy4xOSxcbiAgICBwcmVzc3VyZTogMTAxNC4zNyxcbiAgICBodW1pZGl0eTogMTAwLFxuICAgIG1pblRlbXA6IDE3LjE5LFxuICAgIG1heFRlbXA6IDE3LjE5LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI4VDAzOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDI3Ni4wMDYsXG4gICAgICBzcGVlZDogNS41MlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE2LjMzLFxuICAgIHByZXNzdXJlOiAxMDE2LjA5LFxuICAgIGh1bWlkaXR5OiA5OCxcbiAgICBtaW5UZW1wOiAxNi4zMyxcbiAgICBtYXhUZW1wOiAxNi4zMyxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yOFQwNjowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAyODIuMDEyLFxuICAgICAgc3BlZWQ6IDYuMDFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy4zOSxcbiAgICBwcmVzc3VyZTogMTAxOC4yOCxcbiAgICBodW1pZGl0eTogOTQsXG4gICAgbWluVGVtcDogMTcuMzksXG4gICAgbWF4VGVtcDogMTcuMzksXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjhUMDk6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMjg3LjUsXG4gICAgICBzcGVlZDogNi41MlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE4LjYzLFxuICAgIHByZXNzdXJlOiAxMDIwLjEsXG4gICAgaHVtaWRpdHk6IDkwLFxuICAgIG1pblRlbXA6IDE4LjYzLFxuICAgIG1heFRlbXA6IDE4LjYzLFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1jbG91ZHknLFxuICAgIGRlc2NyaXB0aW9uOiAnZmV3IGNsb3VkcycsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjhUMTI6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMjg0LjUsXG4gICAgICBzcGVlZDogNi44MVxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE4LjY5LFxuICAgIHByZXNzdXJlOiAxMDIxLjY3LFxuICAgIGh1bWlkaXR5OiA4NCxcbiAgICBtaW5UZW1wOiAxOC42OSxcbiAgICBtYXhUZW1wOiAxOC42OSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktY2xvdWR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ3NjYXR0ZXJlZCBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI4VDE1OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDI4OSxcbiAgICAgIHNwZWVkOiA2LjUyXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTcuMjgsXG4gICAgcHJlc3N1cmU6IDEwMjMuMjIsXG4gICAgaHVtaWRpdHk6IDg1LFxuICAgIG1pblRlbXA6IDE3LjI4LFxuICAgIG1heFRlbXA6IDE3LjI4LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI4VDE4OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDI4MS41MDEsXG4gICAgICBzcGVlZDogNC45MVxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE1LjQyLFxuICAgIHByZXNzdXJlOiAxMDI0LjYzLFxuICAgIGh1bWlkaXR5OiA4NixcbiAgICBtaW5UZW1wOiAxNS40MixcbiAgICBtYXhUZW1wOiAxNS40MixcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktY2xvdWR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ2ZldyBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI4VDIxOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDI3Ny41MDIsXG4gICAgICBzcGVlZDogNC40NlxuICAgIH1cbiAgfVxuXTtcbiIsImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQge1xuICBXZWF0aGVyQXBpQ29uZmlnLFxuICBXZWF0aGVyQXBpTmFtZSxcbiAgV2VhdGhlckFwaVNlcnZpY2Vcbn0gZnJvbSAnLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBQb29saW5nU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcG9saW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlckNvbnRhaW5lciB9IGZyb20gJy4vd2VhdGhlci5jb250YWluZXInO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFdlYXRoZXJJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItaWNvbi93ZWF0aGVyLWljb24uY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJDdXJyZW50RGVzY3JpcHRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LWRlc2NyaXB0aW9uL3dlYXRoZXItY3VycmVudC1kZXNjcmlwdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckN1cnJlbnRUZW1wQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZS9jdXJyZW50LXRlbXBlcmF0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyQWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWFjdGlvbnMvYWN0aW9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckxvY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItbG9jYXRpb24vd2VhdGhlci1sb2NhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckN1cnJlbnRXaW5kQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC13aW5kL3dlYXRoZXItY3VycmVudC13aW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcGVuV2VhdGhlck1hcEFwaVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2FwaS9vcGVuLXdlYXRoZXItbWFwL29wZW4td2VhdGhlci1tYXAuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlckN1cnJlbnREZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC1kZXRhaWxzL3dlYXRoZXItY3VycmVudC1kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC93ZWF0aGVyLWZvcmVjYXN0LmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFdlYXRoZXJGb3JlY2FzdFNpbXBsZUdyaWRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckZvcmVjYXN0R3JpZERheUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LXNpbXBsZS1ncmlkL3dlYXRoZXItZm9yZWNhc3QtZ3JpZC1kYXkuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJGb3JlY2FzdERldGFpbGVkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3QtZGV0YWlsZWQvZm9yZWNhc3QtZGV0YWlsZWQuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJGb3JlY2FzdERldGFpbERheUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LWRldGFpbGVkL2ZvcmVjYXN0LWRldGFpbGVkLWRheS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2hhcnQvY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJGb3JlY2FzdENoYXJ0V2lkZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LXNpbXBsZS1ncmlkL2ZvcmVjYXN0LWNoYXJ0LXdpZGUuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJIZWxwZXJzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvd2VhdGhlci1oZWxwZXJzLnNlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBpU2VydmljZUZhY3RvcnkoXG4gIGh0dHA6IEh0dHAsXG4gIHBvb2xpbmc6IFBvb2xpbmdTZXJ2aWNlLFxuICBvcGVuV2VhdGhlcjogV2VhdGhlckFwaUNvbmZpZ1xuKSB7XG4gIHN3aXRjaCAob3BlbldlYXRoZXIubmFtZSkge1xuICAgIGNhc2UgV2VhdGhlckFwaU5hbWUuT1BFTl9XRUFUSEVSX01BUDpcbiAgICAgIHJldHVybiBuZXcgT3BlbldlYXRoZXJNYXBBcGlTZXJ2aWNlKGh0dHAsIHBvb2xpbmcsIG9wZW5XZWF0aGVyKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG5ldyBPcGVuV2VhdGhlck1hcEFwaVNlcnZpY2UoaHR0cCwgcG9vbGluZywgb3BlbldlYXRoZXIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JSb290KGNvbmZpZzogV2VhdGhlckFwaUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICByZXR1cm4ge1xuICAgIG5nTW9kdWxlOiBBbmd1bGFyV2VhdGhlcldpZGdldE1vZHVsZSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgIFBvb2xpbmdTZXJ2aWNlLFxuICAgICAgV2VhdGhlckhlbHBlcnNTZXJ2aWNlLFxuICAgICAge1xuICAgICAgICBwcm92aWRlOiBXZWF0aGVyQXBpU2VydmljZSxcbiAgICAgICAgdXNlRmFjdG9yeTogYXBpU2VydmljZUZhY3RvcnksXG4gICAgICAgIGRlcHM6IFtIdHRwLCBQb29saW5nU2VydmljZSwgJ1dFQVRIRVJfQ09ORklHJ11cbiAgICAgIH0sXG4gICAgICB7IHByb3ZpZGU6ICdXRUFUSEVSX0NPTkZJRycsIHVzZVZhbHVlOiBjb25maWcgfVxuICAgIF1cbiAgfTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENoYXJ0Q29tcG9uZW50LFxuICAgIFdlYXRoZXJDb250YWluZXIsXG4gICAgV2VhdGhlckN1cnJlbnRUZW1wQ29tcG9uZW50LFxuICAgIFdlYXRoZXJBY3Rpb25zQ29tcG9uZW50LFxuICAgIFdlYXRoZXJJY29uQ29tcG9uZW50LFxuICAgIFdlYXRoZXJDdXJyZW50RGVzY3JpcHRpb25Db21wb25lbnQsXG4gICAgV2VhdGhlckxvY2F0aW9uQ29tcG9uZW50LFxuICAgIFdlYXRoZXJDdXJyZW50V2luZENvbXBvbmVudCxcbiAgICBXZWF0aGVyQ3VycmVudERldGFpbHNDb21wb25lbnQsXG4gICAgV2VhdGhlckZvcmVjYXN0Q29tcG9uZW50LFxuICAgIFdlYXRoZXJGb3JlY2FzdEdyaWREYXlDb21wb25lbnQsXG4gICAgV2VhdGhlckZvcmVjYXN0U2ltcGxlR3JpZENvbXBvbmVudCxcbiAgICBXZWF0aGVyRm9yZWNhc3REZXRhaWxlZENvbXBvbmVudCxcbiAgICBXZWF0aGVyRm9yZWNhc3REZXRhaWxEYXlDb21wb25lbnQsXG4gICAgV2VhdGhlckZvcmVjYXN0Q2hhcnRXaWRlQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtXZWF0aGVyQ29udGFpbmVyXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyV2VhdGhlcldpZGdldE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgc3RhdGljIGZvclJvb3QgPSBmb3JSb290O1xufVxuZXhwb3J0ICogZnJvbSAnLi93ZWF0aGVyLmludGVyZmFjZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2Nrcy9vcGVuLXdlYXRoZXItbWFwLm1vY2snO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5leHBvcnQgeyBUZW1wZXJhdHVyZVNjYWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZS9jdXJyZW50LXRlbXBlcmF0dXJlLmNvbXBvbmVudCc7XG4iXSwibmFtZXMiOlsiVGVtcGVyYXR1cmVTY2FsZSIsInRzbGliXzEuX19leHRlbmRzIiwibWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtJQU9FLHdCQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtLQUFJOzs7Ozs7OztJQUdwQyxnQ0FBTzs7Ozs7O0lBQVAsVUFDRSxTQUE4QixFQUM5QixTQUF3QjtRQUYxQixpQkFrQ0M7UUFoQ0MsMEJBQUEsRUFBQSxnQkFBd0I7UUFFeEIscUJBQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUIscUJBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFxQjtZQUNyRCxxQkFBSSxHQUFpQixDQUFDO1lBQ3RCLEtBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQzFCLHFCQUFNLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN2QixHQUFHLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztxQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDekIsU0FBUyxDQUFDO29CQUNULElBQUk7Ozs7OEJBQUMsTUFBTTt3QkFDVCxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUNQLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3ZCLENBQUMsQ0FBQztxQkFDSjtvQkFDRCxLQUFLOzs7OzhCQUFDLEdBQUc7d0JBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDUCxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNyQixDQUFDLENBQUM7cUJBQ0o7aUJBQ0YsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1lBRUgsT0FBTztnQkFDTCxJQUFJLEdBQUcsRUFBRTtvQkFDUCxHQUFHLENBQUMs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
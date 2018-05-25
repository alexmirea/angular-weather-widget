(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/http'), require('tslib'), require('chart.js'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-weather-widget', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/http', 'tslib', 'chart.js', '@angular/common'], factory) :
    (factory((global['angular-weather-widget'] = {}),global.ng.core,null,global.Rx.Observable.prototype,global.ng.http,global.tslib,null,global.ng.common));
}(this, (function (exports,core,rxjs,operators,http,tslib_1,chart_js,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var PoolingService = (function () {
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
                if (frequency === void 0) {
                    frequency = 1000;
                }
                var /** @type {?} */ subject = new rxjs.Subject();
                var /** @type {?} */ source = rxjs.Observable.create(function (observer) {
                    var /** @type {?} */ sub;
                    _this.zone.runOutsideAngular(function () {
                        var /** @type {?} */ zone = _this.zone;
                        sub = rxjs.interval(frequency)
                            .pipe(operators.mergeMap(operation))
                            .subscribe({
                            next: /**
                             * @param {?} result
                             * @return {?}
                             */ function (result) {
                                zone.run(function () {
                                    observer.next(result);
                                });
                            },
                            error: /**
                             * @param {?} err
                             * @return {?}
                             */ function (err) {
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
                    .pipe(operators.multicast(subject), operators.refCount(), operators.merge(operation()));
            };
        PoolingService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        PoolingService.ctorParameters = function () {
            return [
                { type: core.NgZone, },
            ];
        };
        return PoolingService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @abstract
     */
    var WeatherApiService = (function () {
        function WeatherApiService(http$$1, poolingService, apiConfig) {
            this.http = http$$1;
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
                return this.callApi(queryParams, '/weather').pipe(operators.map(this.mapCurrentWeatherResponse.bind(this)));
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
                return this.callApi(queryParams, '/forecast').pipe(operators.map(this.mapForecastResponse.bind(this)));
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
                    .pipe(operators.map(function (resp) { return resp.json(); }), operators.filter(function (el) { return !!el; }));
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
                return new http.RequestOptions({
                    headers: new http.Headers(),
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
                var /** @type {?} */ queryParams = new http.URLSearchParams();
                queryParams.set(this.setTokenKey(), this.apiConfig.key);
                for (var /** @type {?} */ key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        queryParams.set(key.toString(), obj[key]);
                    }
                }
                return queryParams;
            };
        WeatherApiService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        WeatherApiService.ctorParameters = function () {
            return [
                { type: http.Http, },
                { type: PoolingService, },
                { type: WeatherApiConfig, decorators: [{ type: core.Inject, args: ['WEATHER_CONFIG',] },] },
            ];
        };
        return WeatherApiService;
    }());
    var WeatherApiConfig = (function () {
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
    var WeatherSettings = (function () {
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
    var WeatherContainer = (function () {
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
             */ function () {
                return this._settings;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
                        selector: 'weather-widget',
                        changeDetection: core.ChangeDetectionStrategy.Default,
                        styles: [
                            "\n             :host {\n               display: flex;\n               position: relative;\n               padding: 1em;\n               box-sizing: border-box;\n             }\n             .info {\n               display: flex;\n               flex-direction: column;\n               align-items: center;\n               justify-content: center;\n               width: 100%;\n             }\n             .info.wide {\n               flex-direction: row;\n             }\n             .wide .current {\n               flex-grow: 0;\n             }\n             .wide .forecast {\n               flex-grow: 1;\n               overflow-y: auto;\n               height: 100%;\n             }\n             .current {\n               display: flex;\n               flex-direction: column;\n               align-items: center;\n               justify-content: center;\n               min-width: 140px;\n             }\n             .forecast {\n               min-width: 200px;\n               width: 100%;\n               overflow-y: auto;\n             }\n             .current, .forecast {\n               padding: 0.5em;\n             }\n             weather-actions {\n               display: block;\n               position: absolute;\n               top: 10px;\n               right: 10px;\n             }\n             weather-current-temperature.big {\n               font-size: 3em;\n             }\n             weather-icon.big {\n               font-size: 6em;\n               padding: 0.15em;\n             }\n             .empty {\n               flex-direction: row;\n             }\n             .empty i {\n               font-size: 3em;\n               margin-right: 0.3em;\n             }\n\n           "
                        ],
                        template: "\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css\">\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons-wind.min.css\">\n    <div *ngIf=\"currentWeather\" class=\"info\" [class.wide]=\"isWideLayout\">\n      <div class=\"current\">\n        <weather-icon\n          class=\"big\"\n          [iconImageUrl]=\"currentWeather?.iconUrl\"\n          [iconClass]=\"currentWeather?.iconClass\"></weather-icon>\n        <weather-current-description\n          [descripion]=\"currentWeather?.description\"></weather-current-description>\n        <weather-current-wind\n          *ngIf=\"settings.showWind\"\n          [scale]=\"settings.scale\"\n          [deg]=\"currentWeather?.wind.deg\"\n          [speed]=\"currentWeather?.wind.speed\"></weather-current-wind>\n        <weather-location [place]=\"currentWeather?.location\"></weather-location>\n        <weather-current-temperature\n          class=\"big\"\n          [temp]=\"currentWeather?.temp\"\n          [deg]=\"settings.scale\"></weather-current-temperature>\n        <weather-current-details\n          *ngIf=\"settings.showDetails\"\n          [maxTemp]=\"currentWeather?.maxTemp\"\n          [minTemp]=\"currentWeather?.minTemp\"\n          [pressure]=\"currentWeather?.pressure\"\n          [humidity]=\"currentWeather?.humidity\"></weather-current-details>\n      </div>\n      <div class=\"forecast\" *ngIf=\"settings.showForecast\">\n        <weather-forecast\n          [forecast]=\"forecast\"\n          [settings]=\"settings\"\n          [mode]=\"settings.forecastMode\"></weather-forecast>\n      </div>\n    </div>\n    <div *ngIf=\"!currentWeather\" class=\"info empty\">\n      <i class=\"wi wi-sunrise\"></i>\n      No weather data...\n    </div>\n    <weather-actions *ngIf=\"isMouseOn\" (update)=\"getWeather()\"></weather-actions>\n\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherContainer.ctorParameters = function () {
            return [
                { type: WeatherApiService, },
                { type: core.ChangeDetectorRef, },
                { type: core.Renderer2, },
                { type: core.ElementRef, },
            ];
        };
        WeatherContainer.propDecorators = {
            "background": [{ type: core.HostBinding, args: ['style.background',] },],
            "color": [{ type: core.HostBinding, args: ['style.color',] },],
            "width": [{ type: core.HostBinding, args: ['style.width',] },],
            "height": [{ type: core.HostBinding, args: ['style.height',] },],
            "forecast": [{ type: core.Input },],
            "currentWeather": [{ type: core.Input },],
            "settings": [{ type: core.Input },],
            "onMouseEnter": [{ type: core.HostListener, args: ['mouseenter',] },],
            "onMouseLeave": [{ type: core.HostListener, args: ['mouseleave',] },],
        };
        return WeatherContainer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherIconComponent = (function () {
        function WeatherIconComponent() {
        }
        WeatherIconComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'weather-icon',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [""],
                        template: "\n    <i *ngIf=\"iconClass\" [class]=\"iconClass\"></i>\n    <img *ngIf=\"iconImageUrl && !iconClass\" [src]=\"iconImageUrl\">\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherIconComponent.propDecorators = {
            "iconClass": [{ type: core.Input },],
            "iconImageUrl": [{ type: core.Input },],
            "title": [{ type: core.Input },],
        };
        return WeatherIconComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherCurrentDescriptionComponent = (function () {
        function WeatherCurrentDescriptionComponent() {
        }
        WeatherCurrentDescriptionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'weather-current-description',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n           :host {\n             display: block;\n             text-align: center;\n           }\n           "
                        ],
                        template: "\n    {{ descripion | uppercase}}\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherCurrentDescriptionComponent.propDecorators = {
            "descripion": [{ type: core.Input },],
        };
        return WeatherCurrentDescriptionComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherCurrentTempComponent = (function () {
        function WeatherCurrentTempComponent() {
            this._deg = TemperatureScale$1.CELCIUS;
        }
        Object.defineProperty(WeatherCurrentTempComponent.prototype, "deg", {
            get: /**
             * @return {?}
             */ function () {
                return this._deg;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
                        selector: 'weather-current-temperature',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n  :host {\n    display: block;\n    line-height: 1.1em;\n  }\n    .deg {\n      letter-spacing: -0.13em;\n      position: relative;\n      left: -0.2em;\n    }\n  "
                        ],
                        template: "\n      {{ temp?.toFixed() }} <span *ngIf=\"temp\" class=\"deg\">&deg; {{ unitSymbol }}</span>\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherCurrentTempComponent.propDecorators = {
            "temp": [{ type: core.Input },],
            "deg": [{ type: core.Input },],
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
    var WeatherActionsComponent = (function () {
        function WeatherActionsComponent() {
            this.update = new core.EventEmitter();
        }
        WeatherActionsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'weather-actions',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n    button {\n      border: none;\n      background: transparent;\n      cursor: pointer;\n      font-size: 1.6em;\n      border-radius: 50%;\n      color: inherit;\n    }\n    button:hover {\n      background: rgba(0,0,0, 0.1);\n    }\n  "
                        ],
                        template: "\n    <button (click)=\"update.emit()\"><i class=\"wi wi-refresh\"></i></button>\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherActionsComponent.propDecorators = {
            "update": [{ type: core.Output },],
        };
        return WeatherActionsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherLocationComponent = (function () {
        function WeatherLocationComponent() {
        }
        WeatherLocationComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'weather-location',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n    :host {\n      margin-top: 1em;\n      font-size: 1em;\n    }\n  "
                        ],
                        template: "\n    {{ place }}\n\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherLocationComponent.propDecorators = {
            "place": [{ type: core.Input },],
        };
        return WeatherLocationComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherCurrentWindComponent = (function () {
        function WeatherCurrentWindComponent() {
        }
        Object.defineProperty(WeatherCurrentWindComponent.prototype, "scale", {
            get: /**
             * @return {?}
             */ function () {
                return this._scale;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._scale = value;
                this.unit = this.mapScaleToText(this._scale);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WeatherCurrentWindComponent.prototype, "deg", {
            get: /**
             * @return {?}
             */ function () {
                return this._deg;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
                        selector: 'weather-current-wind',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n    :host {\n      display: flex;\n      justify-content: space-around;\n      align-items: center;\n      font-size: 0.8em;\n      min-height: 1.3em;\n    }\n    i {\n      margin-left: 0.3em;\n      font-size: 1.6em;\n    }\n  "
                        ],
                        template: "\n    <span>Wind {{ speed }} {{ unit }}</span>\n   <i [class]=\"windIcon\"></i>\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherCurrentWindComponent.propDecorators = {
            "scale": [{ type: core.Input },],
            "deg": [{ type: core.Input },],
            "speed": [{ type: core.Input },],
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
    var OpenWeatherMapApiService = (function (_super) {
        tslib_1.__extends(OpenWeatherMapApiService, _super);
        function OpenWeatherMapApiService(http$$1, poolingService, apiConfig) {
            var _this = _super.call(this, http$$1, poolingService, apiConfig) || this;
            _this.http = http$$1;
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        OpenWeatherMapApiService.ctorParameters = function () {
            return [
                { type: http.Http, },
                { type: PoolingService, },
                { type: WeatherApiConfig, },
            ];
        };
        return OpenWeatherMapApiService;
    }(WeatherApiService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherCurrentDetailsComponent = (function () {
        function WeatherCurrentDetailsComponent() {
        }
        WeatherCurrentDetailsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'weather-current-details',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n    :host {\n      font-size: 0.8em;\n      text-align: center;\n      margin-top: 1em;\n    }\n    .row {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: center;\n      align-items: center;\n    }\n    .row span {\n      margin: 0 0.3em;\n    }\n    .wi {\n      margin-right: 0.3em;\n    }\n  "
                        ],
                        template: "\n    <div class=\"row\">\n      <i class=\"wi wi-thermometer\"></i>\n      <span>\n          <span>Min: {{minTemp}}&deg;</span>\n          <span>Max: {{maxTemp}}&deg;</span>\n      </span>\n\n    </div>\n    <div class=\"row\">\n      <span><i class=\"wi wi-barometer\"></i>Pressure: {{pressure}}</span>\n      <span><i class=\"wi wi-humidity\"></i>Humidity: {{humidity}}%</span>\n    </div>\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherCurrentDetailsComponent.propDecorators = {
            "maxTemp": [{ type: core.Input },],
            "minTemp": [{ type: core.Input },],
            "pressure": [{ type: core.Input },],
            "humidity": [{ type: core.Input },],
        };
        return WeatherCurrentDetailsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherForecastComponent = (function () {
        function WeatherForecastComponent() {
            this.isGridForecast = true;
        }
        Object.defineProperty(WeatherForecastComponent.prototype, "mode", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
             */ function () {
                return this._forecast;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (!value) {
                    return;
                }
                this._forecast = value;
            },
            enumerable: true,
            configurable: true
        });
        WeatherForecastComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'weather-forecast',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n             :host {\n               margin-top: 1em;\n               display: block;\n               width: 100%;\n               box-sizing: border-box;\n             }\n           "
                        ],
                        template: "\n    <weather-forecast-simple-grid\n      *ngIf=\"isGridForecast\"\n      [forecast]=\"forecast\"></weather-forecast-simple-grid>\n    <weather-forecast-detailed\n      *ngIf=\"!isGridForecast\"\n      [settings]=\"settings\"\n      [forecast]=\"forecast\"></weather-forecast-detailed>\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherForecastComponent.propDecorators = {
            "mode": [{ type: core.Input },],
            "settings": [{ type: core.Input },],
            "forecast": [{ type: core.Input },],
        };
        return WeatherForecastComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherHelpersService = (function () {
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
                var /** @type {?} */ map = {};
                var /** @type {?} */ result = [];
                list.forEach(function (el) {
                    var /** @type {?} */ day = el.data.getUTCDate();
                    if (!map[day]) {
                        map[day] = [el];
                    }
                    else {
                        map[day].push(el);
                    }
                });
                result = Object.keys(map).map(function (key) { return map[key]; });
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
                if (borderColor === void 0) {
                    borderColor = '#aaa';
                }
                return forecast.reduce(function (prev, curr) {
                    if (prev.labels) {
                        prev.labels.push(curr.data.toISOString());
                    }
                    if (prev.datasets && prev.datasets[0] && prev.datasets[0].data) {
                        var /** @type {?} */ data = (prev.datasets[0].data);
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        WeatherHelpersService.ctorParameters = function () { return []; };
        return WeatherHelpersService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherForecastSimpleGridComponent = (function () {
        function WeatherForecastSimpleGridComponent(weatherHelpers) {
            this.weatherHelpers = weatherHelpers;
        }
        Object.defineProperty(WeatherForecastSimpleGridComponent.prototype, "forecast", {
            get: /**
             * @return {?}
             */ function () {
                return this._forecast;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
                        selector: 'weather-forecast-simple-grid',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n           :host {\n             display: flex;\n             width: 100%;\n             justify-content: space-between;\n           }\n           weather-forecast-grid-day {\n             margin: 0 0.4em;\n           }\n           "
                        ],
                        template: "\n    <ng-container *ngFor=\"let forecast of forecastPerDay\">\n      <weather-forecast-grid-day [forecast]=\"forecast\"></weather-forecast-grid-day>\n    </ng-container>\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherForecastSimpleGridComponent.ctorParameters = function () {
            return [
                { type: WeatherHelpersService, },
            ];
        };
        WeatherForecastSimpleGridComponent.propDecorators = {
            "forecast": [{ type: core.Input },],
        };
        return WeatherForecastSimpleGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherForecastGridDayComponent = (function () {
        function WeatherForecastGridDayComponent() {
        }
        WeatherForecastGridDayComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'weather-forecast-grid-day',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n   :host {\n     display: flex;\n     flex-direction: column;\n     justify-content: center;\n     align-items: center;\n     font-size: 1.2em;\n   }\n   weather-icon {\n     font-size: 1.4em;\n   }\n   .day {\n     font-size: 0.8em\n   }\n "
                        ],
                        template: "\n      <weather-icon [iconClass]=\"forecast?.iconClass\"></weather-icon>\n      <weather-current-temperature [temp]=\"forecast?.temp\"></weather-current-temperature>\n      <div class=\"day\">{{forecast?.data | date:'EEE' }}</div>\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherForecastGridDayComponent.propDecorators = {
            "forecast": [{ type: core.Input },],
        };
        return WeatherForecastGridDayComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherForecastDetailedComponent = (function () {
        function WeatherForecastDetailedComponent(weatherHelpers) {
            this.weatherHelpers = weatherHelpers;
            this.forecastPerDay = [];
        }
        Object.defineProperty(WeatherForecastDetailedComponent.prototype, "forecast", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
                        selector: 'weather-forecast-detailed',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [""],
                        template: "\n    <ng-container *ngFor=\"let forecast of forecastPerDay\">\n      <weather-forecast-detail-day\n        [settings]=\"settings\"\n        [forecast]=\"forecast\"></weather-forecast-detail-day>\n    </ng-container>\n\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherForecastDetailedComponent.ctorParameters = function () {
            return [
                { type: WeatherHelpersService, },
            ];
        };
        WeatherForecastDetailedComponent.propDecorators = {
            "forecast": [{ type: core.Input },],
            "settings": [{ type: core.Input },],
        };
        return WeatherForecastDetailedComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherForecastDetailDayComponent = (function () {
        function WeatherForecastDetailDayComponent(weatherHelpers) {
            this.weatherHelpers = weatherHelpers;
        }
        Object.defineProperty(WeatherForecastDetailDayComponent.prototype, "forecast", {
            get: /**
             * @return {?}
             */ function () {
                return this._forecast;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
                        selector: 'weather-forecast-detail-day',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n             :host {\n               display: flex;\n               align-items: center;\n               padding: 0.1em 0;\n               font-size: 1em;\n               box-sizing: border-box;\n               justify-content: flex-start;\n               width: 100%;\n\n             }\n             :host > * {\n               padding: 0 0.4em;\n             }\n             .left {\n               flex-grow: 0;\n             }\n             weather-chart {\n               height: 80px;\n               width: 80%;\n               flex: 1 1;\n             }\n\n             weather-icon {\n               margin-top: 0.3em;\n               font-size: 1.4em;\n               display: block;\n             }\n           "
                        ],
                        template: "\n    <div class=\"left\">\n      {{forecast[0]?.data | date:'EEE' }}\n      <weather-icon [iconClass]=\"forecast[0]?.iconClass\"></weather-icon>\n    </div>\n    <weather-chart\n      [type]=\"'line'\"\n      [data]=\"chartData\"\n      [options]=\"chartOptions\"\n    ></weather-chart>\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherForecastDetailDayComponent.ctorParameters = function () {
            return [
                { type: WeatherHelpersService, },
            ];
        };
        WeatherForecastDetailDayComponent.propDecorators = {
            "settings": [{ type: core.Input },],
            "forecast": [{ type: core.Input },],
        };
        return WeatherForecastDetailDayComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ChartComponent = (function () {
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
                this.chart = new chart_js.Chart(this.elementRef.nativeElement.querySelector('canvas'), {
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
            { type: core.Component, args: [{
                        selector: 'weather-chart',
                        template: '<canvas></canvas>',
                        styles: [':host { display: block; }']
                    },] },
        ];
        /** @nocollapse */
        ChartComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
            ];
        };
        ChartComponent.propDecorators = {
            "type": [{ type: core.Input },],
            "data": [{ type: core.Input },],
            "options": [{ type: core.Input },],
        };
        return ChartComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WeatherForecastChartWideComponent = (function () {
        function WeatherForecastChartWideComponent(helpers) {
            this.helpers = helpers;
        }
        WeatherForecastChartWideComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'weather-forecast-chart-wide',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [
                            "\n           "
                        ],
                        template: "\n    <div>\n\n    </div>\n\n  "
                    },] },
        ];
        /** @nocollapse */
        WeatherForecastChartWideComponent.ctorParameters = function () {
            return [
                { type: WeatherHelpersService, },
            ];
        };
        WeatherForecastChartWideComponent.propDecorators = {
            "forecast": [{ type: core.Input },],
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
    function apiServiceFactory(http$$1, pooling, openWeather) {
        switch (openWeather.name) {
            case WeatherApiName.OPEN_WEATHER_MAP:
                return new OpenWeatherMapApiService(http$$1, pooling, openWeather);
            default:
                return new OpenWeatherMapApiService(http$$1, pooling, openWeather);
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
                    deps: [http.Http, PoolingService, 'WEATHER_CONFIG']
                },
                { provide: 'WEATHER_CONFIG', useValue: config }
            ]
        };
    }
    var AngularWeatherWidgetModule = (function () {
        function AngularWeatherWidgetModule() {
        }
        AngularWeatherWidgetModule.forRoot = forRoot;
        AngularWeatherWidgetModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, http.HttpModule],
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

    exports.apiServiceFactory = apiServiceFactory;
    exports.forRoot = forRoot;
    exports.AngularWeatherWidgetModule = AngularWeatherWidgetModule;
    exports.TemperatureScale = TemperatureScale$1;
    exports.WeatherSettings = WeatherSettings;
    exports.ForecastMode = ForecastMode;
    exports.WeatherLayout = WeatherLayout;
    exports.OPEN_WEATHER_MAP_RESPONSE_MOCK = OPEN_WEATHER_MAP_RESPONSE_MOCK;
    exports.OPEN_WEATHER_MAP_FORECAST = OPEN_WEATHER_MAP_FORECAST;
    exports.CURRENT_WATHER_MOCK = CURRENT_WATHER_MOCK;
    exports.FORECAST_MOCK = FORECAST_MOCK;
    exports.WeatherApiService = WeatherApiService;
    exports.WeatherApiConfig = WeatherApiConfig;
    exports.WeatherApiName = WeatherApiName;
    exports.ɵb = ChartComponent;
    exports.ɵe = WeatherActionsComponent;
    exports.ɵg = WeatherCurrentDescriptionComponent;
    exports.ɵj = WeatherCurrentDetailsComponent;
    exports.ɵa = WeatherCurrentTempComponent;
    exports.ɵi = WeatherCurrentWindComponent;
    exports.ɵp = WeatherForecastDetailDayComponent;
    exports.ɵo = WeatherForecastDetailedComponent;
    exports.ɵq = WeatherForecastChartWideComponent;
    exports.ɵm = WeatherForecastSimpleGridComponent;
    exports.ɵl = WeatherForecastGridDayComponent;
    exports.ɵk = WeatherForecastComponent;
    exports.ɵf = WeatherIconComponent;
    exports.ɵh = WeatherLocationComponent;
    exports.ɵd = PoolingService;
    exports.ɵn = WeatherHelpersService;
    exports.ɵc = WeatherContainer;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci13ZWF0aGVyLXdpZGdldC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL3NlcnZpY2VzL3BvbGluZy5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZS50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvd2VhdGhlci5pbnRlcmZhY2VzLnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi93ZWF0aGVyLmNvbnRhaW5lci50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvY29tcG9uZW50cy93ZWF0aGVyLWljb24vd2VhdGhlci1pY29uLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtZGVzY3JpcHRpb24vd2VhdGhlci1jdXJyZW50LWRlc2NyaXB0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUvY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvd2VhdGhlci1hY3Rpb25zL2FjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9jb21wb25lbnRzL3dlYXRoZXItbG9jYXRpb24vd2VhdGhlci1sb2NhdGlvbi5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LXdpbmQvd2VhdGhlci1jdXJyZW50LXdpbmQuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9zZXJ2aWNlcy9hcGkvb3Blbi13ZWF0aGVyLW1hcC9vcGVuLXdlYXRoZXItbWFwLXRvLXdlYXRoZXItaWNvbnMudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL3NlcnZpY2VzL2FwaS9vcGVuLXdlYXRoZXItbWFwL29wZW4td2VhdGhlci1tYXAuYXBpLnNlcnZpY2UudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvd2VhdGhlci1jdXJyZW50LWRldGFpbHMvd2VhdGhlci1jdXJyZW50LWRldGFpbHMuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3Qvd2VhdGhlci1mb3JlY2FzdC5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL3NlcnZpY2VzL3dlYXRoZXItaGVscGVycy5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3Qtc2ltcGxlLWdyaWQvZm9yZWNhc3Qtc2ltcGxlLWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3Qtc2ltcGxlLWdyaWQvd2VhdGhlci1mb3JlY2FzdC1ncmlkLWRheS5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1kZXRhaWxlZC9mb3JlY2FzdC1kZXRhaWxlZC5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1kZXRhaWxlZC9mb3JlY2FzdC1kZXRhaWxlZC1kYXkuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9jb21wb25lbnRzL2NoYXJ0L2NoYXJ0LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC9saWIvY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LXNpbXBsZS1ncmlkL2ZvcmVjYXN0LWNoYXJ0LXdpZGUuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0L2xpYi9tb2Nrcy9vcGVuLXdlYXRoZXItbWFwLm1vY2sudHMiLCJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvbGliL2FuZ3VsYXItd2VhdGhlci13aWRnZXQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAsIG11bHRpY2FzdCwgcmVmQ291bnQsIG1lcmdlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb29saW5nU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIC8vIE5PVEU6IFJ1bm5pbmcgdGhlIGludGVydmFsIG91dHNpZGUgQW5ndWxhciBlbnN1cmVzIHRoYXQgZTJlIHRlc3RzIHdpbGwgbm90IGhhbmcuXG4gIGV4ZWN1dGU8VD4oXG4gICAgb3BlcmF0aW9uOiAoKSA9PiBPYnNlcnZhYmxlPFQ+LFxuICAgIGZyZXF1ZW5jeTogbnVtYmVyID0gMTAwMFxuICApOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICBjb25zdCBzb3VyY2UgPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb247XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBjb25zdCB6b25lID0gdGhpcy56b25lO1xuICAgICAgICBzdWIgPSBpbnRlcnZhbChmcmVxdWVuY3kpXG4gICAgICAgICAgLnBpcGUobWVyZ2VNYXAob3BlcmF0aW9uKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yKGVycikge1xuICAgICAgICAgICAgICB6b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNvdXJjZVxuICAgICAgLnBpcGUobXVsdGljYXN0KHN1YmplY3QpLCByZWZDb3VudCgpLCBtZXJnZShvcGVyYXRpb24oKSkpXG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVxdWVzdE9wdGlvbnMsIFVSTFNlYXJjaFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9vbGluZ1NlcnZpY2UgfSBmcm9tICcuLi9wb2xpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVyUXVlcnlQYXJhbXMgfSBmcm9tICcuLi8uLi93ZWF0aGVyLmludGVyZmFjZXMnO1xuaW1wb3J0IHsgbWFwLCBmaWx0ZXIgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdlYXRoZXJBcGlTZXJ2aWNlIHtcbiAgcG9vbGxpbmdJbnRlcnZhbCA9IDYwMDAwICogNjA7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwLFxuICAgIHByb3RlY3RlZCBwb29saW5nU2VydmljZTogUG9vbGluZ1NlcnZpY2UsXG4gICAgQEluamVjdCgnV0VBVEhFUl9DT05GSUcnKSBwdWJsaWMgYXBpQ29uZmlnOiBXZWF0aGVyQXBpQ29uZmlnXG4gICkge31cblxuICBjdXJyZW50V2VhdGhlcihxdWVyeVBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zKTogT2JzZXJ2YWJsZTxDdXJyZW50V2VhdGhlcj4ge1xuICAgIHJldHVybiB0aGlzLmNhbGxBcGkocXVlcnlQYXJhbXMsICcvd2VhdGhlcicpLnBpcGUobWFwKFxuICAgICAgdGhpcy5tYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlLmJpbmQodGhpcylcbiAgICApKTtcbiAgfVxuXG4gIGZvcmVjYXN0KHF1ZXJ5UGFyYW1zOiBXZWF0aGVyUXVlcnlQYXJhbXMpOiBPYnNlcnZhYmxlPEZvcmVjYXN0W10+IHtcbiAgICByZXR1cm4gdGhpcy5jYWxsQXBpKHF1ZXJ5UGFyYW1zLCAnL2ZvcmVjYXN0JykucGlwZShtYXAoXG4gICAgICB0aGlzLm1hcEZvcmVjYXN0UmVzcG9uc2UuYmluZCh0aGlzKVxuICAgICkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNhbGxBcGkoXG4gICAgcXVlcnlQYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtcyxcbiAgICBlbmRwb2ludDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5tYXBRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcyk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB0aGlzLmdldFJlcXVlc3RPcHRpb25zKHBhcmFtcyk7XG4gICAgY29uc3QgYXBpQ2FsbDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5odHRwXG4gICAgICAuZ2V0KGAke3RoaXMuYXBpQ29uZmlnLmJhc2VVcmx9LyR7ZW5kcG9pbnR9YCwgcmVxdWVzdE9wdGlvbnMpXG4gICAgICAucGlwZShtYXAocmVzcCA9PiByZXNwLmpzb24oKSksXG4gICAgICAgIGZpbHRlcihlbCA9PiAhIWVsKSlcbiAgICByZXR1cm4gdGhpcy53cmFwV2l0aFBvbGwoYXBpQ2FsbCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0VG9rZW5LZXkoKTogc3RyaW5nIHtcbiAgICAvLyBJbXBsZW1lbnQgaXQgaW4gY2hpbGQgc2VydmljZVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBRdWVyeVBhcmFtcyhwYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtcyk6IGFueSB7XG4gICAgLy8gSW1wbGVtZW50IGl0IGluIGNoaWxkIHNlcnZpY2VcbiAgICByZXR1cm47XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwQ3VycmVudFdlYXRoZXJSZXNwb25zZShyZXNwb25zZTogYW55KTogQ3VycmVudFdlYXRoZXIge1xuICAgIC8vIEltcGxlbWVudCBpdCBpbiBjaGlsZCBzZXJ2aWNlXG4gICAgcmV0dXJuIDxDdXJyZW50V2VhdGhlcj57fTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBGb3JlY2FzdFJlc3BvbnNlKHJlc3BvbnNlOiBhbnkpOiBGb3JlY2FzdFtdIHtcbiAgICAvLyBJbXBsZW1lbnQgaXQgaW4gY2hpbGQgc2VydmljZVxuICAgIHJldHVybiA8Rm9yZWNhc3RbXT5bXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBSZXNwb25zZVRvSWNvblVybChyZXNwb25zZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgcHJvdGVjdGVkIG1hcFJlc3BvbnNlVG9JY29uQ2xhc3MocmVzcG9uc2U6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHJpdmF0ZSB3cmFwV2l0aFBvbGwoYXBpQ2FsbDogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgcmV0dXJuIHRoaXMucG9vbGluZ1NlcnZpY2UuZXhlY3V0ZSgoKSA9PiBhcGlDYWxsLCB0aGlzLnBvb2xsaW5nSW50ZXJ2YWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZXF1ZXN0T3B0aW9ucyhxdWVyeVBhcmFtczogT2JqZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0T3B0aW9ucyh7XG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycygpLFxuICAgICAgcGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRRdWVyeVBhcmFtcyhvYmo6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBVUkxTZWFyY2hQYXJhbXMge1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIHF1ZXJ5UGFyYW1zLnNldCh0aGlzLnNldFRva2VuS2V5KCksIHRoaXMuYXBpQ29uZmlnLmtleSk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgcXVlcnlQYXJhbXMuc2V0KGtleS50b1N0cmluZygpLCBvYmpba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWVyeVBhcmFtcztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1cnJlbnRXZWF0aGVyIHtcbiAgbG9jYXRpb246IHN0cmluZztcbiAgdGVtcDogbnVtYmVyO1xuICBwcmVzc3VyZT86IG51bWJlcjtcbiAgaHVtaWRpdHk/OiBudW1iZXI7XG4gIG1pblRlbXA/OiBudW1iZXI7XG4gIG1heFRlbXA/OiBudW1iZXI7XG4gIHN1bnJpc2U/OiBudW1iZXI7XG4gIHN1bnNldD86IG51bWJlcjtcbiAgaWNvbkNsYXNzPzogc3RyaW5nO1xuICBpY29uVXJsPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgd2luZD86IHtcbiAgICBkZWc6IG51bWJlcjtcbiAgICBzcGVlZDogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcmVjYXN0IGV4dGVuZHMgQ3VycmVudFdlYXRoZXIge1xuICBkYXRhOiBEYXRlO1xufVxuXG5leHBvcnQgY2xhc3MgV2VhdGhlckFwaUNvbmZpZyB7XG4gIG5hbWU6IFdlYXRoZXJBcGlOYW1lID0gV2VhdGhlckFwaU5hbWUuT1BFTl9XRUFUSEVSX01BUDtcbiAga2V5ID0gJ3Byb3ZpZGUgc2VjcmV0IGtleSc7XG4gIGJhc2VVcmwgPSAnaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUnO1xufVxuXG5leHBvcnQgZW51bSBXZWF0aGVyQXBpTmFtZSB7XG4gIE9QRU5fV0VBVEhFUl9NQVAgPSA8YW55PidPcGVuIFdlYXRoZXIgTWFwJ1xufVxuIiwiZXhwb3J0IGNsYXNzIFdlYXRoZXJTZXR0aW5ncyB7XG4gIGxvY2F0aW9uOiBXZWF0aGVyUXVlcnlQYXJhbXMgPSB7IGNpdHlOYW1lOiAnU3pjemVjaW4nIH07XG4gIHNjYWxlOiBUZW1wZXJhdHVyZVNjYWxlID0gVGVtcGVyYXR1cmVTY2FsZS5DRUxDSVVTO1xuICBiYWNrZ3JvdW5kQ29sb3I/ID0gJ3doaXRlJztcbiAgY29sb3I/ID0gJ2JsYWNrJztcbiAgd2lkdGg/OiBhbnk7XG4gIGhlaWdodD86IGFueTtcbiAgc2hvd1dpbmQ/OiBib29sZWFuO1xuICBzaG93RGV0YWlscz86IGJvb2xlYW47XG4gIHNob3dGb3JlY2FzdD86IGJvb2xlYW47XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICBmb3JlY2FzdE1vZGU/OiBGb3JlY2FzdE1vZGU7XG4gIGxheW91dD86IFdlYXRoZXJMYXlvdXQgPSBXZWF0aGVyTGF5b3V0Lk5BUlJPVztcbn1cblxuZXhwb3J0IGVudW0gRm9yZWNhc3RNb2RlIHtcbiAgR1JJRCA9IDxhbnk+J0dSSUQnLFxuICBERVRBSUxFRCA9IDxhbnk+J0RFVEFJTEVEJ1xufVxuXG5leHBvcnQgZW51bSBUZW1wZXJhdHVyZVNjYWxlIHtcbiAgQ0VMQ0lVUyA9IDxhbnk+J2NlbGNpdXMnLFxuICBLRUxWSU4gPSA8YW55PidrZWx2aW4nLFxuICBGQUhSRU5IRUlUID0gPGFueT4nZmFocmVuaGVpdCdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXZWF0aGVyUXVlcnlQYXJhbXMge1xuICBjaXR5SWQ/OiBudW1iZXI7XG4gIGNpdHlOYW1lPzogc3RyaW5nO1xuICBsYXRMbmc/OiB7XG4gICAgbGF0OiBudW1iZXI7XG4gICAgbG5nOiBudW1iZXI7XG4gIH07XG4gIHppcENvZGU/OiBzdHJpbmc7XG4gIHVuaXRzPzogVGVtcGVyYXR1cmVTY2FsZTtcbiAgbGFuZz86IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gV2VhdGhlckxheW91dCB7XG4gIFdJREUgPSA8YW55Pid3aWRlJyxcbiAgTkFSUk9XID0gPGFueT4nbmFycm93J1xufVxuIiwiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQ3VycmVudFdlYXRoZXIsXG4gIEZvcmVjYXN0LFxuICBXZWF0aGVyQXBpU2VydmljZVxufSBmcm9tICcuL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFdlYXRoZXJMYXlvdXQsXG4gIFdlYXRoZXJRdWVyeVBhcmFtcyxcbiAgV2VhdGhlclNldHRpbmdzXG59IGZyb20gJy4vd2VhdGhlci5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci13aWRnZXQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICAgcGFkZGluZzogMWVtO1xuICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmluZm8ge1xuICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmluZm8ud2lkZSB7XG4gICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAud2lkZSAuY3VycmVudCB7XG4gICAgICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC53aWRlIC5mb3JlY2FzdCB7XG4gICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAuY3VycmVudCB7XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgIG1pbi13aWR0aDogMTQwcHg7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5mb3JlY2FzdCB7XG4gICAgICAgICAgICAgICBtaW4td2lkdGg6IDIwMHB4O1xuICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAuY3VycmVudCwgLmZvcmVjYXN0IHtcbiAgICAgICAgICAgICAgIHBhZGRpbmc6IDAuNWVtO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB3ZWF0aGVyLWFjdGlvbnMge1xuICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICB0b3A6IDEwcHg7XG4gICAgICAgICAgICAgICByaWdodDogMTBweDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlLmJpZyB7XG4gICAgICAgICAgICAgICBmb250LXNpemU6IDNlbTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgd2VhdGhlci1pY29uLmJpZyB7XG4gICAgICAgICAgICAgICBmb250LXNpemU6IDZlbTtcbiAgICAgICAgICAgICAgIHBhZGRpbmc6IDAuMTVlbTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmVtcHR5IHtcbiAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5lbXB0eSBpIHtcbiAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogM2VtO1xuICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwLjNlbTtcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvd2VhdGhlci1pY29ucy8yLjAuMTAvY3NzL3dlYXRoZXItaWNvbnMubWluLmNzc1wiPlxuICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvd2VhdGhlci1pY29ucy8yLjAuMTAvY3NzL3dlYXRoZXItaWNvbnMtd2luZC5taW4uY3NzXCI+XG4gICAgPGRpdiAqbmdJZj1cImN1cnJlbnRXZWF0aGVyXCIgY2xhc3M9XCJpbmZvXCIgW2NsYXNzLndpZGVdPVwiaXNXaWRlTGF5b3V0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY3VycmVudFwiPlxuICAgICAgICA8d2VhdGhlci1pY29uXG4gICAgICAgICAgY2xhc3M9XCJiaWdcIlxuICAgICAgICAgIFtpY29uSW1hZ2VVcmxdPVwiY3VycmVudFdlYXRoZXI/Lmljb25VcmxcIlxuICAgICAgICAgIFtpY29uQ2xhc3NdPVwiY3VycmVudFdlYXRoZXI/Lmljb25DbGFzc1wiPjwvd2VhdGhlci1pY29uPlxuICAgICAgICA8d2VhdGhlci1jdXJyZW50LWRlc2NyaXB0aW9uXG4gICAgICAgICAgW2Rlc2NyaXBpb25dPVwiY3VycmVudFdlYXRoZXI/LmRlc2NyaXB0aW9uXCI+PC93ZWF0aGVyLWN1cnJlbnQtZGVzY3JpcHRpb24+XG4gICAgICAgIDx3ZWF0aGVyLWN1cnJlbnQtd2luZFxuICAgICAgICAgICpuZ0lmPVwic2V0dGluZ3Muc2hvd1dpbmRcIlxuICAgICAgICAgIFtzY2FsZV09XCJzZXR0aW5ncy5zY2FsZVwiXG4gICAgICAgICAgW2RlZ109XCJjdXJyZW50V2VhdGhlcj8ud2luZC5kZWdcIlxuICAgICAgICAgIFtzcGVlZF09XCJjdXJyZW50V2VhdGhlcj8ud2luZC5zcGVlZFwiPjwvd2VhdGhlci1jdXJyZW50LXdpbmQ+XG4gICAgICAgIDx3ZWF0aGVyLWxvY2F0aW9uIFtwbGFjZV09XCJjdXJyZW50V2VhdGhlcj8ubG9jYXRpb25cIj48L3dlYXRoZXItbG9jYXRpb24+XG4gICAgICAgIDx3ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmVcbiAgICAgICAgICBjbGFzcz1cImJpZ1wiXG4gICAgICAgICAgW3RlbXBdPVwiY3VycmVudFdlYXRoZXI/LnRlbXBcIlxuICAgICAgICAgIFtkZWddPVwic2V0dGluZ3Muc2NhbGVcIj48L3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZT5cbiAgICAgICAgPHdlYXRoZXItY3VycmVudC1kZXRhaWxzXG4gICAgICAgICAgKm5nSWY9XCJzZXR0aW5ncy5zaG93RGV0YWlsc1wiXG4gICAgICAgICAgW21heFRlbXBdPVwiY3VycmVudFdlYXRoZXI/Lm1heFRlbXBcIlxuICAgICAgICAgIFttaW5UZW1wXT1cImN1cnJlbnRXZWF0aGVyPy5taW5UZW1wXCJcbiAgICAgICAgICBbcHJlc3N1cmVdPVwiY3VycmVudFdlYXRoZXI/LnByZXNzdXJlXCJcbiAgICAgICAgICBbaHVtaWRpdHldPVwiY3VycmVudFdlYXRoZXI/Lmh1bWlkaXR5XCI+PC93ZWF0aGVyLWN1cnJlbnQtZGV0YWlscz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImZvcmVjYXN0XCIgKm5nSWY9XCJzZXR0aW5ncy5zaG93Rm9yZWNhc3RcIj5cbiAgICAgICAgPHdlYXRoZXItZm9yZWNhc3RcbiAgICAgICAgICBbZm9yZWNhc3RdPVwiZm9yZWNhc3RcIlxuICAgICAgICAgIFtzZXR0aW5nc109XCJzZXR0aW5nc1wiXG4gICAgICAgICAgW21vZGVdPVwic2V0dGluZ3MuZm9yZWNhc3RNb2RlXCI+PC93ZWF0aGVyLWZvcmVjYXN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIiFjdXJyZW50V2VhdGhlclwiIGNsYXNzPVwiaW5mbyBlbXB0eVwiPlxuICAgICAgPGkgY2xhc3M9XCJ3aSB3aS1zdW5yaXNlXCI+PC9pPlxuICAgICAgTm8gd2VhdGhlciBkYXRhLi4uXG4gICAgPC9kaXY+XG4gICAgPHdlYXRoZXItYWN0aW9ucyAqbmdJZj1cImlzTW91c2VPblwiICh1cGRhdGUpPVwiZ2V0V2VhdGhlcigpXCI+PC93ZWF0aGVyLWFjdGlvbnM+XG5cbiAgYFxufSkgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBXZWF0aGVyQ29udGFpbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5iYWNrZ3JvdW5kJykgYmFja2dyb3VuZCE6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5jb2xvcicpIGNvbG9yITogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgd2lkdGggPSAnYXV0byc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaGVpZ2h0ID0gJ2F1dG8nO1xuXG4gIEBJbnB1dCgpIGZvcmVjYXN0ITogRm9yZWNhc3RbXSB8IG51bGw7XG4gIEBJbnB1dCgpIGN1cnJlbnRXZWF0aGVyITogQ3VycmVudFdlYXRoZXIgfCBudWxsO1xuICBASW5wdXQoKVxuICBzZXQgc2V0dGluZ3ModmFsdWU6IFdlYXRoZXJTZXR0aW5ncykge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2V0dGluZ3MgPSB2YWx1ZTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLl9zZXR0aW5ncy5iYWNrZ3JvdW5kQ29sb3IgfHwgJ3doaXRlJztcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5fc2V0dGluZ3MuY29sb3IgfHwgJ2JsYWNrJztcbiAgICB0aGlzLndpZHRoID0gdGhpcy5fc2V0dGluZ3Mud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zZXR0aW5ncy5oZWlnaHQ7XG4gICAgaWYgKHRoaXMud2VhdGhlckFwaS5hcGlDb25maWcubmFtZSAmJiB0aGlzLndlYXRoZXJBcGkuYXBpQ29uZmlnLmtleSkge1xuICAgICAgdGhpcy5nZXRXZWF0aGVyKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5sYXlvdXQpIHtcbiAgICAgIHRoaXMuaXNXaWRlTGF5b3V0ID0gdGhpcy5fc2V0dGluZ3MubGF5b3V0ID09PSBXZWF0aGVyTGF5b3V0LldJREU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNldHRpbmdzKCk6IFdlYXRoZXJTZXR0aW5ncyB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzO1xuICB9XG5cbiAgaXNXaWRlTGF5b3V0ID0gZmFsc2U7XG4gIHN1YnNjcmlwdGlvbkN1cnJlbnRXZWF0aGVyITogU3Vic2NyaXB0aW9uO1xuICBzdWJzY3JpcHRpb25Gb3JlY2FzdCE6IFN1YnNjcmlwdGlvbjtcbiAgY3VycmVudFdlYXRoZXIkITogT2JzZXJ2YWJsZTxDdXJyZW50V2VhdGhlcj47XG4gIGZvcmVjYXN0JCE6IE9ic2VydmFibGU8Rm9yZWNhc3RbXT47XG4gIGlzTW91c2VPbiE6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfc2V0dGluZ3MhOiBXZWF0aGVyU2V0dGluZ3M7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3ZWF0aGVyQXBpOiBXZWF0aGVyQXBpU2VydmljZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmXG4gICkge31cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25DdXJyZW50V2VhdGhlcikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25DdXJyZW50V2VhdGhlci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25Gb3JlY2FzdCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25Gb3JlY2FzdC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBwdWJsaWMgb25Nb3VzZUVudGVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICB0aGlzLmlzTW91c2VPbiA9IHRydWU7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIHB1YmxpYyBvbk1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgIHRoaXMuaXNNb3VzZU9uID0gZmFsc2U7XG4gIH1cblxuICBnZXRXZWF0aGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbkN1cnJlbnRXZWF0aGVyKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbkN1cnJlbnRXZWF0aGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbkZvcmVjYXN0KSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbkZvcmVjYXN0LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFdlYXRoZXIkID0gdGhpcy5jdXJyZW50V2VhdGhlckNhbGwoKTtcbiAgICB0aGlzLmZvcmVjYXN0JCA9IHRoaXMuZm9yZWNhc3RDYWxsKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25DdXJyZW50V2VhdGhlciA9IHRoaXMuY3VycmVudFdlYXRoZXIkLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFdlYXRoZXIgPSBkYXRhO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbkZvcmVjYXN0ID0gdGhpcy5mb3JlY2FzdCQuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgdGhpcy5mb3JlY2FzdCA9IGRhdGE7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgY3VycmVudFdlYXRoZXJDYWxsKCk6IE9ic2VydmFibGU8Q3VycmVudFdlYXRoZXI+IHtcbiAgICBjb25zdCBwYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIHRoaXMuc2V0dGluZ3MubG9jYXRpb24sXG4gICAgICB7IHVuaXRzOiB0aGlzLnNldHRpbmdzLnNjYWxlIH0sXG4gICAgICB7IGxhbmc6IHRoaXMuc2V0dGluZ3MubGFuZ3VhZ2UgfVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMud2VhdGhlckFwaS5jdXJyZW50V2VhdGhlcihwYXJhbXMpO1xuICB9XG5cbiAgZm9yZWNhc3RDYWxsKCk6IE9ic2VydmFibGU8Rm9yZWNhc3RbXT4ge1xuICAgIGNvbnN0IHBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgdGhpcy5zZXR0aW5ncy5sb2NhdGlvbixcbiAgICAgIHsgdW5pdHM6IHRoaXMuc2V0dGluZ3Muc2NhbGUgfSxcbiAgICAgIHsgbGFuZzogdGhpcy5zZXR0aW5ncy5sYW5ndWFnZSB9XG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy53ZWF0aGVyQXBpLmZvcmVjYXN0KHBhcmFtcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1pY29uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW2BgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aSAqbmdJZj1cImljb25DbGFzc1wiIFtjbGFzc109XCJpY29uQ2xhc3NcIj48L2k+XG4gICAgPGltZyAqbmdJZj1cImljb25JbWFnZVVybCAmJiAhaWNvbkNsYXNzXCIgW3NyY109XCJpY29uSW1hZ2VVcmxcIj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVySWNvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGljb25DbGFzcyE6IHN0cmluZztcbiAgQElucHV0KCkgaWNvbkltYWdlVXJsITogc3RyaW5nO1xuICBASW5wdXQoKSB0aXRsZSE6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1jdXJyZW50LWRlc2NyaXB0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgfVxuICAgICAgICAgICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAge3sgZGVzY3JpcGlvbiB8IHVwcGVyY2FzZX19XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckN1cnJlbnREZXNjcmlwdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGRlc2NyaXBpb24hOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbGluZS1oZWlnaHQ6IDEuMWVtO1xuICB9XG4gICAgLmRlZyB7XG4gICAgICBsZXR0ZXItc3BhY2luZzogLTAuMTNlbTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGxlZnQ6IC0wLjJlbTtcbiAgICB9XG4gIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIHt7IHRlbXA/LnRvRml4ZWQoKSB9fSA8c3BhbiAqbmdJZj1cInRlbXBcIiBjbGFzcz1cImRlZ1wiPiZkZWc7IHt7IHVuaXRTeW1ib2wgfX08L3NwYW4+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckN1cnJlbnRUZW1wQ29tcG9uZW50IHtcbiAgdW5pdFN5bWJvbCE6IHN0cmluZztcbiAgQElucHV0KCkgdGVtcCE6IG51bWJlcjtcbiAgZ2V0IGRlZygpOiBUZW1wZXJhdHVyZVNjYWxlIHtcbiAgICByZXR1cm4gdGhpcy5fZGVnO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlZyh2YWx1ZTogVGVtcGVyYXR1cmVTY2FsZSkge1xuICAgIHRoaXMuX2RlZyA9IHZhbHVlO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5DRUxDSVVTOlxuICAgICAgICB0aGlzLnVuaXRTeW1ib2wgPSAnQyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLkZBSFJFTkhFSVQ6XG4gICAgICAgIHRoaXMudW5pdFN5bWJvbCA9ICdGJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuS0VMVklOOlxuICAgICAgICB0aGlzLnVuaXRTeW1ib2wgPSAnSyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy51bml0U3ltYm9sID0gJ0MnO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9kZWc6IFRlbXBlcmF0dXJlU2NhbGUgPSBUZW1wZXJhdHVyZVNjYWxlLkNFTENJVVM7XG59XG5cbmV4cG9ydCBlbnVtIFRlbXBlcmF0dXJlU2NhbGUge1xuICBDRUxDSVVTID0gPGFueT4nY2VsY2l1cycsXG4gIEtFTFZJTiA9IDxhbnk+J2tlbHZpbicsXG4gIEZBSFJFTkhFSVQgPSA8YW55PidmYWhyZW5oZWl0J1xufVxuIiwiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItYWN0aW9ucycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgYnV0dG9uIHtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxLjZlbTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIH1cbiAgICBidXR0b246aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwgMC4xKTtcbiAgICB9XG4gIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uIChjbGljayk9XCJ1cGRhdGUuZW1pdCgpXCI+PGkgY2xhc3M9XCJ3aSB3aS1yZWZyZXNoXCI+PC9pPjwvYnV0dG9uPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJBY3Rpb25zQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIHVwZGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItbG9jYXRpb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIG1hcmdpbi10b3A6IDFlbTtcbiAgICAgIGZvbnQtc2l6ZTogMWVtO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIHt7IHBsYWNlIH19XG5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyTG9jYXRpb25Db21wb25lbnQge1xuICBASW5wdXQoKSBwbGFjZSE6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRlbXBlcmF0dXJlU2NhbGUgfSBmcm9tICcuLi93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUvY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlclNldHRpbmdzIH0gZnJvbSAnLi4vLi4vd2VhdGhlci5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1jdXJyZW50LXdpbmQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDAuOGVtO1xuICAgICAgbWluLWhlaWdodDogMS4zZW07XG4gICAgfVxuICAgIGkge1xuICAgICAgbWFyZ2luLWxlZnQ6IDAuM2VtO1xuICAgICAgZm9udC1zaXplOiAxLjZlbTtcbiAgICB9XG4gIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3Bhbj5XaW5kIHt7IHNwZWVkIH19IHt7IHVuaXQgfX08L3NwYW4+XG4gICA8aSBbY2xhc3NdPVwid2luZEljb25cIj48L2k+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckN1cnJlbnRXaW5kQ29tcG9uZW50IHtcbiAgdW5pdCE6IHN0cmluZztcbiAgZ2V0IHNjYWxlKCkge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBzY2FsZSh2YWx1ZSkge1xuICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XG4gICAgdGhpcy51bml0ID0gdGhpcy5tYXBTY2FsZVRvVGV4dCh0aGlzLl9zY2FsZSk7XG4gIH1cbiAgd2luZEljb24hOiBzdHJpbmc7XG4gIGdldCBkZWcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGVnO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlZyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kZWcgPSB2YWx1ZTtcbiAgICB0aGlzLndpbmRJY29uID0gYHdpIHdpLXdpbmQgZnJvbS0ke3RoaXMuX2RlZ30tZGVnYDtcbiAgfVxuICBwcml2YXRlIF9kZWchOiBudW1iZXI7XG4gIEBJbnB1dCgpIHNwZWVkITogbnVtYmVyO1xuICBwcml2YXRlIF9zY2FsZSE6IFRlbXBlcmF0dXJlU2NhbGU7XG5cbiAgbWFwU2NhbGVUb1RleHQoc2NhbGU6IFRlbXBlcmF0dXJlU2NhbGUpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoc2NhbGUpIHtcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5DRUxDSVVTOlxuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLktFTFZJTjpcbiAgICAgICAgcmV0dXJuICdtL3MnO1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLkZBSFJFTkhFSVQ6XG4gICAgICAgIHJldHVybiAnbWlsL2gnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBJY29uQ29kZVR5cGUge1xuICBba2V5OiBzdHJpbmddOiB7IGxhYmVsOiBzdHJpbmc7IGljb246IHN0cmluZyB9O1xufVxuXG5leHBvcnQgY29uc3QgaWNvbkNvZGVzOiBJY29uQ29kZVR5cGUgPSB7XG4gICcyMDAnOiB7XG4gICAgbGFiZWw6ICd0aHVuZGVyc3Rvcm0gd2l0aCBsaWdodCByYWluJyxcbiAgICBpY29uOiAnc3Rvcm0tc2hvd2VycydcbiAgfSxcblxuICAnMjAxJzoge1xuICAgIGxhYmVsOiAndGh1bmRlcnN0b3JtIHdpdGggcmFpbicsXG4gICAgaWNvbjogJ3N0b3JtLXNob3dlcnMnXG4gIH0sXG5cbiAgJzIwMic6IHtcbiAgICBsYWJlbDogJ3RodW5kZXJzdG9ybSB3aXRoIGhlYXZ5IHJhaW4nLFxuICAgIGljb246ICdzdG9ybS1zaG93ZXJzJ1xuICB9LFxuXG4gICcyMTAnOiB7XG4gICAgbGFiZWw6ICdsaWdodCB0aHVuZGVyc3Rvcm0nLFxuICAgIGljb246ICdzdG9ybS1zaG93ZXJzJ1xuICB9LFxuXG4gICcyMTEnOiB7XG4gICAgbGFiZWw6ICd0aHVuZGVyc3Rvcm0nLFxuICAgIGljb246ICd0aHVuZGVyc3Rvcm0nXG4gIH0sXG5cbiAgJzIxMic6IHtcbiAgICBsYWJlbDogJ2hlYXZ5IHRodW5kZXJzdG9ybScsXG4gICAgaWNvbjogJ3RodW5kZXJzdG9ybSdcbiAgfSxcblxuICAnMjIxJzoge1xuICAgIGxhYmVsOiAncmFnZ2VkIHRodW5kZXJzdG9ybScsXG4gICAgaWNvbjogJ3RodW5kZXJzdG9ybSdcbiAgfSxcblxuICAnMjMwJzoge1xuICAgIGxhYmVsOiAndGh1bmRlcnN0b3JtIHdpdGggbGlnaHQgZHJpenpsZScsXG4gICAgaWNvbjogJ3N0b3JtLXNob3dlcnMnXG4gIH0sXG5cbiAgJzIzMSc6IHtcbiAgICBsYWJlbDogJ3RodW5kZXJzdG9ybSB3aXRoIGRyaXp6bGUnLFxuICAgIGljb246ICdzdG9ybS1zaG93ZXJzJ1xuICB9LFxuXG4gICcyMzInOiB7XG4gICAgbGFiZWw6ICd0aHVuZGVyc3Rvcm0gd2l0aCBoZWF2eSBkcml6emxlJyxcbiAgICBpY29uOiAnc3Rvcm0tc2hvd2VycydcbiAgfSxcblxuICAnMzAwJzoge1xuICAgIGxhYmVsOiAnbGlnaHQgaW50ZW5zaXR5IGRyaXp6bGUnLFxuICAgIGljb246ICdzcHJpbmtsZSdcbiAgfSxcblxuICAnMzAxJzoge1xuICAgIGxhYmVsOiAnZHJpenpsZScsXG4gICAgaWNvbjogJ3Nwcmlua2xlJ1xuICB9LFxuXG4gICczMDInOiB7XG4gICAgbGFiZWw6ICdoZWF2eSBpbnRlbnNpdHkgZHJpenpsZScsXG4gICAgaWNvbjogJ3Nwcmlua2xlJ1xuICB9LFxuXG4gICczMTAnOiB7XG4gICAgbGFiZWw6ICdsaWdodCBpbnRlbnNpdHkgZHJpenpsZSByYWluJyxcbiAgICBpY29uOiAnc3ByaW5rbGUnXG4gIH0sXG5cbiAgJzMxMSc6IHtcbiAgICBsYWJlbDogJ2RyaXp6bGUgcmFpbicsXG4gICAgaWNvbjogJ3Nwcmlua2xlJ1xuICB9LFxuXG4gICczMTInOiB7XG4gICAgbGFiZWw6ICdoZWF2eSBpbnRlbnNpdHkgZHJpenpsZSByYWluJyxcbiAgICBpY29uOiAnc3ByaW5rbGUnXG4gIH0sXG5cbiAgJzMxMyc6IHtcbiAgICBsYWJlbDogJ3Nob3dlciByYWluIGFuZCBkcml6emxlJyxcbiAgICBpY29uOiAnc3ByaW5rbGUnXG4gIH0sXG5cbiAgJzMxNCc6IHtcbiAgICBsYWJlbDogJ2hlYXZ5IHNob3dlciByYWluIGFuZCBkcml6emxlJyxcbiAgICBpY29uOiAnc3ByaW5rbGUnXG4gIH0sXG5cbiAgJzMyMSc6IHtcbiAgICBsYWJlbDogJ3Nob3dlciBkcml6emxlJyxcbiAgICBpY29uOiAnc3ByaW5rbGUnXG4gIH0sXG5cbiAgJzUwMCc6IHtcbiAgICBsYWJlbDogJ2xpZ2h0IHJhaW4nLFxuICAgIGljb246ICdyYWluJ1xuICB9LFxuXG4gICc1MDEnOiB7XG4gICAgbGFiZWw6ICdtb2RlcmF0ZSByYWluJyxcbiAgICBpY29uOiAncmFpbidcbiAgfSxcblxuICAnNTAyJzoge1xuICAgIGxhYmVsOiAnaGVhdnkgaW50ZW5zaXR5IHJhaW4nLFxuICAgIGljb246ICdyYWluJ1xuICB9LFxuXG4gICc1MDMnOiB7XG4gICAgbGFiZWw6ICd2ZXJ5IGhlYXZ5IHJhaW4nLFxuICAgIGljb246ICdyYWluJ1xuICB9LFxuXG4gICc1MDQnOiB7XG4gICAgbGFiZWw6ICdleHRyZW1lIHJhaW4nLFxuICAgIGljb246ICdyYWluJ1xuICB9LFxuXG4gICc1MTEnOiB7XG4gICAgbGFiZWw6ICdmcmVlemluZyByYWluJyxcbiAgICBpY29uOiAncmFpbi1taXgnXG4gIH0sXG5cbiAgJzUyMCc6IHtcbiAgICBsYWJlbDogJ2xpZ2h0IGludGVuc2l0eSBzaG93ZXIgcmFpbicsXG4gICAgaWNvbjogJ3Nob3dlcnMnXG4gIH0sXG5cbiAgJzUyMSc6IHtcbiAgICBsYWJlbDogJ3Nob3dlciByYWluJyxcbiAgICBpY29uOiAnc2hvd2VycydcbiAgfSxcblxuICAnNTIyJzoge1xuICAgIGxhYmVsOiAnaGVhdnkgaW50ZW5zaXR5IHNob3dlciByYWluJyxcbiAgICBpY29uOiAnc2hvd2VycydcbiAgfSxcblxuICAnNTMxJzoge1xuICAgIGxhYmVsOiAncmFnZ2VkIHNob3dlciByYWluJyxcbiAgICBpY29uOiAnc2hvd2VycydcbiAgfSxcblxuICAnNjAwJzoge1xuICAgIGxhYmVsOiAnbGlnaHQgc25vdycsXG4gICAgaWNvbjogJ3Nub3cnXG4gIH0sXG5cbiAgJzYwMSc6IHtcbiAgICBsYWJlbDogJ3Nub3cnLFxuICAgIGljb246ICdzbm93J1xuICB9LFxuXG4gICc2MDInOiB7XG4gICAgbGFiZWw6ICdoZWF2eSBzbm93JyxcbiAgICBpY29uOiAnc25vdydcbiAgfSxcblxuICAnNjExJzoge1xuICAgIGxhYmVsOiAnc2xlZXQnLFxuICAgIGljb246ICdzbGVldCdcbiAgfSxcblxuICAnNjEyJzoge1xuICAgIGxhYmVsOiAnc2hvd2VyIHNsZWV0JyxcbiAgICBpY29uOiAnc2xlZXQnXG4gIH0sXG5cbiAgJzYxNSc6IHtcbiAgICBsYWJlbDogJ2xpZ2h0IHJhaW4gYW5kIHNub3cnLFxuICAgIGljb246ICdyYWluLW1peCdcbiAgfSxcblxuICAnNjE2Jzoge1xuICAgIGxhYmVsOiAncmFpbiBhbmQgc25vdycsXG4gICAgaWNvbjogJ3JhaW4tbWl4J1xuICB9LFxuXG4gICc2MjAnOiB7XG4gICAgbGFiZWw6ICdsaWdodCBzaG93ZXIgc25vdycsXG4gICAgaWNvbjogJ3JhaW4tbWl4J1xuICB9LFxuXG4gICc2MjEnOiB7XG4gICAgbGFiZWw6ICdzaG93ZXIgc25vdycsXG4gICAgaWNvbjogJ3JhaW4tbWl4J1xuICB9LFxuXG4gICc2MjInOiB7XG4gICAgbGFiZWw6ICdoZWF2eSBzaG93ZXIgc25vdycsXG4gICAgaWNvbjogJ3JhaW4tbWl4J1xuICB9LFxuXG4gICc3MDEnOiB7XG4gICAgbGFiZWw6ICdtaXN0JyxcbiAgICBpY29uOiAnc3ByaW5rbGUnXG4gIH0sXG5cbiAgJzcxMSc6IHtcbiAgICBsYWJlbDogJ3Ntb2tlJyxcbiAgICBpY29uOiAnc21va2UnXG4gIH0sXG5cbiAgJzcyMSc6IHtcbiAgICBsYWJlbDogJ2hhemUnLFxuICAgIGljb246ICdkYXktaGF6ZSdcbiAgfSxcblxuICAnNzMxJzoge1xuICAgIGxhYmVsOiAnc2FuZCwgZHVzdCB3aGlybHMnLFxuICAgIGljb246ICdjbG91ZHktZ3VzdHMnXG4gIH0sXG5cbiAgJzc0MSc6IHtcbiAgICBsYWJlbDogJ2ZvZycsXG4gICAgaWNvbjogJ2ZvZydcbiAgfSxcblxuICAnNzUxJzoge1xuICAgIGxhYmVsOiAnc2FuZCcsXG4gICAgaWNvbjogJ2Nsb3VkeS1ndXN0cydcbiAgfSxcblxuICAnNzYxJzoge1xuICAgIGxhYmVsOiAnZHVzdCcsXG4gICAgaWNvbjogJ2R1c3QnXG4gIH0sXG5cbiAgJzc2Mic6IHtcbiAgICBsYWJlbDogJ3ZvbGNhbmljIGFzaCcsXG4gICAgaWNvbjogJ3Ntb2cnXG4gIH0sXG5cbiAgJzc3MSc6IHtcbiAgICBsYWJlbDogJ3NxdWFsbHMnLFxuICAgIGljb246ICdkYXktd2luZHknXG4gIH0sXG5cbiAgJzc4MSc6IHtcbiAgICBsYWJlbDogJ3Rvcm5hZG8nLFxuICAgIGljb246ICd0b3JuYWRvJ1xuICB9LFxuXG4gICc4MDAnOiB7XG4gICAgbGFiZWw6ICdjbGVhciBza3knLFxuICAgIGljb246ICdzdW5ueSdcbiAgfSxcblxuICAnODAxJzoge1xuICAgIGxhYmVsOiAnZmV3IGNsb3VkcycsXG4gICAgaWNvbjogJ2Nsb3VkeSdcbiAgfSxcblxuICAnODAyJzoge1xuICAgIGxhYmVsOiAnc2NhdHRlcmVkIGNsb3VkcycsXG4gICAgaWNvbjogJ2Nsb3VkeSdcbiAgfSxcblxuICAnODAzJzoge1xuICAgIGxhYmVsOiAnYnJva2VuIGNsb3VkcycsXG4gICAgaWNvbjogJ2Nsb3VkeSdcbiAgfSxcblxuICAnODA0Jzoge1xuICAgIGxhYmVsOiAnb3ZlcmNhc3QgY2xvdWRzJyxcbiAgICBpY29uOiAnY2xvdWR5J1xuICB9LFxuXG4gICc5MDAnOiB7XG4gICAgbGFiZWw6ICd0b3JuYWRvJyxcbiAgICBpY29uOiAndG9ybmFkbydcbiAgfSxcblxuICAnOTAxJzoge1xuICAgIGxhYmVsOiAndHJvcGljYWwgc3Rvcm0nLFxuICAgIGljb246ICdodXJyaWNhbmUnXG4gIH0sXG5cbiAgJzkwMic6IHtcbiAgICBsYWJlbDogJ2h1cnJpY2FuZScsXG4gICAgaWNvbjogJ2h1cnJpY2FuZSdcbiAgfSxcblxuICAnOTAzJzoge1xuICAgIGxhYmVsOiAnY29sZCcsXG4gICAgaWNvbjogJ3Nub3dmbGFrZS1jb2xkJ1xuICB9LFxuXG4gICc5MDQnOiB7XG4gICAgbGFiZWw6ICdob3QnLFxuICAgIGljb246ICdob3QnXG4gIH0sXG5cbiAgJzkwNSc6IHtcbiAgICBsYWJlbDogJ3dpbmR5JyxcbiAgICBpY29uOiAnd2luZHknXG4gIH0sXG5cbiAgJzkwNic6IHtcbiAgICBsYWJlbDogJ2hhaWwnLFxuICAgIGljb246ICdoYWlsJ1xuICB9LFxuXG4gICc5NTEnOiB7XG4gICAgbGFiZWw6ICdjYWxtJyxcbiAgICBpY29uOiAnc3VubnknXG4gIH0sXG5cbiAgJzk1Mic6IHtcbiAgICBsYWJlbDogJ2xpZ2h0IGJyZWV6ZScsXG4gICAgaWNvbjogJ2Nsb3VkeS1ndXN0cydcbiAgfSxcblxuICAnOTUzJzoge1xuICAgIGxhYmVsOiAnZ2VudGxlIGJyZWV6ZScsXG4gICAgaWNvbjogJ2Nsb3VkeS1ndXN0cydcbiAgfSxcblxuICAnOTU0Jzoge1xuICAgIGxhYmVsOiAnbW9kZXJhdGUgYnJlZXplJyxcbiAgICBpY29uOiAnY2xvdWR5LWd1c3RzJ1xuICB9LFxuXG4gICc5NTUnOiB7XG4gICAgbGFiZWw6ICdmcmVzaCBicmVlemUnLFxuICAgIGljb246ICdjbG91ZHktZ3VzdHMnXG4gIH0sXG5cbiAgJzk1Nic6IHtcbiAgICBsYWJlbDogJ3N0cm9uZyBicmVlemUnLFxuICAgIGljb246ICdjbG91ZHktZ3VzdHMnXG4gIH0sXG5cbiAgJzk1Nyc6IHtcbiAgICBsYWJlbDogJ2hpZ2ggd2luZCwgbmVhciBnYWxlJyxcbiAgICBpY29uOiAnY2xvdWR5LWd1c3RzJ1xuICB9LFxuXG4gICc5NTgnOiB7XG4gICAgbGFiZWw6ICdnYWxlJyxcbiAgICBpY29uOiAnY2xvdWR5LWd1c3RzJ1xuICB9LFxuXG4gICc5NTknOiB7XG4gICAgbGFiZWw6ICdzZXZlcmUgZ2FsZScsXG4gICAgaWNvbjogJ2Nsb3VkeS1ndXN0cydcbiAgfSxcblxuICAnOTYwJzoge1xuICAgIGxhYmVsOiAnc3Rvcm0nLFxuICAgIGljb246ICd0aHVuZGVyc3Rvcm0nXG4gIH0sXG5cbiAgJzk2MSc6IHtcbiAgICBsYWJlbDogJ3Zpb2xlbnQgc3Rvcm0nLFxuICAgIGljb246ICd0aHVuZGVyc3Rvcm0nXG4gIH0sXG5cbiAgJzk2Mic6IHtcbiAgICBsYWJlbDogJ2h1cnJpY2FuZScsXG4gICAgaWNvbjogJ2Nsb3VkeS1ndXN0cydcbiAgfVxufTtcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRlbXBlcmF0dXJlU2NhbGUgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZS9jdXJyZW50LXRlbXBlcmF0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb29saW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3BvbGluZy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEN1cnJlbnRXZWF0aGVyLFxuICBGb3JlY2FzdCxcbiAgV2VhdGhlckFwaUNvbmZpZyxcbiAgV2VhdGhlckFwaVNlcnZpY2Vcbn0gZnJvbSAnLi4vd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBpY29uQ29kZXMsIEljb25Db2RlVHlwZSB9IGZyb20gJy4vb3Blbi13ZWF0aGVyLW1hcC10by13ZWF0aGVyLWljb25zJztcbmltcG9ydCB7IFdlYXRoZXJRdWVyeVBhcmFtcyB9IGZyb20gJy4uLy4uLy4uL3dlYXRoZXIuaW50ZXJmYWNlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcGVuV2VhdGhlck1hcEFwaVNlcnZpY2UgZXh0ZW5kcyBXZWF0aGVyQXBpU2VydmljZSB7XG4gIGljb25Db2RlczogSWNvbkNvZGVUeXBlO1xuICBpY29uQ29kZXMkITogT2JzZXJ2YWJsZTxhbnk+O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cCxcbiAgICBwcm90ZWN0ZWQgcG9vbGluZ1NlcnZpY2U6IFBvb2xpbmdTZXJ2aWNlLFxuICAgIHB1YmxpYyBhcGlDb25maWc6IFdlYXRoZXJBcGlDb25maWdcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgcG9vbGluZ1NlcnZpY2UsIGFwaUNvbmZpZyk7XG4gICAgdGhpcy5pY29uQ29kZXMgPSBpY29uQ29kZXM7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwUXVlcnlQYXJhbXMoXG4gICAgcGFyYW1zOiBXZWF0aGVyUXVlcnlQYXJhbXNcbiAgKTogT3BlbldlYXRoZXJNYXBMb2NhdGlvblJlcXVlc3Qge1xuICAgIGNvbnN0IG1hcHBlZDogT3BlbldlYXRoZXJNYXBMb2NhdGlvblJlcXVlc3QgPSB7XG4gICAgICBpZDogcGFyYW1zLmNpdHlJZCxcbiAgICAgIHE6IHBhcmFtcy5jaXR5TmFtZSxcbiAgICAgIGxhdDogcGFyYW1zLmxhdExuZyA/IHBhcmFtcy5sYXRMbmcubGF0IDogdW5kZWZpbmVkLFxuICAgICAgbG9uOiBwYXJhbXMubGF0TG5nID8gcGFyYW1zLmxhdExuZy5sbmcgOiB1bmRlZmluZWQsXG4gICAgICB6aXA6IHBhcmFtcy56aXBDb2RlLFxuICAgICAgdW5pdHM6IHBhcmFtcy51bml0cyA/IHRoaXMubWFwVW5pdHMocGFyYW1zLnVuaXRzKSA6IHVuZGVmaW5lZCxcbiAgICAgIGxhbmc6IHBhcmFtcy5sYW5nXG4gICAgfTtcbiAgICByZXR1cm4gbWFwcGVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IE9wZW5XZWF0aGVyTWFwQ3VycmVudFdlYXRoZXJSZXNwb25zZVxuICApOiBDdXJyZW50V2VhdGhlciB7XG4gICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgcmV0dXJuIDxDdXJyZW50V2VhdGhlcj57fTtcbiAgICB9XG4gICAgY29uc3Qgd2VhdGhlcjogQ3VycmVudFdlYXRoZXIgPSB7XG4gICAgICB0ZW1wOiByZXNwb25zZS5tYWluLnRlbXAsXG4gICAgICBwcmVzc3VyZTogcmVzcG9uc2UubWFpbiA/IHJlc3BvbnNlLm1haW4ucHJlc3N1cmUgOiB1bmRlZmluZWQsXG4gICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbiA/IHJlc3BvbnNlLm1haW4uaHVtaWRpdHkgOiB1bmRlZmluZWQsXG4gICAgICBtaW5UZW1wOlxuICAgICAgICByZXNwb25zZS5tYWluICYmIHJlc3BvbnNlLm1haW4udGVtcFxuICAgICAgICAgID8gcmVzcG9uc2UubWFpbi50ZW1wX21pblxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgbWF4VGVtcDpcbiAgICAgICAgcmVzcG9uc2UubWFpbiAmJiByZXNwb25zZS5tYWluLnRlbXBcbiAgICAgICAgICA/IHJlc3BvbnNlLm1haW4udGVtcF9tYXhcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIHN1bnJpc2U6IHJlc3BvbnNlLnN5cyA/IHJlc3BvbnNlLnN5cy5zdW5yaXNlIDogdW5kZWZpbmVkLFxuICAgICAgc3Vuc2V0OiByZXNwb25zZS5zeXMgPyByZXNwb25zZS5zeXMuc3Vuc2V0IDogdW5kZWZpbmVkLFxuICAgICAgbG9jYXRpb246IHJlc3BvbnNlLm5hbWUsXG4gICAgICBpY29uVXJsOiB0aGlzLm1hcFJlc3BvbnNlVG9JY29uVXJsKHJlc3BvbnNlKSxcbiAgICAgIGljb25DbGFzczogdGhpcy5tYXBSZXNwb25zZVRvSWNvbkNsYXNzKHJlc3BvbnNlKSxcbiAgICAgIGRlc2NyaXB0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgd2luZDoge1xuICAgICAgICBkZWc6IHJlc3BvbnNlLndpbmQuZGVnLFxuICAgICAgICBzcGVlZDogcmVzcG9uc2Uud2luZC5zcGVlZFxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHdlYXRoZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwRm9yZWNhc3RSZXNwb25zZShcbiAgICByZXNwb25zZTogT3BlbldlYXRoZXJNYXBGb3JlY2FzdFJlc3BvbnNlXG4gICk6IEZvcmVjYXN0W10ge1xuICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiA8Rm9yZWNhc3RbXT5bXTtcbiAgICB9XG4gICAgY29uc3QgY2l0eSA9IHJlc3BvbnNlLmNpdHk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmxpc3QubWFwKChlbDogT3BlbldlYXRoZXJNYXBGb3JlY2FzdFJlc3BvbnNlRWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgZm9yZWNhc3Q6IEZvcmVjYXN0ID0ge1xuICAgICAgICB0ZW1wOiBlbC5tYWluLnRlbXAsXG4gICAgICAgIHByZXNzdXJlOiBlbC5tYWluLnByZXNzdXJlLFxuICAgICAgICBodW1pZGl0eTogZWwubWFpbi5odW1pZGl0eSxcbiAgICAgICAgbWluVGVtcDogZWwubWFpbi50ZW1wX21pbixcbiAgICAgICAgbWF4VGVtcDogZWwubWFpbi50ZW1wX21heCxcbiAgICAgICAgbG9jYXRpb246IGNpdHkubmFtZSxcbiAgICAgICAgaWNvbkNsYXNzOiB0aGlzLm1hcFJlc3BvbnNlVG9JY29uQ2xhc3MoZWwpLFxuICAgICAgICBkZXNjcmlwdGlvbjogZWwud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgZGF0YTogbmV3IERhdGUoZWwuZHQgKiAxMDAwKSxcbiAgICAgICAgd2luZDoge1xuICAgICAgICAgIGRlZzogZWwud2luZC5kZWcsXG4gICAgICAgICAgc3BlZWQ6IGVsLndpbmQuc3BlZWRcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBmb3JlY2FzdDtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBSZXNwb25zZVRvSWNvblVybChcbiAgICByZXNwb25zZTogT3BlbldlYXRoZXJNYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93LyR7cmVzcG9uc2Uud2VhdGhlclswXS5pY29ufS5wbmdgO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcFJlc3BvbnNlVG9JY29uQ2xhc3MoXG4gICAgcmVzcG9uc2U6XG4gICAgICB8IE9wZW5XZWF0aGVyTWFwQ3VycmVudFdlYXRoZXJSZXNwb25zZVxuICAgICAgfCBPcGVuV2VhdGhlck1hcEZvcmVjYXN0UmVzcG9uc2VFbGVtZW50XG4gICk6IHN0cmluZyB7XG4gICAgY29uc3QgY29kZSA9IHJlc3BvbnNlLndlYXRoZXJbMF0uaWQ7XG4gICAgY29uc3QgcHJlZml4ID0gJ3dpIHdpLSc7XG4gICAgbGV0IGljb24gPSBpY29uQ29kZXNbY29kZV0uaWNvbjtcbiAgICAvLyBJZiB3ZSBhcmUgbm90IGluIHRoZSByYW5nZXMgbWVudGlvbmVkIGFib3ZlLCBhZGQgYSBkYXkvbmlnaHQgcHJlZml4LlxuICAgIGlmICghKGNvZGUgPiA2OTkgJiYgY29kZSA8IDgwMCkgJiYgIShjb2RlID4gODk5ICYmIGNvZGUgPCAxMDAwKSkge1xuICAgICAgaWNvbiA9ICdkYXktJyArIGljb247XG4gICAgfVxuICAgIGljb24gPSBwcmVmaXggKyBpY29uO1xuICAgIHJldHVybiBpY29uO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFRva2VuS2V5KCkge1xuICAgIHJldHVybiAnQVBQSUQnO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXBVbml0cyh1bml0OiBUZW1wZXJhdHVyZVNjYWxlKSB7XG4gICAgc3dpdGNoICh1bml0KSB7XG4gICAgICBjYXNlIFRlbXBlcmF0dXJlU2NhbGUuQ0VMQ0lVUzpcbiAgICAgICAgcmV0dXJuICdtZXRyaWMnO1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLkZBSFJFTkhFSVQ6XG4gICAgICAgIHJldHVybiAnaW1wZXJpYWwnO1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLktFTFZJTjpcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdtZXRyaWMnO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5XZWF0aGVyTWFwTG9jYXRpb25SZXF1ZXN0IHtcbiAgaWQ/OiBhbnk7XG4gIHE/OiBhbnk7XG4gIGxhdD86IGFueTtcbiAgbG9uPzogYW55O1xuICB6aXA/OiBhbnk7XG4gIHVuaXRzPzogJ2ltcGVyaWFsJyB8ICdtZXRyaWMnO1xuICBsYW5nPzogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5XZWF0aGVyTWFwQ3VycmVudFdlYXRoZXJSZXNwb25zZSB7XG4gIGNvb3JkOiB7IGxvbjogbnVtYmVyOyBsYXQ6IG51bWJlciB9O1xuICB3ZWF0aGVyOiBbeyBpZDogbnVtYmVyOyBtYWluOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IGljb246IHN0cmluZyB9XTtcbiAgYmFzZTogc3RyaW5nO1xuICBtYWluOiB7XG4gICAgdGVtcDogbnVtYmVyO1xuICAgIHByZXNzdXJlOiBudW1iZXI7XG4gICAgaHVtaWRpdHk6IG51bWJlcjtcbiAgICB0ZW1wX21pbjogbnVtYmVyO1xuICAgIHRlbXBfbWF4OiBudW1iZXI7XG4gIH07XG4gIHZpc2liaWxpdHk6IG51bWJlcjtcbiAgd2luZDogeyBzcGVlZDogbnVtYmVyOyBkZWc6IG51bWJlciB9O1xuICBjbG91ZHM6IHsgYWxsOiBudW1iZXIgfTtcbiAgZHQ6IG51bWJlcjtcbiAgc3lzOiB7XG4gICAgdHlwZTogbnVtYmVyO1xuICAgIGlkOiBudW1iZXI7XG4gICAgbWVzc2FnZTogbnVtYmVyO1xuICAgIGNvdW50cnk6IHN0cmluZztcbiAgICBzdW5yaXNlOiBudW1iZXI7XG4gICAgc3Vuc2V0OiBudW1iZXI7XG4gIH07XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgY29kOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbldlYXRoZXJNYXBGb3JlY2FzdFJlc3BvbnNlIHtcbiAgY2l0eToge1xuICAgIGNvb3JkOiB7XG4gICAgICBsYXQ6IG51bWJlcjtcbiAgICAgIGxvbjogbnVtYmVyO1xuICAgIH07XG4gICAgY291bnRyeTogc3RyaW5nO1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICB9O1xuICBtZXNzYWdlOiBudW1iZXI7XG4gIGNvZDogc3RyaW5nO1xuICBjbnQ6IG51bWJlcjtcbiAgbGlzdDogT3BlbldlYXRoZXJNYXBGb3JlY2FzdFJlc3BvbnNlRWxlbWVudFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5XZWF0aGVyTWFwRm9yZWNhc3RSZXNwb25zZUVsZW1lbnQge1xuICBjbG91ZHM6IHtcbiAgICBhbGw6IG51bWJlcjtcbiAgfTtcbiAgZHQ6IG51bWJlcjtcbiAgZHRfdHh0OiBzdHJpbmc7XG4gIG1haW46IHtcbiAgICBncm5kX2xldmVsOiBudW1iZXI7XG4gICAgdGVtcDogbnVtYmVyO1xuICAgIHByZXNzdXJlOiBudW1iZXI7XG4gICAgaHVtaWRpdHk6IG51bWJlcjtcbiAgICB0ZW1wX21pbjogbnVtYmVyO1xuICAgIHRlbXBfbWF4OiBudW1iZXI7XG4gICAgdGVtcF9rZjogbnVtYmVyO1xuICAgIHNlYV9sZXZlbDogbnVtYmVyO1xuICB9O1xuICBzeXM6IHtcbiAgICBwb2Q6IHN0cmluZztcbiAgfTtcbiAgd2VhdGhlcjogW3sgaWQ6IG51bWJlcjsgbWFpbjogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nOyBpY29uOiBzdHJpbmcgfV07XG4gIHdpbmQ6IHsgc3BlZWQ6IG51bWJlcjsgZGVnOiBudW1iZXIgfTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItY3VycmVudC1kZXRhaWxzJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICA6aG9zdCB7XG4gICAgICBmb250LXNpemU6IDAuOGVtO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgbWFyZ2luLXRvcDogMWVtO1xuICAgIH1cbiAgICAucm93IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuICAgIC5yb3cgc3BhbiB7XG4gICAgICBtYXJnaW46IDAgMC4zZW07XG4gICAgfVxuICAgIC53aSB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuM2VtO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxpIGNsYXNzPVwid2kgd2ktdGhlcm1vbWV0ZXJcIj48L2k+XG4gICAgICA8c3Bhbj5cbiAgICAgICAgICA8c3Bhbj5NaW46IHt7bWluVGVtcH19JmRlZzs8L3NwYW4+XG4gICAgICAgICAgPHNwYW4+TWF4OiB7e21heFRlbXB9fSZkZWc7PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuXG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPHNwYW4+PGkgY2xhc3M9XCJ3aSB3aS1iYXJvbWV0ZXJcIj48L2k+UHJlc3N1cmU6IHt7cHJlc3N1cmV9fTwvc3Bhbj5cbiAgICAgIDxzcGFuPjxpIGNsYXNzPVwid2kgd2ktaHVtaWRpdHlcIj48L2k+SHVtaWRpdHk6IHt7aHVtaWRpdHl9fSU8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckN1cnJlbnREZXRhaWxzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbWF4VGVtcCE6IG51bWJlcjtcbiAgQElucHV0KCkgbWluVGVtcCE6IG51bWJlcjtcbiAgQElucHV0KCkgcHJlc3N1cmUhOiBudW1iZXI7XG4gIEBJbnB1dCgpIGh1bWlkaXR5ITogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcmVjYXN0IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9yZWNhc3RNb2RlLCBXZWF0aGVyU2V0dGluZ3MgfSBmcm9tICcuLi8uLi93ZWF0aGVyLmludGVyZmFjZXMnO1xuaW1wb3J0IHByZXZlbnRFeHRlbnNpb25zID0gUmVmbGVjdC5wcmV2ZW50RXh0ZW5zaW9ucztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1mb3JlY2FzdCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMWVtO1xuICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHdlYXRoZXItZm9yZWNhc3Qtc2ltcGxlLWdyaWRcbiAgICAgICpuZ0lmPVwiaXNHcmlkRm9yZWNhc3RcIlxuICAgICAgW2ZvcmVjYXN0XT1cImZvcmVjYXN0XCI+PC93ZWF0aGVyLWZvcmVjYXN0LXNpbXBsZS1ncmlkPlxuICAgIDx3ZWF0aGVyLWZvcmVjYXN0LWRldGFpbGVkXG4gICAgICAqbmdJZj1cIiFpc0dyaWRGb3JlY2FzdFwiXG4gICAgICBbc2V0dGluZ3NdPVwic2V0dGluZ3NcIlxuICAgICAgW2ZvcmVjYXN0XT1cImZvcmVjYXN0XCI+PC93ZWF0aGVyLWZvcmVjYXN0LWRldGFpbGVkPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJGb3JlY2FzdENvbXBvbmVudCB7XG4gIGlzR3JpZEZvcmVjYXN0ID0gdHJ1ZTtcbiAgQElucHV0KClcbiAgc2V0IG1vZGUodmFsdWU6IEZvcmVjYXN0TW9kZSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBGb3JlY2FzdE1vZGUuR1JJRDpcbiAgICAgICAgdGhpcy5pc0dyaWRGb3JlY2FzdCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGb3JlY2FzdE1vZGUuREVUQUlMRUQ6XG4gICAgICAgIHRoaXMuaXNHcmlkRm9yZWNhc3QgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmlzR3JpZEZvcmVjYXN0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpIHNldHRpbmdzITogV2VhdGhlclNldHRpbmdzO1xuICBASW5wdXQoKVxuICBzZXQgZm9yZWNhc3QodmFsdWU6IEZvcmVjYXN0W10pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2ZvcmVjYXN0ID0gdmFsdWU7XG4gIH1cblxuICBnZXQgZm9yZWNhc3QoKTogRm9yZWNhc3RbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcmVjYXN0O1xuICB9XG4gIHByaXZhdGUgX2ZvcmVjYXN0ITogRm9yZWNhc3RbXTtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcmVjYXN0IH0gZnJvbSAnLi9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDaGFydERhdGEgfSBmcm9tICdjaGFydC5qcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWF0aGVySGVscGVyc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ3JvdXBGb3JlY2FzdHNCeURheShsaXN0OiBGb3JlY2FzdFtdKTogQXJyYXk8Rm9yZWNhc3RbXT4ge1xuICAgIGNvbnN0IG1hcDogeyBba2V5OiBzdHJpbmddOiBGb3JlY2FzdFtdIH0gPSB7fTtcbiAgICBsZXQgcmVzdWx0OiBBcnJheTxGb3JlY2FzdFtdPiA9IFtdO1xuICAgIGxpc3QuZm9yRWFjaChlbCA9PiB7XG4gICAgICBjb25zdCBkYXkgPSBlbC5kYXRhLmdldFVUQ0RhdGUoKTtcbiAgICAgIGlmICghbWFwW2RheV0pIHtcbiAgICAgICAgbWFwW2RheV0gPSBbZWxdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwW2RheV0ucHVzaChlbCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVzdWx0ID0gT2JqZWN0LmtleXMobWFwKS5tYXAoa2V5ID0+IG1hcFtrZXldKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gRml4bWU6IFRoaXMgZnVuY3Rpb24gZ2VuZXJhdGVzIHdyb25nIGljb24gZm9yIGF2ZXJhZ2UgZGF5IHdlYXRoZXIuXG4gIC8vIFdlYXRoZXIgaWNvbiBpcyB0YWtlbiBmcm9tIGZpcnN0IGRheSBtZWFzdXJlbWVudFxuICByZWR1Y2VUb0F2ZXJhZ2VQZXJEYXkobGlzdDogRm9yZWNhc3RbXSkge1xuICAgIHJldHVybiBsaXN0LnJlZHVjZSgocHJldjogRm9yZWNhc3RbXSwgY3VycikgPT4ge1xuICAgICAgaWYgKGN1cnIgJiYgIWN1cnIuZGF0YSkge1xuICAgICAgICBwcmV2LnB1c2goY3Vycik7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfVxuICAgICAgY29uc3QgbGFzdEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByZXZbcHJldi5sZW5ndGggLSAxXTtcbiAgICAgIH07XG4gICAgICBjb25zdCBwcmV2RGF5ID0gbGFzdEVsZW1lbnQoKVxuICAgICAgICA/IHByZXZbcHJldi5sZW5ndGggLSAxXS5kYXRhLmdldERheSgpXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IGN1cnJEYXkgPSBjdXJyLmRhdGEuZ2V0RGF5KCk7XG4gICAgICBpZiAoY3VyckRheSA9PT0gcHJldkRheSkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IEZvcmVjYXN0ID0gbGFzdEVsZW1lbnQoKTtcbiAgICAgICAgcmVzdWx0LnRlbXAgPSAocmVzdWx0LnRlbXAgKyBjdXJyLnRlbXApIC8gMjtcbiAgICAgICAgaWYgKHJlc3VsdC53aW5kICYmIGN1cnIud2luZCkge1xuICAgICAgICAgIHJlc3VsdC53aW5kID0ge1xuICAgICAgICAgICAgc3BlZWQ6IChyZXN1bHQud2luZC5zcGVlZCArIGN1cnIud2luZC5zcGVlZCkgLyAyLFxuICAgICAgICAgICAgZGVnOiAocmVzdWx0LndpbmQuZGVnICsgY3Vyci53aW5kLmRlZykgLyAyXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQuaHVtaWRpdHkgJiYgY3Vyci5odW1pZGl0eSkge1xuICAgICAgICAgIHJlc3VsdC5odW1pZGl0eSA9IChyZXN1bHQuaHVtaWRpdHkgKyBjdXJyLmh1bWlkaXR5KSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdC5wcmVzc3VyZSAmJiBjdXJyLnByZXNzdXJlKSB7XG4gICAgICAgICAgcmVzdWx0LnByZXNzdXJlID0gKHJlc3VsdC5wcmVzc3VyZSArIGN1cnIucHJlc3N1cmUpIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZbcHJldi5sZW5ndGggLSAxXSA9IHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2LnB1c2goY3Vycik7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfVxuICAgIH0sIFtdKTtcbiAgfVxuXG4gIG1hcEZvcmVjYXN0VG9DaGFydHMoZm9yZWNhc3Q6IEZvcmVjYXN0W10sIGJvcmRlckNvbG9yID0gJyNhYWEnKTogQ2hhcnREYXRhIHtcbiAgICByZXR1cm4gZm9yZWNhc3QucmVkdWNlKFxuICAgICAgKHByZXY6IENoYXJ0RGF0YSwgY3VycjogRm9yZWNhc3QpID0+IHtcbiAgICAgICAgaWYgKHByZXYubGFiZWxzKSB7XG4gICAgICAgICAgcHJldi5sYWJlbHMucHVzaChjdXJyLmRhdGEudG9JU09TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXYuZGF0YXNldHMgJiYgcHJldi5kYXRhc2V0c1swXSAmJiBwcmV2LmRhdGFzZXRzWzBdLmRhdGEpIHtcbiAgICAgICAgICBjb25zdCBkYXRhOiBudW1iZXJbXSA9IDxudW1iZXJbXT5wcmV2LmRhdGFzZXRzWzBdLmRhdGE7XG4gICAgICAgICAgZGF0YS5wdXNoKGN1cnIudGVtcCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH0sXG4gICAgICA8Q2hhcnREYXRhPntcbiAgICAgICAgbGFiZWxzOiBbXSxcbiAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogWydyZ2JhKDAsIDAsIDAsIDAuMSknXSxcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiBbYm9yZGVyQ29sb3JdLFxuICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDFcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgaGV4VG9SZ2JBKGhleDogc3RyaW5nLCBvcGFjaXR5OiBzdHJpbmcpIHtcbiAgICBsZXQgYzogYW55O1xuICAgIGlmICgvXiMoW0EtRmEtZjAtOV17M30pezEsMn0kLy50ZXN0KGhleCkpIHtcbiAgICAgIGMgPSBoZXguc3Vic3RyaW5nKDEpLnNwbGl0KCcnKTtcbiAgICAgIGlmIChjLmxlbmd0aCA9PT0gMykge1xuICAgICAgICBjID0gW2NbMF0sIGNbMF0sIGNbMV0sIGNbMV0sIGNbMl0sIGNbMl1dO1xuICAgICAgfVxuICAgICAgYyA9ICcweCcgKyBjLmpvaW4oJycpO1xuICAgICAgcmV0dXJuIGByZ2JhKCR7WyhjID4+IDE2KSAmIDI1NSwgKGMgPj4gOCkgJiAyNTUsIGMgJiAyNTVdLmpvaW4oXG4gICAgICAgICcsJ1xuICAgICAgKX0sJHtvcGFjaXR5fSlgO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9yZWNhc3QgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVySGVscGVyc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy93ZWF0aGVyLWhlbHBlcnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItZm9yZWNhc3Qtc2ltcGxlLWdyaWQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgd2VhdGhlci1mb3JlY2FzdC1ncmlkLWRheSB7XG4gICAgICAgICAgICAgbWFyZ2luOiAwIDAuNGVtO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmb3JlY2FzdCBvZiBmb3JlY2FzdFBlckRheVwiPlxuICAgICAgPHdlYXRoZXItZm9yZWNhc3QtZ3JpZC1kYXkgW2ZvcmVjYXN0XT1cImZvcmVjYXN0XCI+PC93ZWF0aGVyLWZvcmVjYXN0LWdyaWQtZGF5PlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJGb3JlY2FzdFNpbXBsZUdyaWRDb21wb25lbnQge1xuICBmb3JlY2FzdFBlckRheSE6IEZvcmVjYXN0W107XG4gIEBJbnB1dCgpXG4gIHNldCBmb3JlY2FzdCh2YWx1ZTogRm9yZWNhc3RbXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZm9yZWNhc3QgPSB2YWx1ZTtcbiAgICB0aGlzLmZvcmVjYXN0UGVyRGF5ID0gdGhpcy53ZWF0aGVySGVscGVycy5yZWR1Y2VUb0F2ZXJhZ2VQZXJEYXkoXG4gICAgICB0aGlzLl9mb3JlY2FzdFxuICAgICk7XG4gIH1cbiAgZ2V0IGZvcmVjYXN0KCk6IEZvcmVjYXN0W10ge1xuICAgIHJldHVybiB0aGlzLl9mb3JlY2FzdDtcbiAgfVxuICBwcml2YXRlIF9mb3JlY2FzdCE6IEZvcmVjYXN0W107XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2VhdGhlckhlbHBlcnM6IFdlYXRoZXJIZWxwZXJzU2VydmljZSkge31cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JlY2FzdCB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1mb3JlY2FzdC1ncmlkLWRheScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICA6aG9zdCB7XG4gICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICBmb250LXNpemU6IDEuMmVtO1xuICAgfVxuICAgd2VhdGhlci1pY29uIHtcbiAgICAgZm9udC1zaXplOiAxLjRlbTtcbiAgIH1cbiAgIC5kYXkge1xuICAgICBmb250LXNpemU6IDAuOGVtXG4gICB9XG4gYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPHdlYXRoZXItaWNvbiBbaWNvbkNsYXNzXT1cImZvcmVjYXN0Py5pY29uQ2xhc3NcIj48L3dlYXRoZXItaWNvbj5cbiAgICAgIDx3ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUgW3RlbXBdPVwiZm9yZWNhc3Q/LnRlbXBcIj48L3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJkYXlcIj57e2ZvcmVjYXN0Py5kYXRhIHwgZGF0ZTonRUVFJyB9fTwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJGb3JlY2FzdEdyaWREYXlDb21wb25lbnQge1xuICBASW5wdXQoKSBmb3JlY2FzdCE6IEZvcmVjYXN0O1xufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcmVjYXN0IH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlckhlbHBlcnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvd2VhdGhlci1oZWxwZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlclNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vd2VhdGhlci5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1mb3JlY2FzdC1kZXRhaWxlZCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtgYF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZm9yZWNhc3Qgb2YgZm9yZWNhc3RQZXJEYXlcIj5cbiAgICAgIDx3ZWF0aGVyLWZvcmVjYXN0LWRldGFpbC1kYXlcbiAgICAgICAgW3NldHRpbmdzXT1cInNldHRpbmdzXCJcbiAgICAgICAgW2ZvcmVjYXN0XT1cImZvcmVjYXN0XCI+PC93ZWF0aGVyLWZvcmVjYXN0LWRldGFpbC1kYXk+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyRm9yZWNhc3REZXRhaWxlZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHNldCBmb3JlY2FzdCh2YWx1ZTogRm9yZWNhc3RbXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZm9yZWNhc3QgPSB2YWx1ZTtcbiAgICB0aGlzLmZvcmVjYXN0UGVyRGF5ID0gdGhpcy53ZWF0aGVySGVscGVycy5ncm91cEZvcmVjYXN0c0J5RGF5KHZhbHVlKTtcbiAgfVxuICBASW5wdXQoKSBzZXR0aW5ncyE6IFdlYXRoZXJTZXR0aW5ncztcbiAgZm9yZWNhc3RQZXJEYXk6IEFycmF5PEZvcmVjYXN0W10+ID0gW107XG4gIHByaXZhdGUgX2ZvcmVjYXN0ITogRm9yZWNhc3RbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3ZWF0aGVySGVscGVyczogV2VhdGhlckhlbHBlcnNTZXJ2aWNlKSB7fVxufVxuIiwiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0RGF0YSwgQ2hhcnRPcHRpb25zIH0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0IHsgRm9yZWNhc3QgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVySGVscGVyc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy93ZWF0aGVyLWhlbHBlcnMuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVyU2V0dGluZ3MgfSBmcm9tICcuLi8uLi8uLi93ZWF0aGVyLmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZWF0aGVyLWZvcmVjYXN0LWRldGFpbC1kYXknLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMDtcbiAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMWVtO1xuICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIDpob3N0ID4gKiB7XG4gICAgICAgICAgICAgICBwYWRkaW5nOiAwIDAuNGVtO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAubGVmdCB7XG4gICAgICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIHdlYXRoZXItY2hhcnQge1xuICAgICAgICAgICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgICAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgICAgICAgICAgIGZsZXg6IDEgMTtcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICB3ZWF0aGVyLWljb24ge1xuICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMC4zZW07XG4gICAgICAgICAgICAgICBmb250LXNpemU6IDEuNGVtO1xuICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cbiAgICAgIHt7Zm9yZWNhc3RbMF0/LmRhdGEgfCBkYXRlOidFRUUnIH19XG4gICAgICA8d2VhdGhlci1pY29uIFtpY29uQ2xhc3NdPVwiZm9yZWNhc3RbMF0/Lmljb25DbGFzc1wiPjwvd2VhdGhlci1pY29uPlxuICAgIDwvZGl2PlxuICAgIDx3ZWF0aGVyLWNoYXJ0XG4gICAgICBbdHlwZV09XCInbGluZSdcIlxuICAgICAgW2RhdGFdPVwiY2hhcnREYXRhXCJcbiAgICAgIFtvcHRpb25zXT1cImNoYXJ0T3B0aW9uc1wiXG4gICAgPjwvd2VhdGhlci1jaGFydD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyRm9yZWNhc3REZXRhaWxEYXlDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBjaGFydERhdGEhOiBDaGFydERhdGE7XG4gIGNoYXJ0T3B0aW9ucyE6IENoYXJ0T3B0aW9ucztcbiAgQElucHV0KCkgc2V0dGluZ3MhOiBXZWF0aGVyU2V0dGluZ3M7XG5cbiAgQElucHV0KClcbiAgc2V0IGZvcmVjYXN0KHZhbHVlOiBGb3JlY2FzdFtdKSB7XG4gICAgdGhpcy5fZm9yZWNhc3QgPSB2YWx1ZTtcbiAgfVxuICBnZXQgZm9yZWNhc3QoKTogRm9yZWNhc3RbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcmVjYXN0O1xuICB9XG4gIHByaXZhdGUgX2ZvcmVjYXN0ITogRm9yZWNhc3RbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdlYXRoZXJIZWxwZXJzOiBXZWF0aGVySGVscGVyc1NlcnZpY2UpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MgJiYgY2hhbmdlWydmb3JlY2FzdCddKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNoYXJ0T3B0aW9ucygpO1xuICAgICAgdGhpcy5jaGFydERhdGEgPSB0aGlzLndlYXRoZXJIZWxwZXJzLm1hcEZvcmVjYXN0VG9DaGFydHMoXG4gICAgICAgIHRoaXMuX2ZvcmVjYXN0LFxuICAgICAgICB0aGlzLnNldHRpbmdzLmNvbG9yXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ2hhcnRPcHRpb25zKCkge1xuICAgIHRoaXMuY2hhcnRPcHRpb25zID0ge1xuICAgICAgc2NhbGVzOiB7XG4gICAgICAgIHhBeGVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3RpbWUnLFxuICAgICAgICAgICAgdGltZToge1xuICAgICAgICAgICAgICB1bml0OiAnaG91cicsXG4gICAgICAgICAgICAgIGlzb1dlZWtkYXk6IHRydWUsXG4gICAgICAgICAgICAgIGRpc3BsYXlGb3JtYXRzOiB7XG4gICAgICAgICAgICAgICAgaG91cjogJ2hBJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0b29sdGlwRm9ybWF0OiAnTExMJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyaWRMaW5lczoge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgIGZvbnRDb2xvcjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzICYmIHRoaXMuc2V0dGluZ3MuY29sb3JcbiAgICAgICAgICAgICAgICAgID8gdGhpcy53ZWF0aGVySGVscGVycy5oZXhUb1JnYkEodGhpcy5zZXR0aW5ncy5jb2xvciwgJzAuOCcpXG4gICAgICAgICAgICAgICAgICA6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBtYXhUaWNrc0xpbWl0OiAzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICB5QXhlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGdyaWRMaW5lczoge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgIGZvbnRDb2xvcjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzICYmIHRoaXMuc2V0dGluZ3MuY29sb3JcbiAgICAgICAgICAgICAgICAgID8gdGhpcy53ZWF0aGVySGVscGVycy5oZXhUb1JnYkEodGhpcy5zZXR0aW5ncy5jb2xvciwgJzAuOCcpXG4gICAgICAgICAgICAgICAgICA6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBhdXRvU2tpcDogdHJ1ZSxcbiAgICAgICAgICAgICAgbGFiZWxPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgIG1pcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgIG1heFRpY2tzTGltaXQ6IDMsXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgbGVnZW5kOiB7XG4gICAgICAgIGRpc3BsYXk6IGZhbHNlLFxuICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbSdcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRPcHRpb25zLCBDaGFydERhdGEsIENoYXJ0IH0gZnJvbSAnY2hhcnQuanMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1jaGFydCcsXG4gIHRlbXBsYXRlOiAnPGNhbnZhcz48L2NhbnZhcz4nLFxuICBzdHlsZXM6IFsnOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfSddXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBjaGFydDogYW55O1xuXG4gIEBJbnB1dCgpIHR5cGUhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRhdGEhOiBDaGFydERhdGE7XG4gIEBJbnB1dCgpIG9wdGlvbnMhOiBDaGFydE9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucy5zY2FsZXMgPSB7XG4gICAgICB5QXhlczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBleGNlc3MgZGVjaW1hbCBwbGFjZXNcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xuICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlLnRvRml4ZWQoMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gICAgdGhpcy5jaGFydCA9IG5ldyBDaGFydChcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpLFxuICAgICAge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5jaGFydCAmJiBjaGFuZ2VzWydkYXRhJ10pIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ2RhdGEnXS5jdXJyZW50VmFsdWU7XG4gICAgICBbJ2RhdGFzZXRzJywgJ2xhYmVscycsICd4TGFiZWxzJywgJ3lMYWJlbHMnXS5mb3JFYWNoKHByb3BlcnR5ID0+IHtcbiAgICAgICAgdGhpcy5jaGFydC5kYXRhW3Byb3BlcnR5XSA9IGN1cnJlbnRWYWx1ZVtwcm9wZXJ0eV07XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY2hhcnQudXBkYXRlKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JlY2FzdCB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJIZWxwZXJzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3dlYXRoZXItaGVscGVycy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1mb3JlY2FzdC1jaGFydC13aWRlJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgICAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG5cbiAgICA8L2Rpdj5cblxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJGb3JlY2FzdENoYXJ0V2lkZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGZvcmVjYXN0ITogRm9yZWNhc3RbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBoZWxwZXJzOiBXZWF0aGVySGVscGVyc1NlcnZpY2UpIHt9XG59XG4iLCJpbXBvcnQge1xuICBPcGVuV2VhdGhlck1hcEN1cnJlbnRXZWF0aGVyUmVzcG9uc2UsXG4gIE9wZW5XZWF0aGVyTWFwRm9yZWNhc3RSZXNwb25zZVxufSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkvb3Blbi13ZWF0aGVyLW1hcC9vcGVuLXdlYXRoZXItbWFwLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEN1cnJlbnRXZWF0aGVyLCBGb3JlY2FzdCB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IE9QRU5fV0VBVEhFUl9NQVBfUkVTUE9OU0VfTU9DSzogT3BlbldlYXRoZXJNYXBDdXJyZW50V2VhdGhlclJlc3BvbnNlID0ge1xuICBjb29yZDogeyBsb246IDE0LjYyLCBsYXQ6IDUzLjQzIH0sXG4gIHdlYXRoZXI6IFtcbiAgICB7IGlkOiA4MDMsIG1haW46ICdDbG91ZHMnLCBkZXNjcmlwdGlvbjogJ2Jyb2tlbiBjbG91ZHMnLCBpY29uOiAnMDRkJyB9XG4gIF0sXG4gIGJhc2U6ICdzdGF0aW9ucycsXG4gIG1haW46IHtcbiAgICB0ZW1wOiAyODUuMTUsXG4gICAgcHJlc3N1cmU6IDEwMjEsXG4gICAgaHVtaWRpdHk6IDkzLFxuICAgIHRlbXBfbWluOiAyODUuMTUsXG4gICAgdGVtcF9tYXg6IDI4NS4xNVxuICB9LFxuICB2aXNpYmlsaXR5OiAxMDAwMCxcbiAgd2luZDogeyBzcGVlZDogMC41LCBkZWc6IDkwIH0sXG4gIGNsb3VkczogeyBhbGw6IDc1IH0sXG4gIGR0OiAxNTAwMzUwNDAwLFxuICBzeXM6IHtcbiAgICB0eXBlOiAxLFxuICAgIGlkOiA1MzY5LFxuICAgIG1lc3NhZ2U6IDAuMDAyMyxcbiAgICBjb3VudHJ5OiAnUEwnLFxuICAgIHN1bnJpc2U6IDE1MDAzNDY1NzgsXG4gICAgc3Vuc2V0OiAxNTAwNDA1NTAzXG4gIH0sXG4gIGlkOiA3NTMwODQwLFxuICBuYW1lOiAnU3pjemVjaW4nLFxuICBjb2Q6IDIwMFxufTtcblxuLy9ub2luc3BlY3Rpb24gVHNMaW50XG5leHBvcnQgY29uc3QgT1BFTl9XRUFUSEVSX01BUF9GT1JFQ0FTVDogT3BlbldlYXRoZXJNYXBGb3JlY2FzdFJlc3BvbnNlID0ge1xuICBjb2Q6ICcyMDAnLFxuICBtZXNzYWdlOiAwLjAwNzcsXG4gIGNudDogMzYsXG4gIGxpc3Q6IFtcbiAgICB7XG4gICAgICBkdDogMTUwMDQ2NTYwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMTguNzQsXG4gICAgICAgIHRlbXBfbWluOiAxNy4yMyxcbiAgICAgICAgdGVtcF9tYXg6IDE4Ljc0LFxuICAgICAgICBwcmVzc3VyZTogOTYyLjEzLFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjcuODIsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2Mi4xMyxcbiAgICAgICAgaHVtaWRpdHk6IDg1LFxuICAgICAgICB0ZW1wX2tmOiAxLjUxXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDAuODgsIGRlZzogODUuMDAwNiB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTE5IDEyOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA0NzY0MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDIxLjk3LFxuICAgICAgICB0ZW1wX21pbjogMjAuODUsXG4gICAgICAgIHRlbXBfbWF4OiAyMS45NyxcbiAgICAgICAgcHJlc3N1cmU6IDk2My4zLFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjkuMDQsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2My4zLFxuICAgICAgICBodW1pZGl0eTogNjksXG4gICAgICAgIHRlbXBfa2Y6IDEuMTNcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4xNiwgZGVnOiA5OC41MDAzIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMTkgMTU6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDQ4NzIwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjcuNDksXG4gICAgICAgIHRlbXBfbWluOiAyNi43MyxcbiAgICAgICAgdGVtcF9tYXg6IDI3LjQ5LFxuICAgICAgICBwcmVzc3VyZTogOTYzLjcsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyOS4xMSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYzLjcsXG4gICAgICAgIGh1bWlkaXR5OiA1NyxcbiAgICAgICAgdGVtcF9rZjogMC43NVxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMWQnIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjIyLCBkZWc6IDE4OS4wMDEgfSxcbiAgICAgIHN5czogeyBwb2Q6ICdkJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0xOSAxODowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNDk4MDAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyOS42OSxcbiAgICAgICAgdGVtcF9taW46IDI5LjMyLFxuICAgICAgICB0ZW1wX21heDogMjkuNjksXG4gICAgICAgIHByZXNzdXJlOiA5NjMuMTQsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyOC4xMixcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYzLjE0LFxuICAgICAgICBodW1pZGl0eTogNTAsXG4gICAgICAgIHRlbXBfa2Y6IDAuMzhcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4yNiwgZGVnOiAyMDQuMDAxIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMTkgMjE6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDUwODgwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjkuMTYsXG4gICAgICAgIHRlbXBfbWluOiAyOS4xNixcbiAgICAgICAgdGVtcF9tYXg6IDI5LjE2LFxuICAgICAgICBwcmVzc3VyZTogOTYxLjUsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyNi40NSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYxLjUsXG4gICAgICAgIGh1bWlkaXR5OiA0NSxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjMsIGRlZzogMjEzLjUwMyB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIwIDAwOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA1MTk2MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDI1LjAyLFxuICAgICAgICB0ZW1wX21pbjogMjUuMDIsXG4gICAgICAgIHRlbXBfbWF4OiAyNS4wMixcbiAgICAgICAgcHJlc3N1cmU6IDk2MS43LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjYuNzUsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2MS43LFxuICAgICAgICBodW1pZGl0eTogNTEsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4xNywgZGVnOiAyMDcuNSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIwIDAzOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA1MzA0MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDIwLjA4LFxuICAgICAgICB0ZW1wX21pbjogMjAuMDgsXG4gICAgICAgIHRlbXBfbWF4OiAyMC4wOCxcbiAgICAgICAgcHJlc3N1cmU6IDk2Mi41OSxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI4LjA4LFxuICAgICAgICBncm5kX2xldmVsOiA5NjIuNTksXG4gICAgICAgIGh1bWlkaXR5OiA2OSxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjg2LCBkZWc6IDE4Ni4wMDEgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMCAwNjowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNTQxMjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAxNy44LFxuICAgICAgICB0ZW1wX21pbjogMTcuOCxcbiAgICAgICAgdGVtcF9tYXg6IDE3LjgsXG4gICAgICAgIHByZXNzdXJlOiA5NjIuMTUsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyNy43NixcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYyLjE1LFxuICAgICAgICBodW1pZGl0eTogNzksXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMC45MSwgZGVnOiA2Mi41MDA5IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjAgMDk6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDU1MjAwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMTYuNjEsXG4gICAgICAgIHRlbXBfbWluOiAxNi42MSxcbiAgICAgICAgdGVtcF9tYXg6IDE2LjYxLFxuICAgICAgICBwcmVzc3VyZTogOTYxLjksXG4gICAgICAgIHNlYV9sZXZlbDogMTAyNy42MSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYxLjksXG4gICAgICAgIGh1bWlkaXR5OiA4MyxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjg2LCBkZWc6IDcwLjUwMDUgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMCAxMjowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNTYyODAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyMS4xMSxcbiAgICAgICAgdGVtcF9taW46IDIxLjExLFxuICAgICAgICB0ZW1wX21heDogMjEuMTEsXG4gICAgICAgIHByZXNzdXJlOiA5NjIuNTksXG4gICAgICAgIHNlYV9sZXZlbDogMTAyOC4yOCxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYyLjU5LFxuICAgICAgICBodW1pZGl0eTogNjUsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4yMSwgZGVnOiA2Ny41MDE2IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjAgMTU6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDU3MzYwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjcuMzEsXG4gICAgICAgIHRlbXBfbWluOiAyNy4zMSxcbiAgICAgICAgdGVtcF9tYXg6IDI3LjMxLFxuICAgICAgICBwcmVzc3VyZTogOTYyLjg0LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjguMDUsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2Mi44NCxcbiAgICAgICAgaHVtaWRpdHk6IDUzLFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxZCcgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMjYsIGRlZzogMTk2LjUwMiB9LFxuICAgICAgc3lzOiB7IHBvZDogJ2QnIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIwIDE4OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA1ODQ0MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDI5LjUyLFxuICAgICAgICB0ZW1wX21pbjogMjkuNTIsXG4gICAgICAgIHRlbXBfbWF4OiAyOS41MixcbiAgICAgICAgcHJlc3N1cmU6IDk2MS45OCxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI2LjkyLFxuICAgICAgICBncm5kX2xldmVsOiA5NjEuOTgsXG4gICAgICAgIGh1bWlkaXR5OiA0NixcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMWQnIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjIxLCBkZWc6IDE5NiB9LFxuICAgICAgc3lzOiB7IHBvZDogJ2QnIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIwIDIxOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA1OTUyMDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDI5LjM2LFxuICAgICAgICB0ZW1wX21pbjogMjkuMzYsXG4gICAgICAgIHRlbXBfbWF4OiAyOS4zNixcbiAgICAgICAgcHJlc3N1cmU6IDk2MC4zMyxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI1LjEzLFxuICAgICAgICBncm5kX2xldmVsOiA5NjAuMzMsXG4gICAgICAgIGh1bWlkaXR5OiA0MCxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjIzLCBkZWc6IDIwOS41MDIgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMSAwMDowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNjA2MDAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyNC45NixcbiAgICAgICAgdGVtcF9taW46IDI0Ljk2LFxuICAgICAgICB0ZW1wX21heDogMjQuOTYsXG4gICAgICAgIHByZXNzdXJlOiA5NjAuMTMsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyNS4xMyxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYwLjEzLFxuICAgICAgICBodW1pZGl0eTogNDUsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMC45NiwgZGVnOiAyMDYuMDA3IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjEgMDM6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDYxNjgwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMTguOTksXG4gICAgICAgIHRlbXBfbWluOiAxOC45OSxcbiAgICAgICAgdGVtcF9tYXg6IDE4Ljk5LFxuICAgICAgICBwcmVzc3VyZTogOTYwLjcyLFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjYuMTUsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2MC43MixcbiAgICAgICAgaHVtaWRpdHk6IDcyLFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDAuNzEsIGRlZzogMzEzLjUwMSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIxIDA2OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA2Mjc2MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDE2Ljc3LFxuICAgICAgICB0ZW1wX21pbjogMTYuNzcsXG4gICAgICAgIHRlbXBfbWF4OiAxNi43NyxcbiAgICAgICAgcHJlc3N1cmU6IDk2MC4xMixcbiAgICAgICAgc2VhX2xldmVsOiAxMDI1LjY1LFxuICAgICAgICBncm5kX2xldmVsOiA5NjAuMTIsXG4gICAgICAgIGh1bWlkaXR5OiA3OCxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjcyLCBkZWc6IDQ3LjAwMyB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIxIDA5OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA2Mzg0MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDE1LjU1LFxuICAgICAgICB0ZW1wX21pbjogMTUuNTUsXG4gICAgICAgIHRlbXBfbWF4OiAxNS41NSxcbiAgICAgICAgcHJlc3N1cmU6IDk1OS41NyxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI1LjA5LFxuICAgICAgICBncm5kX2xldmVsOiA5NTkuNTcsXG4gICAgICAgIGh1bWlkaXR5OiA3OCxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjcyLCBkZWc6IDQ4LjAwMDUgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMSAxMjowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNjQ5MjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyMS4zNixcbiAgICAgICAgdGVtcF9taW46IDIxLjM2LFxuICAgICAgICB0ZW1wX21heDogMjEuMzYsXG4gICAgICAgIHByZXNzdXJlOiA5NjAuMzUsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyNS43OCxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTYwLjM1LFxuICAgICAgICBodW1pZGl0eTogNTksXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMC45MiwgZGVnOiA3Ny4wMDI0IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjEgMTU6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDY2MDAwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjguMjUsXG4gICAgICAgIHRlbXBfbWluOiAyOC4yNSxcbiAgICAgICAgdGVtcF9tYXg6IDI4LjI1LFxuICAgICAgICBwcmVzc3VyZTogOTYwLjg3LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjUuODQsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2MC44NyxcbiAgICAgICAgaHVtaWRpdHk6IDQ1LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxZCcgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMjYsIGRlZzogMjA1LjAwMiB9LFxuICAgICAgc3lzOiB7IHBvZDogJ2QnIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIxIDE4OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA2NzA4MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDMxLFxuICAgICAgICB0ZW1wX21pbjogMzEsXG4gICAgICAgIHRlbXBfbWF4OiAzMSxcbiAgICAgICAgcHJlc3N1cmU6IDk2MC4yNyxcbiAgICAgICAgc2VhX2xldmVsOiAxMDI0LjksXG4gICAgICAgIGdybmRfbGV2ZWw6IDk2MC4yNyxcbiAgICAgICAgaHVtaWRpdHk6IDM5LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxZCcgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMzEsIGRlZzogMjE1LjUwMiB9LFxuICAgICAgc3lzOiB7IHBvZDogJ2QnIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIxIDIxOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA2ODE2MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDMwLjgyLFxuICAgICAgICB0ZW1wX21pbjogMzAuODIsXG4gICAgICAgIHRlbXBfbWF4OiAzMC44MixcbiAgICAgICAgcHJlc3N1cmU6IDk1OC43OSxcbiAgICAgICAgc2VhX2xldmVsOiAxMDIzLjI4LFxuICAgICAgICBncm5kX2xldmVsOiA5NTguNzksXG4gICAgICAgIGh1bWlkaXR5OiAzOCxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjMxLCBkZWc6IDIyMi4wMDIgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMiAwMDowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNjkyNDAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyNi4zMSxcbiAgICAgICAgdGVtcF9taW46IDI2LjMxLFxuICAgICAgICB0ZW1wX21heDogMjYuMzEsXG4gICAgICAgIHByZXNzdXJlOiA5NTguNDYsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMy4yMixcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU4LjQ2LFxuICAgICAgICBodW1pZGl0eTogNDQsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4xMSwgZGVnOiAyMTMuNSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIyIDAzOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA3MDMyMDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDIwLjYyLFxuICAgICAgICB0ZW1wX21pbjogMjAuNjIsXG4gICAgICAgIHRlbXBfbWF4OiAyMC42MixcbiAgICAgICAgcHJlc3N1cmU6IDk1OS4yNixcbiAgICAgICAgc2VhX2xldmVsOiAxMDI0LjMzLFxuICAgICAgICBncm5kX2xldmVsOiA5NTkuMjYsXG4gICAgICAgIGh1bWlkaXR5OiA2MixcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjcxLCBkZWc6IDE1OC41MDMgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMiAwNjowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNzE0MDAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAxOC43MyxcbiAgICAgICAgdGVtcF9taW46IDE4LjczLFxuICAgICAgICB0ZW1wX21heDogMTguNzMsXG4gICAgICAgIHByZXNzdXJlOiA5NTguMjEsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMy40OCxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU4LjIxLFxuICAgICAgICBodW1pZGl0eTogNzAsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogODAyLFxuICAgICAgICAgIG1haW46ICdDbG91ZHMnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnc2NhdHRlcmVkIGNsb3VkcycsXG4gICAgICAgICAgaWNvbjogJzAzbidcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDM2IH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAwLjkxLCBkZWc6IDc2LjAwMjQgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMiAwOTowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNzI0ODAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAxNy41NCxcbiAgICAgICAgdGVtcF9taW46IDE3LjU0LFxuICAgICAgICB0ZW1wX21heDogMTcuNTQsXG4gICAgICAgIHByZXNzdXJlOiA5NTcuNjMsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMy4wNCxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU3LjYzLFxuICAgICAgICBodW1pZGl0eTogNzQsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMC43NywgZGVnOiA2MC41MDA2IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjIgMTI6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDczNTYwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMjIuMDcsXG4gICAgICAgIHRlbXBfbWluOiAyMi4wNyxcbiAgICAgICAgdGVtcF9tYXg6IDIyLjA3LFxuICAgICAgICBwcmVzc3VyZTogOTU4LjcyLFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjMuOTUsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1OC43MixcbiAgICAgICAgaHVtaWRpdHk6IDU3LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxZCcgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMjEsIGRlZzogMTEzLjAwMSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ2QnIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIyIDE1OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA3NDY0MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDI3Ljk0LFxuICAgICAgICB0ZW1wX21pbjogMjcuOTQsXG4gICAgICAgIHRlbXBfbWF4OiAyNy45NCxcbiAgICAgICAgcHJlc3N1cmU6IDk1OS4xNixcbiAgICAgICAgc2VhX2xldmVsOiAxMDI0LjAzLFxuICAgICAgICBncm5kX2xldmVsOiA5NTkuMTYsXG4gICAgICAgIGh1bWlkaXR5OiA0OSxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMWQnIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjIxLCBkZWc6IDE5OS41MDggfSxcbiAgICAgIHN5czogeyBwb2Q6ICdkJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMiAxODowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNzU3MjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAzMC45MSxcbiAgICAgICAgdGVtcF9taW46IDMwLjkxLFxuICAgICAgICB0ZW1wX21heDogMzAuOTEsXG4gICAgICAgIHByZXNzdXJlOiA5NTguNTMsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMy4wNSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU4LjUzLFxuICAgICAgICBodW1pZGl0eTogNDMsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDJkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogOCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4yNiwgZGVnOiAyMTYuMDA4IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjIgMjE6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDc2ODAwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMzAuODksXG4gICAgICAgIHRlbXBfbWluOiAzMC44OSxcbiAgICAgICAgdGVtcF9tYXg6IDMwLjg5LFxuICAgICAgICBwcmVzc3VyZTogOTU3LjI2LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjEuNzMsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1Ny4yNixcbiAgICAgICAgaHVtaWRpdHk6IDQxLFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMzYsIGRlZzogMjI0LjUwMSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIzIDAwOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA3Nzg4MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDI2LjQzLFxuICAgICAgICB0ZW1wX21pbjogMjYuNDMsXG4gICAgICAgIHRlbXBfbWF4OiAyNi40MyxcbiAgICAgICAgcHJlc3N1cmU6IDk1Ny4wOCxcbiAgICAgICAgc2VhX2xldmVsOiAxMDIxLjkzLFxuICAgICAgICBncm5kX2xldmVsOiA5NTcuMDgsXG4gICAgICAgIGh1bWlkaXR5OiA0NyxcbiAgICAgICAgdGVtcF9rZjogMFxuICAgICAgfSxcbiAgICAgIHdlYXRoZXI6IFtcbiAgICAgICAgeyBpZDogODAwLCBtYWluOiAnQ2xlYXInLCBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsIGljb246ICcwMW4nIH1cbiAgICAgIF0sXG4gICAgICBjbG91ZHM6IHsgYWxsOiAwIH0sXG4gICAgICB3aW5kOiB7IHNwZWVkOiAxLjE2LCBkZWc6IDIxMi4wMDUgfSxcbiAgICAgIHN5czogeyBwb2Q6ICduJyB9LFxuICAgICAgZHRfdHh0OiAnMjAxNy0wNy0yMyAwMzowMDowMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGR0OiAxNTAwNzg5NjAwLFxuICAgICAgbWFpbjoge1xuICAgICAgICB0ZW1wOiAyMS4yOCxcbiAgICAgICAgdGVtcF9taW46IDIxLjI4LFxuICAgICAgICB0ZW1wX21heDogMjEuMjgsXG4gICAgICAgIHByZXNzdXJlOiA5NTguMzUsXG4gICAgICAgIHNlYV9sZXZlbDogMTAyMy41MSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU4LjM1LFxuICAgICAgICBodW1pZGl0eTogNjIsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMC45MiwgZGVnOiAxOTkuMDAyIH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjMgMDY6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDgwMDQwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMTguODgsXG4gICAgICAgIHRlbXBfbWluOiAxOC44OCxcbiAgICAgICAgdGVtcF9tYXg6IDE4Ljg4LFxuICAgICAgICBwcmVzc3VyZTogOTU3Ljc5LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjMuMSxcbiAgICAgICAgZ3JuZF9sZXZlbDogOTU3Ljc5LFxuICAgICAgICBodW1pZGl0eTogNzIsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFuJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMC43NiwgZGVnOiA1MS41MDM0IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnbicgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjMgMDk6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDgxMTIwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMTcuNjEsXG4gICAgICAgIHRlbXBfbWluOiAxNy42MSxcbiAgICAgICAgdGVtcF9tYXg6IDE3LjYxLFxuICAgICAgICBwcmVzc3VyZTogOTU3LjE2LFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjIuNTcsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1Ny4xNixcbiAgICAgICAgaHVtaWRpdHk6IDc3LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxbicgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDAuNzIsIGRlZzogNzMuNTAwNCB9LFxuICAgICAgc3lzOiB7IHBvZDogJ24nIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIzIDEyOjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA4MjIwMDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDIxLjUsXG4gICAgICAgIHRlbXBfbWluOiAyMS41LFxuICAgICAgICB0ZW1wX21heDogMjEuNSxcbiAgICAgICAgcHJlc3N1cmU6IDk1OC4wNCxcbiAgICAgICAgc2VhX2xldmVsOiAxMDIzLjQsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1OC4wNCxcbiAgICAgICAgaHVtaWRpdHk6IDYyLFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxZCcgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMTYsIGRlZzogOTEuNSB9LFxuICAgICAgc3lzOiB7IHBvZDogJ2QnIH0sXG4gICAgICBkdF90eHQ6ICcyMDE3LTA3LTIzIDE1OjAwOjAwJ1xuICAgIH0sXG4gICAge1xuICAgICAgZHQ6IDE1MDA4MzI4MDAsXG4gICAgICBtYWluOiB7XG4gICAgICAgIHRlbXA6IDI3Ljk2LFxuICAgICAgICB0ZW1wX21pbjogMjcuOTYsXG4gICAgICAgIHRlbXBfbWF4OiAyNy45NixcbiAgICAgICAgcHJlc3N1cmU6IDk1OC4zLFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjMuMjIsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1OC4zLFxuICAgICAgICBodW1pZGl0eTogNTEsXG4gICAgICAgIHRlbXBfa2Y6IDBcbiAgICAgIH0sXG4gICAgICB3ZWF0aGVyOiBbXG4gICAgICAgIHsgaWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJyB9XG4gICAgICBdLFxuICAgICAgY2xvdWRzOiB7IGFsbDogMCB9LFxuICAgICAgd2luZDogeyBzcGVlZDogMS4yMiwgZGVnOiAyMDYuMDA1IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjMgMTg6MDA6MDAnXG4gICAgfSxcbiAgICB7XG4gICAgICBkdDogMTUwMDg0MzYwMCxcbiAgICAgIG1haW46IHtcbiAgICAgICAgdGVtcDogMzAuNjgsXG4gICAgICAgIHRlbXBfbWluOiAzMC42OCxcbiAgICAgICAgdGVtcF9tYXg6IDMwLjY4LFxuICAgICAgICBwcmVzc3VyZTogOTU3LjgzLFxuICAgICAgICBzZWFfbGV2ZWw6IDEwMjIuNDEsXG4gICAgICAgIGdybmRfbGV2ZWw6IDk1Ny44MyxcbiAgICAgICAgaHVtaWRpdHk6IDQ2LFxuICAgICAgICB0ZW1wX2tmOiAwXG4gICAgICB9LFxuICAgICAgd2VhdGhlcjogW1xuICAgICAgICB7IGlkOiA4MDAsIG1haW46ICdDbGVhcicsIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JywgaWNvbjogJzAxZCcgfVxuICAgICAgXSxcbiAgICAgIGNsb3VkczogeyBhbGw6IDAgfSxcbiAgICAgIHdpbmQ6IHsgc3BlZWQ6IDEuMiwgZGVnOiAyMTUuMDA0IH0sXG4gICAgICBzeXM6IHsgcG9kOiAnZCcgfSxcbiAgICAgIGR0X3R4dDogJzIwMTctMDctMjMgMjE6MDA6MDAnXG4gICAgfVxuICBdLFxuICBjaXR5OiB7XG4gICAgaWQ6IDUzNjgzNjEsXG4gICAgbmFtZTogJ0xvcyBBbmdlbGVzJyxcbiAgICBjb29yZDogeyBsYXQ6IDM0LjA1MjIsIGxvbjogLTExOC4yNDM3IH0sXG4gICAgY291bnRyeTogJ1VTJ1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgQ1VSUkVOVF9XQVRIRVJfTU9DSzogQ3VycmVudFdlYXRoZXIgPSB7XG4gIHRlbXA6IDE2LFxuICBwcmVzc3VyZTogMTAxMixcbiAgaHVtaWRpdHk6IDkzLFxuICBtaW5UZW1wOiAxNixcbiAgbWF4VGVtcDogMTYsXG4gIHN1bnJpc2U6IDE1MDA3NzkwOTIsXG4gIHN1bnNldDogMTUwMDgzNzA0NSxcbiAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gIGljb25Vcmw6ICdodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93LzAxbi5wbmcnLFxuICBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsXG4gIGljb25DbGFzczogJ3dpIHdpLWRheS1zdW5ueScsXG4gIHdpbmQ6IHsgZGVnOiAyNDAsIHNwZWVkOiAyLjEgfVxufTtcbmV4cG9ydCBjb25zdCBGT1JFQ0FTVF9NT0NLOiBGb3JlY2FzdFtdID0gW1xuICB7XG4gICAgdGVtcDogMTIuMTUsXG4gICAgcHJlc3N1cmU6IDEwMjMuMjcsXG4gICAgaHVtaWRpdHk6IDk4LFxuICAgIG1pblRlbXA6IDEyLjE1LFxuICAgIG1heFRlbXA6IDEyLjg0LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1zdW5ueScsXG4gICAgZGVzY3JpcHRpb246ICdjbGVhciBza3knLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI0VDAwOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDIzMCxcbiAgICAgIHNwZWVkOiAxLjMxXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTIuMTIsXG4gICAgcHJlc3N1cmU6IDEwMjIuNCxcbiAgICBodW1pZGl0eTogOTUsXG4gICAgbWluVGVtcDogMTIuMTIsXG4gICAgbWF4VGVtcDogMTIuNTcsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LWNsb3VkeScsXG4gICAgZGVzY3JpcHRpb246ICdzY2F0dGVyZWQgY2xvdWRzJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNFQwMzowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAyMTQuMDAzLFxuICAgICAgc3BlZWQ6IDEuMjJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNi4zMyxcbiAgICBwcmVzc3VyZTogMTAyMS43NSxcbiAgICBodW1pZGl0eTogMTAwLFxuICAgIG1pblRlbXA6IDE2LjMzLFxuICAgIG1heFRlbXA6IDE2LjU2LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI0VDA2OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDIwOC41MDIsXG4gICAgICBzcGVlZDogMS44OFxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE3LjgzLFxuICAgIHByZXNzdXJlOiAxMDIxLjA3LFxuICAgIGh1bWlkaXR5OiAxMDAsXG4gICAgbWluVGVtcDogMTcuODMsXG4gICAgbWF4VGVtcDogMTcuODMsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjRUMDk6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMTYwLjUwMSxcbiAgICAgIHNwZWVkOiAxLjgxXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTkuNjcsXG4gICAgcHJlc3N1cmU6IDEwMTkuODIsXG4gICAgaHVtaWRpdHk6IDk0LFxuICAgIG1pblRlbXA6IDE5LjY3LFxuICAgIG1heFRlbXA6IDE5LjY3LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI0VDEyOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDQ2LjAwNTksXG4gICAgICBzcGVlZDogMi4wNlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDIwLjM0LFxuICAgIHByZXNzdXJlOiAxMDE4LjM4LFxuICAgIGh1bWlkaXR5OiA4MyxcbiAgICBtaW5UZW1wOiAyMC4zNCxcbiAgICBtYXhUZW1wOiAyMC4zNCxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktY2xvdWR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ3NjYXR0ZXJlZCBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI0VDE1OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDU4LjAwMDcsXG4gICAgICBzcGVlZDogNC4zN1xuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE5LjA4LFxuICAgIHByZXNzdXJlOiAxMDE3LjUxLFxuICAgIGh1bWlkaXR5OiA3OSxcbiAgICBtaW5UZW1wOiAxOS4wOCxcbiAgICBtYXhUZW1wOiAxOS4wOCxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktc3VubnknLFxuICAgIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNFQxODowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiA1My41MDExLFxuICAgICAgc3BlZWQ6IDQuMTJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNi41LFxuICAgIHByZXNzdXJlOiAxMDE3LjExLFxuICAgIGh1bWlkaXR5OiA5MCxcbiAgICBtaW5UZW1wOiAxNi41LFxuICAgIG1heFRlbXA6IDE2LjUsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LWNsb3VkeScsXG4gICAgZGVzY3JpcHRpb246ICdzY2F0dGVyZWQgY2xvdWRzJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNFQyMTowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiA2MS4wMDA5LFxuICAgICAgc3BlZWQ6IDQuMzJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNS43NCxcbiAgICBwcmVzc3VyZTogMTAxNi4yMixcbiAgICBodW1pZGl0eTogOTMsXG4gICAgbWluVGVtcDogMTUuNzQsXG4gICAgbWF4VGVtcDogMTUuNzQsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LWNsb3VkeScsXG4gICAgZGVzY3JpcHRpb246ICdzY2F0dGVyZWQgY2xvdWRzJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNVQwMDowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiA2MS4wMDIzLFxuICAgICAgc3BlZWQ6IDUuMjFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNC43MyxcbiAgICBwcmVzc3VyZTogMTAxNS40OCxcbiAgICBodW1pZGl0eTogOTEsXG4gICAgbWluVGVtcDogMTQuNzMsXG4gICAgbWF4VGVtcDogMTQuNzMsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LWNsb3VkeScsXG4gICAgZGVzY3JpcHRpb246ICdvdmVyY2FzdCBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI1VDAzOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDU1LjUwMTEsXG4gICAgICBzcGVlZDogNS44XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTUuOTYsXG4gICAgcHJlc3N1cmU6IDEwMTQuNTksXG4gICAgaHVtaWRpdHk6IDkxLFxuICAgIG1pblRlbXA6IDE1Ljk2LFxuICAgIG1heFRlbXA6IDE1Ljk2LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1jbG91ZHknLFxuICAgIGRlc2NyaXB0aW9uOiAnb3ZlcmNhc3QgY2xvdWRzJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNVQwNjowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiA1MC4wMDI2LFxuICAgICAgc3BlZWQ6IDYuMjZcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy4zMixcbiAgICBwcmVzc3VyZTogMTAxMy42NSxcbiAgICBodW1pZGl0eTogODgsXG4gICAgbWluVGVtcDogMTcuMzIsXG4gICAgbWF4VGVtcDogMTcuMzIsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjVUMDk6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMzguMDAxOCxcbiAgICAgIHNwZWVkOiA2LjMyXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTcuOTQsXG4gICAgcHJlc3N1cmU6IDEwMTMuMSxcbiAgICBodW1pZGl0eTogODksXG4gICAgbWluVGVtcDogMTcuOTQsXG4gICAgbWF4VGVtcDogMTcuOTQsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjVUMTI6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMzQuMDAwMSxcbiAgICAgIHNwZWVkOiA2LjcxXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTguMzMsXG4gICAgcHJlc3N1cmU6IDEwMTIuMzQsXG4gICAgaHVtaWRpdHk6IDg4LFxuICAgIG1pblRlbXA6IDE4LjMzLFxuICAgIG1heFRlbXA6IDE4LjMzLFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI1VDE1OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDIyLjUwMDUsXG4gICAgICBzcGVlZDogNi4yOFxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE4LjEyLFxuICAgIHByZXNzdXJlOiAxMDEyLjIzLFxuICAgIGh1bWlkaXR5OiA5NCxcbiAgICBtaW5UZW1wOiAxOC4xMixcbiAgICBtYXhUZW1wOiAxOC4xMixcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNVQxODowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzNS41MDMxLFxuICAgICAgc3BlZWQ6IDQuNzZcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy4yOSxcbiAgICBwcmVzc3VyZTogMTAxMi4xOCxcbiAgICBodW1pZGl0eTogOTcsXG4gICAgbWluVGVtcDogMTcuMjksXG4gICAgbWF4VGVtcDogMTcuMjksXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjVUMjE6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMTkuMDAxNixcbiAgICAgIHNwZWVkOiA0LjdcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNi43LFxuICAgIHByZXNzdXJlOiAxMDExLjgzLFxuICAgIGh1bWlkaXR5OiA5OSxcbiAgICBtaW5UZW1wOiAxNi43LFxuICAgIG1heFRlbXA6IDE2LjcsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbW9kZXJhdGUgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjZUMDA6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogNS41MDI5MyxcbiAgICAgIHNwZWVkOiA0LjkxXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTYuOTEsXG4gICAgcHJlc3N1cmU6IDEwMTAuNzIsXG4gICAgaHVtaWRpdHk6IDEwMCxcbiAgICBtaW5UZW1wOiAxNi45MSxcbiAgICBtYXhUZW1wOiAxNi45MSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdoZWF2eSBpbnRlbnNpdHkgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjZUMDM6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMy41MDEzNyxcbiAgICAgIHNwZWVkOiA1LjcxXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTcuNTEsXG4gICAgcHJlc3N1cmU6IDEwMTAuNTIsXG4gICAgaHVtaWRpdHk6IDEwMCxcbiAgICBtaW5UZW1wOiAxNy41MSxcbiAgICBtYXhUZW1wOiAxNy41MSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdtb2RlcmF0ZSByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNlQwNjowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAxMC4wMDIxLFxuICAgICAgc3BlZWQ6IDYuMDdcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy44LFxuICAgIHByZXNzdXJlOiAxMDEwLjg3LFxuICAgIGh1bWlkaXR5OiA5OSxcbiAgICBtaW5UZW1wOiAxNy44LFxuICAgIG1heFRlbXA6IDE3LjgsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbW9kZXJhdGUgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjZUMDk6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMzUyLjAwNixcbiAgICAgIHNwZWVkOiA3LjA1XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTcuMzEsXG4gICAgcHJlc3N1cmU6IDEwMTEuNDMsXG4gICAgaHVtaWRpdHk6IDEwMCxcbiAgICBtaW5UZW1wOiAxNy4zMSxcbiAgICBtYXhUZW1wOiAxNy4zMSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdtb2RlcmF0ZSByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yNlQxMjowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzNDEsXG4gICAgICBzcGVlZDogNy44NlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE2Ljk1LFxuICAgIHByZXNzdXJlOiAxMDEyLjE1LFxuICAgIGh1bWlkaXR5OiAxMDAsXG4gICAgbWluVGVtcDogMTYuOTUsXG4gICAgbWF4VGVtcDogMTYuOTUsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnaGVhdnkgaW50ZW5zaXR5IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI2VDE1OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDM0MS4wMDMsXG4gICAgICBzcGVlZDogOS4zNlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE2LjUsXG4gICAgcHJlc3N1cmU6IDEwMTMuMDcsXG4gICAgaHVtaWRpdHk6IDEwMCxcbiAgICBtaW5UZW1wOiAxNi41LFxuICAgIG1heFRlbXA6IDE2LjUsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbW9kZXJhdGUgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjZUMTg6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMzM1LjUwMyxcbiAgICAgIHNwZWVkOiA5LjAyXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTYuNTIsXG4gICAgcHJlc3N1cmU6IDEwMTQuMjQsXG4gICAgaHVtaWRpdHk6IDk4LFxuICAgIG1pblRlbXA6IDE2LjUyLFxuICAgIG1heFRlbXA6IDE2LjUyLFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ21vZGVyYXRlIHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI2VDIxOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDMzMi41MDQsXG4gICAgICBzcGVlZDogOC4zNlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE2LjUyLFxuICAgIHByZXNzdXJlOiAxMDE0LjkxLFxuICAgIGh1bWlkaXR5OiA5OCxcbiAgICBtaW5UZW1wOiAxNi41MixcbiAgICBtYXhUZW1wOiAxNi41MixcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yN1QwMDowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzMjUuMDAyLFxuICAgICAgc3BlZWQ6IDYuOTJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNS41NCxcbiAgICBwcmVzc3VyZTogMTAxNS4xOCxcbiAgICBodW1pZGl0eTogOTksXG4gICAgbWluVGVtcDogMTUuNTQsXG4gICAgbWF4VGVtcDogMTUuNTQsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjdUMDM6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMzE3LjUsXG4gICAgICBzcGVlZDogNi4wM1xuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE2Ljg0LFxuICAgIHByZXNzdXJlOiAxMDE1LjI5LFxuICAgIGh1bWlkaXR5OiA5OCxcbiAgICBtaW5UZW1wOiAxNi44NCxcbiAgICBtYXhUZW1wOiAxNi44NCxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktY2xvdWR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ2ZldyBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI3VDA2OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDMxMS4wMDIsXG4gICAgICBzcGVlZDogNS45MVxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE5LjQ5LFxuICAgIHByZXNzdXJlOiAxMDE1LjIzLFxuICAgIGh1bWlkaXR5OiA5NCxcbiAgICBtaW5UZW1wOiAxOS40OSxcbiAgICBtYXhUZW1wOiAxOS40OSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktc3VubnknLFxuICAgIGRlc2NyaXB0aW9uOiAnY2xlYXIgc2t5JyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yN1QwOTowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAzMTAuNTAzLFxuICAgICAgc3BlZWQ6IDUuMTJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAyMS4yNSxcbiAgICBwcmVzc3VyZTogMTAxNC44MyxcbiAgICBodW1pZGl0eTogOTAsXG4gICAgbWluVGVtcDogMjEuMjUsXG4gICAgbWF4VGVtcDogMjEuMjUsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXN1bm55JyxcbiAgICBkZXNjcmlwdGlvbjogJ2NsZWFyIHNreScsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjdUMTI6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMzA0LjAwNixcbiAgICAgIHNwZWVkOiAzLjU4XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMjIuMDMsXG4gICAgcHJlc3N1cmU6IDEwMTMuODksXG4gICAgaHVtaWRpdHk6IDg3LFxuICAgIG1pblRlbXA6IDIyLjAzLFxuICAgIG1heFRlbXA6IDIyLjAzLFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1zdW5ueScsXG4gICAgZGVzY3JpcHRpb246ICdjbGVhciBza3knLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI3VDE1OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDI3NC4wMDIsXG4gICAgICBzcGVlZDogMi4wN1xuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE5LjQsXG4gICAgcHJlc3N1cmU6IDEwMTMuNzQsXG4gICAgaHVtaWRpdHk6IDkzLFxuICAgIG1pblRlbXA6IDE5LjQsXG4gICAgbWF4VGVtcDogMTkuNCxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yN1QxODowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAyMzMuMDAxLFxuICAgICAgc3BlZWQ6IDMuODZcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNy42MSxcbiAgICBwcmVzc3VyZTogMTAxMy44MixcbiAgICBodW1pZGl0eTogOTksXG4gICAgbWluVGVtcDogMTcuNjEsXG4gICAgbWF4VGVtcDogMTcuNjEsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbW9kZXJhdGUgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjdUMjE6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMjQ1LjUwMSxcbiAgICAgIHNwZWVkOiAzLjY2XG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTcuNTgsXG4gICAgcHJlc3N1cmU6IDEwMTMuNjEsXG4gICAgaHVtaWRpdHk6IDk4LFxuICAgIG1pblRlbXA6IDE3LjU4LFxuICAgIG1heFRlbXA6IDE3LjU4LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI4VDAwOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDIzMSxcbiAgICAgIHNwZWVkOiA0LjIyXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTcuMTksXG4gICAgcHJlc3N1cmU6IDEwMTQuMzcsXG4gICAgaHVtaWRpdHk6IDEwMCxcbiAgICBtaW5UZW1wOiAxNy4xOSxcbiAgICBtYXhUZW1wOiAxNy4xOSxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yOFQwMzowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAyNzYuMDA2LFxuICAgICAgc3BlZWQ6IDUuNTJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNi4zMyxcbiAgICBwcmVzc3VyZTogMTAxNi4wOSxcbiAgICBodW1pZGl0eTogOTgsXG4gICAgbWluVGVtcDogMTYuMzMsXG4gICAgbWF4VGVtcDogMTYuMzMsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LXJhaW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlnaHQgcmFpbicsXG4gICAgZGF0YTogbmV3IERhdGUoJzIwMTctMDctMjhUMDY6MDA6MDAuMDAwWicpLFxuICAgIHdpbmQ6IHtcbiAgICAgIGRlZzogMjgyLjAxMixcbiAgICAgIHNwZWVkOiA2LjAxXG4gICAgfVxuICB9LFxuICB7XG4gICAgdGVtcDogMTcuMzksXG4gICAgcHJlc3N1cmU6IDEwMTguMjgsXG4gICAgaHVtaWRpdHk6IDk0LFxuICAgIG1pblRlbXA6IDE3LjM5LFxuICAgIG1heFRlbXA6IDE3LjM5LFxuICAgIGxvY2F0aW9uOiAnU3pjemVjaW4nLFxuICAgIGljb25DbGFzczogJ3dpIHdpLWRheS1yYWluJyxcbiAgICBkZXNjcmlwdGlvbjogJ2xpZ2h0IHJhaW4nLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI4VDA5OjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDI4Ny41LFxuICAgICAgc3BlZWQ6IDYuNTJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxOC42MyxcbiAgICBwcmVzc3VyZTogMTAyMC4xLFxuICAgIGh1bWlkaXR5OiA5MCxcbiAgICBtaW5UZW1wOiAxOC42MyxcbiAgICBtYXhUZW1wOiAxOC42MyxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktY2xvdWR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ2ZldyBjbG91ZHMnLFxuICAgIGRhdGE6IG5ldyBEYXRlKCcyMDE3LTA3LTI4VDEyOjAwOjAwLjAwMFonKSxcbiAgICB3aW5kOiB7XG4gICAgICBkZWc6IDI4NC41LFxuICAgICAgc3BlZWQ6IDYuODFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxOC42OSxcbiAgICBwcmVzc3VyZTogMTAyMS42NyxcbiAgICBodW1pZGl0eTogODQsXG4gICAgbWluVGVtcDogMTguNjksXG4gICAgbWF4VGVtcDogMTguNjksXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LWNsb3VkeScsXG4gICAgZGVzY3JpcHRpb246ICdzY2F0dGVyZWQgY2xvdWRzJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yOFQxNTowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAyODksXG4gICAgICBzcGVlZDogNi41MlxuICAgIH1cbiAgfSxcbiAge1xuICAgIHRlbXA6IDE3LjI4LFxuICAgIHByZXNzdXJlOiAxMDIzLjIyLFxuICAgIGh1bWlkaXR5OiA4NSxcbiAgICBtaW5UZW1wOiAxNy4yOCxcbiAgICBtYXhUZW1wOiAxNy4yOCxcbiAgICBsb2NhdGlvbjogJ1N6Y3plY2luJyxcbiAgICBpY29uQ2xhc3M6ICd3aSB3aS1kYXktcmFpbicsXG4gICAgZGVzY3JpcHRpb246ICdsaWdodCByYWluJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yOFQxODowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAyODEuNTAxLFxuICAgICAgc3BlZWQ6IDQuOTFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0ZW1wOiAxNS40MixcbiAgICBwcmVzc3VyZTogMTAyNC42MyxcbiAgICBodW1pZGl0eTogODYsXG4gICAgbWluVGVtcDogMTUuNDIsXG4gICAgbWF4VGVtcDogMTUuNDIsXG4gICAgbG9jYXRpb246ICdTemN6ZWNpbicsXG4gICAgaWNvbkNsYXNzOiAnd2kgd2ktZGF5LWNsb3VkeScsXG4gICAgZGVzY3JpcHRpb246ICdmZXcgY2xvdWRzJyxcbiAgICBkYXRhOiBuZXcgRGF0ZSgnMjAxNy0wNy0yOFQyMTowMDowMC4wMDBaJyksXG4gICAgd2luZDoge1xuICAgICAgZGVnOiAyNzcuNTAyLFxuICAgICAgc3BlZWQ6IDQuNDZcbiAgICB9XG4gIH1cbl07XG4iLCJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHtcbiAgV2VhdGhlckFwaUNvbmZpZyxcbiAgV2VhdGhlckFwaU5hbWUsXG4gIFdlYXRoZXJBcGlTZXJ2aWNlXG59IGZyb20gJy4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9vbGluZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3BvbGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJDb250YWluZXIgfSBmcm9tICcuL3dlYXRoZXIuY29udGFpbmVyJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBXZWF0aGVySWNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWljb24vd2VhdGhlci1pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyQ3VycmVudERlc2NyaXB0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC1kZXNjcmlwdGlvbi93ZWF0aGVyLWN1cnJlbnQtZGVzY3JpcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJDdXJyZW50VGVtcENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUvY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1hY3Rpb25zL2FjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJMb2NhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWxvY2F0aW9uL3dlYXRoZXItbG9jYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJDdXJyZW50V2luZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtd2luZC93ZWF0aGVyLWN1cnJlbnQtd2luZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3BlbldlYXRoZXJNYXBBcGlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hcGkvb3Blbi13ZWF0aGVyLW1hcC9vcGVuLXdlYXRoZXItbWFwLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYXRoZXJDdXJyZW50RGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtZGV0YWlscy93ZWF0aGVyLWN1cnJlbnQtZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlckZvcmVjYXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3Qvd2VhdGhlci1mb3JlY2FzdC5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3RTaW1wbGVHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dlYXRoZXItZm9yZWNhc3QvZm9yZWNhc3Qtc2ltcGxlLWdyaWQvZm9yZWNhc3Qtc2ltcGxlLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYXRoZXJGb3JlY2FzdEdyaWREYXlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC93ZWF0aGVyLWZvcmVjYXN0LWdyaWQtZGF5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3REZXRhaWxlZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LWRldGFpbGVkL2ZvcmVjYXN0LWRldGFpbGVkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3REZXRhaWxEYXlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1kZXRhaWxlZC9mb3JlY2FzdC1kZXRhaWxlZC1kYXkuY29tcG9uZW50JztcbmltcG9ydCB7IENoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NoYXJ0L2NoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVyRm9yZWNhc3RDaGFydFdpZGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2VhdGhlci1mb3JlY2FzdC9mb3JlY2FzdC1zaW1wbGUtZ3JpZC9mb3JlY2FzdC1jaGFydC13aWRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWF0aGVySGVscGVyc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3dlYXRoZXItaGVscGVycy5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFwaVNlcnZpY2VGYWN0b3J5KFxuICBodHRwOiBIdHRwLFxuICBwb29saW5nOiBQb29saW5nU2VydmljZSxcbiAgb3BlbldlYXRoZXI6IFdlYXRoZXJBcGlDb25maWdcbikge1xuICBzd2l0Y2ggKG9wZW5XZWF0aGVyLm5hbWUpIHtcbiAgICBjYXNlIFdlYXRoZXJBcGlOYW1lLk9QRU5fV0VBVEhFUl9NQVA6XG4gICAgICByZXR1cm4gbmV3IE9wZW5XZWF0aGVyTWFwQXBpU2VydmljZShodHRwLCBwb29saW5nLCBvcGVuV2VhdGhlcik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBuZXcgT3BlbldlYXRoZXJNYXBBcGlTZXJ2aWNlKGh0dHAsIHBvb2xpbmcsIG9wZW5XZWF0aGVyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yUm9vdChjb25maWc6IFdlYXRoZXJBcGlDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgcmV0dXJuIHtcbiAgICBuZ01vZHVsZTogQW5ndWxhcldlYXRoZXJXaWRnZXRNb2R1bGUsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICBQb29saW5nU2VydmljZSxcbiAgICAgIFdlYXRoZXJIZWxwZXJzU2VydmljZSxcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogV2VhdGhlckFwaVNlcnZpY2UsXG4gICAgICAgIHVzZUZhY3Rvcnk6IGFwaVNlcnZpY2VGYWN0b3J5LFxuICAgICAgICBkZXBzOiBbSHR0cCwgUG9vbGluZ1NlcnZpY2UsICdXRUFUSEVSX0NPTkZJRyddXG4gICAgICB9LFxuICAgICAgeyBwcm92aWRlOiAnV0VBVEhFUl9DT05GSUcnLCB1c2VWYWx1ZTogY29uZmlnIH1cbiAgICBdXG4gIH07XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDaGFydENvbXBvbmVudCxcbiAgICBXZWF0aGVyQ29udGFpbmVyLFxuICAgIFdlYXRoZXJDdXJyZW50VGVtcENvbXBvbmVudCxcbiAgICBXZWF0aGVyQWN0aW9uc0NvbXBvbmVudCxcbiAgICBXZWF0aGVySWNvbkNvbXBvbmVudCxcbiAgICBXZWF0aGVyQ3VycmVudERlc2NyaXB0aW9uQ29tcG9uZW50LFxuICAgIFdlYXRoZXJMb2NhdGlvbkNvbXBvbmVudCxcbiAgICBXZWF0aGVyQ3VycmVudFdpbmRDb21wb25lbnQsXG4gICAgV2VhdGhlckN1cnJlbnREZXRhaWxzQ29tcG9uZW50LFxuICAgIFdlYXRoZXJGb3JlY2FzdENvbXBvbmVudCxcbiAgICBXZWF0aGVyRm9yZWNhc3RHcmlkRGF5Q29tcG9uZW50LFxuICAgIFdlYXRoZXJGb3JlY2FzdFNpbXBsZUdyaWRDb21wb25lbnQsXG4gICAgV2VhdGhlckZvcmVjYXN0RGV0YWlsZWRDb21wb25lbnQsXG4gICAgV2VhdGhlckZvcmVjYXN0RGV0YWlsRGF5Q29tcG9uZW50LFxuICAgIFdlYXRoZXJGb3JlY2FzdENoYXJ0V2lkZUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbV2VhdGhlckNvbnRhaW5lcl1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcldlYXRoZXJXaWRnZXRNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIHN0YXRpYyBmb3JSb290ID0gZm9yUm9vdDtcbn1cbmV4cG9ydCAqIGZyb20gJy4vd2VhdGhlci5pbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9ja3Mvb3Blbi13ZWF0aGVyLW1hcC5tb2NrJztcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuZXhwb3J0IHsgVGVtcGVyYXR1cmVTY2FsZSB9IGZyb20gJy4vY29tcG9uZW50cy93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUvY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQnO1xuIl0sIm5hbWVzIjpbIlN1YmplY3QiLCJPYnNlcnZhYmxlIiwiaW50ZXJ2YWwiLCJtZXJnZU1hcCIsIm11bHRpY2FzdCIsInJlZkNvdW50IiwibWVyZ2UiLCJJbmplY3RhYmxlIiwiTmdab25lIiwiaHR0cCIsIm1hcCIsImZpbHRlciIsIlJlcXVlc3RPcHRpb25zIiwiSGVhZGVycyIsIlVSTFNlYXJjaFBhcmFtcyIsIkh0dHAiLCJJbmplY3QiLCJDb21wb25lbnQiLCJDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSIsIkNoYW5nZURldGVjdG9yUmVmIiwiUmVuZGVyZXIyIiwiRWxlbWVudFJlZiIsIkhvc3RCaW5kaW5nIiwiSW5wdXQiLCJIb3N0TGlzdGVuZXIiLCJUZW1wZXJhdHVyZVNjYWxlIiwiRXZlbnRFbWl0dGVyIiwiT3V0cHV0IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJDaGFydCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSHR0cE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0Usd0JBQW9CLElBQVk7WUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1NBQUk7Ozs7Ozs7O1FBR3BDLGdDQUFPOzs7Ozs7WUFBUCxVQUNFLFNBQThCLEVBQzlCLFNBQXdCO2dCQUYxQixpQkFrQ0M7Z0JBaENDLDBCQUFBO29CQUFBLGdCQUF3Qjs7Z0JBRXhCLHFCQUFNLE9BQU8sR0FBRyxJQUFJQSxZQUFPLEVBQUUsQ0FBQztnQkFDOUIscUJBQU0sTUFBTSxHQUFHQyxlQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBcUI7b0JBQ3JELHFCQUFJLEdBQWlCLENBQUM7b0JBQ3RCLEtBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7d0JBQzFCLHFCQUFNLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO3dCQUN2QixHQUFHLEdBQUdDLGFBQVEsQ0FB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
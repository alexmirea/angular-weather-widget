/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { WeatherApiService } from './services/api/weather.api.service';
import { WeatherLayout, WeatherSettings } from './weather.interfaces';
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
export { WeatherContainer };
function WeatherContainer_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherContainer.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherContainer.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherContainer.propDecorators;
    /** @type {?} */
    WeatherContainer.prototype.background;
    /** @type {?} */
    WeatherContainer.prototype.color;
    /** @type {?} */
    WeatherContainer.prototype.width;
    /** @type {?} */
    WeatherContainer.prototype.height;
    /** @type {?} */
    WeatherContainer.prototype.forecast;
    /** @type {?} */
    WeatherContainer.prototype.currentWeather;
    /** @type {?} */
    WeatherContainer.prototype.isWideLayout;
    /** @type {?} */
    WeatherContainer.prototype.subscriptionCurrentWeather;
    /** @type {?} */
    WeatherContainer.prototype.subscriptionForecast;
    /** @type {?} */
    WeatherContainer.prototype.currentWeather$;
    /** @type {?} */
    WeatherContainer.prototype.forecast$;
    /** @type {?} */
    WeatherContainer.prototype.isMouseOn;
    /** @type {?} */
    WeatherContainer.prototype._settings;
    /** @type {?} */
    WeatherContainer.prototype.weatherApi;
    /** @type {?} */
    WeatherContainer.prototype.changeDetectorRef;
    /** @type {?} */
    WeatherContainer.prototype.renderer;
    /** @type {?} */
    WeatherContainer.prototype.element;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL3dlYXRoZXIuY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUVMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBR0wsaUJBQWlCLEVBQ2xCLE1BQU0sb0NBQW9DLENBQUM7QUFDNUMsT0FBTyxFQUNMLGFBQWEsRUFFYixlQUFlLEVBQ2hCLE1BQU0sc0JBQXNCLENBQUM7O0lBdUo1QiwwQkFDVSxZQUNBLG1CQUNBLFVBQ0E7UUFIQSxlQUFVLEdBQVYsVUFBVTtRQUNWLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsYUFBUSxHQUFSLFFBQVE7UUFDUixZQUFPLEdBQVAsT0FBTztxQkF4Q21CLE1BQU07c0JBQ0osTUFBTTs0QkEwQjdCLEtBQUs7S0FjaEI7MEJBbkNBLHNDQUFROzs7O1FBaUJaO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7Ozs7O2tCQW5CWSxLQUFzQjtZQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsTUFBTSxDQUFDO2FBQ1I7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxJQUFJLE9BQU8sQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQztZQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lB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Ozs7SUFFRCx1Q0FBWTs7O0lBQVo7UUFDRSxxQkFBTSxNQUFNLEdBQXVCLE1BQU0sQ0FBQyxNQUFNLENBQzlDLEVBQUUsRUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDdEIsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFDOUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FDakMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN6Qzs7Z0JBck5GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztvQkFDaEQsTUFBTSxFQUFFO3dCQUNOLDByREE2RFE7cUJBQ1Q7b0JBQ0QsUUFBUSxFQUFFLDQ1REF5Q1Q7aUJBQ0Y7Ozs7Z0JBckhDLGlCQUFpQjtnQkFiakIsaUJBQWlCO2dCQU9qQixTQUFTO2dCQUxULFVBQVU7OzsrQkFrSVQsV0FBVyxTQUFDLGtCQUFrQjswQkFDOUIsV0FBVyxTQUFDLGFBQWE7MEJBQ3pCLFdBQVcsU0FBQyxhQUFhOzJCQUN6QixXQUFXLFNBQUMsY0FBYzs2QkFFMUIsS0FBSzttQ0FDTCxLQUFLOzZCQUNMLEtBQUs7aUNBK0NMLFlBQVksU0FBQyxZQUFZO2lDQUt6QixZQUFZLFNBQUMsWUFBWTs7MkJBak01Qjs7U0FxSWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQ3VycmVudFdlYXRoZXIsXG4gIEZvcmVjYXN0LFxuICBXZWF0aGVyQXBpU2VydmljZVxufSBmcm9tICcuL3NlcnZpY2VzL2FwaS93ZWF0aGVyLmFwaS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFdlYXRoZXJMYXlvdXQsXG4gIFdlYXRoZXJRdWVyeVBhcmFtcyxcbiAgV2VhdGhlclNldHRpbmdzXG59IGZyb20gJy4vd2VhdGhlci5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci13aWRnZXQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICAgcGFkZGluZzogMWVtO1xuICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmluZm8ge1xuICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmluZm8ud2lkZSB7XG4gICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAud2lkZSAuY3VycmVudCB7XG4gICAgICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC53aWRlIC5mb3JlY2FzdCB7XG4gICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAuY3VycmVudCB7XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgIG1pbi13aWR0aDogMTQwcHg7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5mb3JlY2FzdCB7XG4gICAgICAgICAgICAgICBtaW4td2lkdGg6IDIwMHB4O1xuICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAuY3VycmVudCwgLmZvcmVjYXN0IHtcbiAgICAgICAgICAgICAgIHBhZGRpbmc6IDAuNWVtO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB3ZWF0aGVyLWFjdGlvbnMge1xuICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICB0b3A6IDEwcHg7XG4gICAgICAgICAgICAgICByaWdodDogMTBweDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgd2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlLmJpZyB7XG4gICAgICAgICAgICAgICBmb250LXNpemU6IDNlbTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgd2VhdGhlci1pY29uLmJpZyB7XG4gICAgICAgICAgICAgICBmb250LXNpemU6IDZlbTtcbiAgICAgICAgICAgICAgIHBhZGRpbmc6IDAuMTVlbTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmVtcHR5IHtcbiAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5lbXB0eSBpIHtcbiAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogM2VtO1xuICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwLjNlbTtcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvd2VhdGhlci1pY29ucy8yLjAuMTAvY3NzL3dlYXRoZXItaWNvbnMubWluLmNzc1wiPlxuICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvd2VhdGhlci1pY29ucy8yLjAuMTAvY3NzL3dlYXRoZXItaWNvbnMtd2luZC5taW4uY3NzXCI+XG4gICAgPGRpdiAqbmdJZj1cImN1cnJlbnRXZWF0aGVyXCIgY2xhc3M9XCJpbmZvXCIgW2NsYXNzLndpZGVdPVwiaXNXaWRlTGF5b3V0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY3VycmVudFwiPlxuICAgICAgICA8d2VhdGhlci1pY29uXG4gICAgICAgICAgY2xhc3M9XCJiaWdcIlxuICAgICAgICAgIFtpY29uSW1hZ2VVcmxdPVwiY3VycmVudFdlYXRoZXI/Lmljb25VcmxcIlxuICAgICAgICAgIFtpY29uQ2xhc3NdPVwiY3VycmVudFdlYXRoZXI/Lmljb25DbGFzc1wiPjwvd2VhdGhlci1pY29uPlxuICAgICAgICA8d2VhdGhlci1jdXJyZW50LWRlc2NyaXB0aW9uXG4gICAgICAgICAgW2Rlc2NyaXBpb25dPVwiY3VycmVudFdlYXRoZXI/LmRlc2NyaXB0aW9uXCI+PC93ZWF0aGVyLWN1cnJlbnQtZGVzY3JpcHRpb24+XG4gICAgICAgIDx3ZWF0aGVyLWN1cnJlbnQtd2luZFxuICAgICAgICAgICpuZ0lmPVwic2V0dGluZ3Muc2hvd1dpbmRcIlxuICAgICAgICAgIFtzY2FsZV09XCJzZXR0aW5ncy5zY2FsZVwiXG4gICAgICAgICAgW2RlZ109XCJjdXJyZW50V2VhdGhlcj8ud2luZC5kZWdcIlxuICAgICAgICAgIFtzcGVlZF09XCJjdXJyZW50V2VhdGhlcj8ud2luZC5zcGVlZFwiPjwvd2VhdGhlci1jdXJyZW50LXdpbmQ+XG4gICAgICAgIDx3ZWF0aGVyLWxvY2F0aW9uIFtwbGFjZV09XCJjdXJyZW50V2VhdGhlcj8ubG9jYXRpb25cIj48L3dlYXRoZXItbG9jYXRpb24+XG4gICAgICAgIDx3ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmVcbiAgICAgICAgICBjbGFzcz1cImJpZ1wiXG4gICAgICAgICAgW3RlbXBdPVwiY3VycmVudFdlYXRoZXI/LnRlbXBcIlxuICAgICAgICAgIFtkZWddPVwic2V0dGluZ3Muc2NhbGVcIj48L3dlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZT5cbiAgICAgICAgPHdlYXRoZXItY3VycmVudC1kZXRhaWxzXG4gICAgICAgICAgKm5nSWY9XCJzZXR0aW5ncy5zaG93RGV0YWlsc1wiXG4gICAgICAgICAgW21heFRlbXBdPVwiY3VycmVudFdlYXRoZXI/Lm1heFRlbXBcIlxuICAgICAgICAgIFttaW5UZW1wXT1cImN1cnJlbnRXZWF0aGVyPy5taW5UZW1wXCJcbiAgICAgICAgICBbcHJlc3N1cmVdPVwiY3VycmVudFdlYXRoZXI/LnByZXNzdXJlXCJcbiAgICAgICAgICBbaHVtaWRpdHldPVwiY3VycmVudFdlYXRoZXI/Lmh1bWlkaXR5XCI+PC93ZWF0aGVyLWN1cnJlbnQtZGV0YWlscz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImZvcmVjYXN0XCIgKm5nSWY9XCJzZXR0aW5ncy5zaG93Rm9yZWNhc3RcIj5cbiAgICAgICAgPHdlYXRoZXItZm9yZWNhc3RcbiAgICAgICAgICBbZm9yZWNhc3RdPVwiZm9yZWNhc3RcIlxuICAgICAgICAgIFtzZXR0aW5nc109XCJzZXR0aW5nc1wiXG4gICAgICAgICAgW21vZGVdPVwic2V0dGluZ3MuZm9yZWNhc3RNb2RlXCI+PC93ZWF0aGVyLWZvcmVjYXN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIiFjdXJyZW50V2VhdGhlclwiIGNsYXNzPVwiaW5mbyBlbXB0eVwiPlxuICAgICAgPGkgY2xhc3M9XCJ3aSB3aS1zdW5yaXNlXCI+PC9pPlxuICAgICAgTm8gd2VhdGhlciBkYXRhLi4uXG4gICAgPC9kaXY+XG4gICAgPHdlYXRoZXItYWN0aW9ucyAqbmdJZj1cImlzTW91c2VPblwiICh1cGRhdGUpPVwiZ2V0V2VhdGhlcigpXCI+PC93ZWF0aGVyLWFjdGlvbnM+XG5cbiAgYFxufSkgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBXZWF0aGVyQ29udGFpbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5iYWNrZ3JvdW5kJykgYmFja2dyb3VuZCE6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5jb2xvcicpIGNvbG9yITogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgd2lkdGggPSAnYXV0byc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaGVpZ2h0ID0gJ2F1dG8nO1xuXG4gIEBJbnB1dCgpIGZvcmVjYXN0ITogRm9yZWNhc3RbXSB8IG51bGw7XG4gIEBJbnB1dCgpIGN1cnJlbnRXZWF0aGVyITogQ3VycmVudFdlYXRoZXIgfCBudWxsO1xuICBASW5wdXQoKVxuICBzZXQgc2V0dGluZ3ModmFsdWU6IFdlYXRoZXJTZXR0aW5ncykge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2V0dGluZ3MgPSB2YWx1ZTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLl9zZXR0aW5ncy5iYWNrZ3JvdW5kQ29sb3IgfHwgJ3doaXRlJztcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5fc2V0dGluZ3MuY29sb3IgfHwgJ2JsYWNrJztcbiAgICB0aGlzLndpZHRoID0gdGhpcy5fc2V0dGluZ3Mud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zZXR0aW5ncy5oZWlnaHQ7XG4gICAgaWYgKHRoaXMud2VhdGhlckFwaS5hcGlDb25maWcubmFtZSAmJiB0aGlzLndlYXRoZXJBcGkuYXBpQ29uZmlnLmtleSkge1xuICAgICAgdGhpcy5nZXRXZWF0aGVyKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5sYXlvdXQpIHtcbiAgICAgIHRoaXMuaXNXaWRlTGF5b3V0ID0gdGhpcy5fc2V0dGluZ3MubGF5b3V0ID09PSBXZWF0aGVyTGF5b3V0LldJREU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNldHRpbmdzKCk6IFdlYXRoZXJTZXR0aW5ncyB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzO1xuICB9XG5cbiAgaXNXaWRlTGF5b3V0ID0gZmFsc2U7XG4gIHN1YnNjcmlwdGlvbkN1cnJlbnRXZWF0aGVyITogU3Vic2NyaXB0aW9uO1xuICBzdWJzY3JpcHRpb25Gb3JlY2FzdCE6IFN1YnNjcmlwdGlvbjtcbiAgY3VycmVudFdlYXRoZXIkITogT2JzZXJ2YWJsZTxDdXJyZW50V2VhdGhlcj47XG4gIGZvcmVjYXN0JCE6IE9ic2VydmFibGU8Rm9yZWNhc3RbXT47XG4gIGlzTW91c2VPbiE6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfc2V0dGluZ3MhOiBXZWF0aGVyU2V0dGluZ3M7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3ZWF0aGVyQXBpOiBXZWF0aGVyQXBpU2VydmljZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmXG4gICkge31cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25DdXJyZW50V2VhdGhlcikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25DdXJyZW50V2VhdGhlci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25Gb3JlY2FzdCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25Gb3JlY2FzdC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBwdWJsaWMgb25Nb3VzZUVudGVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICB0aGlzLmlzTW91c2VPbiA9IHRydWU7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIHB1YmxpYyBvbk1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgIHRoaXMuaXNNb3VzZU9uID0gZmFsc2U7XG4gIH1cblxuICBnZXRXZWF0aGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbkN1cnJlbnRXZWF0aGVyKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbkN1cnJlbnRXZWF0aGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbkZvcmVjYXN0KSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbkZvcmVjYXN0LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFdlYXRoZXIkID0gdGhpcy5jdXJyZW50V2VhdGhlckNhbGwoKTtcbiAgICB0aGlzLmZvcmVjYXN0JCA9IHRoaXMuZm9yZWNhc3RDYWxsKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25DdXJyZW50V2VhdGhlciA9IHRoaXMuY3VycmVudFdlYXRoZXIkLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFdlYXRoZXIgPSBkYXRhO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbkZvcmVjYXN0ID0gdGhpcy5mb3JlY2FzdCQuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgdGhpcy5mb3JlY2FzdCA9IGRhdGE7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgY3VycmVudFdlYXRoZXJDYWxsKCk6IE9ic2VydmFibGU8Q3VycmVudFdlYXRoZXI+IHtcbiAgICBjb25zdCBwYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIHRoaXMuc2V0dGluZ3MubG9jYXRpb24sXG4gICAgICB7IHVuaXRzOiB0aGlzLnNldHRpbmdzLnNjYWxlIH0sXG4gICAgICB7IGxhbmc6IHRoaXMuc2V0dGluZ3MubGFuZ3VhZ2UgfVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMud2VhdGhlckFwaS5jdXJyZW50V2VhdGhlcihwYXJhbXMpO1xuICB9XG5cbiAgZm9yZWNhc3RDYWxsKCk6IE9ic2VydmFibGU8Rm9yZWNhc3RbXT4ge1xuICAgIGNvbnN0IHBhcmFtczogV2VhdGhlclF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgdGhpcy5zZXR0aW5ncy5sb2NhdGlvbixcbiAgICAgIHsgdW5pdHM6IHRoaXMuc2V0dGluZ3Muc2NhbGUgfSxcbiAgICAgIHsgbGFuZzogdGhpcy5zZXR0aW5ncy5sYW5ndWFnZSB9XG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy53ZWF0aGVyQXBpLmZvcmVjYXN0KHBhcmFtcyk7XG4gIH1cbn1cbiJdfQ==
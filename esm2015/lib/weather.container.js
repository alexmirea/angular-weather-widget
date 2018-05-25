/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { WeatherApiService } from './services/api/weather.api.service';
import { WeatherLayout, WeatherSettings } from './weather.interfaces';
export class WeatherContainer {
    /**
     * @param {?} weatherApi
     * @param {?} changeDetectorRef
     * @param {?} renderer
     * @param {?} element
     */
    constructor(weatherApi, changeDetectorRef, renderer, element) {
        this.weatherApi = weatherApi;
        this.changeDetectorRef = changeDetectorRef;
        this.renderer = renderer;
        this.element = element;
        this.width = 'auto';
        this.height = 'auto';
        this.isWideLayout = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set settings(value) {
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
    }
    /**
     * @return {?}
     */
    get settings() {
        return this._settings;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscriptionCurrentWeather) {
            this.subscriptionCurrentWeather.unsubscribe();
        }
        if (this.subscriptionForecast) {
            this.subscriptionForecast.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.renderer.addClass(this.element.nativeElement, 'active');
        this.isMouseOn = true;
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.renderer.removeClass(this.element.nativeElement, 'active');
        this.isMouseOn = false;
    }
    /**
     * @return {?}
     */
    getWeather() {
        if (this.subscriptionCurrentWeather) {
            this.subscriptionCurrentWeather.unsubscribe();
        }
        if (this.subscriptionForecast) {
            this.subscriptionForecast.unsubscribe();
        }
        this.currentWeather$ = this.currentWeatherCall();
        this.forecast$ = this.forecastCall();
        this.subscriptionCurrentWeather = this.currentWeather$.subscribe(data => {
            this.currentWeather = data;
            this.changeDetectorRef.markForCheck();
        });
        this.subscriptionForecast = this.forecast$.subscribe(data => {
            this.forecast = data;
            this.changeDetectorRef.markForCheck();
        });
    }
    /**
     * @return {?}
     */
    currentWeatherCall() {
        const /** @type {?} */ params = Object.assign({}, this.settings.location, { units: this.settings.scale }, { lang: this.settings.language });
        return this.weatherApi.currentWeather(params);
    }
    /**
     * @return {?}
     */
    forecastCall() {
        const /** @type {?} */ params = Object.assign({}, this.settings.location, { units: this.settings.scale }, { lang: this.settings.language });
        return this.weatherApi.forecast(params);
    }
}
WeatherContainer.decorators = [
    { type: Component, args: [{
                selector: 'weather-widget',
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [
                    `
             :host {
               display: flex;
               position: relative;
               padding: 1em;
               box-sizing: border-box;
             }
             .info {
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               width: 100%;
             }
             .info.wide {
               flex-direction: row;
             }
             .wide .current {
               flex-grow: 0;
             }
             .wide .forecast {
               flex-grow: 1;
               overflow-y: auto;
               height: 100%;
             }
             .current {
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               min-width: 140px;
             }
             .forecast {
               min-width: 200px;
               width: 100%;
               overflow-y: auto;
             }
             .current, .forecast {
               padding: 0.5em;
             }
             weather-actions {
               display: block;
               position: absolute;
               top: 10px;
               right: 10px;
             }
             weather-current-temperature.big {
               font-size: 3em;
             }
             weather-icon.big {
               font-size: 6em;
               padding: 0.15em;
             }
             .empty {
               flex-direction: row;
             }
             .empty i {
               font-size: 3em;
               margin-right: 0.3em;
             }

           `
                ],
                template: `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons-wind.min.css">
    <div *ngIf="currentWeather" class="info" [class.wide]="isWideLayout">
      <div class="current">
        <weather-icon
          class="big"
          [iconImageUrl]="currentWeather?.iconUrl"
          [iconClass]="currentWeather?.iconClass"></weather-icon>
        <weather-current-description
          [descripion]="currentWeather?.description"></weather-current-description>
        <weather-current-wind
          *ngIf="settings.showWind"
          [scale]="settings.scale"
          [deg]="currentWeather?.wind.deg"
          [speed]="currentWeather?.wind.speed"></weather-current-wind>
        <weather-location [place]="currentWeather?.location"></weather-location>
        <weather-current-temperature
          class="big"
          [temp]="currentWeather?.temp"
          [deg]="settings.scale"></weather-current-temperature>
        <weather-current-details
          *ngIf="settings.showDetails"
          [maxTemp]="currentWeather?.maxTemp"
          [minTemp]="currentWeather?.minTemp"
          [pressure]="currentWeather?.pressure"
          [humidity]="currentWeather?.humidity"></weather-current-details>
      </div>
      <div class="forecast" *ngIf="settings.showForecast">
        <weather-forecast
          [forecast]="forecast"
          [settings]="settings"
          [mode]="settings.forecastMode"></weather-forecast>
      </div>
    </div>
    <div *ngIf="!currentWeather" class="info empty">
      <i class="wi wi-sunrise"></i>
      No weather data...
    </div>
    <weather-actions *ngIf="isMouseOn" (update)="getWeather()"></weather-actions>

  `
            },] },
];
/** @nocollapse */
WeatherContainer.ctorParameters = () => [
    { type: WeatherApiService, },
    { type: ChangeDetectorRef, },
    { type: Renderer2, },
    { type: ElementRef, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL3dlYXRoZXIuY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUVMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBR0wsaUJBQWlCLEVBQ2xCLE1BQU0sb0NBQW9DLENBQUM7QUFDNUMsT0FBTyxFQUNMLGFBQWEsRUFFYixlQUFlLEVBQ2hCLE1BQU0sc0JBQXNCLENBQUM7QUFnSDlCLE1BQU07Ozs7Ozs7SUF1Q0osWUFDVSxZQUNBLG1CQUNBLFVBQ0E7UUFIQSxlQUFVLEdBQVYsVUFBVTtRQUNWLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsYUFBUSxHQUFSLFFBQVE7UUFDUixZQUFPLEdBQVAsT0FBTztxQkF4Q21CLE1BQU07c0JBQ0osTUFBTTs0QkEwQjdCLEtBQUs7S0FjaEI7Ozs7O1FBbkNBLFFBQVEsQ0FBQyxLQUFzQjtRQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLElBQUksT0FBTyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxD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QUFNLE1BQU0sR0FBdUIsTUFBTSxDQUFDLE1BQU0sQ0FDOUMsRUFBRSxFQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN0QixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUM5QixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUNqQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3pDOzs7WUFyTkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2dCQUNoRCxNQUFNLEVBQUU7b0JBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUE2RFE7aUJBQ1Q7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDVDthQUNGOzs7O1lBckhDLGlCQUFpQjtZQWJqQixpQkFBaUI7WUFPakIsU0FBUztZQUxULFVBQVU7OzsyQkFrSVQsV0FBVyxTQUFDLGtCQUFrQjtzQkFDOUIsV0FBVyxTQUFDLGFBQWE7c0JBQ3pCLFdBQVcsU0FBQyxhQUFhO3VCQUN6QixXQUFXLFNBQUMsY0FBYzt5QkFFMUIsS0FBSzsrQkFDTCxLQUFLO3lCQUNMLEtBQUs7NkJBK0NMLFlBQVksU0FBQyxZQUFZOzZCQUt6QixZQUFZLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEN1cnJlbnRXZWF0aGVyLFxuICBGb3JlY2FzdCxcbiAgV2VhdGhlckFwaVNlcnZpY2Vcbn0gZnJvbSAnLi9zZXJ2aWNlcy9hcGkvd2VhdGhlci5hcGkuc2VydmljZSc7XG5pbXBvcnQge1xuICBXZWF0aGVyTGF5b3V0LFxuICBXZWF0aGVyUXVlcnlQYXJhbXMsXG4gIFdlYXRoZXJTZXR0aW5nc1xufSBmcm9tICcuL3dlYXRoZXIuaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItd2lkZ2V0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgICAgIHBhZGRpbmc6IDFlbTtcbiAgICAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5pbmZvIHtcbiAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5pbmZvLndpZGUge1xuICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLndpZGUgLmN1cnJlbnQge1xuICAgICAgICAgICAgICAgZmxleC1ncm93OiAwO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAud2lkZSAuZm9yZWNhc3Qge1xuICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmN1cnJlbnQge1xuICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAgICBtaW4td2lkdGg6IDE0MHB4O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAuZm9yZWNhc3Qge1xuICAgICAgICAgICAgICAgbWluLXdpZHRoOiAyMDBweDtcbiAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmN1cnJlbnQsIC5mb3JlY2FzdCB7XG4gICAgICAgICAgICAgICBwYWRkaW5nOiAwLjVlbTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgd2VhdGhlci1hY3Rpb25zIHtcbiAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgdG9wOiAxMHB4O1xuICAgICAgICAgICAgICAgcmlnaHQ6IDEwcHg7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIHdlYXRoZXItY3VycmVudC10ZW1wZXJhdHVyZS5iaWcge1xuICAgICAgICAgICAgICAgZm9udC1zaXplOiAzZW07XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIHdlYXRoZXItaWNvbi5iaWcge1xuICAgICAgICAgICAgICAgZm9udC1zaXplOiA2ZW07XG4gICAgICAgICAgICAgICBwYWRkaW5nOiAwLjE1ZW07XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC5lbXB0eSB7XG4gICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAuZW1wdHkgaSB7XG4gICAgICAgICAgICAgICBmb250LXNpemU6IDNlbTtcbiAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMC4zZW07XG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3dlYXRoZXItaWNvbnMvMi4wLjEwL2Nzcy93ZWF0aGVyLWljb25zLm1pbi5jc3NcIj5cbiAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3dlYXRoZXItaWNvbnMvMi4wLjEwL2Nzcy93ZWF0aGVyLWljb25zLXdpbmQubWluLmNzc1wiPlxuICAgIDxkaXYgKm5nSWY9XCJjdXJyZW50V2VhdGhlclwiIGNsYXNzPVwiaW5mb1wiIFtjbGFzcy53aWRlXT1cImlzV2lkZUxheW91dFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImN1cnJlbnRcIj5cbiAgICAgICAgPHdlYXRoZXItaWNvblxuICAgICAgICAgIGNsYXNzPVwiYmlnXCJcbiAgICAgICAgICBbaWNvbkltYWdlVXJsXT1cImN1cnJlbnRXZWF0aGVyPy5pY29uVXJsXCJcbiAgICAgICAgICBbaWNvbkNsYXNzXT1cImN1cnJlbnRXZWF0aGVyPy5pY29uQ2xhc3NcIj48L3dlYXRoZXItaWNvbj5cbiAgICAgICAgPHdlYXRoZXItY3VycmVudC1kZXNjcmlwdGlvblxuICAgICAgICAgIFtkZXNjcmlwaW9uXT1cImN1cnJlbnRXZWF0aGVyPy5kZXNjcmlwdGlvblwiPjwvd2VhdGhlci1jdXJyZW50LWRlc2NyaXB0aW9uPlxuICAgICAgICA8d2VhdGhlci1jdXJyZW50LXdpbmRcbiAgICAgICAgICAqbmdJZj1cInNldHRpbmdzLnNob3dXaW5kXCJcbiAgICAgICAgICBbc2NhbGVdPVwic2V0dGluZ3Muc2NhbGVcIlxuICAgICAgICAgIFtkZWddPVwiY3VycmVudFdlYXRoZXI/LndpbmQuZGVnXCJcbiAgICAgICAgICBbc3BlZWRdPVwiY3VycmVudFdlYXRoZXI/LndpbmQuc3BlZWRcIj48L3dlYXRoZXItY3VycmVudC13aW5kPlxuICAgICAgICA8d2VhdGhlci1sb2NhdGlvbiBbcGxhY2VdPVwiY3VycmVudFdlYXRoZXI/LmxvY2F0aW9uXCI+PC93ZWF0aGVyLWxvY2F0aW9uPlxuICAgICAgICA8d2VhdGhlci1jdXJyZW50LXRlbXBlcmF0dXJlXG4gICAgICAgICAgY2xhc3M9XCJiaWdcIlxuICAgICAgICAgIFt0ZW1wXT1cImN1cnJlbnRXZWF0aGVyPy50ZW1wXCJcbiAgICAgICAgICBbZGVnXT1cInNldHRpbmdzLnNjYWxlXCI+PC93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmU+XG4gICAgICAgIDx3ZWF0aGVyLWN1cnJlbnQtZGV0YWlsc1xuICAgICAgICAgICpuZ0lmPVwic2V0dGluZ3Muc2hvd0RldGFpbHNcIlxuICAgICAgICAgIFttYXhUZW1wXT1cImN1cnJlbnRXZWF0aGVyPy5tYXhUZW1wXCJcbiAgICAgICAgICBbbWluVGVtcF09XCJjdXJyZW50V2VhdGhlcj8ubWluVGVtcFwiXG4gICAgICAgICAgW3ByZXNzdXJlXT1cImN1cnJlbnRXZWF0aGVyPy5wcmVzc3VyZVwiXG4gICAgICAgICAgW2h1bWlkaXR5XT1cImN1cnJlbnRXZWF0aGVyPy5odW1pZGl0eVwiPjwvd2VhdGhlci1jdXJyZW50LWRldGFpbHM+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JlY2FzdFwiICpuZ0lmPVwic2V0dGluZ3Muc2hvd0ZvcmVjYXN0XCI+XG4gICAgICAgIDx3ZWF0aGVyLWZvcmVjYXN0XG4gICAgICAgICAgW2ZvcmVjYXN0XT1cImZvcmVjYXN0XCJcbiAgICAgICAgICBbc2V0dGluZ3NdPVwic2V0dGluZ3NcIlxuICAgICAgICAgIFttb2RlXT1cInNldHRpbmdzLmZvcmVjYXN0TW9kZVwiPjwvd2VhdGhlci1mb3JlY2FzdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCIhY3VycmVudFdlYXRoZXJcIiBjbGFzcz1cImluZm8gZW1wdHlcIj5cbiAgICAgIDxpIGNsYXNzPVwid2kgd2ktc3VucmlzZVwiPjwvaT5cbiAgICAgIE5vIHdlYXRoZXIgZGF0YS4uLlxuICAgIDwvZGl2PlxuICAgIDx3ZWF0aGVyLWFjdGlvbnMgKm5nSWY9XCJpc01vdXNlT25cIiAodXBkYXRlKT1cImdldFdlYXRoZXIoKVwiPjwvd2VhdGhlci1hY3Rpb25zPlxuXG4gIGBcbn0pIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgV2VhdGhlckNvbnRhaW5lciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuYmFja2dyb3VuZCcpIGJhY2tncm91bmQhOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuY29sb3InKSBjb2xvciE6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIHdpZHRoID0gJ2F1dG8nO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpIGhlaWdodCA9ICdhdXRvJztcblxuICBASW5wdXQoKSBmb3JlY2FzdCE6IEZvcmVjYXN0W10gfCBudWxsO1xuICBASW5wdXQoKSBjdXJyZW50V2VhdGhlciE6IEN1cnJlbnRXZWF0aGVyIHwgbnVsbDtcbiAgQElucHV0KClcbiAgc2V0IHNldHRpbmdzKHZhbHVlOiBXZWF0aGVyU2V0dGluZ3MpIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NldHRpbmdzID0gdmFsdWU7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5fc2V0dGluZ3MuYmFja2dyb3VuZENvbG9yIHx8ICd3aGl0ZSc7XG4gICAgdGhpcy5jb2xvciA9IHRoaXMuX3NldHRpbmdzLmNvbG9yIHx8ICdibGFjayc7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMuX3NldHRpbmdzLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fc2V0dGluZ3MuaGVpZ2h0O1xuICAgIGlmICh0aGlzLndlYXRoZXJBcGkuYXBpQ29uZmlnLm5hbWUgJiYgdGhpcy53ZWF0aGVyQXBpLmFwaUNvbmZpZy5rZXkpIHtcbiAgICAgIHRoaXMuZ2V0V2VhdGhlcigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2V0dGluZ3MubGF5b3V0KSB7XG4gICAgICB0aGlzLmlzV2lkZUxheW91dCA9IHRoaXMuX3NldHRpbmdzLmxheW91dCA9PT0gV2VhdGhlckxheW91dC5XSURFO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzZXR0aW5ncygpOiBXZWF0aGVyU2V0dGluZ3Mge1xuICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncztcbiAgfVxuXG4gIGlzV2lkZUxheW91dCA9IGZhbHNlO1xuICBzdWJzY3JpcHRpb25DdXJyZW50V2VhdGhlciE6IFN1YnNjcmlwdGlvbjtcbiAgc3Vic2NyaXB0aW9uRm9yZWNhc3QhOiBTdWJzY3JpcHRpb247XG4gIGN1cnJlbnRXZWF0aGVyJCE6IE9ic2VydmFibGU8Q3VycmVudFdlYXRoZXI+O1xuICBmb3JlY2FzdCQhOiBPYnNlcnZhYmxlPEZvcmVjYXN0W10+O1xuICBpc01vdXNlT24hOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX3NldHRpbmdzITogV2VhdGhlclNldHRpbmdzO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd2VhdGhlckFwaTogV2VhdGhlckFwaVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uQ3VycmVudFdlYXRoZXIpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uQ3VycmVudFdlYXRoZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uRm9yZWNhc3QpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uRm9yZWNhc3QudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgcHVibGljIG9uTW91c2VFbnRlcigpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgdGhpcy5pc01vdXNlT24gPSB0cnVlO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBwdWJsaWMgb25Nb3VzZUxlYXZlKCkge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICB0aGlzLmlzTW91c2VPbiA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0V2VhdGhlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25DdXJyZW50V2VhdGhlcikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25DdXJyZW50V2VhdGhlci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25Gb3JlY2FzdCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25Gb3JlY2FzdC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRXZWF0aGVyJCA9IHRoaXMuY3VycmVudFdlYXRoZXJDYWxsKCk7XG4gICAgdGhpcy5mb3JlY2FzdCQgPSB0aGlzLmZvcmVjYXN0Q2FsbCgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uQ3VycmVudFdlYXRoZXIgPSB0aGlzLmN1cnJlbnRXZWF0aGVyJC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyID0gZGF0YTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25Gb3JlY2FzdCA9IHRoaXMuZm9yZWNhc3QkLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMuZm9yZWNhc3QgPSBkYXRhO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIGN1cnJlbnRXZWF0aGVyQ2FsbCgpOiBPYnNlcnZhYmxlPEN1cnJlbnRXZWF0aGVyPiB7XG4gICAgY29uc3QgcGFyYW1zOiBXZWF0aGVyUXVlcnlQYXJhbXMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICB0aGlzLnNldHRpbmdzLmxvY2F0aW9uLFxuICAgICAgeyB1bml0czogdGhpcy5zZXR0aW5ncy5zY2FsZSB9LFxuICAgICAgeyBsYW5nOiB0aGlzLnNldHRpbmdzLmxhbmd1YWdlIH1cbiAgICApO1xuICAgIHJldHVybiB0aGlzLndlYXRoZXJBcGkuY3VycmVudFdlYXRoZXIocGFyYW1zKTtcbiAgfVxuXG4gIGZvcmVjYXN0Q2FsbCgpOiBPYnNlcnZhYmxlPEZvcmVjYXN0W10+IHtcbiAgICBjb25zdCBwYXJhbXM6IFdlYXRoZXJRdWVyeVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIHRoaXMuc2V0dGluZ3MubG9jYXRpb24sXG4gICAgICB7IHVuaXRzOiB0aGlzLnNldHRpbmdzLnNjYWxlIH0sXG4gICAgICB7IGxhbmc6IHRoaXMuc2V0dGluZ3MubGFuZ3VhZ2UgfVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMud2VhdGhlckFwaS5mb3JlY2FzdChwYXJhbXMpO1xuICB9XG59XG4iXX0=
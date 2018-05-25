/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherHelpersService } from '../../../services/weather-helpers.service';
import { WeatherSettings } from '../../../weather.interfaces';
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
export { WeatherForecastDetailDayComponent };
function WeatherForecastDetailDayComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherForecastDetailDayComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherForecastDetailDayComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherForecastDetailDayComponent.propDecorators;
    /** @type {?} */
    WeatherForecastDetailDayComponent.prototype.chartData;
    /** @type {?} */
    WeatherForecastDetailDayComponent.prototype.chartOptions;
    /** @type {?} */
    WeatherForecastDetailDayComponent.prototype.settings;
    /** @type {?} */
    WeatherForecastDetailDayComponent.prototype._forecast;
    /** @type {?} */
    WeatherForecastDetailDayComponent.prototype.weatherHelpers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZWNhc3QtZGV0YWlsZWQtZGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItd2VhdGhlci13aWRnZXQvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy93ZWF0aGVyLWZvcmVjYXN0L2ZvcmVjYXN0LWRldGFpbGVkL2ZvcmVjYXN0LWRldGFpbGVkLWRheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBOEQ1RCwyQ0FBb0IsY0FBcUM7UUFBckMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO0tBQUk7MEJBUnpELHVEQUFROzs7O1FBR1o7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2Qjs7Ozs7a0JBTFksS0FBaUI7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Ozs7Ozs7OztJQVN6Qix1REFBVzs7OztJQUFYLFVBQVksTUFBcUI7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FDdEQsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FDcEIsQ0FBQztTQUNIO0tBQ0Y7Ozs7SUFFTyw4REFBa0I7Ozs7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRztZQUNsQixNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNMO3dCQUNFLElBQUksRUFBRSxNQUFNO3dCQUNaLElBQUksRUFBRTs0QkFDSixJQUFJLEVBQUUsTUFBTTs0QkFDWixVQUFVLEVBQUUsSUFBSTs0QkFDaEIsY0FBYyxFQUFFO2dDQUNkLElBQUksRUFBRSxJQUFJOzZCQUNYOzRCQUNELGFBQWEsRUFBRSxLQUFLO3lCQUNyQjt3QkFDRCxTQUFTLEVBQUU7NEJBQ1QsT0FBTyxFQUFFLEtBQUs7eUJBQ2Y7d0JBQ0QsS0FBSyxFQUFFOzRCQUNMLE9BQU8sRUFBRSxJQUFJOzRCQUNiLFNBQVMsRUFDUCxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztnQ0FDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztnQ0FDM0QsQ0FBQyxDQUFDLE9BQU87NEJBQ2IsUUFBUSxFQUFFLENBQUM7NEJBQ1gsYUFBYSxFQUFFLENBQUM7eUJBQ2pCO3FCQUNGO2lCQUNGO2dCQUNELEtBQUssRUFBRTtvQkFDTDt3QkFDRSxTQUFTLEVBQUU7NEJBQ1QsT0FBTyxFQUFFLEtBQUs7eUJBQ2Y7d0JBQ0QsS0FBSyxFQUFFOzRCQUNMLFNBQVMsRUFDUCxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztnQ0FDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztnQ0FDM0QsQ0FBQyxDQUFDLE9BQU87NEJBQ2IsUUFBUSxFQUFFLENBQUM7NEJBQ1gsUUFBUSxFQUFFLElBQUk7NEJBQ2QsV0FBVyxFQUFFLENBQUM7NEJBQ2QsTUFBTSxFQUFFLEtBQUs7NEJBQ2IsYUFBYSxFQUFFLENBQUM7NEJBQ2hCLFFBQVEsRUFBRSxVQUFTLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTTtnQ0FDckMsTUFBTSxDQUFDLEtBQUssQ0FBQzs2QkFDZDt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1lBQ0QsbUJBQW1CLEVBQUUsS0FBSztZQUMxQixNQUFNLEVBQUU7Z0JBQ04sT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLFFBQVE7YUFDbkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFLEtBQUs7YUFDZjtTQUNGLENBQUM7OztnQkFsSUwsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxNQUFNLEVBQUU7d0JBQ04sc3RCQTRCUTtxQkFDVDtvQkFDRCxRQUFRLEVBQUUscVNBVVQ7aUJBQ0Y7Ozs7Z0JBaERRLHFCQUFxQjs7OzZCQW9EM0IsS0FBSzs2QkFFTCxLQUFLOzs0Q0EvRFI7O1NBMERhLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydERhdGEsIENoYXJ0T3B0aW9ucyB9IGZyb20gJ2NoYXJ0LmpzJztcbmltcG9ydCB7IEZvcmVjYXN0IH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlckhlbHBlcnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvd2VhdGhlci1oZWxwZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlclNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vd2VhdGhlci5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1mb3JlY2FzdC1kZXRhaWwtZGF5JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgIHBhZGRpbmc6IDAuMWVtIDA7XG4gICAgICAgICAgICAgICBmb250LXNpemU6IDFlbTtcbiAgICAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcblxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICA6aG9zdCA+ICoge1xuICAgICAgICAgICAgICAgcGFkZGluZzogMCAwLjRlbTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgLmxlZnQge1xuICAgICAgICAgICAgICAgZmxleC1ncm93OiAwO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB3ZWF0aGVyLWNoYXJ0IHtcbiAgICAgICAgICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgICAgICAgIHdpZHRoOiA4MCU7XG4gICAgICAgICAgICAgICBmbGV4OiAxIDE7XG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgd2VhdGhlci1pY29uIHtcbiAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDAuM2VtO1xuICAgICAgICAgICAgICAgZm9udC1zaXplOiAxLjRlbTtcbiAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCI+XG4gICAgICB7e2ZvcmVjYXN0WzBdPy5kYXRhIHwgZGF0ZTonRUVFJyB9fVxuICAgICAgPHdlYXRoZXItaWNvbiBbaWNvbkNsYXNzXT1cImZvcmVjYXN0WzBdPy5pY29uQ2xhc3NcIj48L3dlYXRoZXItaWNvbj5cbiAgICA8L2Rpdj5cbiAgICA8d2VhdGhlci1jaGFydFxuICAgICAgW3R5cGVdPVwiJ2xpbmUnXCJcbiAgICAgIFtkYXRhXT1cImNoYXJ0RGF0YVwiXG4gICAgICBbb3B0aW9uc109XCJjaGFydE9wdGlvbnNcIlxuICAgID48L3dlYXRoZXItY2hhcnQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckZvcmVjYXN0RGV0YWlsRGF5Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgY2hhcnREYXRhITogQ2hhcnREYXRhO1xuICBjaGFydE9wdGlvbnMhOiBDaGFydE9wdGlvbnM7XG4gIEBJbnB1dCgpIHNldHRpbmdzITogV2VhdGhlclNldHRpbmdzO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JlY2FzdCh2YWx1ZTogRm9yZWNhc3RbXSkge1xuICAgIHRoaXMuX2ZvcmVjYXN0ID0gdmFsdWU7XG4gIH1cbiAgZ2V0IGZvcmVjYXN0KCk6IEZvcmVjYXN0W10ge1xuICAgIHJldHVybiB0aGlzLl9mb3JlY2FzdDtcbiAgfVxuICBwcml2YXRlIF9mb3JlY2FzdCE6IEZvcmVjYXN0W107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3ZWF0aGVySGVscGVyczogV2VhdGhlckhlbHBlcnNTZXJ2aWNlKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLnNldHRpbmdzICYmIGNoYW5nZVsnZm9yZWNhc3QnXSkge1xuICAgICAgdGhpcy51cGRhdGVDaGFydE9wdGlvbnMoKTtcbiAgICAgIHRoaXMuY2hhcnREYXRhID0gdGhpcy53ZWF0aGVySGVscGVycy5tYXBGb3JlY2FzdFRvQ2hhcnRzKFxuICAgICAgICB0aGlzLl9mb3JlY2FzdCxcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jb2xvclxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNoYXJ0T3B0aW9ucygpIHtcbiAgICB0aGlzLmNoYXJ0T3B0aW9ucyA9IHtcbiAgICAgIHNjYWxlczoge1xuICAgICAgICB4QXhlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICd0aW1lJyxcbiAgICAgICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgICAgdW5pdDogJ2hvdXInLFxuICAgICAgICAgICAgICBpc29XZWVrZGF5OiB0cnVlLFxuICAgICAgICAgICAgICBkaXNwbGF5Rm9ybWF0czoge1xuICAgICAgICAgICAgICAgIGhvdXI6ICdoQSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdG9vbHRpcEZvcm1hdDogJ0xMTCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncmlkTGluZXM6IHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICAgICAgICBmb250Q29sb3I6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyAmJiB0aGlzLnNldHRpbmdzLmNvbG9yXG4gICAgICAgICAgICAgICAgICA/IHRoaXMud2VhdGhlckhlbHBlcnMuaGV4VG9SZ2JBKHRoaXMuc2V0dGluZ3MuY29sb3IsICcwLjgnKVxuICAgICAgICAgICAgICAgICAgOiAnd2hpdGUnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgbWF4VGlja3NMaW1pdDogM1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgeUF4ZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBncmlkTGluZXM6IHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBmb250Q29sb3I6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyAmJiB0aGlzLnNldHRpbmdzLmNvbG9yXG4gICAgICAgICAgICAgICAgICA/IHRoaXMud2VhdGhlckhlbHBlcnMuaGV4VG9SZ2JBKHRoaXMuc2V0dGluZ3MuY29sb3IsICcwLjgnKVxuICAgICAgICAgICAgICAgICAgOiAnd2hpdGUnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYXV0b1NraXA6IHRydWUsXG4gICAgICAgICAgICAgIGxhYmVsT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICBtaXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXhUaWNrc0xpbWl0OiAzLFxuICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24odmFsdWUsIGluZGV4LCB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgIGxlZ2VuZDoge1xuICAgICAgICBkaXNwbGF5OiBmYWxzZSxcbiAgICAgICAgcG9zaXRpb246ICdib3R0b20nXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
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
export { WeatherCurrentDetailsComponent };
function WeatherCurrentDetailsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherCurrentDetailsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherCurrentDetailsComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherCurrentDetailsComponent.propDecorators;
    /** @type {?} */
    WeatherCurrentDetailsComponent.prototype.maxTemp;
    /** @type {?} */
    WeatherCurrentDetailsComponent.prototype.minTemp;
    /** @type {?} */
    WeatherCurrentDetailsComponent.prototype.pressure;
    /** @type {?} */
    WeatherCurrentDetailsComponent.prototype.humidity;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci1jdXJyZW50LWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC1kZXRhaWxzL3dlYXRoZXItY3VycmVudC1kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O2dCQUV6RSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE1BQU0sRUFBRTt3QkFDTixpVUFrQkQ7cUJBQ0E7b0JBQ0QsUUFBUSxFQUFFLDhZQWFUO2lCQUNGOzs7OzRCQUVFLEtBQUs7NEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7O3lDQTdDUjs7U0F5Q2EsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1jdXJyZW50LWRldGFpbHMnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBtYXJnaW4tdG9wOiAxZW07XG4gICAgfVxuICAgIC5yb3cge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgLnJvdyBzcGFuIHtcbiAgICAgIG1hcmdpbjogMCAwLjNlbTtcbiAgICB9XG4gICAgLndpIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMC4zZW07XG4gICAgfVxuICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGkgY2xhc3M9XCJ3aSB3aS10aGVybW9tZXRlclwiPjwvaT5cbiAgICAgIDxzcGFuPlxuICAgICAgICAgIDxzcGFuPk1pbjoge3ttaW5UZW1wfX0mZGVnOzwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj5NYXg6IHt7bWF4VGVtcH19JmRlZzs8L3NwYW4+XG4gICAgICA8L3NwYW4+XG5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8c3Bhbj48aSBjbGFzcz1cIndpIHdpLWJhcm9tZXRlclwiPjwvaT5QcmVzc3VyZToge3twcmVzc3VyZX19PC9zcGFuPlxuICAgICAgPHNwYW4+PGkgY2xhc3M9XCJ3aSB3aS1odW1pZGl0eVwiPjwvaT5IdW1pZGl0eToge3todW1pZGl0eX19JTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyQ3VycmVudERldGFpbHNDb21wb25lbnQge1xuICBASW5wdXQoKSBtYXhUZW1wITogbnVtYmVyO1xuICBASW5wdXQoKSBtaW5UZW1wITogbnVtYmVyO1xuICBASW5wdXQoKSBwcmVzc3VyZSE6IG51bWJlcjtcbiAgQElucHV0KCkgaHVtaWRpdHkhOiBudW1iZXI7XG59XG4iXX0=
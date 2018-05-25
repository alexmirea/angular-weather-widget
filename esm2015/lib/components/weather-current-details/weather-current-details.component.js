/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
export class WeatherCurrentDetailsComponent {
}
WeatherCurrentDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'weather-current-details',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [
                    `
    :host {
      font-size: 0.8em;
      text-align: center;
      margin-top: 1em;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    .row span {
      margin: 0 0.3em;
    }
    .wi {
      margin-right: 0.3em;
    }
  `
                ],
                template: `
    <div class="row">
      <i class="wi wi-thermometer"></i>
      <span>
          <span>Min: {{minTemp}}&deg;</span>
          <span>Max: {{maxTemp}}&deg;</span>
      </span>

    </div>
    <div class="row">
      <span><i class="wi wi-barometer"></i>Pressure: {{pressure}}</span>
      <span><i class="wi wi-humidity"></i>Humidity: {{humidity}}%</span>
    </div>
  `
            },] },
];
/** @nocollapse */
WeatherCurrentDetailsComponent.propDecorators = {
    "maxTemp": [{ type: Input },],
    "minTemp": [{ type: Input },],
    "pressure": [{ type: Input },],
    "humidity": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci1jdXJyZW50LWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC1kZXRhaWxzL3dlYXRoZXItY3VycmVudC1kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUF5QzFFLE1BQU07OztZQXZDTCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRTtvQkFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JEO2lCQUNBO2dCQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO2FBQ0Y7Ozs7d0JBRUUsS0FBSzt3QkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItY3VycmVudC1kZXRhaWxzJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICA6aG9zdCB7XG4gICAgICBmb250LXNpemU6IDAuOGVtO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgbWFyZ2luLXRvcDogMWVtO1xuICAgIH1cbiAgICAucm93IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuICAgIC5yb3cgc3BhbiB7XG4gICAgICBtYXJnaW46IDAgMC4zZW07XG4gICAgfVxuICAgIC53aSB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuM2VtO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxpIGNsYXNzPVwid2kgd2ktdGhlcm1vbWV0ZXJcIj48L2k+XG4gICAgICA8c3Bhbj5cbiAgICAgICAgICA8c3Bhbj5NaW46IHt7bWluVGVtcH19JmRlZzs8L3NwYW4+XG4gICAgICAgICAgPHNwYW4+TWF4OiB7e21heFRlbXB9fSZkZWc7PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuXG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPHNwYW4+PGkgY2xhc3M9XCJ3aSB3aS1iYXJvbWV0ZXJcIj48L2k+UHJlc3N1cmU6IHt7cHJlc3N1cmV9fTwvc3Bhbj5cbiAgICAgIDxzcGFuPjxpIGNsYXNzPVwid2kgd2ktaHVtaWRpdHlcIj48L2k+SHVtaWRpdHk6IHt7aHVtaWRpdHl9fSU8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckN1cnJlbnREZXRhaWxzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbWF4VGVtcCE6IG51bWJlcjtcbiAgQElucHV0KCkgbWluVGVtcCE6IG51bWJlcjtcbiAgQElucHV0KCkgcHJlc3N1cmUhOiBudW1iZXI7XG4gIEBJbnB1dCgpIGh1bWlkaXR5ITogbnVtYmVyO1xufVxuIl19
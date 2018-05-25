/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TemperatureScale } from '../weather-current-temperature/current-temperature.component';
export class WeatherCurrentWindComponent {
    /**
     * @return {?}
     */
    get scale() {
        return this._scale;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set scale(value) {
        this._scale = value;
        this.unit = this.mapScaleToText(this._scale);
    }
    /**
     * @return {?}
     */
    get deg() {
        return this._deg;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set deg(value) {
        if (!value) {
            return;
        }
        this._deg = value;
        this.windIcon = `wi wi-wind from-${this._deg}-deg`;
    }
    /**
     * @param {?} scale
     * @return {?}
     */
    mapScaleToText(scale) {
        switch (scale) {
            case TemperatureScale.CELCIUS:
            case TemperatureScale.KELVIN:
                return 'm/s';
            case TemperatureScale.FAHRENHEIT:
                return 'mil/h';
            default:
                return '';
        }
    }
}
WeatherCurrentWindComponent.decorators = [
    { type: Component, args: [{
                selector: 'weather-current-wind',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [
                    `
    :host {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 0.8em;
      min-height: 1.3em;
    }
    i {
      margin-left: 0.3em;
      font-size: 1.6em;
    }
  `
                ],
                template: `
    <span>Wind {{ speed }} {{ unit }}</span>
   <i [class]="windIcon"></i>
  `
            },] },
];
/** @nocollapse */
WeatherCurrentWindComponent.propDecorators = {
    "scale": [{ type: Input },],
    "deg": [{ type: Input },],
    "speed": [{ type: Input },],
};
function WeatherCurrentWindComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherCurrentWindComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherCurrentWindComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherCurrentWindComponent.propDecorators;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype.unit;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype.windIcon;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype._deg;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype.speed;
    /** @type {?} */
    WeatherCurrentWindComponent.prototype._scale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci1jdXJyZW50LXdpbmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dlYXRoZXItY3VycmVudC13aW5kL3dlYXRoZXItY3VycmVudC13aW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsS0FBSyxFQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBMEJoRyxNQUFNOzs7O0lBRUosSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7Ozs7O1FBR0csS0FBSyxDQUFDLEtBQUs7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OztJQUcvQyxJQUFJLEdBQUc7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQjs7Ozs7UUFHRyxHQUFHLENBQUMsS0FBYTtRQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsbUJBQW1CLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQzs7Ozs7O0lBTXJELGNBQWMsQ0FBQyxLQUF1QjtRQUNwQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFDOUIsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2YsS0FBSyxnQkFBZ0IsQ0FBQyxVQUFVO2dCQUM5QixNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pCO2dCQUNFLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDYjtLQUNGOzs7WUE3REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxNQUFNLEVBQUU7b0JBQ047Ozs7Ozs7Ozs7OztHQVlEO2lCQUNBO2dCQUNELFFBQVEsRUFBRTs7O0dBR1Q7YUFDRjs7OztzQkFPRSxLQUFLO29CQVVMLEtBQUs7c0JBU0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRlbXBlcmF0dXJlU2NhbGUgfSBmcm9tICcuLi93ZWF0aGVyLWN1cnJlbnQtdGVtcGVyYXR1cmUvY3VycmVudC10ZW1wZXJhdHVyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VhdGhlclNldHRpbmdzIH0gZnJvbSAnLi4vLi4vd2VhdGhlci5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2VhdGhlci1jdXJyZW50LXdpbmQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDAuOGVtO1xuICAgICAgbWluLWhlaWdodDogMS4zZW07XG4gICAgfVxuICAgIGkge1xuICAgICAgbWFyZ2luLWxlZnQ6IDAuM2VtO1xuICAgICAgZm9udC1zaXplOiAxLjZlbTtcbiAgICB9XG4gIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3Bhbj5XaW5kIHt7IHNwZWVkIH19IHt7IHVuaXQgfX08L3NwYW4+XG4gICA8aSBbY2xhc3NdPVwid2luZEljb25cIj48L2k+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgV2VhdGhlckN1cnJlbnRXaW5kQ29tcG9uZW50IHtcbiAgdW5pdCE6IHN0cmluZztcbiAgZ2V0IHNjYWxlKCkge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBzY2FsZSh2YWx1ZSkge1xuICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XG4gICAgdGhpcy51bml0ID0gdGhpcy5tYXBTY2FsZVRvVGV4dCh0aGlzLl9zY2FsZSk7XG4gIH1cbiAgd2luZEljb24hOiBzdHJpbmc7XG4gIGdldCBkZWcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGVnO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlZyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kZWcgPSB2YWx1ZTtcbiAgICB0aGlzLndpbmRJY29uID0gYHdpIHdpLXdpbmQgZnJvbS0ke3RoaXMuX2RlZ30tZGVnYDtcbiAgfVxuICBwcml2YXRlIF9kZWchOiBudW1iZXI7XG4gIEBJbnB1dCgpIHNwZWVkITogbnVtYmVyO1xuICBwcml2YXRlIF9zY2FsZSE6IFRlbXBlcmF0dXJlU2NhbGU7XG5cbiAgbWFwU2NhbGVUb1RleHQoc2NhbGU6IFRlbXBlcmF0dXJlU2NhbGUpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoc2NhbGUpIHtcbiAgICAgIGNhc2UgVGVtcGVyYXR1cmVTY2FsZS5DRUxDSVVTOlxuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLktFTFZJTjpcbiAgICAgICAgcmV0dXJuICdtL3MnO1xuICAgICAgY2FzZSBUZW1wZXJhdHVyZVNjYWxlLkZBSFJFTkhFSVQ6XG4gICAgICAgIHJldHVybiAnbWlsL2gnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxufVxuIl19
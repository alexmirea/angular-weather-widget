/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
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
export { WeatherActionsComponent };
function WeatherActionsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherActionsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherActionsComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeatherActionsComponent.propDecorators;
    /** @type {?} */
    WeatherActionsComponent.prototype.update;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd2VhdGhlci1hY3Rpb25zL2FjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDOzs7c0JBeUJpQixJQUFJLFlBQVksRUFBRTs7O2dCQXZCekQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxNQUFNLEVBQUU7d0JBQ04sbVBBWUQ7cUJBQ0E7b0JBQ0QsUUFBUSxFQUFFLHNGQUVUO2lCQUNGOzs7OzJCQUVFLE1BQU07O2tDQTlCVDs7U0E2QmEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItYWN0aW9ucycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgYnV0dG9uIHtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxLjZlbTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIH1cbiAgICBidXR0b246aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwgMC4xKTtcbiAgICB9XG4gIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uIChjbGljayk9XCJ1cGRhdGUuZW1pdCgpXCI+PGkgY2xhc3M9XCJ3aSB3aS1yZWZyZXNoXCI+PC9pPjwvYnV0dG9uPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFdlYXRoZXJBY3Rpb25zQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIHVwZGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iXX0=
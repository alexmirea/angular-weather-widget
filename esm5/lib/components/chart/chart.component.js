/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ElementRef } from '@angular/core';
import { ChartOptions, ChartData, Chart } from 'chart.js';
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
export { ChartComponent };
function ChartComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ChartComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ChartComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ChartComponent.propDecorators;
    /** @type {?} */
    ChartComponent.prototype.chart;
    /** @type {?} */
    ChartComponent.prototype.type;
    /** @type {?} */
    ChartComponent.prototype.data;
    /** @type {?} */
    ChartComponent.prototype.options;
    /** @type {?} */
    ChartComponent.prototype.elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci13ZWF0aGVyLXdpZGdldC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2NoYXJ0L2NoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQzs7SUFheEQsd0JBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7S0FBSTs7OztJQUU5QyxpQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRztZQUNwQixLQUFLLEVBQUU7Z0JBQ0w7b0JBQ0UsS0FBSyxFQUFFOzt3QkFFTCxRQUFRLEVBQUUsVUFBUyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU07NEJBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNqQztxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFDckQ7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FDRixDQUFDO0tBQ0g7Ozs7O0lBRUQsb0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQWxDLGlCQVFDO1FBUEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLHFCQUFNLGNBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ2xELENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtnQkFDM0QsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsY0FBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BELENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckI7S0FDRjs7Z0JBN0NGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsTUFBTSxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQ3RDOzs7O2dCQVZDLFVBQVU7Ozt5QkFjVCxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7eUJBbkJSOztTQWNhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0T3B0aW9ucywgQ2hhcnREYXRhLCBDaGFydCB9IGZyb20gJ2NoYXJ0LmpzJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dlYXRoZXItY2hhcnQnLFxuICB0ZW1wbGF0ZTogJzxjYW52YXM+PC9jYW52YXM+JyxcbiAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTogYmxvY2s7IH0nXVxufSlcbmV4cG9ydCBjbGFzcyBDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgY2hhcnQ6IGFueTtcblxuICBASW5wdXQoKSB0eXBlITogc3RyaW5nO1xuICBASW5wdXQoKSBkYXRhITogQ2hhcnREYXRhO1xuICBASW5wdXQoKSBvcHRpb25zITogQ2hhcnRPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2NhbGVzID0ge1xuICAgICAgeUF4ZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgZXhjZXNzIGRlY2ltYWwgcGxhY2VzXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24odmFsdWUsIGluZGV4LCB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZS50b0ZpeGVkKDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICAgIHRoaXMuY2hhcnQgPSBuZXcgQ2hhcnQoXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9uc1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuY2hhcnQgJiYgY2hhbmdlc1snZGF0YSddKSB7XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjaGFuZ2VzWydkYXRhJ10uY3VycmVudFZhbHVlO1xuICAgICAgWydkYXRhc2V0cycsICdsYWJlbHMnLCAneExhYmVscycsICd5TGFiZWxzJ10uZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG4gICAgICAgIHRoaXMuY2hhcnQuZGF0YVtwcm9wZXJ0eV0gPSBjdXJyZW50VmFsdWVbcHJvcGVydHldO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmNoYXJ0LnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19
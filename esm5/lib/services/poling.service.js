/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { mergeMap, multicast, refCount, merge } from 'rxjs/operators';
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
export { PoolingService };
function PoolingService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PoolingService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PoolingService.ctorParameters;
    /** @type {?} */
    PoolingService.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3BvbGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE9BQU8sRUFBZ0IsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTs7SUFJbkUsd0JBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0tBQUk7SUFFcEMsbUZBQW1GOzs7Ozs7O0lBQ25GLGdDQUFPOzs7Ozs7SUFBUCxVQUNFLFNBQThCLEVBQzlCLFNBQXdCO1FBRjFCLGlCQWtDQztRQWhDQywwQkFBQSxFQUFBLGdCQUF3QjtRQUV4QixxQkFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM5QixxQkFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQXFCO1lBQ3JELHFCQUFJLEdBQWlCLENBQUM7WUFDdEIsS0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDMUIscUJBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLEdBQUcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO3FCQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUN6QixTQUFTLENBQUM7b0JBQ1QsSUFBSTs7Ozs4QkFBQyxNQUFNO3dCQUNULElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQ1AsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDdkIsQ0FBQyxDQUFDO3FCQUNKO29CQUNELEtBQUs7Ozs7OEJBQUMsR0FBRzt3QkFDUCxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUNQLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ3JCLENBQUMsQ0FBQztxQkFDSjtpQkFDRixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUM7Z0JBQ0wsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ25CO2FBQ0YsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNO2FBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQzVEOztnQkF2Q0YsVUFBVTs7OztnQkFMVSxNQUFNOzt5QkFBM0I7O1NBTWEsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAsIG11bHRpY2FzdCwgcmVmQ291bnQsIG1lcmdlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb29saW5nU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIC8vIE5PVEU6IFJ1bm5pbmcgdGhlIGludGVydmFsIG91dHNpZGUgQW5ndWxhciBlbnN1cmVzIHRoYXQgZTJlIHRlc3RzIHdpbGwgbm90IGhhbmcuXG4gIGV4ZWN1dGU8VD4oXG4gICAgb3BlcmF0aW9uOiAoKSA9PiBPYnNlcnZhYmxlPFQ+LFxuICAgIGZyZXF1ZW5jeTogbnVtYmVyID0gMTAwMFxuICApOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICBjb25zdCBzb3VyY2UgPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb247XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBjb25zdCB6b25lID0gdGhpcy56b25lO1xuICAgICAgICBzdWIgPSBpbnRlcnZhbChmcmVxdWVuY3kpXG4gICAgICAgICAgLnBpcGUobWVyZ2VNYXAob3BlcmF0aW9uKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yKGVycikge1xuICAgICAgICAgICAgICB6b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNvdXJjZVxuICAgICAgLnBpcGUobXVsdGljYXN0KHN1YmplY3QpLCByZWZDb3VudCgpLCBtZXJnZShvcGVyYXRpb24oKSkpXG4gIH1cbn1cbiJdfQ==
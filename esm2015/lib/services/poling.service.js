/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { mergeMap, multicast, refCount, merge } from 'rxjs/operators';
export class PoolingService {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
    }
    /**
     * @template T
     * @param {?} operation
     * @param {?=} frequency
     * @return {?}
     */
    execute(operation, frequency = 1000) {
        const /** @type {?} */ subject = new Subject();
        const /** @type {?} */ source = Observable.create((observer) => {
            let /** @type {?} */ sub;
            this.zone.runOutsideAngular(() => {
                const /** @type {?} */ zone = this.zone;
                sub = interval(frequency)
                    .pipe(mergeMap(operation))
                    .subscribe({
                    /**
                     * @param {?} result
                     * @return {?}
                     */
                    next(result) {
                        zone.run(() => {
                            observer.next(result);
                        });
                    },
                    /**
                     * @param {?} err
                     * @return {?}
                     */
                    error(err) {
                        zone.run(() => {
                            observer.error(err);
                        });
                    }
                });
            });
            return () => {
                if (sub) {
                    sub.unsubscribe();
                }
            };
        });
        return source
            .pipe(multicast(subject), refCount(), merge(operation()));
    }
}
PoolingService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PoolingService.ctorParameters = () => [
    { type: NgZone, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3BvbGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE9BQU8sRUFBZ0IsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUdyRSxNQUFNOzs7O0lBQ0osWUFBb0IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7S0FBSTs7Ozs7OztJQUdwQyxPQUFPLENBQ0wsU0FBOEIsRUFDOUIsWUFBb0IsSUFBSTtRQUV4Qix1QkFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM5Qix1QkFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQXFCLEVBQUUsRUFBRTtZQUN6RCxxQkFBSSxHQUFpQixDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUMvQix1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdkIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7cUJBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3pCLFNBQVMsQ0FBQzs7Ozs7b0JBQ1QsSUFBSSxDQUFDLE1BQU07d0JBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7NEJBQ1osUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDdkIsQ0FBQyxDQUFDO3FCQUNKOzs7OztvQkFDRCxLQUFLLENBQUMsR0FBRzt3QkFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTs0QkFDWixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNyQixDQUFDLENBQUM7cUJBQ0o7aUJBQ0YsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDVixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNSLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDbkI7YUFDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU07YUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDNUQ7OztZQXZDRixVQUFVOzs7O1lBTFUsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAsIG11bHRpY2FzdCwgcmVmQ291bnQsIG1lcmdlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb29saW5nU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIC8vIE5PVEU6IFJ1bm5pbmcgdGhlIGludGVydmFsIG91dHNpZGUgQW5ndWxhciBlbnN1cmVzIHRoYXQgZTJlIHRlc3RzIHdpbGwgbm90IGhhbmcuXG4gIGV4ZWN1dGU8VD4oXG4gICAgb3BlcmF0aW9uOiAoKSA9PiBPYnNlcnZhYmxlPFQ+LFxuICAgIGZyZXF1ZW5jeTogbnVtYmVyID0gMTAwMFxuICApOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICBjb25zdCBzb3VyY2UgPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb247XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBjb25zdCB6b25lID0gdGhpcy56b25lO1xuICAgICAgICBzdWIgPSBpbnRlcnZhbChmcmVxdWVuY3kpXG4gICAgICAgICAgLnBpcGUobWVyZ2VNYXAob3BlcmF0aW9uKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yKGVycikge1xuICAgICAgICAgICAgICB6b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNvdXJjZVxuICAgICAgLnBpcGUobXVsdGljYXN0KHN1YmplY3QpLCByZWZDb3VudCgpLCBtZXJnZShvcGVyYXRpb24oKSkpXG4gIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var WeatherHelpersService = /** @class */ (function () {
    function WeatherHelpersService() {
    }
    /**
     * @param {?} list
     * @return {?}
     */
    WeatherHelpersService.prototype.groupForecastsByDay = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        var /** @type {?} */ map = {};
        var /** @type {?} */ result = [];
        list.forEach(function (el) {
            var /** @type {?} */ day = el.data.getUTCDate();
            if (!map[day]) {
                map[day] = [el];
            }
            else {
                map[day].push(el);
            }
        });
        result = Object.keys(map).map(function (key) { return map[key]; });
        return result;
    };
    // Fixme: This function generates wrong icon for average day weather.
    // Weather icon is taken from first day measurement
    /**
     * @param {?} list
     * @return {?}
     */
    WeatherHelpersService.prototype.reduceToAveragePerDay = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        return list.reduce(function (prev, curr) {
            if (curr && !curr.data) {
                prev.push(curr);
                return prev;
            }
            var /** @type {?} */ lastElement = function () {
                return prev[prev.length - 1];
            };
            var /** @type {?} */ prevDay = lastElement()
                ? prev[prev.length - 1].data.getDay()
                : null;
            var /** @type {?} */ currDay = curr.data.getDay();
            if (currDay === prevDay) {
                var /** @type {?} */ result = lastElement();
                result.temp = (result.temp + curr.temp) / 2;
                if (result.wind && curr.wind) {
                    result.wind = {
                        speed: (result.wind.speed + curr.wind.speed) / 2,
                        deg: (result.wind.deg + curr.wind.deg) / 2
                    };
                }
                if (result.humidity && curr.humidity) {
                    result.humidity = (result.humidity + curr.humidity) / 2;
                }
                if (result.pressure && curr.pressure) {
                    result.pressure = (result.pressure + curr.pressure) / 2;
                }
                prev[prev.length - 1] = result;
                return prev;
            }
            else {
                prev.push(curr);
                return prev;
            }
        }, []);
    };
    /**
     * @param {?} forecast
     * @param {?=} borderColor
     * @return {?}
     */
    WeatherHelpersService.prototype.mapForecastToCharts = /**
     * @param {?} forecast
     * @param {?=} borderColor
     * @return {?}
     */
    function (forecast, borderColor) {
        if (borderColor === void 0) { borderColor = '#aaa'; }
        return forecast.reduce(function (prev, curr) {
            if (prev.labels) {
                prev.labels.push(curr.data.toISOString());
            }
            if (prev.datasets && prev.datasets[0] && prev.datasets[0].data) {
                var /** @type {?} */ data = /** @type {?} */ (prev.datasets[0].data);
                data.push(curr.temp);
            }
            return prev;
        }, /** @type {?} */ ({
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: ['rgba(0, 0, 0, 0.1)'],
                    borderColor: [borderColor],
                    borderWidth: 1
                }
            ]
        }));
    };
    /**
     * @param {?} hex
     * @param {?} opacity
     * @return {?}
     */
    WeatherHelpersService.prototype.hexToRgbA = /**
     * @param {?} hex
     * @param {?} opacity
     * @return {?}
     */
    function (hex, opacity) {
        var /** @type {?} */ c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + "," + opacity + ")";
        }
    };
    WeatherHelpersService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WeatherHelpersService.ctorParameters = function () { return []; };
    return WeatherHelpersService;
}());
export { WeatherHelpersService };
function WeatherHelpersService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeatherHelpersService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeatherHelpersService.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci1oZWxwZXJzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXdlYXRoZXItd2lkZ2V0LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3dlYXRoZXItaGVscGVycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQU16QztLQUFnQjs7Ozs7SUFFaEIsbURBQW1COzs7O0lBQW5CLFVBQW9CLElBQWdCO1FBQ2xDLHFCQUFNLEdBQUcsR0FBa0MsRUFBRSxDQUFDO1FBQzlDLHFCQUFJLE1BQU0sR0FBc0IsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO1lBQ2IscUJBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2pCO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuQjtTQUNGLENBQUMsQ0FBQztRQUNILE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBUixDQUFRLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2Y7SUFFRCxxRUFBcUU7SUFDckUsbURBQW1EOzs7OztJQUNuRCxxREFBcUI7Ozs7SUFBckIsVUFBc0IsSUFBZ0I7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFnQixF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QUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxVQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUM1RCxHQUFHLENBQ0osU0FBSSxPQUFPLE1BQUcsQ0FBQztTQUNqQjtLQUNGOztnQkFuR0YsVUFBVTs7OztnQ0FKWDs7U0FLYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JlY2FzdCB9IGZyb20gJy4vYXBpL3dlYXRoZXIuYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hhcnREYXRhIH0gZnJvbSAnY2hhcnQuanMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2VhdGhlckhlbHBlcnNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdyb3VwRm9yZWNhc3RzQnlEYXkobGlzdDogRm9yZWNhc3RbXSk6IEFycmF5PEZvcmVjYXN0W10+IHtcbiAgICBjb25zdCBtYXA6IHsgW2tleTogc3RyaW5nXTogRm9yZWNhc3RbXSB9ID0ge307XG4gICAgbGV0IHJlc3VsdDogQXJyYXk8Rm9yZWNhc3RbXT4gPSBbXTtcbiAgICBsaXN0LmZvckVhY2goZWwgPT4ge1xuICAgICAgY29uc3QgZGF5ID0gZWwuZGF0YS5nZXRVVENEYXRlKCk7XG4gICAgICBpZiAoIW1hcFtkYXldKSB7XG4gICAgICAgIG1hcFtkYXldID0gW2VsXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcFtkYXldLnB1c2goZWwpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJlc3VsdCA9IE9iamVjdC5rZXlzKG1hcCkubWFwKGtleSA9PiBtYXBba2V5XSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIEZpeG1lOiBUaGlzIGZ1bmN0aW9uIGdlbmVyYXRlcyB3cm9uZyBpY29uIGZvciBhdmVyYWdlIGRheSB3ZWF0aGVyLlxuICAvLyBXZWF0aGVyIGljb24gaXMgdGFrZW4gZnJvbSBmaXJzdCBkYXkgbWVhc3VyZW1lbnRcbiAgcmVkdWNlVG9BdmVyYWdlUGVyRGF5KGxpc3Q6IEZvcmVjYXN0W10pIHtcbiAgICByZXR1cm4gbGlzdC5yZWR1Y2UoKHByZXY6IEZvcmVjYXN0W10sIGN1cnIpID0+IHtcbiAgICAgIGlmIChjdXJyICYmICFjdXJyLmRhdGEpIHtcbiAgICAgICAgcHJldi5wdXNoKGN1cnIpO1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxhc3RFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBwcmV2W3ByZXYubGVuZ3RoIC0gMV07XG4gICAgICB9O1xuICAgICAgY29uc3QgcHJldkRheSA9IGxhc3RFbGVtZW50KClcbiAgICAgICAgPyBwcmV2W3ByZXYubGVuZ3RoIC0gMV0uZGF0YS5nZXREYXkoKVxuICAgICAgICA6IG51bGw7XG4gICAgICBjb25zdCBjdXJyRGF5ID0gY3Vyci5kYXRhLmdldERheSgpO1xuICAgICAgaWYgKGN1cnJEYXkgPT09IHByZXZEYXkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBGb3JlY2FzdCA9IGxhc3RFbGVtZW50KCk7XG4gICAgICAgIHJlc3VsdC50ZW1wID0gKHJlc3VsdC50ZW1wICsgY3Vyci50ZW1wKSAvIDI7XG4gICAgICAgIGlmIChyZXN1bHQud2luZCAmJiBjdXJyLndpbmQpIHtcbiAgICAgICAgICByZXN1bHQud2luZCA9IHtcbiAgICAgICAgICAgIHNwZWVkOiAocmVzdWx0LndpbmQuc3BlZWQgKyBjdXJyLndpbmQuc3BlZWQpIC8gMixcbiAgICAgICAgICAgIGRlZzogKHJlc3VsdC53aW5kLmRlZyArIGN1cnIud2luZC5kZWcpIC8gMlxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0Lmh1bWlkaXR5ICYmIGN1cnIuaHVtaWRpdHkpIHtcbiAgICAgICAgICByZXN1bHQuaHVtaWRpdHkgPSAocmVzdWx0Lmh1bWlkaXR5ICsgY3Vyci5odW1pZGl0eSkgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQucHJlc3N1cmUgJiYgY3Vyci5wcmVzc3VyZSkge1xuICAgICAgICAgIHJlc3VsdC5wcmVzc3VyZSA9IChyZXN1bHQucHJlc3N1cmUgKyBjdXJyLnByZXNzdXJlKSAvIDI7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2W3ByZXYubGVuZ3RoIC0gMV0gPSByZXN1bHQ7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJldi5wdXNoKGN1cnIpO1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH1cbiAgICB9LCBbXSk7XG4gIH1cblxuICBtYXBGb3JlY2FzdFRvQ2hhcnRzKGZvcmVjYXN0OiBGb3JlY2FzdFtdLCBib3JkZXJDb2xvciA9ICcjYWFhJyk6IENoYXJ0RGF0YSB7XG4gICAgcmV0dXJuIGZvcmVjYXN0LnJlZHVjZShcbiAgICAgIChwcmV2OiBDaGFydERhdGEsIGN1cnI6IEZvcmVjYXN0KSA9PiB7XG4gICAgICAgIGlmIChwcmV2LmxhYmVscykge1xuICAgICAgICAgIHByZXYubGFiZWxzLnB1c2goY3Vyci5kYXRhLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2LmRhdGFzZXRzICYmIHByZXYuZGF0YXNldHNbMF0gJiYgcHJldi5kYXRhc2V0c1swXS5kYXRhKSB7XG4gICAgICAgICAgY29uc3QgZGF0YTogbnVtYmVyW10gPSA8bnVtYmVyW10+cHJldi5kYXRhc2V0c1swXS5kYXRhO1xuICAgICAgICAgIGRhdGEucHVzaChjdXJyLnRlbXApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICB9LFxuICAgICAgPENoYXJ0RGF0YT57XG4gICAgICAgIGxhYmVsczogW10sXG4gICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFsncmdiYSgwLCAwLCAwLCAwLjEpJ10sXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogW2JvcmRlckNvbG9yXSxcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGhleFRvUmdiQShoZXg6IHN0cmluZywgb3BhY2l0eTogc3RyaW5nKSB7XG4gICAgbGV0IGM6IGFueTtcbiAgICBpZiAoL14jKFtBLUZhLWYwLTldezN9KXsxLDJ9JC8udGVzdChoZXgpKSB7XG4gICAgICBjID0gaGV4LnN1YnN0cmluZygxKS5zcGxpdCgnJyk7XG4gICAgICBpZiAoYy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgYyA9IFtjWzBdLCBjWzBdLCBjWzFdLCBjWzFdLCBjWzJdLCBjWzJdXTtcbiAgICAgIH1cbiAgICAgIGMgPSAnMHgnICsgYy5qb2luKCcnKTtcbiAgICAgIHJldHVybiBgcmdiYSgke1soYyA+PiAxNikgJiAyNTUsIChjID4+IDgpICYgMjU1LCBjICYgMjU1XS5qb2luKFxuICAgICAgICAnLCdcbiAgICAgICl9LCR7b3BhY2l0eX0pYDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
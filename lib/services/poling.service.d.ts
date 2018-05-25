import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
export declare class PoolingService {
    private zone;
    constructor(zone: NgZone);
    execute<T>(operation: () => Observable<T>, frequency?: number): Observable<T>;
}

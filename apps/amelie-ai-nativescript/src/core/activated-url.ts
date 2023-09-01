import { InjectionToken, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const ACTIVATED_URL = new InjectionToken<string>('ACTIVATED_URL');

const activatedUrl = new Subject<string>();

export function setActivatedUrl(url: string): void {
	activatedUrl.next(url);
}

export function getActivatedUrl$(zone: NgZone): Observable<string> {
	const zonedObservable = new Subject<string>();
	activatedUrl.subscribe((it) => {
		zone.run(() => {
			zonedObservable.next(it);
		});
	});
	return zonedObservable;
}

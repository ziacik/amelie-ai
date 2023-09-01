import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ACTIVATED_URL } from './activated-url';

@Injectable({
	providedIn: 'root',
})
export class ContentRetrievalService {
	constructor(@Inject(ACTIVATED_URL) private readonly activatedUrl: Observable<URL>) {}

	getContent(): Observable<string> {
		return this.activatedUrl.pipe(map((it) => it.toString()));
	}
}

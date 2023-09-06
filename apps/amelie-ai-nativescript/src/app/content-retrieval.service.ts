import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { ACTIVATED_URL } from '../core/activated-url';

@Injectable({
	providedIn: 'root',
})
export class ContentRetrievalService {
	constructor(@Inject(ACTIVATED_URL) private readonly activatedUrl: Observable<string>, private readonly http: HttpClient) {}

	getContent(): Observable<string> {
		return this.activatedUrl.pipe(switchMap((url) => this.retrieveContent(`https://amelie-ai.azurewebsites.net/api/article?url=${url}`)));
	}

	private retrieveContent(url: string): Observable<string> {
		console.log('gonna retrieve', url);
		return this.http.get(url, { responseType: 'json' }).pipe(
			map((it) => JSON.stringify(it)),
			tap(console.log),
			catchError((err: HttpErrorResponse) => of(`Error: ${err.message?.trim()}`))
		);
	}
}

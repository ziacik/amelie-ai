import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { ACTIVATED_URL } from '../core/activated-url';

@Injectable({
	providedIn: 'root',
})
export class ContentRetrievalService {
	constructor(@Inject(ACTIVATED_URL) private readonly activatedUrl: Observable<string>, private readonly http: HttpClient) {}

	getContent(): Observable<string> {
		return this.activatedUrl.pipe(switchMap((url) => this.retrieveContent(`http://192.168.0.141:3000/article?url=${url}`)));
	}

	private retrieveContent(url: string): Observable<string> {
		return this.http.get(url, { responseType: 'json' }).pipe(
			map((it) => (it as Record<string, string>)['content']),
			catchError((err: HttpErrorResponse) => of(`Error: ${err.message?.trim()}`))
		);
	}
}

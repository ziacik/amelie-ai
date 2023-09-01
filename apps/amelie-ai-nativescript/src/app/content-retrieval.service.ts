import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ACTIVATED_URL } from '../core/activated-url';

@Injectable({
	providedIn: 'root',
})
export class ContentRetrievalService {
	constructor(@Inject(ACTIVATED_URL) private readonly activatedUrl: Observable<string>, private readonly http: HttpClient) {}

	// todo this url doesn't work https://movieweb.com/electric-dreams-what-happened-sci-fi-anthology/

	getContent(): Observable<string> {
		return this.activatedUrl.pipe(switchMap((url) => this.retrieveContent(url)));
	}

	private retrieveContent(url: string): Observable<string> {
		return this.http.get(url, { responseType: 'text' }).pipe(catchError((err: HttpErrorResponse) => of(`Error: ${err.message?.trim()}`)));
	}
}

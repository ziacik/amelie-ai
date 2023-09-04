import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ArticleAiService {
	constructor(private readonly http: HttpClient) {}

	convert(articleHtml: string): Observable<string> {
		const payload = {
			model: 'gpt-3.5-turbo-16k',
			messages: [
				{
					role: 'system',
					content:
						'You will be provided with an article in html format, and your task is to rewrite that article, with the most valuable parts from the original in a more concise style. Please translate to slovak language and use a html format.',
				},
				{ role: 'user', content: articleHtml },
			],
		};
		const response = this.http
			.post('https://api.openai.com/v1/chat/completions', payload, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${globalThis.OPENAI_API_KEY}`,
				},
			})
			.pipe(
				catchError((e) => {
					return of({
						choices: [
							{
								message: {
									content: e.message ?? 'Error',
								},
							},
						],
					});
				})
			);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return response.pipe(map((completion: any) => completion.choices[0].message.content ?? 'i dont know'));
	}
}

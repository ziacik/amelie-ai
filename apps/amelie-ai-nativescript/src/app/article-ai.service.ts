import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ArticleAiService {
	constructor(private readonly http: HttpClient) {}

	convert(articleHtml: string): Observable<string> {
		console.log('gonna request ai for ', articleHtml);
		const payload = {
			model: 'gpt-3.5-turbo-16k',
			messages: [
				{
					role: 'system',
					content:
						'Dostaneš článok a tvojou úlohou je prepísať ho do čo najmenej viet. Vynechaj omáčky a vysvetlenia kontextu, nechaj iba hlavnú vetvu článku. Použi vo výstupe HTML, aby to vyzeralo pekne, a prelož výsledok do slovenčiny.',
				},
				{ role: 'user', content: articleHtml },
			],
			temperature: 0,
			max_tokens: 1024,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		};
		const response = this.http
			.post('https://api.openai.com/v1/chat/completions', payload, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${globalThis.OPENAI_API_KEY}`,
				},
			})
			.pipe(
				tap(console.log),
				catchError((e) => {
					console.log('caught error', e);
					return of({
						choices: [
							{
								message: {
									content: e.message ?? 'Error',
								},
							},
						],
					});
				}),
				tap(console.log)
			);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return response.pipe(map((completion: any) => completion.choices[0].message.content ?? 'i dont know'));
	}
}

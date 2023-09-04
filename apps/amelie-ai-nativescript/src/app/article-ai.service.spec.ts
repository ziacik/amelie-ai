import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { lastValueFrom } from 'rxjs';
import { ArticleAiService } from './article-ai.service';

describe('ArticleAiService', () => {
	let service: ArticleAiService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(ArticleAiService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('will ask openai about the article and return the response', async () => {
		global.OPENAI_API_KEY = 'api-key';
		const responsePromise = lastValueFrom(service.convert('some article'));
		const req = httpTestingController.expectOne('https://api.openai.com/v1/chat/completions');
		req.flush({
			choices: [
				{
					message: {
						content: `Ai response for: ${req.request.body.messages[1].content}`,
					},
				},
			],
		});
		expect(req.request.headers.get('Authorization')).toBe('Bearer api-key');
		expect(await responsePromise).toEqual('Ai response for: some article');
	});

	it('will return error message in case of error (todo)', async () => {
		global.OPENAI_API_KEY = 'wrong-key';
		const responsePromise = lastValueFrom(service.convert('some article'));
		const req = httpTestingController.expectOne('https://api.openai.com/v1/chat/completions');
		req.flush('error', { status: 401, statusText: 'Unauthorized' });
		expect(await responsePromise).toEqual('Http failure response for https://api.openai.com/v1/chat/completions: 401 Unauthorized');
	});
});

import { TestBed } from '@angular/core/testing';

import { lastValueFrom, of } from 'rxjs';
import { ACTIVATED_URL } from '../core/activated-url';
import { ContentRetrievalService } from './content-retrieval.service';

describe('ContentRetrievalService', () => {
	let service: ContentRetrievalService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ACTIVATED_URL,
					useValue: of('https://some-url.net/'),
				},
			],
		});
		service = TestBed.inject(ContentRetrievalService);
	});

	it('will retrieve content from activated url', async () => {
		const content$ = service.getContent();
		expect(await lastValueFrom(content$)).toEqual('https://some-url.net/');
	});
});

import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { lastValueFrom, of } from 'rxjs';
import { ACTIVATED_URL } from '../core/activated-url';
import { ContentRetrievalService } from './content-retrieval.service';

describe('ContentRetrievalService', () => {
	let service: ContentRetrievalService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				{
					provide: ACTIVATED_URL,
					useValue: of('https://some-url.net/'),
				},
			],
		});
		service = TestBed.inject(ContentRetrievalService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('will retrieve content from activated url', async () => {
		const contentPromise = lastValueFrom(service.getContent());
		const request = httpTestingController.expectOne('https://some-url.net/');
		request.flush('<html>content</html>');
		expect(await contentPromise).toEqual('<html>content</html>');
	});

	it('will return error message when error occurs on fetch', async () => {
		const contentPromise = lastValueFrom(service.getContent());
		const request = httpTestingController.expectOne('https://some-url.net/');
		request.error(new ProgressEvent('error'));
		expect(await contentPromise).toEqual('Error: Http failure response for https://some-url.net/: 0');
	});
});

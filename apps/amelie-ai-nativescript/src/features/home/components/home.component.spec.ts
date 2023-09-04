import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { ArticleAiService } from '../../../app/article-ai.service';
import { ContentRetrievalService } from '../../../app/content-retrieval.service';
import { ACTIVATED_URL } from '../../../core/activated-url';
import { MockHtmlViewComponent } from '../../../mocks/html-view.component.mock';
import { NativeScriptMocksModule } from '../../../mocks/nativescript-mocks.module';
import { HomeComponent } from './home.component';

jest.mock('../../../utils', () => ({
	setStatusBarColor: jest.fn(),
}));

describe('HomeComponent', () => {
	let fixture: ComponentFixture<HomeComponent>;
	let content: Subject<string>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NativeScriptMocksModule, HttpClientTestingModule],
			declarations: [HomeComponent],
			providers: [
				{ provide: ContentRetrievalService, ArticleAiService },
				{
					provide: ACTIVATED_URL,
					useValue: undefined,
				},
			],
		}).compileComponents();

		content = new BehaviorSubject('some text from content retrieval service');

		const contentRetrievalService = TestBed.inject(ContentRetrievalService);
		jest.spyOn(contentRetrievalService, 'getContent').mockReturnValue(content);

		const articleAiService = TestBed.inject(ArticleAiService);
		jest.spyOn(articleAiService, 'convert').mockImplementation((html) => of(`Ai response for: ${html}`));

		fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
	});

	it('shows the content from the content retrieval service', () => {
		const view: MockHtmlViewComponent = fixture.debugElement.query(By.directive(MockHtmlViewComponent)).componentInstance;
		expect(view).toBeDefined();
		expect(view.html).toBe('Ai response for: some text from content retrieval service');
	});

	it('updates the content when retrieval service updates content', () => {
		content.next('updated content');
		fixture.detectChanges();
		const view: MockHtmlViewComponent = fixture.debugElement.query(By.directive(MockHtmlViewComponent)).componentInstance;
		expect(view).toBeDefined();
		expect(view.html).toBe('Ai response for: updated content');
	});
});

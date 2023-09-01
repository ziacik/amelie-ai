import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { ContentRetrievalService } from '../../../app/content-retrieval.service';
import { ACTIVATED_URL } from '../../../core/activated-url';
import { MockLabelComponent } from '../../../mocks/label.component.mock';
import { NativeScriptMocksModule } from '../../../mocks/nativescript-mocks.module';
import { HomeComponent } from './home.component';

jest.mock('../../../utils', () => ({
	setStatusBarColor: jest.fn(),
}));

describe('HomeComponent', () => {
	let fixture: ComponentFixture<HomeComponent>;
	let contentRetrievalService: ContentRetrievalService;
	let content: Subject<string>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NativeScriptMocksModule],
			declarations: [HomeComponent],
			providers: [
				{ provide: ContentRetrievalService },
				{
					provide: ACTIVATED_URL,
					useValue: undefined,
				},
			],
		}).compileComponents();

		content = new BehaviorSubject('some text from content retrieval service');

		contentRetrievalService = TestBed.inject(ContentRetrievalService);
		jest.spyOn(contentRetrievalService, 'getContent').mockReturnValue(content);

		fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
	});

	it('shows the content from the content retrieval service', () => {
		const label: MockLabelComponent = fixture.debugElement.query(By.directive(MockLabelComponent)).componentInstance;
		expect(label).toBeDefined();
		expect(label.text).toContain('some text from content retrieval service');
	});

	it('updates the content when retrieval service updates content', () => {
		content.next('updated content');
		fixture.detectChanges();
		const label: MockLabelComponent = fixture.debugElement.query(By.directive(MockLabelComponent)).componentInstance;
		expect(label).toBeDefined();
		expect(label.text).toContain('updated content');
	});
});

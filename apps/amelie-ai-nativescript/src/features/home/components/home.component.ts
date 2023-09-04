import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ArticleAiService } from '../../../app/article-ai.service';
import { ContentRetrievalService } from '../../../app/content-retrieval.service';
import { setStatusBarColor } from '../../../utils';

@Component({
	moduleId: module.id,
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent {
	readonly content$: Observable<string>;

	constructor(contentRetrievalService: ContentRetrievalService, articleAiService: ArticleAiService) {
		this.content$ = contentRetrievalService.getContent().pipe(switchMap((it) => articleAiService.convert(it)));
	}

	ngOnInit() {
		setStatusBarColor('dark', '#97d9e9');
	}
}

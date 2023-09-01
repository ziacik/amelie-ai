import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentRetrievalService } from '../../../app/content-retrieval.service';
import { setStatusBarColor } from '../../../utils';

@Component({
	moduleId: module.id,
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent {
	readonly content$: Observable<string>;

	constructor(contentRetrievalService: ContentRetrievalService) {
		this.content$ = contentRetrievalService.getContent();
	}

	ngOnInit() {
		setStatusBarColor('dark', '#97d9e9');
	}
}

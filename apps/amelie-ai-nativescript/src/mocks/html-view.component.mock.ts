import { Component, Input } from '@angular/core';

@Component({
	selector: 'HtmlView',
	template: '',
})
export class MockHtmlViewComponent {
	@Input() html: string | undefined;
}

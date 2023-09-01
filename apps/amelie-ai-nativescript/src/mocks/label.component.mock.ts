import { Component, Input } from '@angular/core';

@Component({
	selector: 'Label',
	template: '',
})
export class MockLabelComponent {
	@Input() text: string | undefined;
}

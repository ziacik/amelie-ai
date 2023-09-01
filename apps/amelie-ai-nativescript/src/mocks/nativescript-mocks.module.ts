import { NgModule } from '@angular/core';
import { MockActionBarComponent } from './action-bar.component.mock';
import { MockHtmlViewComponent } from './html-view.component.mock';
import { MockImageComponent } from './image.component.mock';
import { MockLabelComponent } from './label.component.mock';
import { MockStackLayoutBarComponent } from './stack-layout.component.mock';

@NgModule({
	declarations: [MockActionBarComponent, MockStackLayoutBarComponent, MockImageComponent, MockLabelComponent, MockHtmlViewComponent],
	exports: [MockActionBarComponent, MockStackLayoutBarComponent, MockImageComponent, MockLabelComponent, MockHtmlViewComponent],
})
export class NativeScriptMocksModule {}

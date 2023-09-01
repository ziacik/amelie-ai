import { NgModule, NgZone, Optional, SkipSelf } from '@angular/core';
import { NativeScriptHttpClientModule, NativeScriptModule, throwIfAlreadyLoaded } from '@nativescript/angular';
import { ACTIVATED_URL, getActivatedUrl$ } from './activated-url';

@NgModule({
	imports: [NativeScriptModule, NativeScriptHttpClientModule],
	providers: [
		{
			provide: ACTIVATED_URL,
			deps: [NgZone],
			useFactory: (zone: NgZone) => getActivatedUrl$(zone),
		},
	],
})
export class CoreModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: CoreModule
	) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}
}

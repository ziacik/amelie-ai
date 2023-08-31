import { AndroidActivityCallbacks, Application, setActivityCallbacks } from '@nativescript/core';

class ActivityCallbacksNullError extends Error {
	constructor() {
		super('MainActivity _callbacks field not initialized.');
	}
}

@NativeClass()
@JavaProxy('org.nativescript.amelieai.MainActivity')
export class Activity extends androidx.appcompat.app.AppCompatActivity {
	public isNativeScriptActivity = false;

	private _callbacks: AndroidActivityCallbacks | undefined;

	public override onCreate(savedInstanceState: android.os.Bundle): void {
		Application.android.init(this.getApplication());

		this.isNativeScriptActivity = true;

		if (!this._callbacks) {
			setActivityCallbacks(this);
		}

		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onCreate(this, savedInstanceState, this.getIntent(), super.onCreate);
	}

	public override onNewIntent(intent: android.content.Intent): void {
		const extras = intent.getExtras();

		// todo remove
		console.log('on new intent', extras.getString(android.content.Intent.EXTRA_TEXT));

		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onNewIntent(this, intent, super.setIntent, super.onNewIntent);
	}

	public override onSaveInstanceState(outState: android.os.Bundle): void {
		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
	}

	public override onStart(): void {
		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onStart(this, super.onStart);
	}

	public override onStop(): void {
		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onStop(this, super.onStop);
	}

	public override onDestroy(): void {
		super.onDestroy();
		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onDestroy(this, super.onDestroy);
	}

	public override onPostResume(): void {
		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onPostResume(this, super.onPostResume);
	}

	public override onBackPressed(): void {
		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onBackPressed(this, super.onBackPressed);
	}

	public override onRequestPermissionsResult(requestCode: number, permissions: string[], grantResults: number[]): void {
		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, () => {
			/* void */
		});
	}

	public override onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
		if (!this._callbacks) {
			throw new ActivityCallbacksNullError();
		}

		this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
	}
}

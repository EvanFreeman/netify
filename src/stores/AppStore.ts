import {action, observable} from 'mobx';
import {RootStore} from './RootStore';

export class AppStore {
	constructor(_rootStore: RootStore) {}

	@observable
	composeShown = false;

	@observable
	sectionRatio = 50;

	@observable
	logsCollapsed = false;

	@observable
	displayedError: string | null = null;

	@action
	showCompose() {
		this.composeShown = true;
	}

	@action
	hideCompose() {
		this.composeShown = false;
	}

	@action
	setSectionRatio(ratio: number, logsCollapsed: boolean) {
		this.sectionRatio = ratio;
		this.logsCollapsed = logsCollapsed;
	}

	@action
	toggleLogsCollapse() {
		if (this.logsCollapsed) {
			this.sectionRatio = 50;
			this.logsCollapsed = false;
		} else {
			this.sectionRatio = 100;
			this.logsCollapsed = true;
		}
	}

	@action
	toggleComposeShow() {
		this.composeShown = !this.composeShown;
	}

	@action
	setDisplayedError(error: string) {
		this.displayedError = error;
	}

	@action
	resetDisplayedError() {
		this.displayedError = null;
	}
}

import {observable, action, computed} from 'mobx';
import {Log} from '@/interfaces/log';
import {RootStore} from './RootStore';

export class LogsStore {
	constructor(private rootStore: RootStore) {}

	@observable
	readonly list: Log[] = [];

	@computed
	get listIsEmpty() {
		return this.list.length === 0;
	}

	@action
	add(log: Log) {
		if (log.requestStage === 'Response') {
			const existingLog = this.list.find(
				item => item.requestId === log.requestId && item.requestStage === 'Request',
			);

			if (existingLog) {
				Object.assign(existingLog, log);
				existingLog.requestStage = 'Both';
				return;
			}
		}
		this.list.push(log);
	}

	@action
	clearList() {
		this.list.splice(0, this.list.length);
	}
}

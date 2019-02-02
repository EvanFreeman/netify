import * as React from 'react';
import {inject} from 'mobx-react';
import {RulesStore} from '@/stores/RulesStore';
import {Button} from '@/components/@common/Button';
import {ExpandableCheckbox} from '@/components/@common/ExpandableCheckbox';
import {ComposeForm} from './ComposeForm';
import {ComposeFilter} from './ComposeFilter';
import {ComposeActionRequest} from './ComposeActionRequest';
import {ComposeActionResponse} from './ComposeActionResponse';
import {ComposeActionCancel} from './ComposeActionCancel';
import {Rule} from '@/interfaces/Rule';
import styles from './compose.css';

interface Props {
	rulesStore?: RulesStore;
}

@inject('rulesStore')
export class Compose extends React.PureComponent<Props> {
	render() {
		return (
			<div className={styles.root}>
				<ComposeForm className={styles.form} onSave={this.onSubmit}>
					<h3 className={styles.title}>Filter requests:</h3>
					<ComposeFilter />

					<h3 className={styles.title}>Actions:</h3>
					<ExpandableCheckbox name='actions.mutateRequest.enabled' label='Mutate request'>
						<ComposeActionRequest />
					</ExpandableCheckbox>

					<ExpandableCheckbox name='actions.mutateResponse.enabled' label='Mutate Response'>
						<ComposeActionResponse />
					</ExpandableCheckbox>

					<ExpandableCheckbox name='actions.cancelRequest.enabled' label='Cancel'>
						<ComposeActionCancel />
					</ExpandableCheckbox>

					<div className={styles.controls}>
						<Button className={styles.saveButton} type='submit'>
							Save
						</Button>
						<Button styleType='secondary' onClick={this.onCancel}>
							Cancel
						</Button>
					</div>
				</ComposeForm>
			</div>
		);
	}

	private onSubmit = (rule: Rule) => {
		this.props.rulesStore!.save(rule);
	};

	private onCancel = () => {
		this.props.rulesStore!.toggleComposeShow();
	};
}

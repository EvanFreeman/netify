import * as React from 'react';
import classNames from 'classnames';
import {Rule} from '@/interfaces/Rule';
import {IconButton} from '@/components/@common/IconButton';
import styles from './rulesItem.css';

interface Props {
	data: Rule;
	onEdit(id: string): void;
	onRemove(id: string): void;
}

interface State {
	expanded: boolean;
}

export class RulesItem extends React.PureComponent<Props, State> {
	state = {
		expanded: false,
	};

	render() {
		const {filter} = this.props.data;
		const {expanded} = this.state;
		const {methods, resourceTypes} = filter;
		const url = filter.url.value ? filter.url.value.toString() : undefined;

		return (
			<div className={styles.root}>
				<div className={styles.entry}>
					<IconButton
						className={classNames(styles.expandButton, expanded && styles.expanded)}
						onClick={this.onToggleExpand}
					/>

					<div className={styles.summary}>
						<div className={styles.filterInfo}>
							<span className={classNames(styles.value, styles.method)}>
								{methods.length === 0 ? (
									<span className={styles.placeholder}>All methods</span>
								) : (
									methods.join('/')
								)}
							</span>
							<span className={classNames(styles.value, styles.type)}>
								{resourceTypes.length === 0 ? (
									<span className={styles.placeholder}>All types</span>
								) : (
									resourceTypes.join('/')
								)}
							</span>
							<span className={classNames(styles.value, styles.url)} title={url && url.toString()}>
								{!url ? ( // prettier-ignore
									<span className={styles.placeholder}>All urls</span>
								) : (
									url.toString()
								)}
							</span>
						</div>
						<p className={styles.actionsInfo}>{this.parseActionsArray()}</p>
					</div>

					<div className={styles.controlsPlaceholder} />

					<IconButton
						className={classNames(styles.control, styles.typeEdit)}
						tooltip='Edit the rule'
						onClick={this.onEdit}
					/>
					<IconButton
						className={classNames(styles.control, styles.typeRemove)}
						tooltip='Remove the rule'
						onClick={this.onRemove}
					/>
				</div>

				{expanded && <div>{this.props.children}</div>}
			</div>
		);
	}

	private parseActionsArray() {
		const {breakpoint, mutate, cancel} = this.props.data.actions;
		const {request: mutateRequest, response: mutateResponse} = mutate;
		const actions = [];

		if (breakpoint.request) {
			actions.push('Breakpoint on request');
		}

		if (breakpoint.response) {
			actions.push('Breakpoint on response');
		}

		if (mutateRequest.enabled) {
			const {endpoint, method, headers, body} = mutateRequest;
			if (endpoint) {
				actions.push('Redirect to url');
			}
			if (method) {
				actions.push('Replacing method');
			}
			if (Object.keys(headers.add).length > 0 || headers.remove.length > 0) {
				actions.push('Modifying request headers');
			}
			if (body.type) {
				actions.push('Replacing request body');
			}
		}

		if (mutateResponse.enabled) {
			const {statusCode, headers, body} = mutateResponse;
			if (statusCode) {
				actions.push('Replacing response status');
			}
			if (Object.keys(headers.add).length > 0 || headers.remove.length > 0) {
				actions.push('Modifying response headers');
			}
			if (body.type) {
				actions.push('Replacing response body');
			}
		}

		if (cancel.enabled) {
			actions.push('Returning error');
		}

		if (actions.length === 0) {
			actions.push('No actions');
		}

		return actions.join(', ');
	}

	private onToggleExpand = () => {
		this.setState(state => ({expanded: !state.expanded}));
	};

	private onEdit = () => this.props.onEdit(this.props.data.id);

	private onRemove = () => this.props.onRemove(this.props.data.id);
}

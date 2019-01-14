import * as React from 'react';
import styles from './appSectionHeader.css';

interface Props {
	title: string;
}

export class AppSectionHeader extends React.Component<Props> {
	render() {
		const {title, children} = this.props;

		return (
			<div className={styles.root}>
				<p className={styles.title}>{title}</p>
				{children}
			</div>
		);
	}
}

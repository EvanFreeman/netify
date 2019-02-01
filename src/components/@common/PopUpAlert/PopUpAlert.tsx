import * as React from 'react';
import {Button} from '@/components/@common/Button';
import {PopUp} from '@/components/@common/PopUp';
import styles from './popUpAlert.css';

interface Props {
	onClose: () => any;
}

export class PopUpAlert extends React.PureComponent<Props> {
	render() {
		const {children, onClose} = this.props;
		return (
			<PopUp className={styles.root}>
				<div className={styles.content}>{children}</div>
				<Button styleType='main' onClick={onClose}>
					Close
				</Button>
			</PopUp>
		);
	}
}

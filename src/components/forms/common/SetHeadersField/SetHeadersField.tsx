import React, {memo} from 'react';
import {KeyValueArrayField} from '@/components/@common/forms/KeyValueArrayField';
import {FieldRow} from '../FieldRow';

interface SetHeadersFieldProps {
	name: string;
}

export const SetHeadersField = memo<SetHeadersFieldProps>(function SetHeadersField({name}) {
	return (
		<FieldRow title='Set headers:'>
			<KeyValueArrayField
				name={name}
				keyNameSuffix='name'
				valueNameSuffix='value'
				keyPlaceholder='Header name'
				valuePlaceholder='Header value'
			/>
		</FieldRow>
	);
});

import { Lenses } from '@/Lenses'
import { Slots } from '@/Slots'
import { ScalarFieldTypes } from '@/types';

import { FlexibleInput } from './FlexibleInput';

export interface FlexibleInputsProps {
    valueType: string;
    value: any;
    errors?: string | string[]
    inputProps?: Record<string, any>
}
export const FlexibleInputs = ({ valueType, value, errors, inputProps }: FlexibleInputsProps) => {
    const valueTypes: string[] = Object.values(ScalarFieldTypes)
    if (!valueTypes.includes(valueType)) valueTypes.push(valueType)
    return (
        <Lenses activeLens={valueType}>
            <Slots slotKeys={valueTypes}>
                <FlexibleInput valueType={ScalarFieldTypes.BOOLEAN}>
                    {value}
                </FlexibleInput>
                <FlexibleInput valueType={ScalarFieldTypes.DATETIME}>
                    {value}
                </FlexibleInput>
                <FlexibleInput valueType={ScalarFieldTypes.FLOAT}>
                    <input type='number' {...inputProps} />
                </FlexibleInput>
                <FlexibleInput valueType={ScalarFieldTypes.INT}>
                    <input type='number' {...inputProps} />
                </FlexibleInput>
                <FlexibleInput valueType={ScalarFieldTypes.STRING}>
                    <input type='text' {...inputProps} />
                </FlexibleInput>
                <span>{errors}</span>
            </Slots>
        </Lenses>
    )
};

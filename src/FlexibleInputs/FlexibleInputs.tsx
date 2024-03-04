import { Lenses } from '@/Lenses'
import { Slots } from '@/Slots'
import { ScalarFieldTypes } from '@/types';

import { FlexibleInput } from './FlexibleInput';

export interface FlexibleInputsProps {
    valueType: string;
    data: any;
    inputProps?: Record<string, any>
}
export const FlexibleInputs = ({ valueType, data, inputProps }: FlexibleInputsProps) => {
    const valueTypes: string[] = Object.values(ScalarFieldTypes)
    if (!valueTypes.includes(valueType)) valueTypes.push(valueType)
    return (
        <Lenses activeLens={valueType}>
            <Slots slotKeys={valueTypes}>
                <FlexibleInput valueType={ScalarFieldTypes.BOOLEAN}>
                    {data}
                </FlexibleInput>
                <FlexibleInput valueType={ScalarFieldTypes.DATETIME}>
                    {data}
                </FlexibleInput>
                <FlexibleInput valueType={ScalarFieldTypes.FLOAT}>
                    {data}
                </FlexibleInput>
                <FlexibleInput valueType={ScalarFieldTypes.INT}>
                    {data}
                </FlexibleInput>
                <FlexibleInput valueType={ScalarFieldTypes.STRING}>
                    <input {...inputProps} />
                </FlexibleInput>
            </Slots>
        </Lenses>
    )
};

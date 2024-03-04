import { Lenses } from '@/Lenses'
import { Slots } from '@/Slots'
import { ScalarFieldTypes } from '@/types';

import { FlexibleValue } from './FlexibleValue';

export interface FlexibleValuesProps {
    valueType: string;
    data: any;
}
export const FlexibleValues = ({ valueType, data }: FlexibleValuesProps) => {
    const valueTypes: string[] = Object.values(ScalarFieldTypes)
    if (!valueTypes.includes(valueType)) valueTypes.push(valueType)
    return (
        <Lenses activeLens={valueType}>
            <Slots slotKeys={valueTypes}>
                <FlexibleValue valueType={ScalarFieldTypes.BOOLEAN}>
                    {data}
                </FlexibleValue>
                <FlexibleValue valueType={ScalarFieldTypes.DATETIME}>
                    {data}
                </FlexibleValue>
                <FlexibleValue valueType={ScalarFieldTypes.FLOAT}>
                    {data}
                </FlexibleValue>
                <FlexibleValue valueType={ScalarFieldTypes.INT}>
                    {data}
                </FlexibleValue>
                <FlexibleValue valueType={ScalarFieldTypes.STRING}>
                    {data}
                </FlexibleValue>
            </Slots>
        </Lenses>
    )
};

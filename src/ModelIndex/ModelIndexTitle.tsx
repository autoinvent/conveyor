import { HTMLAttributes } from 'react'

import { humanizeText } from '@/utils';

import { useModelIndexState } from './useModelIndexState';

export interface ModelIndexTitleProps extends HTMLAttributes<HTMLHeadingElement> { }

export const ModelIndexTitle = ({
    children,
    ...props
}: ModelIndexTitleProps) => {
    const [model] = useModelIndexState((state) => state.model)
    const modelDisplayName = humanizeText(model)
    return (
        <h2 {...props}>
            {children === undefined ? modelDisplayName : children}
        </h2>
    );
};

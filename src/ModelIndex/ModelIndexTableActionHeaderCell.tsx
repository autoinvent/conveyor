import { useStore } from '@tanstack/react-store';

import { CommonProps, WrapperProp } from '@/types';

import { useModelIndexStore } from './useModelIndexStore';

export interface ModelIndexTableActionHeaderCellProps
    extends CommonProps,
    WrapperProp { }

export const ModelIndexTableActionHeaderCell = ({
    children,
    id,
    className,
    style,
}: ModelIndexTableActionHeaderCellProps) => {
    const modelIndexStore = useModelIndexStore();
    const { actionsConfig } = useStore(modelIndexStore, (state) => ({
        data: state.data,
        fields: state.fields,
        actionsConfig: state.actionsConfig,
    }));
    const showActions = actionsConfig?.showActions !== false;

    return showActions ? (
        <th id={id} className={className} style={style}>
            {children === undefined ? null :
                children}
        </th>
    ) : null;
};

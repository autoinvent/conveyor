import { CSSProperties } from "react";

export interface BaseComponentProps {
    id?: string;
    className?: string;
    style?: CSSProperties
}

export type FieldType =
    | string
    | {
        modelName: string;
        many: boolean;
        type: string;
    }

export type Field =
    | string
    | {
        name: string;
        type: FieldType;
        required?: boolean;
        editable?: boolean;
    };


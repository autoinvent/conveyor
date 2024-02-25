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
        type: string; // TODO: may be unecessary if ID type is used.
    }

export type Field =
    | string
    | {
        name: string;
        type: FieldType;
        required?: boolean;
        editable?: boolean;
    };

export type Data = Record<string, any>;
export interface MergeConflict {
    field: string;
    valueType: "string" | "number" | "boolean" | "object" | "array" | "null";
    targetValue: string | null;
    duplicateValue: string | null;
}

export interface MergeConflicts {
    conflicts: MergeConflict[];
}

export interface MergeCompleteCompanyUpdate {
    name?: string;
    address_line_1?: string;
    address_line_2?: string;
    state?: string;
    city?: string;
    postal_code?: string;
}

export type MergeResolution = {
    field: string;
    resolution: "target" | "duplicate" | "override";
    value: any;
};
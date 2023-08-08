export interface ResourceOutput {
    resourceType: string;
    id: string;
    effectiveDateTime?: string;
    location?: {
        reference: string;
        display: string;
        status?: string;
        period?: {
            start: string;
            end?: string;
        };
    };
}
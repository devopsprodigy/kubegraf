export declare class BaseModel {
    name: string;
    data: any;
    is_deleted: boolean;
    open: boolean;
    limit: number | boolean;
    constructor(data: any);
    update(data: any): void;
    destroy(): void;
    toggle(): void;
    showAllPods(): void;
}

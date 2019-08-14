export declare class Store {
    get(key: string): any;
    set(key: string, value: any): void;
    getBool(key: string, def: any): any;
    getObject(key: string, def?: any): any;
    setObject(key: string, value: any): boolean;
    exists(key: string): boolean;
    delete(key: string): void;
}
export declare const store: Store;
export default store;

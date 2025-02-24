import { ApplicationInstance, ApplicationMetadata } from '../types';
export declare const daprApiRef: import("@backstage/core-plugin-api").ApiRef<DaprApi>;
export type DaprApi = {
    getApplicationInstance(application: string): Promise<ApplicationInstance | undefined>;
    getApplicationMetadata(application: string): Promise<ApplicationMetadata | undefined>;
};

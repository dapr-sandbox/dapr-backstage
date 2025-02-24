import { DiscoveryApi, IdentityApi } from '@backstage/core-plugin-api/index';
import { DaprApi } from './DaprApi';
import { ApplicationInstance, ApplicationMetadata } from '../types';
export type Options = {
    discoveryApi: DiscoveryApi;
    identityApi: IdentityApi;
};
export declare class DaprClient implements DaprApi {
    private readonly discoveryApi;
    private readonly identityApi;
    constructor(options: {
        discoveryApi: DiscoveryApi;
        identityApi: IdentityApi;
    });
    private getBaseUrl;
    private fetcher;
    getApplicationInstance(applicationId: string): Promise<ApplicationInstance>;
    getApplicationMetadata(applicationId: string): Promise<ApplicationMetadata>;
}

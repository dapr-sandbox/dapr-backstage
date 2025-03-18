import { DiscoveryApi, IdentityApi } from '@backstage/core-plugin-api/index';
import { DaprApi } from './DaprApi';
import {
  ApplicationInstance,
  ApplicationMetadata,
  ComponentDetails,
} from '../types';

export type Options = {
  discoveryApi: DiscoveryApi;
  identityApi: IdentityApi;
};

export class DaprClient implements DaprApi {
  // @ts-ignore
  private readonly discoveryApi: DiscoveryApi;
  private readonly identityApi: IdentityApi;

  constructor(options: {
    discoveryApi: DiscoveryApi;
    identityApi: IdentityApi;
  }) {
    this.discoveryApi = options.discoveryApi;
    this.identityApi = options.identityApi;
  }

  private async getBaseUrl() {
    return `${await this.discoveryApi.getBaseUrl('proxy')}/dapr/api`;
  }

  private async fetcher(url: string) {
    const { token: idToken } = await this.identityApi.getCredentials();
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
      },
    });
    if (!response.ok) {
      throw new Error(
        `failed to fetch data, status ${response.status}: ${response.statusText}`,
      );
    }
    return await response.json();
  }

  async getApplicationInstance(applicationId: string) {
    const proxyUrl = await this.getBaseUrl();

    return (await this.fetcher(
      `${proxyUrl}/instances/All/${applicationId}`,
    )) as ApplicationInstance;
  }

  async getApplicationMetadata(applicationId: string) {
    const proxyUrl = await this.getBaseUrl();

    return (await this.fetcher(
      `${proxyUrl}/metadata/All/${applicationId}`,
    )) as ApplicationMetadata;
  }

  async getAppComponent(name: string) {
    const proxyUrl = await this.getBaseUrl();

    return (await this.fetcher(
      `${proxyUrl}/components/All/${name}`,
    )) as ComponentDetails;
  }
}

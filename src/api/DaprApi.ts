import { createApiRef } from '@backstage/core-plugin-api';
import { ApplicationInstance, ApplicationMetadata } from '../types';

export const daprApiRef = createApiRef<DaprApi>({
  id: 'plugin.dapr.service',
});

export type DaprApi = {
  getApplicationInstance(
    application: string,
  ): Promise<ApplicationInstance | undefined>;
  getApplicationMetadata(
    application: string,
  ): Promise<ApplicationMetadata | undefined>;
};

import { configApiRef, useApi } from '@backstage/frontend-plugin-api';

export const useDaprUI = () => {
  const configApi = useApi(configApiRef);
  const daprUiUrl = configApi.getOptionalString('dapr.uiUrl');
  return daprUiUrl;
};

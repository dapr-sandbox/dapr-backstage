import { configApiRef, useApi } from '@backstage/frontend-plugin-api';

export const daprUI = () => {
  const configApi = useApi(configApiRef);
  const daprUiUrl = configApi.getOptionalString('dapr.uiUrl');
  return daprUiUrl;
};

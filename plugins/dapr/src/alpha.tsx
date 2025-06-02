import { compatWrapper } from '@backstage/core-compat-api';
import {
  ApiBlueprint,
  createApiFactory,
  createFrontendPlugin,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/frontend-plugin-api';
import { daprApiRef, DaprClient } from './api';
import {
  EntityCardBlueprint,
  EntityContentBlueprint,
} from '@backstage/plugin-catalog-react/alpha';
import { isDaprAvailable } from './utils/isDaprAvailable';

export const daprApi = ApiBlueprint.make({
  name: 'daprApi',
  params: {
    factory: createApiFactory({
      api: daprApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        identityApi: identityApiRef,
      },
      factory: ({ discoveryApi, identityApi }) =>
        new DaprClient({
          discoveryApi,
          identityApi,
        }),
    }),
  },
});

export const daprEntityContent = EntityContentBlueprint.make({
  name: 'daprEntityContent',
  params: {
    defaultPath: 'dapr',
    defaultTitle: 'Dapr',
    filter: isDaprAvailable,
    loader: () =>
      import('./components/DaprEntityContent').then(m => (
        <m.DaprEntityContent />
      )),
  },
});

export const entityApplicationSummaryCard: any = EntityCardBlueprint.make({
  name: 'EntityApplicationSummaryCard',
  params: {
    filter: isDaprAvailable,
    loader: () =>
      import('./components/ApplicationSummaryCard').then(m =>
        compatWrapper(<m.ApplicationSummaryCard />),
      ),
  },
});

export const entityApplicationSubscriptionCard: any = EntityCardBlueprint.make({
  name: 'EntityApplicationSubscriptionCard',
  params: {
    filter: isDaprAvailable,
    loader: () =>
      import('./components/ApplicationSubscriptionsCard').then(m =>
        compatWrapper(<m.ApplicationSubscriptionsCard />),
      ),
  },
});

export const entityApplicationComponentsCard: any = EntityCardBlueprint.make({
  name: 'EntityApplicationComponentsCard',
  params: {
    filter: isDaprAvailable,
    loader: () =>
      import('./components/ApplicationComponentsCard').then(m =>
        compatWrapper(<m.ApplicationComponentsCard />),
      ),
  },
});

export const entityApplicationActorsCard: any = EntityCardBlueprint.make({
  name: 'EntityApplicationActorsCard',
  params: {
    filter: isDaprAvailable,
    loader: () =>
      import('./components/ApplicationActorsCard').then(m =>
        compatWrapper(<m.ApplicationActorsCard />),
      ),
  },
});

export default createFrontendPlugin({
  id: 'dapr',
  extensions: [
    daprApi,
    entityApplicationActorsCard,
    entityApplicationComponentsCard,
    entityApplicationSubscriptionCard,
    entityApplicationSummaryCard,
    daprEntityContent,
  ],
});

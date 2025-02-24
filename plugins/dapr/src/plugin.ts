import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { daprApiRef } from './api/DaprApi';
import { DaprClient } from './api';

export const daprPlugin = createPlugin({
  id: 'dapr',
  apis: [
    createApiFactory({
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
  ],
});

export const DaprEntityContent = daprPlugin.provide(
  createComponentExtension({
    name: 'DaprEntityContent',
    component: {
      lazy: () =>
        import('./components/DaprEntityContent/DaprEntityContent').then(
          m => m.DaprEntityContent,
        ),
    },
  }),
);

export const ApplicationSummaryCard = daprPlugin.provide(
  createComponentExtension({
    name: 'ApplicationSummaryCard',
    component: {
      lazy: () =>
        import('./components/ApplicationSummaryCard').then(
          m => m.ApplicationSummaryCard,
        ),
    },
  }),
);

export const ApplicationSubscriptionsCard = daprPlugin.provide(
  createComponentExtension({
    name: 'ApplicationSubscriptionsCard',
    component: {
      lazy: () =>
        import('./components/ApplicationSubscriptionsCard').then(
          m => m.ApplicationSubscriptionsCard,
        ),
    },
  }),
);

export const ApplicationComponentsCard = daprPlugin.provide(
  createComponentExtension({
    name: 'ApplicationComponentsCard',
    component: {
      lazy: () =>
        import('./components/ApplicationComponentsCard').then(
          m => m.ApplicationComponentsCard,
        ),
    },
  }),
);

export const ApplicationActorsCard = daprPlugin.provide(
  createComponentExtension({
    name: 'ApplicationActorsCard',
    component: {
      lazy: () =>
        import('./components/ApplicationActorsCard').then(
          m => m.ApplicationActorsCard,
        ),
    },
  }),
);

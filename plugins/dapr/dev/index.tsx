import { createDevApp } from '@backstage/dev-utils';
import { daprPlugin, DaprEntityContent } from '../src/plugin';

createDevApp()
  .registerPlugin(daprPlugin)
  .addPage({
    element: <DaprEntityContent />,
    title: 'Root Page',
    path: '/dapr',
  })
  .render();

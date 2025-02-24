import { Content, Page } from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import React from 'react';
import { ApplicationSummaryCard } from '../ApplicationSummaryCard/ApplicationSummaryCard';
import { ApplicationComponentsCard } from '../ApplicationComponentsCard/ApplicationComponentsCard';
import { ApplicationSubscriptionsCard } from '../ApplicationSubscriptionsCard/ApplicationSubscriptionsCard';
import { ApplicationActorsCard } from '../ApplicationActorsCard/ApplicationActorsCard';

export const DaprEntityContent = () => (
  <Page themeId="tool">
    <Content>
      <Grid container spacing={6} direction="row" alignItems="stretch">
        <Grid item md={4} xs={12}>
          <ApplicationSummaryCard />
        </Grid>
        <Grid item md={8}>
          <ApplicationComponentsCard />
        </Grid>
        <Grid item md={8}>
          <ApplicationSubscriptionsCard />
        </Grid>
        <Grid item md={4}>
          <ApplicationActorsCard />
        </Grid>
      </Grid>
    </Content>
  </Page>
);

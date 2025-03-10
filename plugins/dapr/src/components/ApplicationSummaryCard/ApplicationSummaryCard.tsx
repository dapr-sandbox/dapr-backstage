import React, { useEffect, useState } from 'react';
import { EmptyState, InfoCard, Link } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { Box, Typography, Button, Grid, Chip } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { daprApiRef } from '../../api';
import { ApplicationInstance } from '../../types';
import { useDaprApplicationId } from '../../utils/isDaprAvailable';
import { useDaprUI } from '../../utils/isDaprUiConfigured';
import { format } from 'date-fns';
import { CopyButton } from '../shared-components/CopyButton';
import { downloadManifest } from '../../utils/downloadManifest';

export const ApplicationSummaryCard = () => {
  const applicationId = useDaprApplicationId();
  const DaprAPI = useApi(daprApiRef);
  const [data, setData] = useState<ApplicationInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DaprAPI.getApplicationInstance(applicationId);

        if (!response) {
          throw new Error(`Wrong application id`);
        }

        setData(response);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [DaprAPI, applicationId]);

  const daprUIUrl = useDaprUI();
  const title = daprUIUrl ? (
    <>
      {`Dapr App Id: `}
      <Link to={`${daprUIUrl}/${applicationId}`}>{`${applicationId}`}</Link>
    </>
  ) : (
    `Dapr App Id: ${applicationId}`
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error || !data) {
    return (
      <EmptyState
        missing="data"
        title="No data to show"
        description="Check if the application_id is correct or if there is any connectivity issue with the Dapr API"
      />
    );
  }

  return (
    <InfoCard
      title={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GetAppIcon />}
              onClick={() => downloadManifest(data.manifest, applicationId)}
              disabled={!data.manifest || !applicationId}
            >
              Download Manifest
            </Button>
          </Box>
        </Box>
      }
    >
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="stretch"
        style={{ marginLeft: '0.01rem' }}
      >
        <Grid item md={3} xs={6}>
          <Item label="App Port">
            <Typography variant="body1">
              <span>{data.appPort}</span>
            </Typography>
          </Item>

          <Item label="HTTP Port">
            <Typography variant="body1">
              <span>{data.httpPort}</span>
            </Typography>
          </Item>

          <Item label="GRPC Port">
            <Typography variant="body1">
              <span>{data.grpcPort}</span>
            </Typography>
          </Item>
        </Grid>
        <Grid item md={4} xs={6}>
          <Item label="Address">
            <Typography
              variant="body1"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span>{data.address}</span>
              <CopyButton text={data.address} />
            </Typography>
          </Item>
          <Item label="Created">
            <Typography variant="body1">
              {format(new Date(data.created), 'dd/MMM/yyyy HH:mm:ss zzzz')}
            </Typography>
          </Item>
          <Item label="Age">
            <Typography variant="body1">{data.age}</Typography>
          </Item>
        </Grid>
        <Grid item md={5} xs={6}>
          <Item label="Labels" style={{ margin: '0' }}>
            <Typography variant="body1">
              {data.labels ? (
                <LabelsList labels={data?.labels?.split(',')} />
              ) : (
                'No labels'
              )}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </InfoCard>
  );
};

function Item({
  label,
  children,
  style,
}: {
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Box style={{ marginBottom: '0.5rem', ...style }}>
      <Typography variant="h6" style={{ fontSize: '1.2rem' }}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function LabelsList({ labels }: { labels: string[] }) {
  return (
    <Box>
      {labels.map(label => (
        <Chip key={label} label={label} />
      ))}
    </Box>
  );
}

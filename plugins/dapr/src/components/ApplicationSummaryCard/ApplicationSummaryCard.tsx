import React, { useEffect, useState } from 'react';
import {
  EmptyState,
  InfoCard,
  Link,
  StructuredMetadataTable,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { daprApiRef } from '../../api';
import { ApplicationInstance } from '../../types';
import { useDaprApplicationId } from '../../utils/isDaprAvailable';
import { useDaprUI } from '../../utils/isDaprUiConfigured';

export const ApplicationSummaryCard = () => {
  const applicationId = useDaprApplicationId();
  const DaprAPI = useApi(daprApiRef);
  const [data, setData] = useState<ApplicationInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openManifest, setOpenManifest] = useState(false);

  const daprUIUrl = useDaprUI();
  const title = daprUIUrl ? (
    <>
      {`Dapr Application Instance: `}
      <Link to={`${daprUIUrl}/${applicationId}`}>{`${applicationId}`}</Link>
    </>
  ) : (
    `Dapr Application Instance: ${applicationId}`
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DaprAPI.getApplicationInstance(applicationId);

        if (!response) {
          throw new Error(`Wrong application id`);
        }

        // Crear el JSX para el manifiesto, que incluye el botón
        response.manifest = (
          <>
            <Button color="primary" onClick={() => setOpenManifest(true)}>
              Show Manifest
            </Button>

            {/* Popup que muestra el manifiesto completo */}
            <Dialog open={openManifest} onClose={() => setOpenManifest(false)}>
              <DialogTitle>Manifest</DialogTitle>
              <DialogContent>
                <pre>{response.manifest}</pre>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenManifest(false)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );

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
  }, [openManifest, DaprAPI, applicationId]);

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
    <InfoCard title={title}>
      <Box position="relative">
        <StructuredMetadataTable metadata={data} />
      </Box>
    </InfoCard>
  );
};

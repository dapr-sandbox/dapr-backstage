import { useEffect, useState } from 'react';
import { EmptyState, Link, Table } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { Typography } from '@material-ui/core';
import { columns, useStyles } from './tableHeading';
import { daprApiRef } from '../../api';
import { MetadataActors } from '../../types';
import { useDaprApplicationId } from '../../utils/isDaprAvailable';
import { useDaprUI } from '../../utils/isDaprUiConfigured';

export const ApplicationActorsCard = () => {
  const applicationId = useDaprApplicationId();
  const DaprAPI = useApi(daprApiRef);
  const [data, setData] = useState<MetadataActors[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const classes = useStyles();

  const daprUIUrl = useDaprUI();
  const title = daprUIUrl ? (
    <>
      {`Dapr actors: `}
      <Link to={`${daprUIUrl}/${applicationId}`}>{`${applicationId}`}</Link>
    </>
  ) : (
    `Dapr actors: ${applicationId}`
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DaprAPI.getApplicationMetadata(applicationId);

        if (!response) {
          throw new Error(`Wrong application id`);
        }

        setData(response.actors);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [applicationId, DaprAPI]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error || !data) {
    return (
      <Table
        options={{
          paging: false,
        }}
        data={[]}
        columns={columns}
        emptyContent={
          <div className={classes.empty}>
            <EmptyState
              missing="data"
              title="No data to show"
              description="Check if the application_id is correct or if there is any connectivity issue with the Dapr API"
            />
            ;
          </div>
        }
        title={title}
      />
    );
  }

  return (
    <Table
      title={title}
      options={{ sorting: true, paging: true, padding: 'dense' }}
      data={data}
      columns={columns}
    />
  );
};

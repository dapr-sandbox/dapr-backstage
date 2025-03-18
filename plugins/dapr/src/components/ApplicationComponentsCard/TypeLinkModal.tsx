import { useApi } from '@backstage/core-plugin-api';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import { daprApiRef } from '../../api';
import { ComponentDetails } from '../../types';
import { getIcon } from '../icons/services';
import { CopyButton } from '../shared-components/CopyButton';
import { DisplayItem } from '../shared-components/DisplayItem';

export const TypeLinkModal = ({
  type,
  componentName,
  hasCapabilities,
}: {
  type: string;
  componentName: string;
  hasCapabilities: boolean;
}) => {
  const DaprAPI = useApi(daprApiRef);
  const [data, setData] = useState<ComponentDetails>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await DaprAPI.getAppComponent(componentName);
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
  const onClick = () => {
    setOpen(true);
    fetchData();
  };

  if (!hasCapabilities) return type;

  const { spec } = data?.manifest ?? {};
  const TitleIcon = getIcon(spec?.type.split('.')[1] ?? '');

  return (
    <>
      <Link
        component="button"
        style={{ fontSize: '0.875rem', fontWeight: 'bold' }}
        onClick={onClick}
      >
        {type}
      </Link>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        style={{ minWidth: '44rem' }}
      >
        <DialogTitle>
          <Box
            style={{ display: 'flex', alignItems: 'center', gridGap: '1rem' }}
          >
            <Box
              style={{
                width: '3rem',
                height: '3rem',
                background: '#fff',
                padding: '0.5rem  ',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {TitleIcon && (
                <TitleIcon styles={{ width: '2rem', height: '2rem' }} />
              )}
            </Box>
            <span>{data?.name}</span>
          </Box>
        </DialogTitle>
        <DialogContent>
          {error && <p>{error}</p>}
          {loading && <p>Loading...</p>}
          {data && !loading && !error && (
            <Box>
              <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <DisplayItem label="Type" style={{ fontSize: '1rem' }}>
                  {spec?.type}
                </DisplayItem>
                <DisplayItem label="Version" style={{ fontSize: '1rem' }}>
                  {spec?.version}
                </DisplayItem>
              </Box>
              <DisplayItem
                label="Metadata"
                style={{ marginTop: '1rem', fontSize: '1rem' }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ minWidth: '6rem', fontWeight: 'bold' }}
                      >
                        Name
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {spec?.metadata?.map(item => (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {item.value ? (
                            <Box
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                justifyContent: 'space-between',
                              }}
                            >
                              {item.value}
                              <CopyButton text={item.value} />
                            </Box>
                          ) : (
                            '—'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DisplayItem>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

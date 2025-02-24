import { TableColumn } from '@backstage/core-components/index';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { Component } from '../../types';

export const columns: TableColumn<Component>[] = [
  {
    title: 'Name',
    field: 'name',
    type: 'string',
    highlight: true,
  },
  {
    title: 'Type',
    field: 'type',
    type: 'string',
    highlight: true,
  },
  {
    title: 'Version',
    field: 'version',
    type: 'string',
    highlight: true,
  },
  {
    title: 'Capabilities',
    field: 'capabilities',
    render: (row: Component) => (
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {row.capabilities?.join('\n') ?? 'No capabilities defined'}
      </span>
    ),
    highlight: true,
  },
];

export const useStyles = makeStyles(theme => ({
  empty: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

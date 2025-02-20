import { TableColumn } from '@backstage/core-components/index';
import { Subscription } from '../../types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

export const columns: TableColumn<Subscription>[] = [
  {
    title: 'PubSub Name',
    field: 'pubsubname',
    type: 'string',
    highlight: true,
  },
  {
    title: 'Topic',
    field: 'topic',
    type: 'string',
    highlight: true,
  },
  {
    title: 'Dead Letter Topic',
    field: 'deadLetterTopic',
    type: 'string',
    highlight: true,
  },
  {
    title: 'Metadata',
    field: 'metadata',
    type: 'string',
    highlight: true,
  },
  {
    title: 'Rules',
    field: 'rules',
    render: (row: Subscription) => (
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {row.rules.map(rule => rule.path).join('\n')}
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

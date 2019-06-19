// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import Typography from '@material-ui/core/Typography';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import { BreakerList } from './List';
import { useStore } from '../../hooks';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  },
  configuredBreakers: {

  },
  unconfiguredBreakers: {
    marginTop: theme.spacing(2),
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type ConfiguredBreakersCardProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ConfiguredBreakersCard: React.FC<ConfiguredBreakersCardProps> = props => {
  const classes = useStyles();

  const configuredBreakers = useStore(state => state.breakers.List.filter(x => x.isConfigured));

  const unconfiguredBreakers = useStore(state => state.breakers.List.filter(x => !x.isConfigured));

  const Title = ({ title }: { title: string }) => <Typography variant='h3' align="left" > {title} </Typography>

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          {configuredBreakers.length === 0 && unconfiguredBreakers.length === 0 ? <Title title="No Breakers Loaded..." /> : null}
          {configuredBreakers.length === 0 ? null :
            <div className={classes.configuredBreakers}>
              <Title title="Configured Breakers" />
              <BreakerList
                breakers={configuredBreakers}
              />
            </div>
          }

          {unconfiguredBreakers.length === 0 ? null :
            <div className={classes.unconfiguredBreakers}>
              <Title title="Unconfigured Breakers" />
              <BreakerList
                breakers={unconfiguredBreakers}
              />
            </div>
          }

        </CardContent>

      </Card>
    </div>
  );
};
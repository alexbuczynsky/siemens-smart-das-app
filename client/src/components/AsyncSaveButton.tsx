// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useEffect, useState } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import clsx from 'clsx';
import { Fab, CircularProgress } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: theme.palette.greens[500],
    '&:hover': {
      backgroundColor: theme.palette.greens[700],
    },
  },
  fabProgress: {
    color: theme.palette.greens[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: theme.palette.greens[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type AsyncSaveButtonProps = {
  disabled?: boolean;
  onClick: () => Promise<{
    isSuccess: boolean;
  }>;
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const AsyncSaveButton: React.FC<AsyncSaveButtonProps> = props => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  function handleButtonClick() {
    if (!loading) {
      props.onClick()
        .then(response => {
          if (response.isSuccess) {
            setSuccess(true);
          }
        })
        .catch(err => {
          setSuccess(false);
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => setSuccess(false), 5000)
        });
      setSuccess(false);
      setLoading(true);
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="Save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
          disabled={props.disabled}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
    </div>
  );
};
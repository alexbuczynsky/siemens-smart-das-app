import { makeStyles } from '@smartgear/edison';

export const useNotificationStyles = makeStyles(theme => {
  const dropShadow = theme.shadows[5];

  const edgeAccentWidth = 10;

  const edgeAccent = (color: string) => {

    return `inset ${edgeAccentWidth}px 0px ${color}, ${dropShadow}`;
  };

  const colorLevels = {
    error: theme.palette.error.dark,
    warning: theme.palette.warning.dark,
    info: theme.palette.primary.light,
    success: theme.palette.success.dark,
    debug: theme.palette.primary.light,
  };

  return {
    root: {
      maxWidth: '100%',
    },
    notificationWrapper: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      boxShadow: dropShadow,
      paddingLeft: edgeAccentWidth + 10,
    },
    notificationWrapperError: {
      boxShadow: edgeAccent(colorLevels.error),
    },
    notificationWrapperInfo: {
      boxShadow: edgeAccent(colorLevels.info),
    },
    notificationWrapperSuccess: {
      boxShadow: edgeAccent(colorLevels.success),
    },
    notificationWrapperDebug: {
      boxShadow: edgeAccent(colorLevels.debug),
    },
    notificationWrapperWarning: {
      boxShadow: edgeAccent(colorLevels.warning),
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    errorIcon: {
      color: colorLevels.error,
    },
    warningIcon: {
      color: colorLevels.warning,
    },
    debugIcon: {
      color: colorLevels.debug,
    },
    infoIcon: {
      color: colorLevels.info,
    },
    successIcon: {
      color: colorLevels.success,
    },
    container: {
      width: theme.spacing(30),
    },
    title: {
      display: 'flex',
      alignItems: 'center',
    },
    message: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      maxHeight: theme.spacing(10),
    },
    actions: {
      height: theme.spacing(4),
    },
  };
});

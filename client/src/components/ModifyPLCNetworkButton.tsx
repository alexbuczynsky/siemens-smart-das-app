// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useEffect, useState } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { IPAddressInputField } from './IPAddressInputField';
import { AsyncSaveButton } from './AsyncSaveButton';
import { SmartDASClientService } from '../services/configured-services';
import { StoreActions } from '../store';
import { useStore } from '../hooks';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type ModifyPLCNetworkButtonProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ModifyPLCNetworkButton: React.FC<ModifyPLCNetworkButtonProps> = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [ip, setIP] = useState('0.0.0.0');
  const [subnet, setSubnet] = useState('0.0.0.0');
  const [gateway, setGateway] = useState('0.0.0.0');

  const PLCIsConnected = useStore(state => state.breakers.isPLCConnected);

  const [isValid, setIsValid] = React.useState({
    ip: true,
    subnet: true,
    gateway: true,
  });

  useEffect(() => {
    getNetworkConfig();
  }, [])




  function getNetworkConfig() {
    return SmartDASClientService
      .getPLCNetworkConfig()
      .then(networkConfig => {
        setIP(`${networkConfig.newIP1}.${networkConfig.newIP2}.${networkConfig.newIP3}.${networkConfig.newIP4}`);
        setSubnet(`${networkConfig.newSubnet1}.${networkConfig.newSubnet2}.${networkConfig.newSubnet3}.${networkConfig.newSubnet4}`);
        setGateway(`${networkConfig.newGateway1}.${networkConfig.newGateway2}.${networkConfig.newGateway3}.${networkConfig.newGateway4}`);
      })
  }

  function handleClickOpen() {
    getNetworkConfig();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleSave() {
    try {
      const byteArrays = {
        ip: ip.split('.').map(x => parseInt(x, 10)),
        subnet: subnet.split('.').map(x => parseInt(x, 10)),
        gateway: gateway.split('.').map(x => parseInt(x, 10))
      }

      const config: SmartDAS.Models.PLCNetworkConfig = {
        newIP1: byteArrays.ip[0],
        newIP2: byteArrays.ip[1],
        newIP3: byteArrays.ip[2],
        newIP4: byteArrays.ip[3],
        newSubnet1: byteArrays.subnet[0],
        newSubnet2: byteArrays.subnet[1],
        newSubnet3: byteArrays.subnet[2],
        newSubnet4: byteArrays.subnet[3],
        newGateway1: byteArrays.gateway[0],
        newGateway2: byteArrays.gateway[1],
        newGateway3: byteArrays.gateway[2],
        newGateway4: byteArrays.gateway[3],
      }
      // const 
      await SmartDASClientService.setPLCNetworkConfig(config);
      getNetworkConfig();
    } catch (err) {
      StoreActions.Notifications.publishError({
        title: `Failed Updating PLC Network Configuration`,
        message: err.message,
      })

      return {
        isSuccess: false
      }
    }
    // for (let breaker of breakers) {
    //   try {

    //     breaker.ipAddress = ip;
    //     const payload = await SmartDASClientService.updateBreakerConfigByIndex(breaker.id, breaker);
    //     breaker = new BreakerSetupObject(breaker.id, payload);
    //     StoreActions.Breakers.updateOne(breaker);

    //   } catch (err) {

    //     StoreActions.Notifications.publishError({
    //       title: `Breaker ${breaker.id} Failed Updating...`,
    //       message: err.message,
    //     })

    //     return {
    //       isSuccess: false
    //     }
    //   }
    // }

    return {
      isSuccess: true
    }
  }

  return (
    <div>
      <Button disabled={!PLCIsConnected} variant="outlined" color="primary" onClick={handleClickOpen}>
        Change PLC Network Settings
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modify PLC Network Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Set PLC network configuration below.
          </DialogContentText>
          <IPAddressInputField label="IP Address" value={ip} onChange={(value, valid) => {
            setIP(value);
            setIsValid({
              ...isValid,
              ip: valid,
            });
          }} />

          <IPAddressInputField label="Subnet Mask" value={subnet} onChange={(value, valid) => {
            setSubnet(value);
            setIsValid({
              ...isValid,
              subnet: valid,
            });
          }} />
          <IPAddressInputField label="Gateway" value={gateway} onChange={(value, valid) => {
            setGateway(value);
            setIsValid({
              ...isValid,
              gateway: valid,
            });
          }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <AsyncSaveButton disabled={!(isValid.gateway && isValid.subnet && isValid.ip)} onClick={handleSave} />
        </DialogActions>
      </Dialog>
    </div>
  )
};
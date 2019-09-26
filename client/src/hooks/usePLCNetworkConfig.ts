import { Dispatch, useEffect, useState } from "react";
import { SmartDASClientService } from "../services/configured-services";
import useStore from "./useStore";

export function usePLCNetworkConfig() {
  const PLCIsConnected = useStore(state => state.breakers.isPLCConnected);

  const [netConfig, setNetConfig] = useState<SmartDAS.Models.PLCNetworkConfig>({
    newIP1: 0,
    newIP2: 0,
    newIP3: 0,
    newIP4: 0,
    newSubnet1: 0,
    newSubnet2: 0,
    newSubnet3: 0,
    newSubnet4: 0,
    newGateway1: 0,
    newGateway2: 0,
    newGateway3: 0,
    newGateway4: 0,
  })

  function getNetworkConfig() {
    return SmartDASClientService
      .getPLCNetworkConfig()
      .then(networkConfig => {
        setNetConfig(networkConfig);
      })
      .catch(console.error)
  }

  useEffect(() => {
    if (PLCIsConnected) {
      getNetworkConfig();
    }
  }, [PLCIsConnected])

  const saveNetConfig: Dispatch<SmartDAS.Models.PLCNetworkConfig> = (newConfig) => {
    SmartDASClientService
      .setPLCNetworkConfig(newConfig)
      .catch(console.error)
  }

  return [netConfig, saveNetConfig] as const;
}
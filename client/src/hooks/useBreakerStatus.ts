import { useEffect, useState } from "react";
import { useStore } from "./useStore";

type IBreakerStatus = {
  breakerId: number;
  isDASEnabled: boolean;
  isCOMAlarmActive: boolean;
  activateCommandState: boolean;
}


export function useBreakerStatuses(): IBreakerStatus[] {
  const breakers = useStore(state => state.breakers.List);
  const dasStatuses = useStore(state => state.breakers.DAS.status);
  const alarms = useStore(state => state.breakers.alarms);
  const activateCommands = useStore(state => state.breakers.DAS.activateCommands)

  function getBreakerState(id: number): IBreakerStatus {
    const status = {
      breakerId: id,
      isDASEnabled: false,
      isCOMAlarmActive: false,
      activateCommandState: false,
    };

    switch (id) {
      case 1:
        status.isDASEnabled = dasStatuses.dasStatusBreaker1;
        status.isCOMAlarmActive = alarms.comAlarmBreaker1;
        status.activateCommandState = activateCommands.dasActivateBreaker1;
        break;
      case 2:
        status.isDASEnabled = dasStatuses.dasStatusBreaker2;
        status.isCOMAlarmActive = alarms.comAlarmBreaker2;
        status.activateCommandState = activateCommands.dasActivateBreaker2;
        break;
      case 3:
        status.isDASEnabled = dasStatuses.dasStatusBreaker3;
        status.isCOMAlarmActive = alarms.comAlarmBreaker3;
        status.activateCommandState = activateCommands.dasActivateBreaker3;
        break;
      case 4:
        status.isDASEnabled = dasStatuses.dasStatusBreaker4;
        status.isCOMAlarmActive = alarms.comAlarmBreaker4;
        status.activateCommandState = activateCommands.dasActivateBreaker4;
        break;
      case 5:
        status.isDASEnabled = dasStatuses.dasStatusBreaker5;
        status.isCOMAlarmActive = alarms.comAlarmBreaker5;
        status.activateCommandState = activateCommands.dasActivateBreaker5;
        break;
      case 6:
        status.isDASEnabled = dasStatuses.dasStatusBreaker6;
        status.isCOMAlarmActive = alarms.comAlarmBreaker6;
        status.activateCommandState = activateCommands.dasActivateBreaker6;
        break;
      case 7:
        status.isDASEnabled = dasStatuses.dasStatusBreaker7;
        status.isCOMAlarmActive = alarms.comAlarmBreaker7;
        status.activateCommandState = activateCommands.dasActivateBreaker7;
        break;
      case 8:
        status.isDASEnabled = dasStatuses.dasStatusBreaker8;
        status.isCOMAlarmActive = alarms.comAlarmBreaker8;
        status.activateCommandState = activateCommands.dasActivateBreaker8;
        break;
      case 9:
        status.isDASEnabled = dasStatuses.dasStatusBreaker9;
        status.isCOMAlarmActive = alarms.comAlarmBreaker9;
        status.activateCommandState = activateCommands.dasActivateBreaker9;
        break;
    }

    return status;
  }

  const mapBreakersToStates = () => breakers.map(x => getBreakerState(x.id));


  const [breakerStates, setBreakerStates] = useState(mapBreakersToStates());


  useEffect(() => {
    setBreakerStates(mapBreakersToStates());
  }, [dasStatuses, alarms, activateCommands, breakers])

  return breakerStates;


}
import { SmartDASClient } from "./SmartDASClient/API";
import Store, { StoreActions } from "../store";
import { AxiosError } from "axios";

export const SmartDASClientService = new SmartDASClient(36666);

SmartDASClientService.client.interceptors.response.use(
  response => {
    // set PLC connection status to true
    StoreActions.Breakers.setPLCConnectionStatus(true);
    // return response
    return response;
  },
  (error: AxiosError) => {
    const isConnected = Store.getState().breakers.isPLCConnected;

    if (error.isAxiosError) {
      if (error.response && error.response.status === 500) {
        const errorBody = error.response.data as SmartDAS.Models.Error;

        const returnError = new Error(`Server Error! Message:${errorBody.Message}\nSource: ${errorBody.Source}\nStackTrace: ${errorBody.StackTraceString}`);
        if (isConnected === false) {
          return Promise.reject(returnError)
        }


        if (errorBody.Message.includes('CANNOT READ FROM')) {
          StoreActions.Notifications.publishError({
            message: errorBody.Message,
            title: 'PLC Not Connected',
          })
          StoreActions.Breakers.setPLCConnectionStatus(false);
          return Promise.reject(returnError)
        }

        StoreActions.Notifications.publishError({
          message: errorBody.Message,
          title: 'Internal Server Error',
        })

        return Promise.reject(returnError)
      }
    }

    if (error.message.includes('Network Error')) {
      if (isConnected) {
        StoreActions.Notifications.publishError({
          message: error.message,
          title: 'Communication Error',
        })
        StoreActions.Breakers.setPLCConnectionStatus(false);
      }
      return Promise.reject(error);
    }

    StoreActions.Notifications.publishError({
      message: error.message,
      title: 'Communication Error',
    })

    return Promise.reject(error);
  }
)
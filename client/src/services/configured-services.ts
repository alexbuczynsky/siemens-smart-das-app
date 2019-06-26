import { SmartDASClient } from "./SmartDASClient/API";
import Store, { StoreActions } from "../store";
import { AxiosError } from "axios";
import axiosRetry from "axios-retry";

export const SmartDASClientService = new SmartDASClient(36666);

// axiosRetry(SmartDASClientService.client, {
//   retries: 3,
//   retryDelay: retryCount => {
//     return 0;
//   }
// });

SmartDASClientService.client.interceptors.response.use(
  response => {
    StoreActions.setBackendConnectionStatus(true);
    // return response
    return response;
  },
  (error: AxiosError) => {
    const isPLCConnected = Store.getState().breakers.isPLCConnected;

    if (error.isAxiosError) {
      if (error.response && error.response.status === 500) {
        const errorBody = error.response.data as SmartDAS.Models.Error;

        const returnError = new Error(
          `Server Error! Message:${errorBody.Message}\nSource: ${
            errorBody.Source
          }`
        );

        if (isPLCConnected === true) {
          StoreActions.Notifications.publishError({
            message: errorBody.Message,
            title: "Internal Server Error"
          });
        }

        return Promise.reject(returnError);
      }
    }

    const isBackendConnected = Store.getState().breakers.isBackendAPIConnected;

    if (error.message.includes("Network Error")) {
      if (isBackendConnected) {
        StoreActions.Notifications.publishError({
          message: error.message,
          title: "Gateway offline"
        });
        StoreActions.setBackendConnectionStatus(false);
        StoreActions.Breakers.setPLCConnectionStatus(false);
      }
      return Promise.reject(error);
    }

    if (isPLCConnected === true) {
      StoreActions.Notifications.publishError({
        message: error.message,
        title: "Communication Error"
      });
    }

    return Promise.reject(error);
  }
);

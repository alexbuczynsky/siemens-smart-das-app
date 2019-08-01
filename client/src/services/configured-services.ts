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

enum ErrorCode {
  errTCPSocketCreation = 0x00000001,
  errTCPConnectionTimeout = 0x00000002,
  errTCPConnectionFailed = 0x00000003,
  errTCPReceiveTimeout = 0x00000004,
  errTCPDataReceive = 0x00000005,
  errTCPSendTimeout = 0x00000006,
  errTCPDataSend = 0x00000007,
  errTCPConnectionReset = 0x00000008,
  errTCPNotConnected = 0x00000009,
  errTCPUnreachableHost = 0x00002751,
  errIsoConnect = 0x00010000, // Connection error
  errIsoInvalidPDU = 0x00030000, // Bad format
  errIsoInvalidDataSize = 0x00040000, // Bad Datasize passed to send/recv : buffer is invalid
  errCliNegotiatingPDU = 0x00100000,
  errCliInvalidParams = 0x00200000,
  errCliJobPending = 0x00300000,
  errCliTooManyItems = 0x00400000,
  errCliInvalidWordLen = 0x00500000,
  errCliPartialDataWritten = 0x00600000,
  errCliSizeOverPDU = 0x00700000,
  errCliInvalidPlcAnswer = 0x00800000,
  errCliAddressOutOfRange = 0x00900000,
  errCliInvalidTransportSize = 0x00A00000,
  errCliWriteDataSizeMismatch = 0x00B00000,
  errCliItemNotAvailable = 0x00C00000,
  errCliInvalidValue = 0x00D00000,
  errCliCannotStartPLC = 0x00E00000,
  errCliAlreadyRun = 0x00F00000,
  errCliCannotStopPLC = 0x01000000,
  errCliCannotCopyRamToRom = 0x01100000,
  errCliCannotCompress = 0x01200000,
  errCliAlreadyStop = 0x01300000,
  errCliFunNotAvailable = 0x01400000,
  errCliUploadSequenceFailed = 0x01500000,
  errCliInvalidDataSizeRecvd = 0x01600000,
  errCliInvalidBlockType = 0x01700000,
  errCliInvalidBlockNumber = 0x01800000,
  errCliInvalidBlockSize = 0x01900000,
  errCliNeedPassword = 0x01D00000,
  errCliInvalidPassword = 0x01E00000,
  errCliNoPasswordToSetOrClear = 0x01F00000,
  errCliJobTimeout = 0x02000000,
  errCliPartialDataRead = 0x02100000,
  errCliBufferTooSmall = 0x02200000,
  errCliFunctionRefused = 0x02300000,
  errCliDestroying = 0x02400000,
  errCliInvalidParamNumber = 0x02500000,
  errCliCannotChangeParam = 0x02600000,
  errCliFunctionNotImplemented = 0x02700000,
}

const ErrorCodeText = {
  0: "OK",
  [ErrorCode.errTCPSocketCreation]: "SYS : Error creating the Socket",
  [ErrorCode.errTCPConnectionTimeout]: "TCP : Connection Timeout",
  [ErrorCode.errTCPConnectionFailed]: "TCP : Connection Error",
  [ErrorCode.errTCPReceiveTimeout]: "TCP : Data receive Timeout",
  [ErrorCode.errTCPDataReceive]: "TCP : Error receiving Data",
  [ErrorCode.errTCPSendTimeout]: "TCP : Data send Timeout",
  [ErrorCode.errTCPDataSend]: "TCP : Error sending Data",
  [ErrorCode.errTCPConnectionReset]: "TCP : Connection reset by the Peer",
  [ErrorCode.errTCPNotConnected]: "CLI : Client not connected",
  [ErrorCode.errTCPUnreachableHost]: "TCP : Unreachable host",
  [ErrorCode.errIsoConnect]: "ISO : Connection Error",
  [ErrorCode.errIsoInvalidPDU]: "ISO : Invalid PDU received",
  [ErrorCode.errIsoInvalidDataSize]: "ISO : Invalid Buffer passed to Send/Receive",
  [ErrorCode.errCliNegotiatingPDU]: "CLI : Error in PDU negotiation",
  [ErrorCode.errCliInvalidParams]: "CLI : invalid param(s) supplied",
  [ErrorCode.errCliJobPending]: "CLI : Job pending",
  [ErrorCode.errCliTooManyItems]: "CLI : too may items (>20) in multi read/write",
  [ErrorCode.errCliInvalidWordLen]: "CLI : invalid WordLength",
  [ErrorCode.errCliPartialDataWritten]: "CLI : Partial data written",
  [ErrorCode.errCliSizeOverPDU]: "CPU : total data exceeds the PDU size",
  [ErrorCode.errCliInvalidPlcAnswer]: "CLI : invalid CPU answer",
  [ErrorCode.errCliAddressOutOfRange]: "CPU : Address out of range",
  [ErrorCode.errCliInvalidTransportSize]: "CPU : Invalid Transport size",
  [ErrorCode.errCliWriteDataSizeMismatch]: "CPU : Data size mismatch",
  [ErrorCode.errCliItemNotAvailable]: "CPU : Item not available",
  [ErrorCode.errCliInvalidValue]: "CPU : Invalid value supplied",
  [ErrorCode.errCliCannotStartPLC]: "CPU : Cannot start PLC",
  [ErrorCode.errCliAlreadyRun]: "CPU : PLC already RUN",
  [ErrorCode.errCliCannotStopPLC]: "CPU : Cannot stop PLC",
  [ErrorCode.errCliCannotCopyRamToRom]: "CPU : Cannot copy RAM to ROM",
  [ErrorCode.errCliCannotCompress]: "CPU : Cannot compress",
  [ErrorCode.errCliAlreadyStop]: "CPU : PLC already STOP",
  [ErrorCode.errCliFunNotAvailable]: "CPU : Function not available",
  [ErrorCode.errCliUploadSequenceFailed]: "CPU : Upload sequence failed",
  [ErrorCode.errCliInvalidDataSizeRecvd]: "CLI : Invalid data size received",
  [ErrorCode.errCliInvalidBlockType]: "CLI : Invalid block type",
  [ErrorCode.errCliInvalidBlockNumber]: "CLI : Invalid block number",
  [ErrorCode.errCliInvalidBlockSize]: "CLI : Invalid block size",
  [ErrorCode.errCliNeedPassword]: "CPU : Function not authorized for current protection level",
  [ErrorCode.errCliInvalidPassword]: "CPU : Invalid password",
  [ErrorCode.errCliNoPasswordToSetOrClear]: "CPU : No password to set or clear",
  [ErrorCode.errCliJobTimeout]: "CLI : Job Timeout",
  [ErrorCode.errCliFunctionRefused]: "CLI : function refused by CPU (Unknown error)",
  [ErrorCode.errCliPartialDataRead]: "CLI : Partial data read",
  [ErrorCode.errCliBufferTooSmall]: "CLI : The buffer supplied is too small to accomplish the operation",
  [ErrorCode.errCliDestroying]: "CLI : Cannot perform (destroying)",
  [ErrorCode.errCliInvalidParamNumber]: "CLI : Invalid Param Number",
  [ErrorCode.errCliCannotChangeParam]: "CLI : Cannot change this param now",
  [ErrorCode.errCliFunctionNotImplemented]: "CLI : Function not implemented",
}

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
          let message = errorBody.Message;
          if (errorBody.Message && errorBody.Message.includes('CODE:')) {
            const A = errorBody.Message.split("CODE:");

            const errorCode = Number(A[A.length - 1]) as ErrorCode;

            const errorCodeText = ErrorCodeText[errorCode];
            if (errorCodeText) {
              message += `[${errorCodeText}]`
            }
          }

          StoreActions.Notifications.publishError({
            message: message,
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

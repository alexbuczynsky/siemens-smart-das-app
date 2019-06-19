declare namespace SmartDAS.Models {
  export interface SiteSetupStructure {
    breaker1IP1: number;
    breaker1IP2: number;
    breaker1IP3: number;
    breaker1IP4: number;
    breaker1SlaveID: number;
    breaker1Type: BreakerType;
    breaker1AssociatedOutput: number;
    breaker1AssociatedInput: number;
    breaker2IP1: number;
    breaker2IP2: number;
    breaker2IP3: number;
    breaker2IP4: number;
    breaker2SlaveID: number;
    breaker2Type: BreakerType;
    breaker2AssociatedOutput: number;
    breaker2AssociatedInput: number;
    breaker3IP1: number;
    breaker3IP2: number;
    breaker3IP3: number;
    breaker3IP4: number;
    breaker3SlaveID: number;
    breaker3Type: BreakerType;
    breaker3AssociatedOutput: number;
    breaker3AssociatedInput: number;
    breaker4IP1: number;
    breaker4IP2: number;
    breaker4IP3: number;
    breaker4IP4: number;
    breaker4SlaveID: number;
    breaker4Type: BreakerType;
    breaker4AssociatedOutput: number;
    breaker4AssociatedInput: number;
    breaker5IP1: number;
    breaker5IP2: number;
    breaker5IP3: number;
    breaker5IP4: number;
    breaker5SlaveID: number;
    breaker5Type: BreakerType;
    breaker5AssociatedOutput: number;
    breaker5AssociatedInput: number;
    breaker6IP1: number;
    breaker6IP2: number;
    breaker6IP3: number;
    breaker6IP4: number;
    breaker6SlaveID: number;
    breaker6Type: BreakerType;
    breaker6AssociatedOutput: number;
    breaker6AssociatedInput: number;
    breaker7IP1: number;
    breaker7IP2: number;
    breaker7IP3: number;
    breaker7IP4: number;
    breaker7SlaveID: number;
    breaker7Type: BreakerType;
    breaker7AssociatedOutput: number;
    breaker7AssociatedInput: number;
    breaker8IP1: number;
    breaker8IP2: number;
    breaker8IP3: number;
    breaker8IP4: number;
    breaker8SlaveID: number;
    breaker8Type: BreakerType;
    breaker8AssociatedOutput: number;
    breaker8AssociatedInput: number;
    breaker9IP1: number;
    breaker9IP2: number;
    breaker9IP3: number;
    breaker9IP4: number;
    breaker9SlaveID: number;
    breaker9Type: BreakerType;
    breaker9AssociatedOutput: number;
    breaker9AssociatedInput: number;
    switchType: SiteSwitchType;
  }

  export enum BreakerType {
    UNDEFINED = 0,
    WL_BREAKER = 1,
    VL_BREAKER = 2,
    VA_BREAKER = 3,
  }

  export enum SiteSwitchType {
    Toggle,
    Push,
  }

  export interface BreakerSetupObject {
    breakerIP1: number;
    breakerIP2: number;
    breakerIP3: number;
    breakerIP4: number;
    breakerSlaveId: number;
    type: BreakerType;
    associatedInput: number;
    associatedOutput: number;
  }

  export interface PLCConfig {
    ip: string;
  }

  export interface Error {
    Message: string;
    ClassName: string;
    StackTraceString: string;
    /**
     * @example "BreakerConfigAPI"
     *
     * @type {string}
     * @memberof Error
     */
    Source: string;
  }

  export interface DASStatusPayload {
    dasStatusBreaker1: boolean,
    dasStatusBreaker2: boolean,
    dasStatusBreaker3: boolean,
    dasStatusBreaker4: boolean,
    dasStatusBreaker5: boolean,
    dasStatusBreaker6: boolean,
    dasStatusBreaker7: boolean,
    dasStatusBreaker8: boolean,
    dasStatusBreaker9: boolean,
  }

  export interface DASActivatePayload {
    dasActivateBreaker1: boolean,
    dasActivateBreaker2: boolean,
    dasActivateBreaker3: boolean,
    dasActivateBreaker4: boolean,
    dasActivateBreaker5: boolean,
    dasActivateBreaker6: boolean,
    dasActivateBreaker7: boolean,
    dasActivateBreaker8: boolean,
    dasActivateBreaker9: boolean,
  }

  export interface BreakerAlarmPayload {
    comAlarmBreaker1: boolean,
    comAlarmBreaker2: boolean,
    comAlarmBreaker3: boolean,
    comAlarmBreaker4: boolean,
    comAlarmBreaker5: boolean,
    comAlarmBreaker6: boolean,
    comAlarmBreaker7: boolean,
    comAlarmBreaker8: boolean,
    comAlarmBreaker9: boolean,
  }

  export interface PLCNetworkConfig {
    newIP1: number,
    newIP2: number,
    newIP3: number,
    newIP4: number,
    newSubnet1: number,
    newSubnet2: number,
    newSubnet3: number,
    newSubnet4: number,
    newGateway1: number,
    newGateway2: number,
    newGateway3: number,
    newGateway4: number,
  }

  export interface PLCConnectionStatusPayload<T = SNAP7.ErrorCode | SNAP7.SuccessCode> {
    code: T;
    message: SNAP7.ErrorText[T];
  }


}

declare namespace SNAP7 {
  export type SuccessCode = 0;

  export enum ErrorCode {
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

  export interface ErrorText {
    0: "OK";
    [ErrorCode.errTCPSocketCreation]: "SYS : Error creating the Socket";
    [ErrorCode.errTCPConnectionTimeout]: "TCP : Connection Timeout";
    [ErrorCode.errTCPConnectionFailed]: "TCP : Connection Error";
    [ErrorCode.errTCPReceiveTimeout]: "TCP : Data receive Timeout";
    [ErrorCode.errTCPDataReceive]: "TCP : Error receiving Data";
    [ErrorCode.errTCPSendTimeout]: "TCP : Data send Timeout";
    [ErrorCode.errTCPDataSend]: "TCP : Error sending Data";
    [ErrorCode.errTCPConnectionReset]: "TCP : Connection reset by the Peer";
    [ErrorCode.errTCPNotConnected]: "CLI : Client not connected";
    [ErrorCode.errTCPUnreachableHost]: "TCP : Unreachable host";
    [ErrorCode.errIsoConnect]: "ISO : Connection Error";
    [ErrorCode.errIsoInvalidPDU]: "ISO : Invalid PDU received";
    [ErrorCode.errIsoInvalidDataSize]: "ISO : Invalid Buffer passed to Send/Receive";
    [ErrorCode.errCliNegotiatingPDU]: "CLI : Error in PDU negotiation";
    [ErrorCode.errCliInvalidParams]: "CLI : invalid param(s) supplied";
    [ErrorCode.errCliJobPending]: "CLI : Job pending";
    [ErrorCode.errCliTooManyItems]: "CLI : too may items (>20) in multi read/write";
    [ErrorCode.errCliInvalidWordLen]: "CLI : invalid WordLength";
    [ErrorCode.errCliPartialDataWritten]: "CLI : Partial data written";
    [ErrorCode.errCliSizeOverPDU]: "CPU : total data exceeds the PDU size";
    [ErrorCode.errCliInvalidPlcAnswer]: "CLI : invalid CPU answer";
    [ErrorCode.errCliAddressOutOfRange]: "CPU : Address out of range";
    [ErrorCode.errCliInvalidTransportSize]: "CPU : Invalid Transport size";
    [ErrorCode.errCliWriteDataSizeMismatch]: "CPU : Data size mismatch";
    [ErrorCode.errCliItemNotAvailable]: "CPU : Item not available";
    [ErrorCode.errCliInvalidValue]: "CPU : Invalid value supplied";
    [ErrorCode.errCliCannotStartPLC]: "CPU : Cannot start PLC";
    [ErrorCode.errCliAlreadyRun]: "CPU : PLC already RUN";
    [ErrorCode.errCliCannotStopPLC]: "CPU : Cannot stop PLC";
    [ErrorCode.errCliCannotCopyRamToRom]: "CPU : Cannot copy RAM to ROM";
    [ErrorCode.errCliCannotCompress]: "CPU : Cannot compress";
    [ErrorCode.errCliAlreadyStop]: "CPU : PLC already STOP";
    [ErrorCode.errCliFunNotAvailable]: "CPU : Function not available";
    [ErrorCode.errCliUploadSequenceFailed]: "CPU : Upload sequence failed";
    [ErrorCode.errCliInvalidDataSizeRecvd]: "CLI : Invalid data size received";
    [ErrorCode.errCliInvalidBlockType]: "CLI : Invalid block type";
    [ErrorCode.errCliInvalidBlockNumber]: "CLI : Invalid block number";
    [ErrorCode.errCliInvalidBlockSize]: "CLI : Invalid block size";
    [ErrorCode.errCliNeedPassword]: "CPU : Function not authorized for current protection level";
    [ErrorCode.errCliInvalidPassword]: "CPU : Invalid password";
    [ErrorCode.errCliNoPasswordToSetOrClear]: "CPU : No password to set or clear";
    [ErrorCode.errCliJobTimeout]: "CLI : Job Timeout";
    [ErrorCode.errCliFunctionRefused]: "CLI : function refused by CPU (Unknown error)";
    [ErrorCode.errCliPartialDataRead]: "CLI : Partial data read";
    [ErrorCode.errCliBufferTooSmall]: "CLI : The buffer supplied is too small to accomplish the operation";
    [ErrorCode.errCliDestroying]: "CLI : Cannot perform (destroying)";
    [ErrorCode.errCliInvalidParamNumber]: "CLI : Invalid Param Number";
    [ErrorCode.errCliCannotChangeParam]: "CLI : Cannot change this param now";
    [ErrorCode.errCliFunctionNotImplemented]: "CLI : Function not implemented";
  }
}
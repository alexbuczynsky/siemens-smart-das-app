# Breaker Config API Demo
- [Breaker Config API Demo](#Breaker-Config-API-Demo)
  - [Start](#Start)
  - [Testing / Demo](#Testing--Demo)
    - [Get Breaker All Breaker Configuration](#Get-Breaker-All-Breaker-Configuration)
    - [Get Breaker 1 Configuration](#Get-Breaker-1-Configuration)
    - [Update Breaker 1 Configuration](#Update-Breaker-1-Configuration)
    - [Update Breaker 1 Error Example](#Update-Breaker-1-Error-Example)
    - [Get DAS Status](#Get-DAS-Status)
    - [Read DAS Activate Commands](#Read-DAS-Activate-Commands)
    - [Write DAS Activate Commands](#Write-DAS-Activate-Commands)
    - [Read PLC Network configuration](#Read-PLC-Network-configuration)
    - [Write PLC Network Configuration](#Write-PLC-Network-Configuration)
    - [Read Breaker Alarms](#Read-Breaker-Alarms)
    - [Check PLC Connection Status](#Check-PLC-Connection-Status)
    - [Postman Link](#Postman-Link)

## Start

Navigate to the project folder and execute: 
```sh
> dotnet restore
> dotnet run
```

## Testing / Demo

### Get Breaker All Breaker Configuration

Open a web browser and go to `localhost:5000/api/breaker-config`

You should see the following response:

```json
[
    {
        "breakerIP1": 0,
        "breakerIP2": 0,
        "breakerIP3": 0,
        "breakerIP4": 0,
        "breakerSlaveId": 0,
        "type": 0,
        "associatedInput": 0,
        "associatedOutput": 0
    },
    {
        "breakerIP1": 0,
        "breakerIP2": 0,
        "breakerIP3": 0,
        "breakerIP4": 0,
        "breakerSlaveId": 0,
        "type": 0,
        "associatedInput": 0,
        "associatedOutput": 0
    },
    {
        "breakerIP1": 0,
        "breakerIP2": 0,
        "breakerIP3": 0,
        "breakerIP4": 0,
        "breakerSlaveId": 0,
        "type": 0,
        "associatedInput": 0,
        "associatedOutput": 0
    },
    {
        "breakerIP1": 0,
        "breakerIP2": 0,
        "breakerIP3": 0,
        "breakerIP4": 0,
        "breakerSlaveId": 0,
        "type": 0,
        "associatedInput": 0,
        "associatedOutput": 0
    },
    {
        "breakerIP1": 0,
        "breakerIP2": 0,
        "breakerIP3": 0,
        "breakerIP4": 0,
        "breakerSlaveId": 0,
        "type": 0,
        "associatedInput": 0,
        "associatedOutput": 0
    },
    {
        "breakerIP1": 0,
        "breakerIP2": 0,
        "breakerIP3": 0,
        "breakerIP4": 0,
        "breakerSlaveId": 0,
        "type": 0,
        "associatedInput": 0,
        "associatedOutput": 0
    },
    {
        "breakerIP1": 0,
        "breakerIP2": 0,
        "breakerIP3": 0,
        "breakerIP4": 0,
        "breakerSlaveId": 0,
        "type": 0,
        "associatedInput": 0,
        "associatedOutput": 0
    },
    {
        "breakerIP1": 0,
        "breakerIP2": 0,
        "breakerIP3": 0,
        "breakerIP4": 0,
        "breakerSlaveId": 0,
        "type": 0,
        "associatedInput": 0,
        "associatedOutput": 0
    },
    {
        "breakerIP1": 0,
        "breakerIP2": 0,
        "breakerIP3": 0,
        "breakerIP4": 0,
        "breakerSlaveId": 0,
        "type": 0,
        "associatedInput": 0,
        "associatedOutput": 0
    }
]
```

### Get Breaker 1 Configuration

Open a web browser and got to `localhost:5000/api/breaker-config/1`

You should see the following response:

```json
{
  "breakerIP1": 0,
  "breakerIP2": 0,
  "breakerIP3": 0,
  "breakerIP4": 0,
  "breakerSlaveId": 0,
  "type": 0,
  "associatedInput": 0,
  "associatedOutput": 0
}
```

### Update Breaker 1 Configuration

To set the value, send a PUT request to `localhost:5000/api/breaker-config/1`
with this example payload:

```json
{
  "breakerIP1": 192,
  "breakerIP2": 168,
  "breakerIP3": 1,
  "breakerIP4": 104,
  "breakerSlaveId": 5,
  "type": 1,
  "associatedInput": 1,
  "associatedOutput": 0
}
```

### Update Breaker 1 Error Example

For an example of an error message, send the following payload to `localhost:5000/api/breaker-config/1`

```json
{
        "breakerIP1": 258,
        "breakerIP2": 168,
        "breakerIP3": 1,
        "breakerIP4": 104,
        "breakerSlaveId": 5,
        "type": 1,
        "associatedInput": 1,
        "associatedOutput": 0
}
```

You should receive the following response since 258 is greater than 255:
```json
{
    "errors": {
        "breakerIP1": [
            "Error converting value 258 to type 'System.Byte'. Path 'breakerIP1', line 2, position 25."
        ]
    },
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "0HLNE1P01SRAJ:00000007"
}
```

### Get DAS Status

To get the current DAS status send a get request to `localhost:5000/api/das/status`

you should receive the following:
```json
{
    "dasStatusBreaker1": true,
    "dasStatusBreaker2": true,
    "dasStatusBreaker3": false,
    "dasStatusBreaker4": true,
    "dasStatusBreaker5": false,
    "dasStatusBreaker6": false,
    "dasStatusBreaker7": false,
    "dasStatusBreaker8": false,
    "dasStatusBreaker9": false,
}
```

### Read DAS Activate Commands

To get the current DAS command status, send a get request to `localhost:5000/api/das/commands`

you should receive the following:
```json
{
    "dasActivateBreaker1": true,
    "dasActivateBreaker2": true,
    "dasActivateBreaker3": false,
    "dasActivateBreaker4": true,
    "dasActivateBreaker5": false,
    "dasActivateBreaker6": false,
    "dasActivateBreaker7": false,
    "dasActivateBreaker8": false,
    "dasActivateBreaker9": false,
}
```

### Write DAS Activate Commands

Send the following payload as a put request to `localhost:5000/api/das/commands`
```json
{
    "dasActivateBreaker1": true,
    "dasActivateBreaker2": true,
    "dasActivateBreaker3": false,
    "dasActivateBreaker4": true,
    "dasActivateBreaker5": false,
    "dasActivateBreaker6": false,
    "dasActivateBreaker7": false,
    "dasActivateBreaker8": false,
    "dasActivateBreaker9": false,
}
```

you should receive the following:
```json
{
    "dasActivateBreaker1": true,
    "dasActivateBreaker2": true,
    "dasActivateBreaker3": false,
    "dasActivateBreaker4": true,
    "dasActivateBreaker5": false,
    "dasActivateBreaker6": false,
    "dasActivateBreaker7": false,
    "dasActivateBreaker8": false,
    "dasActivateBreaker9": false,
}
```


### Read PLC Network configuration

To read the PLC Network Configuration, send a get request to `localhost:5000/api/plc/network-configuration`

> THIS FEATURE IS NOT IMPLEMENTED YET... See TODO NOTES.

### Write PLC Network Configuration

To write the network configuration, send a put request to `localhost:5000/api/plc/network-configuration` with
the following payload:
```json
{
    "newIP1": 192,
    "newIP2": 168,
    "newIP3": 1,
    "newIP4": 5,
    "newSubnet1": 255,
    "newSubnet2": 255,
    "newSubnet3": 255,
    "newSubnet4": 0,
    "newGateway1": 192,
    "newGateway2": 168,
    "newGateway3": 1,
    "newGateway4": 254,
}
```

you should receive:
```json
{
    "newIP1": 192,
    "newIP2": 168,
    "newIP3": 1,
    "newIP4": 5,
    "newSubnet1": 255,
    "newSubnet2": 255,
    "newSubnet3": 255,
    "newSubnet4": 0,
    "newGateway1": 192,
    "newGateway2": 168,
    "newGateway3": 1,
    "newGateway4": 254,
}
```

### Read Breaker Alarms

To read the currently active breaker alarms, send a get request to `localhost:5000/api/breaker-alarms`

the following json payload should be returned:

```json
{
    "comAlarmBreaker1": false,
    "comAlarmBreaker2": false,
    "comAlarmBreaker3": false,
    "comAlarmBreaker4": true,
    "comAlarmBreaker5": false,
    "comAlarmBreaker6": false,
    "comAlarmBreaker7": false,
    "comAlarmBreaker8": false,
    "comAlarmBreaker9": true,
}
```

### Check PLC Connection Status

To read the currently active breaker alarms, send a get request to `localhost:5000/api/plc/test-connection`

the following json payload should be returned:

```json
{
    "code": 0,
    "message": "OK",
}
```

The following is the list of possible error codes and messages:


| Code Name                    | Hex Code Value | Decimal Code Value | Code Message                                                         |
| ---------------------------- | -------------- | ------------------ | -------------------------------------------------------------------- |
| okay                         | 0x00000000     | 0                  | "OK"                                                                 |
| errTCPSocketCreation         | 0x00000001     | 1                  | "SYS : Error creating the Socket"                                    |
| errTCPConnectionTimeout      | 0x00000002     | 2                  | "TCP : Connection Timeout"                                           |
| errTCPConnectionFailed       | 0x00000003     | 3                  | "TCP : Connection Error"                                             |
| errTCPReceiveTimeout         | 0x00000004     | 4                  | "TCP : Data receive Timeout"                                         |
| errTCPDataReceive            | 0x00000005     | 5                  | "TCP : Error receiving Data"                                         |
| errTCPSendTimeout            | 0x00000006     | 6                  | "TCP : Data send Timeout"                                            |
| errTCPDataSend               | 0x00000007     | 7                  | "TCP : Error sending Data"                                           |
| errTCPConnectionReset        | 0x00000008     | 8                  | "TCP : Connection reset by the Peer"                                 |
| errTCPNotConnected           | 0x00000009     | 9                  | "CLI : Client not connected"                                         |
| errTCPUnreachableHost        | 0x00002751     | 65637              | "TCP : Unreachable host"                                             |
| errIsoConnect                | 0x00010000     | 415030             | "ISO : Connection Error"                                             |
| errIsoInvalidPDU             | 0x00030000     | 1664520            | "ISO : Invalid PDU received"                                         |
| errIsoInvalidDataSize        | 0x00040000     | 2498884            | "ISO : Invalid Buffer passed to Send/Receive"                        |
| errCliNegotiatingPDU         | 0x00100000     | 17073526           | "CLI : Error in PDU negotiation"                                     |
| errCliInvalidParams          | 0x00200000     | 34173266           | "CLI : invalid param(s) supplied"                                    |
| errCliJobPending             | 0x00300000     | 51664680           | "CLI : Job pending"                                                  |
| errCliTooManyItems           | 0x00400000     | 68764420           | "CLI : too may items (>20) in multi read/write"                      |
| errCliInvalidWordLen         | 0x00500000     | 86255744           | "CLI : invalid WordLength"                                           |
| errCliPartialDataWritten     | 0x00600000     | 103355478          | "CLI : Partial data written"                                         |
| errCliSizeOverPDU            | 0x00700000     | 120848434          | "CPU : total data exceeds the PDU size"                              |
| errCliInvalidPlcAnswer       | 0x00800000     | 137922056          | "CLI : invalid CPU answer"                                           |
| errCliAddressOutOfRange      | 0x00900000     | 155414916          | "CPU : Address out of range"                                         |
| errCliInvalidTransportSize   | 0x00A00000     | 273176416          | "CPU : Invalid Transport size"                                       |
| errCliWriteDataSizeMismatch  | 0x00B00000     | 290669366          | "CPU : Data size mismatch"                                           |
| errCliItemNotAvailable       | 0x00C00000     | 307767570          | "CPU : Item not available"                                           |
| errCliInvalidValue           | 0x00D00000     | 325260424          | "CPU : Invalid value supplied"                                       |
| errCliCannotStartPLC         | 0x00E00000     | 342360164          | "CPU : Cannot start PLC"                                             |
| errCliAlreadyRun             | 0x00F00000     | 359827008          | "CPU : PLC already RUN"                                              |
| errCliCannotStopPLC          | 0x01000000     | 376926742          | "CPU : Cannot stop PLC"                                              |
| errCliCannotCopyRamToRom     | 0x01100000     | 394418066          | "CPU : Cannot copy RAM to ROM"                                       |
| errCliCannotCompress         | 0x01200000     | 411517800          | "CPU : Cannot compress"                                              |
| errCliAlreadyStop            | 0x01300000     | 429009220          | "CPU : PLC already STOP"                                             |
| errCliFunNotAvailable        | 0x01400000     | 546772256          | "CPU : Function not available"                                       |
| errCliUploadSequenceFailed   | 0x01500000     | 570556566          | "CPU : Upload sequence failed"                                       |
| errCliInvalidDataSizeRecvd   | 0x01600000     | 587630194          | "CLI : Invalid data size received"                                   |
| errCliInvalidBlockType       | 0x01700000     | 605123144          | "CLI : Invalid block type"                                           |
| errCliInvalidBlockNumber     | 0x01800000     | 622221348          | "CLI : Invalid block number"                                         |
| errCliInvalidBlockSize       | 0x01900000     | 639714304          | "CLI : Invalid block size"                                           |
| errCliNeedPassword           | 0x01D00000     | 809535236          | "CPU : Function not authorized for current protection level"         |
| errCliInvalidPassword        | 0x01E00000     | 826634880          | "CPU : Invalid password"                                             |
| errCliNoPasswordToSetOrClear | 0x01F00000     | 844126294          | "CPU : No password to set or clear"                                  |
| errCliJobTimeout             | 0x02000000     | 861226034          | "CLI : Job Timeout"                                                  |
| errCliPartialDataRead        | 0x02100000     | 878718984          | "CLI : function refused by CPU (Unknown error)"                      |
| errCliBufferTooSmall         | 0x02200000     | 895817092          | "CLI : Partial data read"                                            |
| errCliFunctionRefused        | 0x02300000     | 913310048          | "CLI : The buffer supplied is too small to accomplish the operation" |
| errCliDestroying             | 0x02400000     | 930383670          | "CLI : Cannot perform (destroying)"                                  |
| errCliInvalidParamNumber     | 0x02500000     | 947483410          | "CLI : Invalid Param Number"                                         |
| errCliCannotChangeParam      | 0x02600000     | 964974728          | "CLI : Cannot change this param now"                                 |
| errCliFunctionNotImplemented | 0x02700000     | 1082737764         | "CLI : Function not implemented"                                     |



### Postman Link

To run these examples, just open the following link and it should redirect you to an application you can run to try them out once your server is up and running: https://www.getpostman.com/collections/5ce80b82246b9f2fcc53
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

### Postman Link

To run these examples, just open the following link and it should redirect you to an application you can run to try them out once your server is up and running: https://www.getpostman.com/collections/5ce80b82246b9f2fcc53
# Breaker Config API Demo
- [Breaker Config API Demo](#breaker-config-api-demo)
  - [Start](#start)
  - [Testing / Demo](#testing--demo)
    - [Get Breaker All Breaker Configuration](#get-breaker-all-breaker-configuration)
    - [Get Breaker 1 Configuration](#get-breaker-1-configuration)
    - [Update Breaker 1 Configuration](#update-breaker-1-configuration)
    - [Update Breaker 1 Error Example](#update-breaker-1-error-example)
    - [Postman Link](#postman-link)

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

### Postman Link

To run these examples, just open the following link and it should redirect you to an application you can run to try them out once your server is up and running: https://www.getpostman.com/collections/5ce80b82246b9f2fcc53
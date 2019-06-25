# Smart DAS App

## About the project
The project is a combination of a backend api written in [dotnet core](https://docs.microsoft.com/en-us/dotnet/core/) and a frontend written in javascript using the [React.js](https://reactjs.org/) library. Both projects are wrapped up in an [electron](https://electronjs.org/) application.

The backend api exposes a number of http endpoints for the frontend app to digest.

## Backend DotNet Core Application
The documentation for the dotnet http rest application can be found below: 
[documentation](./server/README.md)

The backend uses the [SmartDAS dotnet api](https://code.siemens.com/smart-gear-gp/smartdas) to communicate via SNAP7 to the external PLC. It relays these messages over http to the frontend application.

## Frontend React.js Application
The documentation for the frontend react application can be found below: 
[documentation](./client/README.md)

### Snapshots
Main dashboard:
![main_dashboard](./docs/_images/main_dashboard.png)
Wiring Wizard:
![wiring_wizard](./docs/_images/wiring_wizard.png)
Change All Breaker IP Address Dialog:
![change_all_breaker_ips](./docs/_images/change_all_breaker_ips.png)
Connection Gateway Error:
![gateway_error](./docs/_images/gateway_error.png)
Set Breaker DAS Modes:
![set_das_modes](./docs/_images/set_das_modes.png)

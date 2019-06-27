# Changelog
All notable changes to this project will be documented in this file.

## V0.3.0
- **Server**:
  - handles disconnecting and reconnecting to new PLC ip
  - upgraded smartDAS assembly reference
  - removed extra helper for reading siteSetupStructure from controllers.
- **Client**:
  - added dark mode toggle
  - made all requests to the server synchronous. e.g. each request
    will follow a chain of requests. If any fails, the entire chain
    will fail.

## V0.2.2
- **Server**:
  - upgraded smartDAS assembly reference
  - uses the already existing socket connection to the PLC from
    the smartDAS library to determine the connection status. This
    reduces the number of sockets connected to the PLC at one point.

## V0.2.1
- **Server**:
  - recursive retry of plc connection status (up to 10 attempts)
  - upgraded smartDAS assembly reference
- **Client**:
  - updated type definition for PLCConnectionStatusPayload

## V0.2.0
- version bump to v0.2.0 
- **Server**:
  - Added controller to read plc network configuration from api 
  - Init commit javascript tests for server 
  - Controller Added to Check PLC Status 
- **Client**:
  - User interface can update breaker DAS mode 
  - Created a hook for breaker statuses 
  - Integrated Changing Switch Type 
  - Improved connection animation 
  - Added get / set helper methods for sitesetupstructure 
  - Added SiteSetupStructure Class 
  - Added type definitions of snap7 error codes 
  - Shows status of DAS commands in List 
  - PLC Status and Gateway Monitoring 
  - In between loading state added 
- **Electron Build Scripts**:
  - Added build watch task 
  - Added seperate build scripts for windows, linux, and mac os x.


## V0.1.0
- **Server**:
  - Change static bool name to DemoMode
  - Changed server port
  - Automatically update the ip of the api on plc update
  - Added Breaker Alarm Controller 
  - Added controller to write PLC IP 
  - Added Controller to read DAS Commands 
  - Added Controller to read DAS Status 
- **Electron Build Scripts**:
  - Added icons for electron app 
  - Added new favicon 
- **Client**:
  - Display das status
  - Added redux
  - Added breaker actions
  - Added reducers for breakers
  - Added in app notifications
  - Added notifcation reducers
  - Added new type definitions  from WEB API:
    - Error
    - DASStatusPayload
    - DASActivatePayload
    - BreakerAlarmPayload
    - PLCNetworkConfif
  - Added app title bar
  - Incorporated smartgear/edison theme
  - Added wiring wizard
  - Added dialog to set all breaker ip addresses at once
  - Added dialog to change target PLC ip address
  - Added dialog to change network settings on connected PLC
  - Added PLC status card
  - Added siemens logos

## V0.0.2
- **Server**:
  - Added dockerfile

## V0.0.1
- Project initialization
- **Server**:
  - The server folder contains the bootstrapped MVC web server based on dotnet 2.2.0
  - Added the following MVC Controllers to server
    - BreakerConfigController: handles reading the configuration of the **breakers**
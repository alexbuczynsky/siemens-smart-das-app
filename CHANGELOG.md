# Changelog
All notable changes to this project will be documented in this file.

## V2.1.0
- **Server**
  - Updated SmartDAS reference
    - Brings recursive write request checks

## V2.0.3
- **PLC**
  - Bug fix to address issue 
    https://code.siemens.com/smart-gear-gp/smartdas/issues/10
    where the ip address was not being validated correctly when
    the PLC would try to communicate to another device.
## V2.0.2
- **Client**:
  - DAS Buttons are disabled when a breaker is in comm failure.
## V2.0.1
> NOTE: The version has been pushed to V2.0.1 not because of breaking changes, 
> but to be in sync with how the shop floor / external departments are
> referring to this program.
> 
> Since this software solution replaces the previous SmartDAS 1.0 project,
> this project has been called "SmartDAS 2.0" and thus all future versions will
> be in sync with the external version numbers. All previous versions, if release,
> have been noted with parenthesis the version they are externally referenced as.
- **Server**
  - Changed default plc IP to 192.168.127.235
  - server uses multiple SmartDASService Instances
  - SmartDASService implements new SmartDASClient
  - All Controllers will establish a connection with the PLC, get data,
    and then disconnect.
    - This increases the response time, but ensures no buffer corruption 
      due to async requests.
- **Client**
  - AppTitleBar displays version number
  - AppTitleBar is fixed to the top and will not move while scrolling
  - Added DAS Status Chip to Breaker List to make it easier to see
    breakers DAS state.
  - Added Comm Alarm Chip to Breaker List to make it easier to
    visually see when a breaker has a comm failure.
  - SmartDAS API, on handling request errors will now display both
    the snap7 error code and snap7 error message on an internal server
    error.
  - The initial state of commAlarms is now inactive (was active before).
  - Increased the PLC connection test interval from 3000 ms to 5000 ms.
  - Breaker Config Dialog
    - SlaveId is now limitied to between 0 and 255
    - Assosicated input/ouput is limited between 0 and 9
    - Fixed bug where breaker config dialog would disappear

## V0.4.1 (V2.0.0)
- **Server**
  - upgraded smartDAS assembly reference with error handling on potential
    tcp send buffer error

## V0.4.0
- **Server**:
  - upgraded smartDAS assembly reference
  - one service handles all plc communications
  - no errors are thrown anywhere in demo mode
  - DemoMode removes all smartDAS retries
  - all controllers use the central plc service
  - removed references to BreakerConfigAPI.Database (deprecated)
- **Client**:
  - only fetches site setup on plc status change or when action
    alters the state.
  - improved performance and stability of wiring IO tool. 

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
# QuarantineApp

This is a monorepo for a QuarantineApp.
It is a PoC of a helper tool for the law enforcement services during CoronaVirus outbreak.
It's main purpose is to provide a way of supervising people undergoing quarantine.
It is achieved by localizing the user's phone along with biometric authentication.

Each potentially infected person is being recored in (nonexistent) database.
The frontend panel generates QR code for the person to log in to the app.
(Currently static value of `coronaVirus://patient0`)

The patients are periodically being asked to provide current location through push notifications (not implemented).

The whole project took less than 10 hours to finish.
It was a fun way to get acquainted with expo.

## Generated QR Code

<img src="docs/qrcode.png" width="300"/>

## User not logged in

<img src="docs/IMG-0827.PNG" width="300"/>

## Login button pressed => navigation to QR Code reader screen

<img src="docs/IMG-0835.PNG" width="300"/>

## User logged as `patient0` (Logout button should be removed for "production")

<img src="docs/IMG-0836.PNG" width="300"/>

## Check in button pressed => navigation to Map screen => triggered localization

<img src="docs/IMG-0838.PNG" width="300" />

## Position found

<img src="docs/IMG-0839.PNG" width="300"/>

## Map tiles menu

<img src="docs/IMG-0840.PNG" width="300"/>

## Colorful map selected

<img src="docs/IMG-0841.PNG" width="300"/>

## Satellite selected

<img src="docs/IMG-0842.PNG" width="300"/>

## Check in with location button pressed triggers biometric authentication

<img src="docs/IMG-0843.PNG" width="300"/>

## Alert showed when authentication unsuccessful

<img src="docs/IMG-0844.PNG" width="300"/>

## Authentication successful, location sent to the database (not implemented) and navigation to home screen

<img src="docs/IMG-0845.PNG" width="300"/>

## The project unfortunately could not be used in real life since after three unsuccessful biometric authentications the fallback method is being enabled.

<img src="docs/IMG-0826.PNG" width="300"/>

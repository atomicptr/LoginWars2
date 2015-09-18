# Login Wars 2

An experimental alternative launcher for Guild Wars 2 with support for multiple accounts and some extra stuff.

## Features
* Manage multiple accounts
* Account data can (and should) be encrypted (No more plain text password shortcuts!)
* Check your dailies, in the launcher!
* (SOON) Check your latest Trading Post transactions (Only if you grant the permissions)
* (SOON) More cool API integrations!

## Work in progress
* Name/Icon is not final
* UI needs lots of improvements (in usability and design)
* Some code needs to be rewritten
* Still no update functionality (As in you can't update the launcher atm, I'm looking into integrating Squirrel for this)
* Not working OS X version, while there is an OS X version in theory it doesn't work since I'm still not sure how to apply the command line options via cider

## What it actually does

No magic, no botting or any form of "automation". It's just a nicer, more secure and frankly better interface for your old shortcuts with command line options (e.g. -email ... -password ... -nopatchui)

## FAQ

### Can I get banned for using Login Wars 2?

LoginWars2 is just calling the Gw2 executable with the [command line interface we're using for years](https://wiki.guildwars2.com/wiki/Command_line_arguments). So I highly doubt that you can get banned for this. I'll contact Arena.Net at some point to confirm this.

### Why is my screen black and nothing happens?

For some odd reasons Guild Wars 2 won't tell you if your credentials are wrong (or some other kind of problem occured).

Reasons this might happen:
* Your email/password is wrong (Fix: Use the right credentials)
* You need to authenticate this system (Fix: Log in with the normal launcher once, after that it should work)

Please ArenaNet add error messages :).

### Why Login Wars >>"2"<<, is there also a "1"?

I wanted to call the app "Login Wars" but it somewhat would sound like it's for GW1 instead of GW2.

## Powered by

* The eternal alchemy
* electron
* angular.js

## Asset attributions

&copy; 2014 ArenaNet, LLC. All rights reserved. NCSOFT, the interlocking NC logo, ArenaNet, Guild Wars, Guild Wars Factions, Guild Wars Nightfall, Guild Wars: Eye of the North, Guild Wars 2, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corporation. All other trademarks are the property of their respective owners.

## License

It's copyrighted, closed source software at the moment so sharing it without my permission is not allowed. I'll make it open source at some point in the future.

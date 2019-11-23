export const detectByUseragent = (userAgent) => {
  const detect = {}

  // extract operating system name from user agent
  if (userAgent.indexOf('Windows') >= 0) {
    if (userAgent.indexOf('Windows Phone') >= 0) {
      detect.os.name = 'Windows Phone'
    } else {
      detect.os.name = 'Windows'
    }
  }

  if (userAgent.indexOf('OS X') >= 0 && userAgent.indexOf('Android') === -1) {
    detect.os.name = 'OS X'
  }

  if (userAgent.indexOf('Linux') >= 0) {
    detect.os.name = 'Linux'
  }

  if (userAgent.indexOf('like Mac OS X') >= 0) {
    detect.os.name = 'iOS'
  }

  if ((userAgent.indexOf('Android') >= 0 || userAgent.indexOf('Adr') >= 0) && userAgent.indexOf('Windows Phone') === -1) {
    detect.os.name = 'Android'
  }

  if (userAgent.indexOf('BB10') >= 0) {
    detect.os.name = 'BlackBerry'
  }

  if (userAgent.indexOf('RIM Tablet OS') >= 0) {
    detect.os.name = 'BlackBerry Tablet OS'
  }

  if (userAgent.indexOf('BlackBerry') >= 0) {
    detect.os.name = 'BlackBerryOS'
  }

  if (userAgent.indexOf('CrOS') >= 0) {
    detect.os.name = 'Chrome OS'
  }

  if (userAgent.indexOf('KAIOS') >= 0) {
    detect.os.name = 'KaiOS'
  }

  // extract operating system version from user agent
  let match = null

  switch (detect.os.name) {
    case 'Windows':
    case 'Windows Phone':
      if (userAgent.indexOf('Win16') >= 0) {
        detect.os.version = '3.1.1'
      } else if (userAgent.indexOf('Windows CE') >= 0) {
        detect.os.version = 'CE'
      } else if (userAgent.indexOf('Windows 95') >= 0) {
        detect.os.version = '95'
      } else if (userAgent.indexOf('Windows 98') >= 0) {
        if (userAgent.indexOf('Windows 98; Win 9x 4.90') >= 0) {
          detect.os.version = 'Millennium Edition'
        } else {
          detect.os.version = '98'
        }
      } else {
        match = userAgent.match(/Win(?:dows)?(?: Phone)?[ _]?(?:(?:NT|9x) )?((?:(\d+\.)*\d+)|XP|ME|CE)\b/)

        if (match && match[ 1 ]) {
          switch (match[ 1 ]) {
            case '6.4':
              // some versions of Firefox mistakenly used 6.4
              match[ 1 ] = '10.0'
              break
            case '6.3':
              match[ 1 ] = '8.1'
              break
            case '6.2':
              match[ 1 ] = '8'
              break
            case '6.1':
              match[ 1 ] = '7'
              break
            case '6.0':
              match[ 1 ] = 'Vista'
              break
            case '5.2':
              match[ 1 ] = 'Server 2003'
              break
            case '5.1':
              match[ 1 ] = 'XP'
              break
            case '5.01':
              match[ 1 ] = '2000 SP1'
              break
            case '5.0':
              match[ 1 ] = '2000'
              break
            case '4.0':
              match[ 1 ] = '4.0'
              break
            default:
              // nothing
              break
          }
        }
      }
      break
    case 'OS X':
      match = userAgent.match(/OS X ((\d+[._])+\d+)\b/)
      break
    case 'Linux':
      // linux user agent strings do not usually include the version
      detect.os.version = null
      break
    case 'iOS':
      match = userAgent.match(/OS ((\d+[._])+\d+) like Mac OS X/)
      break
    case 'Android':
      match = userAgent.match(/(?:Android|Adr) (\d+([._]\d+)*)/)
      break
    case 'BlackBerry':
    case 'BlackBerryOS':
      match = userAgent.match(/Version\/((\d+\.)+\d+)/)
      break
    case 'BlackBerry Tablet OS':
      match = userAgent.match(/RIM Tablet OS ((\d+\.)+\d+)/)
      break
    case 'Chrome OS':
      detect.os.version = detect.browser.version
      break
    case 'KaiOS':
      match = userAgent.match(/KAIOS\/(\d+(\.\d+)*)/)
      break
    default:
      // no good default behavior
      detect.os.version = null
      break
  }

  if (match && match[ 1 ]) {

    // replace underscores in version number with periods
    match[ 1 ] = match[ 1 ].replace(/_/g, '.')
    detect.os.version = match[ 1 ]
  }

  // handle Mac OS X / OS X / macOS naming conventions
  if (detect.os.name === 'OS X' && detect.os.version) {

    let versions = detect.os.version.split('.')
    if (versions.length >= 2) {
      let minorVersion = parseInt(versions[ 1 ], 10)
      if (minorVersion <= 7) {
        detect.os.name = 'Mac OS X'
      } else if (minorVersion >= 12) {
        detect.os.name = 'macOS'
      } else {
        detect.os.name = 'OS X'
      }
    }

  }

  return detect
}
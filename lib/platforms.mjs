const underscore = /_/g

const androidVersions = [
  ['Android 11', /^11.*$/],
  ['Nougat', /^10.*$/],
  ['Nougat', /^9.*$/],
  ['Nougat', /^8.+$/],
  ['Nougat', /^7.+$/],
  ['Marshmallow', /^6.+$/],
  ['Lollipop', /^5.+$/],
  ['KitKat', /^4.4.*$/],
  ['Jelly Bean', /^4.[1-3].*$/],
  ['Ice Cream Sandwich', /^4.0.*$/],
  ['Honeycomb', /^3.+$/],
  ['Gingerbread', /^2.3.*$/],
  ['FroYo', /^2.2.*/],
  ['Eclair', /^2.[0-1].*$/],
  ['Donut', /^1.6.*$/],
  ['Cupcake', /^1.5.*$/],
  ['Petit Four', /^1.1.*$/]
]
export const android = {
  os: 'android',
  platform: /android.*/i,
  agent: /(?:android|adr) (\d+([._]\d+)*)/i,
  isMobile: () => true,
  version ({ userAgent = '' }) {
    const match = userAgent.match(android.agent)
    return match && match[1]
  },
  name ({ version = '' }) {
    const found = androidVersions.find(entry => entry[1].test(version))
    return found && found[0]
  },
  arch () {
    return undefined
  }
}

export const ios = {
  os: 'ios',
  platform: /(?:iphone|ipod|ipad|Pike v.*)/i,
  agent: /os ((\d+[._])+\d+) like mac os x/i,
  isMobile: () => true,
  version ({ userAgent = '' }) {
    const match = userAgent.match(ios.agent)
    return match && match[1] && match[1].replace(underscore, '.')
  },
  name () {
    return undefined
  },
  arch () {
    return undefined
  }
}

const macosVersions = [
  ['Catalina', /^10.15.*$/],
  ['Mojave', /^10.14.*$/],
  ['High Sierra', /^10.13.*$/],
  ['Sierra', /^10.12.*$/],
  ['El Capitan', /^10.11.*$/],
  ['Yosemite', /^10.10.*$/],
  ['Mavericks', /^10.9.*$/],
  ['Mountain Lion', /^10.8.*$/],
  ['Lion', /^10.7.*$/],
  ['Snow Leopard', /^10.6.*$/],
  ['Leopard', /^10.5.*$/],
  ['Tiger', /^10.4.*$/],
  ['Panther', /^10.3.*$/],
  ['Jaguar', /^10.2.*$/],
  ['Puma', /^10.1.*$/],
  ['Cheetah', /^10.0.*$/]
]

export const macos = {
  os: 'macos',
  platform: /mac.*/i,
  agent: /os x ((\d+[._])+\d+)\b/i,
  isMobile: () => false,
  arch () {
    return undefined
  },
  version ({ userAgent = '' }) {
    const match = userAgent.match(macos.agent)
    return match && match[1] && match[1].replace(underscore, '.')
  },
  name ({ version }) {
    const found = macosVersions.find(entry => entry[1].test(version))
    return found && found[0]
  }
}

export const windows = {
  os: 'windows',
  platform: /win.*/i,
  agent: /win(?:dows)?(?: phone)?[ _]?(?:(?:nt|9x) )?((?:(\d+\.)*\d+)|xp|me|ce)\b/i,
  isMobile: ({ userAgent = '' }) => userAgent.toLowerCase().indexOf('windows phone') > -1,
  arch ({ platform, userAgent }) {
    if (platform === 'win64') {
      return '64'
    }
    // useragent
    // WOW64
    // Win64
  },
  name () {
    return undefined
  },
  version ({ userAgent = '' }) {
    const match = userAgent.match(windows.agent)
    let v
    if (match && match[1]) {
      switch (match[1]) {
        case '6.4':
        case '10.0':
          // some versions of Firefox mistakenly used 6.4
          v = '10.0'
          break
        case '6.3':
        case '8.1':
          v = '8.1'
          break
        case '6.2':
        case '8.0':
          v = '8'
          break
        case '6.1':
        case '7.0':
          v = '7'
          break
        case '6.0':
          v = 'Vista'
          break
        case '5.2':
          v = 'Server 2003'
          break
        case '5.1':
          v = 'XP'
          break
        case '5.01':
          v = '2000 SP1'
          break
        case '5.0':
          v = '2000'
          break
        case '4.0':
          v = '4.0'
          break
        default:
          // nothing
          break
      }
    }
    return v
  }
}

export const linux = {
  os: 'linux',
  isMobile: ({ userAgent = '' }) => userAgent.toLowerCase().indexOf('mobi') > -1,
  platform: /(?:linux.*)/i,
  agent: /linux/i,
  arch ({ platform = '' }) {
    if (platform.indexOf('i686') > -1) {
      return '32'
    }
    if (platform.indexOf('x86_64') > -1) {
      return '64'
    }
  },
  name () {
    return undefined
  },
  version () {
    return undefined
  }
}

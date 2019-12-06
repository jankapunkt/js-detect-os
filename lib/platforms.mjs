const underscore = /_/g

const androidVersions = [
  { name: 'Nougat', pattern: /^10.*$/ },
  { name: 'Nougat', pattern: /^9.*$/ },
  { name: 'Nougat', pattern: /^8.+$/ },
  { name: 'Nougat', pattern: /^7.+$/ },
  { name: 'Marshmallow', pattern: /^6.+$/ },
  { name: 'Lollipop', pattern: /^5.+$/ },
  { name: 'KitKat', pattern: /^4.4.*$/ },
  { name: 'Jelly Bean', pattern: /^4.[1-3].*$/ },
  { name: 'Ice Cream Sandwich', pattern: /^4.0.*$/ },
  { name: 'Honeycomb', pattern: /^3.+$/ },
  { name: 'Gingerbread', pattern: /^2.3.*$/ },
  { name: 'FroYo', pattern: /^2.2.*/ },
  { name: 'Eclair', pattern: /^2.[0-1].*$/ },
  { name: 'Donut', pattern: /^1.6.*$/ },
  { name: 'Cupcake', pattern: /^1.5.*$/ },
  { name: 'Petit Four', pattern: /^1.1.*$/ }
]
export const android = {
  os: 'android',
  platform: /android.*/i,
  agent: /(?:android|adr) (\d+([._]\d+)*)/i,
  isMobile: () => true,
  version (userAgent) {
    const match = userAgent.match(android.agent)
    return match && match[1]
  },
  name ({ version }) {
    const found = androidVersions.find(entry => entry.pattern.test(version))
    return found && found.name
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
  version ({ userAgent }) {
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
  { name: 'Catalina', pattern: /^10.15.*$/ },
  { name: 'Mojave', pattern: /^10.14.*$/ },
  { name: 'High Sierra', pattern: /^10.13.*$/ },
  { name: 'Sierra', pattern: /^10.12.*$/ },
  { name: 'El Capitan', pattern: /^10.11.*$/ },
  { name: 'Yosemite', pattern: /^10.10.*$/ },
  { name: 'Mavericks', pattern: /^10.9.*$/ },
  { name: 'Mountain Lion', pattern: /^10.8.*$/ },
  { name: 'Lion', pattern: /^10.7.*$/ },
  { name: 'Snow Leopard', pattern: /^10.6.*$/ },
  { name: 'Leopard', pattern: /^10.5.*$/ },
  { name: 'Tiger', pattern: /^10.4.*$/ },
  { name: 'Panther', pattern: /^10.3.*$/ },
  { name: 'Jaguar', pattern: /^10.2.*$/ },
  { name: 'Puma', pattern: /^10.1.*$/ },
  { name: 'Cheetah', pattern: /^10.0.*$/ }
]

export const macos = {
  os: 'macos',
  platform: /mac.*/i,
  agent: /os x ((\d+[._])+\d+)\b/i,
  isMobile: () => false,
  arch () {
    return undefined
  },
  version ({ userAgent }) {
    const match = userAgent.match(macos.agent)
    return match && match[1] && match[1].replace(underscore, '.')
  },
  name ({ version }) {
    const found = macosVersions.find(entry => entry.pattern.test(version))
    return found && found.name
  }
}

export const windows = {
  os: 'windows',
  platform: /win.*/i,
  agent: /win(?:dows)?(?: phone)?[ _]?(?:(?:nt|9x) )?((?:(\d+\.)*\d+)|xp|me|ce)\b/i,
  isMobile: ({ userAgent }) => userAgent.toLowerCase().indexOf('windows phone') > -1,
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
  version ({ userAgent }) {
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
  isMobile: ({ userAgent }) => userAgent.toLowerCase().indexOf('mobi') > -1,
  platform: /(?:linux.*)/i,
  agent: /linux/i,
  arch ({ platform, userAgent }) {
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
  version ({ userAgent }) {
    return undefined
  }
}

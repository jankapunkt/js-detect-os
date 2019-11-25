export const android = {
  os: 'android',
  platform: /android.*/,
  agent: /(?:android|adr) (\d+([._]\d+)*)/,
  isMobile: () => true,
  version (userAgent) {
    const match = userAgent.match(android.agent)
    return match && match[1]
  },
  name ({ version }) {
    switch (version) {
      case '1.1':
        return 'Petit Four'
      case '1.5':
        return 'Cupcake'
      case '1.6':
        return 'Donut'
      case '2.0':
      case '2.0.1':
      case '2.1':
        return 'Eclair'
      case '2.2':
      case '2.2.1':
      case '2.2.2':
        return 'FroYo'
      case '2.3':
      case '2.3.1':
      case '2.3.2':
      case '2.3.3':
      case '2.3.4':
      case '2.3.5':
      case '2.3.6':
      case '2.3.7':
        return 'Gingerbread'
      case '3.0':
      case '3.1':
      case '3.2':
      case '3.2.1':
        return 'Honeycomb'
      case '4.0':
      case '4.0.1':
      case '4.0.2':
      case '4.0.3':
      case '4.0.4':
        return 'Ice Cream Sandwich'
      case '4.1':
      case '4.1.1':
      case '4.1.2':
      case '4.2':
      case '4.2.1':
      case '4.2.2':
      case '4.3':
      case '4.3.1':
        return 'Jelly Bean'
      case '4.4':
      case '4.4.1':
      case '4.4.2':
      case '4.4.3':
      case '4.4.4':
        return 'KitKat'
      case '5.0':
      case '5.0.1':
      case '5.0.2':
      case '5.1':
      case '5.1.1':
        return 'Lollipop'
      case '6.0':
      case '6.0.1':
        return 'Marshmallow'
      case '7.0':
      case '7.1':
      case '7.1.1':
      case '7.1.2':
        return 'Nougat'
      case '8.0':
      case '8.1':
        return 'Oreo'
      case '9.0':
      case '9':
        return 'Pie'
      case '10.0':
      case '10':
        return 'Android 10'
      default:
        return undefined
    }
  },
  arch () {
    return undefined
  }
}

export const ios = {
  os: 'ios',
  platform: /(?:iphone|ipod|ipad|Pike v.*)/,
  agent: /os ((\d+[._])+\d+) like mac os x/,
  isMobile: () => true,
  version ({ userAgent }) {
    const match = userAgent.match(ios.agent)
    return match && match[1]
  },
  name () {
    return undefined
  },
  arch () {
    return undefined
  }
}

export const macos = {
  os: 'macos',
  platform: /mac.*/,
  agent: /os x ((\d+[._])+\d+)\b/,
  isMobile: () => false,
  arch () {
    return undefined
  },
  version ({ userAgent }) {
    const match = userAgent.match(macos.agent)
    return match && match[1]
  },
  name ({ version }) {
    switch (version) {
      case '10.0':
        return 'Cheetah'
      case '10.1':
        return 'Puma'
      case '10.2':
        return 'Jaguar'
      case '10.3':
        return 'Panther'
      case '10.4':
        return 'Tiger'
      case '10.5':
        return 'Leopard'
      case '10.6':
        return 'Snow Leopard'
      case '10.7':
        return 'Lion'
      case '10.8':
        return 'Mountain Lion'
      case '10.9':
        return 'Mavericks'
      case '10.10':
        return 'Yosemite'
      case '10.11':
        return 'El Capitan'
      case '10.12':
        return 'Sierra'
      case '10.13':
        return 'High Sierra'
      case '10.14':
        return 'Mojave'
      case '10.15':
        return 'Catalina'
      default:
        return undefined
    }
  }
}

export const windows = {
  os: 'windows',
  platform: /win.*/,
  agent: /win(?:dows)?(?: phone)?[ _]?(?:(?:nt|9x) )?((?:(\d+\.)*\d+)|xp|me|ce)\b/,
  isMobile: ({ userAgent }) => userAgent.toLowerCase().indexOf('windows phone') === -1,
  arch ({ platform, userAgent }) {
    if (platform === 'win64') {
      return '64'
    }
    // useragent
    // WOW64
    // Win64
  },
  version ({ userAgent }) {
    const match = userAgent.match(windows.agent)

    let v
    if (match && match[1]) {
      switch (match[1]) {
        case '6.4':
          // some versions of Firefox mistakenly used 6.4
          v = '10.0'
          break
        case '6.3':
          v = '8.1'
          break
        case '6.2':
          v = '8'
          break
        case '6.1':
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
  platform: /(?:linux.*)/,
  agent: /linux/,
  arch ({ platform, userAgent }) {
    if (platform.indexOf('i686') > -1) {
      return '32'
    }
    if (platform.indexOf('x86_64') > -1) {
      return '64'
    }
  },
  version ({ userAgent }) {
    return undefined
  }
}

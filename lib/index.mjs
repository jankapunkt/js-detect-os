import { android, macos, ios, linux, windows } from './platforms'

const allPlatforms = [android, windows, ios, macos, linux]

function isPlatform (target, { strict = true, navigator = window.navigator } = {}) {
  const { platform, userAgent } = navigator
  const platformMatch = target.platform.test(platform)
  const agentMatch = target.agent.test(userAgent)
  return strict
    ? platformMatch && agentMatch
    : platformMatch || agentMatch
}

class OSDetector {
  constructor () {
    this.detected = {
      os: undefined,
      isMobile: undefined,
      name: undefined,
      version: undefined,
      ram: undefined,
      cpuCount: undefined,
      platform: undefined,
      userAgent: undefined
    }
  }

  static get types () {
    return {
      android,
      ios,
      linux,
      macos,
      windows
    }
  }

  detect (navigator = window.navigator) {
    // always assign navigator values
    const { userAgent } = navigator
    const { platform } = navigator
    this.detected.userAgent = userAgent
    this.detected.platform = platform
    this.detected.ram = navigator.deviceMemory
    this.detected.cpuCount = navigator.hardwareConcurrency

    let found = allPlatforms.find(target => isPlatform(target, { strict: true, navigator }))
    if (!found) {
      found = allPlatforms.find(target => isPlatform(target, { strict: false, navigator }))
    }

    if (!found) {
      this.detected.name = 'unknown'
    } else {
      this.detected.os = found.os
      this.detected.version = found.version({ userAgent, platform })
      this.detected.isMobile = found.isMobile({ userAgent, platform, version: this.detected.version })
      this.detected.name = found.name({ userAgent, platform, version: this.detected.version })
    }
    return this.detected
  }

  isMobile () {
    return this.detected.isMobile
  }

  os () {
    return this.detected.os
  }

  platform () {
    return this.detected.platform
  }

  userAgent () {
    return this.detected.userAgent
  }

  name () {
    return this.detected.name
  }

  version () {
    return this.detected.version
  }

  ram () {
    return this.detected.ram
  }

  cpuCount () {
    return this.detected.cpuCount
  }
}

export default OSDetector

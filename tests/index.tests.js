import { assert } from 'chai'
import { describe, it } from 'mocha'
import OSDetector from '../lib/index'

const getRunner = (target, { version, name, isMobile, deviceMemory = 4, hardwareConcurrency = 2 }) => ({ userAgent, platform, debug }) => {
  const detector = new OSDetector()
  detector.debug = debug
  const navigator = {
    userAgent: userAgent,
    platform: platform,
    deviceMemory: deviceMemory,
    hardwareConcurrency: hardwareConcurrency
  }
  const detected = detector.detect(navigator)
  assert.deepEqual(detected, {
    os: target.os,
    isMobile: isMobile,
    name: name,
    version: detected.version,
    ram: deviceMemory,
    cpuCount: hardwareConcurrency,
    platform: navigator.platform,
    userAgent: navigator.userAgent
  })

  if (version) {
    assert.isTrue(version.test(detected.version), detected.version)
  }
}

describe('android', function () {
  describe('kitkat / <= 4.x', function () {
    const run = getRunner(OSDetector.types.android, {
      name: 'KitKat',
      isMobile: true
    })

    it('detects on WebView', function () {
      run({
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36',
        platform: 'Linux aarch64'
      })
    })
  })

  describe('lollipop / 5.x', function () {
    const run = getRunner(OSDetector.types.android, {
      name: 'Lollipop',
      isMobile: true
    })

    it('detects on webView', function () {
      run({
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36',
        platform: 'Linux aarch64'
      })
    })
  })

  describe('10', function () {
    const run = getRunner(OSDetector.types.android, {
      name: 'Android 10',
      isMobile: true
    })

    it('detects on chrome mobile', function () {
      run({
        userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-A125F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.210 Mobile Safari/537.36',
        platform: 'Linux armv8l'
      })
    })
  })

  describe('11', function () {
    const run = getRunner(OSDetector.types.android, {
      name: 'Android 11',
      isMobile: true
    })

    it('detects on Firefox mobile ', function () {
      run({
        userAgent: 'Mozilla/5.0 (Android 11; Mobile; rv:88.0) Gecko/88.0 Firefox/88.0',
        platform: 'Linux aarch64'
      })
    })

    it('detects on Chrome mobile', function () {
      run({
        userAgent: 'Mozilla/5.0 (Linux; Android 11; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
        platform: 'Linux aarch64'
      })
    })
  })
})

describe('windows', function () {
  const run = getRunner(OSDetector.types.windows, {
    version: /10\.0/,
    isMobile: false
  })

  describe('windows 10 desktop x64', function () {
    it('detects on edge', function () {
      run({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362',
        platform: 'Win32'
      })
    })

    it('detects on FF', function () {
      run({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0',
        platform: 'Win32'
      })
    })

    it('detects on chrome', function () {
      run({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        platform: 'Win32'
      })
    })
  })
})

describe('macos', function () {
  describe('mojave', function () {
    const run = getRunner(OSDetector.types.macos, {
      version: /10\.14.*/,
      name: 'Mojave',
      isMobile: false
    })

    it('detects on chrome', function () {
      run({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
        platform: 'MacIntel'
      })
    })

    it('detects on FF', function () {
      run({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:70.0) Gecko/20100101 Firefox/70.0',
        platform: 'MacIntel'
      })
    })

    it('detects on Safari', function () {
      run({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15',
        platform: 'MacIntel'
      })
    })
  })
})

describe('ios', function () {
  const run = getRunner(OSDetector.types.ios, {
    version: /12\.1\.3/,
    isMobile: true
  })

  it('detects on iphone safari', function () {
    run({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
    })
  })

  it('detects on iphone chrome', function () {
    run({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
    })
  })

  it('detects on ipod safari', function () {
    run({
      userAgent: 'Mozilla/5.0 (iPod; CPU iPhone OS 12_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
    })
  })

  it('detects on ipad safari', function () {
    run({
      userAgent: 'Mozilla/5.0 (iPad; CPU iPhone OS 12_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
    })
  })
})

describe('linux', function () {
  const run = getRunner(OSDetector.types.linux, { isMobile: false })

  it('detects on Ubuntu Chrome', function () {
    run({
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/78.0.3904.108 Chrome/78.0.3904.108 Safari/537.36',
      platform: 'Linux x86_64'
    })
  })

  it('detects on Ubuntu FF', function () {
    run({
      userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0',
      platform: 'Linux x86_64'
    })
  })

  it('detects on ChromeOS Chrome', function () {
    run({
      userAgent: 'Mozilla/5.0 (X11; CrOS armv7l 10895.56.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.131 Safari/537.36',
      platform: 'Linux armv7l',
      debug: true
    })
  })
})

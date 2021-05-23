"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linux = exports.windows = exports.macos = exports.ios = exports.android = void 0;
var underscore = /_/g;
var androidVersions = [['Android 11', /^11.*$/], ['Android 10', /^10.*$/], ['Pie', /^9.*$/], ['Oreo', /^8.+$/], ['Nougat', /^7.+$/], ['Marshmallow', /^6.+$/], ['Lollipop', /^5.+$/], ['KitKat', /^4.4.*$/], ['Jelly Bean', /^4.[1-3].*$/], ['Ice Cream Sandwich', /^4.0.*$/], ['Honeycomb', /^3.+$/], ['Gingerbread', /^2.3.*$/], ['FroYo', /^2.2.*/], ['Eclair', /^2.[0-1].*$/], ['Donut', /^1.6.*$/], ['Cupcake', /^1.5.*$/], ['Petit Four', /^1.1.*$/]];
var android = {
  os: 'android',
  platform: /android.*|aarch64|arm.*/i,
  agent: /(?:android|adr) (\d+([._]\d+)*)/i,
  isMobile: function isMobile() {
    return true;
  },
  version: function version(_ref) {
    var _ref$userAgent = _ref.userAgent,
        userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
    var match = userAgent.match(android.agent);
    return match && match[1];
  },
  name: function name(_ref2) {
    var _ref2$version = _ref2.version,
        version = _ref2$version === void 0 ? '' : _ref2$version;
    var found = androidVersions.find(function (entry) {
      return entry[1].test(version);
    });
    return found && found[0];
  },
  arch: function arch(_ref3) {
    var _ref3$platform = _ref3.platform,
        platform = _ref3$platform === void 0 ? '' : _ref3$platform,
        _ref3$userAgent = _ref3.userAgent,
        userAgent = _ref3$userAgent === void 0 ? '' : _ref3$userAgent;

    if (platform.toLowerCase().includes('aarch64')) {
      return 'aarch64';
    }

    var match = userAgent.match(/armv.*;/i);
    return match && match.find(function (entry) {
      return entry.includes('armv');
    });
  }
};
exports.android = android;
var ios = {
  os: 'ios',
  platform: /(?:iphone|ipod|ipad|Pike v.*)/i,
  agent: /os ((\d+[._])+\d+) like mac os x/i,
  isMobile: function isMobile() {
    return true;
  },
  version: function version(_ref4) {
    var _ref4$userAgent = _ref4.userAgent,
        userAgent = _ref4$userAgent === void 0 ? '' : _ref4$userAgent;
    var match = userAgent.match(ios.agent);
    return match && match[1] && match[1].replace(underscore, '.');
  },
  name: function name() {
    return undefined;
  },
  arch: function arch() {
    return undefined;
  }
};
exports.ios = ios;
var macosVersions = [['Catalina', /^10.15.*$/], ['Mojave', /^10.14.*$/], ['High Sierra', /^10.13.*$/], ['Sierra', /^10.12.*$/], ['El Capitan', /^10.11.*$/], ['Yosemite', /^10.10.*$/], ['Mavericks', /^10.9.*$/], ['Mountain Lion', /^10.8.*$/], ['Lion', /^10.7.*$/], ['Snow Leopard', /^10.6.*$/], ['Leopard', /^10.5.*$/], ['Tiger', /^10.4.*$/], ['Panther', /^10.3.*$/], ['Jaguar', /^10.2.*$/], ['Puma', /^10.1.*$/], ['Cheetah', /^10.0.*$/]];
var macos = {
  os: 'macos',
  platform: /mac.*/i,
  agent: /os x ((\d+[._])+\d+)\b/i,
  isMobile: function isMobile() {
    return false;
  },
  arch: function arch() {
    return undefined;
  },
  version: function version(_ref5) {
    var _ref5$userAgent = _ref5.userAgent,
        userAgent = _ref5$userAgent === void 0 ? '' : _ref5$userAgent;
    var match = userAgent.match(macos.agent);
    return match && match[1] && match[1].replace(underscore, '.');
  },
  name: function name(_ref6) {
    var version = _ref6.version;
    var found = macosVersions.find(function (entry) {
      return entry[1].test(version);
    });
    return found && found[0];
  }
};
exports.macos = macos;
var windows = {
  os: 'windows',
  platform: /win.*/i,
  agent: /win(?:dows)?(?: phone)?[ _]?(?:(?:nt|9x) )?((?:(\d+\.)*\d+)|xp|me|ce)\b/i,
  isMobile: function isMobile(_ref7) {
    var _ref7$userAgent = _ref7.userAgent,
        userAgent = _ref7$userAgent === void 0 ? '' : _ref7$userAgent;
    return userAgent.toLowerCase().indexOf('windows phone') > -1;
  },
  arch: function arch(_ref8) {
    var platform = _ref8.platform,
        userAgent = _ref8.userAgent;

    if (platform === 'win64') {
      return '64';
    } // useragent
    // WOW64
    // Win64

  },
  name: function name() {
    return undefined;
  },
  version: function version(_ref9) {
    var _ref9$userAgent = _ref9.userAgent,
        userAgent = _ref9$userAgent === void 0 ? '' : _ref9$userAgent;
    var match = userAgent.match(windows.agent);
    var v;

    if (match && match[1]) {
      switch (match[1]) {
        case '6.4':
        case '10.0':
          // some versions of Firefox mistakenly used 6.4
          v = '10.0';
          break;

        case '6.3':
        case '8.1':
          v = '8.1';
          break;

        case '6.2':
        case '8.0':
          v = '8';
          break;

        case '6.1':
        case '7.0':
          v = '7';
          break;

        case '6.0':
          v = 'Vista';
          break;

        case '5.2':
          v = 'Server 2003';
          break;

        case '5.1':
          v = 'XP';
          break;

        case '5.01':
          v = '2000 SP1';
          break;

        case '5.0':
          v = '2000';
          break;

        case '4.0':
          v = '4.0';
          break;

        default:
          // nothing
          break;
      }
    }

    return v;
  }
};
exports.windows = windows;
var linux = {
  os: 'linux',
  isMobile: function isMobile(_ref10) {
    var _ref10$userAgent = _ref10.userAgent,
        userAgent = _ref10$userAgent === void 0 ? '' : _ref10$userAgent;
    return userAgent.toLowerCase().indexOf('mobi') > -1;
  },
  platform: /(?:linux.*)/i,
  agent: /(?!.*android.*)(linux|x11|ubuntu)/i,
  arch: function arch(_ref11) {
    var _ref11$platform = _ref11.platform,
        platform = _ref11$platform === void 0 ? '' : _ref11$platform;

    if (platform.indexOf('i686') > -1) {
      return '32';
    }

    if (platform.indexOf('x86_64') > -1) {
      return '64';
    }
  },
  name: function name() {
    return undefined;
  },
  version: function version() {
    return undefined;
  }
};
exports.linux = linux;
//# sourceMappingURL=platforms.js.map
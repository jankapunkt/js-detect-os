"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _platforms = require("./platforms");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var allPlatforms = [_platforms.android, _platforms.windows, _platforms.ios, _platforms.macos, _platforms.linux];

function isPlatform(target) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$strict = _ref.strict,
      strict = _ref$strict === void 0 ? true : _ref$strict,
      _ref$navigator = _ref.navigator,
      navigator = _ref$navigator === void 0 ? window.navigator : _ref$navigator;

  var platform = navigator.platform,
      userAgent = navigator.userAgent;
  var platformMatch = target.platform.test(platform);
  var agentMatch = target.agent.test(userAgent);
  return strict ? platformMatch && agentMatch : platformMatch || agentMatch;
}

var OSDetector = /*#__PURE__*/function () {
  function OSDetector() {
    _classCallCheck(this, OSDetector);

    this.detected = {
      os: undefined,
      isMobile: undefined,
      name: undefined,
      version: undefined,
      ram: undefined,
      cpuCount: undefined,
      platform: undefined,
      userAgent: undefined
    };
  }

  _createClass(OSDetector, [{
    key: "detect",
    value: function detect() {
      var navigator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.navigator;
      // always assign navigator values
      var userAgent = navigator.userAgent;
      var platform = navigator.platform;
      this.detected.userAgent = userAgent;
      this.detected.platform = platform;
      this.detected.ram = navigator.deviceMemory;
      this.detected.cpuCount = navigator.hardwareConcurrency;
      var found = allPlatforms.find(function (target) {
        return isPlatform(target, {
          strict: true,
          navigator: navigator
        });
      });

      if (!found) {
        found = allPlatforms.find(function (target) {
          return isPlatform(target, {
            strict: false,
            navigator: navigator
          });
        });
      }

      if (!found) {
        this.detected.name = 'unknown';
      } else {
        this.detected.os = found.os;
        this.detected.version = found.version({
          userAgent: userAgent,
          platform: platform
        });
        this.detected.isMobile = found.isMobile({
          userAgent: userAgent,
          platform: platform,
          version: this.detected.version
        });
        this.detected.name = found.name({
          userAgent: userAgent,
          platform: platform,
          version: this.detected.version
        });
      }

      return this.detected;
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      return this.detected.isMobile;
    }
  }, {
    key: "os",
    value: function os() {
      return this.detected.os;
    }
  }, {
    key: "platform",
    value: function platform() {
      return this.detected.platform;
    }
  }, {
    key: "userAgent",
    value: function userAgent() {
      return this.detected.userAgent;
    }
  }, {
    key: "name",
    value: function name() {
      return this.detected.name;
    }
  }, {
    key: "version",
    value: function version() {
      return this.detected.version;
    }
  }, {
    key: "ram",
    value: function ram() {
      return this.detected.ram;
    }
  }, {
    key: "cpuCount",
    value: function cpuCount() {
      return this.detected.cpuCount;
    }
  }], [{
    key: "types",
    get: function get() {
      return {
        android: _platforms.android,
        ios: _platforms.ios,
        linux: _platforms.linux,
        macos: _platforms.macos,
        windows: _platforms.windows
      };
    }
  }]);

  return OSDetector;
}();

var _default = OSDetector;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
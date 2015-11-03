(function() {
  'use strict';

  /**
   * Hi! Thanks for using XSplit JS Framework :)
   *
   * XSplit JS Framework exposes useful methods to work with XSplit without 
   * fiddling too much with the raw core methods exposed to JavaScript, which 
   * makes developing plugins for XSplit a lot easier.
   *
   * To get started, you just have to require our library:
   * var xjs = require('xjs');
   *
   * You can read more about it at our documentation:
   * http://xjsframework.github.io/quickstart.html
   * http://xjsframework.github.io/tutorials.html
   * http://xjsframework.github.io/api.html
   */
  var xjs = require('xjs');
  var Item = xjs.Item;
  var Rectangle = xjs.Rectangle;

  /* Key code mappings (wParam)
   * In the event that two keys share the same wparam, we use an array where
   * arr[1] refers to the key sending lParam with bit 24 = 1 (extended key)
   *
   * For more details on the keyboard hook parameters, check the following link:
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms646280(v=vs.85).aspx
   */
  var wparamMap = {
    8   : 'Backspace',
    9   : 'Tab',
    12  : 'Num5', // VK_CLEAR. Sent when Num5 is pressed with NumLock off. 
    13  : ['Enter', 'NumEnter'],
    19  : 'Pause',
    20  : 'CapsLock',
    27  : 'Esc',
    32  : 'Space',
    33  : ['Num9', 'PageUp'],
    34  : ['Num3', 'PageDown'],
    35  : ['Num1', 'End'],
    36  : ['Num7', 'Home'],
    37  : ['Num4', 'Left'],
    38  : ['Num8', 'Up'],
    39  : ['Num6', 'Right'],
    40  : ['Num2', 'Down'],
    44  : 'PrtScr',
    45  : ['Num0', 'Insert'],
    46  : ['NumDecimal', 'Delete'],
    48  : '0',
    49  : '1',
    50  : '2',
    51  : '3',
    52  : '4',
    53  : '5',
    54  : '6',
    55  : '7',
    56  : '8',
    57  : '9',
    65  : 'A',
    66  : 'B',
    67  : 'C',
    68  : 'D',
    69  : 'E',
    70  : 'F',
    71  : 'G',
    72  : 'H',
    73  : 'I',
    74  : 'J',
    75  : 'K',
    76  : 'L',
    77  : 'M',
    78  : 'N',
    79  : 'O',
    80  : 'P',
    81  : 'Q',
    82  : 'R',
    83  : 'S',
    84  : 'T',
    85  : 'U',
    86  : 'V',
    87  : 'W',
    88  : 'X',
    89  : 'Y',
    90  : 'Z',
    91  : 'LCommand',
    92  : 'RCommand',
    93  : 'Menu',
    96  : 'Num0',
    97  : 'Num1',
    98  : 'Num2',
    99  : 'Num3',
    100 : 'Num4',
    101 : 'Num5',
    102 : 'Num6',
    103 : 'Num7',
    104 : 'Num8',
    105 : 'Num9',
    106 : 'Multiply',
    107 : 'Add',
    109 : 'Subtract',
    110 : 'NumDecimal',
    111 : 'Divide',
    112 : 'F1',
    113 : 'F2',
    114 : 'F3',
    115 : 'F4',
    116 : 'F5',
    117 : 'F6',
    118 : 'F7',
    119 : 'F8',
    120 : 'F9',
    121 : 'F10',
    122 : 'F11',
    123 : 'F12',
    144 : 'NumLock',
    145 : 'ScrollLock',
    160 : 'LShift',
    161 : 'RShift',
    162 : 'LCtrl',
    163 : 'RCtrl',
    164 : 'LAlt',
    165 : 'RAlt',
    186 : ';',
    187 : '=',
    188 : ',',
    189 : '-',
    190 : '.',
    191 : '/',
    192 : '`',
    219 : '[',
    220 : 'Backslash',
    221 : ']',
    222 : 'Quote'
  };

  // Mouse scroll direction constants
  var mouseScroll = {
    UP : '7864320',
    DOWN : '4287102976' // -7864320
  };

  var MOUSE_SCROLL_TIMEOUT = 150;

  // hook message constants
  var HOOK_MESSAGE_TYPE = {
    WM_KEYDOWN    : 0x0100,
    WM_KEYUP    : 0x0101,
    WM_SYSKEYDOWN : 0x0104,
    WM_SYSKEYUP   : 0x0105,
    WM_LBUTTONDOWN  : 0x0201,
    WM_LBUTTONUP  : 0x0202,
    WM_MOUSEMOVE  : 0x0200,
    WM_MOUSEWHEEL : 0x020A,
    WM_MOUSEHWHEEL  : 0x020E,
    WM_RBUTTONDOWN  : 0x0204,
    WM_RBUTTONUP  : 0x0205,
    WM_MBUTTONDOWN  : 0x0207,
    WM_MBUTTONUP  : 0x0208
  };

  // Key Visualizer class
  var KeystrokeVisualizer = function() {
    this.mouseScrollUpTimeout = null;
    this.mouseScrollDownTimeout = null;
  };

  KeystrokeVisualizer.prototype.init = function() {
    this.keyMap = {};
    this.mouseMap = {
      mouse_left : null,
      mouse_right : null,
      mouse_middle : null,
      mouse_scroll_up : null,
      mouse_scroll_down : null
    };

    for (var keys in wparamMap) {
      var mapped = wparamMap[keys];
      if (Array.isArray(mapped)) {
        mapped.forEach(function(mappedKey) {
          this.keyMap[mappedKey] = $('.key[code=\'' + mappedKey + '\']');
        }.bind(this));
      } else {
        this.keyMap[keys] = $('.key[code=\'' + mapped + '\']'); 
      }
    }

    for (var button in this.mouseMap) {
      this.mouseMap[button] = $('#' + button); 
    }

    // TODO: finalize general method to use DLLs
    window.external.CallDll('xsplit.HookSubscribe');
    window.OnDllOnInputHookEvent = this.readHookEvent.bind(this);
  };

  KeystrokeVisualizer.prototype.readHookEvent = function(msg, wparam, lparam) {
    // identify message type
    switch (parseInt(msg)) {
      case HOOK_MESSAGE_TYPE.WM_KEYDOWN:
      case HOOK_MESSAGE_TYPE.WM_SYSKEYDOWN:
        this.handleKeydown(wparam, lparam);
        break;
      case HOOK_MESSAGE_TYPE.WM_KEYUP:
      case HOOK_MESSAGE_TYPE.WM_SYSKEYUP:
        this.handleKeyup(wparam, lparam);
        break;
      case HOOK_MESSAGE_TYPE.WM_LBUTTONDOWN:
        this.handleMousedown(this.mouseMap.mouse_left);
        break;
      case HOOK_MESSAGE_TYPE.WM_RBUTTONDOWN:
        this.handleMousedown(this.mouseMap.mouse_right);
        break;
      case HOOK_MESSAGE_TYPE.WM_MBUTTONDOWN:
        this.handleMousedown(this.mouseMap.mouse_middle);
        break;
      case HOOK_MESSAGE_TYPE.WM_LBUTTONUP:
        this.handleMouseup(this.mouseMap.mouse_left);
        break;
      case HOOK_MESSAGE_TYPE.WM_RBUTTONUP:
        this.handleMouseup(this.mouseMap.mouse_right);
        break;
      case HOOK_MESSAGE_TYPE.WM_MBUTTONUP:
        this.handleMouseup(this.mouseMap.mouse_middle);
        break;
      case HOOK_MESSAGE_TYPE.WM_MOUSEWHEEL:
        this.handleMousescroll(wparam);
        break;
      default:
        break;
    }
  }

  KeystrokeVisualizer.prototype.handleKeydown = function(wparam, lparam) {
    if (Array.isArray(wparamMap[wparam])) {
      if ((parseInt(lparam) & 0x01000000) === 0x01000000) {
        this.keyMap[wparamMap[wparam][1]].addClass('activated');
      } else {
        this.keyMap[wparamMap[wparam][0]].addClass('activated');
      }
    } else {
      this.keyMap[wparam].addClass('activated');
    }
  }

  KeystrokeVisualizer.prototype.handleKeyup = function(wparam, lparam) {
    // extra handling for any extended keys
    if (Array.isArray(wparamMap[wparam])) {
      if ((parseInt(lparam) & 0x01000000) === 0x01000000) {
        this.keyMap[wparamMap[wparam][1]].removeClass('activated');
      } else {
        this.keyMap[wparamMap[wparam][0]].removeClass('activated');
      }
    } else {
      this.keyMap[wparam].removeClass('activated');
    }
  };

  KeystrokeVisualizer.prototype.handleMousedown = function(button) {
    button.addClass('activated');
  };

  KeystrokeVisualizer.prototype.handleMouseup = function(button) {
    button.removeClass('activated');
  };

  KeystrokeVisualizer.prototype.handleMousescroll = function(direction) {
    if (direction === mouseScroll.UP) {
      clearTimeout(this.mouseScrollUpTimeout);
      this.mouseScrollUpTimeout = setTimeout(function() {
        this.mouseMap.mouse_scroll_up.removeClass('activated');
      }.bind(this), this.MOUSE_SCROLL_TIMEOUT);
      this.mouseMap.mouse_scroll_up.addClass('activated');
    } else if (direction === mouseScroll.DOWN) {
      clearTimeout(this.mouseScrollDownTimeout);
      this.mouseScrollDownTimeout = setTimeout(function() {
        this.mouseMap.mouse_scroll_down.removeClass('activated');
      }.bind(this), this.MOUSE_SCROLL_TIMEOUT);
      this.mouseMap.mouse_scroll_down.addClass('activated');
    }
  };

  // XBC interaction begins here
  xjs.ready().then(Item.getCurrentSource).then(function(item) {
    // use whole stage for source
    return item.setPosition(Rectangle.fromCoordinates(0, 0, 1, 1));
  }).then(function(item) {
    return item.setKeepLoaded(true);
  }).then(function(item) {
    return item.setPositionLocked(true);
  }).then(function(item) {
    return item.setBrowserCustomSize(xjs.Rectangle.fromDimensions(1920, 1019));
  }).then(function(item) {
    // initialize keyboard
    var keyboard = new KeystrokeVisualizer();
    keyboard.init();

    var sections = {
      func    : $('[data-section=function]'),
      alpha   : $('[data-section=alpha]'),
      system  : $('[data-section=scroll]'),
      nav     : $('[data-section=navigation]'),
      arrow   : $('[data-section=arrow]'),
      numpad  : $('[data-section=numpad]'),
      mouse   : $('[data-section=mouse]')
    };

    xjs.SourcePluginWindow.getInstance().on('save-config', function(config) {
      item.saveConfig(config);
      // apply configuration
      for (var i in config) {
        if (sections[i] !== undefined && config[i] === false) {
          sections[i].addClass('hidden');
        } else {
          sections[i].removeClass('hidden');
        }
      }
    });
  });
})();

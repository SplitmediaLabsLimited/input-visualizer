/* globals require, $ */

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
  var Item = xjs.Source;
  var myItem;
  var dll = xjs.Dll;
  var Rectangle = xjs.Rectangle;
  var tempConfig = {};

  var whichItem = '';

  var allKey = document.getElementById('allItems');
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
    var _this = this;
    this.keyMap = {};
    this.mouseMap = {
      mouse_left : null,
      mouse_right : null,
      mouse_middle : null,
      mouse_scroll_up : null,
      mouse_scroll_down : null
    };

    var mapKeyFunction = function(mappedKey) {
      this.keyMap[mappedKey] = $('.key[code=\'' + mappedKey + '\']');
    }.bind(this);

    for (var keys in wparamMap) {
      var mapped = wparamMap[keys];
      if (Array.isArray(mapped)) {
        mapped.forEach(mapKeyFunction);
      } else {
        this.keyMap[keys] = $('.key[code=\'' + mapped + '\']');
      }
    }

    for (var button in this.mouseMap) {
      this.mouseMap[button] = $('#' + button);
    }

    // TODO: finalize general method to use DLLs
    dll.load(['Scriptdlls\\SplitMediaLabs\\XjsEx.dll']);
    dll.on('access-granted', function() {
      window.OnDllOnInputHookEvent = _this.readHookEvent.bind(_this);
      dll.callEx('xsplit.HookSubscribe').then(function(){}).catch(function(err){});
      // location.reload();
    });

    dll.on('access-revoked', function() {
      window.OnDllOnInputHookEvent = function(){};
      // location.reload();
    });

    dll.isAccessGranted().then(function(isGranted){
      if (isGranted) {
        window.OnDllOnInputHookEvent = _this.readHookEvent.bind(_this);
        dll.callEx('xsplit.HookSubscribe').then(function(){}).catch(function(err){});
      } else {
        window.OnDllOnInputHookEvent = function(){};
      }
    });
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
  };

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
  };

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
      }.bind(this), MOUSE_SCROLL_TIMEOUT);
      this.mouseMap.mouse_scroll_up.addClass('activated');
    } else if (direction === mouseScroll.DOWN) {
      clearTimeout(this.mouseScrollDownTimeout);
      this.mouseScrollDownTimeout = setTimeout(function() {
        this.mouseMap.mouse_scroll_down.removeClass('activated');
      }.bind(this), MOUSE_SCROLL_TIMEOUT);
      this.mouseMap.mouse_scroll_down.addClass('activated');
    }
  };

  // jQuery UI interactions
  var initPositionX;
  var initPositionY;
  var initPointerX;
  var initPointerY;
  var initZoom;
  var axis;
  var stopY;
  var stopX;
  var elemname;

  function getTempVal(elem) {
    return {
      height: $('#' + elem).css('height'),
      width: $('#' + elem).css('width'),
      top: $('#' + elem).css('top'),
      left: $('#' + elem).css('left')
    };
  }

  function adjustFont($element) {
    var theHeight = parseInt($element.css('height'));

    if ($element.is('#mouse')) {
      $element.css('font-size', (theHeight * 0.06) + 'px');
    }

    if ($element.is('#scroll')) {
      $element.css('font-size', (theHeight * 0.19) + 'px');
    }

    if ($element.is('#function')) {
      $element.css('font-size', (theHeight * 0.25) + 'px');
    }

    if ($element.is('#navigation') || $element.is('#arrow')) {
      $element.css('font-size', (theHeight * 0.12) + 'px');
    }

    if ($element.is('#numpad') || $element.is('#alpha')) {
      $element.css('font-size', (theHeight * 0.045) + 'px');
    }
  }

  $('[data-section]').draggable({
    containment: 'window',
    start: function(event, ui) {
      //SET INITIAL POSITION HERE-------------
      initPositionX = ui.position.left;
      initPositionY = ui.position.top;
      initPointerX = event.pageX;
      initPointerY = event.pageY;
    },
    drag: function(event, ui) {
      var $element = $(this);

      var zoom = parseFloat($element.css('zoom'));

      var offsetX = (event.pageX - initPointerX);
      var offsetY = (event.pageY - initPointerY);

      // adjust for zoom
      ui.position.top = Math.round(initPositionY + offsetY / zoom);
      ui.position.left = Math.round(initPositionX + offsetX / zoom);

      // adjust for boundaries
      if (ui.position.left < 0) {
        ui.position.left = 0;
      }
      if (zoom * (ui.position.left + $element.width()) >
        document.body.offsetWidth) {
          ui.position.left = (document.body.offsetWidth -
            zoom * $element.width()) / zoom;
      }
      if (ui.position.top < 0) {
        ui.position.top = 0;
      }
      if (zoom * (ui.position.top + $element.height()) >
        document.body.offsetHeight) {
          ui.position.top = (document.body.offsetHeight -
           zoom * $element.height()) / zoom;
      }

        //Get positions based on ID
        whichItem = ui.helper.context.id;

        for (var c in getTempVal(whichItem)) {
          elemname = whichItem + '_' + c;
          tempConfig[elemname] = getTempVal(whichItem)[c];
        }
      
    }
  }).resizable({
    aspectRatio: true,
    handles: 'all',
    minWidth: 50,
    maxHeight: 1019,
    maxWidth: 1920,
    start: function(event, ui) {
      initZoom = $(this).attr('data-zoom');
      initPositionX = ui.position.left;
      initPositionY = ui.position.top;
      initPointerX = event.pageX;
      initPointerY = event.pageY;
      stopY = 0;
      stopX = 0;
      // Gets the axis that the user is dragging. 'se', 'n', etc.
      axis = $(ui.element).data('ui-resizable').axis;
    },
    resize: function(event, ui) {

      // ui.element is data section
      var $element = ui.element;

      // //disable interaction if element is at maximum width
      // if ($element.width() >= ($(window).width() + 2)) {
      //   $(this).resizable('widget').trigger('mouseup');
      //   var overlapX = $element.width() - ($(window).width() + 2);
      //   $element.css('width', $element.width() - overlapX);
      // }

      // //disable interaction if element is at maximum height
      // if ($element.height() >= ($(window).height() + 2)) {
      //   $(this).resizable('widget').trigger('mouseup');
      //   var overlapY = $element.height() - ($(window).height() + 2);
      //   $element.css('height', $element.height() - overlapY);
      // }

      if (parseInt($element.css('top')) < 0) {
        ui.position.top = 0;
        $(this).resizable('widget').trigger('mouseup');
      }

      if (parseInt($element.css('left')) < 0) {
        ui.position.left = 0;
        $(this).resizable('widget').trigger('mouseup');
      }

      adjustFont($element);

      if (($element.width() + ui.position.left - 5) > $(window).width()) {

        if (ui.position.left <= 0) {
          $(this).resizable('widget').trigger('mouseup');
        }

        var extendX = (ui.position.left + $element.width()) - $(window).width();
        ui.position.left = ui.position.left - (extendX);
      }

      if (($element.height() + ui.position.top - 5) > $(window).height()) {
        if (ui.position.top <= 0) {
          $(this).resizable('widget').trigger('mouseup');
        }
        var extendY = (ui.position.top + $element.height()) - $(window).height();
        ui.position.top = ui.position.top - extendY;

        // $(this).resizable('widget').trigger('mouseup');
        /*
        if (axis === 'e') {
          $(ui.element).data('ui-resizable').axis = 'ne';
        }

        if (axis === 'w') {
          $(ui.element).data('ui-resizable').axis = 'nw';
          axis = 'nw';
        } */

      }

      for (var c in getTempVal($element[0].id)) {
        elemname = $element[0].id + '_' + c;
        tempConfig[elemname] = getTempVal($element[0].id)[c];
      }
    }
  });

  // XBC interaction begins here
  xjs.ready().then(Item.getCurrentSource).then(function(item) {
    myItem = item;
    return item.loadConfig();
  }).then(function(config) {
    if (Object.keys(config).length > 0) {
      try{
        throw new Error();
      } catch(e){
      // handle
        throw e; // or a wrapper over e so we know it wasn't handled
      }
    } else {
      return myItem.setName('Input Visualizer');
    }
  }).then(function(item) {
    return item.setKeepAspectRatio(false);
  }).then(function(item) {
    return item.setKeepLoaded(true);
  }).then(function(item) {
    return item.setBrowserCustomSize(xjs.Rectangle.fromDimensions(1920, 1019));
  }).then(function(item) {
    return item.setPositionLocked(true);
  }).then(function(item) {
    // use whole stage for source
    return item.setPosition(Rectangle.fromCoordinates(0, 0, 1, 1));
  }).then(function(item) {
    initializePlugin();
  }).catch(function() {
    initializePlugin();
  });

  var initializePlugin = function() {
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
      mouse   : $('[data-section=mouse]'),
    };

    var updateHTML = function(config, isInitial) {
      if (!config.hasOwnProperty('opacity')) {
        config.opacity = 100;
      }
      if (!config.hasOwnProperty('glowcolor')) {
        config.glowcolor = '#FFFFFF';
      }
      if (!config.hasOwnProperty('bordercolor')) {
        config.bordercolor = '#FFFFFF';
      }

      if (config.hasOwnProperty('lock')) {
        toggleLockComponents(config.lock);
      } else {
        toggleLockComponents(false);
      }

      var opacVal = config.opacity / 100;
      for (var i in config) {
          if (sections[i] !== undefined) {
            if (config[i] === false) {
              sections[i].addClass('hidden');
            } else {
              sections[i].removeClass('hidden');
            }
            sections[i].css('opacity', opacVal);
          }
      }

      if (typeof isInitial !== 'undefined' && isInitial) {
        for (var a in sections) {
          if (sections[a] !== undefined) {
            for (var c in getTempVal(sections[a][0].id)) {
              elemname = sections[a][0].id + '_' + c;
             $('#' + sections[a][0].id).css(c, config[elemname]);
             tempConfig[elemname] = config[elemname];
            }
            adjustFont(sections[a]);
          }
        }
      }

      $('#customCSS').remove();
      var hexvalg = hexToRgb(config.glowcolor).g;
      var hexvalr = hexToRgb(config.glowcolor).r;
      var hexvalb = hexToRgb(config.glowcolor).b;
      $('head').append('<style id="customCSS"> ' +
        '.glow.activated { ' +
          'background: radial-gradient(rgba(' + hexvalr +
       ', ' + hexvalg + ', ' + hexvalb + ', .8) 5%,' +
          'rgba(255, 255, 255, 0) 60%); }' +
        '</style>');
      $('#mouse > div:nth-child(1)').css({'border-color': config.bordercolor, 'box-shadow': '0 5px 5px ' + config.bordercolor});
      $('#mouse_left').css({'border-color': config.bordercolor, 'box-shadow': '0 5px 5px -5px ' + config.bordercolor});
      $('#mouse_middle').css({'border-color': config.bordercolor, 'box-shadow': '0 0 5px ' + config.bordercolor});
      $('#mouse_right').css({'border-color': config.bordercolor, 'box-shadow': '0 5px 5px -5px ' + config.bordercolor});
      $('.key').css({'border-color': config.bordercolor, 'box-shadow': '0 0 5px ' + config.bordercolor});

      if (typeof isInitial !== 'undefined' && isInitial) {
        setTimeout(function()
        {
          document.querySelector('html').style.visibility = 'visible';
        }, 100);
      }
    };

    //Apply config on Load
    myItem.loadConfig().then(function(config) {
      updateHTML(config, true);
    });

    //Update and Save config with new coordinates or sizes every mouse-up
    allKey.addEventListener('mouseup',function (){
        myItem.loadConfig().then(updateData);
      });

    //Apply config on Save
    xjs.SourcePluginWindow.getInstance().on('save-config', function(config) {
      updateHTML(config);
      updateData(config);
    });

    //Merge config to tempConfig that holds the positions then save
    var updateData = function(config) {
      for (var i in tempConfig){
        config[i] = tempConfig[i];
      }
      myItem.saveConfig(config);
    };

    var hexToRgb = function(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
    };

    var toggleLockComponents = function(locked) {
      var lockValue;
      if (locked) {
        lockValue = 'disable';
      } else {
        lockValue = 'enable';
      }
      $('[data-section]').draggable(lockValue).resizable(lockValue);
    };
  };
})();

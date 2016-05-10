(function() {
  'use strict';

    document.onselectstart = function(event)
    {
      var nodeName = event.target.nodeName;
      if (nodeName === "INPUT" || nodeName === "TEXTAREA" || nodeName === "XUI-INPUT" || nodeName === "XUI-SLIDER")
      {
        return true;
      }
      else
      {
        return false;
      }
    };
    document.onkeydown = function(event){
      if ((event.target || event.srcElement).nodeName !== 'INPUT' &&
        (event.target || event.srcElement).nodeName !== 'TEXTAREA' &&
        (event.target || event.srcElement).nodeName !== 'XUI-SLIDER' &&
        (event.target || event.srcElement).nodeName !== 'XUI-INPUT' &&
        (event.target || event.srcElement).nodeName !== 'XUI-COLORPICKER' &&
        (event.target || event.srcElement).contentEditable !== true)
      {
        if (event.keyCode == 8)
        return false;
      }
    };
    document.oncontextmenu = function(){ return false; };

  var xjs = require('xjs'),
      Item = xjs.Source,
      SourcePropsWindow = xjs.SourcePropsWindow;

  var currentSource;
  var temp = true;

  var closeBtn = document.getElementById('done');
  var selectTextColor = document.getElementById('textcolor');
  var selectBorderColor = document.getElementById('bordercolor');
  var selectGlowColor = document.getElementById('glowcolor');
  var opacitySlider = document.getElementById('opacitySlider');
  var lockCheck = document.getElementById('lock');

  var elements = {
    func     : document.getElementById('function'),
    alpha    : document.getElementById('alpha'),
    system   : document.getElementById('system'),
    nav      : document.getElementById('nav'),
    arrow    : document.getElementById('arrow'),
    numpad   : document.getElementById('numpad'),
    mouse    : document.getElementById('mouse'),
    keyboard : document.getElementById('keyboard'),
  };

  var updateElements = function(config) {
    if (config.func === true || config.func === "true") {
      config.func = true;
      elements.func.checked = true;
    } else {
      config.func = false;
    }

    if (config.alpha === true || config.alpha === "true") {
      config.alpha = true;
      elements.alpha.checked = true;
    } else {
      config.alpha = false;
    }

    if (config.system === true || config.system === "true") {
      config.system = true;
      elements.system.checked = true;
    } else {
      config.system = false;
    }

    if (config.nav === true || config.nav === "true") {
      config.nav = true;
      elements.nav.checked = true;
    } else {
      config.nav = false;
    }

    if (config.arrow === true || config.arrow === "true") {
      config.arrow = true;
      elements.arrow.checked = true;
    } else {
      config.arrow = false;
    }

    if (config.numpad === true || config.numpad === "true") {
      config.numpad = true;
      elements.numpad.checked = true;
    } else {
      config.numpad = false;
    }

    if (config.mouse === true || config.mouse === "true") {
      config.mouse = true;
      elements.mouse.checked = true;
    }

    if (config.lock === true || config.lock === "true") {
      lockCheck.checked = true;
    }

    if (config.keyboard === true || config.keyboard === "true") {
      elements.keyboard.checked = true;
      if (temp === true){
        elements.numpad.checked = true;
        elements.arrow.checked = true;
        elements.nav.checked = true;
        elements.system.checked = true;
        elements.alpha.checked = true;
        elements.func.checked = true;
        temp = false;
      }
    }

    if (config.keyboard === false || config.keyboard === "false") {
      elements.keyboard.checked = false;
      if (temp === false){
        elements.numpad.checked = false;
        elements.arrow.checked = false;
        elements.nav.checked = false;
        elements.system.checked = false;
        elements.alpha.checked = false;
        elements.func.checked = false;
        temp = true;
      }
    }

    if ((config.func === false)||(config.alpha === false)||(config.system === false)||(config.nav === false)||(config.arrow === false)||(config.numpad === false)){
      elements.keyboard.checked = false;
      temp = true;
    }

    if ((config.func === true)&&(config.alpha === true)&&(config.system === true)&&(config.nav === true)&&(config.arrow === true)&&(config.numpad === true)){
      elements.keyboard.checked = true;
      temp = false;
    }
  };

  var updateConfig = function(item) {
    var textColor = selectTextColor.getAttribute('value');
    var borderColor = selectBorderColor.getAttribute('value');
    var glowColor = selectGlowColor.getAttribute('value');
    var opacityValue = opacitySlider.getAttribute('value');
    
    var config = {
      func    : elements.func.checked,
      alpha   : elements.alpha.checked,
      system  : elements.system.checked,
      nav     : elements.nav.checked,
      arrow   : elements.arrow.checked,
      numpad  : elements.numpad.checked,
      mouse   : elements.mouse.checked,
      keyboard: elements.keyboard.checked,
      lock: lockCheck.checked,
      textcolor   : textColor,
      bordercolor   : borderColor,
      glowcolor   : glowColor,
      opacity   : opacityValue,
    };
    updateElements(config);
    item.requestSaveConfig(config);
  };

  xjs.ready().then(function() {
    var configWindow =  SourcePropsWindow.getInstance();
    configWindow.useTabbedWindow({
      customTabs: ['Keyboard/Mouse'],
      tabOrder: ['Keyboard/Mouse', 'Color', 'Layout', 'Transition']
    });

    return Item.getCurrentSource();
  }).then(function(myItem) {
    currentSource = myItem;

    function changeTextColor() {
      myItem.requestSaveConfig({ 'textcolor': selectTextColor.value });
      updateConfig(currentSource);
    }

    function changeBorderColor() {
      myItem.requestSaveConfig({ 'bordercolor': selectBorderColor.value });
      updateConfig(currentSource);
    }

    function changeGlowColor() {
      myItem.requestSaveConfig({ 'glowcolor': selectGlowColor.value });
      updateConfig(currentSource);
    }

    function changeOpacity() {
      myItem.requestSaveConfig({ 'opacity': opacitySlider.value });
      updateConfig(currentSource);
    }

    selectTextColor.addEventListener('set', function(event) {
      changeTextColor();
    });

    selectBorderColor.addEventListener('set', function(event) {
      changeBorderColor();
    });

    selectGlowColor.addEventListener('set', function(event) {
      changeGlowColor();
    });

    opacitySlider.addEventListener('set', function(event) {
      changeOpacity();
    });

    return currentSource.loadConfig();
  }).then(function(config) {
    // load last saved configuration
    // initialize to Show if no configuration set yet
    config = {
      func    : config.func !== undefined ? config.func : true,
      alpha   : config.alpha !== undefined ? config.alpha : true,
      system  : config.system !== undefined ? config.system : true,
      nav     : config.nav !== undefined ? config.nav : true,
      arrow   : config.arrow !== undefined ? config.arrow : true,
      numpad  : config.numpad !== undefined ? config.numpad : true,
      mouse   : config.mouse !== undefined ? config.mouse : true,
      lock   : config.lock !== undefined ? config.lock : false,
      textcolor   : config.textcolor !== undefined ? config.textcolor : '#FFFFFF',
      bordercolor   : config.bordercolor !== undefined ? config.bordercolor : '#FFFFFF',
      glowcolor   : config.glowcolor !== undefined ? config.glowcolor : '#FFFFFF',
      opacity   : config.opacity !== undefined ? config.opacity : 100,
    };

    selectTextColor.value = config.textcolor;
    selectBorderColor.value = config.bordercolor;
    selectGlowColor.value = config.glowcolor;
    opacitySlider.value = config.opacity;

    updateElements(config);

    // initialize event listeners
    for (var i in elements) {
      elements[i].addEventListener('change', function() {
        updateConfig(currentSource);
      });
    }

    lockCheck.addEventListener('change', function() {
      updateConfig(currentSource);
    });
  });
})();

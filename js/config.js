(function() {
  'use strict';

  var xjs = require('xjs'),
      Item = xjs.Item,
      SourceConfigWindow = xjs.SourceConfigWindow;

  var currentSource;

  var elements = {
    func     : document.getElementById('function'),
    alpha    : document.getElementById('alpha'),
    system   : document.getElementById('system'),
    nav      : document.getElementById('nav'),
    arrow    : document.getElementById('arrow'),
    numpad   : document.getElementById('numpad'),
    mouse    : document.getElementById('mouse'),
    keyboard : document.getElementById('keyboard')
  };

  var updateElements = function(config) {
    if (config.func === true) {
      elements.func.checked = true;
    }

    if (config.alpha === true) {
      elements.alpha.checked = true;
    }

    if (config.system === true) {
      elements.system.checked = true;
    }

    if (config.nav === true) {
      elements.nav.checked = true;
    }

    if (config.arrow === true) {
      elements.arrow.checked = true;
    }

    if (config.numpad === true) {
      elements.numpad.checked = true;
    }

    if (config.mouse === true) {
      elements.mouse.checked = true;
    }
  };

  var updateConfig = function(item) {
    var config = {
      func    : elements.func.checked,
      alpha   : elements.alpha.checked,
      system  : elements.system.checked,
      nav     : elements.nav.checked,
      arrow   : elements.arrow.checked,
      numpad  : elements.numpad.checked,
      mouse   : elements.mouse.checked,
    };

    item.requestSaveConfig(config);
  };

  xjs.ready().then(function() {
    SourceConfigWindow.getInstance().useTabbedWindow({
      customTabs: ['Keyboard/Mouse'],
      tabOrder: ['Keyboard/Mouse', 'Color', 'Layout', 'Transition']
    });
    return Item.getCurrentSource();
  }).then(function(myItem) {
    currentSource = myItem;
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
    };

    updateElements(config);

    // initialize event listeners
    for (var i in elements) {
      elements[i].addEventListener('change', function() {
        updateConfig(currentSource);
      });
    };
  });
})();

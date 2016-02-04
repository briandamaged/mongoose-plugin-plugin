'use strict';

function createPlugin() {

  function plugin(schema) {
    for(let i = 0; i < plugin.spec.length; ++i) {
      const s = plugin.spec[i];
      schema.plugin(s.plugin, s.options);
    }
  }

  plugin.push = function(p, options) {
    plugin.spec.push({
      plugin:  p,
      options: options
    });
  }

  // In case you want to think of this thing as a
  // plugin-builder rather than an actual plugin.
  plugin.plugin = plugin;

  plugin.spec = [];

  return plugin;
}

module.exports = createPlugin;

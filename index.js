const Element = name => document.createElement(name)
const use = (name, value) => HTMLElement.prototype[name] = value


// Default plugins.

use('Element', function(name) { return this.appendChild(document.createElement(name)) })

use('set', function(name, value) { return (this.setAttribute(name, value), this) })

use('on', function(name, value) { return (this.addEventListener(name, value), this) })

use('text', function(value) { return (this.innerText = value, this) })

use('end', function() { return this.parentElement })

use('top', function() { return this.getRootNode() })

export const Element = name => document.createElement(name)
export const use = (name, value) => HTMLElement.prototype[name] = value


// Default plug-ins.

use('Element', function(name) { return this.appendChild(document.createElement(name)) }
use('attribute', function(name, value) { return (this.setAttribute(name, value), this) }
use('event', function(name, value) { return (this.addEventListener(name, value), this) }
use('text', function(value) { return (this.innerText = value, this) }
use('end', function() { return this.parentElement }
use('top', function() { return this.getRootNode() }

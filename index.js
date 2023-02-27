export const Element = elementName => document.createElement(elementName)
export const use = (pluginName, pluginCallback) => HTMLElement.prototype[pluginName] = pluginCallback


// Default plug-ins.

use('Element', function(elementName) { return this.appendChild(document.createElement(elementName)) }
use('Atom', function(elementName, elementText) { return (this.appendChild(document.createElement(elementName)).innerText = elementText ?? '', this) }

use('text', function(elementText) { return (this.innerText = elementText, this) }
use('set', function(attributeName, attributeText) { return (this.setAttribute(attributeName, attributeText), this) }
use('when', function(eventName, eventCallback) { return (this.addEventListener(eventName, eventCallback), this) }
use('end', function() { return this.parentElement }
use('root', function() { return this.getRootNode() }

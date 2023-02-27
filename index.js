export const Element = name => document.createElement(name)

HTMLElement.prototype.Element = function(name) { return this.appendChild(document.createElement(name)) }
HTMLElement.prototype.text = function(text) { return (this.innerText = text, this) }
HTMLElement.prototype.html = function(html) { return (this.innerHTML = html, this) }
HTMLElement.prototype.set = function(...a) { return (this.setAttribute(...a), this) }
HTMLElement.prototype.on = function(...a) { return (this.addEventListener(...a), this) }
HTMLElement.prototype.end = function() { return this.parentElement }
HTMLElement.prototype.top = function() { return this.getRootNode() }

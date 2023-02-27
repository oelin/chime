# Chime

A tiny, declarative UI framework.

**[Getting Started](#getting-started) | [Installation](#installation) | [API](#api)**

```js
const App = element('div')
    .Element('input')
        .set('placholder', 'username')
        .set('value', username)
        .end()
    .Element('input')
        .set('placeholder', 'password')
        .set('value', password)
        .end()
    .Element('div')
        .Element('h6')
            .text('About you')
            .end()
        .Element('div')
            .Element('textarea')
                .set('class', 'bio')
                .top()
```

<img src='https://github.com/oelin/chime/blob/main/images/form.png' width=100%>

 
## Getting Started 

Chime is a tiny UI library which makes use of function chaining to construct UIs in a declarative style. The core library only contains a few DOM functions however it can be very easily extended via plugins using the `use()` API (for example to support two-way data binding). While Chime doesn't allow you to create views in HTML syntax, functional chaining allows you to achieve comparable succinctness while also being declarative.


### Constructing Views

Chime works by implementing several chainable functions in the prototype of `HTMLElement`, allowing them to be used on any HTML element. Chime exports `Element()` (an alias of `document.createElement()`), which can be used as the root of a view. To append a child to an existing element, simply call `.Element()` on the element. For example:

```js
Element('div').Element('a') // <a></a>
```

This returns the inner `<a>` element. To access the parent element, chain on `.end()`:

```js
Element('div')    // <div>
    .Element('a') //     <a></a>
    .end()        // </div>
```

The `.end()` method can be thought of like a closing tag for the current element. As such, it can be used to construct nested DOMs. For example:

```js
Element('div')       // <div>
    .Element('p')    //     <p>
        .text('foo') //         foo
        .end()       //     </p>
    .Element('div')  //     <div>
        .text('bar') //         bar
        .end()       //     </div>
    .end()           // </div>
```

To reduce boilerplate, Chime also provides the `top()` function which returns the root element of a tree. For example, consider this set of nested `div` elements:

```js
Element('div')
    .Element('div')
        .Element('div')
            .Element('div')
                .Element('div')
                    .end()
                .end()
            .end()
        .end()
    .end()
```

Using `top()` we can divide the line count in half:

```js
Element('div')
    .Element('div')
        .Element('div')
            .Element('div')
                .Element('div')
                    .top()
```


### Manipulating Elements

Apart from constructing views, Chime also allows you to easily modify the content and/or attributes of individual DOM elements. The `attribute()` function can be used to set an attribute on an element. For example:

```js
Element('div').set('class', 'foo') // <div class='foo'></div>
```

Another important function is `when()` which allows you to add event listeners to elements. For example:

```js
Element('button')
   .text('Click me!')
   .when('click', () => console.log('Button clicked!'))
```


## Installation

```sh
npm i chime
```


## API

Most of the functions exported by the library are fairly self-explanatory.

* `Element(name: String) -> HTMLElement` - creates a new element (an alias of `document.createElement`).

The following functions are prototyped on `HTMLElement`:

* `Element(name: String) -> HTMLElement` - adds a new child element to the current element.

* `set(name: String, value: String) -> HTMLElement` - sets an attribute on the current element.

* `text(value: String) -> HTMLElement` - sets the `innerText` of the current element.

* `when(name: String, callback: Function) -> HTMLElement` - registers an event listener on the current element.

Finally, the `use()` API can be used to add new functions to the prototype of `HTMLElement`. This is the easiest way to develop plugins for Chime. For example, to implement data-binding:

```js
class Variable {
    constructor(value) {
        this.value = value
        this.subscribers = []
    }

    set(value) {
        this.value = value
        this.subscribers.forEach(callback => callback(value))
    }
    
    subscribe(callback) {
        this.subscribers.push(callback)
        callback(this.value)
    }
}


use('binding', function(variable) {

    variable.subscribe(value => this.set('value', value))
    return this.on('input', () => variable.set(this.value))
}
```

> Note that when writing plugins, you should typically return the current element to allow for further function chaining.

This function can then be used when constructing views:

```js
function App() {
    const username = new Variable('Alice')
    
    return Element('div')
        .Element('input').binding(username)
        .top()
}
```

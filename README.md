# Chime

A tiny, declarative UI library.

**[Getting Started](#getting-started) | [Installation](#installation) | [API](#api)**

```js
const App = Element('div')
    .Element('input')
        .set('placholder', 'username')
        .set('value', username)
        .end()
    .Element('input')
        .set('placeholder', 'password')
        .set('value', password)
        .end()
    .Element('div')
        .Element('h3')
            .text('About you')
            .end()
        .Element('div')
            .Element('textarea')
            .set('class', 'bio')
            .set('title', 'Enter your bio.')
            .top()
```

<img src='https://github.com/oelin/chime/blob/main/images/form.png'>


## Getting Started 

Chime is a tiny UI library which makes use of function chaining to construct UIs in a declarative style. The core library only contains a few DOM functions however it can be very easily extended via plug-ins using the `use()` API (for example to support two-way data binding). While Chime doesn't allow you to create views in HTML syntax, functional chaining allows you to achieve comparable succinctness while also being declarative.


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

The `.end()` method can be thought of like a closing tag for the current element. As such, it can be used to constructed nested DOMs. For example:

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

Many HTML elements are tyically atomic, meaning they do not have any children (except text nodes). To reduce boilerplate in these cases, chime exports the `Atom()` function. This takes an element name and optional text content. For example, the example above can be simplified to.

```js
Element('div')          // <div>
    .Atom('p', 'foo')   //     <p>foo</p>
    .Atom('div', 'bar') //     <div>bar</div>
    .end()              // </div>
```

Another piece of syntactic sugar provided by the library is `root()` which automatically closes all trailing elements. For example, consider this set of three nested `div` elements:

```js
Element('div')
    .Element('div')
        .Element('div')
        .end()
    .end()
```

Using `root()`, we can simplify this to:

```js
Element('div')
    .Element('div')
        .Element('div')
        .root()
```


### Manipulating Elements

Apart from constructing views, Chime also allows you to easily modify the content and/or attributes of individual DOM elements. The `set()` function can be used to set an attribute on an element. For example:

```js
Element('div').set('class', 'foo') // <div class='foo'></div>
```

Another important function is `on()` which allows you to add event listeners to a DOM element. For example:

```js
Element('button')
   .text('Click me!')
   .on('click', () => console.log('Button clicked!'))
```


## Installation

```sh
npm i chime
```


## API

Most of the functions exported by the library are faily self-explanatory.

* `Element(name: String) -> HTMLElement` - creates a new element (an alias of `document.createElement`).

* `Atom(name: String[, text: String]) -> HTMLElement` - creates a new atomic element (equivalent to `Atom(name).text(text).end()`).

The following functions are prototyped on `HTMLElement`:

* `Element(name: String) -> HTMLElement` - adds a new child element to the current element.

* `Atom(name: String) -> HTMLElement` - adds a new atomic child element the current element.

* `text(text: String) -> HTMLElement` - sets the `innerText` of the current element.

* `set(attribute: String, value: Any) -> HTMLElement` - sets an attribute on the current element.

* `on(event: String, callback: Function) -> HTMLElement` - registers an event listener on the current element.

Finally, the `use()` API can be used to add new functions to the prototype of `HTMLElement`. This is the easiest way to develop plug-ins for Chime. For example, to implement data-binding between input elements and refs, you could write a simple `bind` plug-in:

```js
use('bind', function(ref) {
    ref.subscribe(value => this.set('value', value)) // Update the `value` attribute.
    this.on('change', value => ref(value)) // Update the ref on input.
})
```

This function can then be used when constructing views:

```js
function App() {
    const username = ref('Alice')
    
    return Element('div')
        .Atom('input').bind(username)
}
```

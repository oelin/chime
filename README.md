# Chime

A tiny declarative UI library.

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


## About 

Chime is a tiny UI library which makes use of function chaining to construct UIs in a declarative style. The core library only contains a few DOM functions however it can be very easily extended via plug-ins using the `use()` API (for example to support two-way data binding). While Chime doesn't allow you to create views in HTML syntax, functional chaining allows you to achieve comparable succinctness while also being declarative.

### Creating DOM Elements

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
Element('div')           // <div>
    .Atom('p', 'foo')    //     <p>foo</p>
    .Atom('div', 'bar')  //     <div>bar</div>
    .end()               // </div>
```


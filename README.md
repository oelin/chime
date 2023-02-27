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

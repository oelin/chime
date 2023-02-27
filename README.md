# chime
An elegant declarative DOM framework.


```js
function App() {

    return element('div')
        .element('input')
            .set('placholder', 'username')
            .set('value', username)
            .end()
        .element('input')
            .set('placeholder', 'password')
            .set('value', password)
            .end()
        .element('div')
            .element('h3')
                .text('About you')
                .end()
            .element('div')
                .element('textarea')
                    .set('class', 'bio')
                    .set('title', 'Enter your bio.')
                    .end()
                .element('input')
                    .set('class', 'avatar')
                    .set('title', 'Upload an avatar.')
                    .set('type', 'file')
                    .all()
}
```

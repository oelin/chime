# Chime

An elegant declarative DOM framework.


```js
import { element } from 'chime'


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
                    .top()
}
```

<img src='https://github.com/oelin/chime/blob/main/images/form.png'>

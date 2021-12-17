import { Observable, fromEvent } from 'rxjs'
import { first, filter, map } from 'rxjs/operators';

import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>

  <button id="btn">click me</button>
`

// Gestion classique d'evenements en "vanilla JS"
const btn = document.querySelector('#btn')
// btn.addEventListener('click', (event) => {
//   console.log('button was clicked!')
// })

const clickObs$ = fromEvent(btn, 'click')
clickObs$.subscribe(event => console.log('observable #1', event))

const obs$ = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  let counter = 4
  setInterval(() => {
    // console.log('emit new value')
    subscriber.next(counter)
    counter++
  }, 2000)
})
obs$
// pipe combiné à des "opérateurs"
// (first, filter, etc.) permet
// d'appliquer des traitements
// au "flux" (stream) de données
// qui circule de l'observable vers
// l'observer
.pipe(
  // ne laisse passer que les nombres impairs
  filter(x => x % 2 === 1),
  map(x => x * 3)
)
.subscribe(data => console.log('observable #2', data))

const httpObs$ = new Observable(subscriber => {
  const url = 'https://api.github.com/users'
  fetch(url)
    .then(response => response.json())
    .then(users => {
      subscriber.next(users)
    })
})
httpObs$.subscribe(users => {
  console.log(users)
})
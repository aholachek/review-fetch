Sometimes it's helpful to review the basic building blocks of front end development. In this repo you'll find a few short exercises you can do to (re)familiarize yourself with the `fetch` function.

## To get started
1. Clone repo
2. Run `yarn`
3. Run `yarn start`. You should see a page of failing tests on `localhost:8000`.
4. Write code in `index.js` to solve the tests.

## Hints
1. Use the [`debugger`](https://developers.google.com/web/tools/chrome-devtools/javascript/) statement liberally to introspect what is being returned by your `fetch` calls.
2. The tests expect your function to return an object that looks like this:
```js
{ data: {}, error: {} }
```
with either `data` or `error` keys depending on whether the `fetch` request succesfully completed.
3. Possible solutions can be found in the `solutions` branch.

## Learn about (or review) `fetch`
1. [Using Fetch by Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
2. [Introduction to Fetch by Google](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)


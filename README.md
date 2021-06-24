# React in Structure Demo

- [Presentation video](https://youtu.be/0l0Rkkp-XJo)
- [Slides](https://docs.google.com/presentation/d/1jUyBWR5g-soG-78KO7yrjGaY1Pb1NCwFYv1un5OlD9U/edit?usp=sharing)
- [Discord](https://discord.gg/Hc3ARubd)
- [Typescript / React Workshop on Meetup](https://www.meetup.com/typescript-javascript-workshop)

## Setup Firebase for the Chat Page

1. Copy `.env.sample` as `.env.local`.
2. [Setup all values based on your Firebase config.](https://firebase.google.com/docs/web/setup?authuser=0&sdk_version=v8#config-object)
3. Values will be imported by the Chat page.

## Craco

If you haven't previously used [craco (Create React App Configuration Override)](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md) you will get an error when using `yarn start`. Visit the [craco installation page](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation) for directions. You can ignore the part of the installation instructions regarding `craco.config.js` and `package.json` as that's already been done in this repository.

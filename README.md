# A Post-industral React Wasteland

This is a playground to try new React practices and libraries. Its nightmarish End of Life is my inevitable burnout.

It is also an opportunity for [to shameless shill stupid narratives I write](https://murderwithfriends.party) on a [website](https://murderwithfriends.party) powered by [this codebase](#made-ya-look). That's [m-u-r-d-e-r-w-i-t-h-f-r-i-e-n-d-s-dot-parrrttaaayyy](https://murderwithfriends.party).

Additional shilling: [Ask a Dev](https://askadev.org), your friendly neighborhood programmers hosting free, open office hours.

## Opinions

This is an excercise in synthesis from a community that languishes over an unopinionated framework. React's proliferation and accessibilty may ultimately be its doom. Until then, like everyone else on Medium and their mother, I'm documenting and making this up as I go.

~~Now, for the only opinions that matter: my own~~. Say hey in [Issues](issues) if you wanna dance.

## Organization

What is a developer without a code?

### Universal Components

A **universal component** is a shared UI element used across multiple slices. For example, a `<Button />`. These are referenced `+dumb/<Name>`. These have no sense of Redux or external data.

### Connected Components

A **connected component** is almost *always* enhanced by Redux. The `connect` call is invoked in the `index.js` file with all related logic (memoized selectors, mergeProps, whatever) while the React component is in `presenter`. Raised as an old-fashioned Rails boy, I sleep easy at night knowing param logic is separated from the view.

| Filename | Description |
|---|---|
| actions.js | Data manipulators, usually writing new data to the server. |
| presenter.(j\|t)sx? | Strictly presentational. |
| index.js | Automatically imported by whatever parent component, this wraps the Presenter in Redux logic |
| selectors.js | Memoized selectors preferrably don't need their own file, but sometimes they're gnarly |

#### Notes

* Stateless Functional Components are [avoided like the plague](https://medium.com/@nimelrian/be-careful-with-this-statement-463d3076d562). There's always war in Eurasia, and there have always been [promises](https://reactjs.org/blog/2015/10/07/react-v0.14.html#stateless-functional-components) [of SFC](https://github.com/acdlite/recompose/commit/bc1fe9b02bf5c29249073b5f4e660399f6118926) [performance optimizations](https://twitter.com/dan_abramov/status/755343960470614016). The war - and the wait - continue.
* While we're picking bones, [FACC](https://americanexpress.io/faccs-are-an-antipattern/)s only make sense to their author and are also 86'd. Looking at you, Apollo `<Query />`.
* Redux logic is also separated to clear an open path to component testing. While it'd be more convenient to include `connect` along with the rest of presenter, this makes decoupling a bigger headache in the future When The Next Greatest State Manager rises to prominence.

### Slices

A **slice** is a division that operates independent of another division of the app. A slice does not access another slice, as this would defeat the purpose. Not to be confused with a [slice reducer](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic) (a pattern employed by this app). Each slice can be composed of:

| File/Folder Name | Description |
|---|---|
| entry.js | The component that binds data on mount and unbinds on unmount |
| routes.js | Dynamic routing to pages listed such as `Index`, `Show` |
| reducer.js | The Redux source of truth exclusive to the slice |
| types.js | Internal Redux action types exclusive to the slice |
| _components/ | Directory of "private" components only used within the slice |
| \<Route\>/ | Routes for the slice, such as `Index` or `Show` |

#### Notes

* Only `entry.js` files can fetch data. This fetching updates Redux and renders a Route component. That's all they do.
* Components in the `_components/` directory do not have to be "dumb." This word "dumb" is thrown around recklessly in the React ecosystem. Here, it means "this component does not connect to a server." You may consider *this* [reckless](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0), but I disagree with Dan's binding Redux only to containers. That adds an order of complexity to interpreting the codebase (instead, Redux `connect`s in `index.js` and the logic is separate). These components can still be connected to Redux, they just can't do any data fetching on their own. They **can write [remote] data**. Redux is more efficient [on leaves](https://youtu.be/sL4D_zRUVw4?t=11m58s) (React doesn't have to recompute every time pass through props are changed).
* Components in the `_components/` directory definitely can't be used outside their `slice`.
* All reducers are eventually collapsed into The Single Source of Truth, but until then, state is largely localized to each slice. This is an [attempt to lighten the pain of Redux's complexity](https://proandroiddev.com/mvc-mvp-mvvm-clean-viper-redux-mvi-prnsaaspfruicc-building-abstractions-for-the-sake-of-building-18459ab89386). Close to a [sub app](https://redux.js.org/recipes/isolating-subapps), but close the files are just colocated. Results TBD.
* Wether to organize with [a](https://datarockets.com/blog/structure-redux-applications) [modules](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af) [o](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e)[r](https://tech.offgrid-electric.com/slice-directory-structure-for-react-apps-why-its-worth-trying-b3855ee77a1e) [components/features](https://medium.com/styled-components/component-folder-pattern-ee42df37ec68)[/ducks](https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5) structure has been well-debated; I believe using a separate [modules](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e) directory adds more complexity, uncolocated logic, and less encapsulation, therefore, it's an antipattern.
* Nesting folders within `/slices` more than three levels deep will result in certain death.
* Runner-up names for `Slice` included "Domain", "Fence", "Scene," "Molecule," "Fragment," "Neighborhood," but nothing got the point across as efficiently and without metaphor. You've probably already imagined a metaphor as a slice of pie. Well done. But don't [call it cute](https://youtu.be/M3BM9TB-8yA?t=15m2s).
* Ducks is fine, but ultimately that cute duck grows up to be one big PHP file and when you modularize you'll have no commit history.
* The biggest problem with encapsulation in an app that uses Redux is that Redux is not meant to be enapsulated. It is the Single Source of Truth, the Chosen One, a pattern so good [it survived discouragement by its own author](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367). We will always struggle with modular organization in a Redux-powered app because we're struggling against the pattern of querying a global state tree that boasts global constants. Flux's [stores](https://facebook.github.io/flux/docs/in-depth-overview.html#stores) are closer to the idea of pure encapsulation at the price of, well, using Flux.
* Yes, I have built many bikesheds, why do you ask?

### Styles

CSS is fine. SCSS is great. Styled components only add [bloat to existing JS files](https://zendev.com/2017/09/11/css-in-js.html) and this whole template literal business is a mess. Styles are imported via CSS modules and precompiled with SCSS. Just because it ends in Sheets not Script doesn't mean it can't play in the sandbox too.

#### Notes

* That said, I'm *so* over that BEM/BOOM/BUM rubbish. In all cases, `.root` is used instead of a cheeky name to define the component's arch `className`.
* I will lose zero sleep over styling tags. There's an art to the cascade. Encapsulation may be a core tenant of React-land, but IMHO CSS is a different zip code.
* CSS is the easiest language to write and the hardest to write well.

### Prior Art

In order of influence

* [Loading data components/dynamic routing](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e)
* [The 100% correct way](https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)
* [Features pattern](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)
* [Scenes pattern with smart/dumb elements](https://www.smashingmagazine.com/2016/09/how-to-scale-react-applications/)

## Current Life

* Adventures in TypeScript
* Storybook
* [Plop](https://github.com/amwmedia/plop) *pllloooppppppppp*

## Past Lives

| Framework | Description | Additional Snark |
|---|---|---|
| [Firebase](tree/graveyard/firebase) | A non-relational database requiring a sacrifice of [sanity](https://www.youtube.com/watch?v=q-xiFI6SldM&t=1m30s). | Real-time is dope. Great service to scrap your way through a prototype. Impressive speed, especially to a Muggle. [The headache](https://vimeo.com/95066828) (12:30; this man's humor must be preserved for future generations) of crafting complex security rules to avoid nested access and maintaining the same data in multiple references invalidates all pros. |

## Future Lives

* Thoughtful codesplitting with [Loadable](https://github.com/jamiebuilds/react-loadable)
* Jest/Enzyme testing
* Unified conversion to TypeScript. `.d.ts` or `.tsx` just pick one.
* GraphQL
* Soothing ESLint
* Confront the sins of the `+dumb/Inputs` directory
* Advanced Storybook usage

## Development

```
$ yarn install && yarn start
```

Hit up http://localhost:8080.

### Yarn commands

Invoked `$ yarn <cmd>`

| command | description |
|---|---|
| start | Run dev server with HMR at http://localhost:8080. Uses webpack/development.js |
| build | Compile for production into dist/. Uses webpack/production.js |
| storybook | See +dumb component library by running a server at http://localhost:9001 |
| storybook:build | Compile storybook to dist-storybook/ |
| plop | Compose a new addition to the code base from a template |

### Quirks

#### Aliasing/Import Resolution

Skirt relative path hell with an `+<alias>`. Found in `webpack/shared` and `tsconfig.json`.

| prefix | path |
|---|---|
| `+dumb` | `src/universal/dumb` |
| `+root` | `src` |

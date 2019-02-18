# A Post-industral React Wasteland

This is a playground to try new React practices and libraries. Its nightmarish End of Life is my inevitable burnout.

It is also an opportunity [to shamelessly shill stupid narratives I write](https://murderwithfriends.party) on a [website](https://murderwithfriends.party) powered by [this codebase](#made-ya-look). That's [m-u-r-d-e-r-w-i-t-h-f-r-i-e-n-d-s-dot-parrrttaaayyy](https://murderwithfriends.party).

Additional shilling: [Ask a Dev](https://askadev.org), your friendly neighborhood programmers hosting free, open office hours.

## Opinions

~This is an excercise in synthesis from a community that languishes over an unopinionated framework. React's proliferation and accessibilty may ultimately be its doom. Until then,~ like everyone else on Medium and their mother, I'm documenting and making this up as I go.

Say hey in [Issues](issues) if you wanna dance.

## Organization

What is a developer without a code?

### Universal Components

A **universal component** is a shared UI element used across multiple slices. For example, a `<Button />`. These are referenced `+dumb/<Name>`. They do not retrieve data and are not tied to any state management.

### Connected Components

A **connected component** is almost *always* enhanced by Apollo. The `graphql` or `compose` call is invoked in the `index.js` file with all related logic (`recompose` HOCs, memoized functions, whatever) while the React component is in `presenter`. Raised as an old-fashioned Rails boy, I sleep easy at night knowing param logic is separated from the view.

| Filename | Description |
|---|---|
| remote.graphql | Pushes and pulls everything from the server. Contains `query` `mutation` and `subscription` operation types. |
| presenter.(j\|t)sx? | Strictly presentational. |
| index.js | Automatically imported by whatever parent component, this wraps the Presenter in Apollo logic |
| style.css | CSS duh |

#### Notes

* Only `index.js` files can fetch data.
* Stateless Functional Components are [avoided like the plague](https://medium.com/@nimelrian/be-careful-with-this-statement-463d3076d562). There's always war in Eurasia, and there have always been [promises](https://reactjs.org/blog/2015/10/07/react-v0.14.html#stateless-functional-components) [of SFC](https://github.com/acdlite/recompose/commit/bc1fe9b02bf5c29249073b5f4e660399f6118926) [performance optimizations](https://twitter.com/dan_abramov/status/755343960470614016). The war - and the wait - continue.
* While we're picking bones, [FACC](https://americanexpress.io/faccs-are-an-antipattern/)s only make sense to their author and are also 86'd. I understand this as a [growing](https://www.apollographql.com/docs/react/essentials/queries.html#basic) [pattern](https://reactjs.org/docs/context.html#examples), but deriving the purpose of a complex FACC is not worth the initial convenience. [Grotesque nesting](https://www.apollographql.com/docs/react/essentials/mutations.html#errors) is far more easily achieved when you're starting an extra indent deep, and I'm old enough to remember callback hell. ~Also, TODOMoResearch, but this pattern seemingly breaks the [downstream equality checks](https://github.com/acdlite/recompose/blob/master/docs/API.md#withhandlers) reducing its performance, right?~ If the [child component is a PureComponent](https://reactjs.org/docs/render-props.html#be-careful-when-using-render-props-with-reactpurecomponent), it will have reduced performance. [Render props](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) are good.
* App state logic is also separated to clear an open path to component testing. While it'd be more convenient to include `graphql` or `compose` along with the rest of presenter, this makes decoupling a bigger headache in the future when The Next Greatest State Manager/[You Don't Need a State Manager](https://blog.apollographql.com/reducing-our-redux-code-with-react-apollo-5091b9de9c2a) philosophy rises to prominence.

### Slices

A **slice** is a division that operates independent of another division of the app. A slice does not access another slice, as this would defeat the purpose. Each slice can be composed of:

| File/Folder Name | Description |
|---|---|
| routes.js | Dynamic routing to pages listed such as `Index`, `Show` |
| _components/ | Directory of "private" components only used within the slice |
| \<Route\>/ | Routes for the slice, such as `Index` or `Show` |

#### Notes

* Components in the `_components/` directory do not have to be "dumb." This word "dumb" is thrown around recklessly in the React ecosystem. Here, it means "this component does not connect to a server." You may consider *this* [reckless](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0), but I disagree with Dan's binding data only to containers. That adds an order of complexity to interpreting the codebase (instead, state management connection/data fetching in `index.js` on a HOC and keeping the logic separate). These components can still be connected to a state manager, they just can't do any data fetching on their own. They **can write [remote] data**. Manipulating props is more efficient [on leaves](https://youtu.be/sL4D_zRUVw4?t=11m58s) (React doesn't have to recompute every time pass through props are changed).
* Components in the `_components/` directory definitely can't be used outside their `slice`.
* Wether to organize with [a](https://datarockets.com/blog/structure-redux-applications) [modules](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af) [o](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e)[r](https://tech.offgrid-electric.com/slice-directory-structure-for-react-apps-why-its-worth-trying-b3855ee77a1e) [components/features](https://medium.com/styled-components/component-folder-pattern-ee42df37ec68)[/ducks](https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5) structure has been well-debated; I believe using a separate [modules](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e) directory adds more complexity, uncolocated logic, and less encapsulation, therefore, it's an antipattern.
* Nesting folders within `/slices` more than three levels deep will result in certain death.
* Runner-up names for `Slice` included "Domain", "Fence", "Scene," "Molecule," "Fragment," "Neighborhood," but nothing got the point across as efficiently and without metaphor. You've probably already imagined a metaphor as a slice of pie. Well done. But don't [call it cute](https://youtu.be/M3BM9TB-8yA?t=15m2s).
* Yes, I have built many bikesheds, why do you ask?

### Data Model

The data model is defined in [`server/types`](server/types), serverless functions and some validation in [`server/functions`](server/functions), and permissions (a WIP) in [`server/permissions`](server/permissions). Feels good to be in a relationship [mindset] again.

#### Notes

* GraphQL configuration is an uphill battle that's well worth it. Mentally evaluating data models via a Graph file is *fun*.
* HOCs are the truth, but man do they suck to debug with [React Dev Tools](https://github.com/facebook/react-devtools). Apollo warmly embraces **everyone** in a `<Mutation>` or `<Query>`. This is a curmudgeonly, geriatric statement, but bad (nested) JSX is gross XML. I hate it. I love it. I hate it again. To reduce the cognitive load of flip-flopping, the dev experience uses a more functional syntax to bind data.
* Graphcool is following their own spec. No `implements`. `@isUnique` not `@unique`. No [aliasing](https://graphql.org/learn/queries/#aliases) of resolvers. People much smarter than me have made these decisions, but the confusion is palpable. That said, Graph is still enjoying infancy.
* It was a mistake to use Graphcool when they've clearly bet the farm on Prisma, but I wanted to prototype this in GraphQL before deep diving into devops. The "playground" / cloud IDE, the out-of-the-box subscription/simple/relay endpoints, and the examples of [all the right things](https://github.com/graphcool-examples/react-graphql/tree/master/authentication-with-email-and-apollo) are just good 'ol fashioned, quality dev relations. Pain points: [logging is impossible](https://github.com/prismagraphql/prisma/issues/392) and [functions](https://github.com/prismagraphql/graphcool-framework/issues/317)/[resolvers](https://github.com/apollographql/apollo-client/issues/2861) are poorly documented.

### Styles

CSS is fine. SCSS is great. But it's not real CSS. Styled components only add [bloat to existing JS files](https://zendev.com/2017/09/11/css-in-js.html) and this whole template literal business is a mess. Styles are imported via CSS modules and precompiled with PostCSS.

#### Notes

* That said, I'm *so* over that BEM/BOOM/BUM rubbish. In all cases, `.root` is used instead of a cheeky name to define the component's arch `className`.
* I will lose zero sleep over styling tags. There's an art to the cascade. Encapsulation may be a core tenant of React-land, but IMHO CSS is a different zip code.
* CSS is the easiest language to write and the hardest to write well.

### Property Naming

For consistency across the app, property names should be easily guessable.

| Property | Function | Example |
|---|---|---|
| `displayName` | Identifying, consumable title | The Hat Pie Company |
| `text` | Long-winded diatribe or instance's core purpose | We're the best cobblers this side of the Mississippi, that's what we do, don't let the name fool you |
| Booleans | Booleans are preceeded by `is`, `has`, `does`, or `should` | `isPie` `hasHats` `doesMakeShoes` `shouldRebrand` |
| `id` | Unique identifier | 1 |

### Prior Art

In order of influence

* [Loading data components/dynamic routing](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e)
* [The 100% correct way](https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)
* [Features pattern](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)
* [Scenes pattern with smart/dumb elements](https://www.smashingmagazine.com/2016/09/how-to-scale-react-applications/)

## Current Life

* Adventures in TypeScript
* Storybook
* [Forward Refs](https://reactjs.org/docs/forwarding-refs.html)
* Graphcool and Apollo (GraphQL)
* [Plop](https://github.com/amwmedia/plop) *pllloooppppppppp*

## Past Lives

| Framework | Description | Additional Snark |
|---|---|---|
| [Firebase](tree/graveyard/firebase) | A non-relational database requiring a sacrifice of [sanity](https://www.youtube.com/watch?v=q-xiFI6SldM&t=1m30s). | Real-time is dope. Authentication is [tear-free](https://www.lorealparisusa.com/~/media/images/lop/home/products/hair/hair-care/shampoo-conditioner/loreal-kids-orange-mango-smoothie-2-in-1-shampoo-for-extra-shine/orange-mango-smoothie-2-in-1-shampoo-for-extra-shine/hca1_4_pack-shot.jpg). Great service to scrap your way through a prototype. Impressive speed, especially to a Muggle (*inconceivably fast*). [The headache](https://vimeo.com/95066828) (12:30; this man's humor must be preserved for future generations) of crafting complex security rules to avoid nested access and maintaining the same data in multiple references invalidates all pros. |

## Future Lives

* Thoughtful codesplitting with [Loadable](https://github.com/jamiebuilds/react-loadable)
* Jest/Enzyme testing
* Unified conversion to TypeScript. `.d.ts` or `.tsx` just pick one.
* Soothing ESLint
* Use [React Context](https://reactjs.org/docs/context.html) instead of [Apollo's local hackery](https://github.com/apollographql/apollo-link-state)
* ~Confront the sins of `+dumb/Inputs`~
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

---
sidebar_position: 10
description: Integrate CSS and Images assets required by maxGraph.
---

# CSS and Images

## CSS

Some features of `maxGraph` create elements in the DOM to let interact with the `Graph`.
For instance, it happens when using _Rubberband_, _Tooltip_, _MaxWindow_, _Editor_ and _Toolbar_.

These elements require the application to provide CSS rules for correct display.

`maxGraph` provides a default CSS file that can be used in the application like in the following:
```js
import '@maxgraph/core/css/common.css';
```

It is possible to customize the defaults by providing new CSS rules.

For example, create a `custom.css` file:
```css
/* For rubber band selection, override maxGraph defaults */
div.mxRubberband {
  border-color: #b18426;
  background: #db9b0b;
}
```
Then, import it in the application: 
```js
import '@maxgraph/core/css/common.css';
import './custom.css'
```

:::tip
You can see this technique in action in the [TypeScript example](https://github.com/maxGraph/maxGraph/blob/main/packages/ts-example/src/main.ts) provided in the `maxGraph` repository.
:::

### Configuring your build tool to import CSS files

When using a build tool or bundler, additional configuration is often required to import CSS files into the application code (i.e. to make the CSS import work in the examples of the previous paragraph).
Some manage this automatically, like [Vite](https://vite.dev/), others require specific plugins. See the documentation of your build tool or framework for more information.

For example, with Webpack, you can use the `style-loader` and `css-loader` plugins. For more details, see:
- [Webpack: Loading CSS](https://webpack.js.org/guides/asset-management/#loading-css)
- [Webpack: style-loader](https://webpack.js.org/loaders/style-loader/)
- [Webpack: css-loader](https://webpack.js.org/loaders/css-loader/)

You can also check the [JavaScript Webpack example](https://github.com/maxGraph/maxGraph/blob/main/packages/js-example/webpack.config.js) provided in the `maxGraph` repository.

## Images

The `@maxgraph/core` npm package includes images that are required by some features.

When using these features, the images must be available in the application. `maxGraph` currently requires to configure the path to the images,
using `Client.setImageBasePath`.

This configuration is inherited from `mxGraph` and may be simplified in the future. 


**TODO: list some features requiring images**

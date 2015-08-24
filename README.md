# Markdown menu

> Automatically generate table of contents for markdown files.

The idea to create this small plugin was found due to working with [css style guide](https://github.com/jesprider/css-codeguide).

## How it works
Just copy mdMenu.js to your project and put it to the save dir with README.js. Then type

```
node mdMenu
```

Then you can find that you have your menu just in the beginning of your document.

## Config
This plugin has config with few options:

#### config.source / config.destination
*Path to files*

Defaults: `README.md` / `README.md`

#### config.cascade
*String*

Defaults: `'true'`

#### config.firstLevel
*Number*

Defaults: `2`

#### config.menuTitle
*String*

Defaults: `'## Table of Contents'`

#### config.placeholder
*String*

Defaults: `<!--mdMenu-->`

## Install with npm
Coming soon...

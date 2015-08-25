# Markdown menu

> Automatically generates table of contents for markdown files.

The idea to create this small plugin was found due to working with [css style guide](https://github.com/jesprider/css-codeguide).

## How it works
Just copy mdMenu.js to your project and put it to the same dir with README.js. Then type

```
node mdMenu
```

And you can find that you have your menu just in the beginning of your document.

## Config
This plugin has config with few options:

#### config.source / config.destination
*Path to files*

Path to the source file and the destination file. Recommended to copy your README.md file to another one and work with this new file.
Defaults: `README.md` / `README.md`

#### config.cascade
*String*

Cascade for menu.
Defaults: `'true'`

#### config.firstLevel
*Number*

What is your highest level for headers. Typically `h1` is used for the main header, and `h2-h6` for others.
Defaults: `2`

#### config.menuTitle
*String*

Use empty string to disable title for a menu.
Defaults: `'## Table of Contents'`

#### config.placeholder
*String*

You can put your menu anywhere you want. Just put this snippet to the needed place and plugin would replace it with a menu.
```
<!--mdMenu-->
<!--mdMenu-->
```
Defaults: `<!--mdMenu-->`

## Install with npm
Coming soon...

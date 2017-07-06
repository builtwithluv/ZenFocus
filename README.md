# ZenFocus

ZenFocus at its core is based off the time management technique known as the Pomodoro technique developed by Francesco Cirillo.  In short, it is a way for individuals to plan, focus and complete tasks in the form of managing different time blocks (focus time, short breaks and long breaks). This technique is used by many in different industries including but not limited to education, medical, fitness and music.

![Zen Focus Snapshot](https://res.cloudinary.com/lc8bqflyz/image/upload/v1498436333/ZenFocus/demo.png)

## Install

First, [fork the repo](https://github.com/builtwithluv/ZenFocus) and clone to your local.

And then install dependencies.
**ProTip**: Install with [yarn](https://github.com/yarnpkg/yarn) for faster and safer installation:

```bash
$ cd your-project-name && yarn install
```

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a server sends hot updates to the renderer process:

```bash
$ yarn run dev
```

## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

#### DevTools extension

This boilerplate is included following DevTools extensions:

* [Devtron](https://github.com/electron/devtron) - Install via [electron-debug](https://github.com/sindresorhus/electron-debug).
* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).

You can find the tabs on Chrome DevTools.

If you want to update extensions version, please set `UPGRADE_EXTENSIONS` env, just run:

```bash
$ UPGRADE_EXTENSIONS=1 yarn run dev

# For Windows
$ set UPGRADE_EXTENSIONS=1 && yarn run dev
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:
```
DEBUG_PROD=true yarn run package
```

## Maintainers

- [Cheng Sieu Ly](https://github.com/chengsieuly)
- [Edward Guo](https://github.com/ehguo)
- [Hoon Choi](https://github.com/hoonchoi)

## License
MIT © [builtwithluv](https://github.com/builtwithluv)

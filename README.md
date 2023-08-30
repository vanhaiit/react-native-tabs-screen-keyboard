# react-native-tabs-screen-keyboard

react native tabs screen keyboad

## Installation

```sh
npm install react-native-tabs-screen-keyboard
```

## Require Install lib

```sh
npm install react-native-mmkv-storage
```

```sh
npm install react-native-reanimated
```

```sh
npm install react-native-safe-area-context
```

## iOS Platform

```sh
pod install
```

## Usage

```js
// ...

import React from 'react';
import TabScreenKeyboard from 'react-native-tabs-screen-keyboard';

export default function Component() {
  const _prefix = [
    {
      key: 1,
      component: (
        <View
          style={{
            width: 24,
            height: 24,
            backgroundColor: 'red',
          }}
        />
      ),
    },
    {
      key: 2,
      component: (
        <View
          style={{
            width: 24,
            height: 24,
            backgroundColor: 'green',
          }}
        />
      ),
    },
    {
      key: 3,
      component: (
        <View
          style={{
            width: 24,
            height: 24,
            backgroundColor: 'blue',
          }}
        />
      ),
    },
  ];
  const _suffix = [
    {
      key: 1,
      component: (
        <View
          style={{
            width: 24,
            height: 24,
            backgroundColor: 'orange',
          }}
        />
      ),
    },
  ];
  const _screens = [
    {
      key: 1,
      component: <View style={{ flex: 1, backgroundColor: 'red' }} />,
    },
    {
      key: 2,
      component: <View style={{ flex: 1, backgroundColor: 'blue' }} />,
    },
    {
      key: 3,
      component: <View style={{ flex: 1, backgroundColor: 'green' }} />,
    },
  ];
  return (
    <SafeAreaProvider>
      <TabScreenKeyboard screens={_screens} suffix={_suffix} prefix={_prefix} />
    </SafeAreaProvider>
  );
}
```

## SafeAreaProvider

The SafeAreaProvider component is a View from where insets provided by Consumers are relative to. This means that if this view overlaps with any system elements (status bar, notches, etc.) these values will be provided to descendent consumers. Usually you will have one provider at the top of your app

## Key

Consider checking for duplicate key suffixes or prefixes, so that when selecting a component suffix or prefix to display the corresponding screen, they share the same key.

## Properties

### `prefix?: array`

list item prefix input

### `suffix?: array`

list item suffix input

### `screens?: array`

List screen on tabs

### `children?: array`

children view main screen

### `kStyle?: array`

A React Native style

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

# react-native-tabs-screen-keyboard

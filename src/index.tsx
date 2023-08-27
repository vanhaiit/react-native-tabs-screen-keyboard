/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
const storage = new MMKVLoader().initialize();
let heightTab: number = 0;
function TabScreenKeyboard() {
  const keyboard = useAnimatedKeyboard();
  const insets = useSafeAreaInsets();
  const offset = useSharedValue(0);
  const [tab, setTab] = useState<number | string | null | undefined>();
  const [inputText, setInputText] = useState('');
  const isKeyBoardRef = useRef(false);
  const [heightKeyBoard, setHeightKeyBoardStorage] = useMMKVStorage(
    'heightKeyBoard',
    storage,
    0
  );
  heightTab = heightKeyBoard;
  const translateStyle = useAnimatedStyle(() => {
    return {
      height: (offset.value || keyboard.height.value) - insets.bottom,
    };
  });

  function handleKeyBoard(e: any) {
    if (isKeyBoardRef.current) {
      setTab(null);
    }
    if (heightTab) {
      heightTab = e.endCoordinates.height;
    }
    setHeightKeyBoardStorage(e.endCoordinates.height.toString());
  }

  function handleImagePickerPress(value: number) {
    // Implement the logic to open the image picker here
    // You can use libraries like 'react-native-image-picker' for this purpose
    offset.value =
      tab === undefined ? withTiming(heightTab, { duration: 250 }) : heightTab;
    setTab(() => {
      Keyboard.dismiss();
      return value;
    });
  }

  function handleFocusMain() {
    offset.value = withTiming(0, { duration: 250 });
    setTab(undefined);
    Keyboard.dismiss();
  }

  function onFocusInput() {
    if (!isKeyBoardRef.current) {
      setTab(null);
    }
    isKeyBoardRef.current = true;
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyBoard
    );
    return () => keyboardDidShowListener.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <SafeAreaProvider>
      <View
        style={{
          ...styles.container,
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        }}
      >
        <Pressable style={styles.chatContainer} onPress={handleFocusMain}>
          <View />
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#f0f0f0',
          }}
        >
          {data.map((e, index) => (
            <Pressable
              onPress={() => handleImagePickerPress(e.key)}
              key={index}
            >
              {e.label}
            </Pressable>
          ))}
          <TextInput
            style={{
              flex: 1,
              marginHorizontal: 10,
              padding: 8,
              backgroundColor: '#fff',
            }}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            onFocus={onFocusInput}
            // onBlur={onBlur}
          />
          <TouchableOpacity>
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: 'blue',
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
        </View>
        <Animated.View style={translateStyle}>
          {data.map((e, index) =>
            tab === e.key ? (
              <View style={{ flex: 1 }} key={index}>
                {e.children}
              </View>
            ) : null
          )}
        </Animated.View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },

  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'pink',
  },
});

export const data = [
  {
    key: 1,
    label: (
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: 'green',
          borderRadius: 12,
        }}
      />
    ),
    children: <View style={{ flex: 1, backgroundColor: 'green' }} />,
  },
  {
    key: 2,

    label: (
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: 'red',
          borderRadius: 12,
        }}
      />
    ),
    children: <View style={{ flex: 1, backgroundColor: 'red' }} />,
  },
  {
    key: 3,
    label: (
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: 'blue',
          borderRadius: 12,
        }}
      />
    ),
    children: <View style={{ flex: 1, backgroundColor: 'blue' }} />,
  },
];

export default TabScreenKeyboard;

// import React from 'react';
// import {Text, View, StyleSheet} from 'react-native';
// import normalize from 'react-native-normalize';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.box}>
//           <Text style={styles.text}>React Native Normalize</Text>
//         </View>
//       </View>
//     );
//   }
// }

// console.log(normalize(20));

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   box: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     top: normalize(180, 'height'),
//     left: normalize(40),
//     width: normalize(300),
//     height: normalize(300),
//     borderRadius: normalize(150),
//     backgroundColor: '#009fcd',
//   },
//   text: {
//     fontSize: normalize(20),
//     color: 'white',
//   },
// });

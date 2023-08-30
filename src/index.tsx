import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type ViewStyle,
} from 'react-native';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const storage = new MMKVLoader().initialize();
let heightTab: number = 300;
interface IProps {
  prefix: Array<{
    key: number;
    component: React.ReactNode;
  }>;
  suffix: Array<{
    key: number;
    component: React.ReactNode;
  }>;
  screens: Array<{
    key: number;
    component: React.ReactNode;
  }>;
  children?: React.ReactNode;
  kStyle?: {
    container: ViewStyle;
    main: ViewStyle;
    toolbar: ViewStyle;
    prefix_container: ViewStyle;
    suffix_container: ViewStyle;
    screen: ViewStyle;
    prefix: ViewStyle;
    suffix: ViewStyle;
    input: ViewStyle;
  };
}
/**
 * TabScreenKeyboard
 * @param props
 * @returns
 */
function TabScreenKeyboard(props: IProps) {
  const { children, kStyle, prefix, suffix, screens } = props;
  const keyboard = useAnimatedKeyboard();
  const insets = useSafeAreaInsets();
  const offset = useSharedValue(0);
  const [tab, setTab] = useState<number | string | null | undefined>();
  const [inputText, setInputText] = useState<string>('');
  const isKeyBoardRef = useRef(false);
  const [heightKeyBoard, setHeightKeyBoardStorage] = useMMKVStorage(
    'heightKeyBoard',
    storage,
    300
  );
  heightTab = heightKeyBoard;
  const translateStyle = useAnimatedStyle(() => {
    return {
      height: (+offset.value || keyboard.height.value) - insets.bottom,
    };
  });
  /**
   * handleKeyBoard
   * @param event
   */
  function handleKeyBoard(e: any) {
    if (isKeyBoardRef.current) {
      setTab(null);
    }
    if (heightTab) {
      heightTab = e.endCoordinates.height;
    }
    setHeightKeyBoardStorage(e.endCoordinates.height.toString());
  }
  /**
   * handlePickerScreen
   * @param value
   */
  function handlePickerScreen(value: number) {
    offset.value =
      tab === undefined ? withTiming(heightTab, { duration: 250 }) : heightTab;
    setTab(() => {
      Keyboard.dismiss();
      return value;
    });
  }
  /**
   * handleFocusMain
   */
  function handleFocusMain() {
    offset.value = withTiming(0, { duration: 250 });
    setTab(undefined);
    Keyboard.dismiss();
  }
  /**
   * onFocusInput
   */
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

  return (
    <View
      style={{
        ...kStyle?.container,
        ...styles.container,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
    >
      <Pressable
        style={{ ...kStyle?.main, ...styles.main }}
        onPress={handleFocusMain}
      >
        {children}
      </Pressable>
      <View style={{ ...kStyle?.toolbar, ...styles.toolbar }}>
        <View style={styles.prefix_container}>
          {prefix.map((e, index) => (
            <Pressable
              style={{ ...kStyle?.prefix, ...styles.prefix }}
              onPress={() => handlePickerScreen(e.key)}
              key={index}
            >
              {e.component}
            </Pressable>
          ))}
        </View>
        <TextInput
          style={{ ...kStyle?.input, ...styles.input }}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          onFocus={onFocusInput}
        />
        <View
          style={{ ...kStyle?.suffix_container, ...styles.suffix_container }}
        >
          {suffix.map((e, index) => (
            <Pressable
              style={{ ...kStyle?.suffix, ...styles.suffix }}
              onPress={() => handlePickerScreen(e.key)}
              key={index}
            >
              {e.component}
            </Pressable>
          ))}
        </View>
      </View>
      <Animated.View style={translateStyle}>
        {screens.map((e, index) =>
          tab === e.key ? (
            <View style={{ ...kStyle?.screen, ...styles.screen }} key={index}>
              {e.component}
            </View>
          ) : null
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  prefix_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  suffix_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  prefix: {
    backgroundColor: 'white',
  },
  suffix: {
    backgroundColor: 'white',
  },
  screen: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  main: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'pink',
  },
});

export default TabScreenKeyboard;

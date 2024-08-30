import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadialGradient } from "react-native-gradients";

const ScreenLogin = () => {
  const navigation = useNavigation();
  const secondTextInput = useRef(null);
  const translateY = useRef(new Animated.Value(0)).current;

  const handleInputFocus = () => {
    Animated.timing(translateY, {
      toValue: -100, // value to control how much the content moves up
      duration: 400,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handleInputBlur = () => {
    Animated.timing(translateY, {
      toValue: 0, // moves content back to original position
      duration: 400,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleInputBlur
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Animated container for all content */}
        <Animated.View
          style={[styles.contentContainer, { transform: [{ translateY }] }]}
        >
          {/* App logo at the top */}
          <Image
            source={require("../assets/quaqbanner.png")}
            style={styles.Quaq}
          />

          {/* Header that says "Login" */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Login</Text>
          </View>

          {/* A golden line for decoration */}
          <View style={styles.goldLine} />

          {/* Greeting text to welcome the user */}
          <Text style={styles.greetingText}>
            Welcome! Ready to start working?
          </Text>

          {/* Email and password input boxes */}
          <View>
            <TextInput
              style={styles.inputBox}
              placeholder="Email Address"
              keyboardAppearance="dark"
              returnKeyType="next"
              placeholderTextColor="#E5E5E5"
              onFocus={handleInputFocus} // Trigger animation on focus
              onBlur={handleInputBlur} // Trigger animation on blur
              onSubmitEditing={() => secondTextInput.current.focus()} // Focus on the next input when "next" is pressed
            />
            <TextInput
              ref={secondTextInput}
              style={styles.inputBox}
              placeholder="Password"
              keyboardAppearance="dark"
              returnKeyType="send"
              placeholderTextColor="#E5E5E5"
              onFocus={handleInputFocus} // Trigger animation on focus
              onBlur={handleInputBlur} // Trigger animation on blur
            />
          </View>

          {/* Forgot password and create an account text buttons that take you to other pages */}
          <View style={styles.textButtons}>
            <Text style={styles.textButtonText}>Forgot Password</Text>
            <Text style={styles.textButtonText}>Create an account</Text>
          </View>

          {/* Sign in button that signs you in */}
          <View style={styles.submitBtn}>
            <TouchableWithoutFeedback>
              <Text style={styles.submitBtnTxt}>Sign In</Text>
            </TouchableWithoutFeedback>
          </View>
        </Animated.View>

        {/* Background gradient */}
        <View style={styles.gradientBg}>
          <RadialGradient
            x="50%"
            y="50%"
            rx="50%"
            ry="50%"
            colorList={colorList}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const colorList = [
  { offset: "0%", color: "#131313", opacity: "1" },
  { offset: "66.9%", color: "#2D2C2C", opacity: "1" },
  { offset: "100%", color: "#131313", opacity: "1" },
];

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 2,
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  gradientBg: {
    height: "100%",
    width: "100%",
    zIndex: -1,
    position: "absolute",
  },
  Quaq: {
    width: 247,
    height: 120,
    marginTop: 24,
  },
  goldLine: {
    height: 4,
    backgroundColor: "#D9AC6E",
    width: "100%",
    marginTop: 15,
  },
  headerContainer: {
    borderRadius: 29,
    backgroundColor: "black",
    width: 120,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "900",
  },
  greetingText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    marginTop: 20,
    width: 240,
    fontWeight: "600",
  },
  inputBox: {
    borderColor: "#D9AC6E",
    backgroundColor: "black",
    width: 277,
    height: 48,
    borderWidth: 4,
    borderRadius: 15,
    color: "white",
    marginTop: 30,
    paddingLeft: 10,
    fontSize: 15,
  },
  textButtons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  textButtonText: {
    color: "#BFBFBF",
  },
  submitBtn: {
    borderColor: "#D9AC6E",
    backgroundColor: "black",
    width: 118,
    height: 47,
    borderWidth: 4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  submitBtnTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
  },
});

export default ScreenLogin;

import React, { Component } from "react";
import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  AsyncStorage,
  ScrollView,
} from "react-native";
import "react-native-gesture-handler";
import { stackNames } from "../constants/navConsts/stackNames";
import { screenNames } from "../constants/navConsts/screenNames";
import { scale } from "react-native-size-matters";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.loadData();
  }

  loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      this.props.navigation.replace("MainPage");
    }
  };

  static navigationOptions = {
    headerTitle: "Welcome",
    headerStyle: { backgroundColor: "#131d41" },
    headerTintColor: "#ffffff",
    headerLeft: () => {
      return null;
    },
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("./../assets/Logo_new.png")}
            style={{
              marginTop: scale(20),
            }}
          />
          <View
            style={{
              backgroundColor: "#28B67E",
              width: scale(252),
              height: scale(250),
              borderRadius: scale(282),
              marginTop: scale(28),
              alignItems: "center",
              justifyContent: "center",
              marginBottom: scale(50),
            }}
          >
            <Image
              source={require("../assets/robo.png")}
              style={{
                width: scale(151),
                height: scale(257),
                marginTop: scale(150),
                marginRight: scale(30),
              }}
            />
          </View>

          <Text
            style={{
              marginTop: scale(50),
              fontSize: scale(30),
              color: "#1C4C4E",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Charting your course{"\n"}to study smarter!
          </Text>
          <Text
            style={{
              marginTop: scale(25),
              fontSize: scale(15),
              color: "#949BA5",
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Elevate your learning journey with our{"\n"} digital syllabus
            wizardry!
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: scale(50),
              marginVertical: scale(50),
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#1C4C4E",
                width: scale(100),
                height: scale(40),
                alignItems: "center",
                borderRadius: scale(14),
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  // marginTop: scale(50),
                  fontSize: scale(12),
                  color: "white",
                  fontWeight: "400",
                  textAlign: "center",
                }}
                onPress={() =>
                  this.props.navigation.navigate(stackNames.AUTH, {
                    screen: screenNames.LOGIN,
                  })
                }
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: "#1C4C4E",
                borderWidth: 1,
                width: scale(100),
                height: scale(40),
                alignItems: "center",
                borderRadius: scale(14),
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: scale(12),
                  color: "#1C4C4E",
                  fontWeight: "400",
                  textAlign: "center",
                  // marginLeft: scale(20),
                }}
                onPress={() =>
                  this.props.navigation.navigate(stackNames.AUTH, {
                    screen: screenNames.SIGNUP,
                  })
                }
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Image
          source={require("./../assets/logo.png")}
          style={{ width: 90 + "%", height: 350 }}
        /> */}
          {/* <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 50 }}>Clever Zone</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
            "Discover life's stories in every cell with our biology app."
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer2, styles.startButton]}
          onPress={() =>
            this.props.navigation.navigate(stackNames.AUTH, {
              screen: screenNames.LOGIN,
            })
          }
        >
          <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}>
            Get Start
          </Text>
        </TouchableOpacity> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  input: {
    borderBottomWidth: 1,
    width: 80 + "%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    borderBottomColor: "#c4c4c4",
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 30 + "%",
    height: 40,
    borderRadius: 60,
  },
  loginButton: {
    backgroundColor: "#131d41",
  },
  buttonContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 60 + "%",
    height: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  startButton: {
    backgroundColor: "#131d41",
  },
});

import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import { ref, getDatabase, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AwesomeAlert from "react-native-awesome-alerts";
import firebase from "firebase/app";
import { stackNames } from "../constants/navConsts/stackNames";
import { screenNames } from "../constants/navConsts/screenNames";
import { SafeAreaView } from "react-native";
import Header from "./header";
import SocialBox from "./socialBox";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export default class Login extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Login",
      headerStyle: { backgroundColor: "#131d41" },
      headerTintColor: "#ffffff",
      headerLeft: () => {
        return null;
      },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: "",
      showAlert: false,
      loader: false,
      title: "",
    };

    this.loadData();
  }

  loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      this.props.navigation.navigate(stackNames.TABS, {
        screen: screenNames.HOME,
      });
    }
  };

  onLogin = (e) => {
    this.setState({ loader: true });

    const auth = getAuth();

    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then(async (res) => {
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("userEmail", res.user.email);
        await AsyncStorage.setItem("userId", res.user.uid);

        get(ref(getDatabase(), "/users/" + res.user.uid)).then(
          async (snapshot) => {
            console.log(snapshot.val().name);
            await AsyncStorage.setItem("name", snapshot.val().name);
            this.props.navigation.replace(stackNames.TABS, {
              screen: screenNames.HOME,
            });
          }
        );

        this.setState({ loader: false });
      })
      .catch((error) => {
        this.setState({ title: "Error!", message: error.message });
        this.showAlert();
        this.setState({ loader: false });
      });
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      message: "",
      title: "",
    });
  };

  render() {
    const { showAlert } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Header />

          {/* <Image
          source={require("./../assets/logo.png")}
          style={{ width: 350, height: 350 }}
        /> */}
          <View
            style={{
              // flex: 0,
              alignItems: "center",
              marginBottom: scale(40),
              marginTop: scale(40),
            }}
          >
            <Text
              style={{
                color: "#1C4C4E",
                fontSize: scale(28),
                fontWeight: "700",
              }}
            >
              Welcome back!{"\n"}Glad to see you, Again!
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TextInput
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              placeholder={"Email"}
              style={styles.input}
            />
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder={"Password"}
              secureTextEntry={true}
              style={styles.input}
            />

            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.onLogin}
            >
              {!this.state.loader ? (
                <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                  Login
                </Text>
              ) : null}
              {this.state.loader ? (
                <ActivityIndicator size="large" color={"#ffffff"} />
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.replace("ForgotPassword")}
              style={{
                position: "relative",
                left: 90,
              }}
              // style={[styles.buttonContainer, styles.registerButton]}
            >
              <Text style={{ color: "#6A707C", fontWeight: "bold" }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: scale(25),
              }}
            >
              <View
                style={{
                  height: 1,
                  width: scale(24) + "%",
                  backgroundColor: "#E8ECF4",
                }}
              />
              <Text>Or Login With</Text>
              <View
                style={{
                  height: 1,
                  width: scale(24) + "%",

                  backgroundColor: "#E8ECF4",
                }}
              />
            </View>
            <View
              style={{
                marginTop: scale(25),
              }}
            >
              <SocialBox />
            </View>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {
                  // justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginTop: scale(50),
                },
              ]}
              onPress={() => {
                this.props.navigation.replace(stackNames.AUTH, {
                  screen: screenNames.REGISTER,
                });
              }}
            >
              <Text>Don't have an account?</Text>
              <Text
                style={{
                  color: "#28B67E",
                  marginLeft: scale(4),
                }}
              >
                Register now
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <AwesomeAlert
          show={showAlert}
          title={this.state.title}
          message={this.state.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="Close"
          cancelButtonColor="#AEDEF4"
          onCancelPressed={() => {
            this.hideAlert();
          }}
        />
        {/* </View> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
  },
  input: {
    // borderBottomWidth: 1,
    borderWidth: 1,
    width: 80 + "%",
    height: 56,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    borderRadius: 16,
    borderColor: "#E8ECF4",
    backgroundColor: "#F7F8F9",

    marginLeft: 4,
    // borderBottomColor: "#c4c4c4",
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 80 + "%",
    height: 56,
    borderRadius: 14,
  },
  loginButton: {
    backgroundColor: "#1C4C4E",
  },
  registerButton: {
    backgroundColor: "#4ff47c",
  },
});

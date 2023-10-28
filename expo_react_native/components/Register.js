import React from "react";
import {
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { ref, getDatabase, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import RadioForm from "react-native-simple-radio-button";
import AwesomeAlert from "react-native-awesome-alerts";
import { stackNames } from "../constants/navConsts/stackNames";
import { scale } from "react-native-size-matters";
import Header from "./header";
import SocialBox from "./socialBox";
import { screenNames } from "../constants/navConsts/screenNames";

const initialState = {
  email: "",
  name: "",
  password: "",
  cpassword: "",
  success: false,
  message: "",
  showAlert: false,
  loader: false,
  title: "",
};

export default class Register extends React.Component {
  state = initialState;

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Register",
      headerStyle: { backgroundColor: "#131d41" },
      headerTintColor: "#ffffff",
      headerLeft: () => {
        return null;
      },
    };
  };

  constructor(props) {
    super(props);
  }

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
    if (this.state.success == true) {
      this.props.navigation.replace("Login");
    }
  };

  onRegister = async (e) => {
    if (this.state.email != "") {
      if (this.state.name != "") {
        if (this.state.password != "") {
          if (this.state.cpassword != "") {
            if (this.state.password == this.state.cpassword) {
              this.setState({ loader: true });

              const auth = getAuth();

              await createUserWithEmailAndPassword(
                auth,
                this.state.email,
                this.state.password
              )
                .then((response) => {
                  console.log(response.user.uid);
                  var uid = response.user.uid;
                  set(ref(getDatabase(), "users/" + uid), {
                    id: uid,
                    name: this.state.name,
                  }).then(() => {
                    this.setState(initialState);
                    this.setState({ loader: false });
                    this.setState({
                      title: "Success!",
                      message: "Registration Successful!",
                      success: true,
                    });
                    this.showAlert();
                  });
                })
                .catch((error) => {
                  this.setState({ loader: false });
                  this.setState({ title: "Error!", message: error.message });
                  this.showAlert();
                });
            } else {
              this.setState({
                title: "Error!",
                message: "Password & Confirm Password Not Equals!",
              });
              this.showAlert();
            }
          } else {
            this.setState({
              title: "Required!",
              message: "Enter an Confirm Password!",
            });
            this.showAlert();
          }
        } else {
          this.setState({ title: "Required!", message: "Enter an Password!" });
          this.showAlert();
        }
      } else {
        this.setState({ title: "Required!", message: "Enter an Name!" });
        this.showAlert();
      }
    } else {
      this.setState({ title: "Required!", message: "Enter an Email!" });
      this.showAlert();
    }
  };

  render() {
    const { showAlert } = this.state;
    return (
      <>
        <Header navigation={this.props.navigation} />
        <ScrollView
          style={[
            styles.scrollView,
            {
              backgroundColor: "#ffffff",
            },
          ]}
        >
          <View style={styles.container}>
            {/* <Image
            source={require("./../assets/logo.png")}
            style={{ width: 350, height: 350 }}
          /> */}

            <View
              style={{
                // flex: 1,
                alignItems: "center",
                marginBottom: scale(40),
                marginTop: scale(10),
              }}
            >
              <Text
                style={{
                  color: "#1C4C4E",
                  fontSize: scale(28),
                  fontWeight: "700",
                }}
              >
                Hello!{"\n"}Register to get started
              </Text>
            </View>

            <TextInput
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              placeholder={"Email"}
              style={styles.input}
            />
            <TextInput
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}
              placeholder={"Name"}
              style={styles.input}
            />
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder={"Password"}
              secureTextEntry={true}
              style={styles.input}
            />
            <TextInput
              value={this.state.cpassword}
              onChangeText={(cpassword) => this.setState({ cpassword })}
              placeholder={"Confirm Password"}
              secureTextEntry={true}
              style={styles.input}
            />

            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.onRegister}
            >
              {!this.state.loader ? (
                <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                  Register
                </Text>
              ) : null}
              {this.state.loader ? (
                <ActivityIndicator size="large" color={"#ffffff"} />
              ) : null}
            </TouchableOpacity>

            {/* <TouchableOpacity
            onPress={() =>
              this.props.navigation.replace(stackNames.AUTH, {
                screen: stackNames.LOGIN,
              })
            }
            style={[styles.buttonContainer, styles.registerButton]}
          >
            <Text style={{ color: "#000000", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity> */}
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
              <Text>Or Register With</Text>
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
                  marginTop: scale(5),
                },
              ]}
              onPress={() => {
                this.props.navigation.replace(stackNames.AUTH, {
                  screen: screenNames.LOGIN,
                });
              }}
            >
              <Text>Already have an account?</Text>
              <Text
                style={{
                  color: "#28B67E",
                  marginLeft: scale(4),
                }}
              >
                Login Now
              </Text>
            </TouchableOpacity>

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
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  btn: {
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,

    width: 80 + "%",
    height: 56,
    marginBottom: 20,
    paddingLeft: 18,
    borderRadius: 16,

    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    borderBottomColor: "#c4c4c4",
    color: "#000000",
    borderColor: "#E8ECF4",
    backgroundColor: "#F7F8F9",
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
    backgroundColor: "#4ef08d",
  },
});

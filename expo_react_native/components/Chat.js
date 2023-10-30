import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import moment, { relativeTimeRounding } from "moment";
import LocalIP from "./localIPAddress";
import { ref, getDatabase, set, get, push } from "firebase/database";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

export default class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "ChatBot",
    headerStyle: {
      backgroundColor: "#131d41",
      elevation: 0,
    },
    headerTintColor: "#ffffff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 24,
    },

    headerLeft: () => (
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <TouchableOpacity onPress={() => navigation.navigate("DashBoard")}>
          <MaterialCommunityIcons name="menu" color="#ffffff" size={30} />
        </TouchableOpacity>
      </View>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      cid: "chatbot",
      msg: "",
      msgArray: [],
      localUri: "",
      message: "",
      showAlert: false,
      title: "",
    };

    this.loadData();
    this.interval = setInterval(() => {
      this.componentDidMount();
    }, 500);
  }

  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem("userId");

    get(ref(getDatabase(), "/messages/" + userId)).then(async (snapshot) => {
      var tmp_array = [];
      snapshot.forEach((childSnapshot) => {
        if (this.state.cid == childSnapshot.val().cid) {
          tmp_array.push({
            image: childSnapshot.val().image,
            message: childSnapshot.val().message,
            time: childSnapshot.val().time,
            user: childSnapshot.val().user,
          });
        }
      });
      this.setState({ msgArray: tmp_array });
    });
  };

  onSend = async () => {
    if (this.state.msg != "") {
      const currentDate = moment(new Date()).format("YYYY-MM-DD_hh:mm:ss");
      const userId = await AsyncStorage.getItem("userId");

      push(ref(getDatabase(), "messages/" + userId), {
        cid: this.state.cid,
        message: this.state.msg,
        time: currentDate,
        user: "user",
      })
        .then(async () => {
          var msg = this.state.msg;
          this.setState({ msg: "" });
          const url = "http://" + LocalIP + ":7777/chatbot";
          const data = JSON.stringify({ text: msg });
          await axios
            .post(url, data, {
              headers: { "Content-Type": "application/json" },
            })
            .then(async (res) => {
              console.log(res.data);
              push(ref(getDatabase(), "messages/" + userId), {
                cid: this.state.cid,
                message: res.data.reply,
                time: currentDate,
                user: "bot",
              }).catch((error) => {
                this.setState({ title: "Error!", message: error });
                this.showAlert();
              });
            });
        })
        .catch((error) => {
          this.setState({ title: "Error!", message: error });
          this.showAlert();
        });
    } else {
      this.setState({
        title: "Required!",
        message: "Please Type Your Message!",
      });
      this.showAlert();
    }
  };

  loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

    const userId = await AsyncStorage.getItem("userId");

    this.setState({ userId: userId });

    if (isLoggedIn !== "true") {
    }
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
    const { showAlert, msgArray, msg } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#1C4C4E",
            height: scale(200),
            paddingHorizontal: scale(20),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: scale(20),
              alignItems: "center",
            }}
          >
            <Image
              source={require("./../assets/Group.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text
              style={{
                fontSize: scale(20),
                color: "#ffffff",
              }}
            >
              ChatBot
            </Text>
            <Image
              source={require("./../assets/Group.png")}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View
            style={{
              marginTop: scale(20),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                backgroundColor: "#28B67E",

                borderRadius: scale(50),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={require("./../assets/rob2.png")} />
            </View>
            <View
              style={{
                marginLeft: scale(20),
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                }}
              >
                Clever Usual Reply Time
              </Text>
              <Text
                style={{
                  color: "gray",
                }}
              >
                2 min
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: "#FFFFFF",
              marginTop: scale(20),
            }}
          >
            This is private message, between you and Clever. this chat is end to
            end encrypted...
          </Text>
        </View>

        <View
          style={{
            width: 100 + "%",
            flexDirection: "row",
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          {/* <View style={{ width: 20 + "%" }}>
            <Image
              source={require("./../assets/logo.png")}
              style={{ width: 80, height: 80 }}
            />
          </View> */}
          {/* <View
            style={{ width: 80 + "%", alignItems: "center", marginTop: 20 }}
          >
            <Text
              style={{ color: "#000000", fontWeight: "bold", fontSize: 24 }}
            >
              ChatBot
            </Text>
          </View> */}
        </View>
        <ScrollView
          style={styles.scrollView}
          ref={(ref) => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() =>
            this.scrollView.scrollToEnd({ animated: true })
          }
        >
          {msgArray.map((msgs) => {
            if (msgs.user == "user") {
              return (
                <View style={styles.userChatView}>
                  <View>
                    <Text style={styles.userChat}>{msgs.message}</Text>
                  </View>
                </View>
              );
            } else if (msgs.user == "bot") {
              return (
                <View style={styles.partnerChatView}>
                  <View>
                    <Text style={styles.partnerChat}>{msgs.message}</Text>
                  </View>
                </View>
              );
            }
          })}
        </ScrollView>

        <View style={{ width: 98 + "%", flexDirection: "row", marginTop: 10 }}>
          <View style={{ width: 80 + "%", alignItems: "center" }}>
            <TextInput
              placeholder="Type Your Message"
              value={this.state.msg}
              onChangeText={(msg) => this.setState({ msg })}
              multiline={true}
              maxLength={200}
              numberOfLines={5}
              style={styles.input}
            />
          </View>
          <View style={{ width: 20 + "%", alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.listButton, styles.editButton]}
              onPress={this.onSend}
            >
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>

        <AwesomeAlert
          show={showAlert}
          title={this.state.title}
          message={this.state.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="Close"
          cancelButtonColor="#1dc48c"
          onCancelPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listImage: {
    width: 60,
    height: 60,
  },
  input: {
    borderBottomWidth: 1,
    width: 90 + "%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    borderBottomColor: "#c4c4c4",
    color: "#000000",
  },
  TextInputStyleClass: {
    borderBottomWidth: 1,
    width: 80 + "%",
    height: 100,
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
    width: 80 + "%",
    height: 40,
    borderRadius: 60,
  },
  listButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 95 + "%",
    marginTop: 10,
    height: 40,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: "#ffd175",
  },
  editButton: {
    backgroundColor: "#000000",
  },
  deleteButton: {
    backgroundColor: "#ed3228",
  },
  registerButton: {
    backgroundColor: "#000000",
  },
  userChat: {
    backgroundColor: "#575757",
    color: "#ffffff",
    padding: 10,
    borderTopRightRadius: 0,
    borderRadius: 10,
    fontSize: 14,
  },
  userChatImage: {
    borderColor: "#1dc48c",
    width: 260,
    height: 260,
    borderTopRightRadius: 0,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 5,
  },
  partnerChatImage: {
    borderColor: "#000000",
    width: 260,
    height: 260,
    borderTopLeftRadius: 0,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 5,
  },
  userChatView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  partnerChat: {
    backgroundColor: "#1dc48c",
    color: "#000000",
    padding: 10,
    borderTopLeftRadius: 0,
    borderRadius: 10,
    fontSize: 14,
  },
  partnerChatView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});
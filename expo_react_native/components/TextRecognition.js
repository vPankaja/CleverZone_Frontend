import React from "react";
import {
  ActivityIndicator,
  Picker,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { screenNames } from "../constants/navConsts/screenNames";
import { stackNames } from "../constants/navConsts/stackNames";

export default class TextRecognition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localUri: "",
      resultUri: "",
      resultTxt: "",
      message: "",
      showAlert: false,
      result: false,
      title: "",
      loader: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Text Recognition",
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

  uploadImage = async (uri_data) => {
    console.log(uri_data);
    const data = new FormData();
    await data.append("file", {
      uri: uri_data,
      name: "photo.jpg",
      type: "image/jpg",
    });
    try {
      await axios
        .post("http://" + LocalIP + ":3500/main/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          console.log(res.data.filename);
          const url = "http://" + LocalIP + ":7777/text";
          const data = JSON.stringify({ url: res.data.filename });
          await axios
            .post(url, data, {
              headers: { "Content-Type": "application/json" },
            })
            .then(async (res) => {
              console.log(res.data);
              this.setState({
                loader: false,
                result: true,
                resultTxt:
                  res.data.result + " || Accuracy: " + res.data.accuracy,
              });
              this.props.navigation.navigate(stackNames.HOME, {
                screen: screenNames.RESULTS,
                params: {
                  result: res.data.result,
                  resultMain:
                    res.data.result + " || Accuracy: " + res.data.accuracy,
                  resultTxt: res.data.text_data,
                },
              });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  onInsert = async (e) => {
    if (this.state.localUri != "") {
      this.setState({ loader: true });

      await this.uploadImage(this.state.localUri);
    } else {
      this.setState({ title: "Required!", message: "Please choose image!" });
      this.showAlert();
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

  openImagePickerAsync = async (x) => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      this.setState({
        title: "Permission Denied!",
        message: "Permission to access camera roll is required!",
      });
      this.showAlert();
      return;
    }

    let pickerResult;

    if (x === 1) {
      pickerResult = await ImagePicker.launchImageLibraryAsync();
    } else {
      pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (pickerResult.cancelled === true) {
      return;
    }

    await this.setState({ localUri: pickerResult.uri });
  };

  open_image_option = async () => {
    Alert.alert("Select Option", "Camera or Gallery", [
      {
        text: "Camera",
        onPress: () => {
          this.openImagePickerAsync(0);
        },
      },
      {
        text: "Gallery",
        onPress: () => {
          this.openImagePickerAsync(1);
        },
      },
    ]);
  };

  render() {
    const { showAlert } = this.state;

    //     return (
    //       <ScrollView style={styles.scrollView}>
    //         <View style={styles.container}>
    //           <View style={styles.center}>
    //             {/* <Image
    //               source={require("./../assets/logo.png")}
    //               style={{ width: 150, height: 150, marginBottom: 20, marginTop: 10 }}
    //             /> */}
    //           </View>

    //           <Text style={styles.labelText}>Upload Your Image</Text>
    //           <View style={styles.center}>
    //             <TouchableOpacity
    //               onPress={this.open_image_option}
    //               style={{
    //                 width: 80 + "%",
    //                 height: Dimensions.get("window").width * 0.8,
    //                 borderWidth: 1,
    //                 marginBottom: 10,
    //                 marginTop: 10,
    //                 borderColor: "#c4c4c4",
    //               }}
    //             >
    //               <View>
    //                 <Image
    //                   source={{ uri: this.state.localUri }}
    //                   style={{ width: 100 + "%", height: 100 + "%" }}
    //                 />
    //               </View>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //               style={[
    //                 styles.buttonContainer,
    //                 styles.registerButton,
    //                 { width: 50 + "%" },
    //               ]}
    //               onPress={this.open_image_option}
    //             >
    //               <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
    //                 Choose Image
    //               </Text>
    //             </TouchableOpacity>
    //           </View>

    //           <View style={styles.center}>
    //             <TouchableOpacity
    //               style={[styles.buttonContainer, styles.loginButton]}
    //               onPress={this.onInsert}
    //             >
    //               {!this.state.loader ? (
    //                 <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
    //                   Upload
    //                 </Text>
    //               ) : null}
    //               {this.state.loader ? (
    //                 <ActivityIndicator size="large" color={"#ffffff"} />
    //               ) : null}
    //             </TouchableOpacity>
    //           </View>
    //           {this.state.result == true
    //             ? [
    //                 <View style={styles.center}>
    //                   <View>
    //                     <Text style={{ fontWeight: "bold", fontSize: 18 }}>
    //                       {this.state.resultTxt}
    //                     </Text>
    //                   </View>
    //                 </View>,
    //               ]
    //             : null}

    //           <AwesomeAlert
    //             show={showAlert}
    //             title={this.state.title}
    //             message={this.state.message}
    //             closeOnTouchOutside={true}
    //             closeOnHardwareBackPress={false}
    //             showCancelButton={true}
    //             cancelText="Close"
    //             cancelButtonColor="#AEDEF4"
    //             onCancelPressed={() => {
    //               this.hideAlert();
    //             }}
    //           />
    //         </View>
    //       </ScrollView>
    //     );
    //   }
    // }

    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     backgroundColor: "#ffffff",
    //   },
    //   center: {
    //     alignItems: "center",
    //   },
    //   labelText: {
    //     fontWeight: "bold",
    //     fontSize: 16,
    //     textAlign: "center",
    //     marginTop: 10,
    //   },
    //   firstLabelText: {
    //     fontWeight: "bold",
    //     fontSize: 14,
    //     marginLeft: 10 + "%",
    //     marginTop: 10,
    //   },
    //   input: {
    //     borderBottomWidth: 1,
    //     width: 80 + "%",
    //     height: 45,
    //     marginBottom: 20,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     borderBottomColor: "#c4c4c4",
    //     color: "#000000",
    //   },
    //   TextInputStyleClass: {
    //     borderBottomWidth: 1,
    //     width: 80 + "%",
    //     height: 100,
    //     marginBottom: 20,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     marginLeft: 4,
    //     borderBottomColor: "#c4c4c4",
    //     color: "#000000",
    //   },
    //   buttonContainer: {
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginBottom: 10,
    //     width: 80 + "%",
    //     height: 40,
    //     borderRadius: 60,
    //   },
    //   loginButton: {
    //     backgroundColor: "#131d41",
    //   },
    //   registerButton: {
    //     backgroundColor: "#4ff47c",
    //   },
    // });
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {/* Your app logo or branding */}
          {/* <Image source={require("./../assets/logo.png")} style={styles.logo} /> */}
          <Text style={styles.title}>Text Recognition</Text>
        </View>

        <Text style={styles.labelText}>Upload Your Image</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={this.open_image_option}
            style={styles.imagePicker}
          >
            {this.state.localUri ? (
              <Image
                source={{ uri: this.state.localUri }}
                style={styles.image}
              />
            ) : (
              <MaterialCommunityIcons name="camera" color="#c4c4c4" size={50} />
            )}
          </TouchableOpacity>
          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.chooseImageButton}
              onPress={this.open_image_option}
            >
              <Text style={styles.chooseImageText}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.uploadButton,
                this.state.loader && styles.disabledButton,
              ]}
              onPress={this.onInsert}
              disabled={this.state.loader}
            >
              {this.state.loader ? (
                <ActivityIndicator size="large" color="#ffffff" />
              ) : (
                <Text style={styles.uploadButtonText}>Upload</Text>
              )}
            </TouchableOpacity>
            {this.state.result && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{this.state.resultTxt}</Text>
              </View>
            )}
          </Card>
        </View>

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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 10,
    color: "#131d41",
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagePicker: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#c4c4c4",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  chooseImageButton: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    borderColor: "#131d41",
    borderWidth: 2,
    borderCurve: 10,
    marginBottom: 10,
  },
  chooseImageText: {
    color: "#131d41",
    fontWeight: "bold",
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#131d41",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#c4c4c4",
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  resultText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  card: {
    marginTop: 20,
    width: "100%",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 200,
    backgroundColor: "#CFDEF2",
    paddingBottom: 20,
  },
});

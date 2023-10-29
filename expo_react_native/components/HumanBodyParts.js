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
import Header from "./header";
import LocalIP from "./localIPAddress";
import BottomSheet from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";
import { scale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { screenNames } from "../constants/navConsts/screenNames";
import { stackNames } from "../constants/navConsts/stackNames";
import Header2 from "./header2";

export default class HumanBodyParts extends React.Component {
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
    title: "Human Body Parts",
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
        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.DASHBOARD)}
        >
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
          const url = "http://" + LocalIP + ":7777/bodyparts";
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
                  res.data.bodyparts + " || Accuracy: " + res.data.accuracy,
              });
              // this.props.navigation.navigate(stackNames.HOME, {
              //   screen: screenNames.RESULTS,
              //   params: {
              //     result: res.data.bodyparts,
              //     resultMain:
              //       res.data.bodyparts + " || Accuracy: " + res.data.accuracy,
              //     resultTxt: res.data.text_data,
              //   },
              // });
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

    if (this.state.result) {
      this.setState({ SuccessBottomSheetVisible: true });
    } else {
      this.setState({ FailedBottomSheetVisible: true });
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
    const snapPoints = ["25%", "25%"];

    //     return (
    //       <ScrollView style={styles.scrollView}>
    //         <View style={styles.container}>
    //           <View style={styles.center}>
    //             <Image
    //               source={require("./../assets/logo.png")}
    //               style={{
    //                 width: 150,
    //                 height: 150,
    //                 marginBottom: 20,
    //                 marginTop: 10,
    //               }}
    //             />
    //           </View>

    //           <Text style={styles.labelText}>Upload Image:</Text>
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
    //     fontSize: 14,
    //     marginLeft: 10 + "%",
    //   },
    //   firstLabelText: {
    //     fontWeight: "bold",
    //     fontSize: 14,
    //     marginLeft: 10 + "%",
    //     marginTop: 2 + "%",
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
      <>
        <Header2 />

        <ScrollView style={styles.container}>
          {/* Background Blur View */}
          {/* {this.state.SuccessBottomSheetVisible && (
          <BlurView
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            blurType="light" // You can choose the desired blur type
          />
        )} */}
          <View
            style={{
              backgroundColor: "#1C4C4E",
              height: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontFamily: "serif",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#1C4C4E",
                paddingTop: 0,
                padding: 10,
                textAlign: "center",
              }}
            >
              Human Body Parts Recognition
            </Text>
          </View>
          <View style={styles.header}>
            {/* Your app logo or branding */}
            {/* <Image source={require("./../assets/logo.png")} style={styles.logo} /> */}
            {/* <Text style={styles.title}>Text Recognition</Text> */}
          </View>

          <Text style={styles.labelText}>Upload Image</Text>
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
                <MaterialCommunityIcons
                  name="camera"
                  color="#c4c4c4"
                  size={60}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: scale(40) }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  borderColor: "#1C4C4E",
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 150,
                  height: 50,
                }}
                onPress={this.open_image_option}
              >
                <Text style={{ color: "#1C4C4E" }}>Choose Image</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  backgroundColor: "#1C4C4E",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 150,
                  height: 50,
                }}
                onPress={this.onInsert}
                disabled={this.state.loader}
              >
                {this.state.loader ? (
                  <ActivityIndicator size="large" color="#ffffff" />
                ) : (
                  <Text style={{ color: "white" }}>Upload</Text>
                )}
              </TouchableOpacity>
            </View>
            {this.state.result && this.state.SuccessBottomSheetVisible}
          </View>

          <BottomSheet
            ref={this.bottomSheetRef}
            index={this.state.SuccessBottomSheetVisible ? 0 : -1}
            snapPoints={snapPoints}
            onChange={this.handleSheetChanges}
            enablePanDownToClose={true}
            handleComponent={() => <></>}
            style={{
              borderTopLeftRadius: 26,
              borderTopRightRadius: 26,
              backgroundColor: "#FFF",
              padding: 16,
              borderRadius: 8,
            }}
            backgroundStyle={{
              borderTopLeftRadius: 26,
              borderTopRightRadius: 26,
              borderWidth: 1,
              borderColor: "#EAEAEA",
              backgroundColor: "#FFF",
            }}
          >
            <View
              style={{
                paddingTop: 0,
                backgroundColor: "white",
                borderRadius: 8,
                padding: 16,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 0,
                  marginVertical: 10,
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Identified Body Part: {this.state.resultTxt}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("HumanResults")}
                >
                  <View
                    style={{
                      backgroundColor: "#28B67E",
                      width: scale(200),
                      height: scale(50),
                      borderRadius: 14,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Icon
                      name="book"
                      size={20}
                      style={{ marginRight: 5 }}
                      color="#fff"
                    />
                    <Text style={{ color: "#fff", fontSize: 18 }}>
                      Explore Details
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>

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
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // padding: 20,
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
    width: 250,
    height: 250,
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

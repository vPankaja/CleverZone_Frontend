import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import AwesomeAlert from "react-native-awesome-alerts";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import Slideshow from "./SlideShow";
import { screenNames } from "../constants/navConsts/screenNames";
import { scale } from "react-native-size-matters";
import BottomSheet from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      showAlert: false,
      title: "",
      index: 1,
      scan: -1,
      anatomyBottomSheetVisible: false,
      microBioBottomSheetVisible: false,
      zoologyBottomSheetVisible: false,
  };
    this.anatomyBottomSheetRef = React.createRef();
    this.microBioBottomSheetRef = React.createRef();
    this.zoologyBottomSheetRef = React.createRef();
  }


  logout = async () => {
    AsyncStorage.clear();
    this.props.navigation.replace("Login");
  };
  handleSheetChanges = (index) => {
    // console.log("handleSheetChanges", index);

    if (index == -1) {
      console.log("handleSheetChanges", index);
      this.setState({
        scan: -1,
      });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: "DashBoard",
    headerStyle: {
      backgroundColor: "#131d41",
      elevation: 0,
    },
    headerTintColor: "#ffffff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 24,
    },
  });

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

  // showBottomSheet = () => {
  //   this.setState({
  //     scan: 0,
  //   });
  // };
  showBottomSheet = (sheetType) => {
    this.setState({
      anatomyBottomSheetVisible: sheetType === "anatomy",
      microBioBottomSheetVisible: sheetType === "microBio",
      zoologyBottomSheetVisible: sheetType === "zoology",
    });
  };

  render() {
    const { showAlert } = this.state;
    const snapPoints = ["30%", "20%"];
    return (
      // <View style={styles.container}>
      //   {/* <Image source={require('./../assets/logo.png')}
      //     style={{width: 200, height: 200 ,marginBottom:50 }} /> */}

      //   <TouchableOpacity
      //     style={[styles.buttonContainer, styles.loginButton]}
      //     onPress={() => this.props.navigation.navigate("HumanBodyParts")}
      //   >
      //     <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
      //       Human Body Parts
      //     </Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={[styles.buttonContainer, styles.loginButton]}
      //     onPress={() => this.props.navigation.navigate("TextRecognition")}
      //   >
      //     <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
      //       Micro-Biology
      //     </Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={[styles.buttonContainer, styles.loginButton]}
      //     onPress={() => this.props.navigation.navigate("AnimalRecognition")}
      //   >
      //     <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Zoology</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     activeOpacity={0.7}
      //     onPress={() => this.props.navigation.navigate("Chat")}
      //     style={styles.touchableOpacityStyle}
      //   >
      //     <Image
      //       source={require("./../assets/bot.png")}
      //       style={styles.floatingButtonStyle}
      //     />
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={[styles.buttonContainer, styles.registerButton]}
      //     onPress={this.logout}
      //   >
      //     <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Logout</Text>
      //   </TouchableOpacity>

      //   <AwesomeAlert
      //     show={showAlert}
      //     title={this.state.title}
      //     message={this.state.message}
      //     closeOnTouchOutside={true}
      //     closeOnHardwareBackPress={false}
      //     showCancelButton={true}
      //     cancelText="Close"
      //     cancelButtonColor="#AEDEF4"
      //     onCancelPressed={() => {
      //       this.hideAlert();
      //     }}
      //   />
      // </View>
      <>
      <ScrollView style={styles.container2}>
        <View
          style={{
            backgroundColor: "#1C4C4E",
            height: scale(240),
            paddingLeft: 20,
            paddingTop: 10,
          }}
        >
          <View>
            <Image source={require("../assets/Logo_new.png")} />
          </View>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "#fff",
                marginTop: scale(10),
                fontWeight: "600",
                marginLeft: scale(10),
              }}
            >
              Welcome to{"\n"}Clever Zone!
            </Text>
            <Image
              source={require("../assets/Welcome_1.png")}
              style={{
                marginTop: scale(4),
                marginLeft: scale(40),
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: scale(302),
            backgroundColor: "#28B67E",
            height: scale(154),
            position: "relative",
            top: scale(-50),
            marginLeft: scale(25),
            borderRadius: scale(15),
          }}
        >
          <Text
            style={{
              color: "#fff",
              marginTop: scale(20),
              marginLeft: scale(20),
              fontSize: scale(13),
              fontWeight: "500",
            }}
          >
            Discover life stories in every {"\n"}cell with our biology app!
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              width: scale(100),
              height: scale(40),
              borderRadius: scale(10),
              alignItems: "center",
              justifyContent: "center",
              marginLeft: scale(20),
              marginTop: scale(30),
            }}
            onPress={() => this.showBottomSheet()}
          >
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Scan now!
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              // top: scale(0),
              bottom: scale(0),
              width: scale(120),
              height: scale(120),
              backgroundColor: "#FFDC84",
              // top: scale(30),
              right: scale(0),
              borderTopLeftRadius: scale(100),
              alignItems: "center",
              justifyContent: "center",
              borderBottomRightRadius: scale(10),
              // border,
            }}
          >
            <Image
              source={require("../assets/Bullet_1.png")}
              style={{
                width: scale(90),
                height: scale(52),
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: scale(20),
            gap: scale(5),
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                height: scale(154),
                width: scale(102),
                backgroundColor: "#28B67E",
                borderRadius: scale(15),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => this.showBottomSheet("anatomy")}
            >
              <Image
                source={require("../assets/Human_Body_1.png")}
                style={{
                  width: scale(78),
                  height: scale(150),
                  marginTop: scale(4),
                  // marginLeft: scale(10),
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontSize: scale(12),
                fontWeight: "800",
                color: "#1C4C4E",
                marginTop: scale(5),
              }}
            >
              Anatomy
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                height: scale(154),
                width: scale(102),
                backgroundColor: "#28B67E",
                borderRadius: scale(15),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => this.showBottomSheet("microBio")}
            >
              <Image
                source={require("../assets/nerve.png")}
                style={{
                  width: scale(78),
                  height: scale(150),
                  marginTop: scale(4),
                  // marginLeft: scale(10),
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontSize: scale(12),
                fontWeight: "800",
                color: "#1C4C4E",
                marginTop: scale(5),
              }}
            >
              Micro-Bio
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                height: scale(154),
                width: scale(102),
                backgroundColor: "#28B67E",
                borderRadius: scale(15),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => this.showBottomSheet("zoology")}
            >
              <Image
                source={require("../assets/flamingo.png")}
                style={{
                  width: scale(72),

                  height: scale(112),
                  marginTop: scale(40),
                  // marginLeft: scale(10),
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontSize: scale(12),
                fontWeight: "800",
                color: "#1C4C4E",
                marginTop: scale(5),
              }}
            >
              Zoology
            </Text>
          </View>
          {/* <Text>sdsd</Text> */}
        </View>
        <View
          style={{
            marginHorizontal: scale(20),
            marginTop: scale(20),
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: scale(14),
              color: "#949BA5",
            }}
          >
            Clever Zone covers the 9th, 10 th, 11th lessons of your syllabus.
            Hope this will help you to get a better understanding of your
            syllabus.
          </Text>
        </View>

  

        {/* <View style={styles.cardWrapper}>
          <Card style={styles.card}>
            <View style={styles.cardContentWrapper}>
              <Card.Content style={styles.cardContent}>
                <Title style={styles.title}>Welcome to Clever Zone</Title>
                <Text style={styles.description}>
                  We digitalized your syllabus
                </Text>
              </Card.Content>
              <Image
                source={require("./../assets/homecard.png")}
                style={styles.cardImage}
              />
            </View>
          </Card>
        </View> */}
        {/* <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(screenNames.HUMAN_BODY)
            }
            style={styles.cardWrapper}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent2}>
                <Title style={styles.title2}>Anatomy</Title>
              </Card.Content>
              <Image
                source={require("./../assets/human.png")}
                style={styles.cardImage2}
              />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(screenNames.TEXT_RECOGNITION)
            }
            style={styles.cardWrapper}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent2}>
                <Title style={styles.title2}>Micro-Bio</Title>
              </Card.Content>
              <Image
                source={require("./../assets/micro.png")}
                style={styles.cardImage2}
              />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(screenNames.ANIMAL)}
            style={styles.cardWrapper}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent2}>
                <Title style={styles.title2}>Zoology</Title>
              </Card.Content>
              <Image
                source={require("./../assets/animal.png")}
                style={styles.cardImage2}
              />
            </Card>
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
        </View> */}

        {/* <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>
            "Discover life's stories in every cell with our biology app."
          </Text>
        </View> */}
        {/* <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 10,
              color: "grey",
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            Clever Zone covers the 9th, 10 th, 11th lessons of your syllabus.
            Hope this will help you to get a better understanding of your
            syllabus.
          </Text>
        </View> */}

        {/* <View>
          <Slideshow />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 10,
              color: "grey",
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            Clever Zone covers the 9th, 10 th, 11th lessons of your syllabus.
            Hope this will help you to get a better understanding of your
            syllabus. Clever Zone covers the 9th, 10 th, 11th lessons of your
            syllabus. Hope this will help you to get a better understanding of
            your syllabus.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate(screenNames.CHAT)}
            style={styles.touchableOpacityStyle}
          >
            <Image
              source={require("./../assets/bot.png")}
              style={styles.floatingButtonStyle}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.registerButton]}
            onPress={this.logout}
          >
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Logout</Text>
          </TouchableOpacity> */}
        {/* </View> */}
      </ScrollView>
      <BottomSheet
      ref={this.anatomyBottomSheetRef}
      index={this.state.anatomyBottomSheetVisible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={this.handleSheetChanges}
      enablePanDownToClose={true}
      handleComponent={() => (
        <View
          style={{
            backgroundColor: "#1C4C4E", 
            height: 8, 
            width: 60, 
            alignSelf: "center",
            borderRadius: 4, 
            marginTop: 10,
          }}
        />
      )}
      style={{
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        borderWidth: 1,
        borderColor: "black",
      }}
      backgroundStyle={{  
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        borderWidth: 1,
        borderColor: "black",
      }}
    >
      <View style={styles.anatomyBottomSheetContent}>
        <Text style={styles.title}>Unlock the world of anatomy</Text>
        <Text style={styles.description}>
          Scan your documents or dive into our provided lessons.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => this.props.navigation.navigate("HumanBodyParts")}
          >
            <View style={styles.buttonInner}>
              <Icon name="camera" size={20} style={styles.icon} color="#fff" />
              <Text style={styles.buttonText}>Scan Now</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lessonButton}
            onPress={() => this.props.navigation.navigate("AnatomyLesson")}
          >
            <View style={styles.buttonInner}>
              <Icon name="book" size={20} style={styles.icon} color="#fff" />
              <Text style={styles.buttonText}>Lessons</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>

         


<BottomSheet
  ref={this.microBioBottomSheetRef}
  index={this.state.microBioBottomSheetVisible ? 0 : -1}
  snapPoints={snapPoints}
  onChange={this.handleSheetChanges}
  enablePanDownToClose={true}
  handleComponent={() => (
    <View
      style={{
        backgroundColor: "#1C4C4E",
        height: 8,
        width: 60,
        alignSelf: "center",
        borderRadius: 4,
        marginTop: 10,
      }}
    />
  )}
  style={{
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    borderColor: "black",
  }}
  backgroundStyle={{
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    borderColor: "black",
  }}
>
  <View style={styles.microBioBottomSheetContent}>
    <Text style={styles.title}>Unlock the world of Micro-Biology</Text>
    <Text style={styles.description}>
      Scan your documents or dive into our provided lessons.
    </Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => this.props.navigation.navigate("TextRecognition")}
      >
        <View style={styles.buttonInner}>
          <Icon name="camera" size={20} style={styles.icon} color="#fff" />
          <Text style={styles.buttonText}>Scan Now</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.lessonButton}
        onPress={() => this.props.navigation.navigate("TextRecognitionLesson")}
      >
        <View style={styles.buttonInner}>
          <Icon name="book" size={20} style={styles.icon} color="#fff" />
          <Text style={styles.buttonText}>Lessons</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
</BottomSheet>


<BottomSheet
  ref={this.zoologyBottomSheetRef}
  index={this.state.zoologyBottomSheetVisible ? 0 : -1}
  snapPoints={snapPoints}
  onChange={this.handleSheetChanges}
  enablePanDownToClose={true}
  handleComponent={() => (
    <View
      style={{
        backgroundColor: "#1C4C4E",
        height: 8,
        width: 60,
        alignSelf: "center",
        borderRadius: 4,
        marginTop: 10,
      }}
    />
  )}
  style={{
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    borderColor: "black",
  }}
  backgroundStyle={{
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    borderColor: "black",
  }}
>
  <View style={styles.zoologyBottomSheetContent}>
    <Text style={styles.title}>Unlock the world of Zoology</Text>
    <Text style={styles.description}>
      Scan your documents or dive into our provided lessons.
    </Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => this.props.navigation.navigate("AnimalRecognition")}
      >
        <View style={styles.buttonInner}>
          <Icon name="camera" size={20} style={styles.icon} color="#fff" />
          <Text style={styles.buttonText}>Scan Now</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.lessonButton}
        onPress={() => this.props.navigation.navigate("AnimalRecognitionLesson")}
      >
        <View style={styles.buttonInner}>
          <Icon name="book" size={20} style={styles.icon} color="#fff" />
          <Text style={styles.buttonText}>Lessons</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
</BottomSheet>
    </>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  cardWrapper: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  cardContentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  title: {
    color: "darkblue",
    fontWeight: "bold",
  },
  description: {
    color: "grey",
  },
  cardImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    width: 20 + "%",
    height: 40,
    borderRadius: 60,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#131d41",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 0, // mek
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 80,
    height: 80,
  },
  registerButton: {
    backgroundColor: "transparent",
    borderColor: "#131d41",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  cardWrapper: {
    flex: 1,
    margin: 10,
  },
  card: {
    elevation: 3,
  },
  cardContent: {
    padding: 10,
  },
  cardContent2: {
    padding: 10,
    paddingBottom: 0,
  },
  title2: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardImage2: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  anatomyBottomSheetContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20, 
  },
  microBioBottomSheetContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
  },
  zoologyBottomSheetContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
  },
  title: {
    fontSize: 16, 
    fontWeight: "bold",
    color: "#28B67E", 
    marginBottom: 10, 
  },
  description: {
    fontSize: 14, 
    marginBottom: 20, 
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scanButton: {
    backgroundColor: "#1C4C4E",
    width: scale(120),
    height: scale(50),
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonButton: {
    backgroundColor: "#28B67E",
    width: scale(120),
    height: scale(50),
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 5,
  },
  buttonText: {
    color: "#fff",
  },
  
});

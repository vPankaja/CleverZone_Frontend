import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import Image1 from "./../assets/BRAIN.png";
import Image2 from "./../assets/HEART.png";
import Image3 from "./../assets/LUNGS.png";
import Image4 from "./../assets/acetobactor.png";
import Image5 from "./../assets/nostoc.png";
import Image6 from "./../assets/penicillium.png";
import Image7 from "./../assets/SPIDER.png";
import Image8 from "./../assets/STARFISH.png";
import Image9 from "./../assets/WHALE.png";
import AwesomeAlert from "react-native-awesome-alerts";
import { stackNames } from "../constants/navConsts/stackNames";
import { screenNames } from "../constants/navConsts/screenNames";
import Icon from "react-native-vector-icons/FontAwesome";

export default class AnatomyResults extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state);

    const params = this.props.route.params;

    this.state = {
      results: params.result,
      resultMain: params.resultMain,
      resultTxt: params.resultTxt,
      imageUri: "./../assets/logo.png",
      message: "",
      showAlert: false,
      title: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Results Page",
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

  componentDidMount() {
    if (this.state.results == "Whales") {
      this.setState({
        imageUri: Image.resolveAssetSource(Image9).uri,
      });
    } else if (this.state.results == "Spider") {
      this.setState({
        imageUri: Image.resolveAssetSource(Image7).uri,
      });
    } else if (this.state.results == "Starfish") {
      this.setState({
        imageUri: Image.resolveAssetSource(Image8).uri,
      });
    } else if (this.state.results == "Lungs") {
      this.setState({
        imageUri: Image.resolveAssetSource(Image3).uri,
      });
    } else if (this.state.results == "Heart") {
      this.setState({
        imageUri: Image.resolveAssetSource(Image2).uri,
      });
    } else if (this.state.results == "Brain") {
      this.setState({
        imageUri: Image.resolveAssetSource(Image1).uri,
      });
    } else if (this.state.results == "Penicillium") {
      this.setState({
        imageUri: Image.resolveAssetSource(Image6).uri,
      });
    } else if (this.state.results == "Nostoc") {
      this.setState({
        imageUri: Image.resolveAssetSource(Image5).uri,
      });
    } else if (this.state.results == "Azotobactor") {
      this.setState({
        imageUri: Image.resolveAssetSource(Image4).uri,
      });
    }
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
  };

  render() {
    const { showAlert } = this.state;
    return (
      <ScrollView>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={20}
            color="white"
            onPress={this.handleBack}
          />
           <Image source={require("../assets/Logo_new.png")} />
          <View style={styles.rightHeader}>
            <Icon
              name="ellipsis-v"
              size={20}
              color="white"
              onPress={this.handleMenu}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 10, marginTop: 10,fontFamily: "serif",
                fontWeight: "bold", }}>
            {this.state.results}
          </Text>
          <Image
            source={{ uri: this.state.imageUri }}
            style={{
              width: 280,
              height: 250,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 14,
            }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 5, marginRight: 200 }}>
            Description
          </Text>
          <Image source={require("../assets/save.png")} style={styles.search} />
          <View>

          
          <Text style={styles.description}>{this.state.resultTxt}
            
        
          </Text>

          </View>

          {this.state.results === "Heart" && (
  <View>
    <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 10, marginHorizontal:30,marginTop: 10 }}>
      Heart Internal Appearance
    </Text>
    <Image source={require("../assets/HI.png")} style={styles.hdiamge} />
    <Text style={{ fontSize: 14, lineHeight: 20, marginLeft: 25, marginRight: 25, marginTop: 10 }}>
    The internal structure of the heart is a marvel of precision and function. It consists of four chambers: two atria and two ventricles. The right atrium receives deoxygenated blood from the body through the superior and inferior vena cava, while the left atrium receives oxygenated blood from the lungs. As blood flows from the atria into the ventricles, the heart's muscular walls contract, pumping the blood out through the aorta to supply the entire body with oxygen. Valves, such as the mitral and tricuspid valves, play a crucial role in preventing backflow and ensuring a unidirectional flow of blood. The heart's internal design, with its synchronized contractions and precise control of blood flow, is essential for maintaining a healthy circulatory system.</Text>
    <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 10,marginHorizontal:30, marginTop: 10 }}>
      Heart External Appearance
    </Text>
    <Image source={require("../assets/EA.png")} style={styles.hdiamge} />
    <Text style={{ fontSize: 14, lineHeight: 20, marginLeft: 25, marginRight: 25, marginTop: 10 }}>
      The external appearance of the heart is a remarkable organ, roughly the size of a clenched fist, nestled within the chest cavity. The aorta, the largest artery in the body, emerges from the top of the heart, serving as the main conduit to distribute oxygenated blood to the rest of the body. The superior vena cava, a large vein, enters the heart from above, carrying deoxygenated blood from the upper part of the body. On the right side of the heart, the right pulmonary artery extends to transport deoxygenated blood to the lungs for oxygenation. The heart's intricate network of vessels and chambers work tirelessly to maintain the body's circulation, ensuring the continuous flow of oxygen-rich blood to sustain life.
    </Text>
    <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 10,marginHorizontal:30, marginTop: 10 }}>
      Conducting System of the Heart
    </Text>
    <Image source={require("../assets/CS.png")} style={styles.hdiamge} />
    <Text style={{ fontSize: 14, lineHeight: 20, marginLeft: 25, marginRight: 25, marginTop: 10 }}>
    The conducting system of the heart is a network of specialized cardiac muscle cells that coordinates and regulates the heartbeat. It includes the sinoatrial (SA) node, often referred to as the heart's natural pacemaker, which initiates electrical impulses to start each heartbeat. These impulses travel through the atria, stimulating them to contract and push blood into the ventricles. The impulses then pass through the atrioventricular (AV) node, slowing down slightly to allow the ventricles to fill with blood. Finally, they travel down the bundle of His and its branches, known as Purkinje fibers, to trigger the powerful ventricular contractions, pushing blood out to the lungs and the rest of the body. This intricate system ensures the heart beats rhythmically and efficiently, pumping blood throughout the circulatory system to sustain life.




</Text>
  </View>
)}

          {this.state.results === "Brain" && (
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 10, marginHorizontal:30,marginTop: 10 }}>
                Brain Longitudinal Appearance
              </Text>
              <Image source={require("../assets/BL.png")} style={styles.hdiamge} />
              <Text style={{ fontSize: 14, lineHeight: 20, marginLeft: 25, marginRight: 25, marginTop: 10 }}>
              The longitudinal appearance of the brain reveals a complex and intricately structured organ. It is divided into two hemispheres, the left and right, each responsible for a variety of cognitive functions. The outer layer, known as the cerebral cortex, is folded into numerous convolutions and fissures, which increase the surface area for processing information. Beneath the surface, the brain is organized into distinct regions, including the frontal lobe, responsible for higher-order thinking and decision-making; the temporal lobe, involved in processing sensory input and language; the parietal lobe, responsible for sensory perception; and the occipital lobe, dedicated to visual processing. Connecting these regions is a complex network of white matter tracts that facilitate communication between different areas of the brain. The brain's longitudinal appearance reflects its remarkable complexity and its central role in governing a wide range of bodily functions and cognitive processes.</Text>
              <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 10,marginHorizontal:30, marginTop: 10}}>
                Brain Cerebral Cortex
              </Text>
              <Image source={require("../assets/CC.png")} style={styles.hdiamge} />
              <Text style={{ fontSize: 14, lineHeight: 20, marginLeft: 25, marginRight: 25, marginTop: 10 }}>
              The cerebral cortex, the brain's outermost layer, is a marvel of neural architecture. It encompasses about two-thirds of the brain's mass and is responsible for higher cognitive functions, including thinking, perception, memory, and voluntary muscle movement. This remarkable structure is divided into distinct regions, each with specialized functions. The frontal lobe is involved in decision-making and planning, the parietal lobe processes sensory information, the temporal lobe is essential for memory and language, and the occipital lobe primarily handles visual processing. The cerebral cortex's intricate network of neurons and its incredible ability to adapt and learn underpin our capacity for complex thoughts and behaviors, making it a cornerstone of human intelligence.</Text>
              </View>
          )}

          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() =>
              this.props.navigation.navigate(stackNames.HOME, {
                screen: screenNames.DASHBOARD,
              })
            }
          >
          
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
              Back to DashBoard
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
    );
  }
  handleBack = () => {
    this.props.navigation.navigate("Dashboard");
  };
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    backgroundColor: "#1C4C4E",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    fontSize: 22,
                fontFamily: "serif",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#1C4C4E",
                paddingTop: 10,
                padding: 10,
                textAlign: "center",
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
    width: 80 + "%",
    height: 40,
    borderRadius: 60,
    marginTop: 10
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
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 80,
    height: 80,
  },
  registerButton: {
    backgroundColor: "#4ff47c",
  },
  search: {
    marginTop: 10,
    margin:"auto",
    height: 40,
    width:300,
    borderRadius:15
  },
  description: {
    fontSize: 14,
    lineHeight: 20, 
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
  },
  hdiamge: {
    width: 330,
              height: 250,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 14,marginHorizontal:30,
  },
  description2: {
    fontSize: 16,
    lineHeight: 20, 
    marginLeft: 25,
    marginRight: 25,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24, 
    marginLeft: 25,
    marginRight: 25, 
  },
});

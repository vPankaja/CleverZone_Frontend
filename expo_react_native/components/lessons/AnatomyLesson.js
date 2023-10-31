import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class AnatomyLesson extends Component {
  state = {
    isModalVisible: false,
    question: "",
    answer: "",
  };
  showModal = (question, answer, answerImage) => {
    this.setState({ isModalVisible: true, question, answer, answerImage });
  };
  hideModal = () => {
    this.setState({ isModalVisible: false, question: "", answer: "" });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={20}
            color="white"
            onPress={this.handleBack}
          />
          <Text style={styles.headerText}>Human Anatomy</Text>
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
          <View style={styles.leftContainer}>
            <Text style={[styles.text, styles.textUp]}>
              Explore the wonders of Anatomy through our precise lessons and
              accelerate your understanding.
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Image
              source={require("../../assets/lesson.png")}
              style={styles.image}
            />
          </View>
        </View>
        <Image
          source={require("../../assets/search.png")}
          style={styles.search}
        />
        <View style={styles.questionList}>
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "What is Human Anatomy?",
                "Human anatomy is the study of the structure of the human body. It involves the examination of the organs, tissues, bones, and systems that make up the human organism.",
                require("../../assets/humananatomy.jpg")
              )
            }
          >
            <Text style={styles.questionText}>Define Human Anatomy</Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Function of the Skeletal System",
                "The skeletal system provides structural support to the body, protects internal organs, and allows for movement. It also stores minerals and produces blood cells.",
                require("../../assets/skeletal.png")
              )
            }
          >
            <Text style={styles.questionText}>
              Function of the Skeletal System
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Function of the Skeletal System",
                "Tidal volume (TV): This is the volume of air passing into and out of the lung with cach breath during normal breathing. On average it is about 500 ml in a resting adult human.Inspiratory reserve volume (IRV): This is the extra volume of air that can be forcibly inhaled beyond the tidal volume.Expiratory reserve volume (ERV): The extra volume of air which can be forcibly expelled from the lungs after a normal expiration.Residual volume (RV): The volume of air that remains in the lungs even after forceful expiration. This is on average is about 1,200 ml."
              )
            }
          >
            <Text style={styles.questionText}>
            Respiratory cycle and lung volumes and capacities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Function of the Eye",
                "The human eye functions by capturing light, which is then focused on the retina. Photoreceptor cells in the retina convert this light into electrical signals that are transmitted through the optic nerve to the brain. This allows us to perceive visual information from the surrounding environment.",
                require("../../assets/eye.png")
              )
            }
          >
            <Text style={styles.questionText}>Function of the Eye</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Role of the Circulatory System",
                "The circulatory system, including the heart and blood vessels, is responsible for transporting blood throughout the body. It delivers oxygen and nutrients to cells and removes waste products."
              )
            }
          >
            <Text style={styles.questionText}>
              Role of the Circulatory System
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Function of the Digestive System",
                "The digestive system processes and breaks down food, extracting nutrients and energy. It consists of organs like the stomach, small intestine, and large intestine.",
                require("../../assets/digestive.png")
              )
            }
          >
            <Text style={styles.questionText}>
              Function of the Digestive System
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Role of the Respiratory System",
                "The respiratory system allows the exchange of oxygen and carbon dioxide in the body. It includes the lungs, bronchi, and trachea.",
                require("../../assets/respiratory.jpg")
              )
            }
          >
            <Text style={styles.questionText}>
              Role of the Respiratory System
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Function of the Nervous System",
                "The nervous system controls and coordinates all body functions. It includes the brain, spinal cord, and nerves that transmit signals between cells.",
                require("../../assets/nervous.png")
              )
            }
          >
            <Text style={styles.questionText}>
              Function of the Nervous System
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={this.hideModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalQuestion}>{this.state.question}</Text>
              <Text style={styles.modalAnswer}>{this.state.answer}</Text>
              {this.state.answerImage && (
                <Image
                  source={this.state.answerImage}
                  style={styles.modalImage}
                />
              )}
              <Button title="Close" onPress={this.hideModal} />
            </View>
          </View>
        </Modal>
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
    height: 50,
    backgroundColor: "#1C4C4E",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flexDirection: "row",
    width: 390,
    height: 180,
    backgroundColor: "#1C4C4E",
  },
  leftContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "start",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 20,
  },
  text2: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingLeft: 20,
  },
  image: {
    marginTop: 20,
    width: 100,
    height: 150,
  },
  rightHeader: {
    flexDirection: "row",
  },
  search: {
    marginTop: 10,
    marginLeft: 10,
  },
  textUp: {
    marginTop: -25, // Move the text 10 pixels up
  },
  questionList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C4C4E",
    marginBottom: 10,
    backgroundColor: "#CCCCCC",
    textAlign: "center", // Center-align text
    padding: 10, // Add some padding for better appearance
    marginBottom: 10,
    borderRadius: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalQuestion: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalAnswer: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalImage: {
    width: 250, // Set the width of the image as needed
    height: 150, // Set the height of the image as needed
    resizeMode: "contain", // Adjust the image's resize mode as needed
    marginBottom: 10,
  },
});

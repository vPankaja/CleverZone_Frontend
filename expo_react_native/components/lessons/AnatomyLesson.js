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
                "Microbiology?",
                "Microbiology is the study of all living organisms that are too small to be visible with the naked eye. This includes bacteria, archaea, viruses, fungi, prions, protozoa and algae, collectively known as 'microbes'.",
                require("../../assets/microbio.jpg")
              )
            }
          >
            <Text style={styles.questionText}>Define Microbiology. </Text>
          </TouchableOpacity>
          {/* Add more questions here */}
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Forms of Bacteria ",
                "1. Spherical- Cocci 2. Rod-shaped- Bacilli 3. Spiral bacteria 4. Comma shaped- Vibrio",
                require("../../assets/forms.jpg")
              )
            }
          >
            <Text style={styles.questionText}>
              Bacterial is a type of Micro- organism having different
              morphological forms.{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Structure of a Virus.",
                "In the simpler viruses the virion consists of a single molecule of nucleic acid surrounded by a protein coat, the capsid; the capsid and its enclosed nucleic acid together constitute the nucleocapsid.",
                require("../../assets/virus.jpg")
              )
            }
          >
            <Text style={styles.questionText}> Structure of a Virus.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Cynobacteria.",
                "Cyanobacteria, also called Cyanobacteriota or Cyanophyta, are a phylum of gram-negative bacteria that obtain energy via photosynthesis",
                require("../../assets/cyno.jpg")
              )
            }
          >
            <Text style={styles.questionText}>Cynobacteria.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Application of Microbes.",
                "The fertilisation of the land, the production of fodder for cattle, compost heaps. These are all traditional applications of microbes on the farm. Without microbes, plants grow badly or not at all, and agriculture would be impossible. We use microbes more and more frequently to increase crop yields.",
                require("../../assets/uses.png")
              )
            }
          >
            <Text style={styles.questionText}>Applications of Microbes.</Text>
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

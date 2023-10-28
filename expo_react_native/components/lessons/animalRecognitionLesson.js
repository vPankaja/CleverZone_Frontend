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

export default class AnimalRecognitionLesson extends Component {
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
          <Text style={styles.headerText}>Zoology</Text>
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
              Explore the wonders of Zoology through our precise lessons and
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
                "Zoology ?",
                "Zoology, branch of biology that studies the members of the animal kingdom and animal life in general.",
                require("../../assets/animalclassify.jpg")
              )
            }
          >
            <Text style={styles.questionText}>Define Zoology. </Text>
          </TouchableOpacity>
          {/* Add more questions here */}
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Characteristics of Kingdom Animalia.",
                "The animal kingdom is the largest kingdom with over 1 million known species. They are multicellular, eukaryotic organisms, which have no cell walls. They have tissues, organs, and organ systems. They are heterotrophs, which means they must eat other organisms to obtain nutrients. Some show radial or bilateral symmetry"
              )
            }
          >
            <Text style={styles.questionText}>
              Characteristics of Kingdom Animalia.{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Phylum Cnidaria.",
                "Majority are marine, except a few fresh water species. some are microscopic, while some are large like jelly fish.",
                require("../../assets/Cnidaria.png")
              )
            }
          >
            <Text style={styles.questionText}> Phylum Cnidaria.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Phylum Platyhelminthes.",
                "The flatworms, flat worms, Platyhelminthes, or platyhelminths are a phylum of relatively simple bilaterian, unsegmented, soft-bodied invertebrates.",
                require("../../assets/plathy.jpg")
              )
            }
          >
            <Text style={styles.questionText}>Phylum Platyhelminthes.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.showModal(
                "Phylum Chordata.",
                "A chordate is a deuterostomic animal belonging to the phylum Chordata. All chordates possess, at some point during their larval or adult stages, five distinctive physical characteristics that distinguish them from other taxa..",
                require("../../assets/chordate.png")
              )
            }
          >
            <Text style={styles.questionText}>Phylum Chordata.</Text>
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

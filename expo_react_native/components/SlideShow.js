import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");
const slideHeight = 250;
const slideWidth = width * 0.9;

const slides = [
  {
    image: require("./../assets/slide1.png"),
  },
  {
    image: require("./../assets/slide2.png"),
  },
  {
    image: require("./../assets/slide3.png"),
  },
];

const Slideshow = () => {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
      {slides.map((slide, index) => (
        <View key={index} style={styles.slide}>
          <Image source={slide.image} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: slideHeight,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: slideWidth,
    height: slideHeight,
  },
});

export default Slideshow;

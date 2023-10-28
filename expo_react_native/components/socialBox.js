import { View, Text, Image } from "react-native";
import React from "react";

const SocialBox = () => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: 105,
          height: 56,
          borderColor: "#E8ECF4",
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
        }}
      >
        <Image source={require("../assets/facebook_ic.png")} />
      </View>
      <View
        style={{
          width: 105,
          height: 56,
          borderColor: "#E8ECF4",
          borderRadius: 8,
          alignItems: "center",
          borderWidth: 1,
          marginLeft: 2,

          justifyContent: "center",
        }}
      >
        <Image source={require("../assets/google_ic.png")} />
      </View>
      <View
        style={{
          width: 105,
          height: 56,
          borderColor: "#E8ECF4",
          borderRadius: 8,
          alignItems: "center",
          borderWidth: 1,
          marginLeft: 2,

          justifyContent: "center",
        }}
      >
        <Image source={require("../assets/cib_apple.png")} />
      </View>
    </View>
  );
};

export default SocialBox;

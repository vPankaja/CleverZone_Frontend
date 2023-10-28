import { View, Text, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingTop: 20,
        alignItems: "center",
        paddingBottom: 20,
        backgroundColor: "#ffffff",
      }}
    >
      <View
        style={{
          borderWidth: 1,
          width: 41,
          height: 41,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#E8ECF4",
        }}
      >
        <Image source={require("../assets/back_arrow.png")} />
      </View>
      {/* <Text>Header</Text> */}
      <Image source={require("../assets/Logo_Dark.png")} />
      <View></View>
    </View>
  );
};

export default Header;

import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const Header2 = (props) => {
 

  return (
    <View
      style={{
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 20,
        alignItems: "center",
        paddingBottom: 10,
        backgroundColor: "#1C4C4E",
      }}
    >
      <TouchableOpacity  
      onPress={() =>
                    this.props.navigation.navigate("Dashboard")
                  }>
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
          <Image source={require("../assets/white_back_arrow.png")} />
        </View>
      </TouchableOpacity>
      <View style={{ paddingLeft: 95 }}>
        <Image source={require("../assets/Logo_new.png")} />
      </View>
      <View></View>
    </View>
  );
};

export default Header2;

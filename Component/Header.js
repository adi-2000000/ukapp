import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";


const Header = () => {
  return (
    <View
      style={{
        // backgroundColor: "#003580",
        // height: 60,
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "space-around",
      }}
    >
      {/* <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 25,
          padding: 8,
        }}
      >
        <Ionicons name="car-outline" size={24} color="white" />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            color: "white",
            fontSize: 15,
          }}
        >
          
        </Text>
      </Pressable>

     

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
         
        }}
      >
        <Ionicons name="car-outline" size={26} color="white" />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            color: "white",
            fontSize: 15,
          }}
        >
          Car Rental
        </Text>
      </Pressable> */}

      {/* <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
        
         
        }}
      >
        <FontAwesome5 name="uber" size={26} color="white" />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            color: "white",
            fontSize: 15,
          }}
        >
          Taxi
        </Text>
      </Pressable> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});

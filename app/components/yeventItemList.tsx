import React from "react";
import { Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";
import simpleTextFont from "../styles/simpleTextFont";

const YEventeventList = ({yevent} : {yevent : YEvent}) => {
  return <View
    style={{
      flexDirection: "column",
      padding: 10,
      margin: 10,
      backgroundColor: mainBackgroundColor.mainBackgroundColor.backgroundColor,
      borderRadius: 10,
    }}
  >
    <Text style={[simpleTextFont.simpleTextFont, { fontWeight: "bold" }]}>
      {yevent.name}
    </Text>
    <Text style={[simpleTextFont.simpleTextFont, { color: "gray" }]}>
      {yevent.date}
    </Text>
    <Text style={[simpleTextFont.simpleTextFont]}>{yevent.location}</Text>
    <Text style={[simpleTextFont.simpleTextFont]}>{yevent.description}</Text>
    <Text style={[simpleTextFont.simpleTextFont]}>
    </Text>
    <Text
      style={[
        simpleTextFont.simpleTextFont,
        { color: "green", alignSelf: "flex-end" },
      ]}
    >
      {yevent.price === 0 ? "Gratuit" : yevent.price + "€"}
    </Text>
    {yevent.leftCapacity > 0 ? (
        <Text style={[simpleTextFont.simpleTextFont, { color: "green", alignSelf: "flex-end" }]}>
            {yevent.leftCapacity} places restantes
        </Text>
    ) : (
        <Text style={[simpleTextFont.simpleTextFont, { color: "red", alignSelf: "flex-end" }]}>
            Complet
        </Text>
    )}
  </View>;
};

export default YEventeventList;

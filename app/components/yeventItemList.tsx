import React from "react";
import { Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";
import simpleTextFont from "../styles/simpleTextFont";

interface YEventsListProps {

    yevent: YEvent;
  
    navigation?: any;
  
  }
  

const YEventItemList : React.FC<YEventsListProps> = ({yevent, navigation}) => {
  return <View
    onTouchEndCapture={() => navigation.navigate('Details', { yevent,navigation })}
    style={{
      flexDirection: "column",
      padding: 10,
      margin: 10,
      backgroundColor: mainBackgroundColor.mainBackgroundColor.backgroundColor,
      borderRadius: 10,
    }}
  >
    <Text style={[simpleTextFont.simpleTextFont, { fontWeight: "bold" }]}>
      {yevent.titre}
    </Text>
    <Text style={[simpleTextFont.simpleTextFont, { color: "gray" }]}>
      {yevent.date}
    </Text>
    <Text style={[simpleTextFont.simpleTextFont]}>{yevent.lieu}</Text>
    <Text style={[simpleTextFont.simpleTextFont]}>{yevent.description}</Text>
    <Text style={[simpleTextFont.simpleTextFont]}>
    </Text>
    <Text
      style={[
        simpleTextFont.simpleTextFont,
        { color: "green", alignSelf: "flex-end" },
      ]}
    >
      {yevent.prix === 0 ? "Gratuit" : yevent.prix + "€"}
    </Text>
    {yevent.places_restantes > 0 ? (
        <Text style={[simpleTextFont.simpleTextFont, { color: "green", alignSelf: "flex-end" }]}>
            {yevent.places_restantes} places restantes
        </Text>
    ) : (
        <Text style={[simpleTextFont.simpleTextFont, { color: "red", alignSelf: "flex-end" }]}>
            Complet
        </Text>
    )}
  </View>;
};

export default YEventItemList;

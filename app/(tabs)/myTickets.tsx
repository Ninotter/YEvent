import { Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";
import simpleTextFont from "../styles/simpleTextFont";
import { useFonts } from "expo-font";

export default function MyTickets() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text
        style={[
          mainBackgroundColor.mainBackgroundColor,
          {
            fontSize: 86,
            fontWeight: "bold",
            textAlign: "right",
          },
        ]}
      >
        My Tickets
      </Text>
    </View>
  );
}

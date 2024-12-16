import { Text, View } from "react-native";
import mainBackgroundColor from "./styles/mainBackgroundColor";
import simpleTextFont from "./styles/simpleTextFont";
import { useFonts } from "expo-font";

export default function HomeScreen() {
  useFonts({
    "Lalezar-Regular": require("../assets/fonts/Lalezar-Regular.ttf"),
  });
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View  style={
        [mainBackgroundColor.mainBackgroundColor, 
        {
          borderBottomStartRadius: 50,
          paddingBottom: 30,
          paddingStart: 10
        }
        ]}>
        <Text
          style={{
            fontSize: 86,
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          YEvent
        </Text>
        <Text style={simpleTextFont.simpleTextFont}>
          Bonjour user
        </Text>

      </View>
    </View>
  );
}

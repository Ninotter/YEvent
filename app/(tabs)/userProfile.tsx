import { Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";

export default function UserProfile({ navigation }: any) {
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
            minHeight: 80,
            maxHeight: 200,
            fontSize: 56,
            fontWeight: "bold",
            textAlign: "right",
          },
        ]}
      >
        Mon profil
      </Text>
      
    </View>
  );
}
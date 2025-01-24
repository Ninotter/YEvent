import { Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";
import YEventItemList from "../components/yeventItemList";
import YEventsList from "../components/yeventsList";

export default function MyTickets({ navigation }: any) {
  const myTickets = Array<YEvent>();
  const usedTickets = Array<YEvent>();
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
            fontSize: 56,
            fontWeight: "bold",
            textAlign: "right",
          },
        ]}
      >
        My Tickets
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          padding: 10
        }}
      >
        à venir
      </Text>
      <YEventsList events={myTickets} navigation={navigation}/>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          padding: 10
        }}
      >
        Tickets utilisés
      </Text>
      <YEventsList events={usedTickets} navigation={navigation} />
    </View>
  );
}
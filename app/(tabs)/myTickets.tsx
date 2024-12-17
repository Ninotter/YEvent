import { Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";
import YEventItemList from "../components/yeventItemList";
import YEventsList from "../components/yeventsList";

export default function MyTickets({ navigation }: any) {
  const myTickets = getMockDataMyTickets();
  const usedTickets = getMockDataUsedTickets();
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
function getMockDataUsedTickets(): Array<YEvent> {
  return [
    {
      id: 4,
      name: "Concert de musique classique",
      date: "2021/10/15",
      location: "Paris, 5 rue des musiciens",
      price: 20,
      maxCapacity: 100,
      leftCapacity: 0,
      description: "Venez écouter les plus grands classiques",
    },
    {
      id: 5,
      name: "Exposition de peinture",
      date: "2021/10/20",
      location: "Lyon, 3 rue des artistes",
      price: 10,
      maxCapacity: 50,
      leftCapacity: 0,
      description: "Venez découvrir les plus belles œuvres",
    },
    {
      id: 6,
      name: "Conférence sur l'écologie",
      date: "2021/10/25",
      location: "Marseille",
      price: 0,
      maxCapacity: 1000,
      leftCapacity: 0,
      description: "Venez échanger sur les enjeux actuels"
    }
  ];
}

function getMockDataMyTickets(): Array<YEvent> {
  return [
    {
      id: 1,
      name: "Concert de musique classique",
      date: "2021/10/15",
      location: "Paris, 5 rue des musiciens",
      price: 20,
      maxCapacity: 100,
      leftCapacity: 50,
      description: "Venez écouter les plus grands classiques",
    },
    {
      id: 2,
      name: "Exposition de peinture",
      date: "2021/10/20",
      location: "Lyon, 3 rue des artistes",
      price: 10,
      maxCapacity: 50,
      leftCapacity: 0,
      description: "Venez découvrir les plus belles œuvres",
    },
    {
      id: 3,
      name: "Conférence sur l'écologie",
      date: "2021/10/25",
      location: "Marseille, en ligne",
      price: 0,
      maxCapacity: 1000,
      leftCapacity: 1000,
      description: "Venez échanger sur les enjeux actuels",
    }
  ];
}

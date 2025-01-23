import { FlatList, ScrollView, Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";
import simpleTextFont from "../styles/simpleTextFont";
import YEventsList from "../components/yeventsList";
import {supabase} from '../lib/supabase'
import { useEffect, useState } from "react";



export default function HomeScreen({navigation}: any) {

  const [latestReleases, setLatestReleases] = useState<Array<YEvent>>([]);
  const [loading, setLoading] = useState(false);

  async function getEvents() {
    setLoading(true); // Indicate loading state
    try {
      const { data, error, status } = await supabase
        .from('Evenements')
        .select('*')
      if (error && status !== 406) {
        throw error
      }

      if (data) {
         // Map the raw JSON data into an array of YEvent
        const events: YEvent[] = data.map((item: any) => ({
          id: item.id,
          titre: item.titre,
          description: item.description,
          date: item.date,
          places_max: item.places_max,
          places_restantes: item.places_restantes
        }));

        setLatestReleases(events);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setLoading(false); // Stop loading state
    }
  }

   // Use useEffect to control when getEvents is called
   useEffect(() => {
    getEvents(); // Fetch events when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  // const latestReleases = getMockDataLatestReleases();
  // const fewTicketsLeft = getMockDataFewTicketsLeft();
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View
        style={[
          mainBackgroundColor.mainBackgroundColor,
          {
            borderBottomStartRadius: 50,
            paddingBottom: 30,
            paddingStart: 10,
            paddingEnd: 10,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 86,
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          YEvent
        </Text>
        <Text style={[simpleTextFont.simpleTextFont]}>Bonjour user</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          paddingStart: 20,
          paddingEnd: 20,
          paddingTop: 10
        }}
      >
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <Text style={[simpleTextFont.simpleTextFont]}>
            Dernières annonces
          </Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <YEventsList events={latestReleases} navigation={navigation} />
          )}
        </View>
        <Text style={[simpleTextFont.simpleTextFont]}>
          Bientôt plus de places
        </Text>
        <YEventsList events={latestReleases} navigation={navigation}/>
      </View>
    </ScrollView>
  );
}

// function getMockDataFewTicketsLeft(): Array<YEvent> {
//   return [
//     {
//       id: 1,
//       titre: "Concert de rock",
//       date: "2021/10/15",
//       location: "Paris, 5 rue des musiciens",
//       price: 20,
//       maxCapacity: 100,
//       leftCapacity: 10,
//       description: "Venez écouter les plus grands classiques",
//     },
//     {
//       id: 2,
//       titre: "Exposition de peinture",
//       date: "2021/10/20",
//       location: "Lyon, 3 rue des artistes",
//       price: 10,
//       maxCapacity: 50,
//       leftCapacity: 5,
//       description: "Venez découvrir les plus belles œuvres",
//     },
//     {
//       id: 3,
//       titre: "Conférence sur l'écologie",
//       date: "2021/10/25",
//       location: "Marseille",
//       price: 0,
//       maxCapacity: 1000,
//       leftCapacity: 100,
//       description: "Venez échanger sur les enjeux actuels",
//     }
//   ]
// }

// function getMockDataLatestReleases(): Array<YEvent> {
//   return [
//     {
//       id: 1,
//       titre: "Concert de musique classique",
//       date: "2021/10/15",
//       location: "Paris, 5 rue des musiciens",
//       price: 20,
//       maxCapacity: 100,
//       leftCapacity: 50,
//       description: "Venez écouter les plus grands classiques",
//     },
//     {
//       id: 2,
//       titre: "Exposition de peinture",
//       date: "2021/10/20",
//       location: "Lyon, 3 rue des artistes",
//       price: 10,
//       maxCapacity: 50,
//       leftCapacity: 0,
//       description: "Venez découvrir les plus belles œuvres",
//     },
//     {
//       id: 3,
//       name: "Conférence sur l'écologie",
//       date: "2021/10/25",
//       location: "Marseille, en ligne",
//       price: 0,
//       maxCapacity: 1000,
//       leftCapacity: 1000,
//       description: "Venez échanger sur les enjeux actuels",
//     }
//   ];
// }
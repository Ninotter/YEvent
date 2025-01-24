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
    setLoading(true);
    try {
      const { data, error, status } = await supabase
        .from('Evenements')
        .select('*')
      if (error && status !== 406) {
        throw error
      }

      if (data) {
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
      setLoading(false);
    }
  }

   // Use useEffect to control when getEvents is called
   useEffect(() => {
    getEvents();
  }, []);

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
            <Text style={{flex : 1}}>Loading...</Text>
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
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";
import simpleTextFont from "../styles/simpleTextFont";
import YEventsList from "../components/yeventsList";
import {supabase} from '../lib/supabase'
import { useEffect, useState } from "react";
import Database from '../database';



export default function HomeScreen({navigation}: any) {

  const [latestReleases, setLatestReleases] = useState<Array<YEvent>>([]);
  const [loading, setLoading] = useState(false);

  async function LoadEvents() {
    setLoading(true);
    try {
      const data = await Database.getEvents();
      if (data) {
        setLatestReleases(data);
      }
      else{
        throw new Error("No data found");
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
    Database.getEvents();
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
          style={{ flexDirection: "column", justifyContent: "space-between", minHeight: 200 }}
        >
          <Text style={[simpleTextFont.simpleTextFont]}>
            Dernières annonces
          </Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}/>
          ) : (
            latestReleases.length == 0 ? (<Text>Pas d'evênemenets disponibles</Text>) : (
            <YEventsList events={latestReleases} navigation={navigation} /> )
          )}
        <Text style={[simpleTextFont.simpleTextFont]}>
          Bientôt plus de places
        </Text>
        </View>
        <YEventsList events={latestReleases} navigation={navigation}/>
      </View>
    </ScrollView>
  );
}
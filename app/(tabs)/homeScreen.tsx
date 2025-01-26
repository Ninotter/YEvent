import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";
import simpleTextFont from "../styles/simpleTextFont";
import YEventsList from "../components/yeventsList";
import { useEffect, useState } from "react";
import Database from '../database';
import { UserSingleton } from "../UserSingleton";


export default function HomeScreen({navigation}: any) {

  const [loadingEvents, setLoadingEvents] = useState(false);
  const [latestReleases, setLatestReleases] = useState<Array<YEvent>>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [randomUser, setRandomUser] = useState<Utilisateur>();

  async function getRandomUser() {
    setLoadingUsers(true);
    const data = await Database.getRandomUser();
    try {
      if (data) {
        console.log("User found: ", data);
        UserSingleton.instance.user = data;
        console.log("UserSingleton: ", UserSingleton.instance.user);
        setRandomUser(UserSingleton.instance.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
    } finally {
      setLoadingUsers(false);
    }
  }

  async function loadEvents() {
    setLoadingEvents(true);
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
      setLoadingEvents(false);
    }
  }

   useEffect(() => {
     getRandomUser();
    loadEvents();
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
        { loadingUsers ? <ActivityIndicator size="small" color="#0000ff" /> : <Text style={[simpleTextFont.simpleTextFont]}>Bonjour {randomUser?.nom}</Text> }
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
          {loadingEvents ? (
            <ActivityIndicator size="large" color="#0000ff" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}/>
          ) : (
            latestReleases.length == 0 ? (<Text>Pas d'événement disponible</Text>) : (
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
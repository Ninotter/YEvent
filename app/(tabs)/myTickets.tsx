import { ActivityIndicator, Text, View } from "react-native";
import mainBackgroundColor from "../styles/mainBackgroundColor";
import YEventItemList from "../components/yeventItemList";
import YEventsList from "../components/yeventsList";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import Database from "../database";
import { UserSingleton } from "../UserSingleton";
import { useIsFocused } from "@react-navigation/native";

export default function MyTickets({ navigation }: any) {
  const myTickets = Array<YEvent>();
  const usedTickets = Array<YEvent>();
  const isFocused = useIsFocused();



  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingUsed, setLoadingUsed] = useState(true);
  const [upcoming, setUpcoming] = useState<Array<YEvent>>([]);
  const [used, setUsed] = useState<Array<YEvent>>([]);

  async function loadTickets() {
    var user = UserSingleton.instance.user!;
    setLoadingUpcoming(true);
    setLoadingUsed(true);
    try {
      const upcomingData = await Database.getUpcomingReservationbyUser(user.id);
      const usedData = await Database.getUsedReservationbyUser(user.id);
      
      if (upcomingData) {
        setUpcoming(upcomingData);
      }
      else{
        throw new Error("No data found");
      }
      if (usedData) {
        setUsed(usedData);
      }
      else{
        throw new Error("No data found");
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: error.message,
        });
      }
    } finally {
      setLoadingUpcoming(false);
      setLoadingUsed(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }
  , [isFocused]);

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
            fontSize: 36,
            fontWeight: "bold",
            textAlign: "right",
          },
        ]}
      >
        Mes réservations
      </Text>
      <View style={{flex: 1, padding: 10, alignContent: 'center', alignItems: 'center'}}>
        
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          padding: 10
        }}
        >
        à venir
        </Text>
        {loadingUpcoming ? (
          <ActivityIndicator size="large" color="#0000ff" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}/>
        ) : (
          upcoming.length === 0 ? <Text>Aucune réservation à venir</Text> : <YEventsList events={upcoming} navigation={navigation}/>
        )}
        </View>
        <View style={{flex: 1, padding: 10, alignContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          padding: 10
        }}
      >
        Tickets utilisés
      </Text>
      {loadingUsed ? (
          <ActivityIndicator size="large" color="#0000ff" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}/>
        ) : (
          used.length === 0 ? <Text>Aucune réservation passée</Text> : <YEventsList events={used} navigation={navigation}/>
        )}
        </View>
    </View>
  );
}
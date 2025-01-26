import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { UserSingleton } from "./UserSingleton";
import Database from "./database";

function ReservationScreen({ route }: any) {
  const { yevent } = route.params as { yevent: YEvent };
  const { navigation } = route.params as { navigation: any };
  const [myNumber, setNumber] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const user = UserSingleton.instance.user;

  async function sendReservation() {
    setLoading(true);
    try{
      var reservation : Reservation = {
        id_evenements: yevent.id,
        id_utilisateur: user!.id,
        nb_places: myNumber,
      }
      var success = await Database.postReservation(reservation)
      console.log(success)
      if (!success) {
        throw new Error("Error while posting reservation");
      }
    }
    catch(error){
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: error.message,
        });
        throw error;
      }
    }
    finally{
        setLoading(false);
    }
  }

  function onNbBilletChanged(text: string) {
    var nb = parseInt(text);
    if (!nb || nb < 0) {
      nb = 0;
    }
    if (nb > yevent.places_restantes) {
      nb = yevent.places_restantes;
    }
    setNumber(nb);
  }

  function onNomChanged(text: string) {
    setNom(text);
  }

  function onEmailChanged(text: string) {
    setEmail(text);
  }

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>{yevent.titre}</Text>
      <Text style={styles.description}>{yevent.description}</Text>
      <Text style={styles.date}>Date: {yevent.date}</Text>
      <Text style={styles.location}>{yevent.lieu}</Text>
      </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}/>
        ) : (
          <View style={styles.container}>
          <Text style={{fontWeight: "bold"}}>Entrez vos informations de réservation : </Text>
            <TextInput placeholder="nom" value={user?.nom} onChangeText={onNomChanged}></TextInput>
            <TextInput placeholder="email" value={user?.email} onChangeText={onEmailChanged}></TextInput>
            <TextInput
                keyboardType="numeric"
                onChangeText={(text) => onNbBilletChanged(text)}
                value={myNumber.toString()}
                maxLength={10} //setting limit of input
                />
            <Button
                title="Réserver"
                disabled={myNumber <= 0 || myNumber > yevent.places_restantes}
                onPress={async () => {
                  await sendReservation();
                  Toast.show({
                    type: "success",
                    text1: "Reservation effectuée!",
                    text2: 'Vous pouvez la voir dans "Mes réservations"',
                  });
                  navigation.goBack();
                }}
                />
            </View>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      alignSelf: 'center',
  },
  image: {
      width: '100%',
      height: 200,
      marginBottom: 16,
  },
  description: {
      fontSize: 16,
      marginBottom: 8,
      textAlign: 'justify',
  },
  date: {
      fontSize: 16,
      marginBottom: 8,
  },
  location: {
      fontSize: 16,
      marginBottom: 8,
  },
  capacity: {
      fontSize: 16,
      marginBottom: 8,
  },
  price: {
      fontSize: 16,
      fontWeight: 'bold',
  },
  rightSide:{
      alignSelf: 'flex-end',
      color: 'green'
  },
  button: {
      alignItems: "center",
      marginTop: 10,
  },
});

export default ReservationScreen;

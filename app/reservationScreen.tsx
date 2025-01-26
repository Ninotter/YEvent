import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

function ReservationScreen({ route }: any) {
  const { yevent } = route.params as { yevent: YEvent };
  const { navigation } = route.params as { navigation: any };
  const [myNumber, setNumber] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  async function sendReservation() {
    setLoading(true);
    await sleep(2000);
    setLoading(false);
  }

  async function sleep(msec: number) {
    return new Promise((resolve) => setTimeout(resolve, msec));
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

  //Input name, email, nb billet < yevent.places_restantes
  return (
    <View style={styles.container}>
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}/>
          ) : (
            <>
            <TextInput placeholder="nom"></TextInput>
            <TextInput placeholder="email"></TextInput>
            <TextInput
                keyboardType="numeric"
                onChangeText={(text) => onNbBilletChanged(text)}
                value={myNumber.toString()}
                maxLength={10} //setting limit of input
            />
            <Button
                title="Réserver"
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
            </>
          )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
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
    fontWeight: "bold",
  },
});

export default ReservationScreen;

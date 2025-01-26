import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { openMap } from './openMap';
import mainBackgroundColor from './styles/mainBackgroundColor';
import IntegratedMap from './components/integratedMap';
import Toast from 'react-native-toast-message';


function DetailScreen({route}:any) {
    const { yevent } = route.params as { yevent: YEvent };
    const { navigation } = route.params as { navigation: any };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{yevent.titre}</Text>
            <Text style={styles.description}>{yevent.description}</Text>
            <Text style={styles.date}>Date: {yevent.date}</Text>
            <Text style={styles.location}>{yevent.lieu}</Text>
            {yevent.places_restantes > 0 ? (
                <Text style={[styles.capacity, styles.rightSide]}>{yevent.places_restantes} places restantes</Text>
                ):(
                <Text style={[styles.capacity, styles.rightSide]}>Complet</Text>
            )}
            <Text style={[styles.price, styles.rightSide]}>{yevent.prix == 0 ? "Gratuit" : `Prix : ${yevent.prix}€`}</Text>
            <Button title="Réserver" onPress={() => {
                navigation.navigate('Reservation', {yevent: yevent, navigation: navigation});
            }}/>
            <IntegratedMap latitude={yevent.latitude} longitude={yevent.longitude} title={yevent.titre} />
            <Button title="Voir l'emplacement dans l'application" onPress={() => {
                openMap({lat: yevent.latitude, lng: yevent.longitude, label: yevent.lieu});
            }} />
        </View>
    );
};

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

export default DetailScreen;
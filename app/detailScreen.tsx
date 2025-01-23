import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { openMap } from './openMap';
import mainBackgroundColor from './styles/mainBackgroundColor';
import IntegratedMap from './components/integratedMap';

function DetailScreen({route}:any) {
    const { yevent } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{yevent.name}</Text>
            {yevent.imageUrl == null ? "" : <Image source={{ uri: yevent.imageUrl }} style={styles.image} />}
            <Text style={styles.description}>{yevent.description}</Text>
            <Text style={styles.date}>Date: {yevent.date}</Text>
            <Text style={styles.location}>{yevent.location}</Text>
            <Text style={styles.capacity}>Nombre de places: {yevent.leftCapacity}/{yevent.maxCapacity}</Text>
            <Text style={styles.price}>{yevent.price == 0 ? "Gratuit" : `Prix : ${yevent.price}€`}</Text>

            <Button title="Réserver"
            
            onPress={() => {
                //pop-up "Réserver"

            }}/>
            <IntegratedMap latitude={0} longitude={0} title={yevent.name} />
            <Button title="Voir l'emplacement dans l'application" onPress={() => {
                openMap({lat: 0, lng: 0, label: yevent.location});
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
    },
    image: {
        width: '100%',
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
        fontWeight: 'bold',
    },
});

export default DetailScreen;
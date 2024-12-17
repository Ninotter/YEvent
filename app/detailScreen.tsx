import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


function DetailScreen({route}:any) {
    const { yevent } = route.params;
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{yevent.name}</Text>
            <Image source={{ uri: yevent.imageUrl }} style={styles.image} />
            <Text style={styles.description}>{yevent.description}</Text>
            <Text style={styles.date}>Date: {yevent.date}</Text>
            <Text style={styles.location}>Location: {yevent.location}</Text>
            <Text style={styles.capacity}>Capacity: {yevent.leftCapacity}/{yevent.maxCapacity}</Text>
            <Text style={styles.price}>Price: ${yevent.price}</Text>
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
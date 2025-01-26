import React from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

interface IntegratedMapProps {
  latitude: number;
  longitude: number;
  currentLongitude: number | undefined;
  currentLatitude: number | undefined;
  title: string;
  description?: string;
}

const IntegratedMap: React.FC<IntegratedMapProps> = ({
  latitude,
  longitude,
  currentLatitude,
  currentLongitude,
  title,
  description,
}) => {
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <MapView style={{ flex: 1 }}>
        <LocationMarker
          latitude={latitude}
          longitude={longitude}
          title={title}
          description={description}
        />
        currentLatitude !== undefined && currentLongitude !== undefined ? (
          <LocationMarker
            latitude={currentLatitude!}
            longitude={currentLongitude!}
            title="Vous êtes ici"
            />
        ) : null
      </MapView>
    </View>
  );
};

type MarkerProps = {
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
};

const LocationMarker = (props: MarkerProps): JSX.Element => {
  return (
    <Marker
      pinColor="blue"
      coordinate={{
        latitude: props.latitude,
        longitude: props.longitude,
      }}
      title={props.title}
      description={props.description ?? ""}
    />
  );
};
export default IntegratedMap;

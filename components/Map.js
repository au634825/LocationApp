import React, { useEffect, useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useSelector, useDispatch } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectDestination, selectMode, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
    const destination = useSelector(selectDestination);
    const origin = useSelector(selectOrigin);
    const mode = useSelector(selectMode);
    const dispatch = useDispatch();
    const mapRef = useRef(null);

    useEffect(() => {
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);

    useEffect(() => {
        if (origin != null) {
            const getTravelTime = async () => {
                fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
            units=metric
            &origins=${origin.description}
            &destinations=${destination.description}
            &key=${GOOGLE_MAPS_APIKEY}
            &mode=${mode.toLowerCase()}`
                ).then(res => res.json())
                    .then(data => {
                        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                    })
            };
            getTravelTime();
        }
    }, [origin, destination, GOOGLE_MAPS_APIKEY, mode]);

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="standard"
            //provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {destination?.description && origin?.location && (
                <MapViewDirections
                    origin={origin.location}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={4}
                    strokeColor={'rgba(10,132,255,1)'}
                    mode={mode}
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.latitude,
                        longitude: origin.location.longitude,
                    }}
                    title="Start"
                    description={origin.description}
                    identifier="origin"
                />
            )}
        </MapView>
    )
}

export default Map

import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import tw from "tailwind-react-native-classnames"
import NavOptions from '../components/NavOptions'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import * as Location from 'expo-location';


const HomeScreen = () => {
    const dispatch = useDispatch();

    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);


    useEffect(() => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
    }, []);

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();

        if (!enabled) {
            Alert.alert(
                'Location Service not enabled',
                'Please enable your location services to continue',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } else {
            setLocationServiceEnabled(enabled);
        }
    };


    const GetCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                'Allow the app to use location service.',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }

        let { coords } = await Location.getCurrentPositionAsync();

        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });
            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                dispatch(
                    setOrigin({
                        location: {
                            latitude: latitude,
                            longitude: longitude,
                        },
                        description: address,
                    }));
            };
        };
    };


    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-4`}>
                <Text style={tw`mt-2 text-3xl font-bold`}>
                    Jenath Maps App
                </Text>

                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                    onPress={(data, details = null) => {
                        dispatch(
                            setDestination({
                                location: details.geometry.location,
                                description: data.description,
                            })
                        );
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    placeholder="Hvorhen?"
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "dk",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={300}
                />
                <NavOptions />
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: "blue",
    },
    googlePlacesAutocomplete: {},
})

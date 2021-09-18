import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import tw from "tailwind-react-native-classnames";
import { selectDestination, setDestination } from '../slices/navSlice';
const data = [
    {
        id: "123",
        title: "Find Sted",
        image: "https://cdn3.iconfinder.com/data/icons/social-1/100/facebook_places-512.png",
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Find AU H",
        image: "https://via.ritzau.dk/data/images/00223/0f24e5f2-58e2-4ea7-9a23-23b283075bb3.png",
        screen: "MapScreen",
        location: {
            "lat": 56.12942950000001,
            "lng": 9.0271939,
        },
        description: "AU Herning, Birk Centerpark",

    },
    {
        id: "789",
        title: "Find Hjem",
        image: "https://www.pinclipart.com/picdir/big/413-4132058_spring-home-icon-blue-png-clipart.png",
        screen: "MapScreen",
        location: {
            "lat": 56.143658,
            "lng": 9.049916,
        },
        description: "Gjellerup, Danmark"
    }
];

const NavOptions = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const destination = useSelector(selectDestination);
    return (
        <View>
            <TouchableOpacity style={tw`pl-8 ml-2 mb-2 pb-4 bg-gray-200 w-80`}
                disabled={!destination}
                onPress={() => { navigation.navigate(data[0].screen); }} >
                <View style={tw`${!destination && "opacity-20"}`}>
                    {/*<Image
                        style={{ width: 120, height: 120, resizeMode: "contain" }}
                        source={{ uri: data[0].image }}
                    />*/}
                    <Text style={tw`mt-2 font-semibold text-lg`}>{data[0].title}</Text>
                    <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        type="antdesign" name="arrowright" color="white"
                    />
                </View>
            </TouchableOpacity>

            <FlatList
                data={data.slice(1, 4)}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2`}
                        onPress={() => {

                            dispatch(
                                setDestination({
                                    location: item.location,
                                    description: item.description,
                                }));
                            navigation.navigate(item.screen);
                        }} >
                        <View>
                            <Image
                                style={{ width: 120, height: 120, resizeMode: "contain" }}
                                source={{ uri: item.image }}
                            />
                            <Text style={tw`mt-2 font-semibold text-lg`}>{item.title}</Text>
                            <Icon
                                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                                type="antdesign" name="arrowright" color="white"
                            />
                        </View>
                    </TouchableOpacity>
                )}

            />
        </View>
    )
}

export default NavOptions


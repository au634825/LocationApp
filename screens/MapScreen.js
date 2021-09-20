import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import NavigateInfo from '../components/NavigateInfo'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { useNavigation } from '@react-navigation/core'
import { selectMode, setMode } from '../slices/navSlice'
import { useDispatch, useSelector } from 'react-redux'


const MapScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mode = useSelector(selectMode);


    return (
        <View>
            <TouchableOpacity style={tw`absolute top-16 left-8 bg-gray-100 z-10 p-3 rounded-full shadow-lg`}
                onPress={() => { navigation.navigate("HomeScreen"); }} >
                <Icon name="arrow-left" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`absolute top-16 right-8 bg-gray-100 z-10 p-3 rounded-full shadow-lg`}
                onPress={() => { 
                    dispatch(
                        setMode((mode=="DRIVING")?"BICYCLING":"DRIVING"));
                 }} >
                <Icon name={"menu"} />
            </TouchableOpacity>
            <View style={tw`h-3/4`}>
                <Map />
            </View>
            <View style={tw`h-1/4`}>
                <NavigateInfo />
            </View>
        </View>

    )
}

export default MapScreen


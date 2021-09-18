import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import NavigateInfo from '../components/NavigateInfo'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { useNavigation } from '@react-navigation/core'


const MapScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity style={tw`absolute top-16 left-8 bg-gray-100 z-10 p-3 rounded-full shadow-lg`}
                onPress={() => { navigation.navigate("HomeScreen"); }} >
                <Icon name="arrow-left" />
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

const styles = StyleSheet.create({})

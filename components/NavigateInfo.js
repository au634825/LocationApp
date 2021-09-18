import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice';

const NavigateInfo = () => {
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center pb-6 text-xl -mt-4 font-semibold`}>Rejse information</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}/>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Afstand - {travelTimeInformation?.distance?.text}</Text>
                <Text style={styles.text}>Tid - {travelTimeInformation?.duration?.text}</Text>

            </View>
        </SafeAreaView>
    )
}

export default NavigateInfo

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        
    },
    text: {
        padding: 10,
        fontSize: 18,
        
    }
})

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RoundedButton } from '../../components/RoundedButton'

export const Timming = ({ onChangeTime }) => {
    return (
        <>
            <View style={styles.timingButton}>

                {/* 10 MIN BUTTON */}
                <RoundedButton
                    size={75}
                    title="10"
                    onPress={() => onChangeTime(10)}
                />
            </View>

            {/* 15 MIN BUTTON */}
            <View style={styles.timingButton}>
                <RoundedButton
                    size={75}
                    title="15"
                    onPress={() => onChangeTime(15)}
                />
            </View>

            {/* 20 MIN BUTTON */}
            <View style={styles.timingButton}>
                <RoundedButton
                    size={75}
                    title="20"
                    onPress={() => onChangeTime(20)}
                />
            </View>
        </>


    )
}


const styles = StyleSheet.create({
    timingButton: {
        flex: 1,
        alignItems: 'center'
    }
})
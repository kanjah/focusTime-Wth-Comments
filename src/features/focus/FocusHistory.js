import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';


// will display the information in the flatlist
const HistoryItem = ({ item, index }) => {
    //console.log(item);
    return (
        <Text style={styles.HistoryItem(item.status)}>
            {item.subject}
        </Text>
    )
}

export const FocusHistory = ({ focusHistory, onClear }) => {
    const clearHistory = () => {
        onClear();
    }
    return (
        <>
            {/* Display things focused on, red for cancled, & green for sucessully completed task
            * can only displayed once a task is either completed or removed
            */}
            <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
                {!!focusHistory.length && (
                    <>
                        <Text style={styles.title}>Things we've focused on</Text>

                        <FlatList
                            style={{ flex: 1 }}
                            contentContainerStryle={{ flex: 1, alignItems: 'center' }}
                            data={focusHistory}
                            renderItem={HistoryItem}
                        />

                        {/* Clear History Button */}
                        <View style={styles.cl}>
                            <RoundedButton size={75}
                                title="Clear"
                                onPress={() => onClear()}
                            />
                        </View>
                    </>
                )}

            </SafeAreaView>


        </>
    )
}



const styles = StyleSheet.create({
    HistoryItem: (status) => ({
        color: status > 1 ? 'red' : 'green',
        fontSize: fontSizes.lg
    }),
    title: {
        color: colors.white,
        fontSize: fontSizes.lg
    },

    clearContainer: {
        alignItems: 'center',
        padding: spacing.md
    }
})
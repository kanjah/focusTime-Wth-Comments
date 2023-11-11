import { StyleSheet, Text, View, Vibration, Platform } from 'react-native'
import React, { useState } from 'react'
import { ProgressBar } from 'react-native-paper'


import { colors } from '../../utils/colors'
import { spacing } from '../../utils/sizes'
import { Countdown } from '../../components/Countdown'
import { RoundedButton } from '../../components/RoundedButton'
import { Timming } from './Timming';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;
// focusSubject & onTimerEnd from app.js
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
    useKeepAwake();
    const [minutes, setMinutes] = useState(DEFAULT_TIME);
    // checks if the counter has started
    const [isStarted, setIsStarted] = useState(false);

    // for progress bar
    const [progress, setProgress] = useState(1);

    //onProgress Method(progress from countdown.js)
    const onProgress = (progress) => {
        setProgress(progress)
    };

    //vibrate method per second
    const vibrate = () => {
        if (Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 10000);
        } else {
            Vibration.vibrate(10000)
        }
    };

    //what to do at the end of the app
    const onEnd = () => {
        vibrate();
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false);
        onTimerEnd();
    };

    //for changing time(in Timming.js) plus progressBar
    const changeTime = (min) => {
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);

    }

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>

                {/* COUNT DOWN DISPLAY */}
                <Countdown minutes={minutes}
                    isPaused={!isStarted}
                    onProgress={onProgress}
                    onEnd={onEnd}
                />
            </View>
            {/* FOCUSING ON TEXT */}
            <View style={{ paddingTop: spacing.xxl }}>
                <Text style={styles.title}>Focusing on</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View>

            </View>
            {/* PROGRESS BAR */}
            <View style={{ paddingTop: spacing.sm }}>
                <ProgressBar
                    progress={progress}
                    color='#507cec'
                    style={{ height: 10 }}
                />
            </View>

            {/* CHANGE TIME BUTTON SECTION */}
            <View style={styles.buttonWrapper}>
                <Timming onChangeTime={changeTime} />
            </View>

            <View style={styles.buttonWrapper}>
                {isStarted ? (
                    // PAUSE BUTTON 
                    <RoundedButton title="pause"
                        onPress={() => setIsStarted(false)}
                    />)
                    : (
                        // BUTTON TO START COUNTER
                        <RoundedButton title="start"
                            onPress={() => setIsStarted(true)}
                        />
                    )}

            </View>{/* BUTTON TO CLEAR FOCUS ITEM */}
            <View style={styles.clearSubject}>
                <RoundedButton title="-"
                    size={50}
                    onPress={() => clearSubject()}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: colors.white,
        textAlign: 'center',
    },

    task: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center'
    },

    clearSubject: {
        paddingBottom: 25,
        paddingLeft: 25
    }

})
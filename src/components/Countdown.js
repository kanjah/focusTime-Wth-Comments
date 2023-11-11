import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

// convert minutes to milliseconds coz of const interval below
const minutesToMillisec = (min) => min * 1000 * 60;

//format time
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
    minutes = 0.1,
    isPaused,
    onProgress,
    onEnd
}) => {
    const interval = React.useRef(null);

    // DISPLAY TIME LEFT
    const countDown = () => {
        setMillis((time) => {
            if (time === 0) {
                // clear interval
                clearInterval(interval.current);
                // onEnd();
                return time;
            }
            const timeLeft = time - 1000;
            //show progress to user
            //divide timeLeft with minutesToMillisecof original minutes
            //

            return timeLeft;;
        })
    }
    // Check for the remaing milisec everytime new onChangeTime is selected
    useEffect(() => {
        setMillis(minutesToMillisec(minutes))
    }, [minutes])

    // useEffect(() => {
    //     setMillis(minutesToMillisec(minutes))
    // }, [minutes])

    useEffect(() => {
        onProgress(millis / minutesToMillisec(minutes))
    }, [millis])

    if (millis === 0) {
        onEnd();
    }


    useEffect(() => {
        if (isPaused) {
            // clears up refs that we used
            if (interval.current) clearInterval(interval.current);
            return;
        }
        // calls counter to count down every second
        interval.current = setInterval(countDown, 1000);

        // clears the interval once timmer is done
        return () => clearInterval(interval.current)
    }, [isPaused])

    const [millis, setMillis] = useState(null);


    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;

    return (
        // count down time goes here
        <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>

    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.xxxxl,
        fontWeight: 'bold',
        color: colors.white,
        padding: spacing.lg,
        backgroundColor: 'rgba(115, 136, 229, 0.3)'
    }
})
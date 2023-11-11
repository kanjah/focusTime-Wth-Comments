import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { colors } from './src/utils/colors'
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { spacing } from './src/utils/sizes';
import { FocusHistory } from './src/features/focus/FocusHistory';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2
}

export default function App() {
  /* this is focus subject, the descinding factor of our app logic*/
  const [focusSubject, setFocusSubject] = useState(null);

  /*saving focusHistory subject and status */
  const [focusHistory, setFocusHistory] = useState([]);

  /*add focusHistory to array */
  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }])
  }

  //on clear method
  const onClear = () => {
    setFocusHistory([]);
  }

  // Async storage
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    }
    catch (e) {
      console.log(e)
    }
  };
  //Load history from async storage
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history))
      }
    }
    catch (e) {
      console.log(e)
    }
  };
  useEffect(() => {
    loadFocusHistory();
  })

  //Save new changes to the asyc storage
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory])

  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (

        // when timmer reaches zero, the focusSubject is saved with a status of complete to the history list
        <Timer focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          // when focusSubject is cancelled, the foucusSubject is saved with a status of cancelled to the history list
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}

        // Clear button method
        // clearSubject = {() => setFocusSubject(null)}
        />
      ) : (
        <>
          {/*to be sent to Focus.js(addSubject)*/}
          <Focus addSubject={setFocusSubject} />

          {/* wil display text of  completed focusHistory*/}
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.frechSkyBlue,
  },
});

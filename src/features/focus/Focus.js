import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  /*will store the state tempararly, once the input return button has been clicked,
   * untill the + button is clicked, th
   */
  const [subject, setSubject] = useState(null); /*stores subjec temporarly*/
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          {/*  input text */}
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onSubmitEditing={({ nativeEvent }) => {

              /*will store subject temp when  rtn btn frm keyboard is clkd*/
              setSubject(nativeEvent.text);
            }}
          />
          {/* + button */}
          <RoundedButton
            size={50}
            title="+"

            /*displays the subject when + btn is clicked*/
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },

  innerContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },

  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: spacing.lg,
  },

  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

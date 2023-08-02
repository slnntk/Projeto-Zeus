import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ date, setDate, mode, setMode, placeholder }) {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  return (
    <View>
      <TouchableOpacity
        onPress={showDatepicker}
        style={styles.input}
      >
        {date ? (
          <Text style={styles.textSelecionado}>
            {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </Text>
        ) : (
          <Text style={styles.text}>{placeholder}</Text>
        )}
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#787878',
    fontWeight: '600',
    fontSize: 16,
    opacity: 0.8,
  },
  textSelecionado: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 16,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

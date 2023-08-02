import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MonthSelector = ({ onFilterChange, reload }) => {
  const numeros = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = ['2021', '2022', '2023']; 

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');

  const handleFilterChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    onFilterChange(month, year);
  };

  useEffect(()=>{
    setSelectedMonth(null);
    setSelectedYear('');
  },[reload])

  return (
    <>
  
    <View style={styles.container}>
      <View style={styles.pickerGroup}>
        <Text style={styles.label}>Mês</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={(itemValue) => handleFilterChange(itemValue, selectedYear)}
          >
            <Picker.Item label="Selecione" value={null} />
            {numeros.map((numero) => (
              <Picker.Item key={numero} label={numero.toString()} value={numero} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.pickerGroup}>
        <Text style={styles.label}>Ano</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedYear}
            style={styles.picker}
            onValueChange={(itemValue) => handleFilterChange(selectedMonth, itemValue)}
          >
            <Picker.Item label="Selecione" value="" />
            {years.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  pickerGroup: {
    alignItems: 'center',
    marginTop: 15,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#add8e6',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50, 
    width: 164,  
  },
});

export default MonthSelector;

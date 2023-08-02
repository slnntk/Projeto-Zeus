import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function DateInput({ label, value, onChange }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(formatDate(value));
  }, [value]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChangeText = (text) => {
    const numericText = text.replace(/[^\d]/g, "");

    if (numericText.length <= 8) {
      const formatted = numericText
        .replace(/^(\d{2})(\d)/g, "$1/$2")
        .replace(/^(\d{2})\/(\d{2})(\d)/g, "$1/$2/$3");
      setFormattedDate(formatted);
    }

    if (numericText.length === 8) {
      const day = parseInt(numericText.substring(0, 2), 10);
      const month = parseInt(numericText.substring(2, 4), 10) - 1;
      const year = parseInt(numericText.substring(4, 8), 10);
      const date = new Date(year, month, day);
      onChange(date);
    } else {
      onChange(null);
    }
  };

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/YYYY"
        value={formattedDate}
        onChangeText={handleChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
});

export default DateInput;

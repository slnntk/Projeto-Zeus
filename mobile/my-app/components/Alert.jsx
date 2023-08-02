import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Alert({ showAlert, setAlert }) {
  const handleAlertClick = () => {
    setAlert(false);
  };

  if (showAlert) {
    return (
      <TouchableOpacity onPress={handleAlertClick}>
        <View style={styles.alertOverlay}>
          <Text style={styles.alertText}>Preencha todos os campos corretamente.</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alertOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertText: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    fontSize: 18,
  },
});

export default Alert;

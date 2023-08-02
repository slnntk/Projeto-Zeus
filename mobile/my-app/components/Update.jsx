import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "./DatePicker";

function Update({ route, navigation }) {
  const { id } = route.params;

  const [dataLoaded, setDataLoaded] = useState(false);

  const [values, setValues] = useState({
    brand_name: "",
    price: "",
    weight_grams: "",
    instant: "",
  });

  useEffect(() => {
    fetch("http://192.168.1.17:3000/purchases/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const purchaseData = data;
        setValues({
          brand_name: purchaseData.brand_name,
          price: purchaseData.price.toString(),
          weight_grams: purchaseData.weight_grams.toString(),
          instant: new Date(purchaseData.instant),
        });
        setDataLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleNavigateToCreate = () => {
    navigation.navigate("Extrato");
  };

  const validateInputs = () => {
    Keyboard.dismiss(); 
    const priceNum = parseFloat(values.price.replace(",", "."));
    const weightNum = parseFloat(values.weight_grams.replace(",", "."));

    if (!values.brand_name || isNaN(priceNum) || isNaN(weightNum)) {
      Alert.alert("Preencha todos os campos corretamente!");
      return false;
    }

    if (priceNum < 0 || weightNum < 0 || values.price.length > 12 || values.weight_grams.length > 12) {
      Alert.alert("O preço e o peso devem ser números positivos com até 12 dígitos!");
      return false;
    }

    if (/\d+\.\d+\.\d+/.test(values.price) || /\d+\.\d+\.\d+/.test(values.weight_grams)) {
      Alert.alert("O preço e o peso devem ser números válidos!");
      return false;
    }

    if (/\./g.test(values.price) && /\./g.test(values.price).length > 1) {
      Alert.alert("O preço deve conter apenas um ponto (.) como separador decimal!");
      return false;
    }

    if (/\./g.test(values.weight_grams) && /\./g.test(values.weight_grams).length > 1) {
      Alert.alert("O peso deve conter apenas um ponto (.) como separador decimal!");
      return false;
    }

    return true;
  };

  const handleUpdate = () => {
    if (!validateInputs()) {
      return;
    }

    const apiUrl = "http://192.168.1.17:3000/purchases/" + id;
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("Extrato");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Editar compra de ração</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da marca"
            value={dataLoaded ? values.brand_name : ""} 
            onChangeText={(text) => setValues({ ...values, brand_name: text })}
            maxLength={50}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.input}
            placeholder="Digite o preço"
            value={dataLoaded ? values.price : ""} // Display the value only after data is loaded
            onChangeText={(text) => setValues({ ...values, price: text })}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.input}
            placeholder="Digite o peso em gramas"
            value={dataLoaded ? values.weight_grams : ""}
            onChangeText={(text) =>
              setValues({ ...values, weight_grams: text })
            }
            keyboardType="numeric"
          />
        </View>
        <View style={styles.input}>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <DatePicker
              style={styles.dateInput}
              date={values.instant}
              setDate={(date) => setValues({ ...values, instant: date })}
              mode="date"
              setMode={() => {}}
              placeholder="Selecione a data"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonConfirm} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.buttonExtract}
          onPress={handleNavigateToCreate}
        >
          <Text style={styles.buttonText}>Extrato</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    length: "100%",
    backgroundColor: "#fff",
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    padding: 12,
    marginTop: 32,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  buttonConfirm: {
    backgroundColor: "#198754",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonExtract: {
    marginTop: 10,
    backgroundColor: "#87CEFA",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  alertText: {
    color: "red",
    marginBottom: 16,
  },
});

export default Update;

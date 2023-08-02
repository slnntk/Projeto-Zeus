import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MonthSelector from "./MonthSelector";
import Icon from "react-native-vector-icons/FontAwesome";

export function formatDate(dateString) {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleString("pt-BR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
}

function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleNavigateToCreate = () => {
    navigation.navigate("Comprar");
  };

  const [updateKey, setUpdateKey] = useState(0);

  const handleNavigateToUpdate = (purchaseId) => {
    navigation.navigate("Editar", { id: purchaseId });
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [reload, setReload] = useState(false);
  useEffect(() => {
    fetch("http://192.168.1.17:3000/purchases")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((err) => console.log(err));
  }, [isFocused]);

  const handleDelete = (id) => {
    fetch(`http://192.168.1.17:3000/purchases/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedData = data
          .slice()
          .filter((purchase) => purchase.purchase_id !== id);
        setData(updatedData);
        setFilteredData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  const handleFilterByMonth = (month, year) => {
    if (selectedMonth === month && selectedYear === year) {
      setSelectedMonth(null);
      setSelectedYear("");
      setFilteredData(data);
    } else {
      const filteredPurchases = data.filter((purchase) => {
        const purchaseMonth = new Date(purchase.instant).getMonth() + 1;
        const purchaseYear = new Date(purchase.instant)
          .getFullYear()
          .toString();
        return purchaseMonth === month && purchaseYear === year;
      });
      setSelectedMonth(month);
      setSelectedYear(year);
      setFilteredData(filteredPurchases);
    }
  };

  const handleShowAllPurchases = () => {
    setSelectedMonth(null);
    setSelectedYear("");
    setFilteredData(data);
    setReload(!reload);
  };

  const formattedTotalPrice = filteredData
    .reduce((total, purchase) => total + purchase.price, 0)
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const totalWeightInGrams = filteredData.reduce(
    (total, purchase) => total + purchase.weight_grams,
    0
  );
  const totalWeightInKilos = (totalWeightInGrams / 1000).toLocaleString(
    "pt-BR"
  );

  const renderPurchaseItem = ({ item }) => {
    return (
      <View style={styles.purchaseItem}>
        <Text style={styles.brand_name}>{item.brand_name}</Text>
        <Text style={styles.item_price}>R$ {item.price}</Text>
        <Text style={styles.item_weight}>{item.weight_grams}(g)</Text>
        <Text style={styles.item_data}>{formatDate(item.instant)}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => handleNavigateToUpdate(item.purchase_id)}
          >
            <Icon name="edit" size={10} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => handleDelete(item.purchase_id)}
          >
            <Icon name="trash" size={10} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.my_container}>
        <View style={styles.header_extrato_buyButton}>
          <Text style={styles.heading}>Extrato</Text>
          <TouchableOpacity
            style={styles.buttonConfirm}
            onPress={handleNavigateToCreate}
          >
            <Text style={styles.buttonText}>Comprar  +</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonShowAll}
            onPress={handleShowAllPurchases}
          >
            <Text style={styles.buttonText}>Mostrar Todos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <MonthSelector onFilterChange={handleFilterByMonth} reload={reload} />
        </View>
        <View style={{ flex: 1, marginBottom: 20 }}>
          <View style={styles.tableRow}>
            <Text style={styles.columnHeader}>Marca</Text>
            <Text style={styles.columnHeader}>Preço</Text>
            <Text style={styles.columnHeader}>Peso</Text>
            <Text style={styles.columnHeader}>Data</Text>
            <Text style={[styles.columnHeader, { flex: 0.68 }]}>Ações</Text>
          </View>
          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              renderItem={renderPurchaseItem}
              keyExtractor={(item) => item.purchase_id.toString()}
            />
          ) : (
            <Text style={styles.emptyListText}>Nenhum item encontrado.</Text>
          )}
        </View>
        <View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Total R$</Text>
              <Text style={styles.columnHeaderRight}>Total (Kg)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.total_price}>{formattedTotalPrice}</Text>
              <Text style={styles.total_weight}>{totalWeightInKilos} kg</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const monthButtonSize = 20;
const monthButtonMargin = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  my_container: {
    flex: 1,
    width: "100%",
    length: "100%",
    backgroundColor: "#fff",
    borderTopEndRadius: 14,
    borderTopStartRadius: 14,
    padding: 12,
  },
  header_extrato_buyButton: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  columnHeader: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  columnHeaderRight: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "right",
  },
  purchaseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    paddingTop: 10,
  },
  brand_name: {
    width: 60,
    textAlign: "left",
  },
  item_price: {
    width: 60,
    textAlign: "left",
  },
  item_data: {
    width: 60,
    textAlign: "left",
  },
  item_weight: {
    width: 50,
    textAlign: "left",
  },
  table: {},
  total_price: {
    flex: 0,
    width: 150,
    textAlign: "left",
  },
  total_weight: {
    flex: 0,
    width: 150,
    textAlign: "right",
  },
  buttonDelete: {
    backgroundColor: "#DC3545",
    borderColor: "red",
    width: 25,
    maxWidth: 25,
    maxHeight: 50,
    padding: 10,
    borderRadius: 4,
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEdit: {
    backgroundColor: "#0D6EFD",
    borderColor: "red",
    width: 25,
    maxWidth: 25,
    maxHeight: 50,
    padding: 10,
    borderRadius: 4,
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },
  buttonConfirm: {
    backgroundColor: "#198754",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    fontSize: 16,
  },
  buttonShowAll: {
    backgroundColor: "#0D6EFD",
    paddingVertical: 12,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: "#fff",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 60,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
});

export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MonthSelector from "./MonthSelector";

export function formatDate(dateString) {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function Home() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [showAllPurchases, setShowAllPurchases] = useState(false);
  const [reload, setReload] = useState(false);

  const handleShowAllPurchases = () => {
    setShowAllPurchases(!showAllPurchases);
    setSelectedMonth(null);
    setIsMonthSelected(false);
    setFilteredData(data);
    setReload(!reload);
  };

  useEffect(() => {
    axios
      .get("http://172.18.9.170:3000/purchases")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://172.18.9.170:3000/purchases/" + id)
      .then(() => {
        setData(data.filter((purchase) => purchase.purchase_id !== id));
        setFilteredData(
          filteredData.filter((purchase) => purchase.purchase_id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  const filterPurchasesByMonthAndYear = (month, year) => {
    const filteredPurchases = data.filter((purchase) => {
      const purchaseMonth = new Date(purchase.instant).getMonth() + 1;
      const purchaseYear = new Date(purchase.instant).getFullYear();
      const isMonthMatched = month === null || purchaseMonth === month;
      const isYearMatched =
        year === null || purchaseYear === parseInt(year, 10);

      if (month !== null && year !== null) {
        return isMonthMatched && isYearMatched;
      }

      return isMonthMatched || isYearMatched;
    });

    setSelectedMonth(month);
    setSelectedYear(year);
    setIsMonthSelected(month !== null);
    setFilteredData(filteredPurchases);
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

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div
        className="w-100 bg-white rounded p-5 d-flex flex-column h-100 max-height-500"
        style={{ borderWidth: "2px", borderColor: "red" }}
      >
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h1 className="extrato text-center p-4">Extrato</h1>
            </div>
            <div className="d-flex flex-column align-items-center mt-4 mb-3">
              <MonthSelector
                onFilterChange={filterPurchasesByMonthAndYear}
                reload={reload}
              />
            </div>
            <div className="d-flex align-items-center gap-2">
              <Link to="/record" className="btn btn-success ml-2">
                Comprar +
              </Link>
              <button
                className="btn btn-primary ml-2"
                onClick={handleShowAllPurchases}
              >
                Mostrar Todos
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-auto flex-fill" style={{ maxHeight: "300px" }}>
          <table className="table">
            <thead>
              <tr className="sticky-top">
                <th>Marca</th>
                <th>Preço (R$)</th>
                <th>Peso (g)</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {isMonthSelected && filteredData.length > 0 ? (
                filteredData.map((purchase, index) => (
                  <tr key={index}>
                    <td>{purchase.brand_name}</td>
                    <td>{purchase.price}</td>
                    <td>{purchase.weight_grams}</td>
                    <td>{formatDate(purchase.instant)}</td>
                    <td>
                      <div className="btn-group mr-2">
                        <Link
                          to={`/read/${purchase.purchase_id}`}
                          className="btn btn-sm btn-info"
                        >
                          Ler
                        </Link>
                        <Link
                          to={`/edit/${purchase.purchase_id}`}
                          className="btn btn-sm btn-primary mx-2"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-sm btn-danger mr-2"
                          onClick={() => handleDelete(purchase.purchase_id)}
                        >
                          Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : !isMonthSelected && data.length > 0 ? (
                data.map((purchase, index) => (
                  <tr key={index}>
                    <td>{purchase.brand_name}</td>
                    <td>{purchase.price}</td>
                    <td>{purchase.weight_grams}</td>
                    <td>{formatDate(purchase.instant)}</td>
                    <td>
                      <div className="btn-group mr-2">
                        <Link
                          to={`/read/${purchase.purchase_id}`}
                          className="btn btn-sm btn-info"
                        >
                          Ler
                        </Link>
                        <Link
                          to={`/edit/${purchase.purchase_id}`}
                          className="btn btn-sm btn-primary mx-2"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-sm btn-danger mr-2"
                          onClick={() => handleDelete(purchase.purchase_id)}
                        >
                          Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Nenhuma compra encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <table className="table mb-2">
          <thead>
            <tr>
              <th>Total (R$)</th>
              <th>Total (Kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formattedTotalPrice}</td>
              <td>{totalWeightInKilos} kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "./Home";

function Read() {
  const { id } = useParams();
  const [values, setPurchases] = useState([]);
  const [purchase, setValues] = useState({
    brand_name: "",
    price: "",
    weight_grams: "",
    instant: "",
  });
  useEffect(() => {
    axios
      .get("http://172.18.9.170:3000/purchases/" + id)
      .then((res) => {
        console.log(res);
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <table className="table">
          <thead>
            <h2>Detalhes da Compra</h2>
            <tr>
              <th>Marca</th>
              <th>Preço</th>
              <th>Peso(g)</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{purchase.brand_name}</td>
              <td>{purchase.price}</td>
              <td>{purchase.weight_grams}</td>
              <td>{formatDate(purchase.instant)}</td>
            </tr>
          </tbody>
        </table>
        <div className="p-2">
          <Link to="/" className="btn btn-primary me-2">
            Voltar
          </Link>
          <Link to={`/edit/${purchase.purchase_id}`} className="btn btn-info">
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;

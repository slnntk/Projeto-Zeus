import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    brand_name: "",
    price: "",
    weight_grams: "",
    instant: null,
  });

  useEffect(() => {
    axios
      .get("http://172.18.9.170:3000/purchases/" + id)
      .then((res) => {
        console.log(res.data);
        const purchaseData = res.data;
        setValues({
          brand_name: purchaseData.brand_name,
          price: purchaseData.price.toString(),
          weight_grams: purchaseData.weight_grams.toString(),
          instant: new Date(purchaseData.instant), // Convert the date string to a Date object
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(values.price);
    const weightNum = parseFloat(values.weight_grams);

    if (
      !values.brand_name ||
      isNaN(priceNum) ||
      isNaN(weightNum) ||
      priceNum < 0 ||
      weightNum < 0 ||
      values.price.length > 12 ||
      values.weight_grams.length > 12
    ) {
      return;
    }

    axios
      .put("http://172.18.9.170:3000/purchases/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <div className="d-flex flex-row justify-content-between">
            <h2>Editar compra de ração</h2>
            <Link to="/" className="btn btn-secondary text-white">
              Extrato
            </Link>
          </div>
          <div className="mb-2">
            <label htmlFor="">Nome da marca</label>
            <input
              type="text"
              placeholder="Digite o nome da marca"
              className="form-control"
              value={values.brand_name}
              onChange={(e) =>
                setValues({ ...values, brand_name: e.target.value })
              }
              maxLength={30}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Preço (R$)</label>
            <input
              type="number"
              step="any"
              placeholder="Digite o preço"
              className="form-control"
              value={values.price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
              min={0}
              max={100000000}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Peso (g)</label>
            <input
              type="number"
              step="any"
              placeholder="Digite o peso"
              className="form-control"
              value={values.weight_grams}
              onChange={(e) =>
                setValues({ ...values, weight_grams: e.target.value })
              }
              min={0}
              max={100000000}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Data da compra</label>
            <div>
              <DatePicker
                selected={values.instant}
                onChange={(date) => setValues({ ...values, instant: date })}
                className="form-control"
                placeholderText="Escolha a data da compra"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="mt-4 justify-content-between">
            <button type="submit" className="btn btn-success">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;

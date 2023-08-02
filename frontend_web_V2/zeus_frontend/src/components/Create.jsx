import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Create() {
  const [values, setValues] = useState({
    brand_name: "",
    price: "",
    weight_grams: "",
    instant: null,
  });

  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.brand_name || !values.price || !values.weight_grams) {
      setAlert(true);
    } else {
      const priceNum = parseFloat(values.price);
      const weightNum = parseFloat(values.weight_grams);

      if (
        isNaN(priceNum) ||
        isNaN(weightNum) ||
        priceNum < 0 ||
        weightNum < 0
      ) {
        setAlert(true);
      } else {
        axios
          .post("http://172.18.9.170:3000/purchases/", values)
          .then((res) => {
            console.log(res);
            navigate("/");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleGoSummary = () => {
    navigate("/");
  };

  return (
    <>
      {alert && (
        <CustomAlert message={"Preencha todos os campos corretamente."} />
      )}
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-row justify-content-between">
              <h2>Comprar ração</h2>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleGoSummary}
              >Extrato</button>
            </div>
            <div className="mb-2">
              <label htmlFor="brand_name">Nome da marca:</label>
              <input
                type="text"
                id="brand_name"
                placeholder="Digite o nome da marca"
                className="form-control"
                maxLength={50}
                value={values.brand_name}
                onChange={(e) =>
                  setValues({ ...values, brand_name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="price">Preço (R$):</label>
              <input
                type="number"
                step="any"
                id="price"
                placeholder="Digite o preço"
                className="form-control"
                pattern="[0-9]+(\.[0-9]*)?"
                maxLength={12}
                value={values.price}
                onChange={(e) =>
                  setValues({ ...values, price: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="weight_grams">Peso (g):</label>
              <input
                type="number"
                step="any"
                id="weight_grams"
                placeholder="Digite o peso"
                className="form-control"
                pattern="[0-9]+(\.[0-9]*)?"
                maxLength={12}
                value={values.weight_grams}
                onChange={(e) =>
                  setValues({ ...values, weight_grams: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="instant">Data:</label>
              <div>
                <DatePicker
                  id="instant"
                  selected={values.instant}
                  onChange={(date) => setValues({ ...values, instant: date })}
                  className="form-control"
                  placeholderText="Escolha a data"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="mt-4 justify-content-between mb-2">
              <button type="submit" className="btn btn-success">
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;

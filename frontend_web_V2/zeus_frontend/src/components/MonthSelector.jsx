import React, { useState, useEffect } from "react";

const MonthSelector = ({ onFilterChange, reload }) => {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");

  const handleFilterChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    onFilterChange(month, year);
  };

  useEffect(() => {
    setSelectedMonth("");
    setSelectedYear("");
  }, [reload]);

  return (
    <div className="d-flex justify-content-center align-sitems-center" style={{gap: 8}}>
      <div className="mr-3" style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
        <h6 style={{fontWeight: "bold" }} >Mês</h6>
        <select
          className="form-select custom-select"
          value={selectedMonth}
          s
          onChange={(e) =>
            handleFilterChange(Number(e.target.value), selectedYear)
          }
        >
          <option value="">Selecione o Mês</option>
          {meses.map((mes, index) => (
            <option key={index + 1} value={index + 1}>
              {mes}
            </option>
          ))}
        </select>
      </div>
      <div className="mr-3" style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
      <h6 style={{fontWeight: "bold" }} >Ano</h6>
        <select
          className="form-select custom-select"
          value={selectedYear}
          onChange={(e) => handleFilterChange(selectedMonth, e.target.value)}
        >
          <option value="">Selecione o Ano</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
    </div>
  );
};

export default MonthSelector;

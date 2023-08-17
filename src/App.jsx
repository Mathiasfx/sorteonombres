import { useState } from "react";
import Papa from "papaparse";

import "./App.css";
import Sorteo from "./Sorteo";

function App() {
  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        const validData = result.data.filter(item => item.Nombre && item.Apellido); // Filtrar campos vacíos
        setCsvData(validData);
      },
      header: true,
      delimiter: ";",
    });
  };

  return (
    <>
      {csvData.length > 0 ? (
        <Sorteo nombres={csvData} setCsvData={setCsvData} />
      ) : (
        <input type="file" accept=".csv" onChange={handleFileChange} />
      )}
    </>
  );
}

export default App;

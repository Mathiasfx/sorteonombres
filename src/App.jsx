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
        setCsvData(result.data);
      },
      header: true, // Si la primera fila del CSV contiene encabezados
      delimiter: ";", // Especifica el delimitador (;) en tu CSV
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

import { useState } from "react";
import Papa from "papaparse";

import "./App.css";
import Sorteo from "./Sorteo";

function App() {
  const [csvData, setCsvData] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false); // Nuevo estado para verificar si se cargó el archivo

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        const validData = result.data.filter((item) => item.Nombre);
        setCsvData(validData);
        setFileUploaded(true); // Establecer que se cargó el archivo
      },
      header: true,
      delimiter: ";",
    });
  };

  const confirmFileUpload = () => {
    // Simplemente establecer el estado de fileUploaded en true
    setFileUploaded(true);
  };

  return (
    <>
      {csvData.length > 0 || fileUploaded ? ( // Verificar si se cargó el archivo o si ya existe data
        <Sorteo nombres={csvData} setCsvData={setCsvData} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          {/* Botón para confirmar la carga del archivo */}
          <button onClick={confirmFileUpload}>Confirmar carga</button>
        </div>
      )}
    </>
  );
}

export default App;

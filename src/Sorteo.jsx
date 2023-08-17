/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

// eslint-disable-next-line react/prop-types
const Sorteo = ({ nombres, setCsvData }) => {
  const { width, height } = useWindowSize();
  const [isRendering, setIsRendering] = useState(true);
  const [indexDel, setIndexDel] = useState(0);

  const interval = 70;
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (isRendering && nombres.length > 0) {
      const i = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * nombres.length);
        const randomNombre = nombres[randomIndex]?.Nombre || "-";
        const randomApellido = nombres[randomIndex]?.Apellido || "-";
        setNombre(`${randomNombre} ${randomApellido}`);
        setIndexDel(randomIndex);
      }, interval);
      return () => clearInterval(i);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRendering, nombres, interval]);

  useEffect(() => {
    if (isRendering) {
      console.log(indexDel);

      // Eliminar al ganador del arreglo de nombres
      const updatedNombres = nombres.filter((_, index) => index !== indexDel);
      setCsvData(updatedNombres);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      console.log(updatedNombres);
    }
  }, [isRendering]);

  return (
    <div>
      <Confetti
        style={!isRendering ? { display: "block" } : { display: "none" }}
        width={width}
        height={height}
      />
      <div className="contenedorNombre">
        <h2 className="names">{isRendering ? nombre : nombre}</h2>
      </div>
      <button
        className="btnsortear"
        onClick={() => setIsRendering(!isRendering)}
      >
        {!isRendering ? "Sortear" : "Detener"}
      </button>
    </div>
  );
};

export default Sorteo;

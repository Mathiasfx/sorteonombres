/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

// eslint-disable-next-line react/prop-types
const Sorteo = ({ nombres, setCsvData }) => {
  const { width, height } = useWindowSize();
  const [isRendering, setIsRendering] = useState(true);
  const [nombresDisponibles, setNombresDisponibles] = useState([...nombres]);
  const [nombresSeleccionados, setNombresSeleccionados] = useState([]);
  const [nombre, setNombre] = useState("");
  const interval = 50;

  useEffect(() => {
    if (isRendering && nombres.length > 0) {
      const i = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * nombres.length);
        const randomNombre = nombres[randomIndex]?.Nombre || "-";
        const randomApellido = nombres[randomIndex]?.Apellido || "-";
        setNombre(`${randomNombre} ${randomApellido}`);
   
      }, interval);
      return () => clearInterval(i);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRendering, nombres, interval]);

  const seleccionarNombres = () => {
    setIsRendering(!isRendering);
    if (isRendering) {
      const nombresAleatorios = [];
      const nombresRestantes = nombresDisponibles.filter((_, index) => !nombresSeleccionados.includes(index));

      while (nombresAleatorios.length < 20 && nombresRestantes.length > 0) {
        const randomIndex = Math.floor(Math.random() * nombresRestantes.length);
        nombresAleatorios.push(nombresRestantes[randomIndex]);
        nombresRestantes.splice(randomIndex, 1);
      }

      setNombresSeleccionados(nombresSeleccionados.concat(nombresAleatorios));

      const updatedNombresDisponibles = nombresDisponibles.filter((_, index) => !nombresSeleccionados.includes(index));
    
      setCsvData(updatedNombresDisponibles);
      setNombresDisponibles(updatedNombresDisponibles);
  

    
     
    }
  };

  // useEffect(() => {
  //   if (isRendering) {
  //     const i = setInterval(seleccionarNombres, interval);
  //     return () => clearInterval(i);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isRendering, nombresSeleccionados, interval]);

  return (
    <div>
    <Confetti
      style={!isRendering ? { display: "block" } : { display: "none" }}
      width={width}
      height={height}
    />
    <div className="contenedorNombre">
      <h2 className="names">{isRendering ? nombre: nombresSeleccionados.map(persona => (
              <div key={`${persona.Nombre}-${persona.Apellido}`}>
                {`${persona.Nombre} ${persona.Apellido}`}
                <br />
              </div>
            ))}</h2>
    </div>
    <button className="btnsortear" onClick={seleccionarNombres}>
      {!isRendering ? "Sortear" : "Detener"}
    </button>
  </div>
  );
};

export default Sorteo;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Sorteo = ({ nombres, setCsvData }) => {
  // Obtenemos el tamaño de la ventana para el efecto de confeti
  const { width, height } = useWindowSize();

  // Estado para controlar si se está realizando el sorteo o no
  const [isRendering, setIsRendering] = useState(true);

  // Estado para almacenar los nombres disponibles para el sorteo
  const [nombresDisponibles, setNombresDisponibles] = useState([...nombres]);

  // Estado para almacenar los nombres seleccionados durante el sorteo
  const [nombresSeleccionados, setNombresSeleccionados] = useState([]);

  // Estado para almacenar el nombre actual que se está mostrando
  const [nombre, setNombre] = useState("");

  // Intervalo de tiempo para generar nombres aleatorios durante el sorteo
  const interval = 50;

  useEffect(() => {
    // Efecto para generar nombres aleatorios mientras el sorteo esté activo
    if (isRendering && nombres.length > 0) {
      const i = setInterval(() => {
        // Generar un índice aleatorio dentro del rango de nombres disponibles
        const randomIndex = Math.floor(
          Math.random() * nombresDisponibles.length
        );
        // Obtener el nombre aleatorio correspondiente al índice generado
        const randomNombre = nombresDisponibles[randomIndex]?.Nombre || "-";
        // Actualizar el nombre que se está mostrando
        setNombre(randomNombre);
      }, interval);
      return () => clearInterval(i);
    }

    // Imprimir en la consola los nombres disponibles (solo para propósitos de depuración)
    console.log(nombresDisponibles);
  }, [isRendering, nombres, nombresDisponibles, interval]);

  const seleccionarNombres = () => {
    // Cambiar el estado de isRendering para iniciar o detener el sorteo
    setIsRendering(!isRendering);

    // Si el sorteo está iniciando
    if (isRendering) {
      // Generar un nombre aleatorio una vez
      const randomIndex = Math.floor(Math.random() * nombresDisponibles.length);
      const nombreAleatorio = nombresDisponibles[randomIndex];

      // Agregar el nombre aleatorio seleccionado a la lista de nombres seleccionados
      setNombresSeleccionados([...nombresSeleccionados, nombreAleatorio]);

      // Actualizar la lista de nombres disponibles eliminando el nombre seleccionado
      const updatedNombresDisponibles = nombresDisponibles.filter(
        (nombre, index) => index !== randomIndex
      );
      setNombresDisponibles(updatedNombresDisponibles);

      // Actualizar los datos CSV si es necesario
      setCsvData(updatedNombresDisponibles);
    }
  };

  return (
    <div>
      {/* Confeti que se muestra cuando se detiene el sorteo */}
      <Confetti
        style={!isRendering ? { display: "block" } : { display: "none" }}
        width={width}
        height={height}
      />

      {/* Mostrar el nombre actual o los nombres seleccionados */}
      <div className="contenedorNombre">
        <h2 className="names">
          {isRendering
            ? nombre // Mostrar un nombre aleatorio mientras se está realizando el sorteo
            : nombresSeleccionados.map((persona) => (
                <div key={`${persona.Nombre}`}>
                  {`${persona.Nombre}`} <br />
                </div>
              ))}
        </h2>
      </div>

      {/* Botón para iniciar o detener el sorteo */}
      <button className="btnsortear" onClick={seleccionarNombres}>
        {!isRendering ? "Sortear" : "Detener"}
      </button>
    </div>
  );
};

export default Sorteo;

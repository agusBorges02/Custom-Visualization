// Este es un código de ejemplo de visualización personalizada en Looker
import * as d3 from "d3";  // Asegúrate de que la librería que usas esté disponible

// Definir el módulo de visualización
export default {
  // Propiedades de la visualización
  options: {
    fontSize: {
      type: "string",
      label: "Tamaño de la fuente",
      default: "12px"
    },
    barColor: {
      type: "string",
      label: "Color de las barras",
      default: "#4CAF50"
    },
  },

  // Función para renderizar la visualización
  create: function(element, config) {
    // Crear un contenedor en el DOM para la visualización
    element.innerHTML = `<div id="custom-vis"></div>`;
  },

  // Función que se ejecuta cada vez que cambian los datos o la configuración
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // Limpiar cualquier visualización previa
    d3.select("#custom-vis").html("");

    // Obtener los datos de Looker
    const measure = queryResponse.fields.measure_like[0];
    const dimension = queryResponse.fields.dimension_like[0];

    // Configurar el gráfico de barras
    const svg = d3.select("#custom-vis")
                  .append("svg")
                  .attr("width", "100%")
                  .attr("height", 300);

    const bars = svg.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("width", (d) => d[measure.name].value * 10)  // Escala simple
                    .attr("height", 20)
                    .attr("y", (d, i) => i * 25)
                    .attr("fill", config.barColor);  // Color personalizado desde la opción

    // Agregar etiquetas de dimensión
    svg.selectAll("text")
       .data(data)
       .enter()
       .append("text")
       .text((d) => d[dimension.name].value)
       .attr("y", (d, i) => i * 25 + 15)
       .attr("x", 5)
       .attr("font-size", config.fontSize);  // Tamaño de fuente personalizado

    // Notificar a Looker que la visualización ha terminado de renderizar
    doneRendering();
  }
};

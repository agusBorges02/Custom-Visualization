export default {
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

  create: function(element, config) {
      element.innerHTML = "<div id='custom-vis'></div>";
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
      console.log("Datos recibidos:", data);
      console.log("Query Response:", queryResponse);

      // Limpiar cualquier visualización previa
      d3.select("#custom-vis").html("");

      // Acceder directamente a los campos esperados
      const measure = queryResponse.fields.measure_like.find(field => field.name === "count");
      const dimension = queryResponse.fields.dimension_like.find(field => field.name === "genero");

      if (!measure || !dimension) {
          console.error("No se encontraron los campos de medida o dimensión esperados");
          doneRendering();
          return;
      }

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

      doneRendering();
  }
};

looker.plugins.visualizations.add({
  create: function(element, config) {
    element.innerHTML = "<div id='custom-vis'>Cargando visualización...</div>";
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // Limpiar cualquier visualización previa
    const container = document.getElementById("custom-vis");
    container.innerHTML = "";

    // Obtener la primera dimensión y medida de los datos
    const dimension = queryResponse.fields.dimension_like[0].name;
    const measure = queryResponse.fields.measure_like[0].name;

    // Crear un SVG básico
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", 300);

    // Agregar barras para cada fila de datos
    data.forEach((row, index) => {
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("width", row[measure].value * 0.00001); // Ajusta el ancho a un valor visible
      rect.setAttribute("height", 20);
      rect.setAttribute("x", 0);
      rect.setAttribute("y", index * 30);
      rect.setAttribute("fill", "steelblue");

      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", 5);
      text.setAttribute("y", index * 30 + 15);
      text.setAttribute("fill", "#FFF");
      text.textContent = row[dimension].value;

      svg.appendChild(rect);
      svg.appendChild(text);
    });

    container.appendChild(svg);

    doneRendering();
  }
});

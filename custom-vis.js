looker.plugins.visualizations.add({
  create: function(element, config) {
    element.innerHTML = "<div id='custom-vis'>Cargando visualización...</div>";
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // Limpiar cualquier visualización previa
    const container = document.getElementById("custom-vis");
    container.innerHTML = "";

    // Crear un SVG básico sin D3.js
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "200");

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("width", "200");
    rect.setAttribute("height", "100");
    rect.setAttribute("x", "100");
    rect.setAttribute("y", "50");
    rect.setAttribute("fill", "steelblue");

    svg.appendChild(rect);
    container.appendChild(svg);

    doneRendering();
  }
});

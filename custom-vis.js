export default {
  create: function(element, config) {
    // Crear un contenedor para la visualización
    element.innerHTML = "<div id='custom-vis'>Cargando visualización...</div>";
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // Verificar si D3 está cargado
    if (!window.d3) {
      const script = document.createElement("script");
      script.src = "https://d3js.org/d3.v5.min.js";
      script.onload = () => this.updateAsync(data, element, config, queryResponse, details, doneRendering);
      document.head.appendChild(script);
      return;
    }

    // Limpiar cualquier visualización previa
    d3.select("#custom-vis").html("");

    // Crear un SVG con un rectángulo simple
    const svg = d3.select("#custom-vis")
                  .append("svg")
                  .attr("width", 400)
                  .attr("height", 200);

    svg.append("rect")
       .attr("width", 200)
       .attr("height", 100)
       .attr("x", 100)
       .attr("y", 50)
       .attr("fill", "steelblue");

    // Llamar a doneRendering para notificar a Looker que terminó de renderizar
    doneRendering();
  }
};

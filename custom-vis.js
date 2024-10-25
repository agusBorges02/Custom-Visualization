export default {
  create: function(element, config) {
    element.innerHTML = "<div id='custom-vis'>hola</div>";
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // Limpiar cualquier visualización previa
    d3.select("#custom-vis").html("");

    // Configuración simple de SVG y rectángulo estático (sin datos)
    const svg = d3.select("#custom-vis")
                  .append("svg")
                  .attr("width", "100%")
                  .attr("height", 300);

    svg.append("rect")
       .attr("width", 200)
       .attr("height", 100)
       .attr("x", 50)
       .attr("y", 50)
       .attr("fill", "steelblue");

    doneRendering();
  }
};

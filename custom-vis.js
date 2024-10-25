// Cargar D3.js en el entorno
let d3;
(async () => {
    if (!window.d3) {
        const script = document.createElement("script");
        script.src = "https://d3js.org/d3.v5.min.js";
        script.onload = () => {
            d3 = window.d3;
            this.updateAsync(data, element, config, queryResponse, details, doneRendering);
        };
        document.head.appendChild(script);
    } else {
        d3 = window.d3;
    }
})();

// Definir el módulo de visualización
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
        // Espera a que d3 esté disponible
        if (!d3) return;

        console.log("Datos recibidos:", data);
        console.log("Query Response:", queryResponse);

        // Limpiar cualquier visualización previa
        d3.select("#custom-vis").html("");

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

        doneRendering();
    }
};

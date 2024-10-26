looker.plugins.visualizations.add({
  create: function(element, config) {
    element.innerHTML = "<div id='custom-vis' style='display: flex; justify-content: center; gap: 50px; background-color: #f3f1e3; padding: 20px; border-radius: 10px;'></div>";
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // Limpiar cualquier visualización previa
    const container = document.getElementById("custom-vis");
    container.innerHTML = "";

    // Filtrar solo los valores de 'Masculino' y 'Femenino'
    const filteredData = data.filter(row => {
      const gender = row[queryResponse.fields.dimension_like[0].name].value;
      return gender === 'M' || gender === 'F';
    });

    // Calcular el total para el porcentaje
    const total = filteredData.reduce((sum, row) => sum + row[queryResponse.fields.measure_like[0].name].value, 0);

    // Crear visualización de íconos con función de filtro
    filteredData.forEach(row => {
      const gender = row[queryResponse.fields.dimension_like[0].name].value;
      const count = row[queryResponse.fields.measure_like[0].name].value;
      const percentage = ((count / total) * 100).toFixed(1); // Calcular el porcentaje y redondear

      // Crear contenedor para cada género
      const itemContainer = document.createElement("div");
      itemContainer.style.textAlign = "center";
      itemContainer.style.cursor = "pointer"; // Cambiar cursor para indicar que es interactivo

      // Aplicar evento de filtro al hacer clic
      itemContainer.onclick = () => {
        const filters = {};
        filters[queryResponse.fields.dimension_like[0].name] = gender;
        looker.plugins.visualizations.emit("filter", filters);
      };

      // Añadir ícono basado en el género
      const icon = document.createElement("img");
      icon.src = gender === 'F' 
        ? 'https://cdn-icons-png.flaticon.com/512/5726/5726949.png'  // Ícono para mujer
        : 'https://cdn-icons-png.flaticon.com/512/5726/5726939.png'; // Ícono para hombre
      icon.style.width = "70px";
      icon.style.marginBottom = "10px";

      // Añadir porcentaje debajo del ícono
      const percentageText = document.createElement("div");
      percentageText.textContent = `${percentage}%`;
      percentageText.style.fontSize = "24px";
      percentageText.style.fontFamily = "'Bambino New Semi Bold', Arial, sans-serif";
      percentageText.style.color = "#333";

      // Añadir el ícono y el texto al contenedor
      itemContainer.appendChild(icon);
      itemContainer.appendChild(percentageText);
      container.appendChild(itemContainer);
    });

    doneRendering();
  }
});

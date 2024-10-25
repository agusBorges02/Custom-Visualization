looker.plugins.visualizations.add({
  create: function(element, config) {
    element.innerHTML = "<div id='custom-vis' style='display: flex; justify-content: center; gap: 50px;'></div>";
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

    // Crear visualización de íconos
    filteredData.forEach(row => {
      const gender = row[queryResponse.fields.dimension_like[0].name].value;
      const count = row[queryResponse.fields.measure_like[0].name].value;
      const percentage = ((count / total) * 100).toFixed(0); // Calcular el porcentaje y redondear

      // Crear contenedor para cada género
      const itemContainer = document.createElement("div");
      itemContainer.style.textAlign = "center";

      // Añadir ícono basado en el género
      const icon = document.createElement("img");
      icon.src = gender === 'F' ? 'https://path_to_female_icon.png' : 'https://path_to_male_icon.png'; // Sustituye con las URLs de los íconos
      icon.style.width = "60px";
      icon.style.height = "60px";

      // Añadir porcentaje debajo del ícono
      const percentageText = document.createElement("div");
      percentageText.textContent = `${percentage}%`;
      percentageText.style.fontSize = "20px";

      // Añadir el ícono y el texto al contenedor
      itemContainer.appendChild(icon);
      itemContainer.appendChild(percentageText);
      container.appendChild(itemContainer);
    });

    doneRendering();
  }
});

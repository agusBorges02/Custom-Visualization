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
      itemContainer.style.backgroundColor = "#f3f1e3"; // Fondo común para ambos géneros
      itemContainer.style.padding = "10px 0 20px"; // Espaciado en la parte superior e inferior
      itemContainer.style.borderRadius = "8px"; // Bordes redondeados

      // Añadir ícono basado en el género
      const icon = document.createElement("img");
      icon.src = gender === 'F' 
        ? 'https://cdn-icons-png.flaticon.com/512/5726/5726949.png'  // Ícono para mujer
        : 'https://cdn-icons-png.flaticon.com/512/5726/5726939.png'; // Ícono para hombre
      icon.style.width = "70px";

      // Añadir porcentaje debajo del ícono
      const percentageText = document.createElement("div");
      percentageText.textContent = `${percentage}%`;
      percentageText.style.fontSize = "20px";
      percentageText.style.marginTop = "10px";

      // Añadir el ícono y el texto al contenedor
      itemContainer.appendChild(icon);
      itemContainer.appendChild(percentageText);
      container.appendChild(itemContainer);
    });

    doneRendering();
  }
});

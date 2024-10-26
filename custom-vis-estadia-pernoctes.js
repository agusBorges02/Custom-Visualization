looker.plugins.visualizations.add({
    create: function(element, config) {
      element.innerHTML = `
        <div id='custom-vis' style='display: flex; justify-content: space-between; align-items: center; background-color: #f3f1e3; padding: 12px; border-radius: 10px; width: 100%;'>
          <div id="estadia-container" style="text-align: center; font-family: Arial, sans-serif; width: 45%; padding: 20px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
              <img src="https://img.icons8.com/?size=100&id=zyScOpkt9POE&format=png&color=000000" alt="Icono de Estadía" style="width:40px;"/>
              <div style="font-size: 18px; color: #333;">Estadía promedio</div>
            </div>
            <div style="font-size: 20px; font-weight: bold; color: #333; margin-top: 5px;">DÍAS</div>
            <div id="estadia-value" style="font-size: 36px; color: #333;">0</div>
          </div>
          <div id="pernoctes-container" style="text-align: center; font-family: Arial, sans-serif; width: 45%; padding: 20px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
              <img src="https://img.icons8.com/?size=100&id=11375&format=png&color=000000" alt="Icono de Pernoctes" style="width:40px;"/>
              <div style="font-size: 18px; color: #333;">Promedio Pernoctes</div>
            </div>
            <div style="font-size: 20px; font-weight: bold; color: #333; margin-top: 5px;">NOCHES</div>
            <div id="pernoctes-value" style="font-size: 36px; color: #333;">0</div>
          </div>
        </div>
      `;
    },
  
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
      // Nombres exactos de los campos según el .view
      const estadiaFieldName = "estadia_promedio_distinct_visitors";
      const pernoctesFieldName = "pernoctes_promedio_distinct_visitors";
  
      // Asignar los valores a las etiquetas correspondientes en el HTML
      const estadiaData = data[0][estadiaFieldName];
      const pernoctesData = data[0][pernoctesFieldName];
  
      if (estadiaData && estadiaData.value != null) {
        document.getElementById("estadia-value").innerText = estadiaData.value.toFixed(1);
      } else {
        document.getElementById("estadia-value").innerText = "N/A";
      }
  
      if (pernoctesData && pernoctesData.value != null) {
        document.getElementById("pernoctes-value").innerText = pernoctesData.value.toFixed(1);
      } else {
        document.getElementById("pernoctes-value").innerText = "N/A";
      }
  
      doneRendering();
    }
  });
  
looker.plugins.visualizations.add({
    create: function(element, config) {
      element.innerHTML = `
        <div id='custom-vis' style='display: flex; justify-content: space-around; background-color: #f3f1e3; padding: 20px; border-radius: 10px;'>
          <div id="estadia-container" style="text-align: center; font-family: Arial, sans-serif; width: 45%;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
              <img src="https://img.icons8.com/?size=100&id=zyScOpkt9POE&format=png&color=000000" alt="Icono de Estadía" style="width:40px;"/>
              <div style="font-size: 18px; color: #333;">Estadía promedio</div>
            </div>
            <div style="font-size: 36px; font-weight: bold; color: #333;">DÍAS</div>
            <div id="estadia-value" style="font-size: 30px; color: #333;">0</div>
          </div>
          <div id="pernoctes-container" style="text-align: center; font-family: Arial, sans-serif; width: 45%;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
              <img src="https://img.icons8.com/?size=100&id=11375&format=png&color=000000" alt="Icono de Pernoctes" style="width:40px;"/>
              <div style="font-size: 18px; color: #333;">Pernoctes promedio</div>
            </div>
            <div style="font-size: 36px; font-weight: bold; color: #333;">NOCHES</div>
            <div id="pernoctes-value" style="font-size: 30px; color: #333;">0</div>
          </div>
        </div>
      `;
    },
  
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
      // Obtener los nombres de los campos de las medidas
      const estadiaField = queryResponse.fields.measure_like.find(field => field.label.toLowerCase().includes("estadia promedio"));
      const pernoctesField = queryResponse.fields.measure_like.find(field => field.label.toLowerCase().includes("pernoctes promedio"));
  
      // Asignar los valores a las etiquetas correspondientes en el HTML
      if (estadiaField) {
        const estadiaValue = data[0][estadiaField.name].value;
        document.getElementById("estadia-value").innerText = estadiaValue.toFixed(1);
      }
  
      if (pernoctesField) {
        const pernoctesValue = data[0][pernoctesField.name].value;
        document.getElementById("pernoctes-value").innerText = pernoctesValue.toFixed(1);
      }
  
      doneRendering();
    }
  });
  
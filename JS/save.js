function saveData(){
  let data = JSON.stringify(grupos);
  localStorage.setItem("grupos",data);
}

function loadData(){
  let data = localStorage.getItem("grupos");
  if(data === null) return;

  grupos = JSON.parse(data);
}

function exportarDatos(){
  $("#output-datos-guardado").val(JSON.stringify(grupos));
}

function importarDatos(){
  let data = $("#input-datos-guardado").val();
  if(data.length > 0);
  localStorage.setItem("grupos",data);

  limpiarSelects();
  updateDisplayGrupos();
  updateOpcionesSelect();
}

function borrarDatos(){
  if(confirm("Seguro que quieres borrar los datos???"))
    localStorage.removeItem("grupos");
    location.reload();
}

function borrarDatosSinConfirm(){
  localStorage.removeItem("grupos");
}
let grupoGanador = null;
let grupoPerdedor = null;


$(document).ready(() => {
  loadData();
  
  updateDisplayGrupos();
  updateOpcionesSelect();


  //Cosas que creo que son para cerrar el modal pulsando atras
  // $('#lista-talentos').on('show.bs.offcanvas', function (e) {
  //   window.location.hash = "offcanvas";
  // });

  // $(window).on('hashchange', function (event) {
  //   if (window.location.hash != "#offcanvas") {
  //     $('#lista-talentos').offcanvas('hide');
  //   }
  // });

  $("#selector-grupo-1").on("change",(e) => listenerSelect1(e));
  $("#selector-grupo-2").on("change",(e) => listenerSelect2(e));

  $("#opcion-ganador-1").click(function () {
      if($(this).prop("checked")) { listenerRadioGanador(this); }
  });
  $("#opcion-ganador-2").click(function () {
      if($(this).prop("checked")) {  listenerRadioGanador(this); }
  });

  limpiarSelects();
});

function updateDisplayGrupos(){
  let contenedor = $("#contenedor-grupos");

  let fases = [];

  //Clasificamos los grupos por fases
  for(let i = 0; i < grupos.length; i++){
    let numMiembros = grupos[i].miembros.length;

    if(grupos[i].nombre === "Descalificados"){
      numMiembros = 0;
    }

    if(fases[numMiembros] === undefined){
      fases[numMiembros] = [];
    }

    fases[numMiembros].push(grupos[i]);
  }

  contenedor.empty();
  for(let i = fases.length; i >= 0; i--){
    if(fases[i] === undefined) continue;

    contenedor.append(htmlFase(i));

    for(let grupo = 0; grupo < fases[i].length; grupo++){
      $(`#grupos-fase-${i}`).append(htmlGrupo(fases[i][grupo]));
    }
  }
  
  
}

function htmlFase(numMiembros){
  let codigo;
  if (numMiembros > 0){
    codigo = `<div id="fase-${numMiembros}" class="contenedor-fase">
                <div id="header-fase-${numMiembros}" class="header-fase">
                  <h5>Fase ${numMiembros}</h5>
                </div>
                <div id="grupos-fase-${numMiembros}" class="contenedor-grupos-fase">
                </div>
              </div><hr/>`
  } else {
    codigo = `<div id="fase-${numMiembros}" class="contenedor-fase">
                <div id="header-fase-${numMiembros}" class="header-fase">
                  <h5>Descalificados</h5>
                </div>
                <div id="grupos-fase-${numMiembros}" class="contenedor-grupos-fase">
                </div>
              </div>`
  }
  return codigo;
}

function htmlGrupo(grupo){
  let nombregrupo = grupo.nombre;

  //Abrimos div y ponemos nombre del grupo
  let codigo = `<div id="${grupo.nombre}" class="grupo">
                  <div class="nombre-grupo">
                    ${grupo.nombre}
                  </div>`;

  //Añadimos los miembros                  
  for(let i = 0; i < grupo.miembros.length; i++){
    let miembro = grupo.miembros[i];
    let categoria = getCategoria(miembro)

    codigo += `<div class="miembro-grupo ${categoria}">
                ${miembro}
              </div>`;
  }

  //Cerramos div
  codigo += "</div>";
  return codigo;
}

function getCategoria(participante){
  for(let i = 0; i < participantes.length; i++){
    if(participantes[i].nombre === participante){
      return participantes[i].categoria
    }
  }
}

function updateOpcionesSelect(){
  let listaGrupos = [];
  for(let i = 0; i < grupos.length; i++){
    if(grupos[i].nombre === "Descalificados") continue;

    listaGrupos.push(grupos[i].nombre);
  }
  listaGrupos.sort();
  $("#selector-grupo-1").empty().append('<option value="" disabled selected>Elige un grupo</option>');
  $("#selector-grupo-2").empty().append('<option value="" disabled selected>Elige un grupo</option>');
  for(let i = 0; i < listaGrupos.length; i++){
    $("#selector-grupo-1").append($("<option>",{
      value: listaGrupos[i],
      text: listaGrupos[i]
    }));

    $("#selector-grupo-2").append($("<option>",{
      value: listaGrupos[i],
      text: listaGrupos[i]
    }));
  }
  
}

function updateOpcionesSelect2(){
  let grupo1 = getGrupo($("#selector-grupo-1").val());
  let numMiembros = grupo1.miembros.length;
  let listaGrupos = [];
  
  for(let i = 0; i < grupos.length; i++){
    if(grupos[i].nombre === "Descalificados" || grupos[i].nombre === grupo1.nombre) continue;

    if(grupos[i].miembros.length == numMiembros){
      listaGrupos.push(grupos[i].nombre);
    }
  }

  listaGrupos.sort();
  $("#selector-grupo-2").empty().append('<option value="" disabled selected>Elige un grupo</option>');
  for(let i = 0; i < listaGrupos.length; i++){
    $("#selector-grupo-2").append($("<option>",{
      value: listaGrupos[i],
      text: listaGrupos[i]
    }));
  }
  
}

function listenerSelect1(e){
  $("#btn-clear").show();
  $("#selector-grupo-2").prop('disabled', false);
  let val = getGrupo($("#selector-grupo-1").val());
  $("#grupo-combate-1").empty().append(htmlGrupo(val));
  $("#selector-grupo-1").hide();
  $("#grupo-combate-1").show();
  updateOpcionesSelect2();
}

function listenerSelect2(e){
  let val = getGrupo($("#selector-grupo-2").val());
  $("#grupo-combate-2").empty().append(htmlGrupo(val));
  $("#selector-grupo-2").hide();
  $("#grupo-combate-2").show();
}

function limpiarSelects(){
  $("#selector-grupo-1").show();
  $("#selector-grupo-1").val("");
  $("#selector-grupo-2").show();
  $("#selector-grupo-2").val("");
  $("#selector-grupo-2").prop('disabled', true);
  $("#btn-clear").hide();
  $("#grupo-combate-1").hide();
  $("#grupo-combate-2").hide();
}

function getGrupo(nombreGrupo){
  for(let i = 0; i < grupos.length; i++){
    if(grupos[i].nombre == nombreGrupo)
      return grupos[i];
  }
  return undefined;
}

function mostrarModalCombate(){
  let val1 = $("#selector-grupo-1").val();
  let val2 = $("#selector-grupo-2").val()
  if(val1 == null || val2 == null) return;

  $("#titulo-modal-combate").html(`${val1} vs ${val2}`);

  
  $("#opcion-ganador-1").prop("checked",false);
  $("#opcion-ganador-2").prop("checked",false);
  $("#contenedor-robos").hide();

  $("#label-opcion-ganador-1").html(val1);
  $("#label-opcion-ganador-2").html(val2);
  $("#modal-combate").modal("show");
}

function listenerRadioGanador(ganador){
  let opcion1 = $("#opcion-ganador-1");
  let opcion2 = $("#opcion-ganador-2");

  if(opcion1.prop("checked")){
    grupoGanador = getGrupo($("#selector-grupo-1").val());
    grupoPerdedor = getGrupo($("#selector-grupo-2").val());
  } else if(opcion2.prop("checked")){
    grupoGanador = getGrupo($("#selector-grupo-2").val());
    grupoPerdedor = getGrupo($("#selector-grupo-1").val());
  } else {
    return;
  }

  $("#contenedor-botones-robos").empty();
  for(let i = 0; i < grupoPerdedor.miembros.length; i++){
    let botonRobo = `<input type="checkbox" class="btn-check opcion-robo" id="opcion-robo-${i}" data-miembro="${grupoPerdedor.miembros[i]}">
                     <label class="btn btn-outline-success label-robo" id="label-opcion-ganador-2" for="opcion-robo-${i}">${grupoPerdedor.miembros[i]}</label>`
    $("#contenedor-botones-robos").append(botonRobo);
  }
  
  $("#contenedor-robos").show();
}

function listenerConfirmarRobos(){
  if(grupoGanador == null || grupoPerdedor == null) return;

  let robados = [];

  let opcionesRobo = document.getElementsByClassName("opcion-robo");
  for(let i = 0; i < opcionesRobo.length; i++){
    if(opcionesRobo[i].checked){
      robados.push(opcionesRobo[i].dataset.miembro);
    }
  }
  if(robados.length == 0) return;

  
  for(let i = 0; i < robados.length; i++){
    grupoGanador.miembros.push(robados[i]);
    for (let j = grupoPerdedor.miembros.length-1; j >= 0; j--) {
      if (grupoPerdedor.miembros[j] === robados[i]) {
        grupoPerdedor.miembros.splice(j, 1);
      }
    }
  }

  if(grupoPerdedor.miembros.length == 1){
    //Buscamos el grupo de descalificados
    let grupoDescalificados;
    for(let i = grupos.length-1; i >= 0; i--){
      if(grupos[i].nombre === "Descalificados"){
        grupoDescalificados = grupos[i];
        break;
      }
    }
    //Añadimos el tontito a descalificados
    grupoDescalificados.miembros.push(grupoPerdedor.miembros[0]);

    //Eliminamos el grupo vacio
    for(let i = 0; i < grupos.length; i++){
      if(grupos[i].nombre === grupoPerdedor.nombre){
        grupos.splice(i,1);
        break;
      }
    }
  }

  grupoGanador = null;
  grupoPerdedor = null;
  $("#modal-combate").modal("hide");

  updateDisplayGrupos();
  updateOpcionesSelect();
  limpiarSelects();
  saveData();
}

function copiarTexto(){
  var textarea = document.getElementById("output-datos-guardado");

  textarea.select();
  textarea.setSelectionRange(0,99999);

  navigator.clipboard.writeText(textarea.value);
  alert("Texto copiado:" + textarea.value);
}

// $(window).on('beforeunload', function(){
//   saveData();
// });
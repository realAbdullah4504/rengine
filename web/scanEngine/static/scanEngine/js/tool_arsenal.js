function get_external_tool_latest_version(tool_id, tool_name){
  var current_version = document.getElementById(tool_name+'_current').textContent;
  console.log(current_version)
  if (current_version === 'Comando de búsqueda de versión inválido.' || current_version === 'Comando de búsqueda de versión no proporcionado.'){
    Swal.fire({
      title: '¡No se puede obtener la última versión!',
      text: `Debido a que el comando de búsqueda de versión es inválido, reNgine no puede detectar si hay una versión más nueva. Pero aún puede forzar la descarga de la última versión.`,
      icon: 'info',
      confirmButtonText: 'Actualizar ' +  htmlEncode(tool_name)
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Descargando última versión...',
          text: 'Esto puede tomar unos minutos.',
          allowOutsideClick: false
        });
        swal.showLoading();
        fetch('/api/tool/update/?tool_id=' + tool_id)
        .then(response => response.json())
        .then(function (response) {
          swal.close();
          if (response['status']) {
            Swal.fire({
              title: htmlEncode(tool_name) + ' ¡Actualizado!',
              text: response['message'],
              icon: 'success',
            });
          }
          else{
            Swal.fire({
              title: htmlEncode(tool_name) + ' ¡no se pudo actualizar!',
              text: response['message'],
              icon: 'fail',
            });
          }
        });
      }
    });
  }
  else{
    Swal.fire({
      title: 'Buscando última versión...',
      allowOutsideClick: false
    });
    swal.showLoading();
    fetch('/api/github/tool/get_latest_releases/?tool_id=' + tool_id)
    .then(response => response.json())
    .then(function (response) {
      swal.close();
      if (response['message'] == 'RateLimited') {
        Swal.fire({
          showCancelButton: true,
          title: '¡Error!',
          text: 'Límite de tasa de API de Github excedido, no podemos obtener el número de la última versión, por favor intente de nuevo en una hora. Pero puede forzar la descarga de la última versión.',
          icon: 'error',
          confirmButtonText: 'Forzar descarga',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Descargando última versión...',
              text: 'Esto puede tomar unos minutos.',
              allowOutsideClick: false
            });
            swal.showLoading();
            fetch('/api/tool/update/?tool_id=' + tool_id)
            .then(response => response.json())
            .then(function (response) {
              swal.close();
              if (response['status']) {
                Swal.fire({
                  title: htmlEncode(tool_name) + ' ¡Actualizado!',
                  text: response['message'],
                  icon: 'success',
                });
              }
              else{
                Swal.fire({
                  title: htmlEncode(tool_name) + ' ¡no se pudo actualizar!',
                  text: response['message'],
                  icon: 'fail',
                });
              }
            });
          }
        });
      }
      else if (response['message'] == 'Tool Not found'){
        Swal.fire({
          title: '¡Ups!',
          text: '¡Encontramos un error! Por favor, cree una solicitud en github.',
          icon: 'error'
        });
      }
      else if (response['message'] == 'Not Found'){
        Swal.fire({
          showCancelButton: true,
          title: '¡Ups!',
          text: 'La URL de github proporcionada no es válida o el proyecto no admite versiones. No podemos verificar el número de la última versión, sin embargo, aún puede forzar la descarga de la actualización',
          icon: 'error',
          confirmButtonText: 'Forzar descarga',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Descargando última versión...',
              text: 'Esto puede tomar unos minutos.',
              allowOutsideClick: false
            });
            swal.showLoading();
            fetch('/api/tool/update/?tool_id=' + tool_id)
            .then(response => response.json())
            .then(function (response) {
              swal.close();
              if (response['status']) {
                Swal.fire({
                  title: htmlEncode(tool_name) + ' ¡Actualizado!',
                  text: response['message'],
                  icon: 'success',
                });
              }
              else{
                Swal.fire({
                  title: htmlEncode(tool_name) + ' ¡no se pudo actualizar!',
                  text: response['message'],
                  icon: 'fail',
                });
              }
            });
          }
        });
      }
      else{
        var latest_version = response['name'];
        latest_version = latest_version.charAt(0) == 'v' ? latest_version.substring(1) : latest_version;

        if (current_version === 'Comando de búsqueda de versión inválido.' || current_version === 'Comando de búsqueda de versión no proporcionado.'){
          Swal.fire({
            title: '¡No se puede obtener la última versión!',
            text: `Debido a que el comando de búsqueda de versión es inválido, reNgine no puede detectar si hay una versión más nueva. Pero aún puede forzar la descarga de la última versión. La última versión es ${latest_version}.`,
            icon: 'info',
            confirmButtonText: 'Actualizar ' +  htmlEncode(tool_name)
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Descargando última versión...',
                text: 'Esto puede tomar unos minutos.',
                allowOutsideClick: false
              });
              swal.showLoading();
              fetch('/api/tool/update/?tool_id=' + tool_id)
              .then(response => response.json())
              .then(function (response) {
                swal.close();
                Swal.fire({
                  title: htmlEncode(tool_name) + ' ¡Actualizado!',
                  text: `${tool_name} ha sido actualizado a v${latest_version}!`,
                  icon: 'success',
                });
              });
            }
          });
        }
        else{
          current_version = current_version.charAt(0) == 'v' ? current_version.substring(1) : current_version;
          if (current_version == latest_version) {
            Swal.fire({
              title: 'No hay actualización disponible',
              text: 'Parece que la última versión de ' + htmlEncode(tool_name) + ' ya está instalada.',
              icon: 'info'
            });
          }
          else{
            Swal.fire({
              title: '¡Actualización disponible! Versión: ' + latest_version,
              text: `Su versión actual de ${htmlEncode(tool_name)} es v${current_version}, pero la última versión v${latest_version} está disponible, ¡por favor actualice!`,
              icon: 'info',
              confirmButtonText: 'Actualizar ' + htmlEncode(tool_name)
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: 'Descargando última versión...',
                  text: 'Esto puede tomar unos minutos.',
                  allowOutsideClick: false
                });
                swal.showLoading();
                fetch('/api/tool/update/?tool_id=' + tool_id)
                .then(response => response.json())
                .then(function (response) {
                  swal.close();
                  Swal.fire({
                    title: htmlEncode(tool_name) + ' ¡Actualizado!',
                    text: `${htmlEncode(tool_name)} ha sido actualizado a v${latest_version}!`,
                    icon: 'success',
                  });
                });
              }
            });
          }
        }
      }
    });
  }
}

function get_external_tool_current_version(tool_id, id){
  fetch('/api/external/tool/get_current_release/?tool_id=' + tool_id)
  .then(response => response.json())
  .then(function (response){
    if (response['status']){
      version_number = response['version_number'].charAt(0) == 'v' || response['version_number'].charAt(0) == 'V' ? response['version_number'] : 'v' + response['version_number'];
      document.getElementById(id).innerHTML = '<span class="badge badge-soft-primary">' + version_number + '</span>';
    }
    else{
      document.getElementById(id).innerHTML = '<span class="badge badge-soft-danger">' + response['message'] + '</span>';
    }
  });
}

function uninstall_tool(tool_id, tool_name){
  Swal.fire({
    title: '¿Está seguro de que desea desinstalar ' + htmlEncode(tool_name),
    text: `Esto no es reversible. Por favor, proceda con precaución.`,
    icon: 'warning',
    confirmButtonText: 'Desinstalar ' + htmlEncode(tool_name)
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Desinstalando ' + htmlEncode(tool_name),
        text: 'Esto puede tomar unos minutos...',
        allowOutsideClick: false
      });
      swal.showLoading();
      fetch('/api/tool/uninstall/?tool_id=' + tool_id)
      .then(response => response.json())
      .then(function (response) {
        console.log(response);
        swal.close();
        $("#tool_card_" + tool_name).remove();
        Swal.fire({
          title: htmlEncode(tool_name) + ' ¡Desinstalado!',
          text: `${tool_name} ha sido desinstalado.`,
          icon: 'success',
        });
      });
    }
  });
}

$('#btn_show_custom_tools').on('click', function () {
  $('.custom_tool').show();
  $('.default_tool').hide();
  Snackbar.show({
    text: 'Herramientas personalizadas filtradas',
    pos: 'top-right',
    duration: 2500
  });
  $('#btn_show_custom_tools').addClass('btn-primary').removeClass('btn-light');
  $('#btn_show_all_tools').addClass('btn-light');
  $('#btn_show_default_tools').addClass('btn-light');
});

$('#btn_show_default_tools').on('click', function () {
  $('.custom_tool').hide();
  $('.default_tool').show();
  Snackbar.show({
    text: 'Herramientas predeterminadas filtradas',
    pos: 'top-right',
    duration: 2500
  });
  $('#btn_show_default_tools').addClass('btn-primary').removeClass('btn-light');
  $('#btn_show_custom_tools').addClass('btn-light');
  $('#btn_show_all_tools').addClass('btn-light');
});

$('#btn_show_all_tools').on('click', function () {
  $('.custom_tool').show();
  $('.default_tool').show();
  Snackbar.show({
    text: 'Mostrando todas las herramientas',
    pos: 'top-right',
    duration: 2500
  });
  $('#btn_show_all_tools').addClass('btn-primary').removeClass('btn-light');
  $('#btn_show_custom_tools').addClass('btn-light');
  $('#btn_show_default_tools').addClass('btn-light');
});

function delete_target(id, domain_name) {
  const delAPI = "../../delete/target/" + id;
  swal.queue([{
    title: '¿Estás segura de que quieres eliminar? '+ domain_name +'?',
    text: "¡No podrás revertir esto!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    padding: '2em',
    showLoaderOnConfirm: true,
    preConfirm: function() {
      return fetch(delAPI, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
          "X-CSRFToken": getCookie("csrftoken")
        }
      })
      .then(function (response) {
        return response.json();
      })
      .then(function(data) {
        // TODO Look for better way
        return location.reload();
      })
      .catch(function() {
        swal.insertQueueStep({
          type: 'error',
          title: '¡Ups!¡Incapaz de eliminar el objetivo!'
        })
      })
    }
  }])
}

function checkedCount () {
  // this function will count the number of boxes checked
  item = document.getElementsByClassName("targets_checkbox");
  count = 0;
  for (var i = 0; i < item.length; i++) {
    if (item[i].checked) {
      count++;
    }
  }
  return count;
}

function scanMultipleTargets(slug) {
  if (!checkedCount()) {
    swal({
      title: '',
      text: "¡Ups!¡No se han seleccionado objetivos!",
      type: 'error',
      padding: '2em'
    })
  }
  else {
    // atleast one target is selected
    multipleScanForm = document.getElementById("multiple_targets_form");
    multipleScanForm.action = `/scan/${slug}/start/multiple/`;
    multipleScanForm.submit();
  }
}

function deleteMultipleTargets(slug) {
  if (!checkedCount()) {
    Swal.fire({
      title: '',
      text: "¡Ups!¡No se han seleccionado objetivos!",
      icon: 'error',
      padding: '2em'
    });
  } else {
    // At least one target is selected
    Swal.fire({
      title: '¿Estás segura de que quieres eliminar?' + checkedCount() + ' objetivos?',
      text: "Esta acción es irreversible.\nEsto también eliminará todo el historial de exploración y las vulnerabilidades relacionadas con los objetivos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      padding: '2em',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          Swal.update({
            title: '',
            text: 'Eliminación ' + checkedCount() + ' Objetivos ..., esto puede llevar un tiempo.',
            icon: 'warning',
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
          
          setTimeout(() => {
            const deleteForm = document.getElementById("multiple_targets_form");
            deleteForm.action = `/target/${slug}/delete/multiple`;
            deleteForm.submit();
          }, 500);  // 500ms delay
        });
      }
    });
  }
}




function toggleMultipleTargetButton() {
  if (checkedCount() > 0) {
    $("#scan_multiple_button").removeClass("disabled");
    $("#delete_multiple_button").removeClass("disabled");
  }
  else
  {
    $("#scan_multiple_button").addClass("disabled");
    $("#delete_multiple_button").addClass("disabled");
  }
}

function mainCheckBoxSelected() {
  var input = document.querySelector('#head_checkbox');
  if (input.checked) {
    $("#scan_multiple_button").removeClass("disabled");
    $("#delete_multiple_button").removeClass("disabled");
    $(".targets_checkbox").prop('checked', true);
  }
  else
  {
    $("#scan_multiple_button").addClass("disabled");
    $("#delete_multiple_button").addClass("disabled");
    $(".targets_checkbox").prop('checked', false);
  }
}

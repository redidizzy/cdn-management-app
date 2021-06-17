$(function () {
  $('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name
    $(".custom-file-label").html(fileName)
  })

  $("#upload-resource").on("submit", function (e) {
    e.preventDefault()
    var file_data = $("#file-to-upload").prop("files")[0]
    var form_data = new FormData()
    form_data.append("resource", file_data)
    form_data.append("resource_name", $("#filename").val())
    $.ajax({
      url: "/resource/upload", // <-- point to server-side PHP script
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      type: "post",
      success: function (response) {
        console.log(response) // <-- display response from the PHP script, if any
      },
      error: function (xhr) {
        var statusCode = xhr.status
        if (statusCode == 403 || statusCode == 401) {
          window.location.replace("/login")
        }
      },
    })
  })
  $("#login").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      url: "/authenticate", // <-- point to server-side PHP script
      data: {
        userName: $("#userName").val(),
        password: $("#password").val(),
      },
      type: "post",
      success: function (response) {
        localStorage.setItem("jwt", response.token)
        window.location.replace("/resources_upload")
      },
      error: function (xhr) {
        var statusCode = xhr.status
        // TODO: deal with error messages
      },
    })
  })
})

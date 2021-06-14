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
      type: "post",
      success: function (response) {
        console.log(response) // <-- display response from the PHP script, if any
      },
    })
  })
})

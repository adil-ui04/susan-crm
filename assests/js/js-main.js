$(document).ready(function () {
  $(".unitab").on("click", function () {
    $(".unitab").removeClass("active");
    $(".unitab-content").removeClass("active");

    $(this).addClass("active");
    $("#" + $(this).data("tab")).addClass("active");
  });
});

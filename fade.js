function loadPage(page) {
  // Remove any previously added page-specific CSS
  $("link[data-page-css]").remove();

  $.ajax({
    url: page,
    method: "GET",
    success: function (response) {
      const tempDiv = $("<div>").html(response);

      // Extract and load CSS
      const cssLinks = tempDiv.find("link[rel='stylesheet']");
      let cssLoaded = 0;

      cssLinks.each(function () {
        const href = $(this).attr("href");
        $("<link>", {
          rel: "stylesheet",
          href: href,
          "data-page-css": true,
        })
          .appendTo("head")
          .on("load", function () {
            cssLoaded++;
            if (cssLoaded === cssLinks.length) {
              insertContentAndInit(tempDiv);
            }
          });
      });

      // If no CSS found, just load the page
      if (cssLinks.length === 0) {
        insertContentAndInit(tempDiv);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error loading page:", error);
      $("#content-container").html(
        "<p>Error loading page. Please try again.</p>"
      );
    },
  });

  function insertContentAndInit(tempDiv) {
    // Remove link tags from HTML content
    tempDiv.find("link[rel='stylesheet']").remove();

    $("#content-container").html(tempDiv.html());
    setTimeout(() => {
      initializeDataTables();
      initializeDynamicElements();
    }); // slight delay ensures everything is visible in DOM
  }
}
// without fade end

// with fade start
function loadPage(page) {
  $("#content-container").fadeOut(100, function () {
    // Remove any previously added page-specific CSS
    $("link[data-page-css]").remove();

    $.ajax({
      url: page,
      method: "GET",
      success: function (response) {
        const tempDiv = $("<div>").html(response);

        // Extract and load CSS
        const cssLinks = tempDiv.find("link[rel='stylesheet']");
        let cssLoaded = 0;

        cssLinks.each(function () {
          const href = $(this).attr("href");
          $("<link>", {
            rel: "stylesheet",
            href: href,
            "data-page-css": true,
          })
            .appendTo("head")
            .on("load", function () {
              cssLoaded++;
              if (cssLoaded === cssLinks.length) {
                insertContentAndInit(tempDiv);
              }
            });
        });

        // If no CSS found, just load the page
        if (cssLinks.length === 0) {
          insertContentAndInit(tempDiv);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error loading page:", error);
        $("#content-container")
          .html("<p>Error loading page. Please try again.</p>")
          .fadeIn(100);
      },
    });

    function insertContentAndInit(tempDiv) {
      // Remove link tags from HTML content
      tempDiv.find("link[rel='stylesheet']").remove();

      $("#content-container")
        .html(tempDiv.html())
        .fadeIn(100, function () {
          setTimeout(() => {
            initializeDataTables();
            initializeDynamicElements();
          }); // slight delay ensures everything is visible in DOM
        });
    }
  });
}

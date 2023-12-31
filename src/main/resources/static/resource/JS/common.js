$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});

$(document).ready(function(){
    let longPressTimer;

    document.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Prevent the default right-click behavior
    });

    function startLongPress() {
        longPressTimer = setTimeout(function () {
            //alert('Long press detected!');
        }, 1000); // Adjust the duration for your long press threshold
    }

    function endLongPress() {
        clearTimeout(longPressTimer);
    }

    document.addEventListener('touchstart', startLongPress);
    document.addEventListener('touchend', endLongPress);

    // For mouse users (optional)
    document.addEventListener('mousedown', startLongPress);
    document.addEventListener('mouseup', endLongPress);
});
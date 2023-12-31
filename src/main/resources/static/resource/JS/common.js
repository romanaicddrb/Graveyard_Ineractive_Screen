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

jQuery(document).ready(function(){
    jQuery("#visit").load("VisitModal.html");
});

// Get the modal
var modal = document.getElementById("visit");

// Get the button that opens the modal
var btn = document.getElementById("visit_modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function(){
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
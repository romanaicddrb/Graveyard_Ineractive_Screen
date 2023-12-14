$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
    swal({
        title:"Please wait! Data is loading...",
        text:"   ",
        icon: "https://www.boasnotas.com/img/loading2.gif",
        buttons: false,
        closeOnClickOutside: false,
        timer: 2500,
        //icon: "success"
    });
});



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
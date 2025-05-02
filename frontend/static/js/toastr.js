    
function loadToastr() {
    
    if (typeof toastr === 'undefined') {
        console.error('Toastr no está cargado correctamente');
        return;
    }

    toastr.options = {
        // closeButton: true,
        debug: false,
        newestOnTop: false,
        // progressBar: true,
        positionClass: "toast-top-center",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",

    };

}
    

export { loadToastr };
function encode(o) {
    return encodeURIComponent(window.btoa(encodeURIComponent(JSON.stringify(o))));
}

function decode(s) {
    return JSON.parse(decodeURIComponent(window.atob(decodeURIComponent(s))));
}

function show() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('d')) {
        // show display
        document.getElementById("display").style.display = "flex";
        document.getElementById("create").style.display = "none";

        console.log(decode(params.get('d')));

    } else {
        document.getElementById("display").style.display = "none";
        document.getElementById("create").style.display = "flex";

    }
}

function encode(o) {
    return encodeURIComponent(window.btoa(encodeURIComponent(JSON.stringify(o))));
}

function decode(s) {
    return JSON.parse(decodeURIComponent(window.atob(decodeURIComponent(s))));
}

function show() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('i')) {
        // show display
        document.getElementById("display").style.display = "flex";
        document.getElementById("create").style.display = "none";

        // set name and pass date
        var value = decode(params.get('i'));
        document.getElementById("dsp-name").textContent = value.n;

        display(new Date(value.d));
        setInterval(() => display(new Date(value.d)), 100);

    } else {
        // show creation ui
        document.getElementById("display").style.display = "none";
        document.getElementById("create").style.display = "flex";
    }
}

function create() {
    const dateInput = document.getElementById("inp-date");
    const timeInput = document.getElementById("inp-time");
    const nameInput = document.getElementById("inp-name");

    var cDate = dateInput.valueAsDate;
    var cTime = timeInput.valueAsDate;

    if (cDate == null) {
        cDate = new Date();
        cDate.setTime(cDate.getTime() - cDate.getTimezoneOffset() * 60 * 1000);
    }

    if (cTime != null) {
        cDate.setUTCHours(cTime.getUTCHours());
        cDate.setUTCMinutes(cTime.getUTCMinutes());
        cDate.setUTCSeconds(cTime.getUTCSeconds());
    }

    cDate.setUTCMilliseconds(0);
    cDate.setTime(cDate.getTime() + cDate.getTimezoneOffset() * 60 * 1000);

    console.log(cDate);

    var cName = nameInput.value;
    console.log(cName);

    var baseURL = window.location.origin + window.location.pathname;
    var newParams = new URLSearchParams({
        i: encode({
            d: cDate,
            n: cName
        })
    });
    window.location.href = baseURL + "?" + newParams.toString();
}

function display(d) {
    var now = new Date();
    var rem;
    if (d.getTime() >= now.getTime()) {
        rem = d - now;
        document.getElementById("preface").textContent = "-";
    } else {
        rem = now - d;
        document.getElementById("preface").textContent = "+";
    }
    rem = Math.floor(rem / 1000);

    var seconds = rem % 60; rem -= seconds; rem /= 60;
    var minutes = rem % 60; rem -= minutes; rem /= 60;
    var hours = rem % 24; rem -= hours; rem /= 24;
    var days = rem;

    document.getElementById("clock-days").textContent = days;
    document.getElementById("clock-hours").textContent = hours;
    document.getElementById("clock-minutes").textContent = minutes;
    document.getElementById("clock-seconds").textContent = seconds;
}

function copy() {
    navigator.clipboard.writeText(window.location.href);
    document.getElementById("share").disabled = true;
    document.getElementById("share").textContent = "Copied";
    setTimeout(() => {
        document.getElementById("share").disabled = false;
        document.getElementById("share").textContent = "Share";
    }, 3000);
}

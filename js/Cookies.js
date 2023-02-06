function setCookie(o, e, t) {
    const n = new Date;
    n.setTime(n.getTime() + 24 * t * 60 * 60 * 1e3);
    let i = "expires=" + n.toUTCString();
    return document.cookie = o + "=" + e + ";" + i + ";SameSite=None; Secure; path=/", !0
}

function getCookie(o) {
    let e = o + "=",
        t = document.cookie.split(";");
    for (let o = 0; o < t.length; o++) {
        let n = t[o];
        for (;
            " " == n.charAt(0);) n = n.substring(1);
        if (0 == n.indexOf(e)) return n.substring(e.length, n.length)
    }
    return ""
}
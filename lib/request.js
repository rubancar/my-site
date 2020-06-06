
export function postAjax(url, data, cb) {
    const params = typeof data === 'string' ? data : Object.keys(data).map(
        function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
    xhr.open('POST', url)
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status===200) { cb(null, xhr.responseText) }
        else cb("Try again later", null)
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
    return xhr
}
(function() {
  var blur_siguri_frame, getCookie, hidePage, setCookie, unhide_if_keyspressed;
  setCookie = function(c_name, value, exdays) {
    var c_value, exdate;
    exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    c_value = escape(value) + (!(exdays != null) ? "" : "; expires=" + exdate.toUTCString());
    return document.cookie = c_name + "=" + c_value;
  };
  getCookie = function(c_name) {
    var ARRcookies, i, x, y, _results;
    i = void 0;
    x = void 0;
    y = void 0;
    ARRcookies = document.cookie.split(";");
    i = 0;
    _results = [];
    while (i < ARRcookies.length) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      x = x.replace(/^\s+|\s+$/g, "");
      if (x === c_name) {
        return unescape(y);
      }
      _results.push(i++);
    }
    return _results;
  };
  hidePage = function(url, title) {
    $("head").append("<style type='text/css'> html, body { overflow: hidden; margin: auto; height: 100%; width: 100%; } </style>");
    $("body").html("<iframe src='" + url + "' width='100%' height='100%' frameborder='0'></iframe>");
    return document.title = title;
  };
  blur_siguri_frame = function() {
    return window.focus();
  };
  unhide_if_keyspressed = function(evt) {
    var siguri_cookie;
    if (!evt) {
      evt = event;
    }
    if (evt.keyCode === 55) {
      siguri_cookie = getCookie("SIGURI_COOKIE");
      if (siguri_cookie && siguri_cookie === "SIGURI_HIDE") {
        setCookie("SIGURI_COOKIE", "SIGURI_UNHIDE", 9999);
      }
      alert("made it.");
      return location.reload();
    }
  };
  this.siguri = function(url, title) {
    var onblur, siguri_cookie;
    onblur = setInterval(blur_siguri_frame, 5000);
    window.onkeyup = unhide_if_keyspressed;
    $(".siguri-hide").click(function() {
      hidePage(url, title);
      return setCookie("SIGURI_COOKIE", "SIGURI_HIDE", 9999);
    });
    siguri_cookie = getCookie("SIGURI_COOKIE");
    if (siguri_cookie && siguri_cookie === "SIGURI_HIDE") {
      return hidePage(url, title);
    }
  };
}).call(this);

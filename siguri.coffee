setCookie = (c_name, value, exdays) ->
  exdate = new Date()
  exdate.setDate exdate.getDate() + exdays
  c_value = escape(value) + (if (not (exdays?)) then "" else "; expires=" + exdate.toUTCString())
  document.cookie = c_name + "=" + c_value

getCookie = (c_name) ->
  i = undefined
  x = undefined
  y = undefined
  ARRcookies = document.cookie.split(";")
  i = 0
  while i < ARRcookies.length
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="))
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1)
    x = x.replace(/^\s+|\s+$/g, "")
    return unescape(y)  if x is c_name
    i++

hidePage = (url, title) ->
  $("head").append("<style type='text/css'> html, body { overflow: hidden; margin: auto; height: 100%; width: 100%; } </style>")
  $("body").html("<iframe src='#{url}' width='100%' height='100%' frameborder='0'></iframe>")
  document.title = title

blur_siguri_frame = ->
  window.focus()         


unhide_if_keyspressed = (evt) ->
  evt = event  unless evt
  if evt.keyCode is 55
    siguri_cookie = getCookie("SIGURI_COOKIE")
    if siguri_cookie and siguri_cookie == "SIGURI_HIDE"
      setCookie("SIGURI_COOKIE","SIGURI_UNHIDE",9999)
    alert("made it.")
    location.reload()

@siguri = (url, title) ->
  onblur = setInterval(blur_siguri_frame, 5000);
  window.onkeyup = unhide_if_keyspressed 

  $(".siguri-hide").click ->
    hidePage(url,title)
    setCookie("SIGURI_COOKIE","SIGURI_HIDE", 9999)
  siguri_cookie = getCookie("SIGURI_COOKIE")
  if siguri_cookie and siguri_cookie == "SIGURI_HIDE"
    hidePage(url,title)


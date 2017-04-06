window.open("https://accounts.spotify.com/api/token?grant_type=authorization_code&code="+code+"&redirect_uri=myurl&client_id=3137b152f1424defa2c6020ae5c6d444&client_secret=mysecret");

$.ajax(
  {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data: {
      "grant_type":    "authorization_code",
      "code":          code,
      "redirect_uri":  myurl,
      "client_secret": mysecret,
      "client_id":     myid,
    },
    success: function(result) {
      // handle result...
    },
  }
);

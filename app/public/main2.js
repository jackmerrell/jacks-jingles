$(document).ready(function() {
    (function() {

      /**
       * Obtains parameters from the hash of the URL
       * @return Object
       */
      function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);

        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;

      }

      var playlistSource = document.getElementById('playlist-template').innerHTML,
          playlistTemplate = Handlebars.compile(playlistSource),
          playlistPlaceholder = document.getElementById('playlist');

      var playlistTracksSource = document.getElementById('playlist-tracks-template').innerHTML,
          playlistTracksTemplate = Handlebars.compile(playlistTracksSource),
          playlistTracksPlaceholder = document.getElementById('playlist-tracks');

      var params = getHashParams();

      var access_token = params.access_token,
          refresh_token = params.refresh_token,
          error = params.error;


        if (access_token) {

          $.ajax({
              url: 'https://api.spotify.com/v1/users/jackmerrell/playlists/26RnWNFeWjlKMN1xCg9Qdu',
              headers: {
                'Authorization': 'Bearer ' + access_token
              },
              success: function(response) {

                var jacksJingles = response;

                console.log(jacksJingles);

                playlistPlaceholder.innerHTML = playlistTemplate(jacksJingles);
                playlistTracksPlaceholder.innerHTML = playlistTracksTemplate(jacksJingles.tracks.items);


                // List pagination
                var playlist = new List('test-list', {
                    valueNames: ['name'],
                    page: 8,
                    pagination: true            
                });


                // Only play one audio stream at a time
                $("audio").on("play", function() {
                  $("audio").not(this).each(function(index, audio) {
                     audio.pause();
                  });
               });


                $('#login').hide();
                $('#loggedin').show();
                // console.log(access_token);
              }
          });
        } else {
            // render initial screen
            $('#login').show();
            $('#loggedin').hide();
        }

    })();


});

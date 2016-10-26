// GLOBAL VARIABLES //
var musicmix = {};

// FUNCTIONS //
musicmix.getLyrics = function() {
	$.ajax({
        type: 'GET',
        url: 'http://api.musixmatch.com/ws/1.1/track.search',
        data: {
            apikey: 'd1f1cb04d0c210368a40509a8dc77f76',
            q_lyrics: 'girl love yeah',
            format: 'jsonp',
        },
        dataType: 'jsonp'    
    }).then(function(info) {
        console.log(info.message.body);
        var heroLyrics = (info.message.body.track_list[0].track.lyrics_id);
        var trackID = (info.message.body.track_list[0].track.lyrics_id);
        console.log(heroLyrics);
    });
}

//.track.lyrics.get is second endpoint that receives track id

// EVENTS //
musicmix.events = function() {

};

musicmix.init = function() {
	// Call Functions
    musicmix.getLyrics();
	musicmix.events();
};

// DOCUMENT READY //
$(function() {
	musicmix.init();
});
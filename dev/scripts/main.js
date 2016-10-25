// GLOBAL VARIABLES //
var musicmix = {};

// FUNCTIONS //
musicmix.getLyrics = function() {
	$.ajax({
        type: 'GET',
        url: 'http://api.musixmatch.com/ws/1.1/track.search',
        data: {
            apikey: 'd1f1cb04d0c210368a40509a8dc77f76',
            q_track: 'Shot For Me',
            format: 'jsonp',
        },
        dataType: 'jsonp'    
    }).then(function(info) {
        console.log(info);
    });
}

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
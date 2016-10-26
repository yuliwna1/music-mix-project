// GLOBAL VARIABLES //
var musicmix = {};

// FUNCTIONS //
musicmix.getLyrics = function(query) {
    $.ajax({
        type: 'GET',
        url: 'http://api.musixmatch.com/ws/1.1/track.search',
        data: {
            apikey: 'd1f1cb04d0c210368a40509a8dc77f76',
            q_lyrics: query,
            format: 'jsonp',
            s_track_rating: 'desc',
        },
        dataType: 'jsonp'    
    }).then(function(info) {
        console.log(info.message.body);
        var heroLyrics = (info.message.body.track_list[0].track.lyrics_id);
        musicmix.trackID = (info.message.body.track_list[0].track.track_id);
        console.log(heroLyrics);
    }).then(function(){
        $.ajax({
            type: 'GET',
            url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
            data: {
                apikey: 'd1f1cb04d0c210368a40509a8dc77f76',
                format: 'jsonp',
                track_id: musicmix.trackID,
            },
            dataType: 'jsonp'
        }).then(function(lyrics) {
            console.log(lyrics.message.body.lyrics.lyrics_body);
            musicmix.fullLyrics = (lyrics.message.body.lyrics.lyrics_body)
        })
    });
}

musicmix.getUnsplash = function() {
    $.ajax({
        type: 'GET',
        url: 'https://api.unsplash.com/',
        data: {
            application: '858be94a69a906a1985e280e87575efd3a24899d62f8235cf1d7de7a7d855287',
            format: 'json'
        },
        dataType: 'json',
    }).then(function(img){
        console.log('hi');
    })
};

//.track.lyrics.get is second endpoint that receives track id

/* We need to make some sort of slider or something. Otherwise we won't
be able to show a large number of results in the draggable pane. We could
potentially research Flickity or another slider plugin, but we need to
make considerations for this BEFORE we begin populating the draggable 
pane DO NOT TRY AND POPULATE THE DRAGGABLE PANE WITHOUT DOING
THIS FIRST, IT WILL BE GAME OVER FOR YOU, I PROMISE. :) */

/* makeDraggable(): a function that initialize the draggable & droppable 
jqueryUI functionality and applies them to elements with a corresponding 
class. To be called in the init function. */

// DISPLAY EMOJI... TO BE TRIGGERED ON MOUSE CLICK LATER!
musicmix.showLyrics = function () {
    
};

musicmix.showEmoji = function() {
    for (var i = 127744; i <= 128591; i++) {
        // Create a Container for the Emoji
        var $emojiContainer = $('<div>');
        $emojiContainer.addClass('grid-cell emoji-container');
    
        // Create The Emoji
        var $emoji = $('<article>');
        $emoji.addClass('emoji');
        $emoji.html('&#' + i + ';');

        $($emojiContainer).append($emoji);
        $('html').append($emojiContainer);

        console.log('&#' + i + ';')
    }
};

// *code to be used to make items draggable. May need to adjust class name of draggable item. 
// **Need to add containment class (area within which user will be allowed to drag item)

// musicmix.makeDraggable = function() {
//     $('i').draggable({revert:true, containment: })

// }

// musicmix.makeDroppable = function() {
//     $('.card-builder').droppable({
//         drop: function(event, ui) {
//         }
//      })
// }

// EVENTS //
musicmix.events = function() {
    /* On form submit: Function that checks the values entered into three 
    text fields by the user, passes this values as arguments to the 
    getLyrics function: musicmix.getLyrics(word1, word2, word3) */



    // musicmix.lyricSearch = function(lyrics) {
        $('form').on('submit', function(e) {
            e.preventDefault();
            var lyricSearch1 = $('#firstWord[type=search]').val();
            var lyricSearch2 = $('#secondWord[type=search]').val();
            var lyricSearch3 = $('#thirdWord[type=search]').val();
            var lyricString = lyricSearch1.concat(" " + lyricSearch2 + " " + lyricSearch3);
            console.log(lyricString);
        });
    // }

    /* On click of the lyrics tab: Take the output from the getLyrics
    function. Clear the draggable pane. Populate the draggable pane with html elements containing the song 
    lyrics */ 

    /* On click of the emojis tab: Clear the draggable pane. Populate
    the draggable pane with html elements containing each of the emoji
    using the alt-codes found at:
    http://character-code.com/emoticons-html-codes.php */

    /* On click of the background tab: Take the output from a call to
    Unsplash.it. Clear the draggable pane. Populate the draggable
    pane with html elements containing photos */
};

musicmix.init = function() {
	// Call Functions
    musicmix.getLyrics();
	musicmix.events();
    // musicmix.makeDraggable ();
    // musicmix.makeDroppable();
};

// DOCUMENT READY //
$(function() {
	musicmix.init();
});
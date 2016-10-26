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

/* We need to make some sort of slider or something. Otherwise we won't
be able to show a large number of results in the draggable pane. We could
potentially research Flickity or another slider plugin, but we need to
make considerations for this BEFORE we begin populating the draggable 
pane DO NOT TRY AND POPULATE THE DRAGGABLE PANE WITHOUT DOING
THIS FIRST, IT WILL BE GAME OVER FOR YOU, I PROMISE. :) */

/* makeDraggable(): a function that initialize the draggable & droppable 
jqueryUI functionality and applies them to elements with a corresponding 
class. To be called in the init function. */

musicmix.showEmoji = function() {
    for (var i = 127744; i <= 128591; i++) {
        // Emoji Index
        emojiIndex = i.toString();

        // Create a container for the emoji
        var $emojiContainer = $('<div>');
        $emojiContainer.addClass('grid-cell emoji-container');
    
        // Create The Emoji
        var $emoji = $('<i>');
        $emoji.addClass('emoji');
        $emoji.text('&#' + emojiIndex + ';');

        $($emojiContainer).append($emoji);
        $('html').append($emojiContainer);

        console.log('&#' + emojiIndex + ';')
    }
};

// EVENTS //
musicmix.events = function() {
    /* On form submit: Function that checks the values entered into three 
    text fields by the user, passes this values as arguments to the 
    getLyrics function: musicmix.getLyrics(word1, word2, word3) */

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
};

// DOCUMENT READY //
$(function() {
	musicmix.init();
});
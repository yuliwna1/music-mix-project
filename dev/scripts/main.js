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
        // Track ID
        var heroLyrics = (info.message.body.track_list[0].track.lyrics_id);
        musicmix.trackID = (info.message.body.track_list[0].track.track_id);
        // console.log(heroLyrics);
    }).then(function() {
        // Lryics based on Track ID
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
            musicmix.showLyrics(lyrics.message.body.lyrics.lyrics_body);
            // musicmix.showLyrics(musicmix.fullLyrics);
        })
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


// DISPLAY LYRICS... TO BE TRIGGERED ON MOUSE CLICK LATER!
musicmix.showLyrics = function(results) {
    console.log(results);
    $('.title-first').text(results);
};

// DISPLAY EMOJI... TO BE TRIGGERED ON MOUSE CLICK LATER!
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

        $('.tool-picker-first').append($emojiContainer);
        $('tool-picker-first').append($emojiContainer);

    }
};

//Creating unsplash function (random links from unsplash).

musicmix.showBackgrounds = function() { 
    //Make an empty array
    var urlGallery = [];

    console.log("testing");

    for (var i = 0; i < 8; i++) {
        var urlRandom = "https://unsplash.it/300/300?"+(Math.floor(Math.random()*100));
         //Everytime when I loop, I get a random image and I push it into the empty array
        urlGallery.push(`https://source.unsplash.com/random/300x300?sig=${urlRandom}`);
    }

    // map through array and turn into 8 DOM elements
    var images = urlGallery.map(function(urlName) {
        return $(`<img src="${urlName}"/>`);
    });
    console.log(images); 
    console.log("url", urlGallery);  
    return images;

    //I should put these images in the container in order to be able to click on it


    //Change background of div card-builder



};

// *code to be used to make items draggable. May need to adjust class name of draggable item. 
// **Need to add containment class (area within which user will be allowed to drag item)

// musicmix.makeDraggable = function() {
//     $('.emoji').draggable({revert:true})

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

    $('form').on('submit', function(e) {
        e.preventDefault();
        var lyricSearch1 = $('#firstWord[type=search]').val();
        var lyricSearch2 = $('#secondWord[type=search]').val();
        var lyricSearch3 = $('#thirdWord[type=search]').val();
        var lyricString = lyricSearch1.concat(" " + lyricSearch2 + " " + lyricSearch3);
        
        musicmix.getLyrics(lyricString);
    });

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

    //get random image from unsplash
    musicmix.randomIndex = function(){
        var randomNumber = Math.round(Math.random() * 1018);
        console.log(randomNumber);
    };

    // This function is responsible for clicking on nav and brings tool picker

    $('#click-first-button').on('click', function(e) {
        e.preventDefault();
        $('.title-first, .title-second, .title-third, .tool-picker-first, .tool-picker-second, .tool-picker-third').empty();
        $('.title-first').append('<h2>First Button Header</h2>');
        musicmix.showEmoji();           
    });

    $('#click-second-button').on('click', function(e) {
        e.preventDefault();
        $('.title-first, .title-second, .title-third, .tool-picker-first, .tool-picker-second, .tool-picker-third').empty();
        $('.title-second').append('<h2>Second Button Header</h2>');

    })

    $('#click-third-button').on('click', function(e) {
        e.preventDefault();
        $('.title-first, .title-second, .title-third, .tool-picker-first, .tool-picker-second, .tool-picker-third').empty();

        $('.title-third').append('<h2>Third Button Header</h2>');

        //put 8 <img> elements from unsplash on the page using append
        $('.tool-picker-third').append(musicmix.showBackgrounds());


        $('.tool-picker-third').on('click', 'img', function() {
            console.log('TEST');
            $('.card-builder').css({'background': `url('${this.src}')`, 'background-repeat': 'no-repeat', 'background-size': 'cover'});         
        });
    })
};

musicmix.init = function() {
	// Call Functions
	musicmix.events();
     musicmix.randomIndex();
     musicmix.showBackgrounds();
    // musicmix.makeDraggable ();
    // musicmix.makeDroppable();
};

// DOCUMENT READY //
$(function() {
	musicmix.init();
});
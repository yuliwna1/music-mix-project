// GLOBAL VARIABLES //
var musicmix = {};

// FUNCTIONS //
// Gets Track Information from the MusixMatch API Based on the User's Input
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
        musicmix.trackID = (info.message.body.track_list[0].track.track_id);

        // Get Lyrics Info for the given track based on the Track ID
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
        });
    });
};

musicmix.hidden = function() {
    // Hide Canvas on Load
    $('.canvas-page').fadeOut(0, function() {});
   
    // Hide Publish on Load
    $('.publish-page').fadeOut(0, function() {});
};

// Display Lyrics within the Decorative Objects
musicmix.showLyrics = function splitString(results) {
    // Splitting The Lyrics On Line Break
    var $lyricsArray = results.split('\n');
    // Removing The MusixMatch Copyright Info
    $lyricsArray.splice($lyricsArray.length - 4)
    
    for (var i = 0; i < $lyricsArray.length; i++) {
        // Create a Container for the Lyrics
        var $lyricsContainer = $('<h3>');
        $lyricsContainer.addClass('grid-cell-lyrics');
        
        // Append To The DOM
        $($lyricsContainer).html($lyricsArray[i]);
        $('.decorative-objects').append($lyricsContainer);
    };
    
    // Initialize Drag & Drop
    musicmix.drag();
    musicmix.drop();
};

// Display Emoji within the Decorative Objects
musicmix.showEmoji = function() {
    for (var i = 127744; i <= 128591; i++) {
        // Create a Container for the Emoji
        var $emojiContainer = $('<div>');
        $emojiContainer.addClass('grid-cell-emoji');
    
        // Create the Emoji
        var $emoji = $('<div>');
        $emoji.addClass('emoji');
        $emoji.html('&#' + i + ';');

        // Append to the DOM
        $($emojiContainer).append($emoji);
        $('.decorative-objects').append($emojiContainer);
    }

    // Initialize Drag & Drop
    musicmix.drag();
    musicmix.drop();
};

// Display Background within the Decorative Objects
musicmix.showBackgrounds = function() { 
    // Generate 20 Random images for the user to choose from.
    for (var i = 0; i < 20; i++) {
        var urlRandom = "https://unsplash.it/640/480?image=" + (Math.floor(Math.random() * 1084));
        
        // Create a Container for the Image
        var $imageContainer = $("<div>");
        $imageContainer.addClass("grid-cell-img");
        
        // Create The Image
        var $backgroundImg = $("<img>");
        $($backgroundImg).attr("src", urlRandom);
        
        // Append to the DOM
        $($imageContainer).append($backgroundImg);
        $(".decorative-objects").append($imageContainer);
    } 
};

// Intialize Drag
musicmix.drag = function(drag) {
    $('.emoji').draggable({
        revert: 'invalid',
        helper: 'clone',
        containment:'.canvas-page'
    });

    $('.lyrics').draggable({
        revert: 'invalid',
        helper:'clone',
        containment:'.canvas-page'
    });
};

// Initialize Drop
musicmix.drop = function(drop) {
    $('.canvas').droppable({
        drop: function(event, ui) {
            $(this).append($(ui.helper).clone());
            $('.emoji').append({
                top: 0,
                left: 0,
            })
            
            $('.emoji').draggable().css({'fontSize': '5rem'});
            $('.lyrics').draggable();
        }
    });
};
 
// EVENTS //
musicmix.events = function() {
    // Get Input from the User and pass it to the get lyrics.
    $('form').on('submit', function(e) {
        e.preventDefault();
        var lyricSearch1 = $('#firstWord[type=search]').val();
        var lyricSearch2 = $('#secondWord[type=search]').val();
        var lyricSearch3 = $('#thirdWord[type=search]').val();
        var lyricString = lyricSearch1.concat(" " + lyricSearch2 + " " + lyricSearch3);

        musicmix.getLyrics(lyricString);

        // Fade Out The Entry Page
        $('.entry-page').fadeOut(300, function() {
            console.log('hi');
        });
        
        // Fade In The Canvas Page
        $('.canvas-page').fadeIn(300, function() {
            console.log('hi again');
        });
    });
    
    // When the User clicks "New Lyrics", return to the Home Page
    $('#newLyrics').on('click', function() {
        $('.canvas-page').fadeOut(300, function() {
            console.log('hi');
        });
        
        $('.entry-page').fadeIn(300, function() {
            console.log('hi again');
        });
    });

    // When the User clicks "Make Another!", return to the Home Page
    $('#startOver').on('click', function() {
        $('.canvas-page').fadeOut(300, function() {
            console.log('hi');
        });
        
        $('.entry-page').fadeIn(300, function() {
            console.log('hi again');
        });
    });
    // Toggle The Lyrics Tab
    $('#lyricButton').on('click', function(e) {
        $('.decorative-objects').empty();
        $('#emojiButton, #bgButton').removeClass('active');
        $(this).addClass('active');
        musicmix.showLyrics();           
    });

    // Toggle The Emoji Tab
    $('#emojiButton').on('click', function(e) {
        $('.decorative-objects').empty();
        $('#lyricButton, #bgButton').removeClass('active');
        $(this).addClass('active');
        musicmix.showEmoji();
    });

    // Toggle The Background Tab
    $('#bgButton').on('click', function(e) {
        $('.decorative-objects').empty();
        $('#lyricButton, #emojiButton').removeClass('active');
        $(this).addClass('active');
        musicmix.showBackgrounds();
    })

    // Change The Image Source Of The Canvas On Background Click
    $('.decorative-objects').on('click', 'img', function() {
        console.log('TEST');
        $('.canvas').css({'background': `url('${this.src}')`, 'background-repeat': 'no-repeat', 'background-size': 'cover'});  
    })

    // When The User clicks the Publish Button, Create A Canvas
    $('#publish').on('click', function() {
        html2canvas($('.canvas'), {
            allowTaint:true,
            onrendered: function(canvas) {
                $('.canvas-cell').append(canvas);
            }
        });

        // Fade Out the Canvas Page
        $('.canvas-page').fadeOut(300, function() {
            console.log('hay');
        });

        // Fade In the Publish Page
        $('.publish-page').fadeIn(300, function() {
            console.log('hi');
        });
    });

    // Reset Canvas on click of 'Reset' Button
    $('#reset').on('click', function() {
        $('.canvas').empty();
    });
};

musicmix.init = function() {
	// Call Functions
    musicmix.hidden();
	musicmix.events();
};

// DOCUMENT READY //
$(function() {
	musicmix.init();
});
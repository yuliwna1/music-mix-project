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
        })
    });
}

// Display Lyrics
// Split lyrics into an array, loop through, display on page.
musicmix.showLyrics = function splitString(results) {
    var $lyricsArray = results.split('\n');
    $lyricsArray.splice($lyricsArray.length - 4)
    for (var i = 0; i < $lyricsArray.length; i++) {
        // Create container for lyrics
        var $lyricsContainer = $('<h3>');
        $lyricsContainer.addClass('grid-cell-lyrics');
        // Append string to lyricsContainer
        $($lyricsContainer).append($lyricsArray[i]);
        // Append lyricsContainer to DOM
        $('.decorative-objects').append($lyricsContainer);
        $('decorative-objects').append($lyricsContainer);
    };
    
    console.log($lyricsArray);
    musicmix.drag();
    musicmix.drop();
};

// Display Emoji
musicmix.showEmoji = function() {
    for (var i = 127744; i <= 128591; i++) {
        // Create a Container for the Emoji
        var $emojiContainer = $('<div>');
        $emojiContainer.addClass('grid-cell-emoji');
    
        // Create The Emoji
        var $emoji = $('<div>');
        $emoji.addClass('emoji');
        $emoji.html('&#' + i + ';');

        $($emojiContainer).append($emoji);

        $('.decorative-objects').append($emojiContainer);
    }
    
    // Calls drag and drop functions once emoji's are populated dynamically
    musicmix.drag();
    musicmix.drop();
};

// Generate Images From Unsplash
musicmix.generateBackgrounds = function() {

};

// Show Backgrounds
musicmix.showBackgrounds = function() { 
    console.log("testing");

    for (var i = 0; i < 20; i++) {
        var urlRandom = "https://unsplash.it/640/480?image=" + (Math.floor(Math.random()*1084));
        
        var $imageContainer = $("<div>");
        $imageContainer.addClass("grid-cell-img");
        var $backgroundImg = $("<img>");

        $($backgroundImg).attr("src", urlRandom);
        $($imageContainer).append($backgroundImg);
        $(".decorative-objects").append($imageContainer);
    }
    
    console.log(images); 
    console.log('url', urlGallery);  
    return images;
};

// Makes Emoji and Lyrics Draggable
musicmix.drag = function(drag) {
    $('.emoji').draggable({
        revert: 'invalid',
        helper: 'clone',
        containment:'.canvas-page'});

    $('.lyrics').draggable({
        revert: 'invalid',
        helper:'clone',
        containment:'.canvas-page'});
};

musicmix.drop = function(drop) {
    $('.canvas').droppable({
        drop:function(event,ui) {
            $(this).append($(ui.helper).clone());
            $('.emoji').append({
                top:0,
                left:0,
            })
            
            $('.emoji').draggable();
            $('.lyrics').draggable();
        }
    })
}

// Get random image from unsplash
musicmix.randomIndex = function(){
    var randomNumber = Math.round(Math.random() * 1018);
    console.log(randomNumber);
};
 
// EVENTS //
musicmix.events = function() {
    // 
    $('form').on('submit', function(e) {
        e.preventDefault();
        var lyricSearch1 = $('#firstWord[type=search]').val();
        var lyricSearch2 = $('#secondWord[type=search]').val();
        var lyricSearch3 = $('#thirdWord[type=search]').val();
        var lyricString = lyricSearch1.concat(" " + lyricSearch2 + " " + lyricSearch3);

        musicmix.getLyrics(lyricString);
    });
    
    // Entry page fade out, canvas page fade in
    $('.main-btn').on('click', function(f){
        $('.entry-page').fadeOut(300, function(){
            console.log('hi')
        });
        $('.canvas-page').fadeIn(300, function(){
            console.log('hi again')
        });
    });

    // Return to front page
    $('#newLyrics').on('click', function(){
        $('.canvas-page').fadeOut(300, function(){
            console.log('hi')
        });
        
        $('.entry-page').fadeIn(300, function(){
            console.log('hi again')
        });
    });

    $('#lyricButton').on('click', function(e) {
        $('.decorative-objects').empty();
        $('#emojiButton, #bgButton').removeClass('active');
        $(this).addClass('active');
        musicmix.showLyrics();           
    });

    $('#emojiButton').on('click', function(e) {
        $('.decorative-objects').empty();
        $('#lyricButton, #bgButton').removeClass('active');
        $(this).addClass('active');
        musicmix.showEmoji();
    })

    $('#bgButton').on('click', function(e) {
        $('.decorative-objects').empty();
        $('#lyricButton, #emojiButton').removeClass('active');
        $(this).addClass('active');
        musicmix.showBackgrounds();
    });

    $('.decorative-objects').on('click', 'img', function() {
            console.log('TEST');

            $('.canvas').css({'background': `url('${this.src}')`, 'background-repeat': 'no-repeat', 'background-size': 'cover'});  
    });

    //When a user clicks on "submit button", a canvas is created
    $('#publish').on('click', function() {
        console.log("TEST TEST");
        html2canvas($('.canvas'), {
            allowTaint:true,
            onrendered: function(canvas) {
            // var data = canvas.toDataURL();
            // // alert(data);
            $('.canvas-cell').append(canvas);
        }
     });

    // Reset canvas on click of 'reset' button
    $('#reset').on('click', function(){
        $('.canvas').empty();
    });

    $('.canvas-page').fadeOut(300, function() {
        console.log('hay');
    });

    $('.publish-page').fadeIn(300, function() {
        console.log('hi');
    });
});
    
musicmix.init = function() {
	// Call Functions
    musicmix.hidden();
	musicmix.events();    
    musicmix.showBackgrounds();

};

// DOCUMENT READY //
$(function() {
	musicmix.init();
});
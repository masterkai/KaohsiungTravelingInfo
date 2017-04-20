import $ from 'jquery';

// scrollto form

$(".video-section__btn").click(function () {
    $('html,body').animate({
            scrollTop: $(".form").offset().top
        },
        'slow');
});


// rotator word

var ut_word_rotator = function () {

    var ut_rotator_words = ['專業技能', '創意思考', '實務接軌'],
        counter = 0;

    setInterval(function () {
        $("#ut_word_rotator_1").fadeOut(function () {
            $(this).html(ut_rotator_words[counter = (counter + 1) % ut_rotator_words.length]).fadeIn();
        });
    }, 3000);
}

ut_word_rotator();

// window height resize

resizeDiv();
window.onresize = function(event) {
    resizeDiv();
}

function resizeDiv() {
    var viewportHeight = $(window).height();
    $('.video-section').css('height', viewportHeight);
    $('.video-section__pattern-overlay').css('height', viewportHeight);
    $('.video-section__flex-container').css('height', viewportHeight);
}
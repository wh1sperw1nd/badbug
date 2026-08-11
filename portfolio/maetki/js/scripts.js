var showMenu = false;

function toggleMenu(btn, navigation) {
    if (!showMenu) {
        btn.classList.add('close');
        setTimeout(function () {
            navigation.classList.add('open');
            document.body.style.overflow = 'hidden';
        }, 300);
        showMenu = true;
    } else {
        setTimeout(function () {
            btn.classList.remove('close');
        }, 300);
        navigation.classList.remove('open');
        document.body.style.overflow = 'auto';
        showMenu = false;
    }
}

function isOnScreen() {
    var elementOffsetTop = $('#my-video').offset().top;
    var elementHeight = $('#my-video').height();

    var screenScrollTop = $(window).scrollTop();
    var screenHeight = $(window).height();

    var scrollIsAboveElement = elementOffsetTop + elementHeight - screenScrollTop >= 0;
    var elementIsVisibleOnScreen = screenScrollTop + screenHeight - elementOffsetTop >= 0;

    console.log(scrollIsAboveElement && elementIsVisibleOnScreen)

    return scrollIsAboveElement && elementIsVisibleOnScreen;
}

function playVideo() {
    if (isOnScreen()) {
        videojs('my-video').play();
    } else {
        videojs('my-video').pause();
    }
}


$(document).ready(function () {
    var btn = document.querySelector('.btn');
    var navigation = document.querySelector('.navigation');
    var back = document.querySelector('.back');
    var closer = document.querySelector('.closer');

    btn.addEventListener('click', function () {
        toggleMenu(btn, navigation)
    });
    back.addEventListener('click', function () {
        toggleMenu(btn, navigation)
    });
    closer.addEventListener('click', function () {
        toggleMenu(btn, navigation)
    });

    if (document.querySelector(".video-js")) {
        document.body.addEventListener('scroll', function () {
            playVideo()
        });
    }
    $(".slideNavigation li").click(function () {
        smoothScroll("#slide_" + $(this).data('id'))
    })

    // document.getElementById('scrollMid').addEventListener('click', doScrolling.bind(null, '#middle', 1000))
    // document.getElementById('scrollTop').addEventListener('click', doScrolling.bind(null, '#top', 1500))
    // document.getElementById('scrollBot').addEventListener('click', doScrolling.bind(null, '#bottom', 4000))
});
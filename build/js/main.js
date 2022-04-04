//////////////////////////////// Menu

var mobileMenu = new MobileSwipeMenu('#menu', {
    mode: 'right',
    width: window.innerWidth / 1,
    enableBodyHook: true,
    events: {
        opened: function () {
        },
        closed: function () {
        },
        drag: function (swipe) {
        }
    }
});

document.getElementById('openMenu').addEventListener('click', function () {
    mobileMenu.openMenu();
});

/////////////////////////////////////////////// tabs

var jsTriggers = document.querySelectorAll('.js-tab-trigger');

jsTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
        var id = this.getAttribute('data-tab'),
            content = document.querySelector('.js-tab-content[data-tab="'+id+'"]'),
            activeTrigger = document.querySelector('.js-tab-trigger.active'),
            activeContent = document.querySelector('.js-tab-content.active');

        activeTrigger.classList.remove('active');
        trigger.classList.add('active');

        activeContent.classList.remove('active');
        content.classList.add('active');
    });
});
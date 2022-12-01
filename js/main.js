"use strict"

//////////////////////////////// Menu

let mobileMenu = new MobileSwipeMenu('#menu', {
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

////////////// toggle menu

let menuElem = document.querySelector('.dropdown');
let titleElem = menuElem.querySelector('.dropdown-toggle');

titleElem.onclick = function() {
    menuElem.classList.toggle('open');
};

/////////////////////////////////////////////// tabs

let jsTriggers = document.querySelectorAll('.js-tab-trigger');

jsTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
        let id = this.getAttribute('data-tab'),
            content = document.querySelector('.js-tab-content[data-tab="'+id+'"]'),
            activeTrigger = document.querySelector('.js-tab-trigger.active'),
            activeContent = document.querySelector('.js-tab-content.active');

        activeTrigger.classList.remove('active');
        trigger.classList.add('active');

        activeContent.classList.remove('active');
        content.classList.add('active');
    });
});

//////////////////////////////////////////////// modal

let modal = document.getElementById("modal_window");
let btn = document.getElementById("modal_btn");
let span = document.getElementsByClassName("modal_close")[0];

btn.onclick = function () {
    modal.style.display = "flex";
};

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

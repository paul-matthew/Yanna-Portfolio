/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//'YANNA' text over video - synchronization
let video = document.getElementById("introVideo");
let logo = document.getElementById("yannatxtid");

video.addEventListener('play', (event) => {
   logo.classList.toggle('logo-animation');
   console.log("AH YO start")
});

video.addEventListener('ended', (event) => {
   logo.classList.toggle('logo-animation');
   console.log("AH YO end");
   setTimeout (function(){video.play();},2000);
});

//For the mobile version video
let video2 = document.getElementById("introVideo2");

video2.addEventListener('play', (event) => {
    logo.classList.toggle('logo-animation');
    console.log("AH YO start")
 });
 
 video2.addEventListener('ended', (event) => {
    logo.classList.toggle('logo-animation');
    console.log("AH YO end");
    setTimeout (function(){video2.play();},2000);
 });

 //Fitness Channel get latest youtube video (based on a specfic playlist)
 const loadVideo = (iframe) => {
    const cid = "UChfhmGTBfBtx1XaIdMf7nvg";
    const channelURL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`)
    const reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}`;

    fetch(reqURL)
        .then(response => response.json())
        .then(result => {
          console.log(result)
            const videoNumber = iframe.getAttribute('vnum')
            const link = result.items[videoNumber].link;
            const id = link.substr(link.indexOf("=") + 1);
            iframe.setAttribute("src", `https://youtube.com/embed/${id}?controls=0&autoplay=1`);
        })
        .catch(error => console.log('error', error));
}

const iframes = document.getElementsByClassName('latestVideoEmbed');
for (let i = 0, len = iframes.length; i < len; i++) {
    loadVideo(iframes[i]);
}
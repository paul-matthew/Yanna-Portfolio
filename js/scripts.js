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
});

video.addEventListener('ended', (event) => {
   logo.classList.toggle('logo-animation');
   setTimeout (function(){video.play();},2000);
});

//For the mobile version video
let video2 = document.getElementById("introVideo2");

video2.addEventListener('play', (event) => {
    logo.classList.toggle('logo-animation');
 });
 
 video2.addEventListener('ended', (event) => {
    logo.classList.toggle('logo-animation');
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
//ON SCREEN CSS delayed until on screen

const element = document.getElementById('ahyo');    
const element2 = document.getElementById('ahyo2');
const element3 = document.getElementById('ahyo3');
const element4 = document.getElementById('ahyo4');
const element5 = document.getElementById('ahyo5');
const element6 = document.getElementById('ahyo6');
const element7 = document.getElementById('ahyo7');

const observer = new IntersectionObserver(entries => {
  element.classList.toggle( 'block-reveal', entries[0].isIntersecting );
  element2.classList.toggle( 'block-reveal', entries[0].isIntersecting );
  element3.classList.toggle( 'block-reveal', entries[0].isIntersecting );
  element4.classList.toggle( 'block-reveal', entries[0].isIntersecting );
  element5.classList.toggle( 'block-reveal', entries[0].isIntersecting );
  element6.classList.toggle( 'block-reveal', entries[0].isIntersecting );
  element7.classList.toggle( 'block-reveal', entries[0].isIntersecting );
});

observer.observe( element );
observer.observe( element2 );
observer.observe( element3 );
observer.observe( element4 );
observer.observe( element5 );
observer.observe( element6 );
observer.observe( element7 );

/*MOTIVATION API (DATOCMS)*/

async function fetchDatoCMSPosts() {
    const apiUrl = 'https://graphql.datocms.com/';
    const apiToken = '838ec5cd226fdd2d7670f9ad5939ab'; // Replace with your actual API token
  
    const query = `
      {
        allPosts(orderBy: date_DESC) {
          id
          postTitle
          postContent
          date
        }
      }
    `;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ query }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // console.log(data); // Log the entire response to inspect the structure
  
        const posts = data.data.allPosts; // Access the allPosts array
  
        // Call a function to populate the carousel with posts
        populateCarousel(posts);
      } else {
        console.error('Failed to fetch posts from DatoCMS.');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  function populateCarousel(posts) {
    const carouselInner = document.getElementById('carouselInner');
  
    // Loop through posts and create carousel items
    posts.forEach((post, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = index === 0 ? 'carousel-item active' : 'carousel-item';
  
      // Assuming you have HTML structure for postTitle and postContent
      carouselItem.innerHTML = `
      <div style="position: relative;margin-top:80px;min-height:400px">
        <h3>${post.postTitle}</h3>
        <p style='font-size:15px;color:gray'>${post.date}</p>
        <p style='text-align: justify; margin:10px'>${post.postContent}</p>
      </div>
    `;
  
      carouselInner.appendChild(carouselItem);
    });
  }
  
  // Call the function to fetch and populate the carousel
  fetchDatoCMSPosts();
  
  
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize the carousel
    const postCarousel = new bootstrap.Carousel(document.getElementById('postCarousel'), {
      interval: false, // Set to false to prevent automatic sliding
    });

    // Get the previous and next buttons
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');

    // Add event listeners to the buttons
    prevButton.addEventListener('click', function() {
      postCarousel.prev(); // Move to the previous slide
    });

    nextButton.addEventListener('click', function() {
      postCarousel.next(); // Move to the next slide
    });
  });

  

//JS for toggling side nav bar in smaller displays.
var sidemenu = document.getElementById("sidemenu");
var mobileOverlay = document.getElementById("mobile-overlay");

function openmenu() {
  sidemenu.style.right = "0";
  if (mobileOverlay) {
    mobileOverlay.classList.add('active');
  }
  document.body.classList.add('menu-open');
  // Add escape key listener when menu is open
  document.addEventListener('keydown', handleEscapeKey);
}

function closemenu() {
  const sidemenu = document.getElementById("sidemenu");
  sidemenu.style.right = "-280px";
  if (mobileOverlay) {
    mobileOverlay.classList.remove('active');
  }
  document.body.classList.remove('menu-open');
  // Remove escape key listener when menu is closed
  document.removeEventListener('keydown', handleEscapeKey);
}

// Handle escape key to close menu
function handleEscapeKey(event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
    closemenu();
  }
}

// Add keyboard support for hamburger menu
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.fa-bars');
  if (hamburger) {
    hamburger.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openmenu();
      }
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const nav = document.querySelector('#sidemenu');
    const hamburger = document.querySelector('.fa-bars');
    const isClickInside = nav.contains(event.target) || hamburger.contains(event.target);
    
    if (!isClickInside && sidemenu.style.right === "0px") {
      closemenu();
    }
  });
});


////the following function immediately closes navbar and and starts scrolling side by side which looks less appealing...
// function scrollToSection(event, sectionId) {
//   event.preventDefault();
//   document.querySelector(sectionId).scrollIntoView({
//     behavior: 'smooth'
//   });

//   closemenu();
// }

////the following function simply closes the navbar by sliding it to right immdediately and then starts sliding which looks more appealing..
  function scrollToSection(event, sectionId) {
  event.preventDefault();
  setTimeout(() => {
    document.querySelector(sectionId).scrollIntoView({
      behavior: 'smooth'
    });
  }, 100); // Adjust the delay as needed

  closemenu();
}



(function() {
  "use strict";
  
  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    // Ensure loader shows for at least 2 seconds to display the PLP message
    const startTime = Date.now();
    const minDisplayTime = 2000; // 2 seconds minimum
    
    window.addEventListener('load', () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
      
      setTimeout(() => {
        preloader.remove();
        document.getElementById("content").style.opacity = '1'; // Fade in content
      }, remainingTime);
    });
  }

  // for testing in local environment having quick loading time...
// setTimeout(function()
// {
//     document.getElementById("preloader").style.display = 'none';  // hide prelaoder 
//     document.getElementById("content").style.opacity = '1'; // Fade in content
//  }, 	2000); 
 //2000ms is basically 2s


  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */

    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });


  
  // contact form to google sheets
	const scriptURL = 'YOUR-SCRIPT-URL'
	const form = document.forms['submit-to-google-sheet']   //our contact form
  
	const msg=document.getElementById("msg")
	form.addEventListener('submit', e => {
	  e.preventDefault()

	  msg.style.fontFamily="JetBrainsMono";
	  
	  msg.style.color = "white"
	  msg.innerHTML="Sending Message..."
	  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
		.then(response => {

			msg.style.color="#26fe00";
			msg.innerHTML="Message Sent Successfully!"
			setTimeout(function(){
				msg.innerHTML=""
			},5000)
			form.reset()
		})
		.catch(error => console.error('Error!', error.message))
	})

})();





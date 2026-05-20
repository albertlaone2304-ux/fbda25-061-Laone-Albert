/* ============================================
   LUXE BREW BEAUTY LOUNGE - script.js
   Simple, beginner-friendly JavaScript
   Functions: Scroll Reveal, Form Validation, Popup
   ============================================ */


/* ---- 1. SCROLL REVEAL ANIMATION ----
   When user scrolls down, elements fade in.
   We add a CSS class 'visible' to trigger the CSS transition.
*/
function revealOnScroll() {
  // Get all elements that have the class 'reveal'
  var elements = document.querySelectorAll('.reveal');

  elements.forEach(function(element) {
    // getBoundingClientRect tells us where the element is on the screen
    var position = element.getBoundingClientRect();

    // If the top of the element is within the visible screen area
    if (position.top < window.innerHeight - 80) {
      element.classList.add('visible'); // Add 'visible' class to trigger CSS animation
    }
  });
}

// Listen for when user scrolls, then run revealOnScroll
window.addEventListener('scroll', revealOnScroll);

// Also run once when page loads, in case elements are already visible
window.addEventListener('load', revealOnScroll);


/* ---- 2. ACTIVE NAV LINK ----
   Highlights the correct nav link based on the current page.
*/
function setActiveNav() {
  // Get the current page filename (e.g., "about.html")
  var currentPage = window.location.pathname.split('/').pop();

  // If no filename, we're on index.html
  if (currentPage === '' || currentPage === 'index.html') {
    currentPage = 'index.html';
  }

  // Get all nav links
  var navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function(link) {
    // Get the href of each link
    var linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', setActiveNav);


/* ---- 3. BOOKING FORM SUBMISSION ----
   Shows a popup message when user submits the booking form.
   HTML5 validation checks that all required fields are filled.
*/
var bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', function(event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Check if the form passes HTML5 validation (required fields, email format etc.)
    if (bookingForm.checkValidity()) {
      // Show the Bootstrap modal popup
      var bookingModal = new bootstrap.Modal(document.getElementById('confirmModal'));
      bookingModal.show();

      // Reset the form after showing popup
      bookingForm.reset();
      bookingForm.classList.remove('was-validated');
    } else {
      // Add Bootstrap's validation styles to show red/green borders
      bookingForm.classList.add('was-validated');
    }
  });
}


/* ---- 4. FEEDBACK FORM SUBMISSION ----
   Shows a thank-you alert when feedback is submitted.
*/
var feedbackForm = document.getElementById('feedbackForm');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (feedbackForm.checkValidity()) {
      // Show the feedback confirmation modal
      var feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
      feedbackModal.show();

      feedbackForm.reset();
      feedbackForm.classList.remove('was-validated');
    } else {
      feedbackForm.classList.add('was-validated');
    }
  });
}


/* ---- 5. SMOOTH SCROLL FOR ANCHOR LINKS ----
   When user clicks a link like href="#services", page scrolls smoothly.
   Note: This is also handled by CSS 'scroll-behavior: smooth', but this
   JavaScript version gives more control.
*/
var anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    var targetId = this.getAttribute('href');

    // Only if the target exists on this page
    if (targetId !== '#' && document.querySelector(targetId)) {
      event.preventDefault();
      var targetSection = document.querySelector(targetId);

      // Scroll smoothly to that section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


/* ---- 6. GALLERY FILTER ----
   Filters gallery items by category when user clicks a filter button.
*/
var filterButtons = document.querySelectorAll('.gallery-filter-btn');

if (filterButtons.length > 0) {
  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Remove 'active' from all buttons
      filterButtons.forEach(function(btn) {
        btn.classList.remove('active', 'btn-gold');
        btn.classList.add('btn-outline-gold');
      });

      // Add 'active' to clicked button
      this.classList.add('active', 'btn-gold');
      this.classList.remove('btn-outline-gold');

      var filterValue = this.getAttribute('data-filter');
      var galleryItems = document.querySelectorAll('.gallery-item');

      galleryItems.forEach(function(item) {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}


/* ---- 7. NAVBAR SCROLL EFFECT ----
   Makes navbar slightly more compact when user scrolls down.
*/
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.padding = '10px 0';
    } else {
      navbar.style.padding = '16px 0';
    }
  }
});

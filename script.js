
function revealOnScroll() {
  var elements = document.querySelectorAll('.reveal');

  elements.forEach(function(element) {
    
    var position = element.getBoundingClientRect();

    if (position.top < window.innerHeight - 80) {
      element.classList.add('visible'); 
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

window.addEventListener('load', revealOnScroll);

function setActiveNav() {

  var currentPage = window.location.pathname.split('/').pop();

  if (currentPage === '' || currentPage === 'index.html') {
    currentPage = 'index.html';
  }

  var navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function(link) {
  
    var linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNav);

var bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', function(event) {
   
    event.preventDefault();

    if (bookingForm.checkValidity()) {
     
      var bookingModal = new bootstrap.Modal(document.getElementById('confirmModal'));
      bookingModal.show();

      bookingForm.reset();
      bookingForm.classList.remove('was-validated');
    } else {
      
      bookingForm.classList.add('was-validated');
    }
  });
}

var feedbackForm = document.getElementById('feedbackForm');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (feedbackForm.checkValidity()) {
      
      var feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
      feedbackModal.show();

      feedbackForm.reset();
      feedbackForm.classList.remove('was-validated');
    } else {
      feedbackForm.classList.add('was-validated');
    }
  });
}


var anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    var targetId = this.getAttribute('href');

    if (targetId !== '#' && document.querySelector(targetId)) {
      event.preventDefault();
      var targetSection = document.querySelector(targetId);

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

var filterButtons = document.querySelectorAll('.gallery-filter-btn');

if (filterButtons.length > 0) {
  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      
      filterButtons.forEach(function(btn) {
        btn.classList.remove('active', 'btn-gold');
        btn.classList.add('btn-outline-gold');
      });


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

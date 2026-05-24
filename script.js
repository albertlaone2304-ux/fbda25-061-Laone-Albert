var EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";       
var BOOKING_SERVICE_ID  = "YOUR_SERVICE_ID";       
var BOOKING_TEMPLATE_ID = "YOUR_BOOKING_TEMPLATE";  
var FEEDBACK_SERVICE_ID = "YOUR_SERVICE_ID";       
var FEEDBACK_TEMPLATE_ID = "YOUR_FEEDBACK_TEMPLATE"; 

(function () {
  "use strict";
  
  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

})();

(function () {
  "use strict";

  var bookingBtn = document.getElementById("submitBooking");
  if (!bookingBtn) return; 

  bookingBtn.addEventListener("click", function () {

    var fullName = document.getElementById("bookFullName");
    var email    = document.getElementById("bookEmail");
    var phone    = document.getElementById("bookPhone");
    var date     = document.getElementById("bookDate");
    var service  = document.getElementById("bookService");
    var message  = document.getElementById("bookMessage");

    var fields = [fullName, email, phone, date, service];
    var valid = true;
    fields.forEach(function (field) {
      if (!field.checkValidity()) {
        field.reportValidity();
        valid = false;
      }
    });
    if (!valid) return;

    var templateParams = {
      full_name:      fullName.value.trim(),
      email:          email.value.trim(),
      phone:          phone.value.trim(),
      preferred_date: date.value,
      service:        service.value,
      message:        message.value.trim() || "No additional message."
    };

    bookingBtn.disabled = true;
    bookingBtn.textContent = "Sending...";

    emailjs.send(BOOKING_SERVICE_ID, BOOKING_TEMPLATE_ID, templateParams)
      .then(function () {
       
        var successAlert = document.getElementById("bookingSuccess");
        successAlert.style.display = "block";

        [fullName, email, phone, date, message].forEach(function (f) { f.value = ""; });
        service.value = "";

        bookingBtn.disabled = false;
        bookingBtn.innerHTML = '<i class="bi bi-calendar-check me-2"></i>Send Booking Request';

        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      })
      .catch(function (error) {
        console.error("EmailJS error:", error);
        alert("Sorry, there was an error sending your booking. Please call us directly on +267 78 628 931.");
        bookingBtn.disabled = false;
        bookingBtn.innerHTML = '<i class="bi bi-calendar-check me-2"></i>Send Booking Request';
      });
  });

})();

(function () {
  "use strict";

  var feedbackBtn = document.getElementById("submitFeedback");
  if (!feedbackBtn) return; 

  feedbackBtn.addEventListener("click", function () {

    var fullName = document.getElementById("fbFullName");
    var email    = document.getElementById("fbEmail");
    var rating   = document.getElementById("fbRating");
    var service  = document.getElementById("fbService");
    var comments = document.getElementById("fbComments");

    var requiredFields = [fullName, email, rating, comments];
    var valid = true;
    requiredFields.forEach(function (field) {
      if (!field.checkValidity()) {
        field.reportValidity();
        valid = false;
      }
    });
    if (!valid) return;

    var templateParams = {
      full_name:        fullName.value.trim(),
      email:            email.value.trim(),
      rating:           rating.value,
      service_received: service.value,
      comments:         comments.value.trim()
    };

    feedbackBtn.disabled = true;
    feedbackBtn.textContent = "Sending...";

    emailjs.send(FEEDBACK_SERVICE_ID, FEEDBACK_TEMPLATE_ID, templateParams)
      .then(function () {
      
        var successAlert = document.getElementById("feedbackSuccess");
        successAlert.style.display = "block";

        fullName.value = "";
        email.value    = "";
        rating.value   = "";
        service.value  = "Not specified";
        comments.value = "";

        feedbackBtn.disabled = false;
        feedbackBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Submit Feedback';

        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      })
      .catch(function (error) {
        console.error("EmailJS error:", error);
        alert("Sorry, there was an error submitting your feedback. Please try again later.");
        feedbackBtn.disabled = false;
        feedbackBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Submit Feedback';
      });
  });

})();

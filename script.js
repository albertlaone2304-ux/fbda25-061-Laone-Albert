// ==================== EMAILJS CONFIGURATION ====================
// 🔁 REPLACE these with your real EmailJS credentials
var EMAILJS_PUBLIC_KEY   = "YOUR_PUBLIC_KEY";        // e.g. "abc123def456"
var BOOKING_SERVICE_ID   = "YOUR_SERVICE_ID";        // e.g. "service_xyz789"
var BOOKING_TEMPLATE_ID  = "YOUR_BOOKING_TEMPLATE";  // e.g. "template_uvw456"
var FEEDBACK_SERVICE_ID  = "YOUR_SERVICE_ID";        // same or different service
var FEEDBACK_TEMPLATE_ID = "YOUR_FEEDBACK_TEMPLATE"; // e.g. "template_efg123"

// ==================== INIT EMAILJS ====================
(function () {
  "use strict";
  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

// ==================== BOOKING FORM HANDLER ====================
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

    // Validate required fields
    var fields = [fullName, email, phone, date, service];
    var valid = true;
    fields.forEach(function (field) {
      if (!field.checkValidity()) {
        field.reportValidity();
        valid = false;
      }
    });
    if (!valid) return;

    // Prepare template parameters
    var templateParams = {
      full_name:      fullName.value.trim(),
      email:          email.value.trim(),
      phone:          phone.value.trim(),
      preferred_date: date.value,
      service:        service.value,
      message:        message.value.trim() || "No additional message."
    };

    bookingBtn.disabled = true;
    bookingBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

    // Show success immediately after validation passes
    setTimeout(function () {
      var successAlert = document.getElementById("bookingSuccess");
      if (successAlert) successAlert.style.display = "block";

      // Clear form fields
      [fullName, email, phone, date, message].forEach(function (f) { f.value = ""; });
      service.value = "";

      // Reset button
      bookingBtn.disabled = false;
      bookingBtn.innerHTML = '<i class="bi bi-calendar-check me-2"></i>Send Booking Request';

      // Scroll to success message
      if (successAlert) successAlert.scrollIntoView({ behavior: "smooth", block: "center" });

      // Send email silently in background (won't affect UX)
      if (typeof emailjs !== "undefined") {
        emailjs.send(BOOKING_SERVICE_ID, BOOKING_TEMPLATE_ID, templateParams)
          .catch(function (error) { console.error("EmailJS error:", error); });
      }
    }, 800);
  });
})();

// ==================== FEEDBACK FORM HANDLER ====================
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
    feedbackBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

    // Show success immediately after validation passes
    setTimeout(function () {
      var successAlert = document.getElementById("feedbackSuccess");
      if (successAlert) successAlert.style.display = "block";

      // Reset form
      fullName.value = "";
      email.value    = "";
      rating.value   = "";
      service.value  = "Not specified";
      comments.value = "";

      feedbackBtn.disabled = false;
      feedbackBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Submit Feedback';

      if (successAlert) successAlert.scrollIntoView({ behavior: "smooth", block: "center" });

      // Send email silently in background (won't affect UX)
      if (typeof emailjs !== "undefined") {
        emailjs.send(FEEDBACK_SERVICE_ID, FEEDBACK_TEMPLATE_ID, templateParams)
          .catch(function (error) { console.error("EmailJS error:", error); });
      }
    }, 800);
  });
})();

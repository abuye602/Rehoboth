document
  .getElementById("form-contact")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Log form values to check if they are correct
    console.log("Form Data: ", { firstName, lastName, email, message });

    // Create form data object
    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message,
    };

    // Get the submit button and change its text to "Submitting..."
    const submitButton = document.querySelector(".contact-btn");
    submitButton.textContent = "Submitting...";
    submitButton.disabled = true; // Disable the button to prevent multiple submissions

    // Use Fetch to send form data to server
    fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Failed to send email");
        }
      })
      .then((data) => {
        // Display success message without redirecting
        const feedbackMessage = document.getElementById("feedback-message");
        feedbackMessage.textContent = "Email was sent!!";
        feedbackMessage.style.color = "black";
        feedbackMessage.style.fontWeight = 300;
        feedbackMessage.style.display = "block";
        console.log("Success:", data);

        // Change button text back to "Submit" and re-enable it
        submitButton.textContent = "Submit";
        submitButton.disabled = false;

        // Scroll to top of the page
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 1000);

        // Wait for 2 seconds to show success message, then reload the page
        setTimeout(() => {
          window.location.reload(); // This will reload the page
        }, 1000); // 2 seconds delay before reloading the page
      })
      .catch((error) => {
        console.log("Error:", error);

        // Display error message
        const feedbackMessage = document.getElementById("feedback-message");
        feedbackMessage.textContent = "Failed to send email. Please try again";
        feedbackMessage.style.color = "red";
        feedbackMessage.style.display = "block";
      });
  });

function scrollToSection(section) {
    const targets = document.querySelectorAll(`.link-${section}`); // Use class selector
    if (targets.length > 0) {
        targets[0].scrollIntoView({ behavior: 'smooth' }); // Scroll to the first matching element
    }
}

// Array to store used emails for validation
const usedEmails = ["example@domain.com", "user@domain.com"];
let signatureCount = 0; // Initialize counter for valid signatures

function submitForm() {
    const nameInput = document.getElementById("name").value;
    const emailInputElement = document.getElementById("email");
    const emailInput = emailInputElement.value;
    const displayName = document.getElementById("displayName");
    const errorMessage = document.getElementById("errorMessage");
    const signatureCounter = document.getElementById("signatureCounter");

    // Simple email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(emailInput);

    // Check if email is valid and not already in use
    if (isEmailValid && !usedEmails.includes(emailInput)) {
        // If valid, add to usedEmails list and display the name in green
        usedEmails.push(emailInput);
        displayName.textContent = nameInput;
        displayName.style.color = "#4CAF50"; // Green for valid input
        displayName.style.fontWeight = "bold";
        errorMessage.textContent = ""; // Clear error message
        emailInputElement.classList.remove("shake");

        // Increment and display the signature count
        signatureCount++;
        signatureCounter.textContent = signatureCount;
        submitForm1()
    } else {
        // If invalid, shake the input box and display error message
        displayName.textContent = `${nameInput} (invalid signature)`;
        displayName.style.color = "#e74c3c"; // Red for invalid input
        displayName.style.fontWeight = "bold";
        errorMessage.textContent = "Invalid Email"; // Display error message
        emailInputElement.classList.add("shake");

        // Remove the shake effect after animation duration to reset it
        setTimeout(() => {
            emailInputElement.classList.remove("shake");
        }, 500); // Shake animation duration
    }
}

// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function handleScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        if (isInViewport(section)) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

// Attach the scroll event
window.addEventListener('scroll', handleScrollAnimation);

// Trigger on load to handle visible sections at the start
document.addEventListener('DOMContentLoaded', handleScrollAnimation);





function toggleMode() {
    const body = document.body;
    const button = document.getElementById("modeToggle");

    // Toggle dark-mode class on the body
    body.classList.toggle("dark-mode");

    // Update button text based on the current mode
    if (body.classList.contains("dark-mode")) {
        button.textContent = "Switch to Light Mode";
    } else {
        button.textContent = "Switch to Dark Mode";
    }
}


// Show modal function
function showModal(userName) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');

    // Customize the message
    modalMessage.textContent = `Thank you, ${userName}, for signing the petition!`;

    // Display the modal
    modal.style.display = 'flex';

    // Automatically hide modal after 5 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 5000);
}

// Hook up to form submission
function submitForm1() {
    const nameInput = document.getElementById('name');
    const userName = nameInput.value;

    if (userName.trim() === '') {
        document.getElementById('errorMessage').textContent = 'Please enter your name!';
        return;
    }

    // Clear any error message and trigger the modal
    document.getElementById('errorMessage').textContent = '';
    showModal(userName);

    // Increment signature counter
    const signatureCounter = document.getElementById('signatureCounter');
    let currentCount = parseInt(signatureCounter.textContent, 10) || 0;
    signatureCounter.textContent = currentCount + 1;

    // Reset the form
    nameInput.value = '';
}

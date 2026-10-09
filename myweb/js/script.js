// ==========================================
// ICT251 ACTIVITY 3 - JAVASCRIPT
// ==========================================


// FEATURE 1: SHOW AND HIDE PROJECT DETAILS

const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        const targetId = button.dataset.target;
        const details = document.getElementById(targetId);

        if (!details) {
            return;
        }

        const isOpening = details.hidden;

        details.hidden = !isOpening;

        button.setAttribute("aria-expanded", String(isOpening));

        button.textContent = isOpening
            ? "Hide Details"
            : "Show Details";
    });
});


// FEATURE 2: INTERACTIVE PHOTO GALLERY

const galleryImages = [
    {
        src: "images/photo1.jpeg",
        alt: "Photo showing my first activity",
        caption: "My first photo."
    },
    {
        src: "images/photo2.jpeg",
        alt: "Photo showing one of my interests",
        caption: "One of my interests."
    },
    {
        src: "images/photo3.jpeg",
        alt: "Photo showing another activity",
        caption: "Another photo from my gallery."
    }
];

let currentPhoto = 0;

const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");


function showPhoto(index) {

    if (!galleryImage || !galleryCaption) {
        return;
    }

    currentPhoto = index;

    galleryImage.src = galleryImages[currentPhoto].src;
    galleryImage.alt = galleryImages[currentPhoto].alt;

    galleryCaption.textContent = galleryImages[currentPhoto].caption;

    if (prevPhoto) {
        prevPhoto.disabled = currentPhoto === 0;
    }

    if (nextPhoto) {
        nextPhoto.disabled = currentPhoto === galleryImages.length - 1;
    }
}


if (galleryImage && galleryCaption && prevPhoto && nextPhoto) {

    prevPhoto.addEventListener("click", function () {
        if (currentPhoto > 0) {
            showPhoto(currentPhoto - 1);
        }
    });

    nextPhoto.addEventListener("click", function () {
        if (currentPhoto < galleryImages.length - 1) {
            showPhoto(currentPhoto + 1);
        }
    });

    showPhoto(0);
}


// FEATURE 3: DARK AND LIGHT THEME

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.textContent = "Switch to Dark Theme";

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        const darkMode = document.body.classList.contains("dark-theme");

        themeToggle.setAttribute("aria-pressed", String(darkMode));

        themeToggle.textContent = darkMode
            ? "Switch to Light Theme"
            : "Switch to Dark Theme";
    });
}


// FEATURE 4: CONTACT FORM VALIDATION AND PREVIEW

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
const formPreview = document.getElementById("formPreview");


if (contactForm && formFeedback && formPreview) {

    contactForm.addEventListener("submit", function (event) {

        // Stop the form from reloading the page.
        event.preventDefault();

        // Collect information entered by the user.
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Clear previous feedback and preview.
        formFeedback.textContent = "";
        formPreview.textContent = "";

        // Check the name.
        if (name === "") {
            formFeedback.textContent = "Please enter your name.";
            return;
        }

        // Check the email format.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formFeedback.textContent = "Please enter a valid email address.";
            return;
        }

        // Check the message.
        if (message === "") {
            formFeedback.textContent = "Please enter a message.";
            return;
        }

        // If all checks pass, display success.
        formFeedback.textContent = "Your information has been validated successfully.";

        // Display a preview of the submitted information.
        formPreview.textContent =
            "PREVIEW\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Message: " + message;
    });
}
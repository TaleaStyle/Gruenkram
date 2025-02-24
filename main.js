'use strict';

(() => {
    // ============= Variablen deklarieren =====================
    const firstNameInput = document.querySelector('#vorname');
    const lastNameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const formEl = document.querySelector('form');

    const primaryLabels = document.querySelectorAll(".primaryLabel");
    const secondaryLabels = document.querySelectorAll(".secondaryLabel");

    const errorMessage = document.querySelector('.alert-danger');
    const successMessage = document.querySelector('.alert-success');

    // ============= Funktionen =====================

    function validateEmail(email) {
        const standardEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return standardEmail.test(email);
    }

    function showAlertMessage(message, type) {
        const alertBox = type === 'success' ? successMessage : errorMessage;

        alertBox.innerHTML = message;
        alertBox.style.display = 'block';
        alertBox.style.height = type === 'success' ? '30px' : '100px';
        alertBox.style.marginTop = '30px';
        alertBox.style.fontSize= '17px';
        alertBox.style.textAlign =  type === 'success' ? 'center' : 'left';
        alertBox.style.backgroundColor = '#FDf7F4';
        alertBox.style.border = type === 'success' ? '0.2px solid #8EB486' : '0.2px solid #997C70';
        alertBox.style.color = type === 'success' ? '#8EB486' : ' #997C70';
        alertBox.style.borderRadius = '10px';
        alertBox.style.padding = '15px'
        alertBox.style.lineHeight = '1.8'
   

        // **Scrollt zur Nachricht, damit der Benutzer sie sieht**
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function validateForm(e) {
        e.preventDefault(); // Verhindert das automatische Absenden des Formulars
        const errors = [];

        if (firstNameInput.value.trim() === '') {
            errors.push('Bitte geben Sie Ihren Vornamen ein.');
        }

        if (lastNameInput.value.trim() === '') {
            errors.push('Bitte geben Sie Ihren Nachnamen ein.');
        }

        if (!validateEmail(emailInput.value.trim())) {
            errors.push('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        }

        if (errors.length > 0) {
            showAlertMessage(errors.join('<br>'), 'error'); // Fehler anzeigen
            successMessage.style.display = 'none';
        } else {
            showAlertMessage('Sie haben sich erfolgreich angemeldet!', 'success'); // Erfolgsmeldung anzeigen
            errorMessage.style.display = 'none';
        }
    }

    function highlightPrimaryLabel() {
        primaryLabels.forEach(el => el.classList.toggle("selected-label", false));
        primaryLabels.forEach(el => el.classList.toggle("unselected-label", true));

        const selectedMainDate = document.querySelector('input[name="Lieblingstermin"]:checked');
        if (selectedMainDate) {
            selectedMainDate.parentElement.classList.toggle("selected-label", true);
            selectedMainDate.parentElement.classList.toggle("unselected-label", false);
        }
    }

    function highlightSecondaryLabel() {
        secondaryLabels.forEach(el => el.classList.toggle("selected-label", false));
        secondaryLabels.forEach(el => el.classList.toggle("unselected-label", true));

        const selectedAltDate = document.querySelector('input[name="ersatztermin"]:checked');
        if (selectedAltDate) {
            selectedAltDate.parentElement.classList.toggle("selected-label", true);
            selectedAltDate.parentElement.classList.toggle("unselected-label", false);
        }
    }

    // Event-Listener für die Radio-Buttons
    document.querySelectorAll('input[name="Lieblingstermin"]').forEach(radio =>
        radio.addEventListener("change", highlightPrimaryLabel)
    );

    document.querySelectorAll('input[name="ersatztermin"]').forEach(radio =>
        radio.addEventListener("change", highlightSecondaryLabel)
    );

    // Event-Listener für das Formular
    formEl.addEventListener('submit', validateForm);
})();

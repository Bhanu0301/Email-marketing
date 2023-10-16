function initMap() {
    const input = document.getElementById('demographicArea');
    const autocomplete = new google.maps.places.Autocomplete(input);
}
document.addEventListener('DOMContentLoaded', function () {
  const categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      categoryItems.forEach(otherItem => otherItem.classList.remove('active'));
      item.classList.add('active');
    });
  });
});

const pincodeInput = document.getElementById('pincode');
const pincodeError = document.getElementById('pincode-error');

pincodeInput.addEventListener('input', function() {
  if (!pincodeInput.validity.patternMismatch) {
    pincodeError.style.display = 'none';
  } else {
    pincodeError.style.display = 'block';
  }
});

const phoneNumberInput = document.getElementById('phoneNumber');
const phoneError = document.getElementById('phone-error');

phoneNumberInput.addEventListener('input', function() {
  if (!phoneNumberInput.validity.patternMismatch) {
    phoneError.style.display = 'none';
  } else {
    phoneError.style.display = 'block';
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const categoryItems = document.querySelectorAll('.category-item');
  const optionsSections = document.querySelectorAll('.options-content');

  categoryItems.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', () => {
      const selectedCategory = item.getAttribute('data-category');
      const optionsSection = document.querySelector(`#${selectedCategory}-options`);

      if (checkbox.checked) {
        optionsSection.classList.add('active');
      } else {
        optionsSection.classList.remove('active');
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('userDetailsForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Process form data (if needed)
    
    // Display a thank you message alert
    alert('Thank you for your valuable time taken to fill out the form to enhance our customer experience services.');
    
    // Proceed with form submission after alert acknowledgment
    form.submit();
  });
});







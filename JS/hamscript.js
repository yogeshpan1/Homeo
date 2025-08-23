// Existing JS (unchanged)
const hamburger = document.getElementById("hamburger-menu");
const menuDropdown = document.getElementById("menu-dropdown");

hamburger.addEventListener("click", e => {
  e.stopPropagation();
  menuDropdown.classList.toggle("active");
});

document.addEventListener("click", () => {
  menuDropdown.classList.remove("active");
});

menuDropdown.addEventListener("click", e => e.stopPropagation());

const loginBtn = document.getElementById('login-signup-btn');
loginBtn.addEventListener('click', () => {
  window.location.href = 'login.html';
});


// -----------------------------
// Gift card modal functionality
// -----------------------------
const giftCardLink = document.getElementById('gift-cards-link');
const giftCardModal = document.getElementById('gift-card-modal');
const giftCardClose = document.getElementById('gift-card-close');
const giftCardForm = document.getElementById('gift-card-form');

giftCardLink.addEventListener('click', e => {
  e.preventDefault();
  giftCardModal.classList.add('active');
  // Close hamburger menu
  document.getElementById('menu-dropdown').classList.remove('active');
});

giftCardClose.addEventListener('click', () => {
  giftCardModal.classList.remove('active');
});

// Close modal when clicking outside
giftCardModal.addEventListener('click', e => {
  if (e.target === giftCardModal) {
    giftCardModal.classList.remove('active');
  }
});

// Handle form submission
giftCardForm.addEventListener('submit', e => {
  e.preventDefault();
  const voucherCode = document.getElementById('voucher-code').value;
  const email = document.getElementById('email').value;

  // Simulate processing
  const redeemBtn = document.querySelector('.redeem-btn');
  const originalText = redeemBtn.innerHTML;
  redeemBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  redeemBtn.disabled = true;

  setTimeout(() => {
    alert(`Gift card redemption successful!\nCode: ${voucherCode}\nEmail: ${email}\n\nYour account will be credited within 24 hours.`);
    redeemBtn.innerHTML = originalText;
    redeemBtn.disabled = false;
    giftCardModal.classList.remove('active');
    giftCardForm.reset();
  }, 2000);
});

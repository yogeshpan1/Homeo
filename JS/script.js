    document.addEventListener("DOMContentLoaded", function () {
        // =========================
        // JavaScript: Image Sliders for Each Card
        // =========================
        document.querySelectorAll('.listing-card').forEach(card => {
            const slider = card.querySelector('.image-slider');
            const dots = card.querySelectorAll('.slider-dot');
            const prevBtn = card.querySelector('.image-nav.prev');
            const nextBtn = card.querySelector('.image-nav.next');
            let currentIndex = 0;
            const totalSlides = dots.length;

            function updateSlider() {
                if (!slider) return;
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = index;
                    updateSlider();
                });
            });

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                    updateSlider();
                });
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = (currentIndex + 1) % totalSlides;
                    updateSlider();
                });
            }

            card.addEventListener('mouseenter', () => {
                document.querySelectorAll('.listing-card').forEach(c => {
                    if (c !== card) c.classList.remove('expanded');
                });
                card.classList.add('expanded');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('expanded');
            });
        });

        // =========================
        // JavaScript: Function to slide the row of cards
        // =========================
        window.slide = function(button, direction) {
            const row = button.parentElement.querySelector('.listing-row');
            if (!row) return;
            const scrollAmount = 250;
            row.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
        };

        // =========================
        // JavaScript: Navbar scroll effect
        // =========================
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (!header) return;
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

        // =========================
        // JavaScript: Calendar: Check-in & Check-out
        // =========================
        const checkinInput = document.getElementById("checkin");
        const checkoutInput = document.getElementById("checkout");
        let checkoutPicker = null;

        if (checkinInput && checkoutInput) {
            const checkinPicker = flatpickr(checkinInput, {
                minDate: "today",
                dateFormat: "M j, Y",
                onChange: function (selectedDates) {
                    if (selectedDates.length > 0) {
                        const minCheckoutDate = new Date(selectedDates[0]);
                        minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
                        checkoutPicker.set("minDate", minCheckoutDate);
                        checkoutPicker.clear();
                        setTimeout(() => checkoutPicker.open(), 200);
                    }
                }
            });

            checkoutPicker = flatpickr(checkoutInput, {
                minDate: "today",
                dateFormat: "M j, Y"
            });
        }

        // =========================
        // JavaScript: Guest Dropdown
        // =========================
        const guestFields = document.querySelectorAll("#guest-field, #mini-guests");
        const guestDropdown = document.getElementById("guest-dropdown");
        const guestInput = document.getElementById("guests");
        const doneBtn = document.getElementById("done-btn");
        const petsCheckbox = document.getElementById("pets");
        const counts = { adults: 2, children: 0 };

        if (guestDropdown && guestInput) {
            guestFields.forEach(field => {
                field.addEventListener("click", e => {
                    e.stopPropagation();
                    guestDropdown.classList.toggle("hidden");
                });
            });

            guestDropdown.addEventListener("click", e => e.stopPropagation());

            document.addEventListener("click", e => {
                if (!guestDropdown.contains(e.target)) {
                    guestDropdown.classList.add("hidden");
                }
            });

            document.querySelectorAll(".plus, .minus").forEach(btn => {
                btn.addEventListener('click', () => {
                    const type = btn.dataset.type;
                    const countEl = document.getElementById(`${type}-count`);
                    if (!countEl) return;
                    if (btn.classList.contains("plus")) {
                        counts[type]++;
                    } else if (counts[type] > 0) {
                        counts[type]--;
                    }
                    countEl.textContent = counts[type];
                });
            });

            if (doneBtn) {
                doneBtn.addEventListener("click", () => {
                    const pets = petsCheckbox && petsCheckbox.checked;
                    let summary = `${counts.adults} adults · ${counts.children} children`;
                    if (pets) summary += " · pets";
                    guestInput.value = summary;
                    guestDropdown.classList.add("hidden");
                });
            }

            const clearBtn = document.getElementById("clear-all-btn");
            if (clearBtn) {
                clearBtn.addEventListener("click", () => {
                    counts.adults = 0;
                    counts.children = 0;
                    if (petsCheckbox) petsCheckbox.checked = false;
                    document.getElementById("adults-count").textContent = 0;
                    document.getElementById("children-count").textContent = 0;
                    guestInput.value = "";
                });
            }
        }

        // =========================
        // JavaScript: Hamburger Menu Dropdown
        // =========================
        const hamburger = document.getElementById("hamburger-menu");
        const menuDropdown = document.getElementById("menu-dropdown");

        if (hamburger && menuDropdown) {
            hamburger.addEventListener("click", e => {
                e.stopPropagation();
                menuDropdown.classList.toggle("active");
            });

            document.addEventListener("click", () => {
                menuDropdown.classList.remove("active");
            });

            menuDropdown.addEventListener("click", e => e.stopPropagation());
        }

        // =========================
        // JavaScript: Scroll Behavior: Mini Search Bar
        // =========================
        const largeSearch = document.querySelector(".searchBar-container");
        const miniSearch = document.getElementById("mini-search-bar");

        if (largeSearch && miniSearch) {
            window.addEventListener("scroll", () => {
                const scrolled = window.scrollY > 120;
                largeSearch.classList.toggle("hidden", scrolled);
                miniSearch.classList.toggle("visible", scrolled);
            });
        }

        // =========================
        // JavaScript: Mini Search Bar Interaction
        // =========================
        function expandFullSearch(focusTarget) {
            const hero = document.getElementById("hero");
            if (!hero) return;
            window.scrollTo({ top: hero.offsetTop, behavior: "smooth" });

            setTimeout(() => {
                switch (focusTarget) {
                    case "where":
                        document.getElementById("destination")?.focus();
                        break;
                    case "date":
                        checkinInput?._flatpickr?.open();
                        break;
                    case "guests":
                        guestDropdown?.classList.remove("hidden");
                        break;
                }
            }, 200);
        }

        document.getElementById("mini-where")?.addEventListener("click", () => expandFullSearch("where"));
        document.getElementById("mini-date")?.addEventListener("click", () => expandFullSearch("date"));
        document.getElementById("mini-guests")?.addEventListener("click", () => expandFullSearch("guests"));
    });
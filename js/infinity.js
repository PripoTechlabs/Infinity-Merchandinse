/* ==========================================================
   Infinity Merchandise — Custom JavaScript
   ========================================================== */

(function () {
    'use strict';

    /* --------------------------------------------------------
       GOOGLE SHEETS ENDPOINT
       Paste your deployed Apps Script Web App URL below.
       See: google-apps-script.js for setup instructions.
    -------------------------------------------------------- */
    const GSHEET_URL = ''; // ← replace with your Apps Script URL after deploying

    /* --------------------------------------------------------
       ENQUIRY MODAL
    -------------------------------------------------------- */
    const MODAL_OVERLAY = document.getElementById('im-enquiry-modal');
    const MODAL_CATEGORY_INPUT = document.getElementById('im-product-category');

    function openModal(category) {
        if (!MODAL_OVERLAY) return;
        MODAL_OVERLAY.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (category && MODAL_CATEGORY_INPUT) {
            // Check the matching checkbox if it exists
            const checkboxes = MODAL_OVERLAY.querySelectorAll('input[name="product_interest"]');
            checkboxes.forEach(cb => {
                if (cb.value.toLowerCase().includes(category.toLowerCase())) {
                    cb.checked = true;
                }
            });
        }
        // Focus first input
        const firstInput = MODAL_OVERLAY.querySelector('input[type="text"]');
        if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }

    function closeModal() {
        if (!MODAL_OVERLAY) return;
        MODAL_OVERLAY.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close on overlay click
    if (MODAL_OVERLAY) {
        MODAL_OVERLAY.addEventListener('click', function (e) {
            if (e.target === MODAL_OVERLAY) closeModal();
        });
    }

    // Close button
    const closeBtn = document.getElementById('im-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // All "Make an Enquiry" triggers
    document.querySelectorAll('[data-im-open-modal]').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(this.dataset.imCategory || '');
        });
    });

    // Fixed tab (desktop + mobile)
    const enquiryTab = document.getElementById('im-enquiry-tab');
    const enquiryMobile = document.getElementById('im-enquiry-mobile');
    if (enquiryTab) enquiryTab.addEventListener('click', () => openModal());
    if (enquiryMobile) enquiryMobile.addEventListener('click', () => openModal());

    /* --------------------------------------------------------
       ENQUIRY FORM SUBMISSION → Google Sheets
    -------------------------------------------------------- */
    const enquiryForm = document.getElementById('im-enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = this.querySelector('[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending…';
            btn.disabled = true;

            const fd = new FormData(this);

            // Collect multi-select checkbox groups into comma-separated strings
            const productInterests = [...this.querySelectorAll('input[name="product_interest"]:checked')].map(cb => cb.value).join(', ');
            const services         = [...this.querySelectorAll('input[name="services_needed"]:checked')].map(cb => cb.value).join(', ');
            const sourceMarkets    = [...this.querySelectorAll('input[name="source_market"]:checked')].map(cb => cb.value).join(', ');
            const destinations     = [...this.querySelectorAll('input[name="destination"]:checked')].map(cb => cb.value).join(', ');

            const payload = {
                name:             fd.get('name')      || '',
                email:            fd.get('email')     || '',
                phone:            fd.get('phone')     || '',
                company:          fd.get('company')   || '',
                country:          fd.get('country')   || '',
                role:             fd.get('role')      || '',
                product_interests: productInterests,
                quantity:         fd.get('quantity')  || '',
                frequency:        fd.get('frequency') || '',
                budget:           fd.get('budget')    || '',
                timeline:         fd.get('timeline')  || '',
                source_markets:   sourceMarkets,
                destinations:     destinations,
                services_needed:  services,
                message:          fd.get('message')   || '',
                how_heard:        fd.get('how_heard') || ''
            };

            if (!GSHEET_URL) {
                console.warn('GSHEET_URL not set — form data logged to console only:', payload);
                showSuccess();
                return;
            }

            try {
                // Content-Type: text/plain avoids CORS preflight while still
                // delivering the JSON body to Google Apps Script (e.postData.contents)
                await fetch(GSHEET_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(payload)
                });
                // fetch resolves as long as the network request completes —
                // GAS always returns 200 so we treat any resolved fetch as success
                showSuccess();
            } catch (err) {
                btn.textContent = originalText;
                btn.disabled = false;
                alert('Something went wrong. Please reach us on WhatsApp or email directly.');
            }

            function showSuccess() {
                enquiryForm.innerHTML = `
                    <div style="text-align:center;padding:3rem 1rem;">
                        <div style="font-size:3rem;margin-bottom:1rem;">✅</div>
                        <h3 style="color:#0B2641;margin-bottom:0.5rem;">Enquiry Received!</h3>
                        <p style="color:#555;">Thank you for reaching out.<br>Our sourcing team will contact you within 24 hours.</p>
                    </div>
                `;
            }
        });
    }

    /* --------------------------------------------------------
       PRODUCT CATEGORY ACCORDION
    -------------------------------------------------------- */
    document.querySelectorAll('.im-product-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // Don't close if enquiry btn was clicked
            if (e.target.closest('.im-product-enquiry-btn')) return;

            const isOpen = this.classList.contains('open');
            // Close all
            document.querySelectorAll('.im-product-card').forEach(c => c.classList.remove('open'));
            // Toggle current
            if (!isOpen) this.classList.add('open');
        });
    });

    // Product enquiry buttons
    document.querySelectorAll('.im-product-enquiry-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            openModal(this.dataset.category || '');
        });
    });

    /* --------------------------------------------------------
       WORLD MAP REGION TABS
    -------------------------------------------------------- */
    const REGION_DATA = {
        gcc: {
            label: 'GCC Markets',
            countries: 'UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain',
            products: ['Textiles & Apparel', 'Corporate Gifts & Promotional Items', 'Office Furniture', 'Dry Fruits & Dates', 'Kitchen Utilities', 'Small Electronics', 'Wall Paintings & Home Décor', 'Stationery Items', 'Shoes & Footwear', 'Wholesale Consumer Goods']
        },
        eu: {
            label: 'European Markets',
            countries: 'Germany, France, Netherlands, UK, Spain, Italy & more',
            products: ['Textiles & Apparel', 'Shoes & Footwear', 'Textile Accessories', 'Corporate Gifts', 'Promotional Merchandise', 'Wall Paintings & Home Décor', 'Wholesale Consumer Goods']
        },
        us: {
            label: 'United States',
            countries: 'USA — West Coast, East Coast, Midwest',
            products: ['Promotional Merchandise', 'Corporate Gifts', 'Stationery Items', 'Small Electronics', 'Kitchen Utilities', 'Wholesale Consumer Goods']
        },
        asia: {
            label: 'Asia Pacific',
            countries: 'India, Vietnam, Bangladesh, South Korea, Japan, Singapore',
            products: ['Textiles & Apparel', 'Textile Machinery', 'Imported Commercial Machinery', 'Textile Accessories', 'Shoes & Footwear', 'Kitchen Utilities & Machinery', 'Wholesale Consumer Goods']
        }
    };

    function renderRegion(regionKey) {
        const data = REGION_DATA[regionKey];
        if (!data) return;

        // Update active tab
        document.querySelectorAll('.im-region-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.region === regionKey);
        });

        // Update panel
        const panel = document.getElementById('im-region-products');
        if (!panel) return;

        panel.innerHTML = `
            <div class="im-region-product-list">
                <div style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-bottom:0.75rem;letter-spacing:0.05em;">${data.countries}</div>
                ${data.products.map(p => `<div class="im-region-product-item">${p}</div>`).join('')}
            </div>
        `;
    }

    // Tab clicks
    document.querySelectorAll('.im-region-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            renderRegion(this.dataset.region);
        });
    });

    // Init with GCC
    renderRegion('gcc');

    /* --------------------------------------------------------
       SMOOTH SCROLL for NAVBAR LINKS
    -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* --------------------------------------------------------
       PRODUCT-TO-MARKET MAP — pin click/tap toggle
    -------------------------------------------------------- */
    document.querySelectorAll('.im-ptm-pin-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const group = this.closest('.im-ptm-pin-group');
            const isActive = group.classList.contains('active');
            // Close all open pins
            document.querySelectorAll('.im-ptm-pin-group.active').forEach(g => {
                g.classList.remove('active');
                g.querySelector('.im-ptm-pin-btn').setAttribute('aria-expanded', 'false');
            });
            // Toggle current
            if (!isActive) {
                group.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close map pins on outside click
    document.addEventListener('click', function () {
        document.querySelectorAll('.im-ptm-pin-group.active').forEach(g => {
            g.classList.remove('active');
            g.querySelector('.im-ptm-pin-btn').setAttribute('aria-expanded', 'false');
        });
    });

    // Prevent popup click from closing it
    document.querySelectorAll('.im-ptm-popup').forEach(popup => {
        popup.addEventListener('click', e => e.stopPropagation());
    });

    /* --------------------------------------------------------
       PRODUCT-TO-MARKET CARDS — mobile accordion
    -------------------------------------------------------- */
    document.querySelectorAll('.im-ptm-card-hdr').forEach(hdr => {
        hdr.addEventListener('click', function () {
            const card = this.closest('.im-ptm-card');
            const list = card.querySelector('.im-ptm-card-list');
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            // Close all
            document.querySelectorAll('.im-ptm-card-hdr').forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                h.closest('.im-ptm-card').querySelector('.im-ptm-card-list').classList.remove('open');
            });
            // Toggle current
            if (!isOpen) {
                this.setAttribute('aria-expanded', 'true');
                list.classList.add('open');
            }
        });
    });

    /* --------------------------------------------------------
       STICKY NAVBAR (add background on scroll)
    -------------------------------------------------------- */
    const navbar = document.querySelector('.rt-navbar-v1');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 80) {
                navbar.style.background = 'rgba(7,24,41,0.97)';
            } else {
                navbar.style.background = '';
            }
        }, { passive: true });
    }

})();

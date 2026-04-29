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

    function openModal(category, subProduct) {
        if (!MODAL_OVERLAY) return;
        // Uncheck all product checkboxes first
        MODAL_OVERLAY.querySelectorAll('input[name="product_interest"]').forEach(cb => {
            cb.checked = false;
        });
        MODAL_OVERLAY.classList.add('active');
        MODAL_OVERLAY.scrollTop = 0;
        const modalBox = MODAL_OVERLAY.querySelector('.im-modal');
        if (modalBox) modalBox.scrollTop = 0;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('im-modal-open');
        if (category) {
            // Check the matching checkbox if it exists
            const checkboxes = MODAL_OVERLAY.querySelectorAll('input[name="product_interest"]');
            checkboxes.forEach(cb => {
                if (cb.value.toLowerCase().includes(category.toLowerCase()) ||
                    category.toLowerCase().includes(cb.value.toLowerCase().split('&')[0].trim())) {
                    cb.checked = true;
                }
            });
        }
        // Populate sub-product hidden field (used on product.html)
        const subProductField = document.getElementById('im-subproduct');
        if (subProductField) {
            subProductField.value = subProduct || '';
        }
        // Pre-fill message textarea with sub-product if provided
        if (subProduct) {
            const msg = document.getElementById('im-message');
            if (msg && !msg.value) {
                msg.value = 'Interested in: ' + subProduct;
            }
        }
        // Focus first input
        const firstInput = MODAL_OVERLAY.querySelector('input[type="text"]');
        if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }

    // Expose globally for product-page.js and other external callers
    window.openModal = openModal;

    function closeModal() {
        if (!MODAL_OVERLAY) return;
        MODAL_OVERLAY.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('im-modal-open');
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
        // Save original form HTML so user can resubmit
        const originalFormHTML = enquiryForm.innerHTML;

        function attachFormHandler() {
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
                    showSuccess();
                } catch (err) {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    alert('Something went wrong. Please reach us on WhatsApp or email directly.');
                }
            });
        }

        function showSuccess() {
            enquiryForm.innerHTML = `
                <div style="text-align:center;padding:3rem 1rem;">
                    <div style="font-size:3rem;margin-bottom:1rem;">✅</div>
                    <h3 style="color:#0B2641;margin-bottom:0.5rem;">Enquiry Received!</h3>
                    <p style="color:#555;">Thank you for reaching out.<br>Our sourcing team will contact you within 24 hours.</p>
                    <button id="im-new-enquiry-btn" style="margin-top:1.5rem;padding:0.7rem 1.75rem;background:#0B2641;color:#fff;border:none;border-radius:0.5rem;font-size:0.9rem;font-weight:600;cursor:pointer;letter-spacing:0.03em;">
                        Submit Another Enquiry
                    </button>
                </div>
            `;
            document.getElementById('im-new-enquiry-btn').addEventListener('click', function () {
                enquiryForm.innerHTML = originalFormHTML;
                attachFormHandler();
            });
        }

        attachFormHandler();
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
       PRODUCTS CAROUSEL — JS auto-scroll + drag (desktop & mobile)
    -------------------------------------------------------- */
    (function () {
        const outer = document.querySelector('.im-products-carousel-outer');
        const track = document.querySelector('.im-products-track');
        if (!outer || !track) return;

        let running = true;
        let isDragging = false;
        let dragStartX = 0;
        let dragScrollLeft = 0;
        let resumeTimer = null;

        function halfWidth() {
            return track.scrollWidth / 2;
        }

        // Auto-scroll loop via rAF
        function tick() {
            if (running && !isDragging) {
                outer.scrollLeft += 1;
                if (outer.scrollLeft >= halfWidth()) {
                    outer.scrollLeft -= halfWidth();
                }
            }
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        function pause() {
            running = false;
            if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
        }

        function resume(delay) {
            if (resumeTimer) clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => { running = true; }, delay || 0);
        }

        // Hover pause (desktop)
        outer.addEventListener('mouseenter', () => pause());
        outer.addEventListener('mouseleave', () => { if (!isDragging) resume(); });

        // Mouse drag (desktop)
        outer.addEventListener('mousedown', (e) => {
            isDragging = true;
            pause();
            dragStartX = e.pageX - outer.getBoundingClientRect().left;
            dragScrollLeft = outer.scrollLeft;
            outer.style.cursor = 'grabbing';
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const x = e.pageX - outer.getBoundingClientRect().left;
            const walk = x - dragStartX;
            outer.scrollLeft = dragScrollLeft - walk;
        });
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            outer.style.cursor = 'grab';
            resume(2000);
        });

        // Touch drag (mobile)
        outer.addEventListener('touchstart', (e) => {
            isDragging = true;
            pause();
            dragStartX = e.touches[0].pageX - outer.getBoundingClientRect().left;
            dragScrollLeft = outer.scrollLeft;
        }, { passive: true });
        outer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - outer.getBoundingClientRect().left;
            outer.scrollLeft = dragScrollLeft - (x - dragStartX);
        }, { passive: true });
        outer.addEventListener('touchend', () => {
            isDragging = false;
            resume(2000); // Resume auto-scroll 2s after user stops touching
        }, { passive: true });

        // Prev/Next arrow buttons — step by one slide width
        function slideStep() {
            const slide = track.querySelector('.im-product-slide');
            if (!slide) return outer.clientWidth * 0.8;
            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || 0) || 0;
            return slide.getBoundingClientRect().width + gap;
        }
        function step(dir) {
            pause();
            const half = halfWidth();
            let next = outer.scrollLeft + dir * slideStep();
            // Keep within the first set so the seamless loop logic stays valid
            if (next < 0) next += half;
            if (next >= half) next -= half;
            outer.scrollTo({ left: next, behavior: 'smooth' });
            resume(2500);
        }
        const prevBtn = document.getElementById('im-products-prev');
        const nextBtn = document.getElementById('im-products-next');
        if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => step(1));
    })();

    /* --------------------------------------------------------
       PRODUCT SLIDE CLICKS → navigate to product detail page
       Slides are now <a> tags; click handler removed.
       Kept as no-op block for future extensibility.
    -------------------------------------------------------- */

    /* --------------------------------------------------------
       SMOOTH SCROLL for NAVBAR LINKS
    -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // plain # links handled elsewhere
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Close hamburger menu if open (click the Webflow close button)
                const crossBtn = document.querySelector('.rt-hamburger-cross-icon-wrapper');
                if (crossBtn && window.getComputedStyle(document.querySelector('.rt-nav-background') || document.body).display !== 'none') {
                    crossBtn.click();
                }
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
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
       PTM MAP — geographic pin placement + auto-built arcs

       Each pin has data-lat / data-lng attributes. We project
       geo coords to % positions over the worldmap.svg image
       using an equirectangular projection with bounds tuned
       to the SVG's visible content (trimmed Antarctica/arctic).

       Tweak LAT_MAX / LAT_MIN / LON_MIN / LON_MAX below if the
       underlying worldmap.svg is swapped for a different crop.
    -------------------------------------------------------- */
    (function () {
        var mapWrap = document.querySelector('.im-ptm-map-wrap');
        var arcsSvg = document.getElementById('im-ptm-arcs');
        if (!mapWrap || !arcsSvg) return;

        // Equirectangular projection bounds — tuned for the current worldmap.svg.
        // SVG covers roughly -180°..180° longitude and ~83°N..-55°S (Antarctica trimmed).
        // Tweak these if you swap the underlying map.
        var LON_MIN = -180, LON_MAX = 180;
        var LAT_MAX = 83,   LAT_MIN = -55;

        // SVG viewBox (must match <svg viewBox="...">)
        var SVG_W = 2000, SVG_H = 857;

        function latLngToPercent(lat, lng) {
            var xPct = (lng - LON_MIN) / (LON_MAX - LON_MIN) * 100;
            var yPct = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * 100;
            return { x: xPct, y: yPct };
        }

        function latLngToSvg(lat, lng) {
            var p = latLngToPercent(lat, lng);
            return { x: p.x / 100 * SVG_W, y: p.y / 100 * SVG_H };
        }

        // 1) Position each pin by geo coords
        var pins = Array.prototype.slice.call(mapWrap.querySelectorAll('.im-ptm-pin-group[data-lat][data-lng]'));
        var hqs = []; // [{el, lat, lng, svg}]
        var markets = []; // same shape but non-HQ

        pins.forEach(function (el) {
            var lat = parseFloat(el.dataset.lat);
            var lng = parseFloat(el.dataset.lng);
            if (isNaN(lat) || isNaN(lng)) return;
            var p = latLngToPercent(lat, lng);
            el.style.left = p.x.toFixed(3) + '%';
            el.style.top  = p.y.toFixed(3) + '%';
            var rec = { el: el, lat: lat, lng: lng, svg: latLngToSvg(lat, lng) };
            if (el.dataset.hq) hqs.push(rec); else markets.push(rec);
        });

        // 2) Build arcs — each market → nearest HQ (great-circle distance), plus HQ1↔HQ2
        var SVG_NS = 'http://www.w3.org/2000/svg';
        var XLINK_NS = 'http://www.w3.org/1999/xlink';

        function haversine(a, b) {
            var toRad = Math.PI / 180;
            var dLat = (b.lat - a.lat) * toRad;
            var dLng = (b.lng - a.lng) * toRad;
            var la1 = a.lat * toRad, la2 = b.lat * toRad;
            var h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLng/2)**2;
            return 2 * Math.asin(Math.sqrt(h));
        }

        function quadPath(from, to, curve) {
            // Control point offset perpendicular to the segment, scaled by length
            var mx = (from.x + to.x) / 2;
            var my = (from.y + to.y) / 2;
            var dx = to.x - from.x, dy = to.y - from.y;
            var len = Math.sqrt(dx*dx + dy*dy);
            // Perpendicular unit vector (lifted upward)
            var px = -dy / len, py = dx / len;
            // Always lift arcs upward (negative y in SVG) when endpoints roughly horizontal
            if (py > 0) { px = -px; py = -py; }
            var lift = len * (curve || 0.22);
            var cx = mx + px * lift;
            var cy = my + py * lift;
            return 'M ' + from.x.toFixed(1) + ' ' + from.y.toFixed(1) +
                   ' Q ' + cx.toFixed(1) + ' ' + cy.toFixed(1) +
                   ' ' + to.x.toFixed(1) + ' ' + to.y.toFixed(1);
        }

        function addArc(id, from, to, colorClass, delayClass) {
            var path = document.createElementNS(SVG_NS, 'path');
            path.setAttribute('id', id);
            path.setAttribute('class', 'im-ptm-arc ' + colorClass + (delayClass ? ' ' + delayClass : ''));
            path.setAttribute('d', quadPath(from, to));
            arcsSvg.appendChild(path);

            var circle = document.createElementNS(SVG_NS, 'circle');
            var particleClass = colorClass.indexOf('blue') > -1 ? 'im-ptm-particle--blue' : 'im-ptm-particle--gold';
            circle.setAttribute('class', 'im-ptm-particle ' + particleClass);
            circle.setAttribute('r', '3.8');
            var anim = document.createElementNS(SVG_NS, 'animateMotion');
            var dist = Math.sqrt((to.x-from.x)**2 + (to.y-from.y)**2);
            anim.setAttribute('dur', Math.max(2, dist / 260).toFixed(2) + 's');
            anim.setAttribute('repeatCount', 'indefinite');
            anim.setAttribute('begin', 'indefinite');
            var mpath = document.createElementNS(SVG_NS, 'mpath');
            mpath.setAttributeNS(XLINK_NS, 'xlink:href', '#' + id);
            mpath.setAttribute('href', '#' + id);
            anim.appendChild(mpath);
            circle.appendChild(anim);
            arcsSvg.appendChild(circle);
        }

        if (hqs.length >= 1 && markets.length) {
            var delayClasses = ['', 'im-ptm-arc--d1', 'im-ptm-arc--d2', 'im-ptm-arc--d3', 'im-ptm-arc--d4', 'im-ptm-arc--d5'];
            markets.forEach(function (m, i) {
                // pick nearest HQ
                var target = hqs[0];
                if (hqs.length > 1) {
                    var best = haversine(m, hqs[0]), idx = 0;
                    for (var k = 1; k < hqs.length; k++) {
                        var d = haversine(m, hqs[k]);
                        if (d < best) { best = d; idx = k; }
                    }
                    target = hqs[idx];
                }
                var colorClass = target.el.dataset.hq === '2' ? 'im-ptm-arc--blue' : 'im-ptm-arc--gold';
                addArc('im-arc-m' + i, m.svg, target.svg, colorClass, delayClasses[i % delayClasses.length]);
            });

            // HQ1 ↔ HQ2 link
            if (hqs.length >= 2) {
                addArc('im-arc-hq-link', hqs[0].svg, hqs[1].svg, 'im-ptm-arc--gold', 'im-ptm-arc--d4');
            }
        }
    })();

    /* --------------------------------------------------------
       PTM MAP — animate trade route arcs on scroll into view
    -------------------------------------------------------- */
    (function () {
        var ptmSection = document.getElementById('global-reach');
        if (!ptmSection) return;
        var arcsSvg = ptmSection.querySelector('.im-ptm-arcs-svg');
        if (!arcsSvg) return;

        var animated = false;

        function startArcs() {
            if (animated) return;
            animated = true;
            arcsSvg.classList.add('im-ptm-arcs--animate');
            // Start traveling particles after arcs finish drawing
            var particles = arcsSvg.querySelectorAll('animateMotion');
            var delays = [2000, 2200, 2400, 2600, 2800, 3000, 3200];
            particles.forEach(function (anim, i) {
                setTimeout(function () { anim.beginElement(); }, delays[i] || 2200 + i * 100);
            });
        }

        if ('IntersectionObserver' in window) {
            var ptmObserver = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    startArcs();
                    ptmObserver.disconnect();
                }
            }, { threshold: 0.15 });
            ptmObserver.observe(ptmSection);
        } else {
            startArcs();
        }
    }());

    /* --------------------------------------------------------
       PRODUCT CAROUSEL — lazy-load videos + play/pause on visibility
    -------------------------------------------------------- */
    (function () {
        var videos = document.querySelectorAll('.im-product-slide-video');
        if (!videos.length || !('IntersectionObserver' in window)) {
            // Fallback: load & play all immediately (no IO support)
            videos.forEach(function (v) {
                if (v.dataset.src) { v.src = v.dataset.src; v.load(); v.play().catch(function(){}); }
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var v = entry.target;
                if (entry.isIntersecting) {
                    // Load source on first intersection
                    if (!v.src && v.dataset.src) {
                        v.src = v.dataset.src;
                        v.load();
                    }
                    v.play().catch(function () {});
                } else {
                    v.pause();
                }
            });
        }, {
            root: document.querySelector('.im-products-carousel-outer'),
            rootMargin: '0px 100px 0px 100px',
            threshold: 0.1
        });

        videos.forEach(function (v) { observer.observe(v); });
    }());

    /* --------------------------------------------------------
       WHAT WE DO — mobile interactivity
       Reveal cards on scroll, auto-activate the most centered
       card, and toggle on tap. Desktop hover is untouched.
    -------------------------------------------------------- */
    (function () {
        const section = document.getElementById('what-we-do');
        if (!section) return;
        const cards = section.querySelectorAll('.rt-card-wrapper');
        if (!cards.length) return;
        const mq = window.matchMedia('(max-width: 991px)');
        if (!mq.matches) return;

        // Reveal on enter
        if ('IntersectionObserver' in window) {
            const reveal = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) {
                        e.target.classList.add('im-wd-visible');
                        reveal.unobserve(e.target);
                    }
                });
            }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
            cards.forEach(function (c) { reveal.observe(c); });
        } else {
            cards.forEach(function (c) { c.classList.add('im-wd-visible'); });
        }

        // Auto-activate card closest to viewport center while scrolling
        let ticking = false;
        function updateActive() {
            ticking = false;
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const center = vh / 2;
            let best = null;
            let bestDist = Infinity;
            cards.forEach(function (c) {
                const r = c.getBoundingClientRect();
                if (r.bottom < 0 || r.top > vh) return;
                const cardMid = r.top + r.height / 2;
                const d = Math.abs(cardMid - center);
                if (d < bestDist) { bestDist = d; best = c; }
            });
            cards.forEach(function (c) {
                if (c === best && bestDist < vh * 0.35) c.classList.add('im-wd-active');
                else c.classList.remove('im-wd-active');
            });
        }
        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(updateActive);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        updateActive();
    })();

    /* --------------------------------------------------------
       FOOTER YEAR — auto-update copyright
    -------------------------------------------------------- */
    const footerYear = document.getElementById('im-footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

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

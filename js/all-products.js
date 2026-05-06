/* =============================================================
   ALL PRODUCTS — Catalogue Page Renderer
   Renders category cards from window.PRODUCT_DATA with filtering.
   ============================================================= */

(function () {
    'use strict';

    var DATA = window.PRODUCT_DATA || {};
    var grid = document.getElementById('im-cat-grid');
    if (!grid) return;

    // Loose category → group mapping for filter chips
    var GROUPS = {
        'textiles-apparel':    'apparel',
        'shoes-footwear':      'apparel',
        'corporate-gifts':     'lifestyle',
        'stationery':          'lifestyle',
        'dry-fruits':          'lifestyle',
        'furnitures':          'home',
        'wall-decor':          'home',
        'kitchen-utilities':   'home',
        'electronics':         'lifestyle',
        'commercial-machinery':'industrial',
        'toys':                'entertainment',
        'arcade-games':        'entertainment'
    };

    var KICKERS = {
        'apparel':       'Apparel Division',
        'lifestyle':     'Lifestyle & Gifting',
        'home':          'Home & Interiors',
        'industrial':    'Industrial & Machinery',
        'entertainment': 'Entertainment'
    };

    function pad2(n) { return n < 10 ? '0' + n : '' + n; }

    function cardMarkup(id, data, index, total) {
        var group = GROUPS[id] || 'lifestyle';
        var kicker = KICKERS[group] || 'Catalogue';
        var count = (data.subProducts && data.subProducts.length) || 0;
        var imgSrc = (data.subImages && data.subImages[0]) || data.image || '';
        var tagline = data.tagline || '';
        var delay = (index * 55) + 'ms';

        return (
            '<a class="im-cat-card" href="product.html?id=' + id + '"' +
                ' data-group="' + group + '"' +
                ' style="--delay:' + delay + '"' +
                ' role="listitem" aria-label="' + data.name + ' — open category">' +
                '<div class="im-cat-card-media">' +
                    '<span class="im-cat-card-num"><strong>' + pad2(index + 1) + '</strong>&nbsp;/&nbsp;' + pad2(total) + '</span>' +
                    '<span class="im-cat-card-arrow" aria-hidden="true">' +
                        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
                            '<path d="M4 12L12 4M6 4h6v6"/>' +
                        '</svg>' +
                    '</span>' +
                    '<img class="im-cat-card-img" src="' + imgSrc + '" alt="' + data.name + '" loading="lazy">' +
                '</div>' +
                '<div class="im-cat-card-body">' +
                    '<span class="im-cat-card-kicker">' + kicker + '</span>' +
                    '<h3 class="im-cat-card-title">' + data.name + '</h3>' +
                    (tagline ? '<p class="im-cat-card-tag">' + tagline + '</p>' : '') +
                    '<div class="im-cat-card-meta">' +
                        '<span class="im-cat-card-count">' + count + ' varieties</span>' +
                        '<span class="im-cat-card-cta">Explore' +
                            '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
                                '<path d="M3 8h10M9 4l4 4-4 4"/>' +
                            '</svg>' +
                        '</span>' +
                    '</div>' +
                '</div>' +
            '</a>'
        );
    }

    var entries = Object.keys(DATA);
    var total = entries.length;
    var html = entries.map(function (id, i) {
        return cardMarkup(id, DATA[id], i, total);
    }).join('');
    grid.innerHTML = html;

    // Stats
    var countEl = document.getElementById('im-cat-count');
    var subEl = document.getElementById('im-cat-sub-count');
    if (countEl) countEl.textContent = pad2(total);
    if (subEl) {
        var subs = entries.reduce(function (acc, id) {
            return acc + ((DATA[id].subProducts || []).length);
        }, 0);
        subEl.textContent = subs;
    }

    // Filter chips
    var chips = document.querySelectorAll('.im-cat-chip');
    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            var filter = this.dataset.filter;
            chips.forEach(function (c) {
                c.classList.toggle('is-active', c === chip);
                c.setAttribute('aria-selected', c === chip ? 'true' : 'false');
            });
            var cards = grid.querySelectorAll('.im-cat-card');
            cards.forEach(function (card) {
                var show = filter === 'all' || card.dataset.group === filter;
                card.classList.toggle('is-hidden', !show);
            });
        });
    });
})();

(function () {
    'use strict';

    var inputs = Array.from(document.querySelectorAll('#find-in-page-input, #find-in-page-input-mobile'));
    var messages = document.querySelectorAll('#no-results-message, #no-results-message-mobile');
    var blocks = document.querySelectorAll('.main-block');

    function applySearch(value) {
        var term = value.trim().toLowerCase();
        var total = 0;
        inputs.forEach(function (input) { input.value = value; });
        blocks.forEach(function (block) {
            var visible = 0;
            block.querySelectorAll('.searchable-item').forEach(function (item) {
                var text = (item.getAttribute('data-keywords') || '') + ' ' + item.textContent;
                var matches = !term || text.toLowerCase().includes(term);
                item.style.display = matches ? '' : 'none';
                if (matches) visible++;
            });
            block.style.display = visible || !term ? '' : 'none';
            total += visible;
        });
        messages.forEach(function (message) {
            message.style.display = term && !total ? 'block' : 'none';
        });
    }

    function restoreSearch() {
        var visible = inputs.find(function (input) { return input.getClientRects().length; });
        var restored = inputs.find(function (input) { return input.value; });
        applySearch((visible && visible.value) || (restored && restored.value) || '');
    }

    inputs.forEach(function (input) {
        input.addEventListener('input', function () { applySearch(input.value); });
        input.addEventListener('search', function () { applySearch(input.value); });
        input.form.addEventListener('submit', function (event) {
            event.preventDefault();
            applySearch(input.value);
        });
    });
    messages.forEach(function (message) { message.setAttribute('role', 'status'); });
    restoreSearch();
    window.addEventListener('pageshow', restoreSearch);

    var toggles = document.querySelectorAll('[data-contact-toggle]');
    function closeContacts() {
        toggles.forEach(function (button) {
            button.setAttribute('aria-expanded', 'false');
            button.nextElementSibling.classList.remove('is-open');
        });
    }
    toggles.forEach(function (button, index) {
        var card = button.nextElementSibling;
        card.id = 'contact-card-' + index;
        card.tabIndex = -1;
        card.setAttribute('aria-label', card.textContent.trim());
        button.setAttribute('aria-controls', card.id);
        button.setAttribute('aria-haspopup', 'dialog');
        button.addEventListener('click', function () {
            var wasOpen = card.classList.contains('is-open');
            closeContacts();
            if (!wasOpen) {
                card.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
                card.focus();
            }
        });
    });
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.u_nav-contact-wrap')) closeContacts();
    });
    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        var active = Array.from(toggles).find(function (button) {
            return button.getAttribute('aria-expanded') === 'true';
        });
        closeContacts();
        if (active) active.focus();
    });
    window.matchMedia('(max-width: 1000px)').addEventListener('change', closeContacts);

    var dialog = document.getElementById('homepage-dialog');
    document.querySelectorAll('[data-homepage-toggle]').forEach(function (button) {
        button.addEventListener('click', function () {
            closeContacts();
            dialog.showModal();
            dialog.scrollTop = 0;
        });
    });
    dialog.addEventListener('click', function (event) {
        var bounds = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    document.getElementById('homepage-address').addEventListener('click', function () { this.select(); });
}());

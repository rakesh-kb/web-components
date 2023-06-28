class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            if (!confirm('Do you really want to leave this page ?')) {
                event.preventDefault();
            }
        })
    }
}

customElements.define('kb-confirm-link', ConfirmLink, { extends: 'a'});
// modal.js - ES Module for modal dialog functionality

export function openModal(modal) {
    modal.showModal();
    document.body.style.overflow = 'hidden';
}

export function closeModal(modal) {
    modal.close();
    document.body.style.overflow = '';
}

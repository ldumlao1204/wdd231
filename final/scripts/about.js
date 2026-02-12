// about.js - ES Module for About page modal functionality
import { openModal, closeModal } from './modal.js';

const defectDetails = {
    vsd: {
        title: 'Ventricular Septal Defect (VSD)',
        content: `
            <p>A Ventricular Septal Defect is a hole in the septum — the muscular wall that separates the heart's two lower chambers (ventricles). In Tetralogy of Fallot, this hole is typically large.</p>
            <h4>How It Affects the Heart</h4>
            <ul>
                <li>Oxygen-poor blood from the right ventricle mixes with oxygen-rich blood from the left ventricle</li>
                <li>The heart has to work harder to pump enough oxygenated blood to the body</li>
                <li>Over time, this can enlarge the heart and weaken it</li>
            </ul>
            <h4>During Surgery</h4>
            <p>The VSD is closed with a patch, usually made from synthetic material or the patient's own tissue, restoring the normal separation between the ventricles.</p>
        `
    },
    ps: {
        title: 'Pulmonary Stenosis',
        content: `
            <p>Pulmonary Stenosis is a narrowing of the pulmonary valve and/or the area just below or above it. This narrowing restricts the flow of blood from the right ventricle to the lungs.</p>
            <h4>How It Affects the Heart</h4>
            <ul>
                <li>Less blood reaches the lungs to pick up oxygen</li>
                <li>The right ventricle must pump harder to push blood through the narrowed valve</li>
                <li>This is the primary cause of the bluish skin color (cyanosis) seen in ToF patients</li>
            </ul>
            <h4>During Surgery</h4>
            <p>The narrowed pulmonary valve is opened or replaced, and the pathway from the right ventricle to the pulmonary artery is widened to allow normal blood flow to the lungs.</p>
        `
    },
    rvh: {
        title: 'Right Ventricular Hypertrophy',
        content: `
            <p>Right Ventricular Hypertrophy is the abnormal thickening of the muscle wall of the right ventricle. It develops as a consequence of the other defects in ToF.</p>
            <h4>How It Affects the Heart</h4>
            <ul>
                <li>The right ventricle thickens because it works overtime pushing blood through the narrowed pulmonary valve</li>
                <li>A thickened ventricle can become stiff and less efficient at pumping</li>
                <li>If left untreated, it can lead to heart failure over time</li>
            </ul>
            <h4>After Surgery</h4>
            <p>Once the pulmonary stenosis and VSD are repaired, the right ventricle no longer needs to overwork. Over time, the muscle thickness gradually reduces toward normal.</p>
        `
    },
    oa: {
        title: 'Overriding Aorta',
        content: `
            <p>An Overriding Aorta is when the aorta — the main artery carrying oxygen-rich blood to the body — is shifted to the right and sits directly over the ventricular septal defect.</p>
            <h4>How It Affects the Heart</h4>
            <ul>
                <li>The aorta receives blood from both the right and left ventricles instead of just the left</li>
                <li>This means some oxygen-poor blood is sent to the body, contributing to cyanosis</li>
                <li>The body receives less oxygen than it needs</li>
            </ul>
            <h4>During Surgery</h4>
            <p>When the VSD is patched closed, the patch is positioned to direct the left ventricle's oxygen-rich blood into the aorta, effectively correcting the overriding position.</p>
        `
    }
};

function init() {
    const modal = document.getElementById('defect-modal');
    const modalTitle = document.getElementById('defect-modal-title');
    const modalBody = document.getElementById('defect-modal-body');
    const closeBtn = modal.querySelector('.modal-close');

    // Attach click events to all "Learn More" buttons
    const detailButtons = document.querySelectorAll('.detail-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const defectKey = e.target.dataset.defect;
            const defect = defectDetails[defectKey];
            if (defect) {
                modalTitle.textContent = defect.title;
                modalBody.innerHTML = defect.content;
                openModal(modal);
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

init();

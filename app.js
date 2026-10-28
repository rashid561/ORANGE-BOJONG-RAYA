// App Navigation & Router Logic
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    renderStandingsTable();
    renderPengurus('all');
    renderGallery();
    setupFooterLinks();
});

// Navigation Function
function navigateTo(sectionId, subTab = null) {
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    const targetSec = document.getElementById(`section-${sectionId}`);
    if (targetSec) {
        targetSec.classList.add('active');
    }

    if (subTab && sectionId === 'matches') {
        switchMatchTab(subTab);
    }

    if (subTab && sectionId === 'organisasi') {
        filterStructure(subTab);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup Footer Router (Screenshot 7 Interactive Links)
function setupFooterLinks() {
    document.querySelectorAll('.footer-col a[data-target]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            const subtab = link.getAttribute('data-subtab');
            navigateTo(target, subtab);
        });
    });
}

// Countdown Timer Logic
function initCountdown() {
    const matchDate = new Date("2026-11-02T19:00:00").getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const distance = matchDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }
    }, 1000);
}

// Sub Tab Switching (Matches Section)
function switchMatchTab(tabName) {
    document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.sub-tab-content').forEach(content => content.classList.remove('active'));

    const activeContent = document.getElementById(`tab-${tabName}`);
    if (activeContent) activeContent.classList.add('active');

    const activeBtn = Array.from(document.querySelectorAll('.sub-tab-btn')).find(btn => btn.innerText.toLowerCase().includes(tabName));
    if (activeBtn) activeBtn.classList.add('active');
}

// Detail Inner Tabs Switching (Info / Lineups / Statistics)
function switchDetailInnerTab(innerName) {
    document.querySelectorAll('.inner-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.inner-tab-content').forEach(content => content.classList.remove('active'));

    document.getElementById(`inner-${innerName}`).classList.add('active');
    const btn = Array.from(document.querySelectorAll('.inner-tab-btn')).find(b => b.innerText.toLowerCase().includes(innerName));
    if (btn) btn.classList.add('active');
}

// Admin Modal Toggle
function toggleAdminPanel() {
    const modal = document.getElementById('adminModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function switchAdminTab(formId) {
    document.querySelectorAll('.btn-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-form').forEach(f => f.classList.remove('active'));

    document.getElementById(formId).classList.add('active');
}

// Sample Structure Data & Render
const pengurusData = [
    { name: "Ahmad Rizky", role: "Kasub / Ketua", div: "Pengurus Harian", wa: "628123456789" },
    { name: "Budi Santoso", role: "Sekertaris", div: "Pengurus Harian", wa: "628987654321" },
    { name: "Deni Prasetyo", role: "Kepala Humas", div: "Humas & Media", wa: "628111223344" },
    { name: "Eko Wijaya", role: "Koordinator Lapangan", div: "Korlap & Keamanan", wa: "628556677889" },
    { name: "Fajar Pratama", role: "Penanggung Jawab Sport", div: "Divisi OBR Sport", wa: "628990011223" }
];

function filterStructure(division) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const grid = document.getElementById('structure-grid');
    grid.innerHTML = '';

    const filtered = division === 'all' ? pengurusData : pengurusData.filter(p => p.div === division);

    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="pengurus-card">
                <img src="https://via.placeholder.com/90/ff5500/ffffff?text=${p.name.charAt(0)}" class="pengurus-avatar">
                <h4>${p.name}</h4>
                <p style="color:#ff5500; font-size:0.8rem; font-weight:700;">${p.role}</p>
                <p style="color:#aaa; font-size:0.75rem;">${p.div}</p>
            </div>
        `;
    });
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = `
        <div class="info-card">
            <img src="https://via.placeholder.com/300x180/111/ff5500?text=Nobar+Persija+vs+Persik" style="width:100%; border-radius:6px; margin-bottom:10px;">
            <h4>Nobar Akbar Persija vs Persik</h4>
            <p style="font-size:0.8rem; color:#888;">26 Oktober 2026 - Basecamp Bojong Raya</p>
        </div>
    `;
}

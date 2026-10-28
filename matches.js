// Standings Data matching Persija.id screenshot (Screenshot 1)
const standingsData = [
    { rank: 1, club: "Persija Jakarta", logo: "https://via.placeholder.com/25/ff0000/ffffff?text=P", pl: 7, w: 6, d: 0, l: 1, gd: "+11", pts: 18, last5: ["W","W","L","W","W"], isPersija: true },
    { rank: 2, club: "Dewa United Banten Fc", logo: "https://via.placeholder.com/25/ffbb00/000000?text=D", pl: 7, w: 4, d: 2, l: 1, gd: "+2", pts: 14, last5: ["L","W","D","W","W"] },
    { rank: 3, club: "Bali United Fc", logo: "https://via.placeholder.com/25/ff0000/000000?text=B", pl: 7, w: 4, d: 1, l: 2, gd: "+12", pts: 13, last5: ["D","W","L","W","L"] },
    { rank: 4, club: "Persib Bandung", logo: "https://via.placeholder.com/25/0000ff/ffffff?text=P", pl: 7, w: 4, d: 1, l: 2, gd: "+3", pts: 13, last5: ["W","L","W","D","W"] },
    { rank: 5, club: "Madura United", logo: "https://via.placeholder.com/25/ff0000/ffffff?text=M", pl: 7, w: 4, d: 1, l: 2, gd: "+2", pts: 13, last5: ["L","W","D","L","W"] },
    { rank: 6, club: "Persita Tangerang", logo: "https://via.placeholder.com/25/800080/ffffff?text=P", pl: 6, w: 3, d: 3, l: 0, gd: "+3", pts: 12, last5: ["D","W","W","D","W"] },
    { rank: 7, club: "Persebaya Surabaya", logo: "https://via.placeholder.com/25/008000/ffffff?text=P", pl: 7, w: 3, d: 3, l: 1, gd: "+3", pts: 12, last5: ["W","L","D","W","D"] },
    { rank: 8, club: "Bhayangkara Presisi Indonesia Fc", logo: "https://via.placeholder.com/25/ffff00/000000?text=B", pl: 7, w: 2, d: 5, l: 0, gd: "+3", pts: 11, last5: ["D","W","D","D","W"] },
    { rank: 9, club: "Persik Kediri", logo: "https://via.placeholder.com/25/008000/ffffff?text=P", pl: 7, w: 3, d: 1, l: 3, gd: "+2", pts: 10, last5: ["L","W","L","W","D"] },
    { rank: 10, club: "Arema Fc", logo: "https://via.placeholder.com/25/0000ff/ffffff?text=A", pl: 7, w: 2, d: 3, l: 2, gd: "+2", pts: 9, last5: ["W","L","L","D","D"] }
];

function renderStandingsTable() {
    const tbody = document.getElementById('standings-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    standingsData.forEach(row => {
        const last5Badges = row.last5.map(res => `<span class="form-badge ${res}">${res}</span>`).join('');
        const rowClass = row.isPersija ? 'highlight-persija' : '';

        tbody.innerHTML += `
            <tr class="${rowClass}">
                <td><strong>${row.rank}</strong></td>
                <td class="club-cell">
                    <img src="${row.logo}" alt="${row.club}" style="width:22px; height:22px;">
                    <span>${row.club}</span>
                </td>
                <td>${row.pl}</td>
                <td>${row.w}</td>
                <td>${row.d}</td>
                <td>${row.l}</td>
                <td>${row.gd}</td>
                <td><strong>${row.pts}</strong></td>
                <td>${last5Badges}</td>
            </tr>
        `;
    });
}

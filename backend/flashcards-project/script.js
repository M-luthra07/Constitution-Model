// =============================================
// DATA: Fundamental Rights (Articles 12-35)
// =============================================
const fundamentalRights = [
    {
        question: "Right to Equality",
        article: "Articles 14–18",
        answer: "Everyone is equal before the law. Prohibits discrimination based on religion, race, caste, sex, or place of birth. Includes equality of opportunity in public employment.",
        icon: "⚖️",
        color: "#6366f1",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%236366f1' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E⚖️%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Right to Freedom",
        article: "Articles 19–22",
        answer: "Guarantees six freedoms: speech & expression, assembly, association, movement, residence, and profession. Also protects against arbitrary arrest and detention.",
        icon: "🕊️",
        color: "#3b82f6",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%233b82f6' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🕊️%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Right against Exploitation",
        article: "Articles 23–24",
        answer: "Prohibits all forms of forced labour (begar), human trafficking, and child labour. Children under 14 cannot be employed in hazardous occupations.",
        icon: "🛡️",
        color: "#ec4899",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23ec4899' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🛡️%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Right to Freedom of Religion",
        article: "Articles 25–28",
        answer: "Guarantees freedom of conscience and the right to profess, practise, and propagate any religion, subject to public order, morality, and health.",
        icon: "🙏",
        color: "#8b5cf6",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%238b5cf6' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🙏%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Cultural & Educational Rights",
        article: "Articles 29–30",
        answer: "Protects the rights of minorities to conserve their culture, language, and script. Minorities may establish and administer their own educational institutions.",
        icon: "📚",
        color: "#f59e0b",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f59e0b' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E📚%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Right to Constitutional Remedies",
        article: "Article 32",
        answer: "Allows citizens to directly approach the Supreme Court if any Fundamental Right is violated. Dr. B.R. Ambedkar called this the 'heart and soul' of the Constitution.",
        icon: "⚔️",
        color: "#06b6d4",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%2306b6d4' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E⚔️%3C/text%3E%3C/svg%3E"
    }
];

// =============================================
// DATA: Fundamental Duties (Article 51A)
// =============================================
const fundamentalDuties = [
    {
        question: "Uphold the Constitution",
        article: "51A(a)",
        answer: "Every citizen must abide by the Constitution, respect its ideals and institutions, the National Flag, and the National Anthem.",
        icon: "🇮🇳",
        color: "#f97316",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f97316' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🇮🇳%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Cherish Freedom Struggle Ideals",
        article: "51A(b)",
        answer: "Citizens should cherish and follow the noble ideals that inspired the national struggle for freedom from colonial rule.",
        icon: "✊",
        color: "#ef4444",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23ef4444' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E✊%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Protect Sovereignty & Integrity",
        article: "51A(c)",
        answer: "Citizens must uphold and protect the sovereignty, unity, and integrity of India at all times.",
        icon: "🏰",
        color: "#f59e0b",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f59e0b' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🏰%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Defend the Country",
        article: "51A(d)",
        answer: "It is the duty of every citizen to defend the country and render national service when called upon to do so.",
        icon: "💪",
        color: "#dc2626",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23dc2626' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E💪%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Promote Harmony & Brotherhood",
        article: "51A(e)",
        answer: "Citizens must promote harmony and the spirit of common brotherhood amongst all people, transcending religious, linguistic, and regional differences. Renounce practices derogatory to women.",
        icon: "🤝",
        color: "#10b981",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%2310b981' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🤝%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Preserve Our Heritage",
        article: "51A(f)",
        answer: "Citizens must value and preserve the rich composite heritage and diverse culture of our country.",
        icon: "🎭",
        color: "#8b5cf6",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%238b5cf6' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🎭%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Protect the Environment",
        article: "51A(g)",
        answer: "Every citizen must protect and improve the natural environment including forests, lakes, rivers, and wildlife, and have compassion for living creatures.",
        icon: "🌿",
        color: "#059669",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23059669' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🌿%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Develop Scientific Temper",
        article: "51A(h)",
        answer: "Citizens should develop scientific temper, humanism, and the spirit of inquiry and reform.",
        icon: "🔬",
        color: "#0891b2",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%230891b2' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🔬%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Safeguard Public Property",
        article: "51A(i)",
        answer: "Citizens must safeguard public property and abjure violence in all forms.",
        icon: "🏛️",
        color: "#7c3aed",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%237c3aed' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🏛️%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Strive for Excellence",
        article: "51A(j)",
        answer: "Every citizen should strive towards excellence in all spheres of individual and collective activity, so that the nation rises to higher levels of achievement and endeavour.",
        icon: "🚀",
        color: "#06b6d4",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%2306b6d4' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🚀%3C/text%3E%3C/svg%3E"
    },
    {
        question: "Educate Your Children",
        article: "51A(k)",
        answer: "Added by 86th Amendment (2002). Parents and guardians must provide educational opportunities for their children or wards between ages 6 and 14.",
        icon: "👨‍👩‍👧‍👦",
        color: "#ec4899",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23ec4899' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'%3E👨‍👩‍👧‍👦%3C/text%3E%3C/svg%3E"
    }
];

// =============================================
// DOM REFS
// =============================================
const rightsShutter  = document.getElementById('rights-shutter');
const dutiesShutter  = document.getElementById('duties-shutter');
const rightsGrid     = document.getElementById('rights-grid');
const dutiesGrid     = document.getElementById('duties-grid');
const mainContainer  = document.getElementById('main-container');
const progressLabel  = document.getElementById('progress-label');
const rightsClose    = document.getElementById('rights-close');
const dutiesClose    = document.getElementById('duties-close');
const toast          = document.getElementById('progress-toast');
const toastText      = document.getElementById('toast-text');

// =============================================
// STATE
// =============================================
let currentSection = null; // 'rights' | 'duties' | null
let flippedCards   = { rights: new Set(), duties: new Set() };
let toastTimer     = null;

// =============================================
// BUILD FLASHCARDS
// =============================================
function createFlashcards(data, container, prefix) {
    container.innerHTML = '';
    data.forEach((cardData, index) => {
        const card = document.createElement('div');
        card.className = `card ${prefix}-card-${index}`;
        card.setAttribute('id', `card-${prefix}-${index}`);
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Card: ${cardData.question}`);
        card.style.setProperty('--card-color', cardData.color);

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-image-wrapper">
                        <img src="${cardData.image}" alt="${cardData.question}" class="card-image" />
                        <div class="card-overlay"></div>
                    </div>
                    <span class="card-num">#${String(index + 1).padStart(2, '0')}</span>
                    <div class="card-title">${cardData.question}</div>
                    <span class="article-tag">${cardData.article}</span>
                    <div class="flip-hint">Tap to reveal</div>
                </div>
                <div class="card-back">
                    <div class="card-back-icon">${cardData.icon}</div>
                    <p>${cardData.answer}</p>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('flipped');
            if (card.classList.contains('flipped')) {
                flippedCards[prefix].add(index);
            } else {
                flippedCards[prefix].delete(index);
            }
            updateProgress(prefix, data.length);
        });

        container.appendChild(card);
    });
}

// =============================================
// PROGRESS / TOAST
// =============================================
function updateProgress(prefix, total) {
    const flipped = flippedCards[prefix].size;
    const label = prefix === 'rights' ? 'Fundamental Rights' : 'Fundamental Duties';
    progressLabel.textContent = `${label}: ${flipped}/${total} cards flipped`;

    toastText.textContent = `${flipped} / ${total} cards revealed`;
    toast.classList.add('visible');

    clearTimeout(toastTimer);
    if (flipped < total) {
        toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
    }
}

// =============================================
// OPEN / CLOSE SHUTTERS
// =============================================
function openShutter(which) {
    currentSection = which;
    mainContainer.classList.add('has-open');

    if (which === 'rights') {
        rightsShutter.classList.add('open');
        rightsShutter.classList.remove('shrunk');
        dutiesShutter.classList.remove('open');
        dutiesShutter.classList.add('shrunk');
    } else {
        dutiesShutter.classList.add('open');
        dutiesShutter.classList.remove('shrunk');
        rightsShutter.classList.remove('open');
        rightsShutter.classList.add('shrunk');
    }

    const total = which === 'rights' ? fundamentalRights.length : fundamentalDuties.length;
    progressLabel.textContent = which === 'rights'
        ? `Fundamental Rights: 0/${total} cards flipped`
        : `Fundamental Duties: 0/${total} cards flipped`;
}

function closeShutter(which) {
    currentSection = null;
    mainContainer.classList.remove('has-open');

    if (which === 'rights') {
        rightsShutter.classList.remove('open', 'shrunk');
        dutiesShutter.classList.remove('shrunk');
    } else {
        dutiesShutter.classList.remove('open', 'shrunk');
        rightsShutter.classList.remove('shrunk');
    }

    progressLabel.textContent = 'Select a section';
    toast.classList.remove('visible');

    // Reset flipped state for the closed section
    flippedCards[which].clear();
}

// =============================================
// EVENT LISTENERS
// =============================================

// Click on the Fundamental Rights shutter label area
rightsShutter.addEventListener('click', (e) => {
    if (rightsShutter.classList.contains('open')) return;
    openShutter('rights');
});

// Click on the Fundamental Duties shutter label area
dutiesShutter.addEventListener('click', (e) => {
    if (dutiesShutter.classList.contains('open')) return;
    openShutter('duties');
});

// Close buttons
rightsClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeShutter('rights');
});

dutiesClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeShutter('duties');
});

// Click on the shrunk shutter to swap
dutiesShutter.addEventListener('click', (e) => {
    if (dutiesShutter.classList.contains('shrunk')) {
        e.stopPropagation();
        openShutter('duties');
    }
});

rightsShutter.addEventListener('click', (e) => {
    if (rightsShutter.classList.contains('shrunk')) {
        e.stopPropagation();
        openShutter('rights');
    }
});

// Keyboard: Escape to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentSection) {
        closeShutter(currentSection);
    }
});

// =============================================
// INIT
// =============================================
createFlashcards(fundamentalRights, rightsGrid, 'rights');
createFlashcards(fundamentalDuties, dutiesGrid, 'duties');

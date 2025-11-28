// --- Data for Flashcards ---

const fundamentalRights = [
    { question: "Right to Equality (Articles 14-18)", answer: "Ensures everyone is equal before the law. Prohibits discrimination based on religion, race, caste, sex, or place of birth." },
    { question: "Right to Freedom (Articles 19-22)", answer: "Guarantees freedom of speech, expression, assembly, movement, and the right to practice any profession." },
    { question: "Right against Exploitation (Articles 23-24)", answer: "Prohibits all forms of forced labor, human trafficking, and the employment of children under 14 in dangerous jobs." },
    { question: "Right to Freedom of Religion (Articles 25-28)", answer: "Guarantees every person the freedom to practice, profess, and spread their own religion or beliefs." },
    { question: "Cultural and Educational Rights (Articles 29-30)", answer: "Protects the rights of minorities to conserve their culture, language, and script, and to establish their own educational institutions." },
    { question: "Right to Constitutional Remedies (Article 32)", answer: "Allows citizens to go directly to the Supreme Court to seek justice if their fundamental rights are violated. It's the 'guardian' of all other rights." }
];

const fundamentalDuties = [
    { question: "Uphold the Constitution", answer: "To respect the Constitution, its ideals, the National Flag, and the National Anthem." },
    { question: "Cherish Freedom Struggle Ideals", answer: "To follow the noble ideals that inspired India's fight for freedom." },
    { question: "Protect India's Sovereignty & Integrity", answer: "To uphold and protect the sovereignty, unity, and integrity of India." },
    { question: "Defend the Country", answer: "To be ready to defend the nation and perform national service when required." },
    { question: "Promote Harmony & Brotherhood", answer: "To promote a spirit of common brotherhood amongst all Indians and respect the dignity of women." },
    { question: "Preserve Our Culture", answer: "To value and preserve the rich and diverse heritage of our country." },
    { question: "Protect the Environment", answer: "To protect our natural environment, including forests, lakes, rivers, and wildlife." },
    { question: "Develop Scientific Temper", answer: "To develop a spirit of inquiry, humanism, and scientific thinking." },
    { question: "Safeguard Public Property", answer: "To protect public property and renounce violence." },
    { question: "Strive for Excellence", answer: "To aim for excellence in all individual and group activities." },
    { question: "Educate Children", answer: "A duty for parents/guardians to provide educational opportunities for their children between the ages of 6 and 14." }
];


// --- Get Elements from the DOM ---

const rightsShutter = document.getElementById('rights-shutter');
const dutiesShutter = document.getElementById('duties-shutter');
const rightsContainer = document.getElementById('rights-flashcards');
const dutiesContainer = document.getElementById('duties-flashcards');

const colors = ['card-blue', 'card-orange', 'card-green'];

// --- Functions ---

function createFlashcards(data, container) {
    data.forEach((cardData, index) => {
        const cardDiv = document.createElement("div");
        const colorClass = colors[index % colors.length];
        cardDiv.classList.add("card", colorClass);

        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${cardData.question}</div>
                <div class="card-back">${cardData.answer}</div>
            </div>
        `;
        
        cardDiv.addEventListener("click", (event) => {
            // This stops the click from bubbling up to the shutter, so clicking a card doesn't close the view
            event.stopPropagation();
            cardDiv.classList.toggle("flipped");
        });

        container.appendChild(cardDiv);
    });
}

// --- Event Listeners for Shutters ---

rightsShutter.addEventListener('click', () => {
    // If the shutter is already open, clicking it again will close it.
    if (rightsShutter.classList.contains('open')) {
        rightsShutter.classList.remove('open');
        return; // Stop the function here to prevent re-opening
    }
    
    // If it's closed, open it and ensure the other one is closed.
    rightsShutter.classList.add('open');
    dutiesShutter.classList.remove('open');
});

dutiesShutter.addEventListener('click', () => {
    // If the shutter is already open, clicking it again will close it.
    if (dutiesShutter.classList.contains('open')) {
        dutiesShutter.classList.remove('open');
        return; // Stop the function here to prevent re-opening
    }

    // If it's closed, open it and ensure the other one is closed.
    dutiesShutter.classList.add('open');
    rightsShutter.classList.remove('open');
});

// --- Initial Setup ---
// Create the flashcards and place them in their respective containers when the page loads
createFlashcards(fundamentalRights, rightsContainer);
createFlashcards(fundamentalDuties, dutiesContainer);

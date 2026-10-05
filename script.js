/* =========================================================
   EDITH — FINAL INTERACTIVE TEACHING ENGINE
   ========================================================= */


/* =========================================================
   DATA
   ========================================================= */

const problemData = {

    audio: {
        name: "No Sound",
        icon: "🔊",

        concept:
            "Your computer can produce sound through several layers: the application, operating system, selected output device and physical audio hardware. A problem at any layer can make it appear that the computer has no sound.",

        diagnose:
            "We will start with the simplest safe possibility: whether the correct audio output device is selected and whether the system reports normal audio status.",

        task:
            "Check the device's sound output settings. Look at which output device is selected and whether the system shows the volume as muted.",

        expected:
            "You should be able to identify the selected output device and whether the system considers audio muted.",

        next:
            "If the output device and volume are normal, the next lesson can investigate whether the issue is limited to a particular application.",

        keywordsCorrect: [
            "normal",
            "correct",
            "not muted",
            "unmuted",
            "speaker",
            "headphone",
            "output",
            "working"
        ]
    },


    wifi: {
        name: "Wi-Fi Problem",
        icon: "📶",

        concept:
            "A Wi-Fi connection involves your device, the wireless network and the internet connection behind that network. Your device can appear connected to Wi-Fi while the internet itself is unavailable.",

        diagnose:
            "We first want to separate a device-specific problem from a network-wide problem.",

        task:
            "Check whether another device connected to the same Wi-Fi network can access a normal website.",

        expected:
            "If another device works normally, the problem may be specific to the first device. If multiple devices fail, the network or internet connection may be involved.",

        next:
            "The next lesson will focus on the branch suggested by your observation.",

        keywordsCorrect: [
            "works",
            "working",
            "connects",
            "connected",
            "internet",
            "another device",
            "other device"
        ]
    },


    display: {
        name: "Display Problem",
        icon: "🖥️",

        concept:
            "A display problem can come from brightness settings, display configuration, software or the connection between the device and its display hardware.",

        diagnose:
            "We begin with safe software-level observations before considering anything physical.",

        task:
            "Check whether the display brightness controls respond normally and whether the operating system recognizes the display.",

        expected:
            "You should be able to determine whether the display responds to normal software controls.",

        next:
            "If software controls respond normally, the next step can narrow down whether the issue is application-specific or hardware-related.",

        keywordsCorrect: [
            "brightness",
            "display",
            "screen",
            "normal",
            "responds",
            "working",
            "recognized"
        ]
    },


    charging: {
        name: "Charging Problem",
        icon: "🔋",

        concept:
            "Charging depends on the power source, charger, cable, charging port and the device's internal power-management system. We should begin with safe external observations.",

        diagnose:
            "We will avoid opening the device or handling internal components. The first goal is to understand whether the device detects an external power connection.",

        task:
            "Check the charging indicator shown by the device when the charger is connected normally. Do not force connectors or inspect exposed electrical parts.",

        expected:
            "The device should normally show some indication that external power has been detected.",

        next:
            "If the device does not detect power normally, further physical troubleshooting should be handled cautiously and may require qualified assistance.",

        keywordsCorrect: [
            "charging",
            "connected",
            "detected",
            "battery",
            "power",
            "indicator"
        ]
    },


    keyboard: {
        name: "Keyboard Problem",
        icon: "⌨️",

        concept:
            "Keyboard input travels from the physical keys through the operating system to the application receiving the input. A problem can therefore be limited to one application or affect the whole system.",

        diagnose:
            "We can safely determine whether the problem affects a single application or the entire operating system.",

        task:
            "Open a simple text field and test several ordinary keys. Compare the result with the application where the problem was first noticed.",

        expected:
            "If keys work in one place but not another, the problem may be application-specific.",

        next:
            "The next lesson can investigate the branch indicated by your observation.",

        keywordsCorrect: [
            "works",
            "working",
            "keys",
            "keyboard",
            "typing",
            "text",
            "respond"
        ]
    },


    overheating: {
        name: "Overheating",
        icon: "🌡️",

        concept:
            "Electronic devices generate heat during operation. Higher workloads can increase heat production, while blocked airflow or unusual software activity can prevent heat from being managed effectively.",

        diagnose:
            "We begin by identifying whether the device is under unusual workload and whether normal airflow is available.",

        task:
            "Check whether the device is running an unusually demanding application and whether its normal ventilation areas are unobstructed. Do not touch unusually hot components.",

        expected:
            "You should be able to identify whether an obvious workload or airflow condition is present.",

        next:
            "If the device is extremely hot, behaving unexpectedly or showing a warning, stop using it and seek qualified assistance rather than continuing physical troubleshooting.",

        keywordsCorrect: [
            "normal",
            "airflow",
            "vent",
            "workload",
            "application",
            "temperature",
            "hot"
        ]
    },


    startup: {
        name: "Startup Problem",
        icon: "⚡",

        concept:
            "Starting a device involves power delivery, firmware, the operating system and hardware initialization. A device that does not start can fail at different stages of this process.",

        diagnose:
            "We first need to determine whether the device shows any normal signs of power or startup activity.",

        task:
            "Observe the device during a normal startup attempt. Note whether you see lights, sounds, a logo, an error message or a completely inactive state.",

        expected:
            "The exact symptom helps us determine which part of the startup process needs further investigation.",

        next:
            "The next lesson will depend on the startup symptom you observed.",

        keywordsCorrect: [
            "light",
            "logo",
            "sound",
            "message",
            "starts",
            "startup",
            "power"
        ]
    }
};


const levelData = {

    beginner: {
        name: "Beginner",

        intro:
            "I'll explain the technical ideas in simple language and avoid assuming that you already know the terminology.",

        style:
            "simple"
    },

    intermediate: {
        name: "Some Experience",

        intro:
            "I'll give you the important reasoning while keeping the explanations practical and moderately technical.",

        style:
            "balanced"
    },

    advanced: {
        name: "Experienced",

        intro:
            "I'll keep the explanations concise and focus more on diagnostic reasoning and system behavior.",

        style:
            "technical"
    }
};


/* =========================================================
   SESSION STATE
   ========================================================= */

const session = {

    level: null,
    problem: null,

    stage: 0,

    observationCount: 0,

    completed: false,

    learned: [],

    history: []
};


const stageNames = [
    "Understand",
    "Diagnose",
    "Learn",
    "Task",
    "Observe",
    "Verify",
    "Adapt"
];


/* =========================================================
   DOM
   ========================================================= */

const setupPanel = document.getElementById("setupPanel");
const chatPanel = document.getElementById("chatPanel");
const chatMessages = document.getElementById("chatMessages");

const actionArea = document.getElementById("actionArea");

const observationArea = document.getElementById("observationArea");
const observationInput = document.getElementById("observationInput");
const submitObservation = document.getElementById("submitObservation");

const completionPanel = document.getElementById("completionPanel");
const completionText = document.getElementById("completionText");
const summaryCards = document.getElementById("summaryCards");

const sessionTitle = document.getElementById("sessionTitle");

const selectedProblemLabel =
    document.getElementById("selectedProblemLabel");

const selectedLevelLabel =
    document.getElementById("selectedLevelLabel");

const progressFill =
    document.getElementById("progressFill");

const progressStage =
    document.getElementById("progressStage");

const stages =
    document.querySelectorAll(".stage");


/* =========================================================
   BUTTON SELECTION
   ========================================================= */

document.querySelectorAll(".choice-button").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".choice-button")
            .forEach(item => item.classList.remove("selected"));

        button.classList.add("selected");

        session.level = button.dataset.level;

        selectedLevelLabel.textContent =
            levelData[session.level].name;

        checkSetup();

    });

});


document.querySelectorAll(".problem-button").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".problem-button")
            .forEach(item => item.classList.remove("selected"));

        button.classList.add("selected");

        session.problem = button.dataset.problem;

        selectedProblemLabel.textContent =
            problemData[session.problem].name;

        checkSetup();

    });

});


/* =========================================================
   START SESSION
   ========================================================= */

function checkSetup() {

    if (session.level && session.problem) {

        startSession();

    }
}


function startSession() {

    session.stage = 0;
    session.observationCount = 0;
    session.completed = false;

    session.learned = [];
    session.history = [];

    setupPanel.classList.add("hidden");

    chatPanel.classList.remove("hidden");

    completionPanel.classList.add("hidden");

    sessionTitle.textContent =
        problemData[session.problem].name;

    chatMessages.innerHTML = "";

    updateProgress();

    const level = levelData[session.level];
    const problem = problemData[session.problem];

    addEdithMessage(
        `Hello. I'm EDITH. Let's learn how to understand <strong>${problem.name.toLowerCase()}</strong> together.`
    );

    setTimeout(() => {

        addEdithMessage(
            level.intro
        );

    }, 350);

    setTimeout(() => {

        advanceToDiagnose();

    }, 750);
}


/* =========================================================
   STAGE 1 — UNDERSTAND
   ========================================================= */

function advanceToDiagnose() {

    session.stage = 1;

    updateProgress();

    const problem = problemData[session.problem];

    addEdithMessage(
        `<strong>First, let's understand the problem.</strong><br><br>${problem.diagnose}`
    );

    setActionButtons([
        {
            label: "I understand",
            action: () => advanceToLearn()
        }
    ]);
}


/* =========================================================
   STAGE 2 — LEARN
   ========================================================= */

function advanceToLearn() {

    session.stage = 2;

    updateProgress();

    const problem = problemData[session.problem];

    session.learned.push(
        `Understanding ${problem.name}`
    );

    addEdithMessage(
        `<strong>Let's learn why this can happen.</strong><br><br>${problem.concept}`
    );

    setActionButtons([
        {
            label: "Teach me the task",
            action: () => advanceToTask()
        },

        {
            label: "Explain that more simply",
            action: () => {

                addEdithMessage(
                    getSimplifiedExplanation(problem)
                );

            }
        }
    ]);
}


/* =========================================================
   STAGE 3 — TASK
   ========================================================= */

function advanceToTask() {

    session.stage = 3;

    updateProgress();

    const problem = problemData[session.problem];

    addEdithMessage(
        `<strong>Your task:</strong><br><br>${problem.task}<br><br><span style="color:#64748b;">What we're looking for:</span> ${problem.expected}`
    );

    setActionButtons([
        {
            label: "I've checked it",
            action: () => showObservationInput()
        },

        {
            label: "I'm not sure what to look for",
            action: () => {

                addEdithMessage(
                    `<strong>No problem.</strong><br><br>${getObservationHelp(problem)}`
                );

            }
        }
    ]);
}


/* =========================================================
   STAGE 4 — OBSERVE
   ========================================================= */

function showObservationInput() {

    session.stage = 4;

    updateProgress();

    actionArea.innerHTML = "";

    observationArea.classList.remove("hidden");

    observationInput.value = "";

    observationInput.focus();

    addEdithMessage(
        `<strong>Now tell me what you observed.</strong><br><br>There is no need to use technical words. Describe what you saw in your own words.`
    );
}


submitObservation.addEventListener("click", processObservation);


observationInput.addEventListener("keydown", event => {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        processObservation();

    }

});


/* =========================================================
   OBSERVATION PROCESSING
   ========================================================= */

function processObservation() {

    const observation =
        observationInput.value.trim();

    if (!observation) {

        addEdithMessage(
            "Please tell me what you observed. Even a short description is enough."
        );

        return;
    }

    session.observationCount++;

    session.history.push(observation);

    observationArea.classList.add("hidden");

    addUserMessage(
        observation
    );

    setTimeout(() => {

        evaluateObservation(observation);

    }, 450);
}


/* =========================================================
   EVALUATE OBSERVATION
   ========================================================= */

function evaluateObservation(observation) {

    session.stage = 5;

    updateProgress();

    const normalized =
        observation.toLowerCase();

    const problem =
        problemData[session.problem];

    const matches =
        problem.keywordsCorrect.some(
            keyword => normalized.includes(keyword)
        );

    const uncertainWords = [
        "don't know",
        "not sure",
        "unsure",
        "cannot tell",
        "can't tell",
        "confused",
        "maybe"
    ];

    const uncertain =
        uncertainWords.some(
            word => normalized.includes(word)
        );


    if (uncertain) {

        handleUncertainObservation(problem);

    } else if (matches) {

        handleUsefulObservation(problem);

    } else {

        handleUnexpectedObservation(problem);

    }
}


/* =========================================================
   CORRECT / USEFUL
   ========================================================= */

function handleUsefulObservation(problem) {

    addEdithMessage(
        `<strong>Good observation.</strong><br><br>Your result gives us useful information. This is exactly why EDITH asks you to observe the result instead of blindly following a checklist.`
    );

    setTimeout(() => {

        addEdithMessage(
            `<strong>What this tells us:</strong><br><br>${problem.next}`
        );

    }, 350);

    setActionButtons([
        {
            label: "Continue to next lesson",
            action: () => advanceToAdapt()
        }
    ]);
}


/* =========================================================
   UNCERTAIN
   ========================================================= */

function handleUncertainObservation(problem) {

    addEdithMessage(
        `<strong>That's okay.</strong><br><br>Not knowing what to look for is useful information too. It tells me that we should slow down and make the observation easier.`
    );

    setTimeout(() => {

        addEdithMessage(
            `<strong>Try this:</strong><br><br>${getObservationHelp(problem)}`
        );

    }, 350);

    setActionButtons([
        {
            label: "I'll check again",
            action: () => showObservationInput()
        }
    ]);
}


/* =========================================================
   UNEXPECTED
   ========================================================= */

function handleUnexpectedObservation(problem) {

    addEdithMessage(
        `<strong>Interesting.</strong><br><br>That result is different from the simple path we expected. That's not a failure — it gives us new information about the problem.`
    );

    setTimeout(() => {

        addEdithMessage(
            `<strong>EDITH is adapting.</strong><br><br>Instead of repeating the same instruction, we'll use your observation to narrow down the next possibility.`
        );

    }, 350);

    setActionButtons([
        {
            label: "Show me the next check",
            action: () => advanceToAdapt()
        }
    ]);
}


/* =========================================================
   STAGE 7 — ADAPT
   ========================================================= */

function advanceToAdapt() {

    session.stage = 6;

    updateProgress();

    const problem = problemData[session.problem];

    addEdithMessage(
        `<strong>Adaptation complete.</strong><br><br>Based on what you observed, EDITH would now choose a more specific troubleshooting path instead of giving you the same generic instructions.`
    );

    setTimeout(() => {

        addEdithMessage(
            `<strong>What you learned:</strong><br><br>${problem.concept}`
        );

    }, 350);

    setActionButtons([
        {
            label: "Complete this learning session",
            action: () => completeSession()
        }
    ]);
}


/* =========================================================
   COMPLETE
   ========================================================= */

function completeSession() {

    session.completed = true;

    session.stage = 6;

    updateProgress();

    chatPanel.classList.add("hidden");

    completionPanel.classList.remove("hidden");

    const problem =
        problemData[session.problem];

    const level =
        levelData[session.level];

    completionText.innerHTML =
        `You completed an EDITH learning session for <strong>${problem.name}</strong> at the <strong>${level.name}</strong> level. EDITH used your observation as part of the next decision instead of simply showing a fixed repair checklist.`;

    summaryCards.innerHTML = `

        <div class="summary-card">
            <span>Problem</span>
            <strong>${problem.icon} ${problem.name}</strong>
        </div>

        <div class="summary-card">
            <span>Learner</span>
            <strong>${level.name}</strong>
        </div>

        <div class="summary-card">
            <span>Observations</span>
            <strong>${session.observationCount}</strong>
        </div>

        <div class="summary-card">
            <span>Core Idea</span>
            <strong>Understand before acting</strong>
        </div>

        <div class="summary-card">
            <span>Learning Loop</span>
            <strong>Observe → Verify → Adapt</strong>
        </div>

        <div class="summary-card">
            <span>Next Goal</span>
            <strong>Apply the reasoning to another problem</strong>
        </div>
    `;
}


/* =========================================================
   RESTART
   ========================================================= */

document.getElementById("restartButton")
    .addEventListener("click", () => {

        session.level = null;
        session.problem = null;
        session.stage = 0;

        document
            .querySelectorAll(".choice-button")
            .forEach(button =>
                button.classList.remove("selected")
            );

        document
            .querySelectorAll(".problem-button")
            .forEach(button =>
                button.classList.remove("selected")
            );

        selectedProblemLabel.textContent =
            "Not selected";

        selectedLevelLabel.textContent =
            "Not selected";

        completionPanel.classList.add("hidden");

        setupPanel.classList.remove("hidden");

        sessionTitle.textContent =
            "Start a repair learning session";

        updateProgress();

        document
            .getElementById("learn")
            .scrollIntoView({
                behavior: "smooth"
            });
    });


/* =========================================================
   ACTION BUTTONS
   ========================================================= */

function setActionButtons(buttons) {

    actionArea.innerHTML = "";

    if (!buttons || buttons.length === 0) {
        return;
    }

    const title =
        document.createElement("div");

    title.className =
        "action-title";

    title.textContent =
        "EDITH ACTION";

    actionArea.appendChild(title);


    const container =
        document.createElement("div");

    container.className =
        "action-buttons";


    buttons.forEach(item => {

        const button =
            document.createElement("button");

        button.className =
            "action-button";

        button.textContent =
            item.label;

        button.addEventListener(
            "click",
            item.action
        );

        container.appendChild(button);

    });


    actionArea.appendChild(container);
}


/* =========================================================
   CHAT MESSAGE
   ========================================================= */

function addEdithMessage(message) {

    const element =
        document.createElement("div");

    element.className =
        "message edith";

    element.innerHTML = `
        <div class="message-label">
            EDITH
        </div>

        <p>${message}</p>
    `;

    chatMessages.appendChild(element);

    scrollChat();
}


function addUserMessage(message) {

    const element =
        document.createElement("div");

    element.className =
        "message user";

    element.innerHTML = `
        <div class="message-label">
            YOU
        </div>

        <p>${escapeHTML(message)}</p>
    `;

    chatMessages.appendChild(element);

    scrollChat();
}


function scrollChat() {

    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: "smooth"
    });
}


/* =========================================================
   HELPERS
   ========================================================= */

function getSimplifiedExplanation(problem) {

    const simpleMap = {

        audio:
            "Think of sound like a chain: an app creates the sound, the operating system sends it to an output device, and that device produces what you hear. We are checking where that chain may be interrupted.",

        wifi:
            "Think of Wi-Fi as a path from your device to the internet. We want to find out whether the path is broken only for your device or for everyone using the same network.",

        display:
            "Think of the display as the part of the computer that shows information to you. First we check whether the computer can control the screen normally before considering more complicated causes.",

        charging:
            "Think of charging as a connection that lets the device receive power and manage its battery. We first check whether the device can detect that power connection safely.",

        keyboard:
            "Think of the keyboard as a way of sending input to the computer. We want to know whether the keys fail everywhere or only inside one program.",

        overheating:
            "Think of heat as something the device constantly produces and removes. Heavy work can create more heat, while poor airflow can make it harder to remove.",

        startup:
            "Starting a computer is a sequence: power becomes available, the device initializes its hardware, and then the operating system starts. The symptom tells us where that sequence may stop."
    };

    return `<strong>In simpler words:</strong><br><br>${simpleMap[session.problem]}`;
}


function getObservationHelp(problem) {

    return `Look specifically for this: <strong>${problem.expected}</strong><br><br>You don't need to identify the cause yet. Just describe what you can see, hear or observe.`;
}


function updateProgress() {

    const stageNumber =
        session.stage + 1;

    progressStage.textContent =
        stageNumber;

    progressFill.style.width =
        `${(stageNumber / 7) * 100}%`;


    stages.forEach((stage, index) => {

        stage.classList.remove("active");
        stage.classList.remove("completed");

        if (index < session.stage) {

            stage.classList.add("completed");

        } else if (index === session.stage) {

            stage.classList.add("active");

        }

    });
}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".problem-card, .future-card, .usecase-card, .workflow-item"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(15px)";
    element.style.transition =
        "opacity 0.5s ease, transform 0.5s ease";

    observer.observe(element);

});


/* =========================================================
   SAFETY DETECTION
   ========================================================= */

const unsafeWords = [
    "exposed wire",
    "sparks",
    "smoke",
    "burning",
    "swollen battery",
    "leaking battery",
    "electric shock",
    "mains",
    "high voltage"
];


function safetyCheck(text) {

    const normalized =
        text.toLowerCase();

    return unsafeWords.some(
        word => normalized.includes(word)
    );
}


/*
   If an unsafe observation is entered, stop the
   interactive troubleshooting path.
*/

const originalProcessObservation =
    processObservation;

processObservation = function () {

    const observation =
        observationInput.value.trim();

    if (safetyCheck(observation)) {

        observationArea.classList.add("hidden");

        addUserMessage(observation);

        addEdithMessage(
            `<strong>Safety stop.</strong><br><br>Your observation may indicate a situation that should not be handled through ordinary DIY troubleshooting. Please stop the procedure and seek help from a qualified adult or trained technician. EDITH will not guide you through a potentially dangerous repair.`
        );

        actionArea.innerHTML = "";

        return;
    }

    originalProcessObservation();

};


/* =========================================================
   INITIAL STATE
   ========================================================= */

updateProgress();
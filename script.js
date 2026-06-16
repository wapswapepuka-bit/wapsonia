function toggleMenu(){
    document.getElementById("sideMenu").classList.toggle("active");
    
    document.querySelector(".overlay").classList.toggle("active");
}

document.querySelectorAll('.side-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('sideMenu').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    });
});
function toggleTopic(id){
    let box = document.getElementById(id);
    box.classList.toggle("active");
}


let isSubmitted = false;

const submitBtn = document.querySelector(".submit-btn");

// start disabled
submitBtn.disabled = true;
submitBtn.style.opacity = "0.5";

// attach listeners
document.querySelectorAll("input[type=radio]").forEach(input => {
    input.addEventListener("change", checkCompletion);
});

function checkCompletion() {
    if (isSubmitted) return;

    let totalQuestions = 10;
    let answered = 0;

    for (let i = 1; i <= totalQuestions; i++) {
        if (document.querySelector(`input[name="q${i}"]:checked`)) {
            answered++;
        }
    }

    if (answered === totalQuestions) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5";
    }
}

function submitQuiz() {
    if (isSubmitted) return;

    console.log("quiz submitted");

    let score = 0;

    let answers = {
        q1: "B",
        q2: "C",
        q3: "C",
        q4: "B",
        q5: "C",
        q6: "A",
        q7: "B",
        q8: "C",
        q9: "B",
        q10: "B"
    };

    let total = Object.keys(answers).length;

    for (let q in answers) {
        let selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === answers[q]) {
            score++;
        }
    }

    let percent = (score / total) * 100;

    let resultBar = document.getElementById("result-bar");

    resultBar.innerHTML = "Your Score: " + percent + "%";
    resultBar.style.opacity = "1";

    if (percent >= 80) {
        resultBar.style.background = "#28a745";
    } else if (percent >= 50) {
        resultBar.style.background = "#ff9800";
    } else {
        resultBar.style.background = "#dc3545";
    }
    
    // clear previous states
document.querySelectorAll(".option").forEach(option => {
    option.classList.remove("correct", "wrong");
});

// show correct + wrong answers
for (let q in answers) {

    let correctValue = answers[q];

    let correctOption = document.querySelector(
        `input[name="${q}"][value="${correctValue}"]`
    ).parentElement;

    correctOption.classList.add("correct");

    let selected = document.querySelector(`input[name="${q}"]:checked`);

    if (selected) {
        let selectedOption = selected.parentElement;

        if (selected.value !== correctValue) {
            selectedOption.classList.add("wrong");
        }
    }
}

    // LOCK SYSTEM
    isSubmitted = true;

    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    submitBtn.innerText = "Submitted";

    document.querySelectorAll("input[type=radio]").forEach(input => {
        input.disabled = true;
    });
}
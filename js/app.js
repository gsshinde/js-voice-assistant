const listenBtn = document.querySelector('#listen-now');
const listenText = document.querySelector('.listening');
const messageBox = document.querySelector('.message-box');
const _switch = document.querySelector('#toggler-switch');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
let recognizing = false;

const greetings = [
    'I am good, how about you?',
    'Doing good, Thank you!',
    'Leave me alone, please'
];

const amgood = [
    'Good to hear that, what can i do for you?'
];

recognition.onstart = function() {
    recognizing = true;
}

recognition.onresult = function(e) {
    const current = e.resultIndex;
    const msg = e.results[current][0].transcript;
    listenBtn.classList.toggle('blob');
    listenText.classList.toggle('show-listening');
    recognizing = false;
    let d = new Date();
    let ampm = d.getHours() > 12 ? 'PM' : 'AM';
    let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    messageBox.innerHTML += "<div class='actual-msg'><span>" + msg + "<strong>" + time + "" + ampm + "</strong></span></div>";
    messageBox.style.display = 'block';
    readVoiceText(msg);
}

onClickListenBtn = () => {
    listenBtn.addEventListener('click', function(e) {
        listenBtn.classList.toggle('blob');
        listenText.classList.toggle('show-listening');
        if (!recognizing) {
            recognition.start();
        } else {
            recognition.stop();
        }
    });
}

function readVoiceText(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.text = 'Sorry, i didnt understand this, but i found something on google!';

    if (message.includes('how are you')) {
        const AI_msg = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = AI_msg;
    }

    if (message.includes('I am good') || message.includes('I am also good')) {
        const AI_msg = amgood[0];
        speech.text = AI_msg;
    }

    if (message.includes('dark mode')) {
        if (_switch.checked) {
            const AI_msg = 'Sorry, but dark mode is already enabled';
            speech.text = AI_msg;
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            _switch.checked = true;
            const AI_msg = 'Dark mode is enabled';
            speech.text = AI_msg;
        }
    }

    if (message.includes('light mode')) {
        if (_switch.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            _switch.checked = false;
            const AI_msg = 'Light mode is enabled';
            speech.text = AI_msg;
        } else {
            const AI_msg = 'Sorry, but light mode is already enabled';
            speech.text = AI_msg;
        }
    }

    if (message.includes('hello') || message.includes('hi')) {
        const AI_msg = 'Hi, my name is Z24, how can i help you?';
        speech.text = AI_msg;
    }

    let d = new Date();
    let ampm = d.getHours() > 12 ? 'PM' : 'AM';
    let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    if (message.includes('time') || message.includes('what is current time') || message.includes('what time is it')) {
        const AI_msg = time + ampm;
        speech.text = AI_msg;
    }

    if (message.includes('what can you do') || message.includes('how can you help me')) {
        const AI_msg = 'I am just a basic voice assistant, my creator is still working on me';
        speech.text = AI_msg;
    }

    if (message.includes('how old are you')) {
        const AI_msg = 'My creator launched me today, so i am too young';
        speech.text = AI_msg;
    }

    if (message.includes('you are so boring')) {
        const AI_msg = 'Sorry to hear that, but i am improving';
        speech.text = AI_msg;
    }

    if (message.includes('are you like Siri') || message.includes('are you like Google')) {
        const AI_msg = 'Oh please stop, i am your new assistant';
        speech.text = AI_msg;
    }

    if (message.includes('who is your father')) {
        const AI_msg = 'The engineers are my family, we are very close';
        speech.text = AI_msg;
    }

    if (message.includes('Siri is best') || message.includes('Google is best')) {
        const AI_msg = 'Its not fare, i am newbee';
        speech.text = AI_msg;
    }

    if (message.includes('tell me a joke')) {
        const AI_msg = 'I dont remember it now, my jokes are not that much funny';
        speech.text = AI_msg;
    }

    if (speech.text.includes('Sorry, i didnt understand this, but i found something on google!')) {
        window.open('http://google.com/search?q=' + message);
    }

    messageBox.innerHTML += "<div class='replied-msg'><span><strong>" + time + "" + ampm + "</strong>" + speech.text + "</span></div>";
    window.speechSynthesis.speak(speech);
}

recognition.onspeechend = function() {
    recognition.stop();
}

onToggleSwitch = () => {
    _switch.addEventListener('click', function(e) {
        if (_switch.checked) {
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
        }
    });
}

onClickListenBtn();
onToggleSwitch();
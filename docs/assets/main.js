const setOS = (value) => {
    const options = document.querySelectorAll(".OS__type");
    const steps = document.querySelectorAll(".steps");

    for (const option of options) {
        option.ariaSelected = value === option.ariaLabel;
    }

    value = value.replace("linux", "windows");

    for (const step of steps) {
        step.ariaSelected = value === step.ariaLabel;
    }
};

let currentCard = 0;
const setCard = (increment) => {
    const options = document.querySelectorAll(".features__feature");
    currentCard = (currentCard + increment) % options.length;
    if (currentCard < 0) currentCard += options.length;

    for (let i = 0; i < options.length; i++) {
        if (i == currentCard) {
            options[i].classList.add("features__show");
        } else {
            options[i].classList.remove("features__show");
        }
    }
}

const findOS = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("windows")) return "windows";
    return "linux";
};

const copyElement = id => {
    const element = document.getElementById(id);
    navigator.clipboard.writeText(element.innerText);
};

const addRotationToImages = () => {
    const images = document.querySelectorAll(".features__feature img");
    document.addEventListener("mousemove", (event) => {
        rotateElement(event, images);
    });
};

const rotateElement = (event, elements) => {
    console.log(elements);
    const x = event.clientX;
    const y = event.clientY;

    for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const middleX = rect.left + rect.width / 2;
        const middleY = rect.top + rect.height / 2;

        if (middleX < 0 || middleY < 0) {
            element.style.setProperty("--rotateX", "0deg");
            element.style.setProperty("--rotateY", "0deg");
            continue;
        }

        const offsetX = Math.min((x - middleX) / middleX * 10, 10);
        const offsetY = Math.min((y - middleY) / middleY * 10, 10);

        element.style.setProperty("--rotateX", -1 * offsetY + "deg");
        element.style.setProperty("--rotateY", offsetX + "deg");
    }
};

window.onload =  () => {
    setOS(findOS());
    setCard(0);
    addRotationToImages();
};

const setOS = (value) => {
    console.log(value);

    const options = document.querySelectorAll(".OS__type");

    for (let i = 0; i < options.length; i++) {
        options[i].ariaSelected = value === options[i].ariaLabel;
    }
};

window.onload =  () => {
    setOS("windows");
};

// Event listener to wait for page to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Selects the header element and narrative divs (since characters appear in those)
    const header = document.querySelector('header');
    const panels = [header, ...document.querySelectorAll('#narrative > div')];
    // Selects the characters by their element IDs
    const character1 = document.getElementById('character1');
    const character2 = document.getElementById('character2');
    const character3 = document.getElementById('character3');

    // Calculates which panel is currently in view by checking the position in the viewport and returns it (panelIndex)
    function getPanelIndexInView() {
        let panelIndex = 0;
        for (let i = 0; i < panels.length; i++) {
            const panel = panels[i];
            const panelRect = panel.getBoundingClientRect();
            if (panelRect.top >= 0 && panelRect.top < window.innerHeight) {
                panelIndex = i;
                break;
            }
        }
        return panelIndex;
    }

    // Updates the image sources for the characters depending on the panelIndex
    function changeCharacterImages(panelIndex) {
        let imagePath1, imagePath2, imagePath3;
        switch (panelIndex) {
            case 0: // Header
                imagePath1 = 'images/panel 1 - boy.svg';
                imagePath2 = 'images/panel 3 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
                break;
            case 1: // Panel 1
                imagePath1 = 'images/panel 1 - boy.svg';
                imagePath2 = 'images/panel 3 - girl.svg';
                imagePath3 = 'images/panel 1 - yue lao.svg';
                break;
            case 2: // Panel 2
                imagePath1 = 'images/panel 1 - boy.svg';
                imagePath2 = 'images/panel 3 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
                break;
            case 3: // Panel 3
                imagePath1 = 'images/panel 1 - boy.svg';
                imagePath2 = 'images/panel 3 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
                break;
            case 4: // Panel 4
                imagePath1 = 'images/panel 4 - boy.svg';
                imagePath2 = 'images/panel 3 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
                break;
            case 5: // Panel 5
                imagePath1 = 'images/panel 5 - boy.svg';
                imagePath2 = 'images/panel 3 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
                break;
            case 6: // Panel 6
                imagePath1 = 'images/panel 6 - boy.svg';
                imagePath2 = 'images/panel 6 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
                break;
            case 7: // Panel 7
                imagePath1 = 'images/panel 6 - boy.svg';
                imagePath2 = 'images/panel 6 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
                break;
            case 8: // Panel 8
                imagePath1 = 'images/panel 6 - boy.svg';
                imagePath2 = 'images/panel 8 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
                break;
            case 9: // Panel 9
                imagePath1 = 'images/panel 6 - boy.svg';
                imagePath2 = 'images/panel 6 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
                break;
            default:
                imagePath1 = 'images/panel 1 - boy.svg';
                imagePath2 = 'images/panel 3 - girl.svg';
                imagePath3 = 'images/panel 2 - yue lao.svg';
        }
        // Sets the image sources
        character1.src = imagePath1;
        character2.src = imagePath2;
        character3.src = imagePath3;
    }

    // Determines if the viewer is on mobile or desktop and executes its respective function to move the characters.
    // Also checks and updates the characters images.
    function moveCharacters(panelIndex) {
        if (window.innerWidth <= 960) {
            // Mobile screens
            positionCharactersForMobile(panelIndex);
        } else {
            // Desktop screens
            positionCharactersForDesktop(panelIndex);
        }
        changeCharacterImages(panelIndex);
    }

    // Positions the characters for mobile users depending on the panelIndex
    function positionCharactersForMobile(panelIndex) {
        // Define positions for mobile screens
        switch (panelIndex) {
            case 0: // Header
                character1.style.left = '10vw';
                character1.style.top = '70vh';
                character1.style.height = '20rem';
                character2.style.left = '100vw';
                character2.style.top = '70vh';
                character2.style.height = '15rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                console.log("0");
                break;
            case 1: // Panel 1
                character1.style.left = '20vw';
                character1.style.top = '170vh';
                character1.style.height = '20rem';
                character2.style.left = '100vw';
                character2.style.top = '170vh';
                character2.style.height = '15rem';
                character3.style.left = '40vw';
                character3.style.top = '150vh';
                break;
            case 2: // Panel 2
                character1.style.left = '20vw';
                character1.style.top = '270vh';
                character1.style.height = '20rem';
                character2.style.left = '100vw';
                character2.style.top = '270vh';
                character2.style.height = '15rem';
                character3.style.left = '40vw';
                character3.style.top = '250vh';
                break;
            case 3: // Panel 3
                character1.style.left = '10vw';
                character1.style.top = '370vh';
                character1.style.height = '20rem';
                character2.style.left = '75vw';
                character2.style.top = '375vh';
                character2.style.height = '15rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 4: // Panel 4
                character1.style.left = '10vw';
                character1.style.top = '470vh';
                character1.style.height = '20rem';
                character2.style.left = '75vw';
                character2.style.top = '475vh';
                character2.style.height = '15rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 5: // Panel 5
                character1.style.left = '40vw';
                character1.style.top = '560vh';
                character1.style.height = '40rem';
                character2.style.left = '100vw';
                character2.style.top = '570vh';
                character2.style.height = '15rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 6: // Panel 6
                character1.style.left = '10vw';
                character1.style.top = '660vh';
                character1.style.height = '40rem';
                character2.style.left = '65vw';
                character2.style.top = '660vh';
                character2.style.height = '40rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 7: // Panel 7
                character1.style.left = '-100vw';
                character1.style.top = '750vh';
                character1.style.height = '120rem';
                character2.style.left = '40vw';
                character2.style.top = '750vh';
                character2.style.height = '120rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 8: // Panel 8
                character1.style.left = '10vw';
                character1.style.top = '860vh';
                character1.style.height = '40rem';
                character2.style.left = '45vw';
                character2.style.top = '860vh';
                character2.style.height = '40rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 9: // Panel 9
                character1.style.left = '10vw';
                character1.style.top = '960vh';
                character1.style.height = '40rem';
                character2.style.left = '65vw';
                character2.style.top = '960vh';
                character2.style.height = '40rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            default:
                character1.style.left = '10vw';
                character1.style.top = '70vh';
                character1.style.height = '20rem';
                character2.style.left = '100vw';
                character2.style.top = '70vh';
                character2.style.height = '15rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
        }
    }

    // Positions the characters for desktop users depending on the panelIndex
    function positionCharactersForDesktop(panelIndex) {
        // Define positions for desktop screens
        switch (panelIndex) {
            case 0: // Header
                character1.style.left = '10vw';
                character1.style.top = '70vh';
                character1.style.height = '20rem';
                character2.style.left = '100vw';
                character2.style.top = '70vh';
                character2.style.height = '15rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                console.log("0");
                break;
            case 1: // Panel 1
                character1.style.left = '30vw';
                character1.style.top = '170vh';
                character1.style.height = '20rem';
                character2.style.left = '100vw';
                character2.style.top = '170vh';
                character2.style.height = '15rem';
                character3.style.left = '50vw';
                character3.style.top = '145vh';
                character3.style.maxHeight = '50vh';
                break;
            case 2: // Panel 2
                character1.style.left = '30vw';
                character1.style.top = '270vh';
                character1.style.height = '20rem';
                character2.style.left = '100vw';
                character2.style.top = '270vh';
                character2.style.height = '15rem';
                character3.style.left = '50vw';
                character3.style.top = '245vh';
                character3.style.maxHeight = '50vh';
                break;
            case 3: // Panel 3
                character1.style.left = '30vw';
                character1.style.top = '370vh';
                character1.style.height = '20rem';
                character2.style.left = '60vw';
                character2.style.top = '375vh';
                character2.style.height = '15rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 4: // Panel 4
                character1.style.left = '30vw';
                character1.style.top = '470vh';
                character1.style.height = '20rem';
                character2.style.left = '60vw';
                character2.style.top = '475vh';
                character2.style.height = '15rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 5: // Panel 5
                character1.style.left = '45vw';
                character1.style.top = '550vh';
                character1.style.height = '40rem';
                character2.style.left = '100vw';
                character2.style.top = '570vh';
                character2.style.height = '40rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 6: // Panel 6
                character1.style.left = '30vw';
                character1.style.top = '650vh';
                character1.style.height = '40rem';
                character2.style.left = '60vw';
                character2.style.top = '650vh';
                character2.style.height = '40rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 7: // Panel 7
                character1.style.left = '10vw';
                character1.style.top = '750vh';
                character1.style.height = '120rem';
                character2.style.left = '50vw';
                character2.style.top = '750vh';
                character2.style.height = '120rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 8: // Panel 8
                character1.style.left = '30vw';
                character1.style.top = '850vh';
                character1.style.height = '40rem';
                character2.style.left = '50vw';
                character2.style.top = '850vh';
                character2.style.height = '40rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            case 9: // Panel 9
                character1.style.left = '30vw';
                character1.style.top = '950vh';
                character1.style.height = '40rem';
                character2.style.left = '60vw';
                character2.style.top = '950vh';
                character2.style.height = '40rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
                break;
            default:
                character1.style.left = '10vw';
                character1.style.top = '70vh';
                character1.style.height = '20rem';
                character2.style.left = '100vw';
                character2.style.top = '70vh';
                character2.style.height = '15rem';
                character3.style.left = '100vw';
                character3.style.top = '250vh';
        }
    }

    // Event listener for scroll that updates the panel in view and the characters positions
    window.addEventListener('scroll', function () {
        const panelIndexInView = getPanelIndexInView();
        moveCharacters(panelIndexInView);
    });

    // Event listener for window resize that updates the characters position on resizing the window
    window.addEventListener('resize', function () {
        moveCharacters(getPanelIndexInView());
    });

    // Initial setup of the characters' positions
    moveCharacters(getPanelIndexInView());
});
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header'); // Get the header
    const panels = [header, ...document.querySelectorAll('#narrative > div')]; // Include header in the array
    const character1 = document.getElementById('character1');
    const character2 = document.getElementById('character2');

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

    function moveCharacters(panelIndex) {
        // Adjusted logic for moving characters based on the panel index, including header
        switch(panelIndex) {
            case 0: // Header
                character1.style.left = '10%';
                character1.style.top = '80vh';
                character2.style.left = '90%';
                character2.style.top = '30vh';
                console.log("0");
                break;
            case 1: // Panel 1
                character1.style.left = '10%';
                character1.style.top = '180vh';
                character2.style.left = '50%';
                character2.style.top = '130vh';
                break;
            case 2: // Panel 2
                character1.style.left = '50%';
                character1.style.top = '250vh';
                character2.style.left = '50%';
                character2.style.top = '250vh';
                break;
            case 3: // Panel 3
                character1.style.left = '10%';
                character1.style.top = '320vh';
                character2.style.left = '50%';
                character2.style.top = '330vh';
                break;
            case 4: // Panel 4
                character1.style.left = '10%';
                character1.style.top = '420vh';
                character2.style.left = '50%';
                character2.style.top = '430vh';
                break;
            case 5: // Panel 5
                character1.style.left = '10%';
                character1.style.top = '520vh';
                character2.style.left = '50%';
                character2.style.top = '530vh';
                break;
            case 6: // Panel 6
                character1.style.left = '10%';
                character1.style.top = '620vh';
                character2.style.left = '50%';
                character2.style.top = '630vh';
                break;
            case 7: // Panel 7
                character1.style.left = '10%';
                character1.style.top = '720vh';
                character2.style.left = '50%';
                character2.style.top = '730vh';
                break;
            case 8: // Panel 8
                character1.style.left = '10%';
                character1.style.top = '820vh';
                character2.style.left = '50%';
                character2.style.top = '830vh';
                break;
            case 9: // Panel 9
                character1.style.left = '10%';
                character1.style.top = '920vh';
                character2.style.left = '50%';
                character2.style.top = '930vh';
                break;
            default:
                character1.style.left = '10%';
                character1.style.top = '80vh';
                character2.style.left = '90%';
                character2.style.top = '30vh';
        }
    }

    window.addEventListener('scroll', function() {
        const panelIndexInView = getPanelIndexInView();
        moveCharacters(panelIndexInView);
    });

    // Initial character setup based on the first element in view
    moveCharacters(getPanelIndexInView());
});
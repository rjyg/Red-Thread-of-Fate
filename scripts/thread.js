// Event listener to wait for page to fully load before running the script
window.onload = function () {
    // Setup the canvas and context for drawing the red thread
    const canvas = document.getElementById('redLineCanvas');
    const ctx = canvas.getContext('2d');

    // Selects the characters by their element IDs and highlights with a query selector
    let character1 = document.getElementById('character1');
    let character2 = document.getElementById('character2');
    let highlight = document.querySelector('.highlight');

    // Tracks which panel is currently active
    let currentPanelIndex = 0;

    // Places header element and narrative divs into an array
    const panels = [document.querySelector('header'), ...document.querySelectorAll('#narrative > div')];

    // Function to calculate the closest panel index to the top of the viewport
    function getPanelIndexInView() {
        let closestIndex = -1;
        let smallestDistance = Infinity;

        // Loops through the panels array to find the closest panel to the top
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            const distanceToTop = Math.abs(rect.top);
            // Updates the closest index
            if (distanceToTop < smallestDistance) {
                smallestDistance = distanceToTop;
                closestIndex = index;
            }
        });
        return closestIndex;
    }

    // Adjusts the canvas to fill the window
    function updateCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    }

    // Function to draw the wavy thread
    function drawWavyLine() {
        // Debug
        // if (!character1 || !character2 || !highlight){
        //     console.error("One or more required elements are missing.");
        //     return;
        // }

        // Clears the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let opacity = 1;

        // Make thread invisible for panel 1 because I don't want it to show for that part of the story
        if (currentPanelIndex === 1) {
            opacity = 0;
        } else {
            const panelRect = panels[currentPanelIndex].getBoundingClientRect();
            const distanceFromTop = Math.abs(panelRect.top);
            const panelHeight = panelRect.height;
            opacity = Math.max(0, 1 - (distanceFromTop / (panelHeight * 0.5)));
        }

        if (opacity <= 0) {
            return;
        }

        // Set thread colour and opacity
        ctx.strokeStyle = 'rgba(240, 91, 91,' + opacity + ')';

        // Get positions for the start and end of the lines
        let startRect = character1.getBoundingClientRect();
        let endRect = character2.getBoundingClientRect();

        // Get position of the highlight span in the html to highlight certain words with the scribble
        let highlightRect = highlight.getBoundingClientRect();

        let emSize = parseFloat(getComputedStyle(document.body).fontSize);

        let startX;
        let startY;
        let endX;
        let endY;

        // Calculate the start and end points of the thread based on the panel
        if (currentPanelIndex === 4) {
            // Panel 4 has a larger image for the boy so I had to adjust the start point's X value
            startX = startRect.left + startRect.width / 3.5;
            startY = startRect.top + startRect.height / 2 + window.scrollY;
            endX = endRect.left + endRect.width / 2;
            endY = endRect.top + endRect.height / 2 + window.scrollY;
        } else if (currentPanelIndex === 8) {
            // Panel 8 has a larger image for the girl so I had to adjust the end point's X value
            startX = startRect.left + startRect.width / 2;
            startY = startRect.top + startRect.height / 2 + window.scrollY;
            endX = endRect.left + endRect.width / 1.5;
            endY = endRect.top + endRect.height / 2 + window.scrollY;
        } else {
            // For every other panel, the line starts and end in the middle of each characters' X and Y axis
            startX = startRect.left + startRect.width / 2;
            startY = startRect.top + startRect.height / 2 + window.scrollY;
            endX = endRect.left + endRect.width / 2;
            endY = endRect.top + endRect.height / 2 + window.scrollY;
        }

        let scribbleStartX = highlightRect.left + (emSize * 4);
        let scribbleStartY = highlightRect.top + window.scrollY + highlightRect.height + (emSize * 7);

        // How wavy I want the line to be and how many bumps in it
        let amplitude = 20;
        let frequency = 1.5;

        // Start drawing the line
        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // Maths to vary width of the thread - left half
        for (let i = 0; i <= 1; i += 0.01) {
            let x = lerp(startX, scribbleStartX, i);
            let y = lerp(startY, scribbleStartY, i) + amplitude * Math.sin(frequency * i * 2 * Math.PI);
            ctx.lineWidth = 2 + Math.sin(i * Math.PI) * 3; // Varies between 2 and 5
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        let lastX = scribbleStartX, lastY = scribbleStartY;
        // Maths to vary width of the scribble
        for (let i = 0; i < 15; i++) {
            let nextX = scribbleStartX + Math.random() * 100 - 50;
            let nextY = scribbleStartY + Math.random() * 100 - 50;

            let cp1X = (lastX + nextX) / 2 + Math.random() * 50 - 25;
            let cp1Y = (lastY + nextY) / 2 + Math.random() * 50 - 25;

            // Uses quadratic curve to method to make the lines look *less* sharp in the scribble
            ctx.quadraticCurveTo(cp1X, cp1Y, nextX, nextY);
            ctx.lineWidth = 2 + Math.random() * 3; // Randomly varies width between 2px and 5px
            lastX = nextX;
            lastY = nextY;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(nextX, nextY);
        }

        // Maths to vary width of the thread - right half
        for (let i = 0; i <= 1; i += 0.01) {
            let x = lerp(lastX, endX, i);
            let y = lerp(lastY, endY, i) + amplitude * Math.sin(frequency * i * 2 * Math.PI);
            ctx.lineWidth = 2 + Math.sin(i * Math.PI) * 3; // Randomly varies width between 2px and 5px
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    }

    // Uses linear interpolation to calculate the points between the start and the end to create a smooth line
    // Resources used:
    // https://thinkingbox.medium.com/6-simple-js-math-functions-you-can-use-everyday-68f8d5b58514
    // https://p5js.org/examples/math-linear-interpolation.html
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    // Updates the selected highlight element with the most visible panel to adjust the thread's scribble position
    function updateHighlightElement() {
        let mostVisiblePanel = null;
        let maxVisibleArea = 0;

        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            const visibleArea = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

            if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                mostVisiblePanel = panel;
                currentPanelIndex = index;
            }
        });

        if (mostVisiblePanel) {
            const newHighlightElements = mostVisiblePanel.getElementsByClassName('highlight');

            if (newHighlightElements.length > 0) {
                highlight = newHighlightElements[0];
            }
        }
    }

    // Event listener for window resize that updates the canvas size and redraws the thread
    window.addEventListener('resize', function () {
        updateCanvasSize();
        drawWavyLine();
    });

    // Event listener for scroll that updates the current panel index, updates highlight element, updates the canvas size and redraws the thread
    window.addEventListener('scroll', function () {
        currentPanelIndex = getPanelIndexInView();
        updateHighlightElement();
        requestAnimationFrame(function () {
            updateCanvasSize();
            drawWavyLine();
        });
    });

    // Initial setup of getting the current panel index, highlight element, canvas setup, and drawing of the thread.
    currentPanelIndex = getPanelIndexInView();
    updateHighlightElement();
    updateCanvasSize();
    drawWavyLine();
};

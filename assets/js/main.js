(function() {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  // Redirect to week pages on click
  document.querySelectorAll('.week-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      window.location.href = `week${index + 1}.html`;
    });
  });

  // Function to draw the curved timeline path
  function drawTimeline(timelineId, pathId) {
    const timeline = document.getElementById(timelineId);
    const path = document.getElementById(pathId);
    const items = timeline.querySelectorAll('.timeline-item');
    if (items.length === 0) return;

    let pathD = '';
    let currentY = 50; // Starting Y position
    const curveOffset = 30; // Controls the curve amplitude
    const minHeight = 40; // Minimum distance between points

    items.forEach((item, index) => {
      const itemHeight = item.offsetHeight;
      const dotY = currentY + 30; // Position of the dot

      if (index === 0) {
        pathD += `M 400 ${currentY}`; // Starting point (center of timeline)
      } else {
        const prevY = currentY;
        currentY += Math.max(itemHeight, minHeight); // Ensure minimum spacing
        const midY = (prevY + currentY) / 2;

        // Create a smooth curve between points
        pathD += ` Q 400 ${midY - curveOffset}, 400 ${midY}`; // Quadratic curve
        pathD += ` T 400 ${currentY}`; // Smooth continuation to the next point
      }

      // Update dot position
      item.style.setProperty('--dot-y', `${dotY}px`);

      if (index === items.length - 1) {
        currentY = dotY; // Extra padding at the end
      }
    });

    path.setAttribute('d', pathD);

    // Update SVG height
    const svg = timeline.querySelector('.timeline-svg');
    svg.setAttribute('height', currentY);
  }

  // Draw timelines on load and resize
  window.addEventListener('load', () => {
    drawTimeline('skills-timeline', 'skills-timeline-path');
    drawTimeline('projects-timeline', 'projects-timeline-path');
  });

  window.addEventListener('resize', () => {
    drawTimeline('skills-timeline', 'skills-timeline-path');
    drawTimeline('projects-timeline', 'projects-timeline-path');
  });

  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
})();
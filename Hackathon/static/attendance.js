document.addEventListener("DOMContentLoaded", () => {
    // Overall attendance circle
    const progressCircle = document.querySelector(".circle-container .progress");
    const percentText = document.getElementById("attendancePercent");
  
    const attendanceValue = 82; // Replace with actual value from backend
    let progress = 0;
    const maxDashOffset = 440;
    const interval = setInterval(() => {
      if (progress <= attendanceValue) {
        const offset = maxDashOffset - (maxDashOffset * progress) / 100;
        progressCircle.style.strokeDashoffset = offset;
        percentText.textContent = `${progress}%`;
        progress++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  
    // Subject-wise small attendance circles
    const smallCircles = document.querySelectorAll(".circle.small .progress");
  
    smallCircles.forEach(circle => {
      const percent = parseFloat(circle.getAttribute("data-percent")) || 0;
      const dashArray = 314;
      const offset = dashArray - (dashArray * percent) / 100;
  
      // Set strokeDasharray once
      circle.style.strokeDasharray = dashArray;
      circle.style.strokeDashoffset = dashArray;
  
      // Trigger animation
      setTimeout(() => {
        circle.style.transition = "stroke-dashoffset 1s ease-out";
        circle.style.strokeDashoffset = offset;
      }, 500);
    });
  });
  
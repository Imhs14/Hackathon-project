document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector('input[name="book-name"]');
    const resultDiv = document.querySelector('.result');
  
    input.addEventListener('focus', () => {
      input.style.boxShadow = "0 0 20px cyan";
    });
  
    input.addEventListener('blur', () => {
      input.style.boxShadow = "0 0 10px cyan";
    });
  
    input.addEventListener('input', () => {
      if (resultDiv) {
        resultDiv.style.display = "none"; // hide result when typing again
      }
    });
  });
  
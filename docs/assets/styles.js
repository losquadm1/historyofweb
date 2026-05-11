(function () {
  function startTypewriter() {
    const output = document.getElementById("cmnd-typed-text");
    const template = document.getElementById("cmnd-text-template");
    const main = document.getElementById("main-content");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!output || !template || !document.body.classList.contains("home")) {
      return;
    }

    const fullText = template.textContent.replace(/^\n/, "").trimEnd();
    let index = 0;
    let timeoutId = null;
    let isComplete = false;

    if (prefersReducedMotion) {
      output.textContent = fullText;
      output.classList.remove("is-typing");
      return;
    }

    output.textContent = "";
    output.classList.add("is-typing");

    function completeTyping() {
      if (isComplete) {
        return;
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      output.textContent = fullText;
      output.classList.remove("is-typing");
      isComplete = true;

      output.removeEventListener("click", completeTyping);
      if (main) {
        main.removeEventListener("click", completeTyping);
      }
    }

    function typeNextChar() {
      if (isComplete) {
        return;
      }

      if (index >= fullText.length) {
        output.classList.remove("is-typing");
        isComplete = true;
        output.removeEventListener("click", completeTyping);
        if (main) {
          main.removeEventListener("click", completeTyping);
        }
        return;
      }

      const nextChar = fullText.charAt(index);
      output.textContent += nextChar;
      index += 1;

      let delay = 22;
      if (nextChar === "\n") {
        delay = 110;
      } else if (nextChar === " ") {
        delay = 10;
      }

      timeoutId = window.setTimeout(typeNextChar, delay);
    }

    output.addEventListener("click", completeTyping);
    if (main) {
      main.addEventListener("click", completeTyping);
    }

    typeNextChar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startTypewriter);
  } else {
    startTypewriter();
  }
})();

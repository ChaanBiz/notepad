const cutButton = document.getElementById("cutButton");
const notepad = document.getElementById("notepad");

cutButton.addEventListener("click", () => {
  const paragraphs = notepad.getElementsByTagName("p");
  
  if (paragraphs.length > 0) {
    const lastParagraph = paragraphs[paragraphs.length - 1];
    lastParagraph.remove();
  }
});

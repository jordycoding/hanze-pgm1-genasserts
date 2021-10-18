let highlightBlocks = document.querySelectorAll("div.highlight>pre");
let inRegex = /In \[\d+\]: /gm;
let outRegex = /Out\[\d+\]: /gm;

highlightBlocks.forEach(block => {
    let button = document.createElement("div");
    button.classList.add("md-clipboard", "md-icon")
    button.style.right = "2em";
    button.style.color = "red";
    button.addEventListener("click", () => {
        groupStatements(button.parentElement.innerText);
    });
    block.appendChild(button);
})

const groupStatements = (text) => {
    let inList = [];
    let outList = [];
    text.split("\n").forEach(line => {
        if (inRegex.test(line)){
            console.log(line);
        } else if (outRegex.test(line)){
            console.log(line)
        }
    })
}
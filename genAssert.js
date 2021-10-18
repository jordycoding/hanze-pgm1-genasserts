let highlightBlocks = document.querySelectorAll("div.highlight>pre");
let inRegex = /In \[\d+\]: /gm;
let outRegex = /Out\[\d+\]: /gm;

highlightBlocks.forEach(block => {
    let button = document.createElement("div");
    button.classList.add("md-clipboard", "md-icon")
    button.style.right = "2em";
    button.style.color = "red";
    button.addEventListener("click", () => {
        let assertList = genAsserts(groupStatements(button.parentElement.innerText));
        let formattedText = formatClipboardText(assertList);
        navigator.clipboard.writeText(formattedText);
    });
    block.appendChild(button);
})

const groupStatements = (text) => {
    let inList = [];
    let outList = [];
    text.split("\n").forEach(line => {
        if (inRegex.test(line)){
            inList.push(line.split(inRegex)[1]);
        } else if (outRegex.test(line)){
            outList.push(line.split(outRegex)[1]);
        }
    })
    return {
        inList,
        outList
    }
}

const genAsserts = (lines) => {
    assertStatements = [];
    lines.inList.forEach((line, index) => {
        assertStatements.push(`assert ${line} == ${lines.outList[index]}`);
    })
    return assertStatements;
}

const formatClipboardText = (assertList) => {
    let text = "";
    assertList.forEach(line => {
        text += `${line} \n`;
    })
    return text;
}
navBar = document.querySelector("nav");
navElements = navBar.children[0].children;

function setUrlLiEvent(li) {
    console.log(li)
    let url = li.childNodes[0].href;
    li.addEventListener("click", function (e) {
        window.location.assign(url)
    })
}

for (let i = 0; i < navElements.length; i++) {
    if (navElements[i].children.length > 1) {
        let li = navElements[i]
        setUrlLiEvent(li)
        for (let j = 0; j < navElements[i].children[1].children.length; j++) {
            const li = navElements[i].children[i].children[j];
            setUrlLiEvent(li)
        }
    } else {
        let li = navElements[i]
        setUrlLiEvent(li)
    }
}

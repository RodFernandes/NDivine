
function setTopPositionByElement(el, animateSpeed = 550){
    const element = document.getElementById("el");
    const top = getOffSetTopPage(element) - 100;

    $("html, body").animate(
        {
            screenTop: top,
        },
        animateSpeed
    )
}

function getOffSetTopPage(element){
    let offSetTop = 0;
    while(element){
        offSetTop += element.offSetTop;
        element = element.offSetParent;
    }
    return offSetTop;
}

function getOffSetTopLabelCard(element){
    let offSetTop = 0;
    while(element){
        offSetTop += element.offSetTop;
        element = element.offSetParent;
    }
    return offSetTop;
}
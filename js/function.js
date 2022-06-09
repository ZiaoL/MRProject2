function getEle(id) {
    return document.getElementById(id);
}


function submitFunction(para) {
    getEle('ddm').setAttribute("class", "navOff");
    let size = para;
    if (size == 'empty') {
        alert("The size can not be Empty");
    } else {
        productCode = 'size' + size;
        checkCookie(productCode);
        let num = calculateSum();
        getEle('sum').innerHTML = "(" + num + ")";
    }
}


function calculateSum() {
    let decodedCookie = decodeURIComponent(document.cookie);

    let ca = decodedCookie.split(';');
    let sum = 0;
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].split('=');

        let num = parseInt(c[1]);
        sum = sum + num;
    }
    return sum;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(para) {
    let user = getCookie(para);
    if (user == "") {
        setCookie(productCode, 1, 30);
    } else {
        let num = parseInt(getCookie(productCode));
        let quantity = num + 1;
        setCookie(productCode, quantity, 30);
    }
}


function size(para) {
    if (para == 's') {
        getEle('sizeS').setAttribute("class", "selected");
        getEle('sizeM').setAttribute("class", "unselected");
        getEle('sizeL').setAttribute("class", "unselected");
    } else if (para == 'm') {
        getEle('sizeS').setAttribute("class", "unselected");
        getEle('sizeM').setAttribute("class", "selected");
        getEle('sizeL').setAttribute("class", "unselected");

    } else if (para == 'l') {
        getEle('sizeS').setAttribute("class", "unselected");
        getEle('sizeM').setAttribute("class", "unselected");
        getEle('sizeL').setAttribute("class", "selected");
    } else {
        getEle('sizeS').setAttribute("class", "unselected");
        getEle('sizeM').setAttribute("class", "unselected");
        getEle('sizeL').setAttribute("class", "unselected");
    }
}

function checkAttribute() {

    if (getEle('sizeS').getAttribute("class") == "selected") {
        return 's';
    } else if (getEle('sizeM').getAttribute("class") == "selected") {
        return 'm';
    } else if (getEle('sizeL').getAttribute("class") == "selected") {
        return 'l';
    } else {
        return 'empty';
    }

}

function cartShow() {
    let num = calculateSum();
    getEle('sum').innerHTML = "(" + num + ")";
    let ddmClass = getEle('ddm').getAttribute("class");
    let text = '';
    if (ddmClass == "navOff") {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split('; ');
        if (ca.length == 1 && ca[0] == '') {
            text = "Shopping Cart Empty";
        } else {
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i].split('=');
                let size = c[0].toUpperCase();
                text = "<div> <img src = 'img/classic-tee.jpg' ><div><p>Classic Tee </p><div><p>" + c[1] + "</p> <p> x $75 .00 </p> </div> <div><p > Size: </p> <p>" + size[4] + "</p> </div> </div> </div>" + text;
            }
        }
        getEle('ddm').setAttribute("class", "navOn")
        getEle('ddm').innerHTML = text;


    } else {
        getEle('ddm').setAttribute("class", "navOff")
    }

}
class Helper {
    static hasClass(el, className) {
        return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    static addClass(el, className) {
        if (el instanceof HTMLElement) {
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        } else {
            for (let i = 0, len = el.length; i < len; i++) {
                if (el[i].classList) {
                    el[i].classList.add(className);
                } else {
                    el[i].className += ' ' + className;
                }
            }
        }
    }

    static removeClass(el, className) {
        if (el instanceof HTMLElement) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        } else {
            for (let i = 0, len = el.length; i < len; i++) {
                if (el[i].classList) {
                    el[i].classList.remove(className);
                } else {
                    el[i].className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }
        }
    }

    static getJson(path, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var data = JSON.parse(httpRequest.responseText);
                    if (callback) callback(data);
                }
            }
        };
        httpRequest.open('GET', path);
        httpRequest.send();
    }

    static loaded(loader, callback) {
        let H = this;
        H.addClass(loader, 'loaded');
        setTimeout(function () {
            loader.remove();

            if(typeof callback === 'function'){
                callback();
            }
        }, 310);
    }
}

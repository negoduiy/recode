
// функция поиска в глобальном поиске
function getsearchresult(mytext) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', '/wp-content/themes/acadtopoplan/search.php', true);
    xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState === XMLHttpRequest.DONE) {
            if (xhr2.status === 200) {
                cuttingtext(xhr2.responseText.replace(/&nbsp;/g, " "));
            } else {
                alert('Ошибка получения данных');
            }
        }
    };
    xhr2.send('const=' + mytext);
}

// функция отображения вариантов глобального поиска
function cuttingtext(e){
    const searchForm = document.getElementById("searchform");
    const searchForm2 = document.getElementById("searchform2");
    let words = e.split(" -/CUTTINGFILE/- ");

    searchForm.innerHTML = "";
    searchForm2.innerHTML = "";

    words.forEach(word => {
        let resultArray = word.split("-cutting-");

        if (resultArray[0] == 'К сожалению, ничего не найдено.'){
            searchForm.innerHTML += `
            <div class="notfound">
                <p class="titlefromsearch">${resultArray[0]}</p>
            </div>
            `;
            searchForm2.innerHTML += `
            <div class="notfound">
                <p class="titlefromsearch">${resultArray[0]}</p>
            </div>
            `;
        } else {
            
            let str =  resultArray[1];
            var arr = str.split('|SLICE|');
            var firsttext = arr[0].split(' ');
            var secondtext = arr[2].split(' ');
            searchForm.innerHTML += `
            <div class="searchitem" onmousedown="alshgfl(this);" hrefforbut="${resultArray[2]}">
                <p class="titlefromsearch">${resultArray[0]}</p>
                <a class="linkersearch">${firsttext.slice(-5).join(' ')}<span>${arr[1]}</span>${secondtext.slice(0, 8).join(' ')}</a>
            </div>
            `;
            searchForm2.innerHTML += `
            <div class="searchitem" onmousedown="alshgfl(this);" hrefforbut="${resultArray[2]}">
                <p class="titlefromsearch">${resultArray[0]}</p>
                <a class="linkersearch">${firsttext.slice(-5).join(' ')}<span>${arr[1]}</span>${secondtext.slice(0, 8).join(' ')}</a>
            </div>
            `;
        }
    });
}

// функция отчистки поля глобального поиска и форм вывода
function clearsearch(){
    document.getElementById('searchinputheader').value = "";
    document.getElementById('searchinputheader1').value = "";

    //document.getElementById('searchform').innerHTML = "";
    //document.getElementById('searchform2').innerHTML = "";

    document.getElementById('searchform').classList.remove('active');
    document.getElementById('searchform2').classList.remove('active');
}

// вызов поиска в главном поиске на большом экране
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('searchinputheader');

    inputField.addEventListener('focus', () => {
        document.getElementById('searchformmain').classList.add('active');
    });

    
    inputField.addEventListener('keyup', () => {
        if (inputField.value.trim() !== '' && inputField.value.trim().length >= 2) {
            document.getElementById('searchform').classList.add('active');
            document.getElementById('searchform2').classList.add('active');
            getsearchresult(inputField.value.trim());
        } else {
            document.getElementById('searchform').classList.remove('active');
            document.getElementById('searchform2').classList.remove('active');
        }
    });
    
    

    inputField.addEventListener('blur', () => {
        document.getElementById('searchformmain').classList.remove('active');
    });
});

// вызов поиска в главном поиске на маленьком экране
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('searchinputheader1');

    inputField.addEventListener('focus', () => {
        document.getElementById('searchformmain').classList.add('active');
    });

    
    inputField.addEventListener('keyup', () => {
        if (inputField.value.trim() !== '' && inputField.value.trim().length >= 2) {
            document.getElementById('searchform').classList.add('active');
            document.getElementById('searchform2').classList.add('active');
            getsearchresult(inputField.value.trim());
        } else {
            document.getElementById('searchform').classList.remove('active');
            document.getElementById('searchform2').classList.remove('active');
        }
    });
    
    

    inputField.addEventListener('blur', () => {
        document.getElementById('searchformmain').classList.remove('active');
    });
});

// тригер на ввод в инпуты глобальных поисков (большой и маленький экран)
document.addEventListener('DOMContentLoaded', () => {
    const input1 = document.getElementById("searchinputheader");
    const input2 = document.getElementById("searchinputheader1");
    
    input1.addEventListener("input", function() {
        input2.value = input1.value;
    });
    
    input2.addEventListener("input", function() {
        input1.value = input2.value;
    });
});


var khewdg = '';
// функция поиска 
function searcher(){
    const substring = khewdg;
    if (substring != ''){
        var regex = new RegExp( substring, 'g' );
        let str = document.getElementById('postforsite').innerHTML.replace(/&nbsp;/g, " ");

        console.log(str.includes(substring));
        if (str.includes(substring) == true){
            let res = str.replace(regex, `<span class="sdy8g">${substring}</span>`);
            document.getElementById('postforsite').innerHTML = res;

            const y = document.querySelector('.sdy8g').getBoundingClientRect().top + window.pageYOffset; 
            let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
            window.scrollTo({
                top: y - vh / 2,
                behavior: 'smooth'
            });
        } else{
            gotop();
        }
    }
}

// функция передачи искомых данных на страницу документации
function handleUrlChange(e) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', '/wp-content/themes/acadtopoplan/hello.php', true);
    xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState === XMLHttpRequest.DONE) {
            if (xhr2.status === 200) {
                //alert(xhr2.responseText);
                document.getElementById('postforsite').innerHTML = xhr2.responseText;
                FindContents();
                searcher();
            } else {
                alert('Ошибка получения данных');
            }
        }
    };
    xhr2.send('const=' + e.getAttribute('name'));
}

// поиск заголовков h3 в найденном контенте поиска и добавление ссылок в сайдбар (описания/содержания)
function FindContents(){
    const h3Elements = document.getElementById('postforsite').querySelectorAll('h3');
    let output = '';

    h3Elements.forEach(h3 => {
        output += `<li onclick="GetLink(this);" class="content-link-frame"><a class="link2">` + h3.textContent + `</a></li>`;
    });
    
    document.getElementById('output').innerHTML = output;
}

// отображение глобального поиска при открытии документации
document.addEventListener('DOMContentLoaded', () => {
    if (location.href.split('/')[3] == 'help'){
        document.querySelector('.headersearchtwo').classList.add('active');
        document.querySelector('.headersearch').classList.add('active');
    } else {
        document.querySelector('.headersearchtwo').classList.remove('active');
        document.querySelector('.headersearch').classList.remove('active');
    }
});


// функция перехода к оглавлению пункта по ссылке в (описании/содержании)
function GetLink(e){
    const h3Elements = document.getElementById('postforsite').querySelectorAll('h3');

    h3Elements.forEach(h3 => {
        if (h3.innerText == e.innerText){
            var offsetY = document.getElementById('header').getBoundingClientRect().height + 20;
            const y = h3.getBoundingClientRect().top + window.pageYOffset - offsetY;
            
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    });
    
    document.querySelectorAll('.content-link-frame').forEach(item => {
        item.classList.remove('active');
    });
    e.classList.add('active');
}











// закрытие левого и правого сайдбара, убираем блюр фона
function auslg(){
    document.getElementById('sdbrl').classList.remove('sdbrl-open');
    document.getElementById('blured-f').classList.remove('active');
    document.getElementById('sdbrr').classList.remove('sdbrr-open');
    document.getElementById('blured-f').classList.remove('active');
    document.getElementById('searcher').classList.remove('sdbrr-open');
}

// открытие левого сайдбара для маленького экрана, добавляем блюр фона
function fnc1(){
    document.getElementById('sdbrl').classList.add('sdbrl-open');
    document.getElementById('blured-f').classList.add('active');
}

// открытие правого сайдбара (описание) для маленького экрана, добавляем блюр фона
function fnc2(){
    document.getElementById('sdbrr').classList.add('sdbrr-open');
    document.getElementById('blured-f').classList.add('active');
}

// открытие правого сайдбара (глобальный поиск) для маленького экрана, добавляем блюр фона
function fnc6(){
    document.getElementById('searcher').classList.add('sdbrr-open');
    document.getElementById('blured-f').classList.add('active');
}

// открытие (появление) левого и правого сайдбара, фрейма для текста
function sdbrlvis(){
    try{
        document.getElementById('sdbrl').classList.add('active');
        document.getElementById('sdbrr').classList.add('active');
        document.getElementById('frame-main-text').classList.add('active');
    } catch {}
}

// переключение контента из дерева кнопками (вперед, назад)
function alshgfl(e){
    try{
        khewdg = e.querySelector('.linkersearch').innerText;
        console.log('НАЗНАЧЕНИЕ ИСКОМОГО ТЕКСТА:');
        console.log(khewdg);
    } catch {
        //нет последнего запроса в search
    }
    history.pushState(null, ``, '?content='+e.getAttribute('hrefforbut'));
    finder();
}

// вызов отображения сайдбаров
window.addEventListener('load', sdbrlvis);

// закрытие сайдбаров и открытие мобильного меню навигации
function gyque(){
    try{
        auslg();
    } catch {}
    document.getElementById('hjgkq').classList.add('active');
    document.getElementById('7u3qf9eqw9').classList.add('active');
    document.getElementById('blured-f').classList.add('active');
}

// закрытие мобильного меню навигации
function gyque2(){
    try{
        document.getElementById('hjgkq').classList.remove('active');
        document.getElementById('7u3qf9eqw9').classList.remove('active');
        document.getElementById('blured-f').classList.remove('active');
    } catch {}
}

// функция развертывания родительской вкладки (рубрика) и отображение вложенных вкладок (записей)
function OpenThis(e){
    const ul = e.parentElement.parentElement.querySelector('ul');

    if (ul.style.height == "0px"){
        ul.style.height = `${ ul.scrollHeight }px`;
        e.classList.add('active');
        ul.classList.add('active');
    } else {
        ul.style.height = `${ ul.scrollHeight }px`;
        window.getComputedStyle(ul, null).getPropertyValue("height");
        ul.style.height = "0px";
        e.classList.remove('active');
        ul.classList.remove('active');

    }

    ul.addEventListener("transitionend", () => {
        if (ul.style.height !== `0px`){
            ul.style.height = "auto";
        }
    })
}

// закрытие списка вложенных вкладок (записей) у родительской вкладки (рубрики)
function CloseThis2(e){
    const ul = e.parentElement.parentElement.querySelector('ul');

    ul.style.height = `${ ul.scrollHeight }px`;
    window.getComputedStyle(ul, null).getPropertyValue("height");
    ul.style.height = "0px";
    e.classList.remove('active');
    ul.classList.remove('active');

    ul.addEventListener("transitionend", () => {
        if (ul.style.height !== `0px`){
            ul.style.height = "auto";
        }
    })
}

// открытие списка вложенных вкладок (записей) у родительской вкладки (рубрики)
function OpenThis2(e, totalheight){
    const ul = e.parentElement.parentElement.querySelector('ul');

    ul.style.height = `${ totalheight }px`;
    e.classList.add('active');
    ul.classList.add('active');

    ul.addEventListener("transitionend", () => {
        if (ul.style.height !== `0px`){
            ul.style.height = "auto";
        }
    })
}

// закрытие всех вложенных вкладок (записей) у родительских вкладок (рубрик)
function CloseAll(){
    document.querySelectorAll('.sub-menu:not(.active)').forEach(item => {
        item.style = 'height: 0px';
    });
}

// открытие вкладки (записи)
function asde12(e){
	
    event.preventDefault();

    if (e.parentElement.parentElement.parentElement.id == 'mainulist'){
        document.getElementById('linkerfile').classList.remove('active');
    } else {

        document.getElementById('childhome').innerHTML = document.getElementById('1').innerText;
        document.getElementById('childhome').setAttribute('hrefforbut', document.getElementById('1').getAttribute('name'));

        document.getElementById('linkerfile').classList.add('active');
        document.getElementById('parent').innerHTML = e.parentElement.parentElement.parentElement.parentElement.querySelector('.gyasdjlk').innerText;
        document.getElementById('child').innerHTML = e.innerText;
        document.getElementById('child').setAttribute('hrefforbut', e.getAttribute('name'));
    }

    gotop();
	
    history.pushState(null, '', '?content='+e.getAttribute('name'));
    handleUrlChange(e);
    auslg();
    //const items1 = document.querySelectorAll('.item-frame');
    const items1 = document.querySelectorAll('.zapis');
    let previous = parseInt(e.id) -1;
    let next = parseInt(previous) +2;


    if (previous >= 1){
        document.getElementById("dbf-but-l").classList.add('active');
        document.getElementById("dbf-but-l-t").innerHTML = document.getElementById(previous).innerText;
        document.getElementById("dbf-but-l-href").setAttribute('hrefforbut', document.getElementById(previous).getAttribute('name'));
    } else { document.getElementById("dbf-but-l").classList.remove('active'); }
    if (next <= items1.length){
        document.getElementById("dbf-but-r").classList.add('active');
        document.getElementById("dbf-but-r-t").innerHTML = document.getElementById(next).innerText;
        document.getElementById("dbf-but-r-href").setAttribute('hrefforbut', document.getElementById(next).getAttribute('name'));
    } else { document.getElementById("dbf-but-r").classList.remove('active'); }

    //const items = document.querySelectorAll('.item-frame');
    const items = document.querySelectorAll('.zapis');
    items.forEach(item => {
        item.classList.remove('active');
    });
    //e.classList.add('active');
    e.parentElement.parentElement.classList.add('active');
}

// закрытие всех открытых меню и активация првой записи в документации при загрузке
window.addEventListener('load', () => {
    CloseAll(); // закрытие саб меню в документации
    finder(); // активация первой записи в документации
});

// активация и открытие првой записи в документации (если есть)
function finder(){
    
    try{
        if (location.href.split('/')[3] == 'help' && location.href.split('/')[4] == ''){
            //history.pushState(null, '', '?content='+document.getElementById('1').parentElement.id);
            asde12(document.getElementById('1'));
        } else {
            const url = location.href;
            const params = new URL(url).searchParams;
            const value = params.get('content');
            let parent = document.querySelector("[name='" + value +"']");
            //let parent = document.getElementById(decodeURI(location.href.split('/')[location.href.split('/').length-1]));
            parent.parentElement.parentElement.classList.add('active');
            asde12(parent);

            let aaa = parent.parentElement.parentElement.parentElement.parentElement.querySelector('a').querySelector('div');

            if (!aaa.classList.contains('active')){
                OpenThis(aaa);
            }
        }
    } catch {
        console.log('finder: ERROR');
    }
    
}

// отображение и активация пролистываемого оглавления в правом сайдбаре (в содержании)
document.addEventListener('DOMContentLoaded', () => {
    const postForSite = document.getElementById("postforsite");
    
    window.addEventListener("scroll", () => {
        let lastVisibleH3 = null;
        const viewportTop = window.pageYOffset;
        const h3Elements = postForSite.querySelectorAll("h3");
        var offsetY = document.getElementById('header').getBoundingClientRect().height + 21;

        for (let h3 of h3Elements) {
            const rect = h3.getBoundingClientRect();
            const viewportTop = 0;
    
            if (rect.top - offsetY < viewportTop) {
                lastVisibleH3 = h3;
            }
        }
    
        if (lastVisibleH3) {
            //console.log(lastVisibleH3, lastVisibleH3.textContent);
            const output = document.getElementById("output");
            const elements = output.querySelectorAll("li");

            elements.forEach(element => {
                if (element.textContent.includes(lastVisibleH3.innerText)) {
                    //GetLink(element);

                    document.querySelectorAll('.content-link-frame').forEach(item => {
                        item.classList.remove('active');
                    });
                    element.classList.add('active');
                }
            });
        }
        
    });
});

// отчистка инпута фильтра по дереву в левом сайдбаре
function clearfffin(){
    document.getElementById('filterinput').value = '';
    filtered();
}

// функция фильтрации дерева в левом сайдбаре
function filtered(){
    const filterInput = document.getElementById('filterinput');
    const itemFrames = document.querySelectorAll('.gyasdjlk');
    const ullistFrames = document.querySelectorAll('.sub-menu');
    let filterValue = filterInput.value.toLowerCase();
    let brush = document.getElementById('clearbut');
    
    if (filterValue == ''){

        brush.classList.remove('active');

        itemFrames.forEach(item => {
            item.classList.remove('finderedclose');
        });
    
        ullistFrames.forEach(ul => {
            let itm = ul.parentElement.querySelector('a').querySelector('.gyasdjlk');
            ul.parentElement.classList.remove('filtered');
            let gyasdjlk = ul.querySelectorAll('.gyasdjlk');
            let totalheight = 0;
            gyasdjlk.forEach(iiii => {
                totalheight += iiii.scrollHeight;
            });

            let activity = 0;
            ul.querySelectorAll('li').forEach(item => {
                if (item.classList.contains('active') == true ){
                    activity++;
                }
            });

        
            if (activity <= 0){
                CloseThis2(itm);
            } else {
                OpenThis2(itm, totalheight);
            }
        });
    } else {
        brush.classList.add('active');

        itemFrames.forEach(item => {
            const itemName = item.innerText.toLowerCase();
    
            if (itemName.includes(filterValue)) {
                item.classList.remove('finderedclose');
            } else {
                item.classList.add('finderedclose');
            }
        });
    
    
        
        ullistFrames.forEach(ul => {
            let itm = ul.parentElement.querySelector('a').querySelector('.gyasdjlk');
            let gyasdjlk = ul.querySelectorAll('.gyasdjlk');
            let counter = 0;
            let totalheight = 0;
            gyasdjlk.forEach(iiii => {
                if (iiii.classList.contains('finderedclose') == false){
                    counter++;
                    totalheight += iiii.scrollHeight;
                }
            });
    
            if (counter <= 0){
                CloseThis2(itm);
                ul.parentElement.classList.add('filtered');
            } else {
                OpenThis2(itm, totalheight);
                ul.parentElement.classList.remove('filtered');
            }
    
        });
    }

};

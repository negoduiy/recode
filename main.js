function aksfg(e){
    const nav = e.querySelector('nav');
    if (e.classList != 'vopros-otvet-form active'){
        e.classList.add('active');
        nav.style.height = `${ nav.scrollHeight }px`;
    } else {
        e.classList.remove('active');
        nav.style.height = `0px`;
    }
}

function CounterBox() {
    try{
        const rect = document.getElementById('n').getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight;
        
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            if (isVisible && counter.innerText == "0"){
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    let count = +counter.innerText;

                    
                    if (counter.parentElement.parentElement.querySelector('p').innerText == 'Конверсия') {
                        counter.parentElement.querySelector('.procentage').innerText = '%';
                    }

                    if (count < target) {
                        counter.innerText = count + Math.ceil(target / 50); // Увеличиваем количество
                        setTimeout(updateCount, 20); // Обновляем каждую 20 мс
                    } else {
                        counter.innerText = target; // Устанавливаем конечное значение
                    }
                };
                updateCount();
            }
        });
    } catch {}
}

function FonAnimation(){
    try{
        let fon = document.getElementById("fon");
        let element = document.getElementById("elem");
        let element2 = document.getElementById("blss");
        const rect = document.getElementById("imgmaiin").getBoundingClientRect();

        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (windowHeight + (rect.height / 2))) * 100;


        percent11 = 1. + (scrollPercent / 15 - 1);
        if(percent11 <= 0) fon.style.webkitFilter = "blur(0px)";
        else if(percent11 >= 10) fon.style.webkitFilter = "blur(100px)";
        else fon.style.webkitFilter = `blur(${percent11}px)`;


        percent1 = 0.4 - (scrollPercent / 60 - 1);
        if(percent1 <= 0) element.style.scale = 0;
        else if(percent1 >= 1) element.style.scale = 1;
        else element.style.scale = percent1;

        percent2 = 0.5 - (scrollPercent / 35 - 1);
        if(percent2 <= 0) element.style.opacity = 0;
        else if(percent2 >= 1) element.style.opacity = 1;
        else element.style.opacity = percent2;

        if (scrollPercent <= 50) {
            percent3 = 0.4 - (scrollPercent / 35 - 1);
            if(percent3 <= 0) element2.style.opacity = 0;
            else if(percent3 >= 1) element2.style.opacity = 1;
            else element2.style.opacity = percent3;
        }
        if (scrollPercent >= 50) {
            percent4 = -0.6 + (scrollPercent / 35 - 1);
            if(percent4 <= 0) element2.style.opacity = 0;
            else if(percent4 >= 1) element2.style.opacity = 1;
            else element2.style.opacity = percent4;
        }
    } catch {}
}

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

function auslg(){
    document.getElementById('sdbrl').classList.remove('sdbrl-open');
    document.getElementById('blured-f').classList.remove('active');
    document.getElementById('sdbrr').classList.remove('sdbrr-open');
    document.getElementById('blured-f').classList.remove('active');
    document.getElementById('searcher').classList.remove('sdbrr-open');
}

function fnc1(){
    document.getElementById('sdbrl').classList.add('sdbrl-open');
    document.getElementById('blured-f').classList.add('active');
}

function fnc2(){
    document.getElementById('sdbrr').classList.add('sdbrr-open');
    document.getElementById('blured-f').classList.add('active');
}

function fnc6(){
    document.getElementById('searcher').classList.add('sdbrr-open');
    document.getElementById('blured-f').classList.add('active');
}

function sdbrlvis(){
    try{
        document.getElementById('sdbrl').classList.add('active');
        document.getElementById('sdbrr').classList.add('active');
        document.getElementById('frame-main-text').classList.add('active');
    } catch {}
}

window.addEventListener('load', sdbrlvis);

function gyque(){
    try{
        auslg();
    } catch {}
    document.getElementById('hjgkq').classList.add('active');
    document.getElementById('7u3qf9eqw9').classList.add('active');
    document.getElementById('blured-f').classList.add('active');
}

function gyque2(){
    try{
        document.getElementById('hjgkq').classList.remove('active');
        document.getElementById('7u3qf9eqw9').classList.remove('active');
        document.getElementById('blured-f').classList.remove('active');
    } catch {}
}

//eusfak
function OpenThis(e){
    //console.log(e);
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

function OpenThis2(e, totalheight){
    const ul = e.parentElement.parentElement.querySelector('ul');

    //ul.style.height = `${ ul.scrollHeight }px`;
    ul.style.height = `${ totalheight }px`;
    e.classList.add('active');
    ul.classList.add('active');

    ul.addEventListener("transitionend", () => {
        if (ul.style.height !== `0px`){
            ul.style.height = "auto";
        }
    })
}

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

function FindContents(){
    const h3Elements = document.getElementById('postforsite').querySelectorAll('h3');
    let output = '';

    h3Elements.forEach(h3 => {
        output += `<li onclick="GetLink(this);" class="content-link-frame"><a class="link2">` + h3.textContent + `</a></li>`;
    });
    
    document.getElementById('output').innerHTML = output;
}

var khewdg = '';

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

function gotop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

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

function blacktheme(){;
    const theme = document.documentElement.getAttribute('data-color-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-color-theme', theme);
    localStorage.setItem('color-theme', theme);
}

function rrr(e){
    if (e.classList.contains('active') == false){
        e.classList.add("active");
        stopCounter();
    } else {
        e.classList.remove("active");
        startCounter();
    }
}

function NavigateActive(){
    try{
        var parent = document.querySelector('.header-navigaton-list');
        var childs = parent.querySelectorAll("li");
        childs.forEach(child => {
            var item = child.querySelector("a");
            var link = location.href.split('/')[0]+'/'+location.href.split('/')[1]+'/'+location.href.split('/')[2]+'/'+location.href.split('/')[3];
            if (item.href == link || item.href == link+'/'){
                item.classList.add('active');
            }
        });
    } catch {
        console.log('NavigateActive: ERROR');
    }
}

function CloseAll(){
    document.querySelectorAll('.sub-menu:not(.active)').forEach(item => {
        item.style = 'height: 0px';
    });
}

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

function MainAnimation() {
    try{
        let delay = 50;
        document.querySelectorAll('.advantages-form:not(.active)').forEach(item => {
            //console.log(1);
            const rect = item.getBoundingClientRect();
            if (rect.top - 150 <= window.innerHeight){
                if (rect.top >= 0) {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, delay);
                    delay += 50; 
                } else {
                    item.classList.add('active');
                }
            }
        });
    } catch {
        console.log('MainAnimation: ERROR');
    }
}

function updateScrollIndicator() {
    try{
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        const indicator = document.querySelector('.scroll-indicator');
        indicator.style.width = `${scrollPercent}%`;
    } catch {
        console.log('updateScrollIndicator: ERROR');
    }
}

let olditem = '';
function AnimationSliderNav(){
    try{
        let delay = 50;
        document.querySelectorAll('.position-fr').forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.bottom +100 <= window.innerHeight && rect.top -100 >= 0) {

                if (item != olditem)
                {
                    //olditem = item;
                    const left = item.querySelector('.form-list-items-dots-l');
                    const right = item.querySelector('.form-list-items-dots-r');
                    const formApple = item.querySelector('.form-apple');
                    

                    setTimeout(() => {
                        let maxWidth = left.scrollWidth + 15 + right.scrollWidth;
                        let currentWidth = window.getComputedStyle(formApple).width;

                        item.classList.add('active');
                        
                        formApple.style.setProperty('--start-width', `${maxWidth}px`);
                        formApple.style.setProperty('--current-width', `${currentWidth}`);

                    }, delay);
                    delay += 50; 
                }
            }
            else{
                item.classList.remove('active');
            }
            
        });
    } catch {
        console.log("AnimationSliderNav: ERROR");
    }
}

function CreateSlider(){
    const slides = document.querySelectorAll('.slider-slide');
    const dotsContainer = document.querySelector('.list-items-dots');

    slides.forEach((_, index) => {
        const dot = document.createElement('li');
        dot.classList.add('item-dot');
        dot.addEventListener('click', () => moveToSlide(index));
        const dotit = document.createElement('div');
        dotit.classList.add('dot');
        const progressbar = document.createElement('div');
        progressbar.classList.add('progress-bar');
        dotsContainer.appendChild(dot).appendChild(dotit).appendChild(progressbar);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.item-dot');
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
}

function updateSlider() {
    try{
        const transformValue = `translateX(-${currentIndex * 100}%)`;
        document.querySelector('.slider-slides').style.transform = transformValue;
        updateDots();
    } catch {}
}

window.addEventListener('load', () => {
    NavigateActive(); // поиск активной страницы
    CloseAll();
    finder(); // активация первой записи в документации
    MainAnimation(); // анимация появления записи на главной странице
    updateScrollIndicator(); // индикатор прокрутки страницы
    AnimationSliderNav(); // анимация части слайдера
    CreateSlider(); // создание слайдера
    updateDots(); // обновление точек слайдера
    updateSlider(); // обновление слайдера
    startCounter(); // начало отсчета слайдера
    PremFunction(document.getElementById('faq-2').querySelector('.advantages-form .vopros-otvet-form'));
    PremFunction2(document.getElementById('faq-3').querySelector('.advantages-form .vopros-otvet-form')); 
});

document.addEventListener('DOMContentLoaded', () => {
    if (location.href.split('/')[3] == 'help'){
        document.querySelector('.headersearchtwo').classList.add('active');
        document.querySelector('.headersearch').classList.add('active');
    } else {
        document.querySelector('.headersearchtwo').classList.remove('active');
        document.querySelector('.headersearch').classList.remove('active');
    }
});

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

//touchslider
document.addEventListener('DOMContentLoaded', () => {
    const divElement = document.querySelector('.slider-item-container');
    const slidesTrack = document.getElementById('slider-slides');

    let move = false;
    var FirstPosX = 0;
    let transitioned = false;
    var distance = 0;
    let sliderwidth = document.querySelector('.slider-slide').scrollWidth;
    var procent = 0;
    let activeelement = 'none';

    slidesTrack.addEventListener('transitionrun', () => {
        transitioned = true;
    });
    slidesTrack.addEventListener('transitionend', () => {
        transitioned = false;
    });

    let slides = document.querySelectorAll('.slider-slide');
    slides.forEach(element => {
        element.addEventListener('click', function(event) {
            activeelement = this;
            event.preventDefault(); // Отмена перехода по ссылке
        });
        element.addEventListener('mousedown', function(event) {
            activeelement = this;
        });
    });

    function touchstart(){
        event.preventDefault();
        if (transitioned == false){
            FirstPosX = event.offsetX;
            slidesTrack.style.transition = 'none';
            move = true;
        }
    }
    
    function touchend(){
        if (move == true){
            move = false;
            slidesTrack.style.transition = 'transform 0.5s ease';
    
            if (procent >= 20){
                console.log('следующий слайд');
                moveToSlide(currentIndex + 1);
            } else if (procent <= -20){
    
                console.log('предыдущий слайд');
                moveToSlide(currentIndex - 1);
            } else {
                console.log(procent + '%');
                if (procent >= -5 && procent <= 5){
                    console.log('переход по ссылке: ' + activeelement.href);
                    location.href = activeelement.href;

                    //console.log('переход по ссылке: ' + activeelement.href.replace('news-home', 'news'));
                    //location.href = activeelement.href.replace('news-home', 'news');
                } else {
                    console.log('текущий слайд');
                }
                slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
    
            procent = 0;
            distance = 0;
        }
    }

    
    function touchmove() {
        if (move) {
            const x = event.offsetX;
            var style = window.getComputedStyle(slidesTrack);
            var matrix = new WebKitCSSMatrix(style.transform);
            distance += (FirstPosX - x);
            procent = distance * 100 / sliderwidth
            slidesTrack.style.transform = `translateX(${matrix.m41 + (FirstPosX - x) * -1}px)`;
        }
    }

    divElement.addEventListener('mousedown', touchstart);
    divElement.addEventListener('mouseup', touchend);
    divElement.addEventListener('mousemove', touchmove);
    divElement.addEventListener('mouseout', touchend);
});

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

function clearsearch(){
    document.getElementById('searchinputheader').value = "";
    document.getElementById('searchinputheader1').value = "";

    //document.getElementById('searchform').innerHTML = "";
    //document.getElementById('searchform2').innerHTML = "";

    document.getElementById('searchform').classList.remove('active');
    document.getElementById('searchform2').classList.remove('active');
}

function clearfffin(){
    document.getElementById('filterinput').value = '';
    filtered();
}

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

let currentIndex = 0;
const slideDuration = 5000;
let count = 0;
let interval;
let isRunning = false;

function moveToSlide(index) {
    document.querySelector('.slider-slides').classList.remove('active');
    if (currentIndex != index){
        currentIndex = index;
        updateSlider();
        count = 0;
    }
}

function resetTimer(index){
    currentIndex = index;
    updateSlider();
}

function stopCounter() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    }
}

function startCounter() {
    const slides = document.querySelectorAll('.slider-slide');

    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            count += 100; // Увеличиваем на 100 мс
            document.querySelectorAll('.item-dot.active').forEach(item => {
                if (item.classList.contains('active') == true){
                    item.querySelector('.dot .progress-bar').style.width = count * 0.02 + '%'; // Устанавливаем новую ширину
                } else {
                    item.querySelector('.dot .progress-bar').style.width = 0 + '%'; // Устанавливаем новую ширину
                }
            });
            
            
            
            if (count >= slideDuration) {
                console.log("Счетчик достиг 5000 мс. Сбрасывается.");
                count = 0; // Сбрасываем счетчик
                resetTimer((currentIndex + 1) % slides.length);
            }
        }, 100); // Запуск через каждые 100 мс
    }
}

/*   #######################################   RECODED START   #######################################   */
let loadedImages = 0;

function PremFunction(e){

    const navs = document.getElementById('faq-2').querySelectorAll('nav');
    navs.forEach(form => {
        const item = form.parentElement;
        const nav = item.querySelector('nav');
        const output = document.getElementById('output');
        const imgSrc = nav.querySelector('img').src;
        const newImg = document.createElement('img');

        const currentImg = e.querySelector('nav').querySelector('img').src;
        if (loadedImages < navs.length){
            loadedImages++;
            newImg.src = imgSrc;
            newImg.className = 'fade-out';
            output.appendChild(newImg);
        }

        if (item.classList.contains('active') == false && item == e){
            item.classList.add('active');
            nav.style.height = `${ nav.scrollHeight }px`;


            const outputimages = output.querySelectorAll('img');
            outputimages.forEach(outputimage => {
                if (outputimage.src == currentImg){
                    outputimage.classList.add('fade-in');
                } else {outputimage.classList.remove('fade-in')}
            });

            nav.addEventListener("transitionend", () => {
                if (nav.style.height !== `0px`){
                    nav.style.height = "auto";
                }
            })
            
        } else if (item.classList.contains('active') == true && item != e)  {
            nav.style.height = `${ nav.scrollHeight }px`;
            window.getComputedStyle(nav, null).getPropertyValue("height");
            nav.style.height = "0px";
            item.classList.remove('active');
        }
    });
}

function myfunction212(e){
    console.log(e);
    location.href = e;
}

function PremFunction2(e){

    const navs = document.getElementById('faq-3').querySelectorAll('nav');
    navs.forEach(form => {
        const item = form.parentElement;
        const nav = item.querySelector('nav');

        if (item.classList.contains('active') == false && item == e){
            item.classList.add('active');
            nav.style.height = `${ nav.scrollHeight }px`;


            nav.addEventListener("transitionend", () => {
                if (nav.style.height !== `0px`){
                    nav.style.height = "auto";
                }
            })
            
        } else if (item.classList.contains('active') == true && item != e)  {
            nav.style.height = `${ nav.scrollHeight }px`;
            window.getComputedStyle(nav, null).getPropertyValue("height");
            nav.style.height = "0px";
            item.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', () => {
    MainAnimation();
    FonAnimation();
    CounterBox();
    updateScrollIndicator();
    AnimationSliderNav();

    if (document.documentElement.scrollTop > 600) {
        document.getElementById("yak").classList.add('active');
    } else {
        document.getElementById("yak").classList.remove('active');
    }
});

window.addEventListener('resize', () => {
    MainAnimation();
    AnimationSliderNav();
});

/*   #######################################   RECODED END   #######################################   */

let showAll = false;

function clicckckkck(){
    const children = document.querySelectorAll('.faq .advantages-form');

    showAll = !showAll;
    children.forEach((child, index) => {
        if (showAll) {
            child.style.display = 'flex';
        } else {
            if (index < 5) {
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        }
    });
    document.getElementById('button-faq-text').textContent = showAll ? 'Показать первые 5' : 'Показать все';
}
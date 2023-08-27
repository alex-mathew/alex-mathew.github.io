$(".more").hide();
$(".more-trigger").click(function(e) {
e.preventDefault();
$(this).fadeOut(400, function() {
    $(this).nextAll(".more").fadeIn();
});
});

var TxtRotate = function(el, toRotate, period) {
this.toRotate = toRotate;
this.el = el;
this.loopNum = 0;
this.period = parseInt(period, 10) || 2000;
this.txt = '';
this.tick();
this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
var i = this.loopNum % this.toRotate.length;
var fullTxt = this.toRotate[i];

if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
}

this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

var that = this;
var delta = 300 - Math.random() * 100;

if (this.isDeleting) { delta /= 2; }

if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
} else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
}

setTimeout(function() {
    that.tick();
}, delta);
};

window.onload = function() {
var elements = document.getElementsByClassName('txt-rotate');
for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
    new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
}
// INJECT CSS
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
document.body.appendChild(css);
};

const gitHubUsername = "alex-mathew";
loadUserRepos(gitHubUsername);

/*
function setCountOfContributions(repos){
    const username = repos[0].split('/')[0]
    let contribs = []
    let xhr = [];
    for(j in repos)	
        xhr.push(new XMLHttpRequest())
    for(j in repos) {
        repo_name = repos[j];
        const contrib = `https://api.github.com/repos/${repo_name}/contributors`;
        xhr[j].open('GET', contrib, true);
        ncont = 0
        xhr[j].onload = function () {
            data = JSON.parse(this.response);
            for(i in data) {
                if(data[i]['login'] == username) {
                    let mapping = {};
                    mapping.name = repo_name;
                    mapping.ncontrib = data[i]['contributions'];
                    console.log(mapping);
                    contribs.push(mapping);
                }
            }
        }
        xhr[j].send();
    }
    for(k in contribs) {
        var sum = contribs.reduce(function(a, b){
            return a + b;
        }, 0);
        //console.log(sum); // Prints: 15
        document.getElementById(contribs[k]['name'].split('/')[1]).setAttribute("data-weight", Math.floor((contribs[k]['ncontrib']/sum)*10));
    }
}
*/


function setCountOfContributions(repo) {
    const username = repo.split('/')[0]
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/repos/${repo}/contributors`;
    xhr.open('GET', url, true);
    xhr.onload = function () {
        const data = JSON.parse(this.response);
        for(i in data) {
            if(data[i]['login'] == username){
                document.getElementById(repo.split('/')[1]).setAttribute("data-weight", data[i]['contributions']%10);
            }
        }
    }
    xhr.send();
}

function loadUserRepos(username){
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos`;
    xhr.open('GET', url, true);
    let ul = document.getElementsByClassName('wcloud')[0];
    let repos = []
    xhr.onload = function () {
        const data = JSON.parse(this.response);
        for(i in data) {
            repo_name = data[i]['full_name'];
            if(repo_name.length > 21)
                continue;
            let li = document.createElement('li');
            li.innerHTML = (`
                <a id=${repo_name.split('/')[1]} href="https://github.com/${repo_name}">${repo_name.split('/')[1]}</a>
            `);
            setCountOfContributions(repo_name);
            ul.appendChild(li);
        }
        console.log(repos);
    }
    xhr.send();
}


$('#career_link').hover(function () { // mouse-in 
            //$('#career_link').html('cathedral');
        },
            function () { // mouse-out
                //$('#career_link').html('career');
            }
)

$('#opensource_link').hover(function () { // mouse-in 
            //$('#opensource_link').html('bazaar');
        },
            function () { // mouse-out
                //$('#opensource_link').html('open-source');
            }
)

$("#home-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#home").offset().top},
        'slow');
});
$("#career-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#career").offset().top},
        'slow');
});
$("#opensource-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#opensource").offset().top},
        'slow');
});
$("#contact-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#contact").offset().top},
        'slow');
});
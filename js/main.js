'use strict';
console.log('Starting up');


function initPage() {
    createProjs();
    renderProjs();
}


function renderProjs() {

    var strHtmls = gProjs.map(function (proj) {
        return `
         <div class="col-md-3 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
            <div class="portfolio-hover" onclick="renderProjModal('${proj.id}')">
              <div class="portfolio-hover-content" >
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/thumb-${proj.id}.png">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
          </div>
          </div>            
        `
    })

    document.querySelector('.dynam-modal').innerHTML = strHtmls;
}


function renderProjModal(projId) {
    var strHtml = ''
    var proj = findProj(projId)
    var strHtml =
        `   <h2>${proj.name}</h2>
        <p class="item-intro text-muted">${proj.title}.</p>
        <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.png">
        <p>${proj.desc}</p>
        <ul class="list-inline">
            <li>Date: ${proj.publishedAt}</li>
            <li>Proj name : ${proj.title}</li>
            <li>tags : </li>
        </ul>
        <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i> Close Project </button> `

    document.querySelector('.modal-body').innerHTML = strHtml;

}


function onSendContact() {
    var to = 'asto1387@gmail.com';
    var subject = document.querySelector('#input-subject').value;
    var msgTxt = document.querySelector('.msg-body').value;

    window.location = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${msgTxt}`
}
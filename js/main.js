$(document).ready(onInit);
$('.btn-contact').click(event, onContactClick);
$('.linkedin-btn').click($('.linkedin-btn').attr('href'), changeUrl)


function onInit() {
    renderProtfolios();
}

function renderProtfolios() {
    var projects = getProjects();
    var strHtml = projects.map((project) => {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" data-proj-id="${project.id}" href="#portfolioModal">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="img/portfolio/${project.img}.png" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${project.name}</h4>
        <p class="text-muted">${project.category}</p>
        </div>
        </div>`
    }).join('\n');
    $('.tumbnail-container').html(strHtml);

    var $elLinks = $('.portfolio-link')
    $elLinks.click(function() {
        renderModal($(this).data('proj-id'));
    })
}

function renderModal(projId) {
    var proj = getProjectById(projId);
    var strHtml = `<h2>${proj.name}</h2>
    <p class="item-intro text-muted">${proj.intro}</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.img}.png" alt="">
    <p>${proj.describe}</p>
    <ul class="list-inline">
      <li>publishedAt: ${proj.publishedAt}</li>
      <li>Category: ${proj.category}</li>
      </ul>
      <button class="btn btn-primary mx-5 to-site">To the site!</button>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>`
    $('.modal-body').html(strHtml);

    $('.to-site').click(proj.url, changeUrl)
}

function onContactClick(ev) {
    ev.preventDefault();
    var email = $('.email-input').val();
    var subject = $('.subject-input').val();
    var body = $('.body-input').val()
    $('.offcanvas-btn').removeClass('offcanvas-btn-open')
    $('.offcanvas-aside').removeClass('offcanvas-aside-open')
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
}

function changeUrl(projUrl) {
    event.preventDefault();
    window.open(projUrl.data)
}
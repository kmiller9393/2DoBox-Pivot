$('#title-input').on('input', toggleDisabledSave);
$('#body-input').on('input', toggleDisabledSave);
$('#search-input').on('keyup', searchIdeaList); 
$(window).on('load', retrieveIdea);
$('.bottom-box').on('keyup', '.title-of-card', saveEditedTitle);
$('.bottom-box').on('keyup', '.body-of-card', saveEditedBody);
$('.bottom-box').on('click', '.card-container .upvote', upvoteIdea);
$('.bottom-box').on('click', '.card-container .downvote', downvoteIdea);
$('.bottom-box').on('click', '.card-container .delete-button', deleteIdea);


function toggleDisabledSave() {
     var saveButton = $('.save-btn');
    if  ($('#title-input').val() === '' || $('#body-input').val() === '') {
        saveButton.prop('disabled', true);
    } else {
        saveButton.prop('disabled', false);
    }
}

var newCard = function(card) {
    var ideaList = $('.bottom-box');
    var createdIdea =   
        `<section id=${card.id} class="card-container">
            <h2 class="title-of-card" contenteditable>${card.title}</h2>
            <button class="delete-button"></button>
            <p class="body-of-card" contenteditable>${card.body}</p>
            <button class="upvote"></button> 
            <button class="downvote"></button> 
            <p class="quality">quality: <span class="card-quality">${card.quality}</span></p>    
        </section>`;
    ideaList.prepend(createdIdea); 
};

function retrieveIdea() {
    for (var i = 0; i < localStorage.length; i++) {
     var retrievedIdea = localStorage.getItem(localStorage.key(i));
     var parsedIdea = JSON.parse(retrievedIdea);
     newCard(parsedIdea);
    };
};

var localStoreCard = function(card) {
    var cardString = JSON.stringify(card);
    localStorage.setItem(card.id, cardString);
}
 
$('.save-btn').on('click', function(event) {
    event.preventDefault();
    var card = { id: Date.now(), 
                 title: $('#title-input').val(),
                 body: $('#body-input').val(),
                 quality: 'None' }
    cardLaunchpad(card);
});
    
function cardLaunchpad(card) { 
    newCard(card);
    localStoreCard(card);
    $('form')[0].reset();
    toggleDisabledSave();
}

function upvoteIdea() {
    var currentQuality = $(event.target).siblings('p.quality').children('.card-quality')[0];
    if (currentQuality.innerText === "None"){
        currentQuality.innerText = "Low";
    } else if (currentQuality.innerText === "Low") {
        currentQuality.innerText = "Normal";
    } else if (currentQuality.innerText === "Normal") {
        currentQuality.innerText = "High";
        // console.log('normal');
    } else if (currentQuality.innerText === "High") {
        currentQuality.innerText = "Critical";
    } else {newQuality = "Critical"};
    var currentId = $(this).parent('section').attr('id')
    var newQuality = currentQuality.innerText
    saveQuality(currentId, newQuality);
};

function saveQuality(currentId, newQuality) {
    var retrievedIdea = localStorage.getItem(currentId);
    var parsedIdea = JSON.parse(retrievedIdea);
    var card = {
      id: parsedIdea.id, 
      title: parsedIdea.title, 
      body: parsedIdea.body, 
      quality: newQuality,
      };
    var stringifiedIdea = JSON.stringify(card);
    localStorage.setItem(currentId, stringifiedIdea);
};

function downvoteIdea() {
    var currentQuality = $(event.target).siblings('p.quality').children('.card-quality')[0];
    console.log(currentQuality);
    if (currentQuality.innerText === "Critical") {
        currentQuality.innerText = "High";
    } else if (currentQuality.innerText === "High") {
        currentQuality.innerText = "Normal"
    } else if (currentQuality.innerText === "Normal") {
        currentQuality.innerText = "Low";
    } else if (currentQuality.innerText === "Low"){
        currentQuality.innerText = "None";
    } else {currentQuality.innerText = "None"}
    var currentId = $(this).parent('section').attr('id')
    var newQuality = currentQuality.innerText
    saveQuality(currentId, newQuality);
};

function deleteIdea() {
    var cardHTML = $(event.target).closest('.card-container');
    cardHTML.remove();
    localStorage.removeItem(cardHTML[0].id);
};


function searchIdeaList() {
  var searchInput = $(this).val().toLowerCase();
  $('.card-container').each(function(index, element) {
  var text = $(element).text().toLowerCase();
  var match = !!text.match(searchInput);
  $(element).toggle(match);
  })
};

function saveEditedTitle() {
    var currentId = $(this).parent('section').attr('id');
    var newTitle = $(this).text();
    var retrievedIdea = localStorage.getItem(currentId);
    var parsedIdea = JSON.parse(retrievedIdea);
    var changedIdea = {
      id: parsedIdea.id, 
      title: newTitle, 
      body: parsedIdea.body, 
      quality: parsedIdea.quality,
      };
    var stringifiedIdea = JSON.stringify(changedIdea);
    localStorage.setItem(currentId, stringifiedIdea);
  }

  function saveEditedBody() {
    var currentId = $(this).parent('section').attr('id');
    var newBody = $(this).text();
    var retrievedIdea = localStorage.getItem(currentId);
    var parsedIdea = JSON.parse(retrievedIdea);
    var changedIdea = {
      id: parsedIdea.id, 
      title: parsedIdea.title, 
      body: newBody, 
      quality: parsedIdea.quality,
      };
    var stringifiedIdea = JSON.stringify(changedIdea);
    localStorage.setItem(currentId, stringifiedIdea);
  }


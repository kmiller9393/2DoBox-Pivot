$('#title-input').on('input', toggleDisabledSave);
$('#body-input').on('input', toggleDisabledSave);
$('#search-input').on('keyup', searchIdeaList); 
$(window).on('load', retrieveIdea);

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
            <h2 class="title-of-card">${card.title}</h2>
            <button class="delete-button"></button>
            <p class="body-of-card">${card.body}</p>
            <button class="upvote"></button> 
            <button class="downvote"></button> 
            <p class="quality">quality: <span class="card-quality">${card.quality}</span></p>    
        </section>`;
    ideaList.prepend(createdIdea); 
    assignButtonActions(); 
};

function assignButtonActions() {
    console.log('yes', event);
    $('.upvote').on('click', upvoteIdea);
    $('.downvote').on('click', downvoteIdea);
    $('.delete-button').on('click', deleteIdea);
}

function retrieveIdea() {
    for (var i = 0; i < localStorage.length; i++) {
     var retrievedIdea = localStorage.getItem(localStorage.key(i));
     var parsedIdea = JSON.parse(retrievedIdea);
     console.log(parsedIdea);
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
    console.log(card);
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
    console.log('downvote');
    var currentQuality = $(event.target).siblings('p.quality').children('.card-quality')[0];
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

function updateQuality() {
    $('.card-quality') = currentQuality.innerText;
    console.log(currentQuality.innerText);
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





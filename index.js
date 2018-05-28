$('#title-input').on('input', toggleDisabledSave);
$('#body-input').on('input', toggleDisabledSave);
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
            <p class="quality">quality: ${card.quality}</p>    
        </section>`;
    ideaList.prepend(createdIdea);    
};

function retrieveIdea() {
    // numCards++;
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
                 quality: 'swill' }
    cardLaunchpad(card);
});
    
function cardLaunchpad(card) {
    console.log(card);
    newCard(card);
    localStoreCard(card);
    $('form')[0].reset();
    toggleDisabledSave();
}

$(".bottom-box").on('click', function(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
});
      











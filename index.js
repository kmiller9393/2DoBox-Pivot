// var title = $('#title-input').val();
// var body = $('#body-input').val();
// var numCards = 0;
var qualityVariable = "swill";

$('#title-input').on('input', toggleDisabledSave);
$('#body-input').on('input', toggleDisabledSave);
$(window).on('load', retrieveIdea);

function toggleDisabledSave() {
    var titleInput = $('#title-input').val();
    var bodyInput = $('#body-input').val();
    var saveButton = $('.save-btn');
    if (titleInput === '' || bodyInput === '') {
        saveButton.prop('disabled', true);
    } else {
        saveButton.prop('disabled', false);
    }
}

var newCard = function(id , title , body , quality) {
    var ideaList = $('.bottom-box');
    var createdIdea = `<section id=${id} class="card-container"><h2 class="title-of-card">  
        ${title}</h2>
        <button class="delete-button"></button>
        <p class="body-of-card">
        ${body}</p>
        <button class="upvote"></button> 
        <button class="downvote"></button> 
        <p class="quality">quality: ${quality}</p>    
        </section>`;
    ideaList.prepend(createdIdea);    
};

function cardObject() {
    return {
        title: $('#title-input').val(),
        body: $('#body-input').val(),
        quality: qualityVariable
    };
}

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

function retrieveIdea() {
    // numCards++;
    for (var i = 0; i < localStorage.length; i++) {
     var retrievedIdea = localStorage.getItem(localStorage.key(i));
     var parsedIdea = JSON.parse(retrievedIdea);
     console.log(parsedIdea);
     newCard(parsedIdea.id, parsedIdea.title, parsedIdea.body, parsedIdea.quality);
    };
  };

var localStoreCard = function(id) {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem(id, cardString);
}
 
$('.save-btn').on('click', function(event) {
      event.preventDefault();
      var title = $('#title-input').val();
      var body = $('#body-input').val();
      var $id = $.now();
      var quality = quality;
      console.log(title);
      console.log(body);
    newCard($id, title, body, quality);
    localStoreCard($id);
    $('form')[0].reset();
    toggleDisabledSave();
});

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
      











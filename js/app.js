'use strict';

//arrays that will store object instances for both pages
let pageArr = [];
let pageArrBackup = [];

let options = [];
let options2 = [];

/* got solution from here: https://stackoverflow.com/questions/16991341/json-parse-file-path */

// let jsonDataFirstPage = [];
// $.getJSON("../data/page-1.json", function(json) {
//   json.forEach(function(element){
//     jsonDataFirstPage.push(element);
//   });
  
// });


///////function to parse data from json to proper format
function jsonParse(filePath) {
  let request = new XMLHttpRequest();
  request.open('GET', filePath, false);
  request.send(null);
  return JSON.parse(request.responseText);
}
// ////////envoking jsonParse function for both files
let jsonDataFirstPage= jsonParse('data/page-1.json');
let jsonDataSecondPage = jsonParse('data/page-2.json');


//constructor function for object instances
function Section(rawData) {
  for (let key in rawData) {
    this[key] = rawData[key];
  }

  pageArr.push(this);
  pageArrBackup.push(this);
}

/////prototype to connect our data with handlebars template
Section.prototype.toHtml = function () {
  let template = $('#template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
};

/////////////////////////creating new object instances with json-1.json and json-2.json data for first page and second page
jsonDataFirstPage.forEach(jsonObject => {
  new Section(jsonObject);
  console.log(1);

});

jsonDataSecondPage.forEach(jsonObject => {
  new Section(jsonObject);
  console.log(2);

});
///////////////////////////////////

//////////////////////rendering all objects from pageArray and page2Array to the page
for (let i = 0; i < pageArr.length / 2; i++) {
  $('#page1').append(pageArr[i].toHtml());
}
for (let i = pageArr.length / 2; i < pageArr.length; i++) {
  $('#page2').append(pageArr[i].toHtml());
  $('#page2').hide();
}
//////////////////////////////////////////


/////////////////////adding uniqe keywords to drop down list for 2 pages
//pushing unique keywords to options array

jsonDataFirstPage.forEach(function (item) {
  if (options.includes(item.keyword) === false) {
    options.push(item.keyword);
  }
});
//append options.array to the dropdown list
options.forEach(function (element) {
  $('#keywordForm').append(`<option class ="one" value = ${element}>${element}</option>`);
});

//pushing unique keywords to options2 array

jsonDataSecondPage.forEach(function (item) {
  if (options2.includes(item.keyword) === false) {
    options2.push(item.keyword);
  }
});
//append options2.array to the dropdown list
options2.forEach(function (element) {
  $('#keywordForm').append(`<option class ="two" value = ${element}>${element}</option>`);
  $('option[class = two]').hide();
});
//////////////////////////////////////

////////////////////event handlers for the click on page 1 and 2
$('button[value = page2Button]').on('click', function () {
  $('#page2').show();
  $('#page1').hide();
  $('option[class = one]').hide();
  $('option[class = two]').show();
  $('button[value = page1Button]').css('background', '#fff1b8');
  $('button[value = page2Button]').css('background', 'rgb(255, 255,255)');
});

$('button[value = page1Button]').on('click', function () {
  $('#page1').show();
  $('#page2').hide();
  $('option[class = two]').hide();
  $('option[class = one]').show();
  $('button[value = page2Button]').css('background', '#fff1b8');
  $('button[value = page1Button]').css('background', 'rgb(255, 255,255)');
});
////////////////////////////////////////////

////////////////////////event handler to filter images by keyword
$('#keywordForm').on('change', function () {
  let selection = $(this).val();

  if (selection === 'default') {
    $('section').show();
  }

  else {
    $('section').hide();
    $(`section[class="${selection}"]`).show();
  }
});

/////////////////////////////////////

//////////////event handler for sorting all images
$('#sortByForm').on('change', function () {
  let selection = $(this).val();
  if (selection === 'default') {
    if ($('button[value="page1Button"]').css('background-color') === 'rgb(255, 255, 255)') {

      $('section').remove();
      for (let i = 0; i < pageArrBackup.length / 2; i++) {
        $('#page1').append(pageArrBackup[i].toHtml());
      }
      for (let i = pageArrBackup.length / 2; i < pageArrBackup.length; i++) {
        $('#page2').append(pageArrBackup[i].toHtml());
        $('#page2').hide();
      }
    }

    else {

      $('section').remove();
      for (let i = 0; i < pageArrBackup.length / 2; i++) {
        $('#page1').append(pageArrBackup[i].toHtml());
        $('#page1').hide();
      }
      for (let i = pageArrBackup.length / 2; i < pageArrBackup.length; i++) {
        $('#page2').append(pageArrBackup[i].toHtml());

      }
    }
  }

////////////sorting by title
  if (selection === 'byTitle') {

    pageArr.sort(function (a, b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });

    if ($('button[value="page1Button"]').css('background-color') === 'rgb(255, 255, 255)') {
      $('section').remove();
      for (let i = 0; i < pageArr.length / 2; i++) {
        $('#page1').append(pageArr[i].toHtml());
      }
      for (let i = pageArr.length / 2; i < pageArr.length; i++) {
        $('#page2').append(pageArr[i].toHtml());
        $('#page2').hide();
      }
    }

    else {
      $('section').remove();
      for (let i = 0; i < pageArr.length / 2; i++) {
        $('#page1').append(pageArr[i].toHtml());
        $('#page1').hide();
      }

      for (let i = pageArr.length / 2; i < pageArr.length; i++) {
        $('#page2').append(pageArr[i].toHtml());
      }
    }
  }

  ////////////sorting by horns
  if (selection === 'byHorns') {

    pageArr.sort(function (a, b) {
      var x = a.horns;
      var y = b.horns;
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });

    if ($('button[value="page1Button"]').css('background-color') === 'rgb(255, 255, 255)') {
      $('section').remove();
      for (let i = 0; i < pageArr.length / 2; i++) {
        $('#page1').append(pageArr[i].toHtml());
      }
      for (let i = pageArr.length / 2; i < pageArr.length; i++) {
        $('#page2').append(pageArr[i].toHtml());
        $('#page2').hide();
      }
    }

    else {
      $('section').remove();
      for (let i = 0; i < pageArr.length / 2; i++) {
        $('#page1').append(pageArr[i].toHtml());
        $('#page1').hide();
      }

      for (let i = pageArr.length / 2; i < pageArr.length; i++) {
        $('#page2').append(pageArr[i].toHtml());
      }
    }
  }

});

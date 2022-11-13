// Wraps all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var schedule = $('div.container-fluid');
  var rows = $('.row');
  var currentHour = dayjs().hour();
  var today = dayjs().format('dddd, MMMM Do');
  var saveSuccessMessage = $('#save-success');
 
  function saveSchedule(event) {
    var element = $(event.target);  
    // Uses DOM traversal to get the text that the user typed in the
    // time-block containing the button that was clicked.
    if(element.is('button')) {
      var eventText = element.prev('textarea').val();
    } else {
      var eventText = element.parent().prev('textarea').val();
    }
    // Uses the id in the containing time-block as a key to save the user input
    // in local storage.
    var row = element.parents('div');
    var rowId = row[0].id;    
    localStorage.setItem(`${rowId}`, eventText);
    saveSuccessMessage.fadeIn('slow', function(){
      saveSuccessMessage.delay(3000).fadeOut(); 
   });
  }  

  function init() {
    // Applies the past, present, or future class to each time
    // block by comparing the id to the current hour
    for(i = 0; i < rows.length; i++) {
      var rowId = rows[i].id;
      var row = $(`#${rowId}`);
      var rowHour = rowId.substring(5);
      if (rowHour < currentHour) {
        row.addClass('past');
      } else if (rowHour == currentHour) {
        row.addClass('present');
      } else {
        row.addClass('future');
      }
      // Gets saved events from localStorage and 
      // displays the values in the corresponding textblocks
      savedEvent = localStorage.getItem(`${rowId}`);
      row.children('textarea').text(savedEvent);
    }
  }

  // Displays the current date in the header of the page
  $('#currentDay').text(today);
  
  // Adds a listener for click events on the save button
  schedule.on('click', '.saveBtn', saveSchedule);

  //Runs when the page loads
  init();
});

// Wraps all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var schedule = $('div.container-fluid')
  var rows = $('.row')
  var currentHour = dayjs().hour()
  var today = dayjs().format('dddd, MMMM Do');
 
  function saveSchedule(event) {
    var element = $(event.target);  
    // Uses DOM traversal to get the text that the user typed in the
    // time-block containing the button that was clicked.
    if(element.is('button')) {
      var scheduleText = element.prev('textarea').val();
      var row = element.parents('div');
    } else {
      var scheduleText = element.parent().prev('textarea').val();
      var row = element.parents('div');
    }
    // Uses the id in the containing time-block as a key to save the user input
    // in local storage.
    var rowId = row[0].id;    
    localStorage.setItem(`${rowId}`, scheduleText);
    $('#save-success').fadeIn('slow', function(){
      $('#save-success').delay(3000).fadeOut(); 
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
      // Gets any user input that was saved in localStorage and 
      // sets the values of the corresponding textarea elements
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

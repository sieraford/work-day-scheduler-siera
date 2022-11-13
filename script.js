// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function saveSchedule(event) {
    var element = $(event.target);
    if(element.is('button')) {
      var scheduleText = element.prev('textarea').val();
      var row = element.parents('div');
    } else {
      var scheduleText = element.parent().prev('textarea').val();
      var row = element.parents('div');
    }
    var rowId = row[0].id;    
    localStorage.setItem(`${rowId}`, scheduleText);
  }  

  var schedule = $('div.container-fluid')
  schedule.on('click', '.saveBtn', saveSchedule);
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var rows = $('.row')
  var currentHour = dayjs().hour()

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
    userInput = localStorage.getItem(`${rowId}`);
    scheduledEl = row.children('textarea').text(userInput);
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // TODO: Add code to display the current date in the header of the page.


  var today = dayjs().format('dddd, MMMM Do');
  $('#currentDay').text(today);
});

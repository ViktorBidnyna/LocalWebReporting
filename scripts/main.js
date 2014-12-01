	//Function for getting days in month
	Date.prototype.daysInMonth = function() {
			return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
	};
	/////////////////////////////////////////////////////////////////////////////////

    //Constants
    var MINYEAR = 1950;
    var MAXYEAR = 2099;
    var DAYSINWEEK = 7;
    var daysWeekName = document.getElementsByClassName('weekDay');

	//Object which represents monthes
	var monthes = {
			'January': [0], 
			'February': [1], 
			'March': [2], 
			'April': [3],
			'May': [4],
			'June': [5], 
			'July': [6], 
			'August': [7],
			'September': [8],
			'October': [9],
			'November': [10],
			'December': [11]
		};

	var monthSelect = document.getElementById('month');

	//Filling tag <select> with id = 'month' by names of monthes 
	function fillMonthSelects(){
		var option = '';

		for(key in monthes){
		option += '<option>' + key + '</option>'; 
		}

		monthSelect.innerHTML += option;
	};
	
	var yearSelect = document.getElementById('year');

	//Filling tag <select> with id = 'year' by nubers of years
	function fillYearSelects(){
		var option = '';
		for(var i = MINYEAR; i < MAXYEAR; i++){
		option +='<option>' + i + '</option>'; 
		}

		yearSelect.innerHTML += option;
	};

	fillMonthSelects();
	fillYearSelects();

	//Create calendar
	function calendar(year, month){
		var el = document.getElementById('panel');		
		var currentDate = new Date();
		var date = new Date(year, month);
		var tab = '<table id="calendarTable"><tr><th>Mn</th><th>Tu</th><th>We</th><th>Th</th>'+
				'<th>Fr</th><th>St</th><th>Sn</th></tr><tr>';

		//Number of days of the week which begins a month
		var dayOfCurrentMonth = date.getDay();

		//Fill calendar with previous month date if current month begins not from Monday
		if(date.getDay() === 0){
			date.setDate(date.getDate()-6);
			for (var i = 0; i < 6; i++) {
			//Create id for each cell in calendar
		    var idCalendarDay = date.getFullYear().toString() + date.getMonth() + date.getDate();
			tab += '<td onclick="previousMonth()" style="opacity: 0.4;" id="' + idCalendarDay + '">' + 
				date.getDate() + '</td>';

			date.setDate(date.getDate()+1);
			}
		}else{
			dayOfCurrentMonth = date.getDay();
			date.setDate(date.getDate() - (dayOfCurrentMonth-1));
			for (var i = 0; i < dayOfCurrentMonth-1; i++) {
				var idCalendarDay = date.getFullYear().toString() + date.getMonth() + date.getDate();
				tab += '<td onclick="previousMonth()" style="opacity: 0.4;" id="' + idCalendarDay + '">' + 
					date.getDate() + '</td>';

				date.setDate(date.getDate()+1);
			}
		};

		//Fill the calendar date of the current month

		//Days in month	
		var days = date.daysInMonth();

		for(var i=date.getDate(); i<=days; i++){
			//Create id for each cell in calendar
		    var idCalendarDay = date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDate();
		   
		    if(currentDate.getDate() === date.getDate() && currentDate.getMonth() === date.getMonth() && 
		    	currentDate.getFullYear() === date.getFullYear()){		    	
				tab += '<td onclick="onCalendarButtonPress(event)" class="currentDayTd" id="' + idCalendarDay + '">' + date.getDate() + '</td>';
		    }
		    else{
				tab += '<td onclick="onCalendarButtonPress(event)" id="' + idCalendarDay + '">' + date.getDate() + '</td>';
			}
			
			if(date.getDay() === 0){
				tab +='</tr><tr>';
			}

			if(date.getDate()!=days){
				date.setDate(date.getDate()+1);
			}
		}	
		
		//Fill calendar with next month date if current month ends not in Sunday
		if(date.getDay() != 0){
			dayOfCurrentMonth = date.getDay();
			for (var i=0; i < DAYSINWEEK-dayOfCurrentMonth; i++) {				
				date.setDate(date.getDate()+1);
		    	var idCalendarDay = date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDate();
				tab += '<td onclick="nextMonth()"  style="opacity: 0.4;" id="' + idCalendarDay + '">' + 
					date.getDate() + '</td>';
			}
		}

		//Close table
		tab += '</tr></table>';

		//Fill element with id='panel' table
		el.innerHTML = tab;
		isDrown = true;
		return date;
	};

	//Draw calendar with current date when page load
	function drawCalendarOnload(){

		//Current date
		var currentDate = new Date();
		for(var i=0; i<monthSelect.options.length; i++){
			if(monthSelect.options[i].index === currentDate.getMonth()){
				monthSelect.options[i].selected = true;
			}
		}

		for(var j=0; j<yearSelect.options.length; j++){
			if(yearSelect.options[j].value === currentDate.getFullYear().toString()){
				yearSelect.options[j].selected = true;
			}
		}

		//Drawing calendar
		drawCalendar();
		var currDateId = $('.currentDayTd').toArray()[0].id;
		var currDate = currDateId.split('-');

		getDaysOfPointedWeek(new Date(), currDate, daysWeekName);
		 
	}

	//Draw calendar
	function drawCalendar(){
		var monthFromSelect = monthSelect.options[monthSelect.selectedIndex].value;
		var yearFromSelect = yearSelect.options[yearSelect.selectedIndex].value;
		
		calendar(parseInt(yearFromSelect), monthes[monthFromSelect][0]);   		

		$('.taskDiv').remove();
		$('.formDiv').hide(0);
	}
	
	//Events for <selects> (handle when change selected item)
    monthSelect.addEventListener('change', drawCalendar, false);
    yearSelect.addEventListener('change', drawCalendar, false);
	
	//Create variables for button 
	var next =  document.getElementById('next');
	var previous =  document.getElementById('previous');	
	
	//Styles for span button
	function buttonNextPreviousStyle(){
		previous.style.onselectstart = function() { 
		    return false;
		}
		previous.style.onmousedown = function() { 
		    return false;
		}
		next.style.onselectstart = function() { 
		  return false;
		}
		next.style.onmousedown = function() { 
		    return false;
		}
	}
	buttonNextPreviousStyle();
	//Functions for next and previous button

	//Function for previous button 
	function previousMonth(){
		var monthFromSelect = monthSelect.options[monthSelect.selectedIndex].value;
		var yearFromSelect = yearSelect.options[yearSelect.selectedIndex].value;

		if(yearSelect.selectedIndex === 0){
			if(monthSelect.selectedIndex === 0){
				console.log("No way back");
			}
			if(monthSelect.selectedIndex > 0) {
				monthSelect.selectedIndex -=1;
				calendar(parseInt(yearFromSelect), monthes[monthFromSelect][0]-1);
			}
		}
		
		if(yearSelect.selectedIndex > 0){
			if(monthSelect.selectedIndex > 0){
				monthSelect.selectedIndex -=1;
				calendar(parseInt(yearFromSelect), monthes[monthFromSelect][0]-1);
			}else{			
				monthSelect.selectedIndex = 11;
				yearSelect.selectedIndex -= 1;
				calendar(parseInt(yearFromSelect), monthes[monthFromSelect][0]-1);
			}
		}
	}

	//Function for next button 
	function nextMonth(){
		var monthFromSelect = monthSelect.options[monthSelect.selectedIndex].value;
		var yearFromSelect = yearSelect.options[yearSelect.selectedIndex].value;	

		if(yearSelect.selectedIndex === yearSelect.options.length){
			if(monthSelect.selectedIndex === 11){
				console.log("No way forward");
			}else{
				monthSelect.selectedIndex +=1;
				calendar(parseInt(yearFromSelect), monthes[monthFromSelect][0]+1);
			}
		}

		if(yearSelect.selectedIndex < yearSelect.options.length && 
			monthSelect.selectedIndex < 11){

			monthSelect.selectedIndex +=1;
			calendar(parseInt(yearFromSelect), monthes[monthFromSelect][0]+1);
		}else{
			monthSelect.selectedIndex = 0;
			yearSelect.selectedIndex +=1;
			calendar(parseInt(yearFromSelect), monthes[monthFromSelect][0]+1);
		}
	}

	//Events for next and previos button
	previous.addEventListener('click', previousMonth, false);
	next.addEventListener('click', nextMonth, false);

	$(document).ready(drawCalendarOnload);

	function onCalendarButtonPress(event){
		var elementId = event.target.id;
		var date = elementId.split('-');
		var id;
		var dateWeekArray = [];
		var isSunday = false;

		//Hide and remove previous
		$('#' + id).parent('tr').css({"background": "#fff"});
		$('.taskDiv').remove();
		$('.formDiv').hide(0);
		$('tr').removeClass('pointWeek');
		$('.leftSide td').removeClass('pointedDay');

		var pointedDate = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));
		id = pointedDate.getFullYear() +'-'+ pointedDate.getMonth() +'-'+ pointedDate.getDate();
		$('#' + id).parent('tr').addClass('pointWeek');		
		$('#' + elementId).addClass('pointedDay');

		getDaysOfPointedWeek(pointedDate, date, daysWeekName);		
	}

	//return array of week days which are pointed
	function getDaysOfPointedWeek(pointedDate, date, daysWeekName){
		
		var tasks = $('#timeTable td').toArray();
		console.log(tasks);
		var dateWeekArray = [];
		
		//if Sunday
		if(pointedDate.getDay() === 0){
			pointedDate = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])-6);	
			for(var i=0; i < 7; i++){
				id = pointedDate.getFullYear() +'-'+ pointedDate.getMonth() +'-'+ pointedDate.getDate();
				dateWeekArray[i] = (pointedDate.getMonth() + 1) +'/'+ pointedDate.getDate();	
				pointedDate.setDate(pointedDate.getDate()+1);
			}	
		}else{
			pointedDate = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])-(pointedDate.getDay()-1));
			for(var i=0; i < 7; i++){
				id = pointedDate.getFullYear() +'-'+ pointedDate.getMonth() +'-'+ pointedDate.getDate();
				dateWeekArray[i] = (pointedDate.getMonth() + 1) +'/'+ pointedDate.getDate();			
				pointedDate.setDate(pointedDate.getDate()+1);
			}
		}

		for(var i=0; i<7; i++){
			daysWeekName[i].innerHTML = daysWeekName[i].id +', '+ dateWeekArray[i];
		}

		//set to task divs classes
	}

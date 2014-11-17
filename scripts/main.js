	//Function for getting days in month( Found in internet :-) )
	Date.prototype.daysInMonth = function() {
			return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
	};

	////////////////////////////////////////////////////////////////////////////

	//Object which represents monthes 
	var monthes = {
			'Січень': [0], 
			'Лютий': [1], 
			'Березень': [2], 
			'Квітеь': [3],
			'Травень': [4],
			'Червень': [5], 
			'Липень': [6], 
			'Серпень': [7],
			'Вересень': [8],
			'Жовтень': [9],
			'Листопад': [10],
			'Грудень': [11]
		};

	//Current date
	var currentDate = new Date();
	
	var monthSelect = document.getElementById('month');

	//Filling tag <select> with id = 'month' by names of monthes 
	function fillMonthSelects(){
		var option = '';

		for(key in monthes){
		option +='<option>' + key + '</option>'; 
		}

		monthSelect.innerHTML += option;
	}

	
	var yearSelect = document.getElementById('year');

	//Filling tag <select> with id = 'year' by nubers of years
	function fillYearSelects(){
		var option = '';
		for(var i = 1950; i< 2099; i++){
		option +='<option>' + i + '</option>'; 
		}

		yearSelect.innerHTML += option;
	}

	//Create calendar
	function calendar(year, month){
		var monthes = ['Січень', 'Лютий', 'Березень', 'Квітеь', 'Травень', 'Червень', 
				'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];

		var el = document.getElementById('panel');
		var date = new Date(year, month);
		var tab = '<table id="calendarTable"><tbody><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th>'+
				'<th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>';

		//Number of days of the week which begins a month
		var dayOfCurrentMonth = date.getDay();

		//Fill calendar with previous month date if current month begins not from Monday
		if(date.getDay() === 0){			
			date.setDate(date.getDate()-6);
			for (var i = 0; i < 6; i++) {
			//Create id for each cell in calendar
		    var idCalendarDay = date.getFullYear().toString() + date.getMonth() + date.getDate();
			tab += '<td class="prevMonth" style="opacity: 0.4;" id="' + idCalendarDay + '">' + 
				date.getDate() + '</td>';

			date.setDate(date.getDate()+1);
			}
		}else{
			dayOfCurrentMonth = date.getDay();
			date.setDate(date.getDate() - (dayOfCurrentMonth-1));
			for (var i = 0; i < dayOfCurrentMonth-1; i++) {
				var idCalendarDay = date.getFullYear().toString() + date.getMonth() + date.getDate();
				tab += '<td class="prevMonth" style="opacity: 0.4;" id="' + idCalendarDay + '">' + 
					date.getDate() + '</td>';

				date.setDate(date.getDate()+1);
			}
		}

		//Fill the calendar date of the current month

		//Days in month	
		var days = date.daysInMonth();

		for(var i=date.getDate(); i<=days; i++){
			//Create id for each cell in calendar
		    var idCalendarDay = date.getFullYear().toString() + date.getMonth() + date.getDate();
			tab += '<td id="' + idCalendarDay + '">' + date.getDate() + '</td>';

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
			for (var i=0; i < 7-dayOfCurrentMonth; i++) {				
				date.setDate(date.getDate()+1);
		    	var idCalendarDay = date.getFullYear().toString() + date.getMonth() + date.getDate();
				tab += '<td class="nMonth" style="opacity: 0.4;" id="' + idCalendarDay + '">' + 
					date.getDate() + '</td>';
			}
		}

		//Close table
		tab += '</tr></tbody></table>';

		//Fill element with id='panel' table
		el.innerHTML = tab;

		//Set event listener for tds
		var previosMonthDate = document.getElementsByClassName('prevMonth');
		
		for(var i = 0; i < previosMonthDate.length; i++){
			previosMonthDate[i].addEventListener('click', previousMonth);
		}

		//Set event listener for tds
		var nextMonthDate = document.getElementsByClassName('nMonth');
		
		for(var i = 0; i < nextMonthDate.length; i++){
			nextMonthDate[i].addEventListener('click', nextMonth);
		}

		return date;
	};

	//Filling select tags data
	fillMonthSelects();
	fillYearSelects();

	//Draw calendar with current date when page load
	var htmlBody = document.getElementsByTagName('body');
	htmlBody[0].onload = drawCalendarOnload();	
	
	function drawCalendarOnload(){
		for(var i=0;i<monthSelect.options.length;i++){
			if(monthSelect.options[i].index === currentDate.getMonth()){
				monthSelect.options[i].selected = true;
			}
		}

		for(var j=0;j<yearSelect.options.length;j++){
			if(yearSelect.options[j].value === currentDate.getFullYear().toString()){
				yearSelect.options[j].selected = true;
			}
		}

		///Drawing calendar
		drawCalendar();	

		//Point current date
		pointCurrentDate();	
	}

	//Function for pointing current date
	function pointCurrentDate(){
		var idCalendarDay = currentDate.getFullYear().toString() + currentDate.getMonth() + currentDate.getDate();
		var currentDay = document.getElementById(idCalendarDay);
		
		if(currentDay !== null){
			currentDay.style.backgroundColor = '#DEB887';
		}
	}

	//Draw calendar
	function drawCalendar(){
		var monthFromSelect = monthSelect.options[monthSelect.selectedIndex].value;
		var yearFromSelect = yearSelect.options[yearSelect.selectedIndex].value;
		
		calendar(parseInt(yearFromSelect), monthes[monthFromSelect][0]);	    
	}
	
	//Events for <selects> (handle when change selected item)
    monthSelect.addEventListener('change', drawCalendar, false);
    yearSelect.addEventListener('change', drawCalendar, false);
	
	//Create variables for button 
	var next =  document.getElementById('next');
	var previous =  document.getElementById('previous');	
	
	//Styles for span button
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

		//Point current date
		pointCurrentDate();	
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

		//Point current date
		pointCurrentDate();	
	}

	//Events for next and previos button
	previous.addEventListener('click', previousMonth, false);
	next.addEventListener('click', nextMonth, false);
	//Function for getting days in month( Found in internet :-) )

	Date.prototype.daysInMonth = function() {
			return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
	};

	////////////////////////////////////////////////////////////////////////////

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

	//Filling tag <select> with id = 'month' by names of monthes 

	var monthSelect = document.getElementById('month');
	var nowDate = new Date();

	function fillMonthSelects(){
		var option = '';

		for(key in monthes){
		option +='<option>' + key + '</option>'; 
		}

		monthSelect.innerHTML += option;
	}

	//Filling tag <select> with id = 'year' by nubers of years

	var yearSelect = document.getElementById('year');

	function fillYearSelects(){
		var option = '';
		for(var i = 1950; i< 2099; i++){
		option +='<option>' + i + '</option>'; 
		}

		yearSelect.innerHTML += option;
	}

	//Create calendar

	function calendar(year, month){
		var monthes = ['Jenuary', 'February', 'March', 'April', 'May', 'June', 
				'July', 'August', 'September', 'October', 'November', 'December'];

		var el = document.getElementById('panel');
		var date = new Date(year, month);
		var tab = '<table><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th>'+
				'<th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>';
		
	//Fill calendar with empty fields if month do not begin from Monday

		if(date.getDay() === 0){
			for (var i=0; i < 6; i++) {
	 			tab += '<td></td>';
	 		}
		}

		if(date.getDay() != 0){
			for (var i=0; i < date.getDay()-1; i++) {
				tab += '<td></td>';
			}
		}

	//Fill the calendar date of the month

		do{	
			tab += '<td>' + date.getDate() + '</td>';
			if(date.getDay() === 0){
				tab +='</tr><tr>';
			}
			date.setDate(date.getDate()+1);

		}while(date.getDate() < date.daysInMonth());

		tab += '<td>' + date.getDate() + '</td>';
		
	//Fill calendar empty fields if it does not end on Sunday

		if(date.getDay() != 0){

			for (var i=0; i < 7-date.getDay(); i++) {
				
				tab += '<td></td>';
			}
		}

	//Close table

		tab += '</tr></table>';

	//Fill element with id='panel' table

		el.innerHTML = tab;
		return date;
	};

		fillMonthSelects();
		fillYearSelects();

	///Drawing calendar
	drawCalendar();

	//Change calendar
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
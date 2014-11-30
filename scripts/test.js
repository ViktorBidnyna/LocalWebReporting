var formDiv;

function creatDivForm(){
	//Create form
	var body = document.body;

	formDiv = document.createElement('div');
	formDiv.className = 'formDiv';

	//project
	var inputTextTask = document.createElement('select');
	inputTextTask.id = 'projectSelect';
	inputTextTask.className = 'formDivSelect inputTextTask';

	var labelTask = document.createElement('label');
	labelTask.htmlFor = 'projectSelect';
	labelTask.innerHTML = 'Project';
	labelTask.style.display = 'block';
	labelTask.className = 'formDivSelect inputTextTask';

	//worklog
	var inputTextWorkLog = document.createElement('select');
	inputTextWorkLog.id = 'workLogSelect';
	inputTextWorkLog.className = 'formDivSelect inputTextWorkLog';

	var labelWorkLog = document.createElement('label');
	labelWorkLog.htmlFor = 'workLogSelect';
	labelWorkLog.innerHTML = 'WorkLog';
	labelWorkLog.style.display = 'block';
	labelWorkLog.className = 'formDivSelect inputTextWorkLog';

	//hours
	var inputTextHour = document.createElement('select');
	inputTextHour.id = 'hoursSelect';
	inputTextHour.className = 'formDivSelect inputTextHour';

	var labelTextHour = document.createElement('label');
	labelTextHour.htmlFor = 'hoursSelect';
	labelTextHour.innerHTML = 'Hours';
	labelTextHour.style.display = 'block'; 
	labelTextHour.className = 'formDivSelect inputTextHour';

	//minutes
	var inputTextMinute = document.createElement('select');
	inputTextMinute.id = 'minuteSelect';
	inputTextMinute.className = 'formDivSelect inputTextMinute';

	var labelTextMinute = document.createElement('label');
	labelTextMinute.htmlFor = 'minuteSelect';
	labelTextMinute.innerHTML = 'Minutes';
	labelTextMinute.style.display = 'block';
	labelTextMinute.className = 'formDivSelect inputTextMinute'; 

	//description
	var inputTextDescription = document.createElement('textarea');
	inputTextDescription.id = 'textDescription';
	inputTextDescription.className = 'description';

	var labelTextDescription = document.createElement('label');
	labelTextDescription.htmlFor = 'textDescription';
	labelTextDescription.innerHTML = 'Description';
	labelTextDescription.className = 'labelDescription';

	//confirm
	var inputButtonConfirm = document.createElement('input');
	inputButtonConfirm.type = 'button';
	inputButtonConfirm.id = 'confirmButton';
	inputButtonConfirm.className = 'buttonDivForm';
	inputButtonConfirm.value = 'Confirm';

	//cancel
	var inputButtonCancel = document.createElement('input');
	inputButtonCancel.type = 'button';
	inputButtonCancel.id = 'cancelButton';
	inputButtonCancel.className = 'buttonDivForm';
	inputButtonCancel.value = 'Cancel';

	var labels = [labelTask, labelWorkLog, labelTextHour, labelTextMinute, labelTextDescription];
	var inputTexts = [inputTextTask, inputTextWorkLog, inputTextHour, inputTextMinute, inputTextDescription];
	var span;

	for(var i = 0; i < 5; i++){
		span = document.createElement('span');
		span.style.display = 'inline-block';
		
		span.appendChild(labels[i]);
		span.appendChild(inputTexts[i]);
		formDiv.appendChild(span);
	}
	//formDiv.appendChild(labelTextDescription);
	//formDiv.appendChild(inputTextDescription);
	formDiv.appendChild(inputButtonConfirm);
	formDiv.appendChild(inputButtonCancel);

	body.appendChild(formDiv);
}

function taskAdd(){
	var divTask = document.getElementsByClassName('task');
	var timeDiv = '<div class="timeDiv" style="height: 43px"><div class="dashedDiv"></div></div>';

	for(var divs = 0; divs < divTask.length; divs++){		
		var i = 0;
		while(i!=24){
			divTask[divs].innerHTML += timeDiv;
			i++;
		}		
	}

	var timeDivs = document.getElementsByClassName('timeDiv');

	for(var i = 0; i < timeDivs.length; i++){
			timeDivs[i].addEventListener('click', showDivForm);
	}

	var d = document.createElement('div');
	d.className = 'taskDiv';

	function showDivForm(){
		$('.formDiv').show(0);
		this.appendChild(d);

		var c = this.getBoundingClientRect();		
		formDiv.style.visibility = 'visible';
		if((c.right) > $('.rightSide').width()){	
			formDiv.style.top = c.top - 220 +'px';
			formDiv.style.left = c.right - 450 + 'px';
		}
		else if(c.left < 350){
			formDiv.style.top = c.top - 220 +'px';
			formDiv.style.left = c.left + 'px';
		}else{
			formDiv.style.top = c.top - 220 +'px';
			formDiv.style.left = c.left + (c.right -c.left)/2 - 225 + 'px';
		}
	}
}

//Create divForm
$(document).ready(creatDivForm);
taskAdd();




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
	console.log(timeDivs);

	for(var i = 0; i < timeDivs.length; i++){
			timeDivs[i].addEventListener('click', func);	
	}

	function func(){
		for(var i = 0; i < timeDivs.length; i++){
			timeDivs[i].style.background = 'white';
			timeDivs[i].style.height = '42px';
			timeDivs[i].style.borderBottom = '1px solid gray';	
	}
		this.style.background = 'gray';
	}
}

taskAdd();
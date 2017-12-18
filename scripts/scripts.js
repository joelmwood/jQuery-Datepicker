function displayCalendars() {
    var fromDate = document.getElementById("date").value;
    var days = document.getElementById("daysToAdd").value;
    
    var fromDate = new Date(fromDate);  
    //fromDate = fromDate.addDays(1);
    
    var endDate = new Date(fromDate);
    endDate = endDate.addDays(days);
        
    var fromYear = fromDate.getFullYear();
    var fromMonth = fromDate.getMonth()+1;
    var fromDay = fromDate.getDate()+1;
    
    var endYear = endDate.getFullYear();
    var endMonth = endDate.getMonth()+1;
    var endDay = endDate.getDate()+1;
    
    var maxDate = "'" + days + "d" + "'";
    
    var numOfMonthsToDisplay;
    
    if(fromYear==endYear && fromMonth == endMonth){
        numOfMonthsToDisplay = 1
    }else{
        numOfMonthsToDisplay = monthDiff(fromDate, endDate)+2;
    }
    
    $( function() {
		//testing for second selection of dates
		$("#datepicker").datepicker("destroy");
		
        $('#datepicker').datepicker({ 
            beforeShowDay: noWeekendsOrHolidaysOrBlockedDates,
            defaultDate: new Date(fromYear, fromMonth-1, fromDay),
            minDate: new Date(fromYear, fromMonth-1, fromDay),
            maxDate: new Date(endYear, endMonth-1, endDay-2),
            numberOfMonths: [numOfMonthsToDisplay, 1],
            
    });
    });
    
}  
function noWeekendsOrHolidaysOrBlockedDates(date) {
    //var noWeekend = jQuery.datepicker.noWeekends(date);
    return setHoliDays(date);
}

// set holidays function which is configured in beforeShowDay


function setHoliDays(date) {
    var holiDays =[
        [2008,01,01,'New Years Day'],
        [2008,02,18,'Presidents Day'],
        [2008,05,26,'Memorial Day'],
        [2008,07,04,'Independence Day'],
        [2008,09,01,'Labor Day'],
        [2008,11,27,'Thanksgiving Day'],
        [2008,12,25,'Christmas Day'],
        
        [2017,01,01,'New Years Day'],
        [2017,02,20,'Presidents Day'],
        [2017,05,29,'Memorial Day'],
        [2017,07,04,'Independence Day'],
        [2017,09,04,'Labor Day'],
        [2017,11,23,'Thanksgiving Day'],
        [2017,12,25,'Christmas Day'],
        
        [2018,01,01,'New Years Day'],
        [2018,02,19,'Presidents Day'],
        [2018,05,28,'Memorial Day'],
        [2018,07,04,'Independence Day'],
        [2018,09,03,'Labor Day'],
        [2018,11,22,'Thanksgiving Day'],
        [2018,12,25,'Christmas Day'],
        
    ];
    for (i = 0; i < holiDays.length; i++) {
     if (date.getFullYear() == holiDays[i][0]
    	  && date.getMonth() == holiDays[i][1] - 1
          && date.getDate() == holiDays[i][2]) {
        return [true, 'holiday', holiDays[i][3]];
     }
   }
  return [true, ''];
}
    
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
      
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days) + 1);
     return this;
};

function clearCalendars(){
    location.reload();  
}
function checkIfValidNumber (){
    var input = document.getElementById("daysToAdd").value;
    if (isNaN(input) || input < 1){
        document.getElementById("inputError").innerHTML = "Days must be a postive number.";
		document.getElementById("daysToAdd").style.borderColor = "red";
		document.getElementById("displayButton").disabled = true;
	}else {
        document.getElementById("inputError").innerHTML = "";
		document.getElementById("daysToAdd").style.borderColor = "";
		document.getElementById("displayButton").disabled = false;
    }
}

function checkIfValidDate(){
  var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    var testdate = document.getElementById("date").value;
    
    if(date_regex.test(testdate)){
        document.getElementById("dateError").innerHTML = "";
     document.getElementById("date").style.borderColor = "";
		document.getElementById("displayButton").disabled = false;
    }else{
        //alert(date_regex.test(testdate));
        document.getElementById("dateError").innerHTML = "Date Format must be mm/dd/yyyy.";
        document.getElementById("date").style.borderColor = "red";
		document.getElementById("displayButton").disabled = true;
    }
}
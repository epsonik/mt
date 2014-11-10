
function  dane(k,a){
 var list=[
["Mateusz","Nowak"],
["Jan", "Ziobro"],
 ["Juliusz","Machulski"],
 ["Jan","Kowalski"],
 ["Lech","Lichota"],
 ["Tina","Turner"],
["Aleksandra","Szwed"],
 ["Krystian","Karczyński"],
 ["Olaf","Szwędacz"],
 ["Jan","Burak"]
 ];
	return list[k][a];
}
function table(){
	return document.getElementById("myTable");
}

function getName(){
	var rand=Math.floor((Math.random()*10));
	return dane(rand,0);
}

function getSurename(){
	var rand=Math.floor((Math.random()*10));
	return dane(rand,1);
}

function getText(){
	return document.getElementById("studentsAmount").value;
}

function createTextBox(cell){
	var element2 = document.createElement("input");
	element2.type="text";
	cell.appendChild(element2);
}

function myFunction() {
		var k =getText();

		if(k<26){
			delTable();
			for(var i=k;i>0;i--){
				var row = table().insertRow(0);
			
				var cell1 = row.insertCell(0);
				cell1.innerHTML=i;
			
				var cell2 = row.insertCell(1);
				cell2.innerHTML=getName();
			
				var cell3 = row.insertCell(2);
				cell3.innerHTML=getSurename();
			}
		setHeaders();
		addCells();
		}
		else{
			alert("Error! Page allows just for 25 rows.");
		}
}

function createButton(cell){
	var button = document.createElement("BUTTON");
	var t =document.createTextNode("Dodaj");
	button.appendChild(t);
	button.setAttribute("id","but");
	button.setAttribute("onClick","addCells()")
	cell.appendChild(button);
}
function removeButton(){
			var cell=table().rows[0].cells;
			var cellCount=table().rows[0].cells.length;	
			if(cellCount!=4)
			cell[cellCount-2].innerHTML="";

}
function ad(){
	var rowCount=table().rows.length;
	for(var i=0;i<rowCount;i++ ){
		var cellCount=table().rows[i].cells.length;	
		var row=table().rows[i];
		var cell3 =row.insertCell(cellCount);
			if(i!=0)		
				createTextBox(cell3);
			else
				createButton(cell3);
	}
}
function addCells(){
		var cellCount=table().rows[1].cells.length;	
		if(cellCount<10){
			ad();
			removeButton();
		}
		else{
			alert("Allert. Page allows just for 10 cells!");
		}
}
function rowCount(){
	return table().rows.length;
}

function delTable(){
	var rowCount = table().rows.length;
	
	for(var i=0;i<rowCount;i++){
		table().deleteRow(0);
	}
}

function setHeaders(){
	var header=table().createTHead();
	var row = header.insertRow(0);

	var cell1 = row.insertCell(0);
	cell1.innerHTML="lp";

	var cell2 =row.insertCell(1);
	cell2.innerHTML="Imię";

	var cell3 = row.insertCell(2);
	cell3.innerHTML="Nazwisko";
}


function getStudentsAmount(){
	var studentsAmount= document.getElementById("studentsAmount")
		return studentsAmount.value;
}

function validFile(){
	var pattern=/(\.jpg|\.jpeg|\.gif|\.png)$/i;
	if(!pattern.exec(f().myFile.value)){
			alert("Error! Bad file extension. Must be:jpg,jpeg or gif.\n");
			return false;
	}
	else{
			return true;
	}
}
function f(){
	return document.forms['formul'];
}
function countChars(){
	f().counter.value++;
}
function countChars2(){
	f().counter.value=f().tArea.value.length;

}
function permissionToPD(){
	if (!f().permission.checked){
		alert("Error! Permission to process personal data is require to send form.\n");
		return false;
	}
	else{
		return true;
	}
}
function permissionToSend(){

	var a=permissionToPD();
	var b=validName();
	var c=validSurename();
	var d=validPersonalID();
	var k=a&b&c&d;
	if (!k){
		alert("Error! Name, Surename, Personal ID and permission to process personal data are require to send form!");
		return false;
	}
	else
		return true;
}
function validDateOfBirth(dateOfBirth){
	var pattern = /^((?:19|20)\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
	if(!pattern.test(f().birth_date.value)){
		alert("Error! Bad Date of Birth format. Must be RRRR-MM-DD");
		return false;
	}
	else{
		countAge();
		return true;
	}
}
function validName(){
	var pattern=/^[A-Z]{1}[a-z]{1,}$/
	if(!pattern.test(f().name.value)){
		alert("Error! Bad name format. Name begins from big letter and doesn't contain numbers.\n");
		return false;
	}
	else
		return true;
}
function validSurename(){
	var pattern=/^[A-Z]{1}[a-z]{1,}$/
	if(!pattern.test(f().surename.value)){
		alert("Error! Bad surename format. Surename begins from big letter and doesn't contain numbers.\n");
		return false;
	}
	else
		return true;
}

function splitDateOfBirth(dateOfBirth){
	return dateOfBirth.split("-");
}

function getYearFromDOB(dateOfBirth){
	return splitDateOfBirth(dateOfBirth)[0];
}

function getMonthFromDOB(dateOfBirth){
	return splitDateOfBirth(dateOfBirth)[1];
}

function getDayFromDOB(dateOfBirth){
	return splitDateOfBirth(dateOfBirth)[2];
}

function validPersonalID(){
	var pattern = /^[\d]{11}$/;
	var bd=f().birth_date.value;
	var pid=f().personalID.value;
		if(!pattern.exec(pid)){
			alert("Error! Bad personal ID. Personal ID contains 11 numbers.");
			return false;
		}
		else{
			var day=getDayFromDOB(bd)==getDayFromPI(pid);
			var month=getMonthFromDOB(bd)==getMonthFromPI(pid);
			var year=getYearFromDOB(bd).substring(2,5)==getYearFromPI(pid);
			var k=day&month&year;
			if(k){
				return true;
			}
			else{
				alert("Error! Bad personal ID. Personal ID contains 11 numbers and begins from birth date.");
				return false;
			}
		}
}
function getDayFromPI(personID){
	return personID.substring(4,6);
}

function getMonthFromPI(personID){
	return personID.substring(2,4);
}

function getYearFromPI(personID){
	return personID.substring(0,2);
}
function countAge(){
	var fk=f().birth_date.value;
	var date = new Date();

	var actualDay=date.getDate();
	var day=getDayFromDOB(fk);

	var actualYear=date.getFullYear();
	var year=getYearFromDOB(fk);

	var actualMonth=date.getMonth();
	var month=getMonthFromDOB(fk);

	var age=actualYear-year-1;

		if(actualDay>day&actualMonth>month){
			age++;
		}
	f().age.value=age;
}

var ie4, ns4, ns6;
var frmpole;
ie = document.all && !window.opera;
ns4 = document.layers;
ns6 = document.getElementById && !document.all;

// Aktualne data w kalendarzu
var data = new Date();
var amies = data.getMonth();
var arok = data.getFullYear();
var adzien = data.getDate();
var adzientyg = data.getDay();

// ilość dni w roku
var dni = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
// nazwy miesięcy
var miesiac = new Array('Styczeń','Luty','Marzec','Kwiecień', 'Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień');
// dni tygodnia
var dniTygodnia = new Array('Nd','Pn','Wt','Śr','Czw','Pt','So')

/************************* KONFIGURACJA *************************/

var pierwszyDzien = 0; // pierwszy dzień tygodnia pokazywany w kalendarzu: 0 - niedziela, 1 - poniedziałek, 2 - wtorek, itd..

var latWstecz = 0; // ilość lat wstecz jakie pokazuje kalendarz, gdy ustawiony na 0 brany jest pod uwagę rok początkowy  
var latWprzod = 0; // ilość lat wprzód jakie pokazuje kalendarz, gdy ustawiony na 0 brany jest pod uwagę rok końcowy
var rokOd = 1994; // rok początkowy pokazywany w polu wyboru lat
var rokDo = 2014; // rok końcowy pokazywany w polu wyboru lat

var template0 = new Array(18)
template0[0] = '#3253c1'; // kolor czcionki w polu dnia - dzień tygodnia 
template0[1] = '#888888'; // kolor czcionki w polu dnia - sobota
template0[2] = '#ff0000'; // kolor czcionki w polu dnia - niedziela
template0[3] = '#eeeeee'; // kolor tła kalendarza
template0[4] = '#ffffff'; // kolor tła dni kalendarza
template0[5] = '#ffffff'; // kolor czcionki w polu dnia - aktualny dzień
template0[6] = '#3253c1'; // kolor tła aktualnego dnia
template0[7] = '#ffffff'; // kolor czcionki przycisku zamykającego kalendarz 
template0[8] = '#ff0000'; // kolor tła przycisku zamykającego kalendarz
template0[9] = '#dddddd'; // kolor ramki wokół kalendarza
template0[10] = '#333333'; // kolor czcionki w polu wyboru roku i miesiąca
template0[11] = '#333333'; // kolor czcionki nazw dni tygodnia
template0[12] = '#eeeeee'; // kolor tła nazw dni tygodnia
template0[13] = 1; // Grubość ramki w pikselach
template0[14] = 11; // Rozmiar czcionki
template0[15] = false; // Pogrubienie czcionki w polu dni (true/false)
template0[16] = '#ff0000'; // kolor ramki wokół pola aktualnego dnia 
template0[17] = 'negative'; // Sposób wyświetlania aktualnego dnia (border/negative)

// Inne szablony           kcd       kcds      kcdn      ktk       ktdk      kcda      ktda      kcpz      ktpz      kr        kcpw      kcndt     ktndt    r c  bold
var template1 = new Array('#3253c1','#888888','#ff0000','#eeeeee','#ffffff','#ffffff','#3253c1','#ffffff','#ff0000','#dddddd','#333333','#333333','#eeeeee',1,11,true,'#ff0000','border');
var template2 = new Array('#888888','#888888','#ff0000','#ffffff','#efefef','#ffffff','#888888','#ffffff','#888888','#888888','#888888','#ffffff','#888888',2,11,false,'#999999','negative');

// wybór szablonu kolorów
var config = template0;

/************************* KONIEC KONFIGURACJI *************************/

// ilość dni w Lutym - przeliczane po zmianie miesiąca lub roku
function dniMies() {
	dni[1] = (((rok % 4 == 0) && (rok % 100 != 0)) || (rok % 400 == 0)) ? 29 : 28;
}

// pobieranie pozycji myszy
function mysz(e) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	} else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}

  x = posx;
  y = posy;
}

// funkcja pokazujaca kalendarz pod kursorem myszy
function showKal(fp) {
	data = new Date(arok, amies, 1);
	mies = data.getMonth();
	rok = data.getFullYear();
	dzien = data.getDate();
	dzientyg = data.getDay();
	
	dniMies();

	frmpole = fp;
	pozx = x;
	pozy = y;

	rysujKal();		
	
	if(ns6 || ie) {
		document.getElementById('container').style.left = pozx+'px';
		document.getElementById('container').style.top = (pozy+10)+'px';
		document.getElementById('container').style.visibility = 'visible';
	}
}

// funkcja ukrywajaca kalendarz i wstawiajaca wybraną datę do pola formularza
function hideKal() {
	if(ns6 || ie)
		document.getElementById('container').style.visibility = 'hidden';

	// uwzględnienie zer poprzedzających w miesiącu i dniu
	mies++;
	if(mies < 10)
		mies = '0' + mies;
	if(selectday < 10)
		selectday = '0' + selectday;

/************************* FORMAT DATY *************************/
	// Przykłady:
	// format = selectday + ' ' + miesiac[parseInt(mies-1)] + ' ' + rok;
	// format = rok + '-' + miesiac[parseInt(mies-1)] + '-' + selectday;
    format = rok + '-' + mies + '-' + selectday;	
/********************* KONIEC FORMATU DATY *********************/	
		
	frmpole.value = format;
}

// ukrywanie kalendarza bez wstawiania daty
function exitKal() {
	if(ns6 || ie)
		document.getElementById('container').style.visibility = 'hidden';
}

// ustawianie nowej daty po zmianie miesiaca lub roku
function setData() {
	mies = document.forms['sdata'].elements['month'].value;
	rok = document.forms['sdata'].elements['year'].value;
	
	data = new Date(rok, mies, 1);
	mies = data.getMonth();
	rok = data.getFullYear();
	dzien = data.getDate();
	dzientyg = data.getDay();
	dniMies();
	rysujKal();
}

// rysowanie kalendarza
function rysujKal() {
	kaltxt = '<form name="sdata" onSubmit="return false;">';
	kaltxt += '<table border="0" cellpadding="0" cellspacing="2" class="calendar">';
	kaltxt += '<tr><td colspan="6" height="25" class="closecalendar"><select name="month" class="selectfield" onChange="setData()">';		

	// rysowanie miesięcy
	for (i=0; i<12; i++) {
		if(i==mies)
			kaltxt += '<option value="'+i+'" selected="selected">'+miesiac[i]+'</option>';
		else
			kaltxt += '<option value="'+i+'">'+miesiac[i]+'</option>';
	}
	kaltxt += '</select>&nbsp;<select name="year" class="selectfield" onChange="setData()">';
	
	if (latWstecz>0)
		rokOd = arok - latWstecz;
	if (latWprzod>0)
		rokDo = arok + latWprzod;
		
	// rysowanie lat	
	for(i=rokOd; i<=rokDo; i++) {
		if(i==rok)
			kaltxt += '<option value="'+i+'" selected="selected">'+i+'</option>';
		else
			kaltxt += '<option value="'+i+'">'+i+'</option>';	
	}
	kaltxt += '</select>';
	kaltxt += '</td><td class="closecalendar"><a href="javascript:exitKal()" class="day closecalendar">X</a></td></tr>';
	kaltxt += '<tr>';

	// rysowanie nazw dni tygodnia
	for (i=0; i<7; i++) {
		dayIndex = (pierwszyDzien + i) %7;  
		kaltxt += '<td width="32" class="dayofweek">' + dniTygodnia[dayIndex] + '</td>'; 
	}
	kaltxt += '</tr><tr>';
	
	// rysowanie dni
	day = 1;
	for(i=0; day<=dni[mies]; i++)	{
		weekDay = (pierwszyDzien + i)%7;

    	roznica = (dzientyg - pierwszyDzien);
	   	if (i < ((roznica < 0) ? 7 + roznica: roznica)) {
			kaltxt += '<td></td>';
		} else {
			if(day==adzien && rok==arok && mies==amies)
				kaltxt += '<td class="day '+config[17]+'"><a class="day '+config[17]+'" href="javascript:selectday='+day+';hideKal();" >'+day+'</a></td>';
			else if (weekDay==6)
				kaltxt += '<td class="day"><a class="day sobota" href="javascript:selectday='+day+';hideKal();" >'+day+'</a></td>';
			else if (weekDay==0)
				kaltxt += '<td class="day"><a class="day niedziela" href="javascript:selectday='+day+';hideKal();" >'+day+'</a></td>';
			else
				kaltxt += '<td class="day"><a class="day" href="javascript:selectday='+day+';hideKal();" >'+day+'</a></td>';
			if(i%7==6)
				kaltxt += '</tr><tr>';
			day++;
		}
	}
	kaltxt += '</tr></table></form>';
	document.getElementById("kalendarz").innerHTML = kaltxt;
}

// style kalendarza i warstwa, na której się znajduje
document.write('<div class="kalendarz" id="container"><div id="kalendarz"></div><!--[if lte IE 6.5]><iframe src="javascript:"></iframe><![endif]--></div>');
document.write('<style type="text/css">');
document.write('.kalendarz{position:absolute; z-index:10;overflow:hidden;visibility:hidden;width:240px}');
document.write('.kalendarz iframe{display:none;display:block;position:absolute;top:0;left:0;z-index:-1;filter:mask();width:3000px;height:3000px}');
document.write('table.calendar{background-color:'+config[3]+';border:'+config[13]+'px '+config[9]+' solid}');
document.write('a.day{text-decoration:none;font-family:Verdana;font-size:'+config[14]+'px;color:'+config[0]+';font-weight:'+((config[15])?'bolder':'normal')+'}');
document.write('a.day:hover{text-decoration:underline}');
document.write('a.sobota{color:'+config[1]+'}');
document.write('a.niedziela{color:'+config[2]+'}');
document.write('a.negative{color:'+config[5]+'}');
document.write('a.border{color:'+config[0]+'}');
document.write('a.closecalendar{color:'+config[7]+';background-color:'+config[8]+';padding:1px 4px 1px 4px;font-weight:bolder}');
document.write('td.day{text-align:center;background-color:'+config[4]+';padding:1px 0px 1px 0px}');
document.write('td.negative{background-color:'+config[6]+'}');
document.write('td.border{border:'+config[16]+' 2px solid}');
document.write('td.closecalendar{text-align:center}');
document.write('td.dayofweek{text-align:center;background-color:'+config[12]+';font-family:Verdana;font-size:'+config[14]+'px;color:'+config[11]+'}');
document.write('.selectfield{font-family:Verdana;font-size:'+config[14]+'px;color:'+config[10]+';}');
document.write('</style>');

// uruchomienie obsługi myszy
document.onmousemove = mysz;






























   
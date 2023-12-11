function deleteItem(item, favorId){
	var bookItem = document.querySelector(item);
	var bookCart = bookItem.closest('div');
	var bookHref = bookCart.querySelector('a');
    var bookImage = bookHref.querySelector('img');
    var bookText = bookHref.querySelector('p');
	changeItem(favorId, bookHref, bookImage, bookText, false);
	window.location.reload();
}

function send() {
// Загрузка состояния выделения из localStorage при загрузке страницы
	var likeBooks =  JSON.parse(localStorage.getItem('likeBooks'));
	var notExist = true;
	for (var i=0; i<likeBooks.length;i++){
		var item = likeBooks[i];
		const bookItemHTML = `
		<div class="item">
			<a name="${item.id}" href="#${item.id}" class="gradient">
				<img src="${item.img}">
				<span></span>
         			<span></span>
         			<span></span>
         			<span></span>
				<p>${item.text}</p>
			</a>
			<a href="#" id="boxThree" onclick="deleteItem('.boxThree${i}', '${item.favor}')" class="boxThree${i}">
  				<div class="btn btn-three">
    				<span>Удалить</span>
  				</div>
			</a>
		</div>`
		const cartWrapper = document.querySelector('.cards');
		cartWrapper.insertAdjacentHTML('beforeend',bookItemHTML)
		notExist = false;
	}
	if (notExist){
		const noneItemHTML = `
		<div class="new">
         		<h2>Вы еще не добавили ни одной книги в Избранное!</h2>
				<img src="tenor.gif" height="350px">
      		</div>`
		const addWrapper = document.querySelector('.cards');
		addWrapper.insertAdjacentHTML('beforeend',noneItemHTML)
	}
};
	

var like = [];
function changeItem(favorId, bookHref, bookImage, bookText, add){
	if (localStorage.getItem('likeBooks')){
		like = JSON.parse(localStorage.getItem('likeBooks'));
	}
	var append = true;
	var needDelete;
	var findDelete = false;
	for (var i=0; i<like.length;i++){
		if (like[i].img == bookImage.getAttribute('src') && add==false){
			findDelete = true;
			needDelete = i;
			break;
		}
		if (like[i].img == bookImage.getAttribute('src') && add==true){
			append = false;
			break;
		}
	}
	if (findDelete){
		localStorage.setItem(favorId, '100');
		like.splice(needDelete, 1);
	}
	if (append && add){
		localStorage.setItem(favorId, '900');
		like.push({favor: favorId, id: bookHref.name, img: bookImage.getAttribute('src'), text: bookText.textContent})
	}
	localStorage.setItem('likeBooks', JSON.stringify(like));
}

var favors = document.querySelectorAll(".fa-heart");
favors.forEach(function(favor) {
	if (localStorage.getItem(favor.id) == '900'){
		favor.style.fontWeight = '900';
		var bookHref = favor.closest('a');
		var bookImage = favor.closest('a').querySelector('img');
		var bookText = favor.closest('a').querySelector('p');
		changeItem(favor.id, bookHref, bookImage, bookText, true);
	}
	else {
		favor.style.fontWeight = '100';
		var bookHref = favor.closest('a');
		var bookImage = favor.closest('a').querySelector('img');
		var bookText = favor.closest('a').querySelector('p');
		changeItem(favor.id, bookHref, bookImage, bookText, false);
	}
    favor.onclick = function() {
		var bookHref = favor.closest('a');
        var bookImage = favor.closest('a').querySelector('img');
        var bookText = favor.closest('a').querySelector('p');
        if (favor.style.fontWeight != '900'){
            favor.style.fontWeight = '900';
			localStorage.setItem(favor.id, '900');
			changeItem(favor.id,bookHref, bookImage, bookText, true);
        }
        else {
            favor.style.fontWeight = '100';
			localStorage.setItem(favor.id, '100');
			changeItem(favor.id, bookHref, bookImage, bookText, false);
			
        }
    }
});

var input,search,pr,result,result_arr, locale_HTML, result_store;

function func() {
 	locale_HTML = document.body.innerHTML;   // сохраняем в переменную весь body (Первоначальный)
}
setTimeout(func, 1000);  //ждем подгрузки Jsona и выполняем

function FindOnPage(name, status) {

	input = document.getElementById(name).value; //получаем значение из поля в html
	
	if(input.length<3&&status==true)
	{
		alert('Для поиска вы должны ввести три или более символов');
		function FindOnPageBack() { document.body.innerHTML = locale_HTML; }
	}
	
	if(input.length>=3)
	{
		function FindOnPageGo() {

			search = '/'+input+'/g';  //делаем из строки регуярное выражение
			pr = document.body.innerHTML;   // сохраняем в переменную весь body
			result = pr.match(/>(.*?)</g);  //отсекаем все теги и получаем только текст
			result_arr = [];   //в этом массиве будем хранить результат работы (подсветку)

			var warning = true;
			for(var i=0;i<result.length;i++) {
				if(result[i].match(eval(search))!=null) {
					warning = false;
				}
			}
			if(warning == true) {
				alert('Не найдено ни одного совпадения');
			}

			for(var i=0; i<result.length;i++) {
				result_arr[i] = result[i].replace(eval(search), '<span style="background-color:#b3aaa7; color:black;">'+input+'</span>'); //находим нужные элементы, задаем стиль и сохраняем в новый массив
			}
			for(var i=0; i<result.length;i++) {
				pr=pr.replace(result[i],result_arr[i])  //заменяем в переменной с html текст на новый из новогом ассива
			}
			document.body.innerHTML = pr;  //заменяем html код
		}
	}
	function FindOnPageBack() { document.body.innerHTML = locale_HTML; }
	if(status) { FindOnPageBack(); FindOnPageGo(); } //чистим прошлое и Выделяем найденное
	if(!status) { FindOnPageBack(); } //Снимаем выделение
}


function openImageWindow(src) {
    var image = new Image();
    image.src = src;
    var width = image.width;
    var height = image.height;
    window.open(src,"Image","width=" + width + ",height=" + height);
  }

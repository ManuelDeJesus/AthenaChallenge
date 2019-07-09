const url = 'https://randomuser.me/api/?results=20';
var Users = [];

function ItemAppend(parent, item)
{
	return parent.appendChild(item);
}

function NodeC(item)
{
	return document.createElement(item);
}

// function to fetch results by the API
fetch(url)
.then((response) => response.json())
.then(function (data){
	let users = data.results;
	return users.map(function(users){
		let li = NodeC('li'),
		a = NodeC('a'),
		img = NodeC('img'),
		span = NodeC('span');
		img.src = users.picture.medium;
		Users.push(users);
		a.className = "collection-item";
		span.innerHTML = `${users.name.last} ${users.name.first}`;
		ItemAppend(a,img); //li append
		ItemAppend(a,span);
		ItemAppend(li,a);
		ItemAppend(document.getElementById("ListOfUsers"),li);
		

	})

})
.then(function (){
	var items = document.querySelectorAll("#ListOfUsers li"), tab = [], index;
	var Userimag = document.getElementById("UserImg");
	for (let i = 0; i < items.length; i++) 
	{
		tab.push(items[i].innerHTML);
	}

	for(var i = 0; i < items.length; i++)
	{
			items[i].onclick = function(){
			index = tab.indexOf(this.innerHTML);
			Userimag.src = Users[index].picture.large;
			Userimag.height = 300;
			Userimag.width= 300;
			document.getElementById("Gender").innerHTML = Users[index].gender;
			document.getElementById("Name").innerHTML = Users[index].name.title + " " + Users[index].name.last + " " + Users[index].name.first;
			document.getElementById("Email").innerHTML = Users[index].email;
			document.getElementById("Phone").innerHTML = Users[index].cell;
			var x = document.querySelectorAll(".active");
			if (typeof x[0] !== "undefined") {
				x[0].className = "collection-item";
			}
			this.getElementsByTagName('a')[0].className = "collection-item active grey";
			};
	}



})
.catch(function(error){
	console.log(JSON.stringify(error));
})


function UserFilter (){
	let filterValue = document.getElementById('filterInput').value.toUpperCase();
	let UsersL = document.getElementById('ListOfUsers');
	let li = UsersL.querySelectorAll("#ListOfUsers li");

	for(let i = 0; i <li.length; i++){
		let span = li[i].getElementsByTagName('span')[0];
		
		if (span.innerHTML.toUpperCase().indexOf(filterValue) > -1){
			li[i].style.display = '';
		} else {
			li[i].style.display = 'none';
		}
	}

}
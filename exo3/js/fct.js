// js / fct.js


async function fetchInfo(id = 2, selector = 'main') {
	
	//on essaie d'acceder à l'url souhaitée
	try{

		const res = await fetch('https://api.tvmaze.com/shows/'+id)


		//si on a une réponse
		if(res.ok){


			//on la debug dans la console
			console.log('✅ url dispo')

			//on sort des données lorsqu'elles sont dispo
			//on cree une variable qui contiendra les données au format json dès que possible
			let data = await res.json()

			console.log(data)

			const art = document.createElement('article')
			const title = document.createElement('h1')
			title.innerHTML = data.name

			//on place le titre dans l'article
			art.appendChild(title)

			//résumé
			const sum = document.createElement('div')
			sum.innerHTML = data.summary
			art.appendChild(sum)

			//poster
			const fig = document.createElement('figure')
			const img = document.createElement('img')

			if(data.image == null) {
				img.setAttribute('src', 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png')
				img.setAttribute('alt', 'Aucune affiche')

			}else{
				img.setAttribute('src', data.image.medium)
				img.setAttribute('alt', 'Affiche de la série : '+data.name)
			}

			fig.appendChild(img)
			art.appendChild(fig)

			//on place l'article dans le main
			document.querySelector(selector).appendChild(art)

		//fin test
		}else{
			console.log('🔴 contenu non disponible')

			//on créé un message pour la page
			const err = document.createElement('em')
			err.innerHTML = 'La série #'+id+ ' n\'est pas disponible. Vous pouvez re-essayer '

			//on l'ajoute dans le selecteur
			document.querySelector(selector).appendChild(err)

		}

	//sinon (error)
	}catch(error){
		//message erreur
		console.log('🚫 impossible d\'accéder à l\'url')
	}

}

//fonction qui retourne un nombre entier entre [1 et max]
function getRandomInt(max){
	return Math.ceil(Math.random()*max)


	async function fetchSearch(query, selector = "main"){
		try{
			const res = await fetch('https://api.tvmaze.com/search/shows?q='+encoreURIComponent(query));

			if(res.ok){
				const data = await res.json();

				const container = document.querySelector(selector);
				container.innerHTML = "";


				const p = document.createElement("p");
				p.textContent = "resultats pour : "+query;
				container.appendChild(p);

				if(data.length === 0){
					const p2 = document.createElement("p");
					p2.textContent = "Aucun résultat";
					container.appendChild(p2);
					return;
				}

				const ul = document.createElement("ul");

				for (let i=0; i<data.length && i <10; i++){
					const show = data[i].show;

					const li = document.createElement("li");
					li.textContent = show.name;

					li.style.cursor = "pointer";
					li.onclick = function(){
						container.innerHTML = "";
						fetchInfo(show.id, selector);
					}

					ul.appendChild(li);
				}

				container.appendChild(ul);

			}else{
				console.log("🔴 contenu non disponible");
			}

		}catch(error){
			console.log("🚫 impossible d'accéder à l'url");
		}
		


	}
}
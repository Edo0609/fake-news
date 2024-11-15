class NewsViewer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.loadArticles();
	}

	async loadArticles() {
		try {
			const response = await fetch('https://news-foniuhqsba-uc.a.run.app/' + this.getAttribute('section'));
			if (!response.ok) {
				throw new Error('Error al obtener los artículos');
			}
			const articles = await response.json();
			this.renderArticles(articles);
		} catch (error) {
			console.error('Error:', error);
			this.innerHTML = `<p>Error al cargar los artículos. Inténtelo nuevamente más tarde.</p>`;
		}
	}

	renderArticles(articles) {
		const template = document.getElementById('article-template');


		this.innerHTML = '';

		articles.forEach(article => {

			const articleContent = document.importNode(template.content, true);


			articleContent.querySelector('.headline').textContent = article.headline;
			articleContent.querySelector('.abstract').textContent = article.abstract;
			articleContent.querySelector('.author').textContent = article.author;
			articleContent.querySelector('.section').textContent = article.section;
			articleContent.querySelector('.date').setAttribute('time', article.date);
			articleContent.querySelector('.url').href = 'article.html?id=' + article.id;


			this.appendChild(articleContent);
		});
	}
}


customElements.define('news-viewer', NewsViewer);

class RelativeTime extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.render()

		setInterval(() => {
			this.render()
		}, 1000)
	}

	static get observedAttributes() {
		return ['time']
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}

	render() {
		const time = new Date(this.getAttribute('time')).getTime();
		const now = Date.now();

		const diff = now - time;
		const seconds = Math.floor(diff / 1000)
		const minutes = Math.floor(diff / (1000 * 60));
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(days / 30);
		const years = Math.floor(months / 12);

		let aux = '...';

		if (years >= 1)
			aux = `Hace ${years} año${years > 1 ? 's' : ''}`
		else if (months >= 1)
			aux = `Hace ${months} mes${months > 1 ? 'es' : ''}`
		else if (weeks >= 1)
			aux = `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`
		else if (days >= 1)
			aux = `Hace ${days} día${days > 1 ? 's' : ''}`
		else if (hours >= 1)
			aux = `Hace ${hours} hora${hours > 1 ? 's' : ''}`
		else if (minutes >= 1)
			aux = `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
		else if (seconds >= 1)
			aux = `Hace ${seconds} segundo${seconds > 1 ? 's' : ''}`
		this.textContent = aux;


	}
}
customElements.define('relative-time', RelativeTime);

class CustomArticle extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.loadArticle();
	}

	async loadArticle() {
		try {
			const params = new URLSearchParams(location.search);
			const id = params.get('id')
			const response = await fetch('https://news-foniuhqsba-uc.a.run.app/' + id);
			if (!response.ok) {
				throw new Error('Error al obtener artículo');
			}
			const article = await response.json();
			this.renderArticle(article);
		} catch (error) {
			console.error('Error:', error);
			this.innerHTML = `<p>Error al cargar el artículo. Inténtelo nuevamente más tarde.</p>`;
		}
	}

	renderArticles(articles) {
		const template = document.getElementById('article-template');


		this.innerHTML = '';

		articles.forEach(article => {

			const articleContent = document.importNode(template.content, true);


			articleContent.querySelector('.headline').textContent = article.headline;
			articleContent.querySelector('.abstract').textContent = article.abstract;
			articleContent.querySelector('.author').textContent = article.author;
			articleContent.querySelector('.section').textContent = article.section;
			articleContent.querySelector('.date').setAttribute('time', article.date);
			articleContent.querySelector('.url').href = 'article.html?id=' + article.id;


			this.appendChild(articleContent);
		});
	}


}
customElements.define('custom-article', CustomArticle);
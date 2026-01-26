class BotoInici extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `        
            <style>
                button {
                    background-color: var(--accent, #333); /* Afegim un color per defecte per si --accent no existeix */
                    margin: 20px;
                    width: 200px;
                    padding: 10px; /* Una mica de padding perquè es vegi millor */
                    color: white;
                    border: none;
                    font-weight: bold;
                    cursor: pointer;
                }
            </style>
            <button role="link">TOP</button> 
        `;
        this.shadowRoot.querySelector('button').onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
}

customElements.define('boto-inici', BotoInici);
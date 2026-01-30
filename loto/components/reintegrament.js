import { ESTAT, desarEstat } from "../js/estat.js"; 

class ReintegrePremi extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.seleccioActual = ESTAT.reintegrament ? [Number(ESTAT.reintegrament)] : [];
    }

    connectedCallback()
    {
        this.render();
    }

    render()
    {
        ESTAT.reintegrament = 0;
        this.shadowRoot.innerHTML = `
            <style>
                .numeros-container 
                { 
                    display: grid; 
                    grid-template-columns: repeat(5, 1fr); 
                    gap: 8px; max-width: 300px; margin: 20px auto; 
                }
                .numero-btn 
                { 
                    width: 45px; 
                    height: 45px; border-radius: 50%; 
                    border: 2px solid var(--accent, #ff4500); 
                    background: white; font-weight: bold; color: var(--accent, #ff4500); cursor: pointer; 
                    }
                .numero-btn.seleccionado 
                { 
                    background-color: var(--accent, #ff4500); color: white; 
                }
                .numero-btn:disabled 
                { 
                    opacity: 0.3; cursor: not-allowed; filter: grayscale(1); 
                }
            </style>
            <h3>Refund: <span id="numero-triat">${this.seleccioActual.length > 0 ? this.seleccioActual[0] : ''}</span></h3>
            <div id="selector-numeros" class="numeros-container"></div>
        `;

        const contenidor = this.shadowRoot.getElementById('selector-numeros');

        for (let i = 1; i <= 9; i++)
        {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.classList.add('numero-btn');

            if (this.seleccioActual.includes(i))
            {
                btn.classList.add('seleccionado');
                
            } else if (this.seleccioActual.length >= 1)
            {
                btn.disabled = true; 
            }

            btn.onclick = () => this.gestionarSeleccio(i, btn);
            contenidor.appendChild(btn);
        }
    }

    gestionarSeleccio(numero, boto)
    {
        const index = this.seleccioActual.indexOf(numero);

        if (index > -1)
        {
            this.seleccioActual = [];
            boto.classList.remove('seleccionado');
            ESTAT.reintegrament = null;
        } else if (this.seleccioActual.length < 1)
        {
            this.seleccioActual = [numero];
            boto.classList.add('seleccionado');
            ESTAT.reintegrament = numero;
        }

        desarEstat();
        this.actualitzarVisuals();
    }

    actualitzarVisuals()
    {
        const display = this.shadowRoot.getElementById('numero-triat');
        display.textContent = this.seleccioActual.length > 0 ? this.seleccioActual[0] : '';

        const hiHaSeleccio = this.seleccioActual.length >= 1;
        this.shadowRoot.querySelectorAll('.numero-btn').forEach(b =>
        {
            const numBoto = parseInt(b.textContent);
            if (!this.seleccioActual.includes(numBoto))
            {
                b.disabled = hiHaSeleccio;
            }
        });
    }    
}
customElements.define('reintegre-premi', ReintegrePremi);
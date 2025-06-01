function novoElemento(tagName, className) {
    /* funcao para criar um novo elemento no html */
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barreira(reversa = false) { // funcao para criar um barreira
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')// criar a borda da barreira
    const corpo = novoElemento('div', 'corpo') // criar a corpo da barreira
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

function parDeBarreiras(altura, abertura, x) { // funcao para criar o par de barreiras
    this.elemento = novoElemento('div', 'par-de-barreiras') // cria a barreira e passa a tag e a classe

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento) // renderizar a barreira superior no html
    this.elemento.appendChild(this.inferior.elemento) // renderizar a barreira inferior no html

    this.sortearAbertura = () => { // sorteia a altura da barreira
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

function Barreiras(altura, largura, abertura, espaco, notificarPonto) { // embaralha a altura da barreira

    this.pares = [
        new parDeBarreiras(altura, abertura, largura),
        new parDeBarreiras(altura, abertura, largura + espaco),
        new parDeBarreiras(altura, abertura, largura + espaco * 2),
        new parDeBarreiras(altura, abertura, largura + espaco * 3),
    ]

    const deslocamento = 4

    this.animar = () => { // animacao da barreira para ela fica passando em loop infinito
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            // quando o elemento sair da área do jogo

            if(par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            const meio = largura / 2
            const cruzouMeio = par.getX() + deslocamento >= meio && par.getX() < meio
            if(cruzouMeio) {notificarPonto()}
        })

    }

}

function Passaro(alturaDoJogo) { // funcao para renderizar o passaro e verificar se ele esta no quadrado
    let voando = false

    this.elemento = novoElemento('img', 'passaro') // cria o passaro poem a imagem no html e passa a classe
    this.elemento.src = 'img/passaro.png' // passa a imagem no atribulto

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => { // animacao para o passaro nao passar do quadrado e ficar andado
        const novoY = this.getY() + (voando ? 5 : -5)
        const alturaMaxima = alturaDoJogo  - this.elemento.clientHeight

        if(novoY <= 0) {
            this.setY(0)
        } else if(novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }

    this.setY(alturaDoJogo / 2)

}

function Progresso() { // pontos
    this.elemento = novoElemento('span', 'progresso') // cria o span no html
    this.atualizarPontos = pontos => { // funcao para atualizar os pontos
        this.elemento.innerHTML = pontos // renderiza os pontos
    }

    this.atualizarPontos(0) // comeca zerado
}

function FlappyBird() {
    let pontos = 0

    const areaJogo = document.querySelector('[wm-flappy]')
    const altura = areaJogo.clientHeight
    const largura = areaJogo.clientWidth

    const progresso = new Progresso()
    const barreiras = new Barreiras(altura, largura, 200, 400, 
        () => progresso.atualizarPontos(++pontos)) // atualizar os pontos
        const passaro = new Passaro(altura)

        areaJogo.appendChild(progresso.elemento) // renderiza o progresso
        areaJogo.appendChild(passaro.elemento) // renderiza o passaro
        barreiras.pares.forEach(par => {
            areaJogo.appendChild(par.elemento)
        })

        this.star = () => { // funcao para starta o jogo
            const temporizador = setInterval(() => {
                barreiras.animar() // inicia a animacao da barreira
                passaro.animar() // inicia a animacao do passaro
            }, 20)
        }
}

new FlappyBird().star()
let menu = document.getElementById("menu")
let iconeBarras = document.getElementById("icone-barras")
let iconeX = document.querySelector("#icone-x")


function abrirFecharMenu() {
    if (menu.classList.contains("menu-fechado")) {
        menu.classList.remove("menu-fechado")

        iconeX.style.display = "inline"

        iconeBarras.style.display = "none"

    } else {
        menu.classList.add("menu-fechado")

        iconeX.style.display = "none"

        iconeBarras.style.display = "inline"

    }

}

window.onresize = () => {
    menu.classList.remove("menu-fechado") 
    iconeX.style.display = "inline"
    iconeBarras.style.display = "none"
}

// funcão carrosel

let slides = [
    'primeiro-banner',
    'segundo-banner',
    'terceiro-banner'

]

let slideAtual = 0

let numeroSlides = slides.length

let banner = document.querySelector(".banner")

banner.classList.add(slides[slideAtual])

const mostrarProximoSlide = () => {
    banner.classList.remove(slides[slideAtual])
    
    // numeroSlides = 3
    // numeroSlides - 1 -> 2
    // estou no ultimo? 2
    // [0, 1, 2]
    
    if(slideAtual < numeroSlides - 1) {
        slideAtual++
    } else {
        slideAtual = 0
    }

    banner.classList.add(slides[slideAtual])
}

const mostrarSlideAnterior = () => {
    banner.classList.remove(slides[slideAtual])

    if(slideAtual > 0) {
        slideAtual--
    } else {
        slideAtual = numeroSlides - 1
    }

    banner.classList.add(slides[slideAtual])
}

const selecionarSlide = (indiceSlide) => {
    slides.forEach( slide => banner.classList.remove(slide) )

    slideAtual = indiceSlide

    banner.classList.add(slides[indiceSlide])
}

let listaCases = [

]

const renderizarCases = () => {
    let elementoLista = document.getElementById("lista-cards")

    let template = ""

    listaCases.forEach( cardCase => {
            template += `<div class="card">
            <img src="${cardCase.imagem}" alt="">
            <p>${cardCase.descricao}</p>
            <button>Ver mais</button>
        </div>`
    })

    elementoLista.innerHTML = template
}

const carregarCases = () => {
    // Método HTTP GET - Read -> Leitura
    fetch("http://localhost:3000/cases")
    .then( resposta => resposta.json())
    .then( (dados) => {
        listaCases = dados
        renderizarCases()
    })
    .catch( erro => console.error(erro))

}

const solicitarOrcamento = () => {
    // Pegar valores dos inputs
    let valorNome = document.getElementById("campo-nome").value
    let valorEmail = document.getElementById("campo-email").value
    let valorDescricao = document.getElementById("campo-descricao").value

    console.log(valorNome)    
    console.log(valorEmail)    
    console.log(valorDescricao)    

    // Organizar objeto com os valores
    let dadosForm = {
        nome: valorNome,
        email: valorEmail,
        descricao: valorDescricao
    }

    // Enviar requisicao para a api
    // 127.0.0.1 = localHost
    // Método HTTP POST - Create -> Cadastrar ou criar
    fetch("http://127.0.0.1:3000/solicitacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosForm)
    })
    .then (resposta => console.log(resposta))
    .catch(erro => console.error(erro))


        // Limpar os campos
        // Mostrar alert com msg de sucesso
        // CASO ERRO - alert com msg erro
}
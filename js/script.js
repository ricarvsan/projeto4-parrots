let qtdCartas = 0;
let ordemCartas = [];
let cartaClicada = [];
let cartasViradas = [];
let pares = 0;
let contagemClicks = 0;
let timer = 0;
let idTimer;
let jogo = 1;
let totalClicado = 0;
let cartasAbertas = [];
let cartaVirada = true;
let x;

let figuraCartas = [
    '<img data-test="face-up-image" src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/bobrossparrot.gif" alt="">',
    '<img data-test="face-up-image" src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/explodyparrot.gif" alt="">',
    '<img data-test="face-up-image" src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/fiestaparrot.gif" alt="">',
    '<img data-test="face-up-image" src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/metalparrot.gif" alt="">',
    '<img data-test="face-up-image" src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/revertitparrot.gif" alt="">',
    '<img data-test="face-up-image" src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/tripletsparrot.gif" alt="">',
    '<img data-test="face-up-image" src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/unicornparrot.gif" alt="">' 
];

function somaTimer (){
    timer++;
    atualizaTimer();
}

function atualizaTimer(){
    divTimer = document.querySelector('.timer');
    divTimer.innerHTML = timer;
}

function comparador() { 
	return Math.random() - 0.5; 
}

function quantidadeCartas(){
    do {
        qtdCartas = Number(prompt("Digite a quantidade de cartas para o jogo:\n(numero par de 4 a 14)"));
        if(!(qtdCartas === 4 || qtdCartas === 6 || qtdCartas === 8 || qtdCartas === 10 || qtdCartas === 12 || qtdCartas === 14)){
            quantidadeCartas();
        } 
    } while (!qtdCartas);
}

function cartasJogo(){
    let desenhoCarta;
    for(let i = 0; i < (qtdCartas / 2); i++){
        desenhoCarta = figuraCartas[i];
        ordemCartas.push(desenhoCarta);
        ordemCartas.push(desenhoCarta);
    }
    ordemCartas.sort(comparador);
}

function insereCartas(){
    const divCards = document.querySelector('.cards');

    for(let i = 0; i < qtdCartas; i++){
        divCards.innerHTML += `
        <div data-test="card" class="slotCarta" onclick="virar(this)">
            <div class="cartaEstilo carta1">                
                <img data-test="face-down-image" src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/back.png" alt="">
            </div>
            <div class="cartaEstilo back-face carta2">
                ${ordemCartas[i]}
            </div>
            </div>
        `;
    }
}

function virar(carta){
    carta.classList.add('clicado');

    if(!(carta === cartaClicada[0]) && (cartaClicada.length < 2)){
        contagemClicks++;    

        cartaClicada.push(carta);
        cartasViradas.push(carta.innerHTML);

        if(cartasViradas.length > 1){
            if(cartasViradas[0] === cartasViradas[1]){
                pares++;
                cartasAbertas.push(cartasViradas[0]);
                cartasAbertas.push(cartasViradas[1]);
                        
                cartasViradas.pop();
                cartasViradas.pop();
                cartaClicada.pop();
                cartaClicada.pop();
            } else {
                cartasViradas.pop();
                cartasViradas.pop();
                setTimeout(desvira, 1000);
            }
        }

        const carta1 = carta.querySelector(".carta1");
        carta1.classList.toggle("front");

        const carta2 = carta.querySelector(".carta2");
        carta2.classList.toggle("back");

        if(pares === qtdCartas / 2) {
            clearInterval(idTimer);
            alert(`Você ganhou em ${contagemClicks} jogadas! A duração do jogo foi de ${timer} segundos!`);
            imDeJogo();
        }
    }
      
}

function desvira(){
    let carta1 = cartaClicada[0].querySelector(".carta1");
    carta1.classList.toggle("front");

    let carta2 = cartaClicada[0].querySelector(".carta2");
    carta2.classList.toggle("back");

    carta1 = cartaClicada[1].querySelector(".carta1");
    carta1.classList.toggle("front");

    carta2 = cartaClicada[1].querySelector(".carta2");
    carta2.classList.toggle("back");

    let removeClicado = document.querySelector('.clicado');
    removeClicado.classList.remove('clicado');
    removeClicado = document.querySelector('.clicado');
    removeClicado.classList.remove('clicado');    
   
    cartaClicada.pop();
    cartaClicada.pop();  
}

function fimDeJogo(){
    let jogarNovamente = prompt('Gostaria de reiniciar a partida? (sim ou não)')
    if (jogarNovamente === 'sim') {
        resetVariaveis();
        resetHTML();
        iniciaJogo();
    } else if (jogarNovamente === 'não'){
        return;
    } else {
        fimDeJogo();
    }
}

function resetVariaveis(){
    qtdCartas = 0;
    ordemCartas = [];
    cartaClicada = [];
    cartasViradas = [];
    cartasFixas = [];
    pares = 0;
    contagemClicks = 0;
    timer = 0;
    idTimer;
    jogo = 1;
}

function resetHTML(){
    let divCards = document.querySelector('.cards');
    divCards.innerHTML = ``;
    divTimer = document.querySelector('.timer');
    divTimer.innerHTML = 0;    
}

function iniciaJogo(){
    figuraCartas.sort(comparador);
    quantidadeCartas();
    cartasJogo();
    insereCartas();
    idTimer = setInterval(somaTimer, 1000);
}

//PRIMEIRO INICIO DE JOGO
iniciaJogo();
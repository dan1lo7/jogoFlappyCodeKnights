// Obtém referências aos elementos do DOM
const bird = document.getElementById("bird"); // Elemento que representa o pássaro
const gameContainer = document.getElementById("gameContainer"); // Contêiner onde o jogo acontece
const gameStatus = document.getElementById("gameStatus"); // Elemento que exibe o status do jogo

// Obtém a posição superior do contêiner do jogo
const containerTopPosition = gameContainer.getBoundingClientRect().top;
// Obtém a posição superior do pássaro
let birdTopPosition = bird.getBoundingClientRect().top;
// Calcula a posição relativa do pássaro em relação ao contêiner
let birdRelativeTopPosition = birdTopPosition - containerTopPosition;

// Define os valores de gravidade e altura do pulo
const gravity = 3.1; // A quantidade que o pássaro desce a cada intervalo
const jumpHeight = 10; // Altura que o pássaro sobe em cada intervalo de pulo
const jumpTotalHeight = 140; // Altura total que o pássaro deve alcançar ao pular
const jumpIntervals = 14; // Número de intervalos para completar um pulo
const intervalTime = 10; // Intervalo de tempo entre cada atualização
let jumping = false; // Flag para controlar se o pássaro está pulando
let jumpCount = 0; // Contador de intervalos de pulo

// Armazena a posição inicial do pássaro
const initialBirdPosition = birdRelativeTopPosition;

// Função que faz o pássaro cair
function fall() {
  // Aumenta a posição do pássaro pelo valor da gravidade
  birdRelativeTopPosition += gravity;
  bird.style.top = birdRelativeTopPosition + "px"; // Atualiza a posição do pássaro

  // Obtém a altura do contêiner do jogo
  const containerHeight = gameContainer.clientHeight;

  // Verifica se o pássaro atingiu o fundo do contêiner
  if (
    birdRelativeTopPosition + bird.offsetHeight - gravity >=
    containerHeight
  ) {
    // Se sim, define a posição do pássaro na parte inferior do contêiner
    bird.style.top = containerHeight - bird.offsetHeight + "px";
    // Atualiza o status do jogo para "Morreu"
    gameStatus.innerText = "Morreu";
    gameStatus.style.color = "red"; // Muda a cor do texto para vermelho

    // Reinicia o jogo após um pequeno atraso
    setTimeout(restartGame, 1000);
  }
}

// Função que faz o pássaro pular
function jump() {
  // Verifica se o pássaro não está pulando
  if (!jumping) {
    jumping = true; // Marca que o pássaro está pulando
    jumpCount = 0; // Reinicia o contador de pulo

    // Função para realizar o pulo em intervalos
    const jumpInterval = setInterval(() => {
      if (jumpCount < jumpIntervals) {
        birdRelativeTopPosition -= jumpHeight; // Move o pássaro para cima
        bird.style.top = birdRelativeTopPosition + "px"; // Atualiza a posição do pássaro
        jumpCount++;
      } else {
        clearInterval(jumpInterval); // Para o intervalo quando o pulo termina
        jumping = false; // Permite novos pulos
      }
    }, intervalTime);
  }
}

// Adiciona um ouvinte de eventos para o teclado
document.addEventListener("keydown", function(event) {
  // Verifica se a tecla pressionada é a barra de espaço
  if (event.code === "Space") { 
    jump(); // Se sim, chama a função de pulo
  }
});

// Inicia o loop de queda do pássaro
setInterval(fall, intervalTime);
# Problema da Mochila (Knapsack Problem)

O projeto tem em vista criar em NodeJS a resolução do problema da mochila utilizando algoritmos genéticos para a aula de Inteligência Artificial

---
## Algoritmos Genéticos
Um algoritmo genético (AG) é uma técnica de busca utilizada na ciência da computação para achar soluções aproximadas em problemas de otimização e busca, fundamentado principalmente pelo americano John Henry Holland. Algoritmos genéticos são uma classe particular de algoritmos evolutivos que usam técnicas inspiradas pela biologia evolutiva como hereditariedade, mutação, seleção natural e recombinação (ou crossing over).

Fonte: [Wikipedia](https://pt.wikipedia.org/wiki/Algoritmo_gen%C3%A9tico)

---
## Requerimentos

Para o desenvolvimento, certifique-se de ter instalado o Node.js. Nenhum pacote adicional foi utilizado no desenvolvimento.

## Rodando o algoritmo

Altere as seguintes variáveis se necessário:

 ```javascript
let pesos = [12,  7, 11, 8, 9] // define os pesos de cada item
let pontos_sobrevivencia = [24, 13, 23, 15, 16] // define os pontos de sobrevivência da cada item
let correto = [0, 1, 1, 1, 0] // define o array "ótimo" que quando encontrado encerra a execução
let capacidade = 30 // capacidade máxima da mochila
let qtd_populacao = 10 // quantidade máxima de população de cada geração
 ```

No terminal, execute o script:

    $ node index.js
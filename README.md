# Problema da Mochila (Knapsack Problem)

O projeto tem em vista criar em NodeJS a resolução do problema da mochila utilizando algoritmos genéticos para a aula de Inteligência Artificial

---
## Requerimentos

Para o desenvolvimento, certifique-se de ter instalado o Node.js. Nenhum pacote adicional foi utilizado no desenvolvimento.

## Rodando o algoritmo

Altere as seguintes variáveis se necessário:

 `
    let pesos = [12,  7, 11, 8, 9] // define os pesos de cada item
    let pontos_sobrevivencia = [24, 13, 23, 15, 16] // define os pontos de sobrevivência da cada item
    let correto = [0, 1, 1, 1, 0] // define o array "ótimo" que quando encontrado encerra a execução
    let capacidade = 30 // capacidade máxima da mochila
    let qtd_populacao = 10 // quantidade máxima de população de cada geração
 `

No terminal, execute o script:

    $ node index.js
/*
	Créditos a @Pantzan
	Tradução do código do @Pantzan em Python para JS com o objetivo de
	entender melhor o algoritmo genético com o problema da mochila (Knapsack Problem)
	Repositório do código em Python https://github.com/Pantzan/KnapsackGA/
 */

function arrayContains(arr, el){
	for(let item of arr){
		if(item.length === el.length && item.every(function(value, index) { return value === el[index]})) return true
	}
	return false
}

// https://helloacm.com/the-enumerate-function-in-javascript/
function *enumerate(array) {
	for (let i = 0; i < array.length; i += 1) {
		yield [i, array[i]];
	}
}

let Knapsack = class Knapsack{

	// inicializa as variáveis
	constructor (){

		this.C = 0
		this.weights = []
		this.profits = []
		this.opt = []
		this.parents = []
		this.newparents = []
		this.bests = []
		this.best_p = [] 
		this.iterated = 1
		this.population = 0

	}

	// cria uma população inicial 
	inicializar(){

		for (let i in Array.from(Array(this.population).keys())){
			let parent = []
			for (let x in [0, 1, 2, 3, 4]){
				x = Math.random() < 0.5 ? 0 : 1
				parent.push(x)
			}
			this.parents.push(parent)
		}

	}

	// define os dados do problema
	propriedades(pesos, pontos_sobrevivencia, correto, capacidade, populacao){

		this.weights = pesos
		this.profits = pontos_sobrevivencia
		this.opt = correto
		this.C = capacidade
		this.population = populacao
		this.inicializar()

	}

	// calcula a função de aptidão de cada lista
	aptidao(item){

		let sum_w = 0
		let sum_p = 0
		// pega os pesos e os pontos de sobrevivência
		for (let [index, i] of enumerate(item)){
			if (i == 0){
				continue
			}else{
				sum_w += this.weights[index]
				sum_p += this.profits[index]
			}

		}

		// se maior que o melhor retorna -1 senão retorna o número
		if (sum_w > this.C){
			return -1
		}else{
			return sum_p
		}

	}

	// incia as gerações de algoritmo genético
	evoluir(){

		// itera pela população e calcula a aptidão
		let parent, ft;
		let best_pop = Math.floor(this.population/2)
		for (let i in Array.from(Array(this.parents.length).keys())){
			parent = this.parents[i]
			ft = this.aptidao(parent)
			this.bests.push([ft, parent])
		}

		// ordena a lista dos melhores pela aptidão		
		this.bests.sort(function(a, b) {
			return b[0] - a[0];
		});

		this.best_p = this.bests.slice(0,best_pop)
		let arr = []
		for(let x of this.best_p){
			arr.push(x[1])
		}
		this.best_p = arr

	}

	// faz a mutação
	mutacao(ch){

		let k
		for (let i of Array.from(Array(ch.length).keys())){
			k = Math.random()
			if (k > 0.5){
				if (ch[i] == 1){
					ch[i] = 0
				}else{
					ch[i] = 1
				}
			}
		}

		return ch

	}

	// cruza dois pais para produzir dois filhos
	recombinar(ch1, ch2){

		let threshold = Math.floor(Math.random() * ch1.length) + 1
		let tmp1 = ch1.slice(threshold)
		let tmp2 = ch2.slice(threshold)
		ch1 = ch1.slice(0, threshold)
		ch2 = ch2.slice(0, threshold)
		ch1.push(...tmp2)
		ch2.push(...tmp1)

		return [ch1, ch2]

	}

	// inicia o algoritmo genético
	run(){

		// faz a avaliação
		this.evoluir()
		let newparents = []
		let pop = this.best_p.length - 1
		let sample = []
		let r1, r2, nchild1, nchild2, v

		// cria um array de 0 e 1 aleatórios
		for(let x in Array.from(Array(pop).keys())){
			sample.push(Math.floor(Math.random() * (pop - 0 + 1) + 0))
		}
		for (let i of Array.from(Array(pop).keys())){

			// selecione o index aleatório dos melhores filhos para randomizar o processo
			if (i < pop - 1){
				r1 = this.best_p[i]
				r2 = this.best_p[i+1]
				v = this.recombinar(r1, r2)
				nchild1 = v[0], nchild2 = v[1]
				newparents.push(nchild1)
				newparents.push(nchild2)
			}else{
				r1 = this.best_p[i]
				r2 = this.best_p[0]
				v = this.recombinar(r1, r2)
				nchild1 = v[0], nchild2 = v[1]
				newparents.push(nchild1)
				newparents.push(nchild2)
			}
		}

		// faz a mutação das novas crianças e pais em potencial
		for (let i in Array.from(Array(newparents.length).keys())){
			newparents[i] = this.mutacao(newparents[i])	
		}

		if (arrayContains(newparents, this.opt)){
			console.log(`achado depois de ${this.iterated} gerações`)
			return;
		}else{
			this.iterated += 1
			console.log(`recriando gerações pela ${this.iterated} vez`)
			this.parents = newparents
			this.bests = []
			this.best_p = []
			this.run()	
		}

	}

}

let pesos = [12,  7, 11, 8, 9] // define os pesos de cada item
let pontos_sobrevivencia = [24, 13, 23, 15, 16] // define os pontos de sobrevivência da cada item
let correto = [0, 1, 1, 1, 0] // define o array "ótimo" que quando encontrado encerra a execução
let capacidade = 30 // capacidade máxima da mochila
let qtd_populacao = 10 // quantidade máxima de população de cada geração

const mochila = new Knapsack()
mochila.propriedades(pesos, pontos_sobrevivencia, correto, capacidade, qtd_populacao)
mochila.run()


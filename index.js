
// https://stackoverflow.com/questions/19543514/check-whether-an-array-exists-in-an-array-of-arrays
function searchForArray(haystack, needle){
	var i, j, current;
	for(i = 0; i < haystack.length; ++i){
	  if(needle.length === haystack[i].length){
		current = haystack[i];
		for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
		if(j === needle.length)
		  return i;
	  }
	}
	return -1;
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

		// increase max recursion for long stack
		// iMaxStackSize = 15000
		// sys.setrecursionlimit(iMaxStackSize)

	}

	// cria uma população inicial 
	initialize(){

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
	properties(weights, profits, opt, C, population){

		this.weights = weights
		this.profits = profits
		this.opt = opt
		this.C = C
		this.population = population
		this.initialize()

	}

	// calcula a função de aptidão de cada lista
	fitness(item){

		let sum_w = 0
		let sum_p = 0
		// get weights and profits
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

	// run generations of GA
	evaluation(){

		// loop through parents and calculate fitness
		let parent, ft;
		let best_pop = Math.floor(this.population/2)
		for (let i in Array.from(Array(this.parents.length).keys())){
			parent = this.parents[i]
			ft = this.fitness(parent)
			this.bests.push([ft, parent])
		}

		// sort the fitness list by fitness		
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

	// mutate children after certain condition
	mutation(ch){

		let k
		for (let i of Array.from(Array(ch.length).keys())){
			k = Math.random() < 0.5 ? 0 : 1
			if (k > 0.5){
				// if random float number greater that 0.5 flip 0 with 1 and vice versa
				if (ch[i] == 1){
					ch[i] = 0
				}else{
					ch[i] = 1
				}
			}
		}

		return ch

	}

	// crossover two parents to produce two children by miixing them under random ration each time
	crossover(ch1, ch2){

		let threshold = Math.floor(Math.random() * ch1.length) + 1
		let tmp1 = ch1.slice(threshold)
		let tmp2 = ch2.slice(threshold)
		ch1 = ch1.slice(0, threshold)
		ch2 = ch2.slice(0, threshold)
		ch1.push(...tmp2)
		ch2.push(...tmp1)

		return [ch1, ch2]

	}

	// run the GA algorithm
	run(){

		// run the evaluation once
		this.evaluation()
		let newparents = []
		let pop = this.best_p.length - 1
		let sample = []
		let r1, r2, nchild1, nchild2, v

		// create a list with unique random integers
		for(let x in Array.from(Array(pop).keys())){
			sample.push(Math.floor(Math.random() * (pop - 0 + 1) + 0))
		}
		for (let i of Array.from(Array(pop).keys())){

			// select the random index of best children to randomize the process
			if (i < pop - 1){
				r1 = this.best_p[i]
				r2 = this.best_p[i+1]
				v = this.crossover(r1, r2)
				nchild1 = v[0], nchild2 = v[1]
				newparents.push(nchild1)
				newparents.push(nchild2)
			}else{
				r1 = this.best_p[i]
				r2 = this.best_p[0]
				v = this.crossover(r1, r2)
				nchild1 = v[0], nchild2 = v[1]
				newparents.push(nchild1)
				newparents.push(nchild2)
			}
		}

		// mutate the new children and potential parents to ensure global optima found
		for (let i in Array.from(Array(newparents.length).keys())){
			newparents[i] = this.mutation(newparents[i])	
		}

		if (searchForArray(newparents,this.opt)){
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

// properties for this particular problem
let weights = [12,  7, 11, 8, 9]
let profits = [24, 13, 23, 15, 16]
let opt = [0, 1, 1, 1, 0]
let C = 26
let population = 10

const mochila = new Knapsack()
mochila.properties(weights, profits, opt, C, population)
mochila.run()


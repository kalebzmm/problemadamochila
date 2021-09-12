
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
		for ([index, i] in item.entries()){
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
		let best_pop = this.population // 2
		for (let i in Array.from(Array(this.parents.length).keys())){
			parent = this.parents[i]
			ft = this.fitness(parent)
			this.bests.push((ft, parent))
		}

		// sort the fitness list by fitness		
		this.bests.sort(function(a, b) {
			return b[0] - a[0];
		});
		this.best_p = this.bests.slice(0,)
		let arr = []
		for(x in Array.from(Array().keys(this.best_p.length))){
			arr.push(x[1])
		}
		this.best_p = arr

	}

	// mutate children after certain condition
	mutation(ch){

		for (let i in Array.from(Array(this.population.ch.length).keys())){
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

		threshold = Math.floor(Math.random() * ch1.length) + 1
		tmp1 = ch1.slice(threshold)
		tmp2 = ch2.slice(threshold)
		ch1 = ch1.slice(0, threshold)
		ch2 = ch2.slice(0, threshold)
		ch1.push(...tmp2)
		ch2.push(...tmp1)

		return ch1, ch2

	}

	// run the GA algorithm
	run(){

		// run the evaluation once
		this.evaluation()
		let newparents = []
		let pop = this.best_p.length - 1
		let sample = []

		// create a list with unique random integers
		console.log(pop)
		for(x in Array.from(Array(pop).keys())){
			sample.push(Math.floor(Math.random() * (pop - 0 + 1) + 0))
		}
		for (let i in Array.from(Array(pop).keys())){

			// select the random index of best children to randomize the process
			if (i < pop - 1){
				r1 = this.best_p[i]
				r2 = this.best_p[i+1]
				nchild1, nchild2 = this.crossover(r1, r2)
				newparents.push(nchild1)
				newparents.push(nchild2)
			}else{
				r1 = this.best_p[i]
				r2 = this.best_p[0]
				nchild1, nchild2 = this.crossover(r1, r2)
				newparents.push(nchild1)
				newparents.push(nchild2)
			}
		}

		// mutate the new children and potential parents to ensure global optima found
		for (let i in Array.from(Array(newparents.length).keys())){
			newparents[i] = this.mutation(newparents[i])	
		}

		if (this.opt in Array.from(Array(newparents.length).keys())){
			console.log(`optimal found in ${this.iterated} generations`)
		}else{
			this.iterated += 1
			console.log(`recreate generations for ${this.iterated} time`)
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

const k = new Knapsack()
k.properties(weights, profits, opt, C, population)
k.run()


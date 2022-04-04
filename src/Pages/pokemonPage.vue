<template> 

    <h1 v-if="!pokemon">Cargando pokemon....</h1> <!--  Si el pokemon no tiene valor muestra esto, si si tiene pasa a msontar el v-else -->

    <div v-else> <!-- Aqui lo meti en un div con un v-if   v-if="pokemon"  para que solo se muestre cuando tengamoos un pokemon cargado, se sustituye por un v else porque al usar un v-if antes vue primero intenta correr esa primera condición y después lo demás -->

    <h1> ¿Quien es este pokemon? </h1>

    <PokemonPicture :pokemonId='pokemon.id' :showPokemon='showPokemon' /> <!-- ":" los dos puntos son el atajo para el  // pokemon.id viene del pokemon establecido en la data// reordemos que pokemonId esta definido desde la función computada imgSrc -->
    <PokemonOptions 
        :pokemons="pokemonArr"
        @selection="checkAnswer ($event)" /> <!-- awui estoy recibiendo el valor del evento $emit, podria dejarlo sin pasar nada por los paretnesis porque al ser un argumento único se entiende que es el valor que esta enviando, lo dejo  por fines de documentacion -->

    
    <template v-if="showAnswer">
    <h2 class="fade-in"> {{message}} </h2>
    <button class="fade-in" @click="newGame"> 
        Jugar de nuevo
    </button>
    </template>

    </div>


  
</template>

<script>
import PokemonPicture from '../components/PokemonPicture.vue'
import PokemonOptions from '../components/PokemonOptions.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions'

//console.log( getPokemonOptions() )





export default {
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data(){
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false, 
            message: ''
        }
    },
    methods: {
        async mixPokemonArray(){ // esto es una función asincrona ya que primero debe esperar a que se resuelva getPokemonoptions
            this.pokemonArr = await getPokemonOptions() 

            const rndInt = Math.floor(Math.random() * 4) // esta funciópn me servira para obtener uno de los pokemons de forma aleatoria

            this.pokemon = this.pokemonArr[rndInt] // rndInt determina la posición del pokemon que sera la respuesta 
            //this.pokemon viene del pokemon establecido en data, al decirle this.pokemon = this.pokemonArr[rndInt] estamos haciendo la referencia
            //al pokemon que vamos a enviar a la imagen del pokemon por eso hemos puesto {{pokemon.id}} nos retorno un array y el item del array que nos interesa esta dado por rndInt, ese item tiene una propuiedad o key llamada id. por eso {{pokemon.id}}
        },
        checkAnswer(selectedID){
            this.showPokemon = true
            this.showAnswer = true // condición necesaria para que solo se muestre el mensaje cuando el usuario selewccione una opción de respuesta

            this.message = selectedID == this.pokemon.id ? `Eres un verdadero maestro Pokemon, el pokemon es ${this.pokemon.name}`  : `Aún no eres un maestro, el pokemon era ${this.pokemon.name} `
        },
        newGame(){
            this.showPokemon = false
            this.showAnswer =  false
            this.pokemonArr = []
            this.pokemon =  null
            this.mixPokemonArray()
        }
    },
    mounted(){ // este es un hook del Lifeclycle para los componentes, hara una llamada cada vez que la aplicación se monta
        this.mixPokemonArray()
    }
}
</script>

import pokemonApi from "@/api/pokemonApi"


// 1.- Primero cree un  arreglo raíz
const getPokemons = () => {

    const pokemonsArr = Array.from( Array (650) )
    
    return pokemonsArr.map((_, index) => index + 1) // aqui estoy diciendole a JS que me retorne los items con sus respectivos index, agrego el +1 para que la cuenta comience en 1 y no en  0 ya quen no tengo ningún pokemon con ese id. 

}


// 2.- Despupes mando a kkanar a mi arreglo  raíz y lo mezclo con el metodo sort

const getPokemonOptions = async () => {

    const mixedPokemons = getPokemons()
                            .sort( () => Math.random() - 0.5 ) // hago un llamado a la función getPokemons porque ya se que me retornqaq un arreglo , luego le paso el metodo sort para reordenar y uso el math random para arrojar un valor entre el 1 y el 650 , le pongo un -0.5 para conseguir que los numeros que consiga sean positivos y negativos 

    
    const pokemons=  await getPokemonNames( mixedPokemons.splice(0,4) )  // llamo la función getPokemonNames y le indico con el metodo splice que solo me retorne los primeros 4 items del arreglo 
    
    //console.table( pokemons )

    return pokemons // esto es importante de otra forma la función no sabra que estara regresando al ser llamada

}


// 3.- Después creo una función constructora para obtener únicamente los valores que me inteesan, en este caso las primeras 4 posiciones del arreglo mezclado para asi evitart llamar a los 650  items del arreglo raíz que para etse punto ya esta mezclado 

const getPokemonNames = async ( [a,b,c,d] = [] ) => { // aqui coloco pokemons = [] porque estoy indicando que el objeto que retornara sera un arrreglo   // desestructuro y paso pokemosn a [a,b,c,d] , para que cada item del array se asigne a cada uno de mis argumentos

/*     const resp = await    pokemonApi.get(`/1`)

    console.log(resp.data.name)

    console.log(a,b,c,d) //solo estoy  imrpimiendo los numeros de los pokemosn que retornan, estos vienen de la función getPokemonOptions */

    const promiseArr = [
        pokemonApi.get(`${ a }`),
        pokemonApi.get(`${ b }`),
        pokemonApi.get(`${ c }`),
        pokemonApi.get(`${ d }`),
    ]
    
    
    const [ pokemon1, pokemon2, pokemon3, pokemon4 ] = await  Promise.all(promiseArr) 

    return [

        {name: pokemon1.data.name, id: pokemon1.data.id},
        {name: pokemon2.data.name, id: pokemon2.data.id},
        {name: pokemon3.data.name, id: pokemon3.data.id},
        {name: pokemon4.data.name, id: pokemon4.data.id},

    ]


}





export default getPokemonOptions
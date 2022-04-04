<template>
  <div class="pokemon-container">

  <img  :src="imgSrc"   alt="Pokemon" class="hidden-pokemon"> <!-- Es necesario hacer el v-bind para indicar que este dato lo tiene que obtener de nuestro JS , esta en computed -->
  <img v-if="showPokemon" :src="imgSrc"  alt="Pokemon" class="fade-in">

  </div>

</template>

<script>
import pokemonPageVue from '@/Pages/pokemonPage.vue'
export default {

  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  computed: {
    imgSrc(){
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
    }
  }

}
</script>

<style scoped>
.hidden-pokemon{
 filter: brightness(0);
}

.pokemon-container {
    height: 200px;
}
img {
  height: 200px;
  position: absolute;
  width: 100vw;
  margin-left: -50vw;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}


</style>
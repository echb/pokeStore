<template>
  <v-row>
    <v-col cols="12">
      <v-card rounded="lg" min-height="268">
        {{ id }}
      </v-card>
    </v-col>
  </v-row>
</template>


<script>


export default {
  data: () => ({
    id: null,
    pokemon: []
  }),

  computed: {

  },

  methods: {

  },
  mounted() {
    this.id = this.$route.params.id
    // console.log(this.$route.params.id);
  }
}
</script>
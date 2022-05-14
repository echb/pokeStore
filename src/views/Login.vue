<template>
  <v-row>
    <v-col cols="12" sm="8">
      <v-card rounded="lg" min-height="268">
        <form>
          <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()"
            @blur="$v.email.$touch()"></v-text-field>
          <v-text-field v-model="password" :error-messages="passwordErrors" label="password" required
            @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>
          <v-btn class="mr-4" @click="submit">
            submit
          </v-btn>
          <v-btn @click="clear">
            clear
          </v-btn>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { login } from '../store/auth.js'


export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(6)
    },
  },

  data: () => ({
    email: 'bilboech@gmail.com',
    password: '123456',
  }),

  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    async submit() {
      this.$v.$touch()
      try {
        const userAcces = await login(this.email, this.password)
        if (!userAcces) throw new Error('Wrong Email Or Password')

        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
        // console.log(error.message);
      }
    },
    clear() {
      this.$v.$reset()
      this.email = ''
      this.password = ''
    },
  },
}
</script>
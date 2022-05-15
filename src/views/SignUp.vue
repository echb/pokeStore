<template>
  <v-row>
    <v-col cols="12">
      <v-card rounded="lg" min-height="268" class="card-log">
        <form>
          <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()"
            @blur="$v.email.$touch()"></v-text-field>
          <v-text-field v-model="password" :error-messages="passwordErrors" label="password" required
            @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>

          <v-text-field v-model="repeatPassword" :error-messages="repeatPasswordErrors" label="repeat password" required
            @input="$v.repeatPassword.$touch()" @blur="$v.repeatPassword.$touch()"></v-text-field>

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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SignUp } from '../store/auth.js'


export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },

  data: () => ({
    email: '',
    password: '',
    repeatPassword: ''
  }),

  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    repeatPasswordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.repeatPassword.sameAsPassword && errors.push('Password must be identical')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
  },

  methods: {
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) return;


      try {
        const a = await SignUp(this.email, this.password)
        // console.log(a.currentUser);
        this.$router.push('/home')

      } catch (error) {
        alert(error.message)

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

<style scoped>
.card-log {
  padding: 20px;
}
</style>
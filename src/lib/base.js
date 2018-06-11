export default {
  methods: {
    back (event) {
      this.$router.go(-1)
    },
    forward (event) {
      this.$router.go(1)
    }
  }
}

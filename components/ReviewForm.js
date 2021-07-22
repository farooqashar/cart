app.component('review-form', {
  template:
  /*html*/
  `
  <form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review!</h3>
    <div class="required">
        <label for="name">Name:</label>
        <input id="name" v-model="name">
    </div>

    <div class="required">
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
    </div>

    <div class="required">
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
    </div>

    <br/>

    <div class="required">
    <label for="q">Would you recommend this product?</label>
    <select id="q" v-model.number="q">
      <option>Yes</option>
      <option>No</option>
      <option>Unsure</option>
    </select>
    </div>

    <input class="button" type="submit" value="Submit">  
  </form>
  `,
  data() {
    return {
      name: '',
      review: '',
      rating: null,
      q: null
     } 
    },
    methods: {
     onSubmit() {

    if (this.name === '' || this.review === '' || this.rating === null || this.q === null) {
      alert('Your review is incomplete. Please fill out all information.')
      return
    }
     let productReview = {
       name: this.name,
       review: this.review,
       rating: this.rating,
       q: this.q
     }
     this.$emit('review-submitted', productReview)

     this.name = ''
     this.review = ''
     this.rating = null
     this.q = null
   }
    }
})
app.component('product-display', {
props: {
    premium: {
      type: Boolean,
      required: true
    },
    cartl : {
        type: Number,
        required: false
    }
  },
    template:
    /*html*/
    `

      <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :class = "[inStock ? '' : 'out-of-stock-img']" v-bind:src="image">
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ sale }}</p>
            <p>{{ description }}</p>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            
            <p>Shipping: {{ shipping }}</p>
            <!-- 
            <ul>
              <li v-for="each_size in sizes" :key="each_size.id">{{ each_size.size }}</li>
            </ul>
            -->
            <!--<product-details :details="details"></product-details> -->

             <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div :style = "{ backgroundColor: variant.color }" v-for="variant in variants" :key="variant.id"   class="color-circle" @mouseover="updateVariant(variant.id)"></div>
            <button :class="{ disabledButton: !inStock }" :disabled = "!inStock" class="button" v-on:click="addToCart">Add to Cart</button>
           <button :class="{ disabledButton: !inStock }" :disabled = "!inStock"class="button" @click="removeFromCart">Remove Item</button> 

          </div>
        </div>
         <div class = "container"><div class="center"><review-list v-if="reviews.length" :reviews="reviews"></review-list></div></div>
        <div class = "container"><div class="center"><review-form @review-submitted="addReview"></review-form></div></div>
        </div>`, 
    data() {
        return {
            product: "Hats",
            brand: "Baseball",
            selectedVariant: 1,
            description: "FBI and NY Islanders baseball-type hats in different sizes and colors",
            url: "https://www.armysurplusworld.com/fbi-hat",
            inventory: 11,
            onSale: true,
            reviews: [],
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 1, type: 'FBI', color: "Black" , image: './assets/images/fbi.jpg', quantity: 4 },
                { id: 2, type: 'NY Islanders', color: "Blue", image: './assets/images/isles.png', quantity: 0 }
             ],
            sizes: [
                { id: 3, size: 'Small' },
                { id: 4, size: 'Medium'},
                { id: 5, size: 'Large'}
             ]
         }
    },
    methods: {
        addToCart() {
            var id = 1
            if (this.selectedVariant == 1) {
                 id = this.variants[0].id
            }else {
                id = this.variants[1].id
            }
                this.$emit('add-to-cart', id)
            },
        removeFromCart(id) {
        var id = 1
        if (this.selectedVariant == 1) {
                 id = this.variants[0].id
        }
        else {
                id = this.variants[1].id
        }
        this.$emit('remove-from-cart', id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            if (this.selectedVariant == 1) {
                 return this.variants[0].image
            }else {
                return this.variants[1].image
            }
        },
        inStock() {
            if (this.selectedVariant == 1) {
                 return this.variants[0].quantity
            }else {
                return this.variants[1].quantity
            }
        },
        sale() {
            if (this.onSale == true) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
        },
          shipping() {
                if (this.premium) {
                return 'Free'
                }
                return 17.99
                }
        },
        removeBtn() {
            if (this.cartl == 0) {
                return true
            } else {
                return false
            }
        }
    
})

<script setup lang="ts">
useHead({
  title: 'Checkout'
})

const { data } = await useFetch('/api/subscription-info')

const form = ref({
  cardNumber: '',
  expiry: '',
  cvc: '',
  fullName: '',
  address: '',
  consent: false
})

const message = ref('')
const success = ref(false)

async function submitForm() {
  const response = await $fetch('/api/subscription/create', {
    method: 'POST',
    body: form.value
  })

  message.value = response.message
  success.value = response.success
}
</script>

<template>
  <div class="page">
    <div class="header">Checkout</div>

    <main class="container">
      <NuxtLink to="/products" class="back">&lt;&lt; back</NuxtLink>

      <h1>You’re Almost In - Start Your 3-Day Free Trial Now!</h1>
      <p class="subtitle">
        Set up your account to gain instant access! You won’t be charged if you decide to cancel within 3 days
      </p>

      <div class="grid">
        <section class="plan-card">
          <div class="line"></div>

          <div class="card-content">
            <h2>{{ data?.plan.name }}</h2>

            <span class="badge">3-days free then:</span>

            <div class="price">
              ${{ data?.plan.monthlyPrice.toFixed(2) }}<span>/month</span>
            </div>

            <p>
              billed yearly at
              <s>${{ data?.plan.yearlyOldPrice }}</s>
              ${{ data?.plan.yearlyPrice }}
            </p>

            <div class="save">${{ data?.plan.savings }} in savings</div>

            <hr>

            <ul>
              <li v-for="feature in data?.plan.features" :key="feature">
                ✦ {{ feature }}
              </li>
            </ul>
          </div>
        </section>

        <section class="checkout-card">
          <h2>Order Summary</h2>

          <div class="row">
            <span>Annual Plan</span>
            <span>${{ data?.summary.annualPlan.toFixed(2) }}</span>
          </div>

          <div class="row">
            <span>Total Due <small>(*not including sales tax where applicable)</small></span>
            <span>${{ data?.summary.totalDue.toFixed(2) }}</span>
          </div>

          <div class="row bold">
            <span>Due Today</span>
            <span>${{ data?.summary.dueToday.toFixed(2) }}</span>
          </div>

          <div class="trial">Includes 3-Day Free Trial</div>

          <h3>Billing Information</h3>

          <form @submit.prevent="submitForm">
            <label>Card Details</label>

            <div class="card-row">
              <input v-model="form.cardNumber" placeholder="Number">
              <input v-model="form.expiry" placeholder="MM / YY">
              <input v-model="form.cvc" placeholder="CVC">
            </div>

            <label>Address</label>

            <input v-model="form.fullName" placeholder="Full name">

            <textarea v-model="form.address" placeholder="Address"></textarea>

            <label class="checkbox">
              <input v-model="form.consent" type="checkbox">
              <span>
                I consent to Terms of Use and understand my 3-day free trial will automatically convert to annual billing.
              </span>
            </label>

            <button type="submit">Try It Free</button>

            <p v-if="message" :class="success ? 'ok' : 'error'">
              {{ message }}
            </p>
          </form>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f7f7f7;
  font-family: Arial, sans-serif;
}

.header {
  background: #333;
  color: white;
  text-align: center;
  padding: 18px;
  font-size: 20px;
  font-weight: 700;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 24px;
}

.back {
  color: #6b7280;
  text-decoration: none;
}

h1 {
  margin-top: 28px;
  font-size: 28px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 36px;
}

.grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 70px;
  align-items: start;
}

.plan-card,
.checkout-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  overflow: hidden;
}

.line {
  height: 4px;
  background: linear-gradient(to right, #4ade80, #06b6d4);
}

.card-content {
  padding: 28px;
}

.badge {
  display: inline-block;
  background: #f3f4f6;
  padding: 5px 8px;
  border-radius: 6px;
  color: #6b7280;
}

.price {
  font-size: 36px;
  font-weight: 800;
  margin: 10px 0;
}

.price span {
  font-size: 16px;
  color: #6b7280;
  font-weight: 400;
}

.save {
  display: inline-block;
  background: #e5e7eb;
  color: green;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 6px;
}

li {
  margin-bottom: 12px;
}

.checkout-card {
  padding: 40px;
}

.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f1f5f9;
  padding: 12px 0;
}

.bold {
  font-weight: 700;
}

.trial {
  background: #f3f4f6;
  text-align: center;
  padding: 18px;
  margin: 28px 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
}

input,
textarea {
  padding: 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

textarea {
  min-height: 100px;
}

.checkbox {
  display: flex;
  gap: 10px;
  font-size: 14px;
}

button {
  width: 150px;
  background: #d1d5db;
  border: none;
  padding: 14px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}

.ok {
  color: green;
  font-weight: 700;
}

.error {
  color: red;
  font-weight: 700;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
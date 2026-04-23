<script setup lang="ts">
useHead({
  title: 'Список продуктів'
})

const plans = [
  {
    title: 'Starter - Annual',
    price: '83.25',
    oldPrice: '$1,188',
    yearPrice: '$999',
    saving: '$189 in savings',
    users: 'Primary user only',
    extra: '(extra team members for $35/month)',
    exports: '10,000 exports',
    exportsExtra: '(additional exports at $0.02 each)',
    skips: '500 free skip traces'
  },
  {
    title: 'Team - Annual',
    price: '207.50',
    oldPrice: '$2,988',
    yearPrice: '$2,490',
    saving: '$498 in savings',
    users: 'Primary user + 2 free team members',
    extra: '(extra team members for $25/month)',
    exports: '50,000 exports',
    exportsExtra: '(additional exports at $0.01 each)',
    skips: '1,000 free skip traces'
  },
  {
    title: 'Business - Annual',
    price: '457.50',
    oldPrice: '$6,588',
    yearPrice: '$5,490',
    saving: '$1,098 in savings',
    users: 'Primary user + 6 free team members',
    extra: '(extra team members for $20/month)',
    exports: '100,000 exports',
    exportsExtra: '(additional exports at $0.01 each)',
    skips: '2,000 free skip traces'
  }
]
</script>

<template>
  <div class="page">
    <div class="top">
      <h1>Start Your 3 Day Free Trial</h1>

      <div class="switch">
        <span>Save up to 20%</span>
        <button class="active">Annual</button>
        <button>Monthly</button>
      </div>
    </div>

    <div class="cards">
      <div v-for="plan in plans" :key="plan.title" class="card">
        <div class="line"></div>

        <div class="content">
          <h2>{{ plan.title }}</h2>

          <div class="badge">3-days free then:</div>

          <div class="price">
            ${{ plan.price }}<span>/month</span>
          </div>

          <p class="year">
            billed yearly at
            <s>{{ plan.oldPrice }}</s>
            {{ plan.yearPrice }}
          </p>

          <div class="saving">{{ plan.saving }}</div>

          <button class="try">Try It Free</button>

          <hr>

          <ul>
            <li>
              <span class="star">✦</span>
              <div>
                <strong>{{ plan.users }}</strong>
                <small>{{ plan.extra }}</small>
              </div>
            </li>

            <li>
              <span class="star">✦</span>
              <strong>Save unlimited properties</strong>
            </li>

            <li>
              <span class="star">✦</span>
              <div>
                <strong>{{ plan.exports }}</strong>
                <small>{{ plan.exportsExtra }}</small>
              </div>
            </li>

            <li>
              <span class="star">✦</span>
              <div>
                <strong>{{ plan.skips }}</strong>
                <small>(additional skip tracing at $0.08 each)</small>
              </div>
            </li>

            <li><span class="star">✦</span> Imports $0.01</li>
            <li><span class="star">✦</span> <strong>FREE</strong> daily product trainings and support</li>
            <li><span class="star">✦</span> Full suite of next-gen investing tools</li>
            <li><span class="star">✦</span> Industry first AI powered comp tool</li>
            <li><span class="star">✦</span> Includes dedicated support agent</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px;
  font-family: Arial, sans-serif;
  background: #ffffff;
  min-height: 100vh;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 28px;
}

h1 {
  font-size: 30px;
  font-weight: 700;
  margin: 0;
}

.switch {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: green;
}

.switch button {
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 10px 14px;
  border-radius: 6px;
}

.switch .active {
  background: white;
  color: black;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.line {
  height: 4px;
  background: linear-gradient(to right, #4ade80, #06b6d4);
}

.content {
  padding: 34px 40px 32px;
}

h2 {
  font-size: 22px;
  margin-bottom: 24px;
}

.badge {
  display: inline-block;
  background: #f3f4f6;
  color: #374151;
  font-size: 14px;
  padding: 5px 8px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.price {
  font-size: 38px;
  font-weight: 800;
  margin-bottom: 10px;
}

.price span {
  font-size: 16px;
  font-weight: 400;
  color: #4b5563;
}

.year {
  color: #4b5563;
  margin-bottom: 10px;
}

.year s {
  color: #6b7280;
}

.saving {
  display: inline-block;
  background: #e2e8f0;
  color: #059669;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.try {
  width: 100%;
  border: none;
  background: linear-gradient(to right, #facc15, #f97316);
  padding: 14px;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 20px;
}

hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin-bottom: 22px;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
  line-height: 1.35;
  font-size: 16px;
}

.star {
  color: #86efac;
  font-size: 18px;
  flex-shrink: 0;
}

small {
  display: block;
  color: #374151;
  margin-top: 3px;
}

@media (max-width: 1000px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .top {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
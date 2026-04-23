<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/useUserStore'

useHead({
  title: 'Pinia Store'
})

const userStore = useUserStore()
const { name, isLoggedIn, welcomeMessage } = storeToRefs(userStore)

const inputName = ref('')

function handleLogin() {
  if (inputName.value.trim()) {
    userStore.login(inputName.value)
    inputName.value = ''
  }
}
</script>

<template>
  <div class="container">
    <h1>{{ welcomeMessage }}</h1>

    <div v-if="!isLoggedIn">
      <input v-model="inputName" placeholder="Введіть ваше ім'я">
      <button @click="handleLogin">Увійти</button>
    </div>

    <div v-else>
      <p>Ім'я: {{ name }}</p>
      <p>Ви зайшли о: {{ userStore.loginTime }}</p>

      <button @click="userStore.logout">Вийти</button>
      <button @click="userStore.fetchProfile">Завантажити профіль</button>

      <p v-if="userStore.isLoading">Завантаження...</p>

      <div v-if="userStore.profileData">
        <p>GitHub: {{ userStore.profileData.login }}</p>
        <img :src="userStore.profileData.avatar_url" width="120" alt="avatar">
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  font-family: Arial, sans-serif;
}

input {
  padding: 8px;
}

button {
  margin-left: 8px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
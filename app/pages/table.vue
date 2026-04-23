<script setup lang="ts">
useHead({
  title: 'Таблиця'
})

type Product = {
  id: number
  title: string
  description: string
  price: number
  rating: number
  brand: string
  category: string
  thumbnail: string
}

const { data } = await useFetch<{ products: Product[] }>('/api/products')

const search = ref('')
const page = ref(1)
const pageSize = 5

const sortColumn = ref<keyof Product>('title')
const sortDirection = ref<'asc' | 'desc'>('asc')

const filteredProducts = computed(() => {
  const products = data.value?.products ?? []
  const query = search.value.toLowerCase()

  return products.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  )
})

const sortedProducts = computed(() => {
  return [...filteredProducts.value].sort((a, b) => {
    const aValue = a[sortColumn.value]
    const bValue = b[sortColumn.value]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue
    }

    return sortDirection.value === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
  })
})

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / pageSize))

const paginatedProducts = computed(() => {
  const start = (page.value - 1) * pageSize
  return sortedProducts.value.slice(start, start + pageSize)
})

function changeSort(column: keyof Product) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }

  page.value = 1
}

function sortIcon(column: keyof Product) {
  if (sortColumn.value !== column) return ''
  return sortDirection.value === 'asc' ? ' ▲' : ' ▼'
}

watch(search, () => {
  page.value = 1
})
</script>

<template>
  <div class="page">
    <h1>Таблиця</h1>

    <input v-model="search" placeholder="Пошук..." class="search">

    <table>
      <thead>
      <tr>
        <th @click="changeSort('title')">Назва{{ sortIcon('title') }}</th>
        <th @click="changeSort('description')">Опис{{ sortIcon('description') }}</th>
        <th @click="changeSort('price')">Ціна{{ sortIcon('price') }}</th>
        <th @click="changeSort('rating')">Оцінка{{ sortIcon('rating') }}</th>
        <th @click="changeSort('brand')">Бренд{{ sortIcon('brand') }}</th>
        <th @click="changeSort('category')">Категорія{{ sortIcon('category') }}</th>
        <th>Фото</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="product in paginatedProducts" :key="product.id">
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>${{ product.price }}</td>
        <td :class="product.rating < 4.5 ? 'red' : 'green'">
          {{ product.rating }}
        </td>
        <td>{{ product.brand }}</td>
        <td>{{ product.category }}</td>
        <td>
          <img :src="product.thumbnail" :alt="product.title">
        </td>
      </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button :disabled="page === 1" @click="page--">Назад</button>
      <span>Сторінка {{ page }} з {{ totalPages }}</span>
      <button :disabled="page === totalPages" @click="page++">Вперед</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px;
}

h1 {
  text-align: center;
  font-size: 36px;
}

.search {
  display: block;
  margin-left: auto;
  margin-bottom: 20px;
  width: 320px;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  border: 1px solid #d1d5db;
  padding: 12px;
  text-align: left;
  vertical-align: middle;
}

th {
  background: #f3f4f6;
  cursor: pointer;
}

tr:hover {
  background: #e5e7eb;
}

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.red {
  color: red;
  font-weight: 700;
}

.green {
  color: green;
  font-weight: 700;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  align-items: center;
}

button {
  padding: 10px 16px;
  border: none;
  background: #2563eb;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

button:disabled {
  background: gray;
  cursor: not-allowed;
}
</style>
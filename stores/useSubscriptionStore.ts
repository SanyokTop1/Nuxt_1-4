import { defineStore } from 'pinia'

export type SubscriptionPlan = {
    title: string
    price: string
    oldPrice: string
    yearPrice: string
    saving: string
    users: string
    extra: string
    exports: string
    exportsExtra: string
    skips: string
}

export const useSubscriptionStore = defineStore('subscription', () => {
    const selectedPlan = ref<SubscriptionPlan | null>(null)

    const hasSelectedPlan = computed(() => selectedPlan.value !== null)

    function selectPlan(plan: SubscriptionPlan) {
        selectedPlan.value = plan
    }

    function clearPlan() {
        selectedPlan.value = null
    }

    return {
        selectedPlan,
        hasSelectedPlan,
        selectPlan,
        clearPlan
    }
})
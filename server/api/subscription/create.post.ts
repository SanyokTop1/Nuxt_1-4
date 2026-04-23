export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { cardNumber, expiry, cvc, fullName, address, consent } = body

    if (!cardNumber || !expiry || !cvc || !fullName || !address || !consent) {
        return {
            success: false,
            message: 'Будь ласка, заповніть усі поля та підтвердіть згоду.'
        }
    }

    return {
        success: true,
        message: 'Підписку успішно створено.'
    }
})

const CATEGORIES = Object.freeze({
    SPICYCHICKEN:"spicy chicken",
    CRISPYCHICKEN:'crispy chicken',
    SNACKS:"snacks",
    HAPPYMEAL:'happy meal',
    SOUPNOODLES:'noodles and soup',
    BEVARAGE: 'bevarage',
    ICECREAM: "ice cream",
    COFFEE:"coffee"
    
})

const PAYMENT_METHOD = Object.freeze({
    CASH:'cash',
    ONLINE:'online'
})

const ORDER_STATUS = Object.freeze({
    PENDING:'pending',
    COMPLETED:'completed',
    CANCELED:'canceled'
})



module.exports = {CATEGORIES, PAYMENT_METHOD, ORDER_STATUS}
export const currencyFormatter = (amount)=>{
    const formatter=Intl.NumberFormat('en-US',{
        currency:'AUD',
        style:'currency'

    })
    return formatter.format(amount)
}
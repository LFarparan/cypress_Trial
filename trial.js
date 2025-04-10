const date = new Date().toISOString()
const timestamp = `${date.slice(5,7)}-${date.slice(8,10)}-${date.slice(2,4)}`

console.log(timestamp)
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 5000

async function start() {
    try {
        await mongoose.connect('mongodb+srv://babki:9999>@moneymanager.s5ztp.mongodb.net/moneyManager?retryWrites=true&w=majority')
        app.listen(PORT, () => {
            console.log(`Servers started on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()

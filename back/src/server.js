//Rotas em Express (Arquivo Principal) 

//Importando Express e Cors
const express = require('express')
const cors = require('cors')

//importando o insertitems
const {insertItem, updateItem, deleteItem, getAllItems} = require('./allItems')


//Iportando o getallitems


//Criando uma instância
const app = express()

app.use(cors())
app.use(express.json())

//Abrindo a porta
const PORT = 3003

app.listen(PORT, () => {
    console.log(`Funcionando na porta ${PORT}`)
})

//Criando a rota para buscar os itens
// Recebe as funçõesdoe getallitems para fazer as requisições e 
// e entrega as respostas.
app.get('/pegar', async (req, res) => {
    try {
        const items = await getAllItems()
        res.status(200).json(items)
        
    } catch (error){
        res.status(500).json({error: error.message})
    }
}) 
// Rota para adicionar items
app.post('/insertItem', async (req, res) =>{
    const {title, author} = req.body
    try{
        const result = await insertItem(title, author)
        res.status(201).json(result)
    }catch {
        res.status(500).json({ error: error.message})
    }
})

// Rota para editar um item
app.put('/updateItem/:id', async (req, res)=>{
    const {id} = req.params
    const {title, author} = req.body

    try{
        const result = await updateItem(id,title, author)
        res.status(200).json(result)
    }catch (error){
        res.status(500).json({ error: error.message })
    }
})
// Rota para excluir um item
app.delete('/deleteItem/:id', async (req, res) => {
    const {id} = req.params

    try {
        const result = await deleteItem(id)
        res.status(200).json(result)
    }catch (error){
        res.status(500).json({ error: error.message})
    }
})


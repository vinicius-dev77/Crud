// Esse arquivo contém as funções que vão realizar as intereções com o banco de dados


const connection = require('./connection')

//Seleciona o banco de dados e a tabela que vai receber as interações
const getAllItems = async () => {
    try {
        const query = 'SELECT * FROM crud_2024_3.book'
        const result = await connection.execute(query) 
        return result
    } catch (error) {
        throw new Error(`Erro ao buscar itens ${error.message}`)
    }
}
//Essa função vai acesar o comando de insert do SQL para adicionar novos items na tabela
async function insertItem(title, author) {
    try{
        const insertQuery = "INSERT INTO book (title, author) VALUES (?,?)"
        const values = [title, author]

       return await connection.execute(insertQuery, values)
        
    }catch (error){
        throw new Error(`Erro oa inserir item: ${error.message}`)
    }
}

//Função responssavel por atilizar o comando update do SQL, que vai editar os items
const updateItem = async (id, title, author) => {
    try{
        const updateQuery = "UPDATE book SET title = ? , author =  ? WHERE id = ?"
        const values = [title, author, id]
        const [result] = await connection.execute(updateQuery, values)
        return result
    }catch (error){
        throw new Error(`Erro ao excluir item: ${error.message}`)
    }
}


//Função que xeclui o item da tabela book
const deleteItem = async (id) => {
    try{
        const deleteQuery = "DELETE FROM book WHERE id = ?"
        const values = [id]
        const [result] = await connection.execute(deleteQuery, values)
        return result
    } catch (error) {
        throw new Error(`Erro ao excluir item: ${error.message}`)
    }
}

module.exports = {getAllItems, insertItem, updateItem, deleteItem} 

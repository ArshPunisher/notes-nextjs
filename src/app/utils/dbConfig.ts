import mongoose from 'mongoose'

const connect = async () =>{
  try {
    mongoose.connect(process.env.MONGODB_URI)
    const connection = mongoose.connection

    connection.on('connected', ()=>{
      console.log("MongoDB Connected")
    })

    connection.on('error', (err)=>{
      console.log("Database Connection Error", err)
    })
  } catch (error) {
    console.log("Database Error", error)
  }
}

export default connect;
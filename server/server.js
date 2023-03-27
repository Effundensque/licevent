const express = require('express')
const cors = require('cors')


const sequelize = require('./db')

const User = require('./models/users')
const Website = require('./models/websites')
const { Op } = require('sequelize')
const crypto = require('crypto')

User.hasMany(Website)

const app = express()
app.use(cors())
app.use(express.json())


app.get('/sync', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'sample db created' })
  } catch (err) {
    next(err)
  }
})


//REST for Users

  
  

  app.get('/users', async (req, res, next) => {
    try {
      const users = await User.findAll()
      res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  })

  
  app.post('/usersToken', async (req,res,next)=>{
    try {
      const userS = await User.findAll({
        where: {
          token:req.body.token
        }
      })
      if (userS)
      {
        res.status(200).json(userS)
      }
      else
      {
        res.status(404).json({message:"user not found"})
      }

    } catch (error) {
      console.warn(error)
    }
  })

  app.post('/users', async (req, res, next) => {
    try {
      const userS = await User.findAll({
        where: {
          email:req.body.email
        }
      })
      if (userS.length!==0)
      {
        res.status(200).json({token:userS[0].token,message: "User already exists" })
        
      }else
      {
        const token = crypto.randomBytes(16).toString('hex')
        const newBody = {token:token,name:req.body.name,given_name:req.body.given_name,email:req.body.email,picture:req.body.picture}
        const user = await User.create(newBody)
        res.status(201).json({token:user.token})
      }
      
    } catch (err) {
      next(err)
    }
  })






app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})



app.listen(8080)

import express from 'express'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { execa } from 'execa';
// const express = require('express')
const cors = require('cors')
const path = require('path')
const os = require('os')
const fs = require('fs')
const { Op } = require('sequelize')
const crypto = require('crypto')


const sequelize = require('./db.cjs')
const User = require('./models/users.cjs')
const Website = require('./models/websites.cjs')




// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import os from 'os';
// import fs from 'fs';
// import { execa } from 'execa';
// import sequelize from './db.js';
// import User from './models/users.js';
// import Website from './models/websites.js';
// import { Op } from 'sequelize';
// import crypto from 'crypto';

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


// REST for Terraform
app.post('/terraform', async (req, res, next) => {
  const { terraformCode } = req.body;
  console.warn("Terraform code: " + terraformCode);
  try {
    // create a temporary directory to store the Terraform configuration file
    const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'terraform-'))

    // write the Terraform configuration file to the temporary directory
    const configFile = path.join(tempDir, 'terraform.tf')
    await fs.promises.writeFile(configFile, terraformCode)

    // initialize the Terraform working directory
    const tfInit = await execa('terraform', ['init'], { cwd: tempDir })

    // execute the Terraform command to apply the configuration
    const tfApply = await execa('terraform', ['apply', '-auto-approve'], { cwd: tempDir })

    res.status(200).json({ message: 'Terraform command executed successfully.' })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



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

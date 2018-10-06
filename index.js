#!/usr/bin/env node
require("babel-register")
const program = require("commander")
const axios = require("axios")
const prompt = require("prompt")
const tokenStore = require("token-store")
const tokens = tokenStore({ filename: "tokenstoretest" })

program.version("0.0.8", "-v, --version")

program
  .command("auth:register")
  .description(`Register for Bitcoin.com credentials`)
  .action(async () => {
    prompt.start();
    prompt.get(['email', 'username', { name: 'password', hidden: true }, 'invite_code'], async (err, result) => {
      try {
        const response = await axios.post(`${process.env.REST_URL}users`, {
          user: {
            email: result.email,
            username: result.username,
            password: result.password,
            invite_code: result.invite_code,
          }
        })
        tokens.set({
          server: "http://localhost:5000",
          user: JSON.stringify(response.data.user),
          token: response.data.token
        })
        console.log({
          email: response.data.user.email,
          username: response.data.user.username,
          id: response.data.user._id
        })
      } catch (error) {
        throw error
      }
    })
  })

program
  .command("auth:2fa")
  .description(`check 2fa status`)
  .action(async () => {
    try {
      const response = await axios.get(`${process.env.REST_URL}auth/2fa`)
      console.log(response.data)
    } catch (error) {
      throw error
    }
  })

program
  .command("auth:login")
  .description(`login with your Bitcoin.com credentials`)
  .action(async () => {
    prompt.start()
    prompt.get(["username", "password"], async (err, result) => {
      try {
        const response = await axios.post(`${process.env.REST_URL}auth`, {
          username: result.username,
          password: result.password
        })
        tokens.set({
          server: "http://localhost:5000",
          user: JSON.stringify(response.data.user),
          token: response.data.token
        })
        console.log({
          username: response.data.user.username,
          id: response.data.user._id
        })
      } catch (error) {
        throw error
      }
    })
  })

program
  .command("auth:logout")
  .description(`login with your Bitcoin.com credentials`)
  .action(async () => {
    try {
      const response = await axios.post(`${process.env.REST_URL}auth/logout`)
      console.log(response.data)
    } catch (error) {
      throw error
    }
  })

program
  .command("auth:token")
  .description(`outputs current CLI authentication token`)
  .action(async () => {
    if (tokens.has("http://localhost:5000")) {
      current = tokens.current("http://localhost:5000")
      console.log(current.token)
    }
  })

program
  .command("auth:whoami")
  .description(`display the current logged in user`)
  .action(async () => {
    if (tokens.has("http://localhost:5000")) {
      current = tokens.current("http://localhost:5000")
      console.log({
        username: JSON.parse(current.user).username,
        id: JSON.parse(current.user)._id
      })
    }
  })

program
  .command("nodes:list")
  .description(`list all active nodes`)
  .action(async () => {
    try {
      if (!tokens.has("http://localhost:5000"))
        throw new Error("Login required")

      current = tokens.current("http://localhost:5000")
      const response = await axios.get(`${process.env.REST_URL}nodes`, {
        headers: { Authorization: `Bearer ${current.token}` }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
      throw error
    }
  })

program
  .command("nodes:create")
  .description(`create a new node`)
  .option("-n, --name [name]", "Name of your node [name]", "defaultName")
  .option("-f, --flavor [flavor]", "Flavor of your node [name]", "abc.0.18.0")
  .action(async cmd => {
    try {
      if (!tokens.has("http://localhost:5000"))
        throw new Error("Login required")

      current = tokens.current("http://localhost:5000")

      const data = {
        name: cmd.name,
        flavor: cmd.flavor
      }
      const requestOptions = {
        headers: { Authorization: `Bearer ${current.token}` }
      }
      const response = await axios.post(
        `${process.env.REST_URL}nodes`,
        data,
        requestOptions
      )
      console.log(response.data)
    } catch (error) {
      throw error
    }
  })

program
  .command("nodes:delete <name>")
  .description(`delete a node`)
  .action(async name => {
    try {
      if (!tokens.has("http://localhost:5000"))
        throw new Error("Login required")

      current = tokens.current("http://localhost:5000")

      const requestOptions = {
        headers: { Authorization: `Bearer ${current.token}` }
      }
      const response = await axios.delete(
        `${process.env.REST_URL}nodes/${name}`,
        requestOptions
      )
      console.log(response.data)
    } catch (error) {
      throw error
    }
  })

program.parse(process.argv)

// print help if no command given
if (!process.argv.slice(2).length) program.outputHelp()

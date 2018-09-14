# `bitbox-cloud`

Command line utilities for Bitcoin.com's Cloud

## Usage

### Installation

`yarn add global bitbox-cloud`

### Authentication

#### auth:register

Register for Bitcoin.com credentials

```
bitbox-cloud auth:register
prompt: username:  myUsername
prompt: password:  myPassword
{ username: 'myUsername', id: '5b888278d3955119e52c827a' }
```

#### auth:2fa

check 2fa status

```
bitbox-cloud auth:2fa
{ success: 'twofa' }
```

#### auth:login

login with your Bitcoin.com credentials

```
bitbox-cloud auth:login
prompt: username:  myUsername
prompt: password:  myPassword
{ username: 'myUsername', id: '5b888278d3955119e52c827a' }
```

#### auth:logout

login with your Bitcoin.com credentials

```
auth:logout
{ success: 'logout' }
```

#### auth:token

outputs current CLI authentication token

```
bitbox-cloud auth:token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViODg4Mjc4ZDM5NTUxMTllNTJjODI3YSIsImlhdCI6MTUzNTY3MzA4OH0.P7pDEqQNFNzIs6PfyuoQEFO3r4Lkh9DS-WyeNvVjyOQ
```

#### auth:whoami

display the current logged in user

```
bitbox-cloud auth:whoami
{ username: 'myUsername', id: '5b888278d3955119e52c827a' }
```

[![Coverage Status](https://coveralls.io/repos/github/Bitcoin-com/bitbox-cloud/badge.svg?branch=master)](https://coveralls.io/github/Bitcoin-com/bitbox-cloud?branch=master)

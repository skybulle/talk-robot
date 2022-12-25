const API = (function() { 
  const Token_Key = 'token'
  const BASE_URL = 'https://study.duyiedu.com'
  function get (path) {
    const headers = {}
    const token = localStorage.getItem(Token_Key)
    if (token) {
      headers.authorization = `Bearer ${token}`
    }
     
    return fetch(BASE_URL+path,{headers})
  }
  function post (path,bodyInfo) {
    const headers = {
      'Content-Type':'application/json'
    }
    const token = localStorage.getItem(Token_Key)
    if (token) {
      headers.authorization = `Bearer ${token}`
    }
     
    return fetch(BASE_URL+path,{headers,body:JSON.stringify(bodyInfo),method:'POST'})
  }
  async function reg (userInfo) {
    const resq = await post('/api/user/reg',userInfo)
    const body = await resq.json()
    return body
  }
  
  async function login (loginInfo) {
    const resq = await post('/api/user/login', loginInfo)
    const result = await resq.json()
    if (result.code === 0) {
      const token = resq.headers.get('authorization')
      localStorage.setItem(Token_Key, token) 
    }
    return result
  }
  async function exist (loginId) {
    return await get('/api/user/exists?loginId='+loginId)
      .then(item => item.json())
  }
  async function profile () {
    return await get('/api/user/profile')
      .then(item => item.json())
  }
  async function sendMsg (content) {
    const res =await post('/api/chat', { content })
    return await res.json()
  }
  async function historyMsg () {
    return await get('/api/chat/history')
      .then(item => item.json())
  }
  function removeItem () {
    localStorage.removeItem(Token_Key)
  }
  return {
    reg,
    login,
    exist,
    profile,
    sendMsg,
    historyMsg,
    removeItem
  }
}())

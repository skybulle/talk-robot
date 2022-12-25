(async function () {
  const resp = await API.profile()
  const users = resp.data
  if (!users) {
    alert('还未登录或登录失效')
    location.href = './login.html'
    return
  }
  const doms = {
    aside: {
      nickname: $('#nickname'),
      loginId: $('#loginId')
    },
    close: $('.close'),
    chatContainer: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    form:$('.msg-container')
  }
  setSideInfo()
  //注销事件
  doms.close.onclick = function() {
    API.removeItem()
    location.href = './login.html'
  }
  function setSideInfo () {
    doms.aside.nickname.innerText = users.nickname
    doms.aside.loginId.innerText = users.loginId
  }
  function addChat (chatInfo) {
    const div = $$$('div')
    div.classList.add('chat-item')
    if (chatInfo.from) {
      div.classList.add('me')
    }
    const img = $$$('img')
    img.src =chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg"
    img.classList.add('chat-avatar')
    const content = $$$('div')
    content.innerText = chatInfo.content
    content.classList.add('chat-content')
    const date = $$$('div')
    date.classList.add('chat-date')
    date.innerText = formatDate(chatInfo.createdAt)
    div.appendChild(img)
    div.appendChild(content)
    div.appendChild(date)
    doms.chatContainer.appendChild(div)
  }
  //加载历史记录
  async function setHistoryInfo () {
    const resp = await API.historyMsg()

    for (const item of resp.data) {
      addChat(item)
    }
    scrollBottom()
  }
  function scrollBottom () {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
  }
  await setHistoryInfo()
  doms.form.onsubmit = function(e) {
    e.preventDefault();
    sendMessage()
  }
  async function sendMessage () {
    const content = doms.txtMsg.value
    addChat({
      from: users.loginId,
      to: null,
      createdAt: Date.now(),
      content:content
    })
    scrollBottom()
    doms.txtMsg.value = ''
    const resp = await API.sendMsg(content)
    addChat({
      from: null,
      to: users.loginId,
      ...resp.data
    })
    scrollBottom()
  }
  function formatDate (timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDay().toString().padStart(2, '0')
    const hours =date.getHours().toString().padStart(2,'0')
    const minutes =date.getMinutes().toString().padStart(2,'0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
})()

const txtId = new FieldValidator('txtLoginId',async function(value) {
  if (!value) {
    return '请填写账号'
  }
})
const txtLoginPwd = new FieldValidator('txtLoginPwd',function(value) {
  if (!value) {
    return '请填写密码'
  }
})
const form = $('.user-form')
form.onsubmit =async function(e) {
  e.preventDefault();
  
  const result = await FieldValidator.validate(txtId,txtLoginPwd)
  if (!result) {
    return
  }
  console.log('a');
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())
  const resp = await API.login(data)
  console.log(resp);
  if (resp.code === 0) {
    alert('登录成功')
    location.href = '../index.html'
  } else {
    txtId.p.innerText = '账号或密码错误'
    txtLoginPwd.input.value = ''
  }
}

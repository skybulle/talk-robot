const txtId = new FieldValidator('txtLoginId',async function(value) {
  if (!value) {
    return '请填写账号'
  }
  const results = await API.exist(value)
  if (results.data) {
    return '该账号已存在'
  }
})
const txtNickname = new FieldValidator('txtNickname',function(value) {
  if (!value) {
    return '请填写昵称'
  }
})
const txtLoginPwd = new FieldValidator('txtLoginPwd',function(value) {
  if (!value) {
    return '请填写密码'
  }
})
const txtLoginPwdConfirm = new FieldValidator('txtLoginPwdConfirm',function(value) {
  if (!value) {
    return '请再次填写密码'
  }
  if (value !== txtLoginPwd.input.value) {
    return '请保持两次输入密码一致'
  }
})
const form = $('.user-form')
form.onsubmit =async function(e) {
  e.preventDefault();
  
  const result = await FieldValidator.validate(txtId, txtNickname, txtLoginPwd, txtLoginPwdConfirm)
  if (!result) {
    return
  }
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())
  const resp = await API.reg(data)
  console.log(resp);
  if (resp.code === 0) {
    alert('注册成功')
    location.href = '../login.html'
  }
 
}

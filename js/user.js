class FieldValidator {
  constructor(txtId, validatorFn) {
    this.input = $('#' + txtId)
    this.p = this.input.nextElementSibling
    this.validatorFn = validatorFn
    this.input.onblur = () => {
      this.validate()
    }
  }
  async validate () {
    const errInfo =await this.validatorFn(this.input.value)
    if (errInfo) {
      this.p.innerText = errInfo
      return false
    } else {
      this.p.innerText = ''
      return true
    }
  }
  static async validate (...validators) {
    const props = validators.map(v => v.validate())
    const result = await Promise.all(props)
    return result.every(item=>item)
  }
}

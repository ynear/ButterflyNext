import { maxShow } from '~/constant/dictionary'
import { BaseGenerator, NumberGenerateOption } from '.'

export default class NumberGenerator implements BaseGenerator {
  private options: NumberGenerateOption
  private randomLengthFlag = 0
  private stepStartFlag = 0
  constructor(options: NumberGenerateOption) {
    const { from, to } = options
    this.randomLengthFlag = 0
    this.stepStartFlag = Math.min(Number(from), Number(to))

    this.options = options
    this.showList = []
    this.init()
  }

  private formatNumber = (item: number, options: NumberGenerateOption) => {
    const value = Number(item.toFixed(options.isHex ? undefined : options.maxFractionDigits))
    const [integer = '0', fraction = ''] = `${value}`.split('.')
    let integerFormat = Number(integer).toString(options.isHex ? 16 : 10)
    if (integerFormat.length > options.maxIntegerDigits) {
      integerFormat = integerFormat.slice(integerFormat.length - options.maxIntegerDigits)
    }
    if (integerFormat.length < Math.max(options.minIntegerDigits, 1)) {
      integerFormat = `0000000000${integerFormat}`.slice(
        10 + integerFormat.length - Math.max(options.minIntegerDigits, 1)
      )
    }

    if (options.isHex) {
      return integerFormat
    }

    let fractionFormat = fraction
    if (fractionFormat.length > options.maxFractionDigits) {
      fractionFormat = fractionFormat.slice(0, options.maxFractionDigits)
    }
    if (fractionFormat.length < options.minFractionDigits) {
      fractionFormat = `${fractionFormat}0000000000`.slice(0, options.minFractionDigits)
    }
    const fullFormat = `${integerFormat}${fractionFormat.length ? `.${fractionFormat}` : ''}`

    return fullFormat
  }

  private init = () => {
    const min = Math.min(Number(this.options.to), Number(this.options.from))
    const max = Math.max(Number(this.options.to), Number(this.options.from))

    if (this.options.isRandom) {
      this.length = this.options.howMany

      while (
        min < max &&
        this.showList.length < this.options.howMany &&
        this.showList.length < maxShow
      ) {
        const format = this.formatNumber(Math.random() * (max - min) + min, this.options)
        if (!this.showList.includes(format)) {
          this.showList.push(format)
        }
      }
    } else {
      const step = Number(this.options.step)
      if (Number.isNaN(step) || step <= 0) {
        this.length = 0
        this.showList = []
        return
      }

      this.length = Math.floor((max - min) / step) + 1

      let start = min
      while (start <= max && this.showList.length < maxShow) {
        const format = this.formatNumber(start, this.options)
        if (!this.showList.includes(format)) {
          this.showList.push(format)
        }
        start = start + step
      }
    }
  }

  length = 0
  showList: string[] = []

  next() {
    const min = Math.min(Number(this.options.to), Number(this.options.from))
    const max = Math.max(Number(this.options.to), Number(this.options.from))

    if (this.options.isRandom) {
      if (min < max && this.randomLengthFlag < this.options.howMany) {
        const format = this.formatNumber(Math.random() * (max - min) + min, this.options)
        this.randomLengthFlag = this.randomLengthFlag + 1
        return format
      }

      return undefined
    } else {
      const step = Number(this.options.step)
      if (Number.isNaN(step) || step <= 0) {
        return undefined
      }

      if (this.stepStartFlag <= max) {
        const format = this.formatNumber(this.stepStartFlag, this.options)
        this.stepStartFlag = this.stepStartFlag + step
        return format
      }

      return undefined
    }
  }
}

import { maxShow } from '~/constant/dictionary'
import { BaseGenerator, BruteForcerGenerateOption } from '.'

export default class BruteForcerGenerator implements BaseGenerator {
  private options: BruteForcerGenerateOption
  private pointFlag: number[]

  constructor(options: BruteForcerGenerateOption) {
    const { character, length } = options
    this.pointFlag = new Array(length).fill(0)
    this.length = Math.pow(character.length, length)

    this.options = options
    this.showList = []
    this.init()
  }

  private init = () => {
    const { character, length } = this.options
    const characterLength = character.length
    const point: number[] = new Array(length).fill(0)

    while (point.every(item => item < characterLength) && this.showList.length < maxShow) {
      const str = point.map(item => character[item]).join('')
      this.showList.push(str)

      let pointIdx = length - 1
      while (pointIdx >= 0) {
        const pointValue = point[pointIdx]
        if (pointValue + 1 < characterLength || pointIdx === 0) {
          point[pointIdx] = pointValue + 1
          pointIdx = -1
        } else {
          point[pointIdx] = 0
          pointIdx = pointIdx - 1
        }
      }
    }
  }

  length = 0
  showList: string[] = []

  next() {
    const { character, length } = this.options
    const characterLength = character.length
    if (this.pointFlag.every(item => item < characterLength)) {
      const str = this.pointFlag.map(item => character[item]).join('')

      let pointIdx = length - 1
      while (pointIdx >= 0) {
        const pointValue = this.pointFlag[pointIdx]
        if (pointValue + 1 < characterLength || pointIdx === 0) {
          this.pointFlag[pointIdx] = pointValue + 1
          pointIdx = -1
        } else {
          this.pointFlag[pointIdx] = 0
          pointIdx = pointIdx - 1
        }
      }

      return str
    }

    return undefined
  }
}

import { maxShow } from '~/constant/dictionary'
import { BaseGenerator, DateGenerateOption } from '.'
import moment from 'moment'

export default class DateGenerator implements BaseGenerator {
  private options: DateGenerateOption
  private stepStartFlag: moment.Moment
  private stepEndFlag: moment.Moment
  constructor(options: DateGenerateOption) {
    const { fromYear, fromMonth, fromDay, toYear, toMonth, toDay, step, stepType } = options
    this.stepStartFlag = moment(`${fromYear}/${fromMonth}/${fromDay}`, 'YYYY/M/D')
    this.stepEndFlag = moment(`${toYear}/${toMonth}/${toDay}`, 'YYYY/M/D')
    this.length = Math.floor(this.stepEndFlag.diff(this.stepStartFlag, stepType) / step) + 1

    this.options = options
    this.showList = []
    this.init()
  }

  private init = () => {
    const { fromYear, fromMonth, fromDay, toYear, toMonth, toDay, format, step, stepType } =
      this.options
    const from = moment(`${fromYear}/${fromMonth}/${fromDay}`, 'YYYY/M/D')
    const to = moment(`${toYear}/${toMonth}/${toDay}`, 'YYYY/M/D')

    let start = from
    while (start.isSameOrBefore(to) && this.showList.length < maxShow) {
      const formatStr = start.format(format)
      if (!this.showList.includes(formatStr)) {
        this.showList.push(formatStr)
      }
      start = start.add(step, stepType)
    }
  }

  length = 0
  showList: string[] = []

  next() {
    const { format, step, stepType } = this.options
    if (this.stepStartFlag.isSameOrBefore(this.stepEndFlag)) {
      const formatStr = this.stepStartFlag.format(format)
      this.stepStartFlag = this.stepStartFlag.add(step, stepType)
      return formatStr
    }

    return undefined
  }
}

import BruteForcerGenerator from './GeneratorForBruteForcer'
import DateGenerator from './GeneratorForDate'
import DirectoryTraversalGenerator from './GeneratorForDirectoryTraversal'
import NumberGenerator from './GeneratorForNumber'

export interface BaseGenerator {
  length: number
  showList: string[]
  next: () => string | undefined
}

export type NumberGenerateOption = {
  isRandom: boolean
  from: string
  to: string
  step: string
  howMany: number
  isHex: boolean
  minIntegerDigits: number
  maxIntegerDigits: number
  minFractionDigits: number
  maxFractionDigits: number
}

export const DateStep = {
  days: {
    id: 'days',
    name: '天'
  },
  weeks: {
    id: 'weeks',
    name: '周'
  },
  months: {
    id: 'months',
    name: '月'
  },
  years: {
    id: 'years',
    name: '年'
  }
} as const

export type DateGenerateOption = {
  fromYear: number
  fromMonth: number
  fromDay: number
  toYear: number
  toMonth: number
  toDay: number
  step: number
  stepType: Values<typeof DateStep>['id']
  format: string
}

export type BruteForcerGenerateOption = {
  character: string
  length: number
}

export type DirectoryTraversalGenerateOption = {
  fileName: string
  maxLevel: number
  extName?: string
  skipExtensionCheck: boolean
  encodeURI: boolean
  doubleEncodeURI: boolean
  doubleWrite: boolean
  isLinux: boolean
  nonStandardEncode1: boolean
  nonStandardEncode2: boolean
  nonStandardEncode3: boolean
}

export const payloadGenerateForNumber = (options: NumberGenerateOption) => {
  return new NumberGenerator(options)
}

export const payloadGenerateForDate = (options: DateGenerateOption) => {
  return new DateGenerator(options)
}

export const payloadGenerateForCharacter = (options: BruteForcerGenerateOption) => {
  return new BruteForcerGenerator(options)
}

export const payloadGenerateForDirectoryTraversal = (options: DirectoryTraversalGenerateOption) => {
  return new DirectoryTraversalGenerator(options)
}

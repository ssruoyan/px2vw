import css from 'css'
// import posthtml from 'posthtml'
import posthtmlParser from 'posthtml-parser'

const PxRegexp = /\b(\d+(\.\d+)?)px\b/

class Px2vw {
  constructor(options) {
    const defaultOptions = {
      vw: 375, // 基础宽度
      vh: 667, // 基础高度
      min: 0,  // 最小转换单位，取绝对值比较
      blackList: [], // 属性黑名单，放入黑名单的属性的值不会转换
      precision: 5, // 保留小数位数
      ignoreMediaQuery: false, // 忽略媒体查询
      ignoreCase: false, // 忽略大小写
    }

    this.options = {
      ...defaultOptions,
      ...options,
    }
  }
  processCss(cssText) {
    const cssAst = css.parse(cssText)
    const rules = cssAst.stylesheet.rules

    this.processCssRules(rules)

  }
  processCssRules(rules) {

    const len = rules.length

    for(let i = 0; i < len; i++) {
      let rule = rules[i]

      if (rule.type === 'media') {

      }

      if (rule.type === )
    }
  }

  processHtml(htmlText) {
    const tree = posthtmlParser(htmlText)

    tree.match({tag: 'style'}, (node) => {
      console.log(node)
    })

    tree.match({attrs: {style: true}}, (node) => {
      console.log(node)
    })
  }
}

export default Px2vw
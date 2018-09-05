import css from 'css'
// import posthtml from 'posthtml'
import posthtmlParser from 'posthtml-parser'

const pxRegexp = /\b(\d+(\.\d+)?)px\b/
const pxRegexpG = /\b(\d+(\.\d+)?)px\b/g

class Px2vw {
  constructor(options) {
    const defaultOptions = {
      vw: 375, // 基础宽度
      min: 0,  // 最小转换单位，取绝对值比较
      whiteList: [], // 属性白名单，放入白名单的属性的值不会转换
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

    return css.stringify(cssAst)
  }
  processCssRules(rules) {
    const { ignoreMediaQuery, whiteList } = this.options
    const whiteListRegexp = whiteList.length > 0 ? new RegExp(whiteList.join('|')) : /(?!)/

    rules.forEach((rule) => {
      // 判断如果是 @media 并且设置不忽略 media query
      if (rule.type === 'media' && !ignoreMediaQuery) {
        this.processCssRules(rule.rules)
      
      // 处理 @keyframes
      } else if (rule.type === 'keyframes') {
        this.processCssRules(rule.keyframes)

      // 只处理rule、keyframe、comment类型的定义，详情查看 https://github.com/reworkcss/css#readme
      } else if (rule.type === 'rule' || rule.type === 'keyframe') {

        rule.declarations.forEach((declaration, idx) => {
          
          // 判断在不匹配白名单，且属性值存在px
          if (!whiteListRegexp.test(declaration.property) && pxRegexp.test(declaration.value)) {
            const nextDeclaration = rule.declarations[idx + 1]

            // 如果紧接着定义后面就跟着注释
            if (nextDeclaration && nextDeclaration.type === 'comment') {

              // 注释不转换
              if (nextDeclaration.comment.trim() !== 'no') {
                declaration.value = this.getCaculateValue(declaration.value)
              }
            } else {
              declaration.value = this.getCaculateValue(declaration.value)
            }
          }
        })
      }
    })
  }

  processHtml(htmlText) {
    const tree = posthtmlParser(htmlText)

    console.log(tree)

    tree.match({tag: 'style'}, (node) => {
      console.log(node)
    })

    tree.match({attrs: {style: true}}, (node) => {
      console.log(node)
    })
  }
  getCaculateValue(val) {
    const { precision, min, vw, ignoreCase } = this.options
    const regexp = new RegExp(pxRegexp.source, ignoreCase ? 'ig' : 'g')
    
    return val.replace(regexp, ($0, $1) => {
      if (Math.abs($1) < min) {
        return $1 + 'px'
      }

      return parseFloat(($1 / vw).toFixed(precision)) + 'vw'
      
    })
  }
}

export default Px2vw
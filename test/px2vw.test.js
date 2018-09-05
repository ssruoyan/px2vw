import Px2vw from '../lib'
import fs from 'fs'
import path from 'path'

const source = fs.readFileSync(path.resolve(__dirname, 'source.css'))
const sourceHtml = fs.readFileSync(path.resolve(__dirname, 'source.html'))

const px2vw = new Px2vw({
    ignoreMediaQuery: true,
    precision: 3,
    whiteList: ['border']
})

const convertCss = px2vw.processCss(source.toString())

// px2vw.processHtml(sourceHtml.toString())

fs.writeFileSync(path.resolve(__dirname, 'source.vw.css'), convertCss)

import Px2vw from '../lib'
import assert from 'assert'

describe('shuold work with whiteList set', () => {
    const px2vw = new Px2vw({
        whiteList: ['border', 'font-size']
    })

    it('should out put right vw css file', () => {
        const cssText = 'body { font-size: 12px; border: solid 2px red; } p { width: 375px; height: 750px; }'
        const outputText = px2vw.processCss(cssText)

        assert.equal(outputText, 'body { font-size: 12px; border: solid 2px red; } p { width: 100vw; height: 200vw; }')
    })
})

describe('should work with vw set', () => {

})

describe('should work with precision set', () => {

})
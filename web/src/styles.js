import { injectGlobal } from 'vue-styled-components'
import { style, responsiveStyle } from '@/components/utils/css'
import Theme from '@/components/theme'
import flexboxgrid from '@/components/core/layout/flexboxgrid'
import font from '@/components/core/typography/font'

export default () => {
    injectGlobal`
        ${font}
        ${flexboxgrid}

        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }

        html {
            ${style('backgroundColor', Theme.Color.White)}
            box-sizing: border-box;
            ${style('fontFamily', Theme.Font.Lato)}
            text-rendering: optimizeLegibility;
        }

        body {
            margin: 0;
            min-height: 100vh;
            min-width: 100vw;
        }

        #app {
            min-height: 100vh;
        }
    `
}

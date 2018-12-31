const path = require('path')

module.exports = {
    title: 'Wilbur Style Guide',
    exampleMode: 'expand',
    pagePerSection: true,
    require: [path.join(__dirname, 'src/components/docs/index.js')],
    usageMode: 'expand',
    sections: [
        {
            name: 'Color',
            content: 'src/components/core/color/README.md',
            exampleMode: 'hide',
        },
        {
            name: 'Layout',
            content: 'src/components/core/layout/README.md',
            components: 'src/components/core/layout/*/*.vue',
            sectionDepth: 1,
        },
        {
            name: 'Typography',
            content: 'src/components/core/typography/README.md',
            components: 'src/components/core/typography/*/*.vue',
            sectionDepth: 1,
        },
        {
            name: 'Actions',
            content: 'src/components/core/actions/README.md',
            components: 'src/components/core/actions/*/*.vue',
            sectionDepth: 1,
        },
        {
            name: 'Form Elements',
            content: 'src/components/core/form/README.md',
            components: 'src/components/core/form/*/*.vue',
            sectionDepth: 1,
        },
        {
            name: 'Indicators',
            content: 'src/components/core/indicators/README.md',
            components: 'src/components/core/indicators/*/*.vue',
            sectionDepth: 1,
        },
    ],
}

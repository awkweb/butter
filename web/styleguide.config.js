const path = require('path')

module.exports = {
    title: 'Wilbur Style Guide',
    exampleMode: 'expand',
    pagePerSection: true,
    require: [
        path.join(__dirname, 'src/docs/main.js'),
        path.join(__dirname, 'src/assets/styles/main.scss'),
    ],
    usageMode: 'expand',
    sections: [
        {
            name: 'Color',
            content: 'src/components/color/README.md',
            exampleMode: 'hide',
        },
        {
            name: 'Layout',
            content: 'src/components/layout/README.md',
            components: 'src/components/layout/*/*.vue',
            sectionDepth: 1,
        },
        {
            name: 'Typography',
            content: 'src/components/typography/README.md',
            components: 'src/components/typography/*/*.vue',
            sectionDepth: 1,
        },
        {
            name: 'Actions',
            content: 'src/components/actions/README.md',
            sectionDepth: 1,
        },
        {
            name: 'Form',
            content: 'src/components/form/README.md',
            sectionDepth: 1,
        },
        {
            name: 'Indicators',
            content: 'src/components/indicators/README.md',
            sectionDepth: 1,
        },
    ],
}

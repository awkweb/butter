const path = require('path')

module.exports = {
    title: 'Wilbur Style Guide',
    sections: [
        {
            name: 'Color',
            content: 'src/docs/sections/color.md',
            exampleMode: 'collapse',
        },
        {
            name: 'Layout',
            content: 'src/docs/sections/forms.md',
            components: 'src/components/layout/*.vue',
            sectionDepth: 1,
        },
        {
            name: 'Typography',
            content: 'src/docs/sections/typography.md',
            components: 'src/components/typography/*.vue',
            sectionDepth: 1,
        },
        // {
        //     name: 'Actions',
        //     content: 'src/docs/sections/forms.md',
        //     components: 'src/components/forms/*.vue',
        //     sectionDepth: 1,
        // },
        // {
        //     name: 'Form',
        //     content: 'src/docs/sections/forms.md',
        //     components: 'src/components/forms/*.vue',
        //     sectionDepth: 1,
        // },
        // {
        //     name: 'Indicators',
        //     content: 'src/docs/sections/indicators.md',
        //     components: 'src/components/indicators/*.vue',
        //     sectionDepth: 1,
        // },
    ],
    exampleMode: 'expand',
    usageMode: 'expand',
    pagePerSection: true,
    require: [
        path.join(__dirname, 'src/docs/main.js'),
        path.join(__dirname, 'src/assets/styles/main.scss'),
    ],
}

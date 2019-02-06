const path = require("path");

module.exports = {
    exampleMode: "expand",

    pagePerSection: true,

    propsParser: require("react-docgen-typescript").parse,

    sections: [
        {
            name: "Color",
            content: "src/components/core/color/readme.md",
            exampleMode: "hide"
        },
        {
            name: "Typography",
            content: "src/components/core/typography/readme.md",
            components: "src/components/core/typography/**/*/index.tsx",
            sectionDepth: 2
        },
        {
            name: "Layout",
            content: "src/components/core/layout/readme.md",
            components: "src/components/core/layout/**/*/index.tsx",
            sectionDepth: 2
        },
        {
            name: "Actions",
            content: "src/components/core/actions/readme.md",
            components: "src/components/core/actions/**/*/index.tsx",
            sectionDepth: 2
        },
        {
            name: "Form",
            content: "src/components/core/form/readme.md",
            components: "src/components/core/form/**/*/index.tsx",
            sectionDepth: 2
        },
        {
            name: "Indicators",
            content: "src/components/core/indicators/readme.md",
            components: "src/components/core/indicators/**/*/index.tsx",
            sectionDepth: 2
        }
    ],

    title: "Wilbur Style Guide",

    serverPort: 3003,

    styleguideComponents: {
        Wrapper: path.join(__dirname, "src/components/docs/Wrapper")
    },

    usageMode: "expand",

    webpackConfig: require("react-scripts/config/webpack.config")
};

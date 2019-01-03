const path = require("path");

module.exports = {
    exampleMode: "expand",

    pagePerSection: true,

    propsParser: require("react-docgen-typescript").parse,

    sections: [
        {
            name: "Color",
            content: "src/components/core/components/color/readme.md",
            exampleMode: "hide"
        },
        {
            name: "Typography",
            content: "src/components/core/components/typography/readme.md",
            components:
                "src/components/core/components/typography/**/*/index.tsx",
            sectionDepth: 2
        },
        {
            name: "Layout",
            content: "src/components/core/components/layout/readme.md",
            components: "src/components/core/components/layout/**/*/index.tsx",
            sectionDepth: 2
        },
        {
            name: "Actions",
            content: "src/components/core/components/actions/readme.md",
            components: "src/components/core/components/actions/**/*/index.tsx",
            sectionDepth: 2
        },
        {
            name: "Form",
            content: "src/components/core/components/form/readme.md",
            components: "src/components/core/components/form/**/*/index.tsx",
            sectionDepth: 2
        },
        {
            name: "Indicators",
            content: "src/components/core/components/indicators/readme.md",
            components:
                "src/components/core/components/indicators/**/*/index.tsx",
            sectionDepth: 2
        }
    ],

    title: "Wilbur Style Guide",

    serverPort: 3003,

    styleguideComponents: {
        Wrapper: path.join(__dirname, "src/components/core/docs/Wrapper")
    },

    usageMode: "expand",

    webpackConfig: require("react-scripts/config/webpack.config")
};

export const colors = Object.freeze({
    gold1: "hsl(34, 47%, 53%)",
    gold2: "hsl(34, 47%, 58%)",
    gold3: "hsl(34, 47%, 63%)",
    gold4: "hsl(34, 47%, 68%)",
    gold5: "hsl(45, 85%, 89%)",

    blue1: "hsl(186, 99%, 17%)",
    blue2: "hsl(186, 99%, 22%)",
    blue3: "hsl(186, 99%, 27%)",
    blue4: "hsl(186, 99%, 32%)",
    blue5: "hsl(210, 64%, 86%)",

    red1: "hsl(17, 89%, 40%)",
    red2: "hsl(17, 89%, 45%)",
    red3: "hsl(17, 89%, 55%)",
    red4: "hsl(17, 89%, 60%)",
    red5: "hsl(17, 87%, 86%)",

    green1: "hsl(143, 94%, 29%)",
    green2: "hsl(143, 94%, 34%)",
    green3: "hsl(143, 94%, 39%)",
    green4: "hsl(143, 94%, 44%)",
    green5: "hsl(97, 43%, 86%)",

    gray1: "hsl(0, 0%, 13%)",
    gray2: "hsl(0, 0%, 23%)",
    gray3: "hsl(0, 0%, 32%)",
    gray4: "hsl(0, 0%, 38%)",
    gray5: "hsl(0, 0%, 49%)",
    gray6: "hsl(0, 0%, 62%)",
    gray7: "hsl(0, 0%, 69%)",
    gray8: "hsl(0, 0%, 81%)",
    gray9: "hsl(0, 0%, 88%)",
    gray10: "hsl(0, 0%, 97%)",

    white: "hsl(0, 0%, 100%)",
    background: "hsl(0, 0%, 100%)"
});

interface Color {
    [index: string]: string | string[] | {};
}

export type Colors = typeof colors & Color;

export default colors;

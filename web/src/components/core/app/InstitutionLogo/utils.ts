import colors from "../../../theme/colors";

/**
 * Gets institution color for id
 */
export const getColorForId = (id: string) => {
    switch (id) {
        case "ins_1":
            return "hsl(357, 79%, 52%)";
        case "ins_3":
            return "hsl(210, 84%, 36%)";
        case "ins_51":
            return "hsl(197, 100%, 47%)";
        default:
            return colors.gold2;
    }
};

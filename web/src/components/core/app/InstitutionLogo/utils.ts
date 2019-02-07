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

/**
 * Gets institution icon for id
 */
export const getIconForId = (id: string) => {
    switch (id) {
        case "ins_1":
            return import(`../../icons/Icon/svgs/institutions/ins_1`);
        case "ins_3":
            return import(`../../icons/Icon/svgs/institutions/ins_3`);
        case "ins_51":
            return import(`../../icons/Icon/svgs/institutions/ins_51`);
        default:
            return import("../../icons/Icon/svgs/bank");
    }
};

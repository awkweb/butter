import * as React from "react";
import styled, { css } from "styled-components";
import { cssFactory } from "../../../utils/styled-components";
import { style } from "../../../utils/css";
import { Box } from "../../layout/Box";
import { Text } from "../../typography/Text";

interface Props {
    hasLowercaseLetter: boolean;
    hasUppercaseLetter: boolean;
    hasNumber: boolean;
    isMinLength: boolean;
}

export class PasswordFeatures extends React.Component<Props> {
    render() {
        const {
            hasLowercaseLetter,
            hasUppercaseLetter,
            hasNumber,
            isMinLength
        } = this.props;
        return (
            <Box
                display={Box.Display.Flex}
                flexDirection={{
                    xs: Box.FlexDirection.Column,
                    sm: Box.FlexDirection.Row
                }}
            >
                <Box mr={3}>
                    <StyledPasswordFeature success={hasLowercaseLetter}>
                        <Text size={Text.Size.Xs}>One lowercase letter</Text>
                    </StyledPasswordFeature>
                    <StyledPasswordFeature success={hasUppercaseLetter}>
                        <Text size={Text.Size.Xs}>One uppercase letter</Text>
                    </StyledPasswordFeature>
                </Box>
                <Box>
                    <StyledPasswordFeature success={hasNumber}>
                        <Text size={Text.Size.Xs}>One number</Text>
                    </StyledPasswordFeature>
                    <StyledPasswordFeature success={isMinLength}>
                        <Text size={Text.Size.Xs}>8 characters minimum</Text>
                    </StyledPasswordFeature>
                </Box>
            </Box>
        );
    }
}

interface StyledAnchorProps {
    success: boolean;
}

const styles = cssFactory<StyledAnchorProps>(css)`
    align-items: center;
    display: flex;
    margin-bottom: 0.25rem;
    ${props => style("opacity", 0.35, props.success)};
    transition: opacity 125ms;
    &:before {
        ${props => style("backgroundColor", props.theme.colors.green3)};
        border-radius: 8px;
        content: '';
        display: inline-block;
        height: 8px;
        margin-right: 0.5rem;
        margin-top: 0.1rem;
        min-height: 8px;
        min-width: 8px;
        width: 8px;
    }
`;

const StyledPasswordFeature = styled.div`
    ${styles};
`;

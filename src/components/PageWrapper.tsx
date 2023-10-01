import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { device } from "../constants";

interface IProps {
	isSmallDevice: boolean,
	page?: string
}

const PageWrapper = ({ children }: { children: JSX.Element }) => {
	const isSmallDevice: boolean = useMediaQuery({ maxWidth: 768 });

	return (
		<Wrapper
			isSmallDevice={isSmallDevice}
		>
			{children}
		</Wrapper>
	);
};

const Wrapper = styled.div<IProps>`
	padding-inline: 1.3rem;
	margin-top: 10rem;

	margin-left: ${(props) => {
		if (props.isSmallDevice) {
			return 0;
		} else {
			return props.theme.sideBarWidth;
		}
	}};

	@media ${device.laptop} {
		margin-left: ${(props) => {
		if (props.isSmallDevice) {
			return 0;
		} else {
			return "4rem";
		}
	}};
	}
	
 
	@media ${device.isSmallDevice} {
		padding-inline: 0.65rem;
	}

	@media ${device.tablet} {
		min-height: calc(100vh - 1rem);
		padding-bottom: 1rem;
	}
`;

export default PageWrapper;

import styled, { keyframes } from "styled-components";

export default function PageLoader () {
	return (
		<Loader>
			<div></div>
			<div></div>
			<div></div>
		</Loader>
	);
};

const bouncingLoader = keyframes`
  to {
    opacity: 0.1;
    background: ${props => props.theme.secondaryColor};
    transform: translateY(-8px);
  }
`;

const Loader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;

	> div {
		width: 1rem;
		height: 1rem;
		margin: 3px 6px;
		border-radius: 50%;
		background-color: ${props => props.theme.primaryColor};
		opacity: 1;
		animation: ${bouncingLoader} 0.8s infinite alternate;
	}

	> div:nth-child(2) {
		animation-delay: 0.2s;
	}

	> div:nth-child(3) {
		animation-delay: 0.4s;
	}
`;


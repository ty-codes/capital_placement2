import styled, { keyframes } from "styled-components";

const LoadingComponent = ():JSX.Element => {
	return <Preloader />;
};

export default LoadingComponent;

const btnLoader = keyframes`
  from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Preloader = styled.span`
	aspect-ratio: 1;
	height: 1.5rem;
	width: 1.5rem;
	display: inline-block;
	padding: 0;
	border-radius: 100%;
	border: 2px solid;
	border-top-color: rgba(0, 0, 0, 1);
	border-bottom-color: rgba(0, 0, 0, 0.15);
	border-left-color: rgba(0, 0, 0, 0, 1);
	border-right-color: rgba(0, 0, 0, 0.15);
	-webkit-animation: ${btnLoader} 0.8s linear infinite;
	animation: ${btnLoader} 0.8s linear infinite;
`;

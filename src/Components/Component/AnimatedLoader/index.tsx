import "./AnimatedLoader.scss";

import styled, { css } from 'styled-components';

const DarkBackground = styled.div<{ disappear: boolean }>`
  display: none; /* Hidden by default */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  ${(props) =>
        props.disappear &&
        css`
      display: flex; /* show */
      justify-content: center;
      align-items: center;
    `}
`;

function AnimatedLoader() {

    return (
        <div className="">
            {/* <DarkBackground disappear={loading}> */}
                <div className="loader-64">
                </div>
            {/* </DarkBackground> */}
        </div>
    );
}

export { AnimatedLoader };

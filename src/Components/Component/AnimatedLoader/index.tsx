import "./AnimatedLoader.scss";

import styled, { css } from 'styled-components';

const DarkBackground = styled.div<{ disappear: boolean }>`
  display: none; /* Hidden by default */
  // position: fixed; /* Stay in place */
  // z-index: 999; /* Sit on top */
  // left: 0;
  // top: 0;
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

function AnimatedLoader({ loading }) {

    return (
        <div className="">
            <DarkBackground disappear={loading}>
                <div className="loader-38">
                    {/* <i className="fas fa-window-restore"></i> */}
                    {/* fas fa-window-restore */}
                </div>
            </DarkBackground>
        </div>
    );
}

export { AnimatedLoader };

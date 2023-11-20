import React from "react";
import { Button as RSButton } from "reactstrap";
import { ButtonProps } from "./interfaces";
import { Spinner } from "@Components";

function Button({
  loading,
  text,
  color = 'primary',
  variant = "default",
  size = 'lg',
  height = 15,
  width,
  icon,
  icons,
  onEnter,
  onClick,
  outline = false,
  ...rest
}: ButtonProps) {
  return (
    <>
      {variant === "default" && (
        <>
          <RSButton
            size={size}
            color={color}
            onClick={loading ? undefined : onClick}
            outline={outline}
            {...rest}
          >
            <div className="d-flex align-items-center justify-content-center">
              {loading && (
                <div>
                  <Spinner color="white" />
                </div>
              )}
              {!loading && <span style={{ letterSpacing: 0 }}>{text}</span>}
            </div>
          </RSButton>
        </>
      )}

      {(variant === "icon" || variant === "icon-with-text") && (
        <RSButton
          type="button"
          size={size}
          className="btn-icon"
          color={color}
          outline
          {...rest}
          onClick={onClick}
        >
          {loading && <Spinner />}
          {!loading && (
            <div className="d-flex align-items-center">
              {variant === "icon-with-text" && (
                <img src={icon} alt="" height={height} width={width} />
              )}
              <span className="btn-inner--text">{text}</span>
            </div>
          )}
        </RSButton>
      )}

      {variant === "icon-rounded" && (
        <RSButton
          type="button"
          size={size}
          className="btn-icon-only  d-flex align-items-center justify-content-center"
          color={color}
          outline
          onClick={onClick}
          {...rest}
        >
          {icons ? (
            <i className={icons} />
          ) : (
            <img src={icon} alt="" height={height} width={width} />
          )}
        </RSButton>
      )}

      {/* {variant === 'icon-rounded' &&
        <RSButton type={'button'} size={size} className={'btn-icon-only rounded-circle d-flex align-items-center justify-content-center'} color={color} onClick={onClick}  {...rest} >
          <ImageIcon src={icon} height={height} width={width} />
        </RSButton>
      } */}
    </>
  );
}

export { Button };

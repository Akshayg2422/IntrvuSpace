import React from 'react';
import { Button as RSButton } from 'reactstrap';
import { ButtonProps } from './interfaces';
import { Spinner } from '@Components';



function Button({
  loading,
  text,
  color = 'primary',
  variant = 'default',
  size = 'md',
  height = 15,
  width = 15,
  icon,
  icons,
  onEnter,
  onClick,
  loadingMessage = '',
  ...rest
}: ButtonProps) {
  return (
    <>
      {variant === 'default' && (
        <>
          <RSButton
            className="d-flex btn btn-primary align-items-center justify-content-center"
            size={size}
            style={{ fontSize: 17, height: 50, letterSpacing: 1 }}
            color={color}
            {...rest}
            onClick={loading ? undefined : onClick}
          >
            {loading && <Spinner color='white' />}
            <span className='text-uppercase ml-2'>{loading ? loadingMessage : text}</span>
          </RSButton>
        </>

      )}

      {(variant === 'icon' || variant === 'icon-with-text') && (
        <RSButton
          type="button"
          size={size}
          className="btn-icon"
          color={color}
          {...rest}
          onClick={onClick}
        >
          {loading && <Spinner />}
          {!loading && (
            <div className='d-flex align-items-center'>
              {variant === 'icon-with-text' && (
                <img src={icon} alt="" height={height} width={width} />
              )}
              <span className="btn-inner--text">{text}</span>
            </div>
          )}
        </RSButton>
      )}

      {variant === 'icon-rounded' && (
        <RSButton
          type="button"
          size={size}
          className="btn-icon-only  d-flex align-items-center justify-content-center"
          color={color}
          onClick={onClick}
          {...rest}
        >
          {icons ? <i className={icons} /> : <img src={icon} alt="" height={height} width={width} />}
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


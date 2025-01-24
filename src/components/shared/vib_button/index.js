
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Loading from '../loading';

const StyledButton = styled.button`
  /* This renders the buttons above... Edit me! */
  font-size: 12px;
  border-radius: 30px;
  padding: 12px 20px;
  font-weight: 500;
  &:disabled {
    cursor: not-allowed;
  }
  &:hover{
    opacity: 0.7;
  }

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props) => props.variant === 'primary' && css`
    color: #fff;
    background: #5388b9;
    border-color: #5388b9;
    &:disabled {
      background: #5388b9;
      border-color: #5388b9;
    }
    &:hover,
    &:active,
    &:focus {
      background-color: #5388b9 !important;
      border-color: #5388b9 !important;
      color: #fff;
    }
    &:active{
      box-shadow: 0 0 0 0.2rem rgba(83, 136, 185, 0.5) !important;
    }
  `}
  ${(props) => props.variant === 'secondary' && css`
    background: #21154a;
    border-color: #21154a;
    color: #fff;
    &:disabled {
      background: #21154a;
      border-color: #21154a;
    }
    &:hover,
    &:active,
    &:focus {
      background-color: #21154a !important;
      border-color: #21154a !important;
      color: #fff;
    }
    &:focus, &:active{
      box-shadow: 0 0 0 0.2rem rgba(36, 18, 77, 0.5) !important;
    }
  `}
  ${(props) => props.variant === 'outline-secondary' && css`
    background: #fff;
    border-color: #21154a;
    color: #21154A !important;
    &:disabled {
      border-color: #CBD2D5 !important;
      pointer-events: none;
      background: #fff;
      color: #CBD2D5 !important;
    }
    &:hover,
    &:active,
    &:focus {
      background-color: #fff !important;
      border-color: #21154a !important;
      color: #21154A !important;
    }
    &:focus, &:active{
      box-shadow: 0 0 0 0.2rem rgba(36, 18, 77, 0.5) !important;
    }
  `}
  ${(props) => props.variant === 'outline-primary' && css`
    color: #5388b9;
    background: #fff;
    border-color: #5388b9;
    border-width: 2px;
    letter-spacing: 0;
    line-height: 20px;
    &:disabled {
      opacity: 0.399;
      cursor: not-allowed;
    }
    &:hover,
    &:active,
    &:focus {
      background-color: #fff !important;
      color: #5388b9;
    }
    &:active{
      box-shadow: 0 0 0 0.2rem rgba(83, 136, 185, 0.5) !important;
    }
  `}
  ${(props) => props.variant === 'outline-white' && css`
    color: #ffffff;
    background: transparent;
    border-color: #ffffff;
    border-width: 2px;
    letter-spacing: 0;
    line-height: 20px;
    &:disabled {
      opacity: 0.399;
      cursor: not-allowed;
    }
    &:hover,
    &:active,
    &:focus {
      background-color: transparent !important;
      color: #fff;
    }
    &:active, &:focus{
      box-shadow: 0 0 0 0.2rem rgb(255 255 255 / 25%) !important;
    }
  `}
  ${(props) => props.variant === 'white' && css`
    background: #fff;
    border-color: #fff;
    color: #21154a;
    &:disabled {
      background: #fff;
      color: #21154a;
      border-color: #fff;
    }
    &:hover,
    &:active,
    &:focus {
      background-color: #fff !important;
      border-color: #fff !important;
      color: #21154a;
    }
    &:focus, &:active{
      box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.5) !important;
    }
  `}
`;

const VibButton = ({
  handleSubmit,
  isLoading,
  isDisabled,
  classes,
  children,
  variant,
  testId,
}) => {

  return (
    <StyledButton
      onClick={() => { handleSubmit(); }}
      disabled={isDisabled}
      className={classNames(classes, 'btn')}
      variant={variant}
      data-testid={testId}
    >
      {
        isLoading ? <Loading /> : null
        }
      {children}
    </StyledButton>
  );
};
VibButton.propTypes = {
  variant: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  classes: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  testId: PropTypes.string,
};
VibButton.defaultProps = {
  variant: 'primary',
  isLoading: false,
  isDisabled: false,
  classes: '',
  testId: 'vib-button',
  handleSubmit: () => {}
};
export default VibButton;

import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
// need to fix
import VibButton from './vib_button';

const StyledContentContainer = styled.div`
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(40,41,61,0.04), 0 8px 16px 0 rgba(96,97,112,0.16);
  padding: 3em 7em;
`;

const StyledHeading = styled.span`
  color: #2C2E2F;
  font-family: "Open Sans";
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 30px;
  text-align: center;
`;

const StyledCaptionTxt = styled.div`
  color: #000000;
  font-family: "Open Sans";
  font-size: 14px;
  letter-spacing: 0;
  line-height: 21px;
  text-align: center;
  font-weight: 400;
`;

const StyledActionBtnContainer = styled.div`
  button{
    font-size: 14px !important;
    font-weight: 600 !important;
    letter-spacing: 0;
    line-height: 20px;
    text-align: center;
    height: 52px;
    width: 162px;
  }
`;

const PageNotFound = () => {
  return (
    <div data-testid="page-not-found" className="page-wrap d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center mt-4">
          <Col md={9} className="text-center mx-auto mt-5">
            <StyledContentContainer>
              <StyledHeading className="display-1 d-block mb-3">
                {/* <FormattedMessage id="message.pageNotFound" /> */}
              </StyledHeading>
              <StyledCaptionTxt className="mb-4 lead">
                {/* <FormattedMessage id="message.pageNotFound.caption.text" /> */}
              </StyledCaptionTxt>
              <StyledActionBtnContainer>
                <VibButton variant="secondary">
                  {/* <FormattedMessage id="button.goToToday" /> */}
                </VibButton>
              </StyledActionBtnContainer>
            </StyledContentContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageNotFound;

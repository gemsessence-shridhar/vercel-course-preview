import classNames from 'classnames';
import pagePreviewStyles from '@components/lesson/lesson-page.module.scss';
import Page from '@components/PagePreview/Page';

const PagePreview = ({ pageData, nextPageUrl, previousPageUrl }) => (
  <div className={classNames(pagePreviewStyles['lesson-container'], 'pb-5')}>
    <Page
      pageData={pageData}
      nextPageUrl={nextPageUrl}
      previousPageUrl={previousPageUrl}
    />
  </div>
);

export default PagePreview;

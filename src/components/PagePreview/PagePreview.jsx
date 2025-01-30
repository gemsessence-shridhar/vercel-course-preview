import classNames from 'classnames';
import TimeLine from '@components/time_line';
import pagePreviewStyles from '@components/lesson/lesson-page.module.scss';
import Page from '@components/PagePreview/Page';
import { sampleItems } from '@components/PagePreview/utils';

const PagePreview = ({ pageData, nextPageUrl, previousPageUrl }) => (
  <div className={classNames(pagePreviewStyles['lesson-container'], 'pb-5')}>
    <TimeLine
      items={sampleItems}
      currentItem={sampleItems[0]}
      nextItemTitle="Next title"
    >
      <Page
        pageData={pageData}
        nextPageUrl={nextPageUrl}
        previousPageUrl={previousPageUrl}
      />
    </TimeLine>
  </div>
);

export default PagePreview;

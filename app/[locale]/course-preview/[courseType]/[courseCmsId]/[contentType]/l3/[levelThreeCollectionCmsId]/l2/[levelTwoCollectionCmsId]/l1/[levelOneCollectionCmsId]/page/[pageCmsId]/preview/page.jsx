import classNames from 'classnames';
import TimeLine from '@components/time_line';
import pagePreviewStyles from '@components/lesson/lesson-page.module.scss';
import Page from '@components/PagePreview/Page';
import { getPageData } from '../../../../../../../../../dataFetch';
import { sampleItems } from '../../../../../../../../../utils';

export default async function PagePreview({ params }) {
  const { locale, pageCmsId } = await params;
  const pageData = await getPageData(locale, pageCmsId);

  return (
    <div className={classNames(pagePreviewStyles['lesson-container'], 'pb-5')}>
      <TimeLine
        items={sampleItems}
        currentItem={sampleItems[0]}
        nextItemTitle="Next title"
      >
        <Page
          pageData={pageData.page}
          nextPageUrl={''}
          previousPageUrl={''}
        />
      </TimeLine>
    </div>
  );
}

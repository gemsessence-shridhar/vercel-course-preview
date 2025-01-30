import classNames from 'classnames';
import TimeLine from '@components/time_line';
import Page from '@components/PagePreview/Page';
import pagePreviewStyles from '@components/lesson/lesson-page.module.scss';
import { sampleItems } from '@components/PagePreview/utils';
import { fetchPageData } from './fetchPageData';

export default async function PagePreview({ params }) {
  const { locale, l1CmsId } = await params;
  const pagesDataHash = await fetchPageData(locale, l1CmsId);

  return (
    <div className={classNames(pagePreviewStyles['lesson-container'], 'pb-5')}>
      {Object.values(pagesDataHash).map((page, index, array) => (
        <div key={page.page_cms_id} className="mb-10">
          <h4 className="text-lg font-bold text-gray-700 d-flex flex-wrap justify-content-between my-4">
            <div>Display Title: {page.display_title}</div>
            <div>CMS ID: {page.page_cms_id}</div>
          </h4>

          <TimeLine
            items={sampleItems}
            currentItem={sampleItems[0]}
            nextItemTitle="Next title"
          >
            <Page
              pageData={page.page_data.page}
              nextPageUrl={''}
              previousPageUrl={''}
            />
          </TimeLine>

          {index < array.length - 1 && (
						<hr 
							className="border-2 border-dark"
							style={{ margin: '6rem 0', borderStyle: 'dashed' }}
						/>
					)}
        </div>
      ))}
    </div>
  );
}

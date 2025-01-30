import { getPageData } from '@components/PagePreview/utils/dataFetch';
import PagePreview from '@components/PagePreview/PagePreview';

export default async function PagePreviewWrapper({ params }) {
  const { locale, pageCmsId } = await params;
  const pageData = await getPageData(locale, pageCmsId);

  return (
    <PagePreview 
      pageData={pageData.page}
      nextPageUrl={''}
      previousPageUrl={''}
    />
  );
}

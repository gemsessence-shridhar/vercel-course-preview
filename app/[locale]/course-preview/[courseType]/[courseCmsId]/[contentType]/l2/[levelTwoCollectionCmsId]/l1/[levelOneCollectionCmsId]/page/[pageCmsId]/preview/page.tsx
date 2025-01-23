import classNames from 'classnames';
import { isEmpty, uniq } from 'lodash';
import TimeLine from '@components/time_line';

import pagePreviewStyles from '@components/lesson/lesson-page.module.scss';
import { pagePreview } from '@graphql/contentstack';;
import createApolloClient from "@//apollo_client";
import { getPageQueryData } from '@components/PagePreview/pagePreviewQuery';
import { getPageFormattedData } from '@components/PagePreview/pageCmsDataFormatter';
import Page from '@components/PagePreview/Page';


interface Component {
  __typename: string;
  card_reference?: {
    cardConnection?: {
      edges: { node: { system: { uid: string } } }[];
    };
  };
}
interface SampleItem {
  id: string;
  title: string;
  status: 'completed' | 'inProgress' | 'open';
  position: number;
  __typename: string;
}

const sampleItems: SampleItem[] = [
  {
    id: '1',
    title: 'LevelOneCollection-101',
    status: 'completed',
    position: 1,
    __typename: 'LevelOneCollection',
  },
  {
    id: '2',
    title: 'LevelOneCollection-202',
    status: 'inProgress',
    position: 2,
    __typename: 'LevelOneCollection',
  },
  {
    id: '3',
    title: 'LevelOneCollection-303',
    status: 'open',
    position: 3,
    __typename: 'LevelOneCollection',
  },
  {
    id: '4',
    title: 'LevelOneCollection-404',
    status: 'open',
    position: 4,
    __typename: 'LevelOneCollection',
  },
  {
    id: '5',
    title: 'LevelOneCollection-505',
    status: 'open',
    position: 5,
    __typename: 'LevelOneCollection',
  },
];

const getCardReferences = (components: Component[]): Component[] =>
  components.filter((c) => c.__typename === 'PageComponentsComponentsCardReference' && !isEmpty(c.card_reference));

const getUids = (nodes: { system: { uid: string } }[]): string[] =>
  nodes.map(({ system }) => system.uid);


const mergeTwoArrays = (
  data: any,
  oldComponents: any[],
  type: 'main_content' | 'secondary_content' | 'connective_tissue'
): any[] => {
  if (!isEmpty(data)) {
    switch (type) {
      case 'main_content':
        return oldComponents.concat(data.pagev4.main_content.components);
      case 'secondary_content':
        return oldComponents.concat(data.pagev4.secondary_content.components);
      case 'connective_tissue':
        return oldComponents.concat(data.connective_tissue.connective_tissue.components);
      default:
        console.log('type not matched');
    }
  }
  return oldComponents;
};

const getUidOfCardReferenceFrom = (mainContentData, secondaryContentData, otherMainContentData, otherSecondaryContentData, bottomConnectiveTissueData, topConnectiveTissueData) => {
  let componentsData = mergeTwoArrays(mainContentData, [], 'main_content');
  componentsData = mergeTwoArrays(secondaryContentData, componentsData, 'secondary_content');
  componentsData = mergeTwoArrays(otherMainContentData, componentsData, 'main_content');
  componentsData = mergeTwoArrays(otherSecondaryContentData, componentsData, 'secondary_content');
  componentsData = mergeTwoArrays(bottomConnectiveTissueData, componentsData, 'connective_tissue');
  componentsData = mergeTwoArrays(topConnectiveTissueData, componentsData, 'connective_tissue');
  componentsData = getCardReferences(componentsData);

  const cardConnections = componentsData.map(({ card_reference }) => card_reference.cardConnection);
  const cardEdges = cardConnections.map(({ edges }) => edges).flat();
  const cardNodes = cardEdges.map(({ node }) => node);
  return uniq(getUids(cardNodes));
};

export const getPageData = (async (locale, pageCmsId) => {

  const client = createApolloClient();
	let formattedData = {};

  const {
    mainContentData,
    mainContentResCardData,
    secondaryContentData,
    otherMainContentData,
    otherSecondaryContentData,
    pageConnectiveTissueBasicInfoData,
    topConnectiveTissueData,
    bottomConnectiveTissueData,
    secondaryContentVideoData,
    secondaryContentImageData,
    mainContentImageData,
    mainContentVideoData,
    otherSecondaryContentVideoData,
    otherSecondaryContentImageData,
    otherMainContentImageData,
    otherMainContentVideoData,

    cardVideoAssociatedContentData,
    otherCardVideoAssociatedContentData,
    cardImageAssociatedContentData,
    otherCardImageAssociatedContentData,

    videoAssociatedContentData,
    otherVideoAssociatedContentData,
    imageAssociatedContentData,
    otherImageAssociatedContentData,
  } = await getPageQueryData(pageCmsId, locale, client);


  if (
    mainContentData
    && mainContentResCardData
    && secondaryContentData
    && otherMainContentData
    && otherSecondaryContentData
    && pageConnectiveTissueBasicInfoData
    && mainContentVideoData
    && otherMainContentVideoData
  ) {


    let mainContentResData = Object.assign({}, mainContentData)
    const components = mainContentData.pagev4.main_content.components;
    const mainContentDataComponents = components.map((component, index) => {
      if(component.__typename === 'PageComponentsComponentsCardReference' && isEmpty(component.card_reference)){
        return(mainContentResCardData.pagev4.main_content.components[index])
      }else{
        return(component)
      }
    })

    let {main_content} = mainContentResData.pagev4;
    main_content = {...main_content, ...{components: mainContentDataComponents}}
    const pagev4 = {...mainContentResData.pagev4, ...{main_content: main_content}}
    mainContentResData = {pagev4: pagev4}

    const uids = getUidOfCardReferenceFrom(mainContentResData, secondaryContentData, otherMainContentData, otherSecondaryContentData, bottomConnectiveTissueData, topConnectiveTissueData);

    
		const cardData = await client.query({
			query: pagePreview.queries.GET_CARD_DETAILS,
			variables: { cardCmsIds: uids, locale }, fetchPolicy: 'no-cache' },
		);
		
    if (cardData) {
      formattedData = getPageFormattedData(mainContentResData, secondaryContentData, otherMainContentData, otherSecondaryContentData, pageConnectiveTissueBasicInfoData, bottomConnectiveTissueData, topConnectiveTissueData, mainContentImageData, secondaryContentImageData, secondaryContentVideoData, mainContentVideoData, otherMainContentImageData, otherSecondaryContentImageData, otherSecondaryContentVideoData, otherMainContentVideoData, cardData.data.all_card.items, cardVideoAssociatedContentData, otherCardVideoAssociatedContentData, cardImageAssociatedContentData, otherCardImageAssociatedContentData, videoAssociatedContentData, otherVideoAssociatedContentData, imageAssociatedContentData, otherImageAssociatedContentData);
    }
		return formattedData;
  }
})

export default async function PagePreview({ params }: { params: any }) {
	const urlParams = await params;
	const { locale, pageCmsId } = urlParams;
	
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
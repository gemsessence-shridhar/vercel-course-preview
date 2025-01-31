import { isEmpty, uniq } from 'lodash';

const getCardReferences = (components) =>
  components.filter((c) => c.__typename === 'PageComponentsComponentsCardReference' && !isEmpty(c.card_reference));

const getUids = (nodes) =>
  nodes.map(({ system }) => system.uid);

const mergeTwoArrays = (
  data,
  oldComponents,
  type
) => {
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

export const getUidOfCardReferenceFrom = (
  mainContentData,
  secondaryContentData,
  otherMainContentData,
  otherSecondaryContentData,
  bottomConnectiveTissueData,
  topConnectiveTissueData
) => {
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

export const getMainContentDataComponents = (components, mainContentResCardData) => {
	return components.map((component, index) => {
		if (component.__typename === 'PageComponentsComponentsCardReference' && isEmpty(component.card_reference)) {
		return mainContentResCardData.pagev4.main_content.components[index];
		} else {
		return component;
		}
	});
};

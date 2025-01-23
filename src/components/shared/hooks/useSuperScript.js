import { useEffect } from 'react';
import { isEmpty } from 'lodash';

const useSuperScript = () => {
  const specialCharsRegex = /[™®©]/g;

  const textNodesUnder = (element) => {
    let textNextNode; const textNodes = []; const
      walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    while (textNextNode = walk.nextNode()) textNodes.push(textNextNode);
    return textNodes;
  };

  const updateSupNodeHtml = (node) => {
    if (node.parentElement && node.parentElement.classList.contains('e42d5f6019')) return;
    if (isEmpty(node.nodeValue.match(specialCharsRegex))) return;

    if (node.parentNode) {
      node.parentNode.innerHTML = node.parentNode.innerHTML.replace(specialCharsRegex, '<sup class="e42d5f6019">$&</sup>');
    }
  };

  useEffect(() => {
    const allTextNodes = textNodesUnder(document.body);

    allTextNodes.forEach((node) => {
      updateSupNodeHtml(node);
    });
  });
};

export default useSuperScript;

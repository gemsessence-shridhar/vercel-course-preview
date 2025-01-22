import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.module.scss';
import TimeLineItem from './time_line_item';

const TimeLine = ({
  items, currentItem, nextItemTitle, children,
}) => {
  const isCurrentItem = (item) => (
    item.id === currentItem.id && item.__typename === currentItem.__typename
  );

  let updatedItems = [...items];
  if (isCurrentItem(items[0])) {
    const [initialItem] = items;
    updatedItems = [
      {
        ...initialItem,
        status: initialItem.status === 'completed' ? 'completed' : 'inProgress',
      },
      ...items.slice(1, items.length),
    ];
  }

  return (
    <>
      <div className={classnames(style['timeline-container'], 'pb-4')}>
        <div className="position-relative">
          <div className={classnames(style['timeline-item-wrapper'], 'd-flex justify-content-between position-relative')}>
            {
              updatedItems.map((item) => (
                <TimeLineItem
                  key={item.id}
                  item={item}
                  isCurrentItem={isCurrentItem(item)}
                />
              ))
            }
          </div>

          <div data-testid="next-topic-title" className={classnames(style['next-topic-txt'], 'd-flex justify-content-end mt-4')}>
            {!isCurrentItem(items[items.length - 1]) ? nextItemTitle : null}
          </div>
        </div>
      </div>
      {children ? React.cloneElement(children, { itemId: currentItem.id }) : null}
    </>
  );
};

TimeLine.defaultProps = {
  children: null,
};

TimeLine.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  nextItemTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  children: PropTypes.node,
  currentItem: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      position: PropTypes.number,
      status: PropTypes.string,
      title: PropTypes.string,
    }),
    PropTypes.bool,
  ]).isRequired,
};

TimeLine.defaultProps = {
  nextItemTitle: '',
};

export default TimeLine;

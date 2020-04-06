import React from 'react';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

export const PreferencesSingleItem = (props) => {
  const { id, category, subcategories, categoryColor } = props;
  return (
    <>
      <h4 className={'chat-item-header'} style={{color: categoryColor}}>{category}</h4>
      <div className={'chat-all-topics'}>
        {subcategories.map(name => {
          const subcategoryId = `pref+${id+name}`
          return (
              <React.Fragment key={id+name}>
                <input
                  type="checkbox"
                  className={'chat-topic-checkbox'}
                  id={subcategoryId}
                  name={subcategoryId}
                  value={name}
                />
                <label
                  className={'chat-topic-label'}
                  htmlFor={subcategoryId}
                >
                  {name}
                </label>
              </React.Fragment>
            )
        }
        )}
      </div>
    </>
  )
}

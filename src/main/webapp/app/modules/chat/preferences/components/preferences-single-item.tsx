import React from 'react';

export const PreferencesSingleItem = (props) => {
  const { id, category, subcategories } = props;
  return (
    <>
      <h6 className={'chat-item-header'}>{category}</h6>
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

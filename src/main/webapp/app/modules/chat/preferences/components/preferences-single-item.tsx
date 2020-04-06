import React from 'react';

export const PreferencesSingleItem = (props) => {
  const { nonexisting } = props;
  return (
    <>
      <h6 className={'chat-item-header'}>Sports</h6>
      <div className={'chat-all-topics'}>
        <input type="checkbox" className={'chat-topic-checkbox'} id="vehicle1" name="vehicle1" value="Soccer" />
        <label className={'chat-topic-label'} htmlFor="vehicle1"> Hardcoded</label>
      </div>
    </>
  )
}

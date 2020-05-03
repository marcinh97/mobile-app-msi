import React from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvCheckboxGroup, AvCheckbox} from 'availity-reactstrap-validation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const PreferencesSingleItem = (props) => {
  const { id, category, subcategories, categoryColor, icon } = props;
  return (
    <div className={'pref-single-item'}>
      <AvCheckboxGroup
        className={'chat-all-topics'}
        name={`checkbox-preferences-${category}`}
        label={<span><FontAwesomeIcon icon={icon} style={{marginRight: '5px'}} fixedWidth />{category}</span>}
      >
        {subcategories.map(name => <AvCheckbox key={id+name} label={name} value={name} />)}
      </AvCheckboxGroup>
    </div>
  )
}

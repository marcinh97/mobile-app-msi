import React from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvCheckboxGroup, AvCheckbox} from 'availity-reactstrap-validation';

export const PreferencesSingleItem = (props) => {
  const { id, category, subcategories, categoryColor } = props;
  return (
      <AvCheckboxGroup className={'chat-all-topics'} name={`checkbox-preferences-${category}`} label={category} >
        {subcategories.map(name => <AvCheckbox key={id+name} label={name} value={name} />)}
      </AvCheckboxGroup>
  )
}

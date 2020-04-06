import React, {useEffect, useState} from 'react';
import PreferencesModal from "./preferences-modal"

const PreferencesPage = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    props.history.push('/');
  };
  return (
    <div>
      <PreferencesModal showModal={true} handleClose={handleClose}/>
    </div>
  )
}

export default PreferencesPage;

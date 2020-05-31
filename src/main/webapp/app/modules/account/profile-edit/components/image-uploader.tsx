import React, { Component } from 'react';
import { CustomInput, FormGroup, Button } from 'reactstrap';
import ImageUploading from "react-images-uploading/dist";
import axios from 'axios';
import {addImage} from "app/modules/chat/chat.reducer";
import {connect} from "react-redux";
import {IChatPreferencesModalProps} from "app/modules/account/profile-edit/profile-edit-modal";
import {ArrayOfStringValues} from "webpack/declarations/WebpackOptions";


const onChange = imageList => {
  // data for submit
  const CLOUDINARY_UPLOAD_PRESET = "hkyzllo0";
  console.log(imageList);
  const form = new FormData();
  form.append('file', imageList[0].file);
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  addImage(imageList[0].dataUrl)
};

export interface IImageUploader {
  addImage: any;
}

class ImageUploader extends React.Component<IImageUploader> {
  render() {
    // const { fileName, invalidFile } = this.state;
    return (
      <ImageUploading multiple onChange={(imageList) => {console.log(imageList[0]); this.props.addImage(imageList[0].dataURL)}} maxNumber={10}>
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Button color="primary" onClick={onImageUpload}>Upload images</Button>&nbsp;
            {/*<Button color="secondary" onClick={onImageRemoveAll}>Remove all images</Button>*/}
            {/*{imageList.map(image => (*/}
              {/*<div key={image.key} className="image-item">*/}
                {/*<img src={image.dataURL} alt="" width="100" />*/}
                {/*<div className="image-item__btn-wrapper">*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*))}*/}
          </div>
        )}
      </ImageUploading>
    );
  }
}
const mapStateToProps = storeState => ({
  yourImages: storeState.chat.yourImages
});


const mapDispatchToProps = {addImage};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);



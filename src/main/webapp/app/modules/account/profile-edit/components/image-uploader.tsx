import React, { Component } from 'react';
import { CustomInput, FormGroup, Button } from 'reactstrap';
import ImageUploading from "react-images-uploading/dist";
import axios from 'axios';
import {IChatPreferencesModalProps} from "app/modules/account/profile-edit/profile-edit-modal";
import {ArrayOfStringValues} from "webpack/declarations/WebpackOptions";
import {IUser} from "app/shared/model/user.model";
import {getUserImages, uploadImage} from "app/modules/administration/user-management/user-management.reducer";
import {connect} from "react-redux";


const onChange = (imageList, account) => {
  // data for submit
  const CLOUDINARY_URL = "https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/dwlxoosyr/upload";
  const CLOUDINARY_UPLOAD_PRESET = "hkyzllo0";
  console.log(imageList);
  const form = new FormData();
  form.append('file', imageList[0].file);
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  axios({
    url: CLOUDINARY_URL,
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: form
  }).then(function (res) {
    const url = res.data.url;
    // document.getElementById("photo-icon").style.backgroundImage = "url('"+url+"')"
    console.log(url);
    console.log(account.login)
    // const username = account.login
    // const imageUrl = url
    const data = {
      username: account.login,
      imageUrl: url
    }
    const form2 = new FormData();
    form2.append('username', data.username)
    form2.append('imageUrl', url)
    axios.post('/api/userImgs', {
      "username": data.username,
      "imageUrl": data.imageUrl
    })
      .then(res2 => {
          console.log(res2.data)
        const imageUrl = res2.data.imageUrl
        const user:IUser = res2.data.user
        console.log(imageUrl)
        console.log(user.login)
        }
      )
  });
};
export interface IImageUploader {
  account: IUser;
  uploadImage: any
}

class ImageUploader extends Component<IImageUploader> {
  render() {
    const { account } = this.props;
    // const { fileName, invalidFile } = this.state;
    return (
      <ImageUploading multiple onChange={(imgList) => this.props.uploadImage(imgList, account)} maxNumber={10}>
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Button color="primary" onClick={onImageUpload}
                    style={{width: '100%', borderRadius: '5px'}}
            >Upload image</Button>&nbsp;
            {/*<Button color="secondary" onClick={onImageRemoveAll}>Remove all images</Button>*/}
            {imageList.map(image => (
              <div key={image.key} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  {/*<button*/}
                    {/*onClick={() => {*/}
                      {/*image.onUpdate();*/}
                    {/*}}*/}
                  {/*>*/}
                    {/*Update*/}
                  {/*</button>*/}
                  {/*<button onClick={image.onRemove}>Remove</button>*/}
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    );
  }
}

const mapStateToProps = storeState => ({
});


const mapDispatchToProps = {uploadImage};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);


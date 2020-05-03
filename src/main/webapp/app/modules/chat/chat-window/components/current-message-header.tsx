import React, {EventHandler} from "react"
import {IChatContact} from "app/shared/model/chat.model";
import {ContactThumbnail} from "app/modules/chat/chat-window/components/sidebar";
import {IRootState} from "app/shared/reducers";
import {handleInputChange} from "app/modules/chat/chatTyping.reducer";
import {handleSendingMessage, resetLoadingAct} from "app/modules/chat/chat.reducer";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface IMessageHeader {
  name: string,
  profileUrl: string,
  interests: ReadonlyArray<string>,
  resetLoadingAct: EventHandler<any>
}

const CurrentMessageHeader = (props: IMessageHeader) => {
  const { name, profileUrl, interests } = props
  return (
    <div className="current-message-header">
      <ContactThumbnail urlAddress={profileUrl}/>
      <div className="current-speaker-info">
        <FontAwesomeIcon onClick={props.resetLoadingAct} className="exit-conversation-icon" icon="times" fixedWidth />
        <div className="header-name" style={{color: "white"}}>{name}</div>
        <div className="header-interests">
          {interests.map((interest, i) => <span key={"interest-"+i} style={{color: "white"}} className="current-speaker-interests">interest  </span>)}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
});

const mapDispatchToProps = {resetLoadingAct};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMessageHeader);


import React, {EventHandler} from "react"
import {IChatContact} from "app/shared/model/chat.model";
import {ContactThumbnail} from "app/modules/chat/chat-window/components/sidebar";
import {IRootState} from "app/shared/reducers";
import {handleInputChange} from "app/modules/chat/chatTyping.reducer";
import {handleSendingMessage, resetLoadingAct} from "app/modules/chat/chat.reducer";
import {connect} from "react-redux";

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
        <h6 style={{padding: "10px", color: "white"}}>{name}</h6>
        {interests.map((interest, i) => <span key={"interest-"+i} style={{color: "white"}} className="current-speaker-interests">interest  </span>)}
      </div>
      <button className="stop-conversation"
              onClick={props.resetLoadingAct}
      >STOP</button>
    </div>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
});

const mapDispatchToProps = {resetLoadingAct};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMessageHeader);


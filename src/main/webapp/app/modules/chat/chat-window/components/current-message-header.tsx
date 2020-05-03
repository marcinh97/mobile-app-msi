import React, {EventHandler} from "react"
import {ContactThumbnail} from "app/modules/chat/chat-window/components/sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface IMessageHeader {
  name: string,
  profileUrl: string,
  interests: ReadonlyArray<string>,
  resetLoadingAct: EventHandler<any>
}

export const CurrentMessageHeader = (props: IMessageHeader) => {
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
};

import React from "react";
import '../chat-styles.scss'
import {ContactThumbnail} from "app/modules/chat/chat-window/components/sidebar";

export interface IEmptyConversationTemplate {
  name: string,
  profileUrl: string,
  interests: ReadonlyArray<string>
}

export const Empty = (props: IEmptyConversationTemplate) => {
  const { name, profileUrl, interests } = props
  return (
    <div className="empty-conversation">
      <ContactThumbnail
        urlAddress={profileUrl}
      />
      <h6>{name}</h6>
      <div className="mutual-interests">
        {interests.map(intr => <span>{intr} </span>)}
      </div>
      <h4 className="empty-conversation-prompt">Don't be so shy - say hello!</h4>
    </div>
  )
};

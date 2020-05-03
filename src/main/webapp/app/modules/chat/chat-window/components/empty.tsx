import React from "react";
import '../chat-styles.scss'
import {ContactThumbnail} from "app/modules/chat/chat-window/components/sidebar";

export const Empty = () => {
  return (
    <div className="empty-conversation">
      <ContactThumbnail name="Anna Kowal"
                        urlAddress="https://www.dw.com/image/53138967_303.jpg"
                        currentlyChosen={false}/>
      <h6>Anna Kowalczyk</h6>
      <div className="mutual-interests">
        Football, volleyball
      </div>
      <h4 className="empty-conversation-prompt">Don't be so shy - say hello!</h4>
    </div>
  )
};

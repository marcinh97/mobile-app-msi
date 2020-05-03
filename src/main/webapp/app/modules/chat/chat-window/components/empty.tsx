import React from "react";
import '../chat-styles.scss'
import {ContactThumbnail} from "app/modules/chat/chat-window/components/sidebar";

export const Empty = props => {
  return (
    <div className="empty-conversation">
      <p className="empty-header">Don't be so shy! Talk to your partner!</p>
      <ContactThumbnail name="Anna Kowal"
                        urlAddress="https://www.dw.com/image/53138967_303.jpg"
                        currentlyChosen={false}/>
      <h6>Anna Kowalczyk</h6>
      <div className="mutual-interests">
        Football, volleyball
      </div>
    </div>
  )
}

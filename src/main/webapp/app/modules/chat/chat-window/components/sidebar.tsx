import React from "react";
import {IChatContact} from "app/shared/model/chat.model";

export const ContactThumbnail = ({name="", urlAddress, currentlyChosen=false}) =>
    <div
      className={`chat-contact-profile ${currentlyChosen ? "" : "chat-contact-other"}`}
      style={{backgroundImage: `url(${urlAddress})`}}
    />;

export interface ISidebarProps {
  contacts: ReadonlyArray<IChatContact>
}

export const Sidebar = (props: ISidebarProps) => {
  const {contacts} = props;

  return (
    <div className="chat-sidebar">
      {contacts.map((c, index) =>
          <ContactThumbnail
            name={c.name}
            urlAddress={c.profileImage}
            currentlyChosen={index === 0}
          />
      )}
    </div>
  )
};

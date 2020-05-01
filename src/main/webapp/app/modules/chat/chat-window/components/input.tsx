import React, {EventHandler} from "react";

export interface IInput {
  handleSendingMessage: EventHandler<any>;
  handleChange: EventHandler<any>;
  value: string;
}
export const Input = (props : IInput) => {
  const { handleSendingMessage, handleChange, value } = props
  return (
    <form className="Message" onSubmit={handleSendingMessage}>
      <input
        className="Message__input"
        onChange={handleChange}
        value={value}
        placeholder="write a message"
      />
    </form>
  )
}

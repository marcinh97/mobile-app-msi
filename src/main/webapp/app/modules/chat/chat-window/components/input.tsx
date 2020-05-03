import React, {EventHandler} from "react";

export interface IInput {
  handleSendingMessage: EventHandler<any>;
  handleInputChange: EventHandler<any>;
  value: string;
}

export const Input = (props : IInput) => {
  const {handleSendingMessage, handleInputChange, value} = props
  return (
    <form className="Message" onSubmit={() => handleSendingMessage(value)}>
      <input
        className="Message__input"
        onChange={handleInputChange}
        value={value}
        placeholder="write a message"
      />
    </form>
  )
};

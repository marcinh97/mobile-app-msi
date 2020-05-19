import React, {EventHandler} from "react";

export interface IInput {
  handleSendingMessage: EventHandler<any>;
  handleInputChange: EventHandler<any>;
  value: string;
  disabled: boolean;
}

export const Input = (props : IInput) => {
  const {handleSendingMessage, handleInputChange, value, disabled} = props
  return (
    <div className="Message__input__box">
      <form className="Message" onSubmit={() => handleSendingMessage(value)}>
        <input
          className="Message__input"
          onChange={handleInputChange}
          value={value}
          disabled={disabled}
          placeholder="write a message"
        />
      </form>
    </div>
  )
};

import React, {EventHandler} from "react"
import {IRootState} from "app/shared/reducers";
import {resetLoadingAct} from "app/modules/chat/chat.reducer";
import {connect} from "react-redux";
import {CurrentMessageHeader} from "app/modules/chat/chat-window/components/current-message-header";

export interface IMessageHeader {
  name: string,
  profileUrl: string,
  interests: ReadonlyArray<string>,
  resetLoadingAct: EventHandler<any>
}

const CurrentMessageHeaderContainer = (props: IMessageHeader) => {
  const { name, profileUrl, interests } = props
  return (
    <CurrentMessageHeader
      interests={interests}
      name={name}
      profileUrl={profileUrl}
      resetLoadingAct={props.resetLoadingAct}
    />
  )
};

const mapStateToProps = (storeState: IRootState) => ({
});

const mapDispatchToProps = {resetLoadingAct};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMessageHeaderContainer);


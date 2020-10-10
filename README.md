
## Suprim Ui Messenger Chat

<br/>

## Prerequisite
Whitelist your domain to connect your Facebook Page to your website via the Facebook tool.
 - From UI: Facebook Page Settings > Messenger Platform > Whitelisted Domains
 - From API: Use HTTP API or API client likes messaging-api-messenger

<br/>

## Installation
 
> npm i suprim-ui-messenger-chat or yarn add suprim-ui-messenger-chat


<br/>

## Usage

```
import React from "react";
import {SuprimUiMessengerChat} from "./components";

const App = () => {
  return (
    <>
      <SuprimUiMessengerChat pageId="ADD PAGE ID"></SuprimUiMessengerChat>
    </>
  );
};

export default App;
```


<br/>

## Props
```
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    shouldShowDialog: PropTypes.bool,
    htmlRef: PropTypes.string,
    minimized: PropTypes.bool,
    themeColor: PropTypes.string,
    loggedInGreeting: PropTypes.string,
    loggedOutGreeting: PropTypes.string,
    greetingDialogDisplay: PropTypes.oneOf(["show", "hide", "fade"]),
    greetingDialogDelay: PropTypes.number,
    autoLogAppEvents: PropTypes.bool,
    xfbml: PropTypes.bool,
    version: PropTypes.string,
    language:PropTypes.string,
    onCustomerChatDialogShow: PropTypes.func,
    onCustomerChatDialogHide: PropTypes.func,
  };

  static defaultProps = {
    shouldShowDialog: false,
    htmlRef: undefined,
    minimized: undefined,
    themeColor: undefined,
    loggedInGreeting: undefined,
    loggedOutGreeting: undefined,
    greetingDialogDisplay: undefined,
    greetingDialogDelay: undefined,
    autoLogAppEvents: true,
    xfbml: true,
    version: "4.0",
    onCustomerChatDialogShow: undefined,
    onCustomerChatDialogHide: undefined,
  };
```
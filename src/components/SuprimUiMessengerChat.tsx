import React, { Component } from "react";

/**
 * Utils
 */
const removeElementByIds = (ids:any) => {
  ids.forEach((id:any) => {
    const element = document.getElementById(id);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
};

interface MessengerProps{
  pageId: string
  shouldShowDialog?: boolean
  htmlRef?: string
  minimized?: boolean
  themeColor?: string
  loggedInGreeting?: string
  loggedOutGreeting?: string
  greetingDialogDisplay?: "show"| "hide"|"fade"
  greetingDialogDelay?: number
  autoLogAppEvents?: boolean
  xfbml?: boolean
  version?: string
  onCustomerChatDialogShow?: any
  onCustomerChatDialogHide?: any
  setFbAsyncInit?: any
  reloadSDKAsynchronously?: any
  loadSDKAsynchronously?: any
}

interface MessengerStateProps{
  fbLoaded?: any
  shouldShowDialog?: boolean
  controlPlugin?: any
  setFbAsyncInit?: any
}



declare global {
  interface Window {
      FB:any;
      fbAsyncInit:any
    }
}


class SuprimUiMessengerChat extends Component<MessengerProps,MessengerStateProps> {
  static defaultProps:any  = {
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
  constructor(props:any) {
    super(props);
    this.setFbAsyncInit = this.setFbAsyncInit.bind(this) as any;
    this.reloadSDKAsynchronously = this.reloadSDKAsynchronously.bind(this);
    this.loadSDKAsynchronously = this.loadSDKAsynchronously.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.controlPlugin = this.controlPlugin.bind(this);
    this.subscribeEvents = this.subscribeEvents.bind(this);
    this.removeFacebookSDK = this.removeFacebookSDK.bind(this);

    this.state = {
      fbLoaded: false,
      shouldShowDialog: undefined,
    };
  }
  setFbAsyncInit() {
    const { autoLogAppEvents, xfbml, version } = this.props;

    window.fbAsyncInit = () => {
      window.FB.init({
        // appId,
        autoLogAppEvents,
        xfbml,
        version: `v${version}`,
      });

      this.setState({ fbLoaded: true });
    };
  }
  loadSDKAsynchronously() {
    // const { language } = this.props
    /* eslint-disable */
    (function (d, s, id) {
      var js:any,
        fjs:any = d.getElementsByTagName(s)[0] ;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) ;
      js.id = id;
      js.src = `https://connect.facebook.net/en_GB/sdk/xfbml.customerchat.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    /* eslint-enable */
  }

  removeFacebookSDK() {
    removeElementByIds(["facebook-jssdk", "fb-root"]);
    delete window.FB;
  }

  reloadSDKAsynchronously() {
    this.removeFacebookSDK();
    this.loadSDKAsynchronously();
  }

  controlPlugin() {
    const { shouldShowDialog } = this.props;

    if (shouldShowDialog) {
      window.FB.CustomerChat.showDialog();
    } else {
      window.FB.CustomerChat.hideDialog();
    }
  }
  subscribeEvents() {
    const { onCustomerChatDialogShow, onCustomerChatDialogHide } = this.props;

    if (onCustomerChatDialogShow) {
      window.FB.Event.subscribe(
        "customerchat.dialogShow",
        onCustomerChatDialogShow
      );
    }

    if (onCustomerChatDialogHide) {
      window.FB.Event.subscribe(
        "customerchat.dialogHide",
        onCustomerChatDialogHide
      );
    }
  }
  createMarkup() {
    const {
      pageId,
      htmlRef,
      minimized,
      themeColor,
      loggedInGreeting,
      loggedOutGreeting,
      greetingDialogDisplay,
      greetingDialogDelay,
    } = this.props;

    const refAttribute = htmlRef !== undefined ? `ref="${htmlRef}"` : "";

    const minimizedAttribute =
      minimized !== undefined ? `minimized="${minimized}"` : "";

    const themeColorAttribute =
      themeColor !== undefined ? `theme_color="${themeColor}"` : "";

    const loggedInGreetingAttribute =
      loggedInGreeting !== undefined
        ? `logged_in_greeting="${loggedInGreeting}"`
        : "";

    const loggedOutGreetingAttribute =
      loggedOutGreeting !== undefined
        ? `logged_out_greeting="${loggedOutGreeting}"`
        : "";

    const greetingDialogDisplayAttribute =
      greetingDialogDisplay !== undefined
        ? `greeting_dialog_display="${greetingDialogDisplay}"`
        : "";

    const greetingDialogDelayAttribute =
      greetingDialogDelay !== undefined
        ? `greeting_dialog_delay="${greetingDialogDelay}"`
        : "";

    return {
      __html: `<div
             class="fb-customerchat"
             page_id="${pageId}"
             ${refAttribute}
             ${minimizedAttribute}
             ${themeColorAttribute}
             ${loggedInGreetingAttribute}
             ${loggedOutGreetingAttribute}
             ${greetingDialogDisplayAttribute}
             ${greetingDialogDelayAttribute}
           ></div>`,
    };
  }

  render() {
    const { fbLoaded, shouldShowDialog }= this.state;

    if (fbLoaded && shouldShowDialog !== this.props.shouldShowDialog) {
      document.addEventListener(
        "DOMNodeInserted",
        (event) => {
          const element:any = event.target;
          if (
            element.className &&
            typeof element.className === "string" &&
            element.className.includes("fb_dialog")
          ) {
            this.controlPlugin();
          }
        },
        false
      );
      this.subscribeEvents();
    }
    // Add a random key to rerender. Reference:
    // https://stackoverflow.com/questions/30242530/dangerouslysetinnerhtml-doesnt-update-during-render
    return <div key={Date()} dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}

export default SuprimUiMessengerChat;
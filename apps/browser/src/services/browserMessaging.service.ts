import { MessagingService } from "@bitwarden/common/abstractions/messaging.service";

import { BrowserApi } from "../platform/browser/browser-api";

export default class BrowserMessagingService implements MessagingService {
  send(subscriber: string, arg: any = {}) {
    return BrowserApi.sendMessage(subscriber, arg);
  }
}

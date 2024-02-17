import { Controller } from '@nestjs/common'
import { appStorage } from '../storage'

@Controller()
export abstract class BaseController {
  get getRequest() {
    return appStorage?.getStore()?.request
  }
  get scopeVariable() {
    return this.getRequest?.scopeVariable
  }
  get currentSession() {
    return this.scopeVariable?.session
  }
}

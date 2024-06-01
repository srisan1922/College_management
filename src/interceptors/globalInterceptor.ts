import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

@Interceptor()
export class GlobalInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    return {
      success: true,
      data: content,
    };
  }
}

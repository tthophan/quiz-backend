import { BinaryLike, createHmac } from 'crypto'
import {
  concatMap,
  defer,
  delay,
  from,
  lastValueFrom,
  of,
  retryWhen,
  throwError,
} from 'rxjs'

export const CommonHelpers = {
  sha256(data: BinaryLike, secret: string): string {
    return createHmac('sha256', secret).update(data).digest('hex')
  },
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },
  convertPhoneNumber(phoneNumber: string, region: 'VN' = 'VN'): string {
    if (!phoneNumber) return ''
    const regex = /^\+84(\d{9,10})$/ // Regex pattern for +84 followed by 9 or 10 digits
    const match = phoneNumber.match(regex)
    if (match) {
      const localNumber = '0' + match[1] // Extract digits after +84 and prepend '0'
      return localNumber
    } else {
      return phoneNumber // Return the original number if it doesn't match the pattern
    }
  },
  /**
   *
   * @param action
   * @param maxRetries The maximum number of retries
   * @param delayBetweenRetries Delay between retries in milliseconds
   * @returns
   */
  callWithRetry<T>(
    action: Promise<T>,
    maxRetries = 3,
    delayBetweenRetries = 3000,
    errorCallback?: (error: unknown) => void,
    isExponentialRetry: boolean = false,
  ): Promise<T> {
    return lastValueFrom<T>(
      defer(() => from(action)).pipe(
        retryWhen(errors => {
          return errors.pipe(
            concatMap((error, count) => {
              console.log(`Retrying ${count + 1}`)
              if (count < maxRetries - 1) {
                const delayTimes = isExponentialRetry
                  ? delayBetweenRetries * Math.pow(2, count)
                  : delayBetweenRetries // Exponential delay
                return of(1).pipe(delay(delayTimes))
              }
              return throwError(() => error)
            }),
          )
        }),
      ),
    ).catch(error => {
      console.log(`callWithRetry Exception: ${JSON.stringify(error)}`)
      errorCallback && errorCallback(error)
      throw error
    })
  },
}

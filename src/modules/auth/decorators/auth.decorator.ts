import { SetMetadata } from '@nestjs/common';
import { LOCAL_AUTHORIZE_KEY } from '../constants';

/**
 *
 * @param isOptional
 * @returns
 */
export const Authorize = () => {
  return SetMetadata(LOCAL_AUTHORIZE_KEY, {});
};

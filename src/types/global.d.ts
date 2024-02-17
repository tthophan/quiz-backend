import { ScopeVariable } from 'src/common/models';

declare global {
  namespace Express {
    export interface Request {
      scopeVariable: ScopeVariable;
    }
  }
}

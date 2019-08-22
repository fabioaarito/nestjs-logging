import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class LoggerContext {
  // tslint:disable-next-line:variable-name
  private _context: Record<string, string | number> = {};

  /**
   * Add a new context info into the logger context
   * @param key - the context key
   * @param value - the context value
   */
  public add(key: string, value: string | number) {
    this._context[key] = value;
  }

  /**
   * Get context entries
   */
  public get context() {
    return this._context;
  }

  /**
   * Get the value of a specific key
   * @param key - the context key
   */
  public value(key: string): string | number {
    return this._context[key];
  }
}

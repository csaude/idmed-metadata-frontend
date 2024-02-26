import { Model } from 'pinia-orm';

export default class User extends Model {
  static entity = 'users';
  static primaryKey = 'id';
  static fields() {
    return {
      id: this.attr(null),
      username: this.attr(''),
      password: this.attr(''),
      role: this.attr(null),
      fullName: this.attr(''),
      access_token: this.attr(''),
      refresh_token: this.attr(''),
      firstNames: this.attr(''),
      lastNames: this.attr(''),
      accountLocked: this.attr(''),
      contact: this.attr(''),
      email: this.attr(''),
      roles: this.attr(null),
      syncStatus: this.attr(''),
      authorities: this.attr(null),
      menus: this.attr(null),
    };
  }

  static piniaOptions = {
    persist: true,
  };
}

import { Model } from 'pinia-orm';
import Clinic from '../clinic/Clinic';
import District from '../district/District';
import { v4 as uuidv4 } from 'uuid';

export default class Province extends Model {
  static entity = 'provinces';
  static primaryKey = 'id';
  static fields() {
    return {
      id: this.string(() => uuidv4()),
      description: this.attr(''),
      code: this.attr(''),
      country_id: this.attr(''),
      syncStatus: this.attr(''),
      // Relationships
      districts: this.hasMany(District, 'province_id'),
      clinics: this.hasMany(Clinic, 'province_id'),
    };
  }
  static piniaOptions = {
    persist: true,
  };
}

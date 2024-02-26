import { Model } from 'pinia-orm';
import District from '../district/District';
import Province from '../province/Province';
import FacilityType from '../facilityType/FacilityType';
import { v4 as uuidv4 } from 'uuid';

export default class Clinic extends Model {
  static entity = 'clinics';
  static primaryKey = 'id';
  static fields() {
    return {
      id: this.string(() => uuidv4()),
      code: this.attr(''),
      notes: this.attr(''),
      telephone: this.attr(''),
      clinicName: this.attr(''),
      mainClinic: this.boolean(false),
      uuid: this.attr(null),
      province_id: this.attr(''),
      district_id: this.attr(''),
      //  nationalClinic_id: this.attr(''),
      active: this.attr(''),
      facilityTypeId: this.attr(''),
      syncStatus: this.attr(''),
      // Relationships
      facilityType: this.belongsTo(FacilityType, 'facilityTypeId'),
      province: this.belongsTo(Province, 'province_id'),
      district: this.belongsTo(District, 'district_id'),
    };
  }

  static piniaOptions = {
    persist: true,
  };
}

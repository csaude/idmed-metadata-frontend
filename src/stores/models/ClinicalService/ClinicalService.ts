import { Model } from 'pinia-orm';
import ClinicalServiceAttribute from '../ClinicalServiceAttribute/ClinicalServiceAttribute';
import IdentifierType from '../identifierType/IdentifierType';
import { v4 as uuidv4 } from 'uuid';
import Drug from '../drug/Drug';
import TherapeuticRegimen from '../therapeuticRegimen/TherapeuticRegimen';
import ClinicalServiceAttributeType from '../ClinicalServiceAttributeType/ClinicalServiceAttributeType';

export default class ClinicalService extends Model {
  static entity = 'clinicalServices';
  static primaryKey = 'id';
  static fields() {
    return {
      id: this.string(() => uuidv4()),
      code: this.attr(''),
      description: this.attr(''),
      identifier_type_id: this.attr(''),
      active: this.attr(''),
      syncStatus: this.attr(''),
      identifierType: this.belongsTo(IdentifierType, 'identifier_type_id'),
      clinicalServiceAttributes: this.belongsToMany(
        ClinicalServiceAttributeType,
        ClinicalServiceAttribute,
        'clinical_service_id',
        'service_attr_type_id'
      ),
      therapeuticRegimens: this.hasMany(
        TherapeuticRegimen,
        'clinical_service_id'
      ),
      drugs: this.hasMany(Drug, 'clinical_service_id'),
    };
  }

  static piniaOptions = {
    persist: true,
  };
}

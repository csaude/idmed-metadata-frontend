import { Model } from 'pinia-orm';
import ClinicalService from '../ClinicalService/ClinicalService';
import Form from '../form/Form';
import TherapeuticRegimen from '../therapeuticRegimen/TherapeuticRegimen';
import TherapeuticRegimensDrug from '../TherapeuticRegimensDrug/TherapeuticRegimensDrug';
import { v4 as uuidv4 } from 'uuid';

export default class Drug extends Model {
  static entity = 'drugs';
  static primaryKey = 'id';
  static fields() {
    return {
      id: this.string(() => uuidv4()),
      name: this.attr(''),
      fnmCode: this.attr(''),
      // sideTreatment: this.attr(''),
      packSize: this.attr(''),
      // clinicalStage: this.attr(''),
      defaultTimes: this.attr(''),
      defaultTreatment: this.attr(''),
      defaultPeriodTreatment: this.attr(''),
      active: this.boolean(true),
      form_id: this.attr(''),
      clinical_service_id: this.attr(''),
      syncStatus: this.attr(''),
      // Relationships
      form: this.belongsTo(Form, 'form_id'),
      clinicalService: this.belongsTo(ClinicalService, 'clinical_service_id'),
      therapeuticRegimenList: this.belongsToMany(
        TherapeuticRegimen,
        TherapeuticRegimensDrug,
        'drug_id',
        'therapeutic_regimen_id'
      ),
    };
  }
  static piniaOptions = {
    persist: true,
  };
}

import { useRepo } from 'pinia-orm';
import ClinicalService from 'src/stores/models/ClinicalService/ClinicalService';
import api from '../apiService/apiService';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useLoading } from 'src/composables/shared/loading/loading';
import ClinicalServiceAttribute from 'src/stores/models/ClinicalServiceAttribute/ClinicalServiceAttribute';

const clinicalService = useRepo(ClinicalService);
const clinicalServiceAttribute = useRepo(ClinicalServiceAttribute);

const { closeLoading, showloading } = useLoading();
const { alertSucess, alertError } = useSwal();

export default {
  post(params: string) {
    return api()
      .post('clinicalService/', params)
      .then((resp) => {
        clinicalService.save(resp.data);
      });
  },
  get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('clinicalService?offset=' + offset + '&max=100')
        .then((resp) => {
          clinicalService.save(resp.data);
          offset = offset + 100;
          if (resp.data.length > 0) {
            this.get(offset);
          } else {
            closeLoading();
          }
        })
        .catch((error) => {
          // alertError('Aconteceu um erro inesperado nesta operação.');
          // console.log(error);
        });
    }
  },
  patch(uuid: string, params: string) {
    clinicalServiceAttribute.where('clinical_service_id', uuid).delete();
    return api()
      .patch('clinicalService/' + uuid, params)
      .then((resp) => {
        clinicalService.save(resp.data);
      });
  },
  delete(uuid: string) {
    return api()
      .delete('clinicalService/' + uuid)
      .then(() => {
        clinicalService.destroy(uuid);
      });
  },
  // WEB
  getByIdentifierTypeCode(identifierTypeCode: string) {
    return clinicalService
      .query()
      .with('identifierType')
      .where('code', identifierTypeCode)
      .first();
  },

  // Local Storage Pinia
  newInstanceEntity() {
    return clinicalService.getModel().$newInstance();
  },

  /*Pinia Methods*/
  getAllClinicalServices() {
    return clinicalService
      .query()
      .withAllRecursive(2)
      .orderBy('code', 'desc')
      .get();
  },

  getbyIdWithSectors(clinicalServiceId: string) {
    return clinicalService
      .query()
      .where('id', clinicalServiceId)
      .with('clinicSectors')
      .first();
  },

  getAllClinicalServicesPersonalized() {
    return clinicalService.query().withAllRecursive(2).get();
  },

  getClinicalServicePersonalizedById(clinicalServiceId: string) {
    return clinicalService
      .query()
      .with('clinicSectors')
      .with('identifierType')
      .whereId(clinicalServiceId)
      .get();
  },

  getClinicalServiceByCode(code: string) {
    return clinicalService.query().where('code', code).first();
  },
};

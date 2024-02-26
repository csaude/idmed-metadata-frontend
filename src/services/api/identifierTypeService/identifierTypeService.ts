import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import IdentifierType from 'src/stores/models/identifierType/IdentifierType';
import { useLoading } from 'src/composables/shared/loading/loading';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';

const identifierType = useRepo(IdentifierType);

const { closeLoading, showloading } = useLoading();
const { alertSucess, alertError } = useSwal();
const { isMobile, isOnline } = useSystemUtils();

export default {
  post(params: string) {
    return api()
      .post('identifierType', params)
      .then((resp) => {
        identifierType.save(resp.data);
      });
  },
  get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('identifierType?offset=' + offset + '&max=100')
        .then((resp) => {
          identifierType.save(resp.data);
          offset = offset + 100;
          if (resp.data.length > 0) {
            this.get(offset);
          } else {
            closeLoading();
          }
        })
        .catch((error) => {
          // alertError('Aconteceu um erro inesperado nesta operação.');
          console.log(error);
        });
    }
  },
  patch(uuid: string, params: string) {
    return api()
      .patch('identifierType/' + uuid, params)
      .then((resp) => {
        identifierType.save(resp.data);
      });
  },
  async delete(uuid: string) {
    return api()
      .delete('identifierType/' + uuid)
      .then(() => {
        identifierType.destroy(uuid);
      });
  },
  // Local Storage Pinia
  newInstanceEntity() {
    return identifierType.getModel().$newInstance();
  },

  getAllIdentifierTypes() {
    return identifierType.query().withAll().get();
  },
};

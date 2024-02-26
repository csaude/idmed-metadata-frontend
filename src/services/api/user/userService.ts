import SecUser from 'src/stores/models/userLogin/User';
import SecUserRole from 'src/stores/models/userLogin/SecUserRole';
import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useLoading } from 'src/composables/shared/loading/loading';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';

const secUserRepo = useRepo(SecUser);
const secUserRoleRepo = useRepo(SecUserRole);

const { closeLoading, showloading } = useLoading();
const { alertSucess, alertError } = useSwal();
const { isMobile, isOnline } = useSystemUtils();

export default {
  post(params: string) {
    return api()
      .post('secUser', params)
      .then((resp) => {
        secUserRepo.save(resp.data);
      });
  },
  get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('secUser?offset=' + offset + '&max=100')
        .then((resp) => {
          secUserRepo.save(resp.data);
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
      .patch('secUser/' + uuid, params)
      .then((resp) => {
        // if (resp.data) {
        //   clinicSectorUsersRepo.where('user_id', resp.data.id).delete();
        //   secUserRoleRepo.where('user_id', resp.data.id).delete();
        // }
        secUserRepo.save(resp.data);
      });
  },
  delete(uuid: string) {
    return api()
      .delete('secUser/' + uuid)
      .then(() => {
        secUserRepo.destroy(uuid);
      });
  },
  async apiGetAll(offset: number, max: number) {
    return this.get(offset);
  },
  async apiSave(userLogin: any) {
    return this.post(userLogin);
  },
  // Local Storage Pinia
  newInstanceEntity() {
    return secUserRepo.getModel().$newInstance();
  },
  getAllFromStorage() {
    return secUserRepo.all();
  },

  getAllUsers() {
    return secUserRepo
      .query()
      .with('clinics', (query) => {
        query.with('province');
        query.with('facilityType');
        query.with('district', (query1) => {
          query1.with('province');
        });
      })
      .get();
  },
};

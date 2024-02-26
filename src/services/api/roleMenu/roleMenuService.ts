import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import RoleMenu from 'src/stores/models/userLogin/RoleMenu';
import { nSQL } from 'nano-sql';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useLoading } from 'src/composables/shared/loading/loading';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';

const roleMenu = useRepo(RoleMenu);

const { closeLoading } = useLoading();
const { alertSucess, alertError } = useSwal();
const { isMobile, isOnline } = useSystemUtils();

export default {
  async post(params: string) {
    try {
      const resp = await api().post('roleMenu', params);
      roleMenu.save(resp.data);
      // alertSucess('O Registo foi efectuado com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('roleMenu?offset=' + offset + '&max=100')
        .then((resp) => {
          roleMenu.save(resp.data);
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
  async patch(uuid: string, params: string) {
    try {
      const resp = await api().patch('roleMenu/' + uuid, params);
      roleMenu.save(resp.data);
      alertSucess('O Registo foi alterado com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  async delete(uuid: string) {
    try {
      const resp = await api().delete('roleMenu/' + uuid);
      roleMenu.destroy(uuid);
      alertSucess('O Registo foi removido com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  //Local Storage Pinia
  newInstanceEntity() {
    return roleMenu.getModel().$newInstance();
  },
  getAllFromStorage() {
    return roleMenu.all();
  },
  getAllByRole(roleId: any) {
    return roleMenu.query().where('role_id', roleId).get();
  },
};

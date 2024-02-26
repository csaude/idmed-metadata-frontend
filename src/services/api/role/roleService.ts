import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import Role from 'src/stores/models/userLogin/Role';
import RoleMenu from 'src/stores/models/userLogin/RoleMenu';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useLoading } from 'src/composables/shared/loading/loading';

const role = useRepo(Role);
const roleMenuRepo = useRepo(RoleMenu);

const { closeLoading, showloading } = useLoading();
const { alertSucess, alertError } = useSwal();

export default {
  async post(params: string) {
    try {
      const resp = await api().post('role', params);
      role.save(resp.data);
      // alertSucess('O Registo foi efectuado com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  async get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('role?offset=' + offset + '&max=100')
        .then((resp) => {
          role.save(resp.data);
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
      const resp = await api().patch('role/' + uuid, params);
      console.log(resp.data);
      if (resp.data) {
        roleMenuRepo.where('role_id', resp.data.id).delete();
      }
      role.save(resp.data);
      alertSucess('O Registo foi alterado com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  async delete(uuid: string) {
    try {
      const resp = await api().delete('role/' + uuid);
      role.destroy(uuid);
      alertSucess('O Registo foi removido com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  // WEB
  async postWeb(params: string) {
    try {
      const resp = await api().post('role', params);
      role.save(resp.data);
      // alertSucess('O Registo foi efectuado com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  async apiGetAll() {
    return await api().get('/role');
  },
  async apiSave(role: any) {
    return await api().post('/role', role);
  },
  async apiUpdate(role: any) {
    return await api().put('/role/', role);
  },
  // Local Storage Pinia
  newInstanceEntity() {
    return role.getModel().$newInstance();
  },
  getAllFromStorage() {
    return role.all();
  },
  getActiveWithMenus() {
    return role.query().where('active', true).get();
  },
  getByAuthority(auth: any) {
    return role.query().where('authority', auth).first();
  },
  getAllWithMenus() {
    return role.query().with('menus').get();
  },
};

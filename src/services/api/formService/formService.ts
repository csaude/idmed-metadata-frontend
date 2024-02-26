import { useRepo } from 'pinia-orm';
import Form from 'src/stores/models/form/Form';
import api from '../apiService/apiService';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useLoading } from 'src/composables/shared/loading/loading';
const form = useRepo(Form);
const { closeLoading } = useLoading();
const { alertSucess } = useSwal();

export default {
  async post(params: string) {
    try {
      const resp = await api().post('form', params);
      form.save(resp.data);
      // alertSucess('O Registo foi efectuado com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('form?offset=' + offset + '&max=100')
        .then((resp) => {
          form.save(resp.data);
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
      const resp = await api().patch('form/' + uuid, params);
      form.save(resp.data);
      alertSucess('O Registo foi alterado com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  async delete(uuid: string) {
    try {
      const resp = await api().delete('form/' + uuid);
      form.destroy(uuid);
      alertSucess('O Registo foi removido com sucesso');
    } catch (error: any) {
      // alertError('Aconteceu um erro inesperado nesta operação.');
      console.log(error);
    }
  },
  /*Pinia Methods*/
  getAllForms() {
    return form.query().withAll().get();
  },

  getFormById(id: string) {
    return form.query().where('id', id).first();
  },
};

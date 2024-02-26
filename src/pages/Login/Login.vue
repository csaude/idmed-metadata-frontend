<template>
  <q-responsive :ratio="16 / 9">
    <q-layout v-cloak>
      <q-page-container>
        <!-- <q-responsive :ratio="16/9" class="col"> -->
        <q-page class="flex flex-center">
          <div
            id="particles-js"
            :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
          ></div>
          <q-btn
            color="white"
            class="absolute-top-right"
            flat
            round
            @click="$q.dark.toggle()"
            :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          />
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-card
              v-bind:style="
                $q.screen.lt.sm
                  ? { width: '60%', height: '65%', 'border-radius': '50%' }
                  : { width: '50%', height: '65%', 'border-radius': '50%' }
              "
            >
              <q-card-section>
                <div
                  class="col-auto text-grey text-caption q-pt-sm row no-wrap items-center justify-center"
                >
                  <q-avatar size="100px">
                    <q-img src="~assets/LogoiDMED.png" />
                  </q-avatar>
                </div>
                <div class="row q-pa-sm text-center q-mt-md column">
                  <p
                    style="font-family: 'line-awesome'"
                    class="text-gray text-h5 ellipsis text-weight-bold"
                  >
                    Metadata do IDMED <br />
                    de Medicamentos
                  </p>
                </div>
              </q-card-section>
              <q-card-section align="center">
                <q-form
                  class="q-gutter-md"
                  @submit.prevent="authUser"
                  v-if="configs !== null"
                >
                  <div
                    class="q-pa-sm text-center justify-center"
                    style="max-width: 50%"
                  >
                    <div class="row q-mb-sm">
                      <q-input
                        class="col"
                        ref="usernameRef"
                        v-model="username"
                        type="text"
                        :rules="[
                          (val) =>
                            val.length >= 3 ||
                            'O nome do utilizador deve ter um minimo de 4 caracteres',
                        ]"
                        lazy-rules
                        label="Utilizador"
                      >
                        <template v-slot:append>
                          <q-icon name="person" color="primary" />
                        </template>
                      </q-input>
                    </div>
                    <div class="row q-mb-sm">
                      <q-input
                        v-model="password"
                        ref="passwordRef"
                        class="col"
                        label="Senha"
                        :rules="[
                          (val) =>
                            val.length >= 4 ||
                            'A senha deve ter um minimo de 4 caracteres',
                        ]"
                        :type="isPwd ? 'password' : 'text'"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                            color="primary"
                          />
                        </template>
                      </q-input>
                    </div>
                    <div class="row">
                      <q-btn
                        :loading="submitting"
                        class="full-width q-py-sm"
                        unelevated
                        rounded
                        color="primary"
                        type="submit"
                        label="Entrar"
                      />
                    </div>
                  </div>
                </q-form>
              </q-card-section>
              <q-card-section align="center">
                <div class="row justify-center q-pt-md q-gutter-xl">
                  <div class="justify-left q-pt-lg">
                    <q-avatar
                      round
                      :size="!isMobile ? '130px' : '60px'"
                      style="opacity: 40%"
                    >
                      <q-img src="~assets/MoHLogo.png" />
                    </q-avatar>
                  </div>
                  <div class="q-pb-lg">
                    <q-avatar
                      square
                      :size="!isMobile ? '190px' : '90px'"
                      style="opacity: 40%"
                    >
                      <q-img src="~assets/pepfar-new-logo.jpeg" />
                    </q-avatar>
                  </div>
                </div>
                <div class="row justify-center">Versão v.1.0.0 Beta</div>
              </q-card-section>
            </q-card>
          </transition>
          <q-dialog
            persistent
            v-model="notice"
            transition-show="slide-up"
            transition-hide="slide-down"
            v-if="LocalStorage.getItem('backend_url') !== null"
          >
            <q-card class="bg-white text-red">
              <q-card-section>
                <div class="text-h6 text-weight-bold">
                  Aviso de Confidencialidade
                </div>
                <q-separator />
              </q-card-section>
              <q-card-section class="q-pt-md">
                <div class="row">
                  <div class="col-2">
                    <q-icon name="warning" color="red" size="4.5rem" />
                  </div>
                  <div class="col text-justify">
                    Ao acessar este sistema, você está prestes a visualizar
                    informações altamente confidenciais de utentes. É sua
                    responsabilidade protegê-las adequadamente e usá-las somente
                    para os fins autorizados. A Privacidade dos utentes é
                    essencial para a nossa missão
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn color="red" label="Fechar" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-page>
        <!-- </q-responsive> -->
      </q-page-container>
    </q-layout>
  </q-responsive>
</template>

<script setup>
import { QSpinnerBall, useQuasar } from 'quasar';
import UsersService from 'src/services/UsersService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import bcrypt from 'bcryptjs';
import { LocalStorage } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const username = ref('');
const password = ref('');
const usernameRef = ref(null);
const passwordRef = ref(null);
const isPwd = ref(true);
const submitting = ref(false);
const notice = ref(true);

/*
Hook
*/

/*
Computed
*/

/*
Methods
*/

const authUser = async () => {
  const encodedStringBtoA = btoa(
    String(username.value).concat(':').concat(password.value)
  );
  usernameRef.value.validate();
  passwordRef.value.validate();
  if (!passwordRef.value.hasError && !usernameRef.value.hasError) {
    submitting.value = true;
    loginOnline(encodedStringBtoA);
  }
};

const loginOnline = (encodedStringBtoA) => {
  UsersService.login({
    username: username.value,
    password: password.value,
  })
    .then((response) => {
      localStorage.setItem('tokenExpiration', String(Date.now() + 600000)); // 10min
      submitting.value = false;
      //  userLogin.save(resp.data);
      if (response !== undefined && response.status === 200) {
        const localuser = UsersService.getUserByUserName(username.value);
        localStorage.setItem('id_token', localuser.access_token);
        localStorage.setItem('refresh_token', localuser.refresh_token);
        localStorage.setItem('username', localuser.username);
        localStorage.setItem('user', localuser.username);
        localStorage.setItem('Btoa', encodedStringBtoA);
        localStorage.setItem('role_menus', localuser.menus);
        localStorage.setItem(
          'clinic_sector_users',
          localuser.clinicSectorUsers
        );
        router.push({ path: '/Settings' });
      }
    })
    .catch((error) => {
      console.log(error);
      submitting.value = false;
      if (error.request.response != null) {
        const arrayErrors = JSON.parse(error.request.response);
        if (arrayErrors.total == null) {
          listErrors.push(arrayErrors.message);
        } else {
          arrayErrors._embedded.errors.forEach((element) => {
            listErrors.push(element.message);
          });
        }
        console.log(listErrors);
      }
    });
};
</script>

<style>
.bg-image {
  background-repeat: no-repeat;
  background-size: cover;
}

[v-cloak] {
  display: none !important;
}
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal_gradient {
  background: linear-gradient(145deg, #00afdb 30%, #00bea4 70%);
}
.dark_gradient {
  background: linear-gradient(145deg, #014758 15%, #014b41 70%);
}
.login-form {
  position: absolute;
}
</style>

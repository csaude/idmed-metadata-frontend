<template>
  <q-layout view="lHh Lpr lFf">
    <div>
      <q-header>
        <q-toolbar>
          <q-avatar size="100px">
            <img class="bg-white" src="../assets/LogoiDMED.png" />
          </q-avatar>

          <q-toolbar-title
            class="text-bold text-italic"
            style="font-family: 'Gill Sans'; font-size: 35px"
          >
            <q-item-section>
              <q-item-label
                class="text-bold text-italic"
                style="font-family: 'Gill Sans'; font-size: 35px"
                >iDMED</q-item-label
              >
              <q-item-label
                class="text-bold text-italic"
                style="font-family: 'Gill Sans'; font-size: 25px"
              ></q-item-label>
            </q-item-section>
          </q-toolbar-title>
          <q-tabs
            class="absolute-center"
            no-caps
            v-model="tab"
            active-color="orange"
            indicator-color="orange"
            align="justify"
            narrow-indicator
          >
            <q-route-tab
              exact
              :to="'/settings'"
              name="settings"
              icon="settings"
              label="Administração"
            />
          </q-tabs>
          <q-btn-dropdown
            unelevated
            v-model="userInfoOpen"
            no-caps
            @click="onMainClick"
          >
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-avatar size="lg" icon="account_circle"> </q-avatar>
                <div class="text-center q-pa-sm">
                  {{ username }}
                </div>
              </div>
            </template>
            <q-list style="width: 190px">
              <q-item>
                <q-item-section avatar>
                  <q-avatar icon="account_circle"> </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <div class="">{{ username }}</div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced />
              <q-item clickable v-close-popup @click="onItemClick" to="/Logout">
                <q-item-section avatar>
                  <q-avatar icon="mdi-logout" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Sair</q-item-label>
                  <q-item-label caption>Sair do Sistema</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>
    </div>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { Notify } from 'quasar';
import { useMediaQuery } from '@vueuse/core';
import clinicService from 'src/services/api/clinicService/clinicService';

const userInfoOpen = ref(false);
const onMainClick = ref('');
const onItemClick = ref('');
const username = ref(localStorage.getItem('user'));
const tab = ref('home');

// const { isOnline } = useSystemUtils();
</script>

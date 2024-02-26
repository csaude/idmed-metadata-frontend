<template>
  <div class="q-pa-md">
    <div class="q-mt-lg" v-if="mobile">
      <!-- <TitleBar>Administração</TitleBar> -->
      <div class="text-left">
        <div class="q-my-md text-subtitle1 text-grey-14">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn
          >Administração
        </div>
        <q-separator color="grey-13" size="1px" />
      </div>
    </div>
    <!-- <q-splitter v-if="website" v-model="splitterModel"> -->
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="selectedTab" vertical class="text-teal">
          <q-tab v-for="tab in tabs" :key="tab.name" v-bind="tab" />
        </q-tabs>
      </template>
      <template v-slot:after>
        <q-tab-panels
          v-model="selectedTab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="clinic">
            <div class="text-h4 q-mb-md"></div>
            <clinics> </clinics>
          </q-tab-panel>
          <q-tab-panel name="drugs">
            <div class="text-h4 q-mb-md"></div>
            <drug> </drug>
          </q-tab-panel>
          <q-tab-panel name="therapeutic_regimen">
            <div class="text-h4 q-mb-md"></div>
            <therapeuticRegimen> </therapeuticRegimen>
          </q-tab-panel>
          <q-tab-panel name="clinical_service">
            <div class="text-h4 q-mb-md"></div>
            <clinicalServices> </clinicalServices>
          </q-tab-panel>
          <q-tab-panel name="identifier_type">
            <div class="text-h4 q-mb-md"></div>
            <identifierType />
          </q-tab-panel>
          <q-tab-panel name="users">
            <div class="text-h4 q-mb-md"></div>
            <users> </users>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script setup>
/*Imports*/
import { ref, provide, computed, onMounted } from 'vue';
// import clinicServiceService from 'src/services/api/clinicService/clinicService.ts';
import { useOnline } from 'src/composables/shared/loadParams/online';
import { useLoading } from 'src/composables/shared/loading/loading';
import clinics from 'src/components/Settings/Clinic/Clinics.vue';
import drug from 'src/components/Settings/Drug/Drugs.vue';
import therapeuticRegimen from 'src/components/Settings/TherapeuticRegimen/TherapeuticRegimens.vue';
import clinicalServices from 'src/components/Settings/ClinicalService/ClinicalService.vue';
import identifierType from 'src/components/Settings/IdentifierType/IdentifierTypeList.vue';
// import interoperability from 'src/components/Settings/Interoperability/His.vue';
import users from 'src/components/Settings/User/Users.vue';
// import roles from 'src/components/Settings/User/Roles.vue';
//import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';
const { loadSettingParams } = useOnline();

/*Variables*/
//const { website } = useSystemUtils();
const { closeLoading, showloading } = useLoading();
const activeMenu = ref('Farmácias');
const filter = ref('');
const selectedTab = ref('clinic');
const drawer = ref(false);
const viewMode = ref(false);
const createMode = ref(false);
const editMode = ref(false);
const splitterModel = ref(15);
const step = ref('');
const clinic = ref();
const clinicSector = ref();
const isEditStep = ref(false);
const isCreateStep = ref(false);
const tabs = [
  {
    name: 'clinic',
    icon: 'local_hospital',
    label: 'Farmácias',
    separator: true,
  },
  { name: 'drugs', icon: 'medication', label: 'Medicamentos', separator: true },
  {
    name: 'therapeutic_regimen',
    icon: 'healing',
    label: 'Regime Terapêutico',
    separator: true,
  },
  {
    name: 'clinical_service',
    icon: 'local_pharmacy',
    label: 'Serviço Clínico',
    separator: true,
  },
  {
    name: 'identifier_type',
    icon: 'pin',
    label: 'Tipo de Identificador',
    separator: true,
  },
  { name: 'users', icon: 'people', label: 'Utilizadores', separator: true },
];

/*Hooks*/

onMounted(() => {
  showloading();
  loadSettingParams();
  console.log();
});

/*injects*/

/*provides*/
provide('step', step);
provide('clinic', clinic);
provide('clinicSector', clinicSector);
provide('viewMode', viewMode);
provide('editMode', editMode);
provide('createMode', createMode);
provide('isEditStep', isEditStep);
provide('isCreateStep', isCreateStep);
provide('filter', filter);

/*Methods*/
const changeMenu = (label) => {
  activeMenu.value = label;
  drawer.value = false;
};
</script>
<style scoped>
.q-tab--active {
  background-color: #9e9e9e2e; /* Defina a cor de fundo desejada para destacar o item ativo */
  color: #000000; /* Defina a cor do texto desejada para destacar o item ativo */
  /* Outros estilos desejados */
}
</style>

<template>
  <div>
    <div class="q-mb-md text-weight-bold text-subtitle1">
      <q-bar style="background-color: #9e9e9e2e">
        <div class="cursor-pointer non-selectable">Farmácias</div>
      </q-bar>
      <q-separator class="q-my-md max-width" color="primary"></q-separator>
    </div>

    <div class="">
      <q-table
        :rows="clinics"
        :columns="columns"
        :filter="filter"
        :loading="loading"
        rowsPerPage="5"
        row-key="id"
        :rows-per-page-options="[5, 10, 15, 20]"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Procurar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:no-data="{ icon, filter }">
          <div
            class="full-width row flex-center text-primary q-gutter-sm text-body2"
          >
            <span> Sem resultados para visualizar </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="clinicName" :props="props">
              {{ props.row.clinicName }}
            </q-td>
            <q-td key="facilityType" :props="props">
              {{ props.row.facilityType.description }}
            </q-td>
            <q-td key="code" :props="props">
              {{ props.row.code }}
            </q-td>
            <q-td key="province" :props="props">
              {{
                props.row.province !== undefined && props.row.province !== null
                  ? props.row.province.description
                  : ''
              }}
            </q-td>
            <q-td key="district" :props="props">
              {{
                props.row.district !== undefined && props.row.district !== null
                  ? props.row.district.description
                  : ''
              }}
            </q-td>
            <q-td key="active" :props="props">
              {{ props.row.active ? 'Sim' : 'Nao' }}
            </q-td>
            <q-td key="options" :props="props">
              <div class="col">
                <!-- <q-btn
                  flat
                  round
                  color="amber-8"
                  icon="edit"
                  v-if="props.row.active === true"
                  @click="editClinic(props.row)"
                >
                  <q-tooltip class="bg-amber-5">Editar</q-tooltip>
                </q-btn> -->

                <q-btn
                  flat
                  round
                  class="q-ml-md"
                  color="green-8"
                  icon="search"
                  @click="visualizeClinic(props.row)"
                >
                  <q-tooltip class="bg-green-5">Visualizar</q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="absolute-bottom">
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn
            size="xl"
            fab
            icon="add"
            @click="addClinicNew()"
            color="primary"
          />
        </q-page-sticky>
      </div>
    </div>

    <q-dialog persistent v-model="showClinicRegistrationScreen">
      <addClinic
        :selectedClinic="clinic"
        :stepp="step"
        :editMode="editMode"
        @close="showClinicRegistrationScreen = false"
      />
    </q-dialog>
  </div>
</template>
<script setup>
/*Imports*/
import { inject, ref, onMounted, computed } from 'vue';
import clinicService from 'src/services/api/clinicService/clinicService.ts';
import provinceService from 'src/services/api/provinceService/provinceService.ts';

/*Components Import*/
import addClinic from 'src/components/Settings/Clinic/AddClinic.vue';
import Clinic from 'src/stores/models/clinic/Clinic';

/*Declarations*/
const showClinicRegistrationScreen = ref(false);

/*injects*/
const step = inject('step');
const clinic = inject('clinic');
const viewMode = inject('viewMode');
const editMode = inject('editMode');
const filter = ref('');
const loading = ref(true);
const columns = [
  {
    name: 'clinicName',
    required: true,
    label: 'Nome',
    align: 'left',
    field: (row) => row.clinicName,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'facilityType',
    required: true,
    label: 'Tipo de Farmácia',
    align: 'left',
    field: (row) => row.facilityType.description,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'code',
    required: true,
    label: 'Código',
    align: 'left',
    field: (row) => row.code,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'province',
    required: true,
    label: 'Província',
    align: 'left',
    field: (row) => row.province.description,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'district',
    required: true,
    label: 'Distrito',
    align: 'left',
    field: (row) =>
      row.district !== undefined && row.district !== null
        ? row.district.description
        : 'Não Definido',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'active',
    required: true,
    label: 'Activo',
    align: 'left',
    field: (row) => row.active,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'options', align: 'left', label: 'Opções', sortable: false },
];

/*Methods*/
const visualizeClinic = (clinicParam) => {
  clinic.value = clinicParam;
  viewMode.value = true;
  editMode.value = false;
  showClinicRegistrationScreen.value = true;
};

const addClinicNew = () => {
  clinic.value = new Clinic();
  step.value = 'create';
  showClinicRegistrationScreen.value = true;
  editMode.value = false;
  viewMode.value = false;
};
/*Hooks*/
const allProvinces = computed(() => {
  return provinceService.getAllProvinces();
});

const nonOrderedClinics = computed(() => {
  return clinicService.getAllClinics();
});

const clinics = computed(() => {
  const orderedClinics = ref(null);
  orderedClinics.value = clinicService.getAllClinicsOrdered(
    allProvinces.value,
    nonOrderedClinics.value
  );
  if (orderedClinics.value && orderedClinics.value.length >= 0) stopLoading();
  return orderedClinics.value;
});

const stopLoading = () => {
  loading.value = false;
};

onMounted(() => {
  step.value = '';
  editMode.value = false;
  viewMode.value = false;
});
</script>

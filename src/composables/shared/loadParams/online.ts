// import { SecUser } from 'src/stores/models/userLogin/User';
import clinicService from 'src/services/api/clinicService/clinicService';
import clinicalServiceService from 'src/services/api/clinicalServiceService/clinicalServiceService';
import districtService from 'src/services/api/districtService/districtService';
import drugService from 'src/services/api/drugService/drugService';
import facilityTypeService from 'src/services/api/facilityTypeService/facilityTypeService';
import formService from 'src/services/api/formService/formService';
import identifierTypeService from 'src/services/api/identifierTypeService/identifierTypeService';
import provinceService from 'src/services/api/provinceService/provinceService';
import therapeuticalRegimenService from 'src/services/api/therapeuticalRegimenService/therapeuticalRegimenService';
import clinicalServiceAttributeTypeService from 'src/services/api/clinicalServiceAttrTypeService/ClinicalServiceAttrTypeService';
import clinicalServiceAttributeService from 'src/services/api/clinicalServiceAttributeService/clinicalServiceAttributeService';
import roleService from 'src/services/api/role/roleService';
import roleMenuService from 'src/services/api/roleMenu/roleMenuService';
import userService from 'src/services/api/user/userService';

export function useOnline() {
  async function loadSettingParams() {
    therapeuticalRegimenService.get(0);

    clinicalServiceService.get(0);

    clinicalServiceAttributeTypeService.get(0);

    identifierTypeService.get(0);

    facilityTypeService.get(0);

    formService.get(0);

    drugService.get(0);

    facilityTypeService.get(0);

    provinceService.get(0);

    districtService.get(0);

    clinicService.get(0);

    roleService.get(0);

    userService.get(0);
  }

  return {
    loadSettingParams,
  };
}

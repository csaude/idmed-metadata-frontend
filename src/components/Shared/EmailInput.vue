<template>
  <TextInput
    label="Email"
    dense
    ref="email"
    class="col"
    :value="email"
    type="email"
    :rules="[(val) => !!val || 'Por Favor Indique o Email', isValidEmail]"
  />
</template>

<script setup>
import TextInput from 'src/components/Shared/Input/TextField.vue';

const isValidEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || 'Email Invalido';
};
</script>

<style></style>

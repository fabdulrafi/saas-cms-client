<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
      <div class="panel shadow-sm h-[335px]">
        <div class="my-4">
          <div class="flex flex-col justify-center items-center">
            <img
              :src="user?.image_url ? user?.image_url : `/assets/images/profile_default.png`"
              alt=""
              class="w-24 h-24 rounded-full object-cover mb-5" />

            <p class="font-semibold text-primary text-xl">
              {{ user?.name }}
            </p>
          </div>

          <ul class="mt-6 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
            <li class="flex items-center gap-2">
              <icon-award class="shrink-0" />

              {{ user?.role_title ?? 'Belum Ditentukan' }}
            </li>

            <li>
              <a href="javascript:;" class="flex items-center gap-2">
                <icon-mail class="w-5 h-5 shrink-0" />

                <span class="text-primary truncate">
                {{ user?.email }}
                </span>
              </a>
            </li>

            <li class="flex items-center gap-2">
              <icon-phone />

              <span class="whitespace-nowrap" dir="ltr">
                {{ user?.mobilephone }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="panel shadow-sm lg:col-span-2 xl:col-span-3"
        :style="`height: calc(100vh - ${store.menu === 'horizontal' ? '230px' : '179px'});`">
        <TabGroup as="div">
          <TabList class="flex flex-wrap mb-5 border-b border-white-light dark:border-[#191e3a]">
            <Tab
              v-for="(item, index) in tabs"
              as="template" v-slot="{ selected }">
              <a
                @click="tab_selected = index"
                :key="index"
                href="javascript:;"
                class="p-5 py-3 -mb-[1px] flex items-center relative before:transition-all before:duration-700 before:absolute hover:text-primary before:bottom-0 before:w-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:bg-primary hover:before:w-full !outline-none transition duration-300"
                :class="{ 'before:!w-full text-primary': selected }">
                {{ item.title }}
              </a>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel v-if="!tab_selected">
              <div class="pb-5">
                {{ tabs[tab_selected].description }}
              </div>

              <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

              <form @submit.prevent="submit">
                <div class="pt-5 pb-6 overflow-auto"
                  :style="`height: calc(100vh - ${store.menu === 'horizontal' ? '440px' : '387px'}) !important;`">
                  <div class="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-6">
                    <div class="w-[180px]">
                      <label class="!font-thin text-sm">
                        Upload Image
                      </label>

                      <div>
                        <div v-if="payload.image_url"
                          class="relative">
                          <img
                            class="h-[150px] w-full object-contain rounded-md border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b]"
                            :src="payload.image_url"
                            alt="" />

                          <button
                            @click="payload.image_url = ''"

                            type="button"
                            class="btn btn-danger w-5 h-5 p-0 rounded-md absolute top-[-8px] right-[-8px]">
                            <icon-trash-lines class="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <uploadImage v-else
                          @input="changeImage"
                          class="h-[150px]" />
                      </div>
                    </div>

                    <div class="modal_placeholder w-3/6">
                      <label class="!font-thin text-sm">
                        Full Name

                        <span class="text-danger">*</span>
                      </label>

                      <input
                        v-model="payload.name"

                        type="text"
                        placeholder="Ex: Fabdulrafi"
                        class="form-input" />

                      <div v-if="v$.name.$error"
                        class="validator">
                        {{ v$.name.$errors[0].$message }}
                      </div>
                    </div>

                    <div class="modal_placeholder w-2/6">
                      <label class="!font-thin text-sm">
                        Email

                        <span class="text-danger">*</span>
                      </label>

                      <input
                        v-model="payload.email"

                        type="email"
                        placeholder="Ex: fabdulrafi@gmail.com"
                        class="form-input" />

                      <div v-if="v$.email.$error"
                        class="validator">
                        {{ v$.email.$errors[0].$message }}
                      </div>
                    </div>

                    <div v-if="payload.mobilephone" class="modal_placeholder w-2/6">
                      <label class="!font-thin text-sm">
                        Phone
                      </label>

                      <Maska
                        v-model="payload.mobilephone"

                        :types="true"
                        masks="####-####-####"
                        placeholders="Ex: 0857-0265-6660" />
                    </div>
                  </div>
                </div>

                <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                <div class="p-5">
                  <div class="flex justify-end items-center">
                    <BtnPrivate :loadings="loading" />
                  </div>
                </div>
              </form>

              <Error :messages="errorMessage" margins="m-0" />
            </TabPanel>

            <TabPanel v-if="tab_selected">
              <div class="pb-5">
                {{ tabs[tab_selected].description }}
              </div>

              <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

              <form @submit.prevent="submit_password">
                <div class="pt-5 pb-6 overflow-auto"
                  :style="`height: calc(100vh - ${store.menu === 'horizontal' ? '440px' : '387px'}) !important;`">
                  <div class="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-6">
                    <div class="modal_placeholder w-2/6">
                      <label class="!font-thin text-sm">
                        Password Old

                        <span class="text-danger">*</span>
                      </label>

                      <div class="flex">
                        <input
                          v-model="payload.old_password"

                          type="text"
                          placeholder="Ex: ********"
                          class="form-input ltr:rounded-r-none rtl:rounded-l-none flex-1 ltr:rounded-l-md rtl:rounded-r-md" />

                        <div
                          @click="copy(payload.old_password)"

                          class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                          <IconCopy />
                        </div>
                      </div>

                      <div v-if="v$Password.old_password.$error"
                        class="validator">
                        {{ v$Password.old_password.$errors[0].$message }}
                      </div>
                    </div>

                    <div class="modal_placeholder w-2/6">
                      <label class="!font-thin text-sm">
                        Password New

                        <span class="text-danger">*</span>
                      </label>

                      <div class="flex">
                        <input
                          v-model="payload.new_password"

                          type="text"
                          placeholder="Ex: ********"
                          class="form-input ltr:rounded-r-none rtl:rounded-l-none flex-1 ltr:rounded-l-md rtl:rounded-r-md" />

                        <div
                          @click="payload.new_password = generate"

                          class="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                          <IconPencilPaper />
                        </div>

                        <div
                          @click="copy(payload.new_password)"

                          class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                          <IconCopy />
                        </div>
                      </div>

                      <div v-if="v$Password.new_password.$error"
                        class="validator">
                        {{ v$Password.new_password.$errors[0].$message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                <div class="p-5">
                  <div class="flex justify-end items-center">
                    <BtnPrivate :loadings="exLoading" />
                  </div>
                </div>
              </form>

              <Error :messages="exErrorMessage" margins="m-0" />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, watch, nextTick } from "vue";
  import { useMeta } from '@/composables/use-meta';
  import { useAuth } from '@/modules/auth';
  import { useAppStore } from '@/stores/index';
  import { useApiWithAuth } from "@/modules/api";
  import { useRouter } from 'vue-router';

  import { TabGroup, TabList, Tab } from '@headlessui/vue';

  import IconMail from '@/components/icon/icon-mail.vue';
  import IconPhone from '@/components/icon/icon-phone.vue';
  import iconAward from '@/components/icon/icon-award.vue';
  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';

  import { useValid } from "@/modules/valid";

  import Maska from '@/components/basic/input/Maska.vue';

  import { usePassword } from '@/modules/password';

  import uploadImage from '@/components/upload/Image.vue';

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
  import IconCopy from '@/components/icon/icon-copy.vue';
  import useClipboard from 'vue-clipboard3';

  const { user, getUser } = useAuth();
  const store = useAppStore();
  const router = useRouter();
  
  useMeta({ title: router.currentRoute.value.meta.title });

  const tabs = ref([
    {
      title: 'General',
      description: 'Please fill in your personal data correctly, so that we can provide better service.'
    },
    {
      title: 'Password',
      description: 'Change your password every 3 months, to keep your account secure.'
    },
  ]);

  const tab_selected = ref(0);

  onMounted(() => {
    payload.id = user?.value?.id;
    payload.name = user?.value?.name;
    payload.email = user?.value?.email;
    payload.mobilephone = user?.value?.mobilephone;
    payload.image_url = user?.value?.image_url;
  });


  // ====================================== modal form ====================================== //
  const { generate } = usePassword();

  interface Payload {
    id?: string;
    name?: string;
    email?: string;
    mobilephone?: string;
    image_url?: string;
    old_password?: string;
    new_password?: string;
  };

  const initialState = (): Payload => {
    return {
      id: undefined,
      name: undefined,
      email: undefined,
      mobilephone: undefined,
      image_url: undefined,
      old_password: undefined,
      new_password: undefined
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm } = useValid(payload, ['mobilephone', 'image_url', 'old_password', 'new_password']);
  const { loading, data, post, errorMessage, error } = useApiWithAuth('profile/update');

  const changeImage = (e) => {
    if (e?.fileuri) payload.image_url = e.fileuri;
  };

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    post(payload).then(() => {
      // callback api
      getUser();

      swalAlert('Berhasil menyimpan data');
    });
  };

  watch(tab_selected, (value) => {
    nextTick(() => {
      if (!value) {
        Object.assign(payload, initialState());

        v$Password.value.$reset();

        exError.value = '';
      }

      else {
        payload.new_password = generate.value;
      }
    });
  });

  const {
    v$: v$Password,
  } = useValid(payload, ['name', 'email', 'mobilephone', 'image_url']);
  const {
    loading: exLoading,
    data: exData,
    post: exPost,
    errorMessage: exErrorMessage,
    error: exError
  } = useApiWithAuth('profile/update-password');

  const submit_password = async () => {
    const isFormCorrect = await v$Password.value.$validate();

    if (!isFormCorrect) return;

    exLoading.value = true;

    exPost(payload).then(() => {
      // callback api

      Object.assign(payload, initialState());

      v$Password.value.$reset();

      exError.value = '';

      payload.new_password = generate.value;

      swalAlert('Berhasil mengganti password');
    });
  };

  const { toClipboard } = useClipboard();
  const copy = async (msg) => {
    if (msg) {
      await toClipboard(msg);
      swalAlert('Berhasil mengkopi data');
    }
  };
</script>

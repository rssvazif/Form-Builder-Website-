<script setup>
import logo from "../components/logo_without_b_blue.vue";
import menuBar from "../components/menu_bar_myWork.vue";
import { ref, onMounted, onUnmounted } from "vue";
const hide_pass = ref(true);
const hideVerifyPass = ref(true);
const focusedPass = ref(false);
const focusedVerify = ref(false);
const passInputRef = ref(null);
const verifyInputRef = ref(null);
const textError = ref("");
const successMessage = ref("");

const newPasswordValue = ref("");
const verifyPasswordValue = ref("");
const resetToken = ref("");

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  resetToken.value = new URLSearchParams(window.location.search).get("token");
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

function handleClickOutside(event) {
  const passEl = passInputRef.value;
  const verifyEl = verifyInputRef.value;

  if (passEl && !passEl.contains(event.target)) {
    focusedPass.value = false;
  }
  if (verifyEl && !verifyEl.contains(event.target)) {
    focusedVerify.value = false;
  }
}

async function resetPassword() {
  if (!resetToken.value || resetToken.value.trim().length === 0) {
    textError.value = "شما دسترسی ندارید";
    return;
  }
  if (
    !newPasswordValue.value ||
    newPasswordValue.value.trim() === "" ||
    newPasswordValue.value.length < 6
  ) {
    textError.value = "رمز عبور نامعتبر است";
    setTimeout(() => {
      textError.value = "";
    }, 3000);
    return;
  }
  if (newPasswordValue.value.trim() !== verifyPasswordValue.value.trim()) {
    textError.value = "عدم تطابق رمز عبور";
    setTimeout(() => {
      textError.value = "";
    }, 3000);
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/user/newPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resetToken.value}`,
      },
      body: JSON.stringify({ newPassword: newPasswordValue.value }),
    });
    const data = await response.json();
    if (response.status === 400) {
      textError.value = data.message;
      setTimeout(() => {
        textError.value = "";
      }, 3000);
      return;
    }
    if (!data.updated) {
      textError.value = "خطا در تغییر رمز عبور";
      setTimeout(() => {
        textError.value = "";
      }, 3000);
    } else {
      successMessage.value = "رمز عبور با موفقیت تغییر کرد";
      setTimeout(() => {
        window.location.href = "http://localhost:5173/profile";
        newPasswordValue.value = "";
        verifyPasswordValue.value = "";
        successMessage.value = "";
      }, 2000);
    }
  } catch (err) {
    throw new Error("error while reset password");
  }
}
</script>
<template>
  <div class="password-page-header">
    <div class="profile-header">
      <div class="logo">
        <logo />
        <b
          style="
            text-align: right;
            padding-right: 10px;
            color: var(--jfv-google-apple-blue);
          "
          >جات فرم</b
        >
      </div>
      <div class="menu-bar-items" style="margin-right: auto">
        <router-link to="/myWorkspace" style="color: inherit">
          <span id="dashboard">صفحه کار من</span>
        </router-link>
      </div>
      <menuBar />
    </div>
  </div>
  <div class="main-box-new-password">
    <form class="reset-password-form">
      <h3>تغییر رمز عبور</h3>
      <div>
        <div>
          <label for="newPassword" class="label-for-newPass"
            >رمز عبور جدید</label
          >
          <div
            class="input-password-width-eye-icon"
            :class="{ focus_input_password: focusedPass }"
            ref="passInputRef"
          >
            <input
              type="text"
              name="newPassword"
              @focus="focusedPass = true"
              v-model="newPasswordValue"
              v-if="!hide_pass"
            />
            <input
              type="password"
              name="newPassword"
              @focus="focusedPass = true"
              v-model="newPasswordValue"
              v-else
              style="font-size: 30px; padding: 8px 8px 0 40px"
            />
            <button @click.prevent="hide_pass = !hide_pass">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="22"
                v-if="hide_pass === true"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.293 3.293a1 1 0 0 1 1.414 0l16 16a1 1 0 0 1-1.414 1.414l-16-16a1 1 0 0 1 0-1.414Zm13.046 14.461.728.728C15.636 19.372 13.938 20 12 20c-2.721 0-4.967-1.239-6.669-2.698-1.7-1.458-2.89-3.164-3.512-4.174a2.136 2.136 0 0 1 0-2.256c.62-1.005 1.8-2.699 3.487-4.152l.71.709 2.538 2.54a4 4 0 0 0 5.478 5.478l2.308 2.307Zm-.347-6a4 4 0 0 0-3.747-3.747L9.211 4.973l-.39-.39A9.032 9.032 0 0 1 11.998 4c2.722 0 4.968 1.239 6.67 2.698 1.7 1.458 2.89 3.164 3.512 4.174.429.697.429 1.56 0 2.256a19.216 19.216 0 0 1-2.061 2.754l-.354-.354-3.774-3.774Zm-5.925-.272a2 2 0 0 0 2.45 2.45l-2.45-2.45Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="22"
                v-else
              >
                <path
                  fill-rule="evenodd"
                  d="M12 4C9.277 4 7.031 5.239 5.33 6.698c-1.7 1.458-2.89 3.164-3.512 4.174-.43.697-.43 1.56 0 2.256.623 1.01 1.812 2.716 3.512 4.174C7.032 18.762 9.278 20 12 20c2.72 0 4.967-1.239 6.668-2.698 1.7-1.458 2.89-3.164 3.513-4.174a2.138 2.138 0 0 0 0-2.256c-.623-1.01-1.812-2.716-3.513-4.174C16.968 5.238 14.721 4 12 4Zm0 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm2-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div>
          <p class="warn-about-password">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="17"
            >
              <path
                fill-rule="evenodd"
                d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1 2.5a1 1 0 0 0-1-1h-1.5a1 1 0 1 0 0 2h.5V17a1 1 0 1 0 2 0v-6.5Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            طول رمز باید حداقل شش کاراکتر باشد
          </p>
        </div>
        <div>
          <label for="VerifyPassword" class="label-for-newPass"
            >تکرار رمز عبور جدید</label
          >
          <div
            class="input-password-width-eye-icon"
            :class="{ focus_input_password: focusedVerify }"
            ref="verifyInputRef"
          >
            <input
              type="text"
              name="VerifyPassword"
              @focus="focusedVerify = true"
              v-if="!hideVerifyPass"
              v-model="verifyPasswordValue"
            />
            <input
              type="password"
              name="verifyPassword"
              @focus="focusedVerify = true"
              v-model="verifyPasswordValue"
              v-else
              style="font-size: 30px; padding: 8px 8px 0 40px"
            />
            <button @click.prevent="hideVerifyPass = !hideVerifyPass">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="22"
                v-if="hideVerifyPass === true"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.293 3.293a1 1 0 0 1 1.414 0l16 16a1 1 0 0 1-1.414 1.414l-16-16a1 1 0 0 1 0-1.414Zm13.046 14.461.728.728C15.636 19.372 13.938 20 12 20c-2.721 0-4.967-1.239-6.669-2.698-1.7-1.458-2.89-3.164-3.512-4.174a2.136 2.136 0 0 1 0-2.256c.62-1.005 1.8-2.699 3.487-4.152l.71.709 2.538 2.54a4 4 0 0 0 5.478 5.478l2.308 2.307Zm-.347-6a4 4 0 0 0-3.747-3.747L9.211 4.973l-.39-.39A9.032 9.032 0 0 1 11.998 4c2.722 0 4.968 1.239 6.67 2.698 1.7 1.458 2.89 3.164 3.512 4.174.429.697.429 1.56 0 2.256a19.216 19.216 0 0 1-2.061 2.754l-.354-.354-3.774-3.774Zm-5.925-.272a2 2 0 0 0 2.45 2.45l-2.45-2.45Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="22"
                v-else
              >
                <path
                  fill-rule="evenodd"
                  d="M12 4C9.277 4 7.031 5.239 5.33 6.698c-1.7 1.458-2.89 3.164-3.512 4.174-.43.697-.43 1.56 0 2.256.623 1.01 1.812 2.716 3.512 4.174C7.032 18.762 9.278 20 12 20c2.72 0 4.967-1.239 6.668-2.698 1.7-1.458 2.89-3.164 3.513-4.174a2.138 2.138 0 0 0 0-2.256c-.623-1.01-1.812-2.716-3.513-4.174C16.968 5.238 14.721 4 12 4Zm0 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm2-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <span
          v-if="textError"
          style="color: red; font-size: 14px; margin: 7px 0 0"
          >{{ textError }}</span
        >
        <span
          v-if="successMessage && !textError"
          style="color: #64b200; font-size: 14px; margin: 7px 0 0"
          >{{ successMessage }}</span
        >
      </div>
      <button
        class="button-reset-password-green"
        @click.prevent="resetPassword()"
      >
        تغییر رمز عبور
      </button>
    </form>
  </div>
  <div class=""></div>
</template>
<style scoped>
.password-page-header * {
  color: var(--jfv-google-apple-blue);
}
.main-box-new-password {
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: calc(100vh - 72.39px);
  align-items: center;
}
.reset-password-form {
  width: 23rem;
}
.reset-password-form h3 {
  font-size: 24px;
  width: 100%;
  height: 52px;
}
.button-reset-password-green {
  margin-top: 24px;
  outline: none;
  border: none;
  background-color: #64b200;
  color: #fff;
  font-size: 18px;
  font-family: inherit;
  padding: 0 12px;
  border-radius: 0.25rem;
  width: 100%;
  height: 3rem;
}
.input-password-width-eye-icon {
  border: 1px solid #c8ceed;
  border-radius: 0.25rem;
  margin: 8px 0 0 0;
  padding: 0;
  display: flex;
}
.input-password-width-eye-icon input {
  border: none;
  outline: none;
  height: 40px;
  width: 90%;
  padding: 0 8px 0 44px;
  margin: 0;
  font-family: inherit;
  font-size: 16px;
  color: var(--jfv-google-apple-blue);
  direction: ltr;
}
.focus_input_password {
  border-color: rgb(121, 154, 248);
  box-shadow: rgb(211, 221, 253) 0px 0px 0px 3px;
}
.input-password-width-eye-icon button {
  background-color: #fff;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  padding: 0 0 0 10px;
  color: #8894ab;
  margin-right: auto;
}
.label-for-newPass {
  color: #2b3245;
}
.warn-about-password {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #6c73a8;
  font-size: 13px;
  gap: 8px;
}
</style>

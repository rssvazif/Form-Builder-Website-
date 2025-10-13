<script setup>
import footerWhite from "../components/footer_endPage.vue";
import logo from "../components/logo_without_b_bigger.vue";
import menuBar from "../components/menu_bar_myWork.vue";
import { ref, onMounted } from "vue";
const userInfo = ref({
  username: "",
  email: "",
  password: "تغییر رمز عبور",
  avatar: "#",
  phoneNumber: "",
  organizationName: "",
  jogTitle: "",
});
let prototype = {};
const errorMessage = ref("");
const selectedSection = ref("");
onMounted(() => {
  getUserInfo();
});

async function getUserInfo() {
  const token = localStorage.getItem("token");
  const expiresTime = localStorage.getItem("expiry");
  if (!token || !expiresTime) {
    console.log("token is not valid");
    return;
  }
  const now = Date.now();
  if (now > expiresTime) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/user/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("error to get response from server while get user info");
    }
    const data = await response.json();
    userInfo.value.username = data.username;
    userInfo.value.email = data.email;
    if (data.avatar) {
      userInfo.value.avatar = data.avatar;
    }
    prototype = { ...userInfo.value };
  } catch (err) {
    throw new Error("error : in server to get user info");
  }
}
async function saveNewUsername() {
  const token = localStorage.getItem("token");
  const expiresTime = localStorage.getItem("expiry");
  if (!token || !expiresTime) {
    console.log("token is not valid");
    return;
  }
  const now = Date.now();
  if (now > expiresTime) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    return;
  }
  if (prototype.username.trim() !== userInfo.value.username.trim()) {
    if (!userInfo.value.username.trim()) {
      errorMessage.value = "نام کاربری نامعتبر است";
      setTimeout(() => {
        errorMessage.value = "";
      }, 2000);
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/user/newUsername", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.value.email,
          newUsername: userInfo.value.username,
        }),
      });
      if (!response.ok) {
        throw new Error("error while get respone to change username");
      }
      window.location.reload();
    } catch (err) {
      throw new Error("error: " + err.message);
    }
  } else {
    errorMessage.value = "نام کاربری تغییری نکرده است";
    setTimeout(() => {
      errorMessage.value = "";
    }, 2000);
  }
}
async function resetPassword() {
  ////
}
</script>

<template>
  <div class="back-color-profile-header">
    <div class="profile-header">
      <div class="logo">
        <logo />
        <b style="text-align: right; padding-right: 10px; color: #fff"
          >جات فرم</b
        >
      </div>
      <menuBar />
    </div>
  </div>
  <div class="account-info">
    <div class="account-info-box">
      <div class="sections-profile">
        <h2>
          به روزرسانی مشخصات <span style="color: #007b2a">حساب کاربری</span>
        </h2>
        <div class="line-bottom-header-profile"></div>
        <div
          class="profile-section"
          :style="{
            backgroundColor: selectedSection === 'username' ? '#f3f3fe80' : '',
          }"
        >
          <b>نام کاربری</b>
          <div class="font-of-info input-box-edit-profile">
            {{ prototype.username }}
            <div
              v-if="selectedSection === 'username'"
              class="input-with-button-edit"
            >
              <input
                class="self-input-new-info"
                type="text"
                v-model="userInfo.username"
              />
              <button class="save-button-info" @click="saveNewUsername()">
                ذخیره
              </button>
              <span style="color: red">{{ errorMessage }}</span>
            </div>
          </div>
          <button
            class="edit-info-button"
            @click="selectedSection = 'username'"
            v-if="selectedSection !== 'username'"
          >
            ویرایش
          </button>
          <button
            class="edit-info-button close-edit-profile"
            @click="selectedSection = ''"
            v-if="selectedSection === 'username'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              viewBox="0 0 24 24"
              class="magnet-button-icon shrink-0 w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="profile-section"
          :style="{
            backgroundColor: selectedSection === 'password' ? '#f3f3fe80' : '',
          }"
        >
          <b>رمز عبور</b>
          <button class="reset-password-profile" @click="resetPassword()">
            {{ userInfo.password }}
          </button>
        </div>
        <div
          class="profile-section"
          :style="{
            backgroundColor: selectedSection === 'avatar' ? '#f3f3fe80' : '',
          }"
        >
          <b>آواتار</b>
          <img :src="userInfo.avatar" alt="picture" />
          <button
            class="edit-info-button"
            @click="selectedSection = 'avatar'"
            v-if="selectedSection !== 'avatar'"
          >
            ویرایش
          </button>
          <button
            class="edit-info-button close-edit-profile"
            @click="selectedSection = ''"
            v-if="selectedSection === 'avatar'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              viewBox="0 0 24 24"
              class="magnet-button-icon shrink-0 w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="profile-section"
          :style="{
            backgroundColor:
              selectedSection === 'phoneNumber' ? '#f3f3fe80' : '',
          }"
        >
          <b>شماره تماس</b>
          <span class="font-of-info">
            {{ userInfo.phoneNumber }}
          </span>
          <button
            class="edit-info-button"
            @click="selectedSection = 'phoneNumber'"
            v-if="selectedSection !== 'phoneNumber'"
          >
            ویرایش
          </button>
          <button
            class="edit-info-button close-edit-profile"
            @click="selectedSection = ''"
            v-if="selectedSection === 'phoneNumber'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              viewBox="0 0 24 24"
              class="magnet-button-icon shrink-0 w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="profile-section"
          :style="{
            backgroundColor: selectedSection === 'email' ? '#f3f3fe80' : '',
          }"
        >
          <b>ایمیل</b>
          <div style="display: flex; align-items: center">
            <span class="font-of-info">{{ userInfo.email }}</span>
            <span style="margin-right: 5px">
              <svg
                width="23"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 36 36"
              >
                <path
                  fill="#4285F4"
                  d="M30.876 18.275c0-1.017-.084-1.76-.267-2.53H18.753v4.593h6.96c-.14 1.141-.898 2.86-2.582 4.015l-.024.153 3.749 2.846.26.026c2.385-2.159 3.76-5.335 3.76-9.103"
                ></path>
                <path
                  fill="#34A853"
                  d="M18.752 30.376c3.41 0 6.271-1.1 8.362-2.998l-3.985-3.025c-1.066.729-2.497 1.238-4.377 1.238a7.59 7.59 0 0 1-7.184-5.143l-.148.013-3.898 2.956-.05.139c2.076 4.042 6.341 6.82 11.28 6.82"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M11.57 20.448A7.5 7.5 0 0 1 11.149 18c0-.852.154-1.677.407-2.447l-.007-.165-3.947-3.003-.13.06A12.2 12.2 0 0 0 6.127 18c0 1.994.49 3.877 1.347 5.555z"
                ></path>
                <path
                  fill="#EB4335"
                  d="M18.752 10.41c2.371 0 3.97 1.004 4.883 1.843l3.563-3.41c-2.189-1.994-5.037-3.218-8.446-3.218-4.939 0-9.204 2.778-11.28 6.82l4.082 3.108c1.024-2.984 3.859-5.142 7.198-5.142"
                ></path>
              </svg>
            </span>
          </div>
          <button
            class="edit-info-button"
            @click="selectedSection = 'email'"
            v-if="selectedSection !== 'email'"
          >
            ویرایش
          </button>
          <button
            class="edit-info-button close-edit-profile"
            @click="selectedSection = ''"
            v-if="selectedSection === 'email'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              viewBox="0 0 24 24"
              class="magnet-button-icon shrink-0 w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="profile-section"
          :style="{
            backgroundColor: selectedSection === 'organ' ? '#f3f3fe80' : '',
          }"
        >
          <b>نام شرکت</b>
          <span class="font-of-info">
            {{ userInfo.organizationName }}
          </span>
          <button
            class="edit-info-button"
            @click="selectedSection = 'organ'"
            v-if="selectedSection !== 'organ'"
          >
            ویرایش
          </button>
          <button
            class="edit-info-button close-edit-profile"
            @click="selectedSection = ''"
            v-if="selectedSection === 'organ'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              viewBox="0 0 24 24"
              class="magnet-button-icon shrink-0 w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="profile-section"
          :style="{
            backgroundColor: selectedSection === 'job' ? '#f3f3fe80' : '',
          }"
        >
          <b>عنوان شغلی</b>
          <span class="font-of-info">{{ userInfo.jogTitle }}</span>
          <button
            class="edit-info-button"
            @click="selectedSection = 'job'"
            v-if="selectedSection !== 'job'"
          >
            ویرایش
          </button>
          <button
            class="edit-info-button close-edit-profile"
            @click="selectedSection = ''"
            v-if="selectedSection === 'job'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              viewBox="0 0 24 24"
              class="magnet-button-icon shrink-0 w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div class="delete-account">حذف حساب من</div>
      </div>
      <nav class="user-account-nav">
        <router-link to="/profile">
          <span>
            <svg
              width="23"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-full h-auto"
            >
              <path
                fill-rule="evenodd"
                d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 11c-4.841 0-9 3.46-9 8a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1c0-4.54-4.159-8-9-8Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span> حساب کاربری </span>
        </router-link>
      </nav>
    </div>
  </div>
  <footerWhite />
</template>

<style setup>
.back-color-profile-header {
  background-color: var(--jfv-header-bg-dark);
}
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
  margin: 0 100px;
}
.account-info {
  background-color: var(--jfv-header-bg-dark);
  height: 800px;
}
.account-info-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95%;
  padding-top: 10px;
}
.sections-profile {
  width: 1024px;
  background-color: #fff;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.sections-profile h2 {
  text-align: center;
  margin: 0;
  font-size: 30px;
  padding: 24px 16px 0;
  color: var(--jfv-google-apple-blue);
}
.user-account-nav {
  width: fit-content;
  background-color: #dadef3;
  padding: 12px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.user-account-nav a {
  width: 230px;
  background-color: rgb(200, 206, 237, var(--color-opacity, 1));
  color: rgb(52, 60, 106, var(--color-opacity, 1));
  padding: 20px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bolder;
}
.profile-section {
  padding: 16px 28px;
  display: flex;
  align-items: center;
  color: var(--jfv-google-apple-blue);
  border-bottom: 1px solid rgb(226, 227, 233, 0.7);
}
.profile-section b {
  width: 224px;
}
.line-bottom-header-profile {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid rgb(241, 241, 244);
}
.reset-password-profile {
  text-decoration-line: underline;
  color: #0075e3;
  font-family: inherit;
  background-color: inherit;
  border: none;
  outline: none;
  font-size: 14px;
}
.font-of-info {
  font-size: 14px;
}
.edit-info-button {
  margin-right: auto;
  background-color: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  font-size: 13px;
  transition: 0.4s ease;
  padding: 8px;
  border-radius: 0.25rem;
}
.edit-info-button:hover {
  background-color: rgb(243, 243, 254, var(--color-opacity, 1));
}
.delete-account {
  display: flex;
  justify-content: center;
  margin: auto 0;
  color: #0075e3;
  text-decoration-line: underline;
  font-size: 14px;
  cursor: pointer;
}
.close-edit-profile {
  margin-left: 7px;
  padding: 9px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-box-edit-profile {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.input-with-button-edit {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.self-input-new-info {
  width: 352px;
  border-radius: 0.25rem;
  outline: none;
  border: 1px solid rgb(226, 227, 233);
  height: 2rem;
  padding: 0 0.5rem;
  font-family: inherit;
  font-size: 12px;
}
.save-button-info {
  background-color: #64b200;
  border: none;
  border-radius: 0.25rem;
  font-family: inherit;
  color: #fff;
  padding: 0 8px;
  height: 32px;
}
</style>

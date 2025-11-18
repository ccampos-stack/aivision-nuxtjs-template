<script setup lang="ts">
import { Icon } from "@iconify/vue";
import WhyImg from "/images/projects/whychoose.png";
import Profile from "/images/profile/user.svg";
import Overlay from "/images/background/bg-ellipse.svg";

import user1 from "/images/profile/avatar_1.jpg";
import user2 from "/images/profile/avatar_2.jpg";
import user3 from "/images/profile/avatar_3.jpg";
import user4 from "/images/profile/avatar_4.jpg";
import Logo from "@/layouts/shared/logo/index.vue";

const users = [
  { src: user1, alt: "User 1" },
  { src: user2, alt: "User 2" },
  { src: user3, alt: "User 3" },
  { src: user4, alt: "User 4" },
];
</script>
<template>
  <div class="why-choose bg-darkgray">
    <SharedSectionSpacer />
    <div class="container-lg">
      <v-row>
        <!-- LEFT SIDE IMAGE -->
        <v-col cols="12" xl="4" class="position-relative">
          <SharedLeftSideDarkHeading number="04" title="About us" />
          <div class="d-flex flex-column ga-6 mt-6 mw-xl-430">
            <h2 class="text-h2 text-dark">Why choose us</h2>
            <p class="text-subtitle-1 text-dark opacity-70">
              We blend creativity with strategy to craft unique digital
              experiences that make an impact. With a focus on innovation,
              attention to details.
            </p>
          </div>
        </v-col>

        <!-- RIGHT SIDE TEXT LIST -->
        <v-col cols="12" xl="8">
          <v-row>
            <v-col cols="12" md="4" class="d-flex">
              <div class="pa-7 bg-primary position-relative w-100">
                <div
                  class="d-flex flex-column position-relative z-1 h-100 justify-space-between"
                >
                  <div>
                    <div class="d-flex ga-1">
                      <Icon
                        icon="solar:star-bold"
                        class="text-secondary"
                        height="18"
                      />
                      <Icon
                        icon="solar:star-bold"
                        class="text-secondary"
                        height="18"
                      />
                      <Icon
                        icon="solar:star-bold"
                        class="text-secondary"
                        height="18"
                      />
                      <Icon
                        icon="solar:star-bold"
                        class="text-secondary"
                        height="18"
                      />
                      <Icon
                        icon="solar:star-linear"
                        class="text-secondary"
                        height="18"
                      />
                    </div>
                    <p class="text-subtitle-1 mt-3">
                      The team exceeded our expectations with a stunning brand
                      identity.
                    </p>
                  </div>
                  <div class="pt-16">
                    <div>
                      <h2 class="text-h2">98.6%</h2>
                      <small
                        class="text-secondary opacity-70 text-subtitle-2 font-weight-regular"
                        >Customer satisfaction</small
                      >
                      <v-divider class="my-4 opacity-10"></v-divider>
                      <div class="d-flex ga-4 align-center">
                        <v-avatar size="64">
                          <img :src="Profile" alt="icon" class="w-100" />
                        </v-avatar>
                        <div>
                          <h5 class="text-subtitle-1">Wade Warren</h5>
                          <p class="text-subtitle-2 text-secondary opacity-70">
                            Bank of America
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Bg Overlay -->
                <img
                  :src="Overlay"
                  alt="icon"
                  class="position-absolute bottom-0 right-0"
                  width="200"
                  height="350"
                />
              </div>
            </v-col>
            <v-col cols="12" md="4" class="d-flex flex-column">
              <img :src="WhyImg" alt="icon" class="w-100" />
              <div class="mt-5 bg-secondary pa-7">
                <h2 class="text-h2 text-white">500+</h2>
                <small
                  class="text-white opacity-70 text-subtitle-2 font-weight-regular"
                  >Successful projects completed</small
                >
                <div class="d-flex mt-6">
                  <v-avatar
                    v-for="(user, index) in users"
                    :key="index"
                    class="me-n2"
                    size="40"
                  >
                    <img
                      :src="user.src"
                      :alt="user.alt"
                      height="40"
                      class="border-md border-secondary rounded-circle border-opacity-100"
                    />
                  </v-avatar>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4" class="d-flex">
              <div
                class="border border-sm  pa-7 position-relative overflow-hidden brand-served d-flex flex-column h-100 justify-space-between"
              >
                <div class="pb-4">
                  <h2 class="text-h2">238+</h2>
                  <small
                    class="text-dark text-subtitle-1 font-weight-regular"
                    >Brands served worldwide</small
                  >
                </div>
                <div class="pt-16">
                  <div>
                    <Logo />
                    <p class="text-subtitle-1 mt-3">
                      Our global reach allows us to create unique, culturally
                      relevant designs for businesses across different
                      industries.
                    </p>
                  </div>
                </div>
                <div class="first-ring"></div>
                <div class="second-ring"></div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <SharedSectionSpacer />
  </div>
</template>

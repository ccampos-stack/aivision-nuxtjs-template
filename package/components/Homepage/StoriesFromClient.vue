<script setup lang="ts">
import { Icon } from "@iconify/vue";
import testimonial1 from "/images/profile/testimonial_1.webp";
import testimonial2 from "/images/profile/testimonial_2.webp";
import testimonial3 from "/images/profile/testimonial_3.webp";
import Quotes from "/images/svgs/quotes.svg";
</script>
<template>
  <div class="stories bg-surface ">
    <SharedSectionSpacer />
    <div class="container-lg">
      <v-row>
        <!-- LEFT SIDE IMAGE -->
        <v-col cols="12" lg="4" class="position-relative">
          <SharedLeftSideDarkHeading number="05" title="Testimonial" />
        </v-col>

        <!-- RIGHT SIDE TEXT LIST -->
        <v-col cols="12" lg="8">
          <div class="d-flex flex-column ga-11">
            <SharedCommonHeading
              class="mw-670"
              title="Stories from clients"
              subtitle="Real experiences, genuine feedback—discover how our creative solutions have transformed brands and elevated businesses."
            />
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-md-16 mt-8">
        <v-col cols="12" lg="3" class="d-flex">
          <div
            class="bg-primary pa-7 d-flex flex-column h-100 justify-space-between ga-16"
          >
            <div class="d-flex flex-column ga-6">
              <p
                class="text-subtitle-2 text-secondary opacity-70 font-weight-regular"
              >
                Hear from them
              </p>
              <h4 class="text-h4">
                Our website redesign was flawless. They understood our vision
                perfectly!
              </h4>
            </div>
            <div class="pt-12">
             
                <div class="d-flex ga-4 align-center">
                  <v-avatar size="60">
                    <img :src="testimonial1" alt="icon" class="w-100" />
                  </v-avatar>
                  <div>
                    <h5 class="text-subtitle-1">Albert Flores</h5>
                    <p class="text-subtitle-2 text-secondary opacity-70">
                      MasterCard
                    </p>
                  </div>
                </div>
             
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="6" class="d-flex">
          <div
            class="here-from bg-secondary pa-7 d-flex flex-column h-100 justify-space-between"
          >
            <div class="d-flex flex-column ga-6">
              <p
                class="text-subtitle-2 text-white opacity-70 font-weight-regular"
              >
                Hear from them
              </p>
              <h4 class="text-h4">
                From concept to execution, they delivered outstanding results.
                Highly recommend their expertise!
              </h4>
              <div class="d-flex ga-2">
                <div class="d-flex ga-1">
                  <Icon icon="solar:star-bold" class="text-white" height="18" />
                  <Icon icon="solar:star-bold" class="text-white" height="18" />
                  <Icon icon="solar:star-bold" class="text-white" height="18" />
                  <Icon icon="solar:star-bold" class="text-white" height="18" />
                  <Icon
                    icon="solar:star-linear"
                    class="text-white"
                    height="18"
                  />
                </div>
                <span class="text-subtitle-2">4.0</span>
              </div>
            </div>
            <div class="pt-12">
        
                <div class="d-flex justify-space-between align-center">
                  <div class="d-flex ga-4 align-center">
                    <v-avatar size="60">
                      <img :src="testimonial2" alt="icon" class="w-100" />
                    </v-avatar>
                    <div>
                      <h5 class="text-subtitle-1">Robert Fox</h5>
                      <p
                        class="text-subtitle-2 text-white opacity-70 font-weight-regular"
                      >
                        Mitsubishi
                      </p>
                    </div>
                  </div>
                  <div>
                    <img :src="Quotes" alt="icon" height="35" width="45" />
                  </div>
                </div>
              
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="3" class="d-flex">
          <div
            class="bg-accent pa-7 d-flex flex-column h-100 justify-space-between"
          >
            <div class="d-flex flex-column ga-6">
              <p
                class="text-subtitle-2 text-dark opacity-70 font-weight-regular"
              >
                Hear from them
              </p>
              <h4 class="text-h4">
                Super smooth process with incredible results. highly recommend!
              </h4>
            </div>
            <div class="pt-12">
             
                <div class="d-flex ga-4 align-center pt-5">
                  <v-avatar size="60">
                    <img :src="testimonial3" alt="icon" class="w-100" />
                  </v-avatar>
                  <div>
                    <h5 class="text-subtitle-1">Jenny Wilson</h5>
                    <p class="text-subtitle-2 text-dark opacity-70">
                      Pizza Hut
                    </p>
                  </div>
                </div>
             
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <SharedSectionSpacer />
  </div>
</template>

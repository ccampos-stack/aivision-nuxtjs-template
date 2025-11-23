<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="bg-darkgray">
    <SharedSectionSpacer />
    <div class="container-lg">
      <v-row>
        <v-col cols="12" lg="4">
          <SharedLeftSideDarkHeading number="10" title="Contáctanos" />
          <div class="mw-430 mt-lg-16 mt-8">
            <p class="text-subtitle-1 text-dark opacity-70 pt-lg-8">
              ¡Colaboremos y creemos algo increíble! Cuéntanos sobre tu proyecto—estamos listos para escucharte.
            </p>
          </div>
        </v-col>
        <v-col cols="12" lg="8">
          <div class="d-flex flex-column ga-11">
            <SharedCommonHeading
              class="mw-670"
              title="Comunícate con Nosotros"
              subtitle=""
            />
          </div>

          <div class="mt-8">
            <form
              class="d-flex flex-column ga-2"
              action="https://formsubmit.co/bhainirav772@gmail.com"
              method="POST"
            >
              <v-text-field
                name="name"
                label="Nombre"
                variant="underlined"
                required
              ></v-text-field>

              <v-text-field
                name="email"
                label="Correo Electrónico"
                type="email"
                variant="underlined"
                required
              ></v-text-field>

              <v-textarea
                name="message"
                label="Cuéntanos sobre tu proyecto"
                variant="underlined"
              ></v-textarea>

              <v-btn
                class="interactive-button w-100"
                size="lg"
                flat
                type="submit"
              >
                <span class="label">Enviar Mensaje</span>
                <v-avatar size="45" class="icon bg-white">
                  <Icon icon="material-symbols:arrow-outward" height="20" />
                </v-avatar>
              </v-btn>
            </form>
          </div>
        </v-col>
      </v-row>
    </div>
    <SharedSectionSpacer />
  </div>
</template>

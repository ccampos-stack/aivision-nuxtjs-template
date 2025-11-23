<template>
  <div class="position-relative bg-darkgray">
    <!-- Section Spacer -->
    <SharedSectionSpacer />
    <div class="container-lg">
      <v-row>
        <v-col cols="12" lg="4">
          <SharedLeftSideDarkHeading number="02" title="Soluciones Implementadas" />
        </v-col>
        <v-col cols="12" lg="8">
          <div class="d-flex flex-column ga-96">
            <SharedCommonHeading
              class="mw-md-670"
              title="Proyectos de Visión Industrial y IA"
              subtitle="Una muestra de cómo la Inteligencia Artificial, Gemelos Digitales y Modelado 3D están transformando la inspección, seguridad y eficiencia en la industria Naval e Industrial."
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="projects pt-md-95 pt-50">
      <ProjectsProjectGrid />
    </div>
    <!-- Section Spacer -->
    <SharedSectionSpacer />
  </div>
</template>

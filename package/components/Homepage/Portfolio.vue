<template>
  <div class="position-relative bg-darkgray">
    <!-- Section Spacer -->
    <SharedSectionSpacer />
    <div class="container-lg">
      <v-row>
        <v-col cols="12" lg="4">
          <SharedLeftSideDarkHeading number="02" title="Portfolio" />
        </v-col>
        <v-col cols="12" lg="8">
          <div class="d-flex flex-column ga-96">
            <SharedCommonHeading
              class="mw-md-670"
              title="Featured projects"
              subtitle="A glimpse into our creativity—exploring innovative designs, successful collaborations, and transformative digital experiences."
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

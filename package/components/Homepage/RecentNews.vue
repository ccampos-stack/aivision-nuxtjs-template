
<template>
  <div class="bg-surface">
    <SharedSectionSpacer />
    <div class="container-lg overflow-hidden">
      <v-row>
        <!-- LEFT SIDE IMAGE -->
        <v-col cols="12" lg="4" class="position-relative">
          <SharedLeftSideDarkHeading number="09" title="Resources" />
        </v-col>

        <!-- RIGHT SIDE TEXT LIST -->
        <v-col cols="12" lg="8">
          <div class="d-flex flex-column ga-11">
            <SharedCommonHeading
              class="mw-670"
              title="Recent news"
              subtitle="Explore the latest trends, bold projects, and creative insights from our agency—shaping the future of branding, digital experiences, and storytelling."
            />
          </div>
        </v-col>
      </v-row>

      <div class="mt-md-16 mt-10">
        <BlogsBlogGridRecentBlogGrid />
      </div>
    </div>
    <SharedSectionSpacer />
  </div>
</template>

import { Chance } from "chance";
import { random } from "lodash";
import { sub } from "date-fns";
import mock from "../mockAdapter";

// Main Images
import project1 from "/images/projects/snapclear.webp";
import project2 from "/images/projects/project1.webp";
import project3 from "/images/projects/project2.webp";
import project4 from "/images/projects/project3.webp";
import project5 from "/images/projects/project4.webp";
import project6 from "/images/projects/project5.webp";

// Detail images
import project11 from "/images/projects/details/pd-11.webp";
import project12 from "/images/projects/details/pd-12.webp";
import project13 from "/images/projects/details/pd-13.webp";
import project21 from "/images/projects/details/pd-21.webp";
import project22 from "/images/projects/details/pd-22.webp";
import project23 from "/images/projects/details/pd-23.webp";
import project31 from "/images/projects/details/pd-31.webp";
import project32 from "/images/projects/details/pd-32.webp";
import project33 from "/images/projects/details/pd-33.webp";
import project41 from "/images/projects/details/pd-41.webp";
import project42 from "/images/projects/details/pd-42.webp";
import project43 from "/images/projects/details/pd-43.webp";
import project51 from "/images/projects/details/pd-51.webp";
import project52 from "/images/projects/details/pd-52.webp";
import project53 from "/images/projects/details/pd-53.webp";
import project61 from "/images/projects/details/pd-61.webp";
import project62 from "/images/projects/details/pd-62.webp";

import { uniqueId } from "lodash";

import type { ProjectsTypes } from "@/types/projects/ProjectsType";

const chance = new Chance();

const ProjectGridData: ProjectsTypes[] = [
  {
    id: chance.integer({ min: 1, max: 2000 }),
    project_title: "Snapclear",
    project_image: project1,
    tag1: "UX Strategy",
    tag2: "UI Design",
    industry: "Technology",
    raised: "1.1M",
    description:
      "<p>Snapclear is a cutting-edge agency project dedicated to producing crystal-clear visual content that captures attention and leaves a lasting impact. By blending creativity with precision, Snapclear ensures every piece of content stands out with exceptional clarity and quality.<p>",
    detail_img_1: project11,
    detail_img_2: project12,
    detail_img_3: project13,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    project_title: "Pixelforge",
    project_image: project2,
    tag1: "UI/UX design",
    tag2: "Web development",
    industry: "Shoes",
    raised: "1.2M",
    description:
      "<p>Beyond visual excellence, Snapclear offers innovative digital solutions tailored to meet diverse client needs. From strategic design to advanced technological tools, the agency empowers brands to communicate their message effectively and elevate their digital presence. Exploring the world of footwear reveals a rich tapestry of blogs catering to various interests, from high-quality craftsmanship to the latest trends and practical advice.</p> <h4>Here are some notable shoe blogs you might find engaging:</h4> <p>Shoegazing is a prominent platform dedicated to high-quality shoes, particularly welted footwear. The blog offers in-depth articles on shoe care, construction techniques, buying guides, and industry news. For instance, a recent podcast episode features an interview with Takashi Horiguchi of Super 8 Shoes, discussing the allure of vintage men's footwear.</p>",
    detail_img_1: project31,
    detail_img_2: project32,
    detail_img_3: project33,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    project_title: "Transfermax",
    project_image: project3,
    tag1: "Web development",
    tag2: "Digital design",
    industry: "Perfume",
    raised: "1.1M",
    description:
      "<h4>Sanae Intoxicants Blog:</h4> <p>This blog explores the profound connection between scent and memory. An article titled Transcending Words and Thoughts: Using Scent as a Time Machine Tool discusses how fragrances can transport us to different moments in time.</p> <h5>The Dry Down:</h5> <p>A newsletter about perfume, offering in-depth discussions on various fragrances and the art of scent appreciation. Authored by Rachel, it provides unique insights into the world of perfumes.</p> <h5>Perfume of Max:</h5> <p>Max Vnoutchkov, an expert perfume reviewer and professional videographer, shares his fragrance reviews and insights on his Instagram profile. His content offers a visual and descriptive exploration of various scents.</p> <h5>SCENTMAX Blog:</h5> <p>This blog covers topics like the magical effects of different scents and the benefits of aromatherapy. It provides insights into how fragrances can influence mood and well-being.</p>",
    detail_img_1: project21,
    detail_img_2: project22,
    detail_img_3: project23,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    project_title: "Digital Magazine",
    project_image: project4,
    tag1: "Digital design",
    tag2: "Web development",
    industry: "Magazine",
    raised: "1.5M",
    description:
      "<p>Digital magazines and blogs are both prevalent forms of online content, each with distinct characteristics and purposes.</p><p>Content Structure and Quality: Digital magazines typically offer curated, in-depth articles that undergo a rigorous editing process, often accompanied by high-quality visuals. Blogs, on the other hand, tend to present more informal, timely posts that may not always go through extensive editorial oversight.</p><p>Publication Frequency: Magazines often adhere to a set publication schedule (e.g., monthly or quarterly), while blogs usually publish content more frequently, sometimes daily or weekly.</p><p>Design and Layout: Digital magazines often emulate the structured, visually rich layouts of traditional print magazines, providing a cohesive reading experience. Blogs typically have simpler layouts, focusing on individual posts that are easily navigable.</p>",
    detail_img_1: project61,
    detail_img_2: project62,
    detail_img_3: project43,
  },

  {
    id: chance.integer({ min: 1, max: 2000 }),
    project_title: "Amber Bottle",
    project_image: project5,
    tag1: "Photography",
    tag2: "Studio",
    industry: "Photography",
    raised: "1.5M",
    description:
      "<p>Amber glass bottles are not only functional but also add a warm, vintage        aesthetic to home décor. Several blogs have explored creative ways to        incorporate these bottles into interior design:</p>    <h4>1. Liz Marie Blog</h4>    <p>Liz Marie showcases how to use amber bottles alongside cotton stems to        create cozy fall decorations. She emphasizes the ease of finding such        bottles at antique shops and even at retailers like Target, making it        accessible for readers to replicate her style.</p>    <h4>2. Willow Bloom Home Blog</h4>    <p>This article guides readers on transforming everyday glass bottles into        vintage-inspired amber pieces. By repurposing items like soap bottles,        the blog offers a sustainable approach to achieving a classic look,        complete with preparation and styling tips.</p>    <h4>3. Itty Bitty Farmhouse</h4>    <p>This blog provides a DIY tutorial on crafting vintage-inspired amber        bottles. <strong>For under $25</strong>, readers can create decorative        pieces that blend seamlessly with authentic vintage items, offering an        affordable alternative to sourcing genuine antiques.</p>",
    detail_img_1: project41,
    detail_img_2: project42,
    detail_img_3: project43,
  },

  {
    id: chance.integer({ min: 1, max: 2000 }),
    project_title: "BioTrack LIMS",
    project_image: project6,
    tag1: "Brand identity",
    tag2: "Digital design",
    industry: "Bags",
    raised: "1.5M",
    description:
      "<p class='text-subtitle-1'>exploring the world of handbags reveals a diverse array of blogs catering to various styles, trends, and fashion insights. Here are some notable handbag blogs you might find engaging:</p><h4 class='text-h4'>1. PurseBlog</h4><p class='text-subtitle-1'>PurseBlog offers daily editorial content focusing on designer handbag news, reviews, and features. They cover the latest collections from both luxury and contemporary designers, providing readers with in-depth analyses and insights into the handbag industry.</p><h4 class='text-h4'>2. The MyBag    Blog</h4><p class='text-subtitle-1'>The MyBag Blog is a hub for designer    handbag inspiration, trends, and style guides. Packed with the latest    trends, blogger styles, and, of course, handbags, it serves as a valuable    resource for fashion enthusiasts seeking to stay updated on current    styles.</p>",
    detail_img_1: project51,
    detail_img_2: project52,
    detail_img_3: project53,
  },
];

mock.onGet("/api/data/projects/grid").reply(() => {
  return [200, ProjectGridData];
});

// ----------------------------------------------------------------------
mock.onPost("/api/data/projects/post").reply((config: string | any) => {
  try {
    const { title } = JSON.parse(config.data);

    const paramCase = (t: string) =>
      t
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

    const post = ProjectGridData.find(
      (_post: ProjectsTypes | string | any) =>
        paramCase(_post.project_title) === title
    );

    if (!post) {
      return [404, { message: "Post not found" }];
    }

    return [200, { post }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

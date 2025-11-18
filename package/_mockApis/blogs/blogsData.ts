import { Chance } from "chance";
import { random } from "lodash";
import { sub } from "date-fns";
import mock from "../mockAdapter";

// Main Images
import blog1 from "/images/blog/blog1.png";
import blog2 from "/images/blog/blog2.png";
import blog3 from "/images/blog/blog3.png";
import blog4 from "/images/projects/project3.webp";

// Detail images
import blog11 from "/images/blog/blog11.png";
import blog21 from "/images/blog/blog21.png";
import blog31 from "/images/projects/details/pd-43.webp";
import blog41 from "/images/projects/details/pd-61.webp";

import { uniqueId } from "lodash";

import type { BlogTypes } from "@/types/blog/BlogTypes";

const chance = new Chance();

const BlogGridData: BlogTypes[] = [
  {
    id: chance.integer({ min: 1, max: 2000 }),
    blog_image: blog1,
    blog_title: "A campaign that connects",
    blog_date: "Dec 24, 2025",
    blog_inner_image: blog11,
    blog_description:
      "<p>Blogger outreach campaigns are strategic efforts by businesses to collaborate with influential bloggers, aiming to promote products, services, or content to a broader audience. This form of influencer marketing leverages the blogger's established credibility and reach within a specific niche.</p> <p>Key Steps to Launch a Successful Blogger Outreach Campaign:</p> <h4>1. Define Your Goals:</h4> <p>Clearly outline what you aim to achieve, such as increasing brand awareness, driving website traffic, or boosting product sales.</p> <h4>2. Identify Relevant Bloggers:</h4> <p>Research and compile a list of bloggers whose audience aligns with your target demographic. Utilize tools like BuzzSumo to discover key influencers in your industry.</p> <h4>Engage Authentically:</h4> <p>Prior to outreach, engage with the bloggers' content by commenting on posts or sharing their articles. This establishes a genuine connection and familiarity.</p> <p>Craft Personalized Outreach Messages: Develop tailored emails that acknowledge the blogger's work and propose a mutually beneficial collaboration. Avoid generic templates to increase response rates.</p>",
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    blog_image: blog2,
    blog_title: "An breaking boundaries our latest brand redesign",
    blog_date: "Jan 26, 2025",
    blog_inner_image: blog21,
    blog_description:
      "<h4>What's new?</h4> <p>Fresh Logo: A sleek, modern design that blends our past and future.</p> <p>Vibrant Colors: A new color palette that embodies energy and dynamism.</p> <p>Refined Typography: Clean, modern fonts for better readability.</p> <p>Dynamic Visuals: Imagery that better tells our story and mission.</p> <p>Inclusive Voice: A more approachable, transparent way of communicating.</p> <h4>Why the redesign?</h4> <p>Our world is constantly evolving, and we felt it was time for our brand to reflect that growth. A redesign doesn’t just mean a new look – it’s a powerful statement about who we are and how we want to interact with our community. We’re breaking boundaries and setting new standards for what’s possible.</p> <h4>What this means for you</h4> <p>Our commitment to innovation and excellence has never been stronger. With this redesign, we aim to deliver even more value to you, our loyal customers and partners. Whether it’s through improved products, more engaging content, or stronger collaborations, we’re excited about what the future holds.</p> <h4>Key takeaways</h4> <p>A bold new look that stays true to our values.</p> <p>A focus on better connecting with our audience.</p> <p>A commitment to breaking boundaries and delivering excellence.</p>",
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    blog_image: blog3,
    blog_title: "Recognized for design",
    blog_date: "May 28, 2025",
    blog_inner_image: blog31,
    blog_description:"<p>Exploring design blogs that have gained recognition for their exceptional content and influence can provide valuable insights and inspiration. Here are some notable design blogs celebrated for their contributions to the design community:</p> <h4>1.Colossal</h4> <p>Founded by Christopher Jobson in 2010, Colossal is an art and visual culture blog that covers a wide array of topics, including photography, design, animation, painting, installation art, architecture, drawing, and street art. The blog has received accolades such as a Utne Media Award for arts coverage and a Webby Award nomination. Fast Company described it as the 'Tate Modern of the Internet,' and the National Endowment for the Arts considers it a must read.</p> <h4>2.Abduzeedo (abdz.do)</h4> <p>Abduzeedo, also known as abdz.do, is a design blog featuring inspirational case studies and design projects from global designers. Founded by Brazilian designer Fabio Sasso, the site covers a broad spectrum of design topics, including 3D, illustration, animation, and graphic design. It also offers a tutorial section with step-by-step guides for various design effects, catering to users with different skill levels.</p> <h4>3.Made By Folk</h4> <p>Made By Folk is a renowned graphic design blog showcasing high-quality projects across various design disciplines, such as branding, packaging, editorial design, screen printing, and photography. The blog also publishes interviews with talented designers, sharing their experiences and perspectives on the latest industry trends.</p>",
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    blog_image: blog4,
    blog_title: "The Modern Lens Perspectives on Culture & Trends",
    blog_date: "June 11, 2025",
    blog_inner_image: blog41,
    blog_description:
      "<h4>1. Cultural Trends Blog by MIDiA Research</h4> <p>This blog delves into various cultural phenomena, analyzing how they influence industries such as music, media, and technology. It offers data-driven insights into shifting consumer behaviors and emerging trends.</p> <h4>2. Widening Our Lens: Considering Culture by Karl Ostroski</h4> <p>Published on Medium, this article discusses the importance of broadening our cultural perspectives. Ostroski emphasizes understanding diverse cultural backgrounds to foster empathy and innovation.</p> <h4>3. Cultural Lens: How Our Environment Shapes Our Perspectives by Exceptional Futures</h4> <p>This piece explores the concept of the cultural lens, examining how our surroundings and upbringing influence our worldview. It encourages readers to reflect on their biases and consider alternative viewpoints.</p>",
  },
];

mock.onGet("/api/data/blog/grid").reply(() => {
  return [200, BlogGridData];
});

// ----------------------------------------------------------------------
mock.onPost("/api/data/blog/post").reply((config: string | any) => {
  try {
    const { title } = JSON.parse(config.data);

    const paramCase = (t: string) =>
      t
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

    const post = BlogGridData.find(
      (_post: BlogTypes | string | any) => paramCase(_post.blog_title) === title
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

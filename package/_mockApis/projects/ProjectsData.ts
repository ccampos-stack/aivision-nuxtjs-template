import { Chance } from "chance";
import { random } from "lodash";
import { sub } from "date-fns";
import mock from "../mockAdapter";

// Main Images
import project1 from "/images/projects/PProdiver.jpg";
import project2 from "/images/projects/PPuertecillo.jpg";
import project3 from "/images/projects/PGemelos.jpg";
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
    project_title: "Recorrido Virtual Prodiver",
    project_image: project1,
    tag1: "Modelado 3D",
    tag2: "Inspección Estructural",
    industry: "Naval e Industrial",
    raised: "1.1M",
    description:
      "<p>Plataforma digital de inspección que captura y reproduce el entorno físico de un muelle y sus estructuras asociadas con una fidelidad excepcional. Esta solución integral ofrece un recorrido inmersivo estilo street view que permite a los usuarios navegar por el activo de forma remota, reduciendo costos y riesgos de seguridad.</p><p><strong>Captura de Entorno:</strong> Integración de videos y fotografías de ultra alta resolución.</p><p><strong>Gemelo Digital 3D:</strong> Generación de un Modelo 3D de precisión del muelle, permitiendo mediciones y análisis estructural detallados a distancia.</p><p><strong>Información Integrada:</strong> Incorporación de puntos de interés interactivos (hotspots) con información de la Escuela de Buceo (protocolos, activos, áreas de riesgo, etc.).</p><p><strong>Uso Principal y Distribución:</strong> Esta herramienta tiene un uso dual: sirve como una poderosa herramienta de inspección remota y como una plataforma avanzada para capacitación y entrenamiento seguro. Se entrega en dos formatos de alto impacto: una versión web accesible desde cualquier navegador y una versión ejecutable para PC, optimizada para inmersión total en Realidad Virtual (VR), garantizando una adopción rápida y resultados medibles.</p>",
    detail_img_1: project11,
    detail_img_2: project12,
    detail_img_3: project13,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    project_title: "Master Plan Puertecillo",
    project_image: project2,
    tag1: "Recorrido Virtual",
    tag2: "Modelado 3D",
    industry: "Inmobiliario",
    raised: "1.2M",
    description:
      "<p>Plataforma interactiva de visualización del Master Plan Puertecillo, que permite explorar el proyecto inmobiliario de manera inmersiva. Esta solución digital integra recorridos virtuales, información detallada de las propiedades y el entorno natural que rodea el desarrollo.</p><p><strong>Recorrido Virtual Interactivo:</strong> Navegación fluida tipo street view que permite explorar cada rincón del proyecto desde cualquier dispositivo.</p><p><strong>Información Integrada:</strong> Hotspots interactivos con datos de cada lote, amenidades y características del entorno natural de Puertecillo.</p><p><strong>Visualización del Entorno:</strong> Captura de alta calidad del paisaje costero y las características únicas de la zona.</p>",
    detail_img_1: project31,
    detail_img_2: project32,
    detail_img_3: project33,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    project_title: "Visor de Gemelos Digitales 3D",
    project_image: project3,
    tag1: "Visualización 3D",
    tag2: "Análisis Técnico",
    industry: "Industrial y Naval",
    raised: "1.1M",
    description:
      "<p>Plataforma avanzada de visualización y análisis de gemelos digitales desarrollada con Angular y Three.js, que permite la inspección detallada de activos industriales mediante renderizado 3D de alta fidelidad.</p><h4>¿Qué son los Gemelos Digitales?</h4><p>Los gemelos digitales son réplicas virtuales exactas de activos físicos industriales y navales, capturados mediante fotogrametría, LiDAR y escaneo 3D. Estas réplicas digitales permiten realizar inspecciones remotas, análisis técnicos y mediciones precisas sin necesidad de estar físicamente en el lugar, optimizando tiempos y reduciendo riesgos operacionales.</p><h4>Capacidades Técnicas:</h4><p><strong>Visualización Multi-formato:</strong> Soporte para GLB/GLTF, PLY (nubes de puntos), OBJ, FBX y Gaussian Splats fotogramétricos, con renderizado PBR (Physically Based Rendering) y environment mapping HDR para realismo máximo.</p><p><strong>Sistema de Mediciones de Precisión:</strong> Herramientas de medición 3D que permiten obtener distancias exactas entre puntos, calcular áreas de superficies mediante triangulación de polígonos, y analizar volúmenes con precisión milimétrica. Esto permite realizar mediciones remotas tan precisas como si estuvieras físicamente en el sitio.</p><p><strong>Anotaciones Georreferenciadas:</strong> Sistema de marcadores 3D persistentes con overlays HTML sincronizados, almacenamiento en base de datos y generación automática de reportes técnicos para documentar hallazgos y coordinar trabajos de mantenimiento.</p><p><strong>Controles de Iluminación:</strong> Panel dinámico para ajuste en tiempo real de exposición (0.1-2.0), ambient light, hemisphere light, directional light con sombras, y environment map intensity para optimizar visualización según tipo de superficie y condiciones del activo.</p>",
    detail_img_1: project21,
    detail_img_2: project22,
    detail_img_3: project23,
  },
  
  // Proyectos ocultos temporalmente - Para editar después
  /*
  {
    id: chance.integer({ min: 1, max: 2000 }),
    project_title: "Monitoreo Aéreo Automatizado",
    project_image: project4,
    tag1: "Drones Lidar",
    tag2: "Fotogrametría de Precisión",
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
  */
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

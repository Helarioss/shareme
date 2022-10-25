import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const { REACT_APP_SANITY_PROJECT_ID, REACT_APP_SANITY_TOKEN } = process.env;

export const client = sanityClient({
  projectId: REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-10-16",
  useCdn: true,
  token: REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

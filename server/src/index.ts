import 'dotenv/config';
import Fastify from 'fastify';
import { XMLParser } from 'fast-xml-parser';
import serveStatic from '@fastify/static';
import proxy from '@fastify/http-proxy';
import path from 'path';

import { Data } from './types';

interface VideoData {
  title: string;
  titleSort?: string;
  key: string;
  year: string;
  summary: string;
  resolutions: string[];
  addedAt: string;
}

const port = Number(process.env.PORT ?? 3000);
const plexURL = process.env.PLEXURL;
const plexToken = process.env.PLEXTOKEN;
const plexLibraryID = process.env.PLEXLIBRARYID;
const debug = (process.env.DEBUG ?? '').toLowerCase() === 'true';

const fastify = Fastify({ logger: debug });

const parser = new XMLParser({
  allowBooleanAttributes: true,
  ignoreAttributes: false,
  attributeNamePrefix: '',
});

fastify.register(serveStatic, {
  root: path.join(__dirname, 'public'),
});

// TODO: Catch config errors
// TODO: Catch and return error for unauthorized
fastify.get('/api', async (request, reply) => {
  let videos: VideoData[] = [];
  let xml: string;

  try {
    xml = await (
      await fetch(
        `${plexURL}/library/sections/${plexLibraryID}/all/?X-Plex-Token=${plexToken}`
      )
    ).text();
  } catch (err) {
    console.log(`Error retrieving data from Plex: ${err}`);
    return {};
  }

  let parsedXML: Data['MediaContainer'];
  try {
    parsedXML = (parser.parse(xml) as Data).MediaContainer;
  } catch (err) {
    console.log(`Error parsing XML: ${err}`);
    return {};
  }

  parsedXML.Video.forEach((val) => {
    let resolutions: string[] = [];

    try {
      if (Array.isArray(val.Media)) {
        val.Media.forEach((med) => {
          resolutions.push(med.videoResolution);
        });
      } else {
        resolutions.push(val.Media.videoResolution);
      }

      videos.push({
        title: val.title,
        titleSort: val.titleSort,
        key: val.ratingKey,
        year: val.year,
        summary: val.summary,
        resolutions,
        addedAt: val.addedAt,
      });
    } catch (err) {
      console.log(
        `Error collecting data for ${val.title}: ${err}\nContinuing...`
      );
    }
  });

  return videos;
});

fastify.register(proxy, {
  upstream: plexURL,
  prefix: '/api/img/:id',
  rewritePrefix: `/library/metadata/:id/thumb/?X-Plex-Token=${plexToken}`,
});

const start = async () => {
  try {
    await fastify.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    console.log(`Fastify Error: ${err}`);
    process.exit(1);
  }
  console.log(`Server running on port ${port}`);
};
start();

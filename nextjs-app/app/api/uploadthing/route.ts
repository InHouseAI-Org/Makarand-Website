import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

/**
 * Uploadthing API route handler
 * This creates the GET and POST endpoints for handling file uploads
 *
 * Endpoints:
 * - POST /api/uploadthing - Upload files
 * - GET /api/uploadthing - Get upload status
 */
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Optional: Add custom configuration
  config: {
    // uploadthingId and uploadthingSecret are automatically read from env variables
    // UPLOADTHING_APP_ID and UPLOADTHING_SECRET
  },
});

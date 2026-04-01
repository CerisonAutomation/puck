/* Payload REST API catch-all — required for Payload v3 */
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const getPayloadInstance = () => getPayload({ config: configPromise })

export const GET    = (req: Request, { params }: { params: Promise<{ slug: string[] }> }) =>
  REST_GET(req, { params, getPayload: getPayloadInstance })
export const POST   = (req: Request, { params }: { params: Promise<{ slug: string[] }> }) =>
  REST_POST(req, { params, getPayload: getPayloadInstance })
export const DELETE = (req: Request, { params }: { params: Promise<{ slug: string[] }> }) =>
  REST_DELETE(req, { params, getPayload: getPayloadInstance })
export const PATCH  = (req: Request, { params }: { params: Promise<{ slug: string[] }> }) =>
  REST_PATCH(req, { params, getPayload: getPayloadInstance })
export const PUT    = (req: Request, { params }: { params: Promise<{ slug: string[] }> }) =>
  REST_PUT(req, { params, getPayload: getPayloadInstance })

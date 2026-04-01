import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

const getPayload = () => getPayloadHMR({ config: configPromise })

export const GET    = (req: Request, ctx: any) => REST_GET(req, { ...ctx, getPayload })
export const POST   = (req: Request, ctx: any) => REST_POST(req, { ...ctx, getPayload })
export const DELETE = (req: Request, ctx: any) => REST_DELETE(req, { ...ctx, getPayload })
export const PATCH  = (req: Request, ctx: any) => REST_PATCH(req, { ...ctx, getPayload })
export const OPTIONS = (req: Request, ctx: any) => REST_OPTIONS(req, { ...ctx, getPayload })

import { neon } from '@neondatabase/serverless'

export interface Env {
  DATABASE_URL: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const sql = neon(env.DATABASE_URL)
    const url = new URL(request.url)

    // CORS headers — supaya Next.js bisa akses Worker
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    }

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers })
    }

    try {
      // GET /api/materi
      if (url.pathname === '/api/materi') {
        const data = await sql`
          SELECT m.id, m.judul, m.slug, m.deskripsi, m."createdAt", k.nama as kelas_nama
          FROM "Materi" m
          JOIN "Kelas" k ON m."kelasId" = k.id
          WHERE m."isPublished" = true
          ORDER BY m."createdAt" DESC
        `
        return new Response(JSON.stringify(data), { headers })
      }

      // GET /api/materi/:slug
      const materiMatch = url.pathname.match(/^\/api\/materi\/(.+)$/)
      if (materiMatch) {
        const slug = materiMatch[1]
        const data = await sql`
          SELECT m.*, k.nama as kelas_nama
          FROM "Materi" m
          JOIN "Kelas" k ON m."kelasId" = k.id
          WHERE m.slug = ${slug} AND m."isPublished" = true
          LIMIT 1
        `
        if (data.length === 0) {
          return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers })
        }
        return new Response(JSON.stringify(data[0]), { headers })
      }

      // GET /api/blog
      if (url.pathname === '/api/blog') {
        const data = await sql`
          SELECT id, judul, slug, deskripsi, tags, "createdAt"
          FROM "Blog"
          WHERE "isPublished" = true
          ORDER BY "createdAt" DESC
        `
        return new Response(JSON.stringify(data), { headers })
      }

      // GET /api/blog/:slug
      const blogMatch = url.pathname.match(/^\/api\/blog\/(.+)$/)
      if (blogMatch) {
        const slug = blogMatch[1]
        const data = await sql`
          SELECT *
          FROM "Blog"
          WHERE slug = ${slug} AND "isPublished" = true
          LIMIT 1
        `
        if (data.length === 0) {
          return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers })
        }
        return new Response(JSON.stringify(data[0]), { headers })
      }

      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers,
      })
    }
  },
}